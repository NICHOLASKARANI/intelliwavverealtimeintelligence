// apps/bot-engine/src/core/Engine.ts
import { EventEmitter } from 'events';
import { BaseStrategy } from '../strategies/BaseStrategy';
import { RiskManager } from './RiskManager';
import { Scheduler } from './Scheduler';
import { Logger } from '../utils/logger';
import { PrismaService } from '@intelliwave/database';

export interface BotInstance {
  id: string;
  userId: string;
  strategy: BaseStrategy;
  riskManager: RiskManager;
  config: BotConfig;
  status: 'ACTIVE' | 'PAUSED' | 'STOPPED';
  positions: Map<string, any>;
  trades: any[];
  metrics: BotMetrics;
}

export interface BotConfig {
  id: string;
  name: string;
  tradingAccountId: string;
  capital: number;
  maxDrawdown: number;
  dailyLossLimit: number;
  maxPositions: number;
  takeProfit?: number;
  stopLoss?: number;
}

export interface BotMetrics {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  totalPnL: number;
  winRate: number;
  maxDrawdown: number;
  sharpeRatio: number;
  startTime: Date;
}

export class TradingEngine extends EventEmitter {
  private bots: Map<string, BotInstance> = new Map();
  private scheduler: Scheduler;
  private logger: Logger;
  private prisma: PrismaService;

  constructor(prisma: PrismaService) {
    super();
    this.scheduler = new Scheduler();
    this.logger = new Logger('TradingEngine');
    this.prisma = prisma;
  }

  async createBot(config: BotConfig): Promise<BotInstance> {
    const strategy = this.createStrategy(config);
    const riskManager = new RiskManager({
      maxDrawdownPercent: config.maxDrawdown,
      dailyLossLimit: config.dailyLossLimit,
      maxPositions: config.maxPositions,
    });

    const bot: BotInstance = {
      id: config.id,
      userId: config.id, // Will be set properly
      strategy,
      riskManager,
      config,
      status: 'PAUSED',
      positions: new Map(),
      trades: [],
      metrics: {
        totalTrades: 0,
        winningTrades: 0,
        losingTrades: 0,
        totalPnL: 0,
        winRate: 0,
        maxDrawdown: 0,
        sharpeRatio: 0,
        startTime: new Date(),
      },
    };

    this.bots.set(config.id, bot);
    this.logger.info(`Bot ${config.name} created`);
    
    return bot;
  }

  private createStrategy(config: BotConfig): BaseStrategy {
    // Strategy factory based on bot config
    // In production, this would create the appropriate strategy based on database config
    return null as any; // Placeholder
  }

  async startBot(botId: string): Promise<void> {
    const bot = this.bots.get(botId);
    if (!bot) throw new Error(`Bot ${botId} not found`);

    bot.status = 'ACTIVE';
    await bot.strategy.start();
    
    // Schedule the bot
    this.scheduler.schedule(botId, async () => {
      await this.executeBot(botId);
    });

    this.logger.info(`Bot ${botId} started`);
    this.emit('bot:started', { botId });

    // Update database
    await this.prisma.bot.update({
      where: { id: botId },
      data: { status: 'ACTIVE', lastRunAt: new Date() },
    });
  }

  async stopBot(botId: string): Promise<void> {
    const bot = this.bots.get(botId);
    if (!bot) throw new Error(`Bot ${botId} not found`);

    bot.status = 'STOPPED';
    await bot.strategy.stop();
    this.scheduler.unschedule(botId);

    this.logger.info(`Bot ${botId} stopped`);
    this.emit('bot:stopped', { botId });

    await this.prisma.bot.update({
      where: { id: botId },
      data: { status: 'STOPPED', isActive: false },
    });
  }

  async executeBot(botId: string): Promise<void> {
    const bot = this.bots.get(botId);
    if (!bot || bot.status !== 'ACTIVE') return;

    try {
      // Check risk limits
      if (bot.riskManager.shouldCircuitBreak()) {
        this.logger.warn(`Circuit breaker activated for bot ${botId}`);
        await this.stopBot(botId);
        return;
      }

      // Get market data
      const marketData = await this.getMarketData(bot);
      
      // Generate trading signal
      const signal = await bot.strategy.onTick(marketData);

      if (signal && signal.action !== 'HOLD') {
        // Validate trade with risk manager
        const validation = bot.riskManager.validateTrade(
          signal,
          Array.from(bot.positions.values()),
          bot.config.capital,
        );

        if (validation.allowed) {
          await this.executeSignal(bot, signal);
        } else {
          this.logger.warn(`Trade rejected: ${validation.reason}`);
        }
      }

      // Update metrics
      this.updateBotMetrics(bot);

    } catch (error) {
      this.logger.error(`Error executing bot ${botId}: ${error.message}`);
      this.emit('bot:error', { botId, error: error.message });
    }
  }

  private async executeSignal(bot: BotInstance, signal: any): Promise<void> {
    try {
      // Calculate position size
      const positionSize = bot.riskManager.calculatePositionSize(
        bot.config.capital,
        2, // 2% risk per trade
        signal.price,
        signal.stopLoss,
      );

      // Execute trade via Deriv API
      const tradeResult = {
        id: `trade_${Date.now()}`,
        symbol: signal.symbol,
        side: signal.action,
        price: signal.price,
        quantity: positionSize,
        stopLoss: signal.stopLoss,
        takeProfit: signal.takeProfit,
        timestamp: new Date(),
      };

      bot.trades.push(tradeResult);
      
      if (signal.action === 'BUY' || signal.action === 'SELL') {
        bot.positions.set(tradeResult.id, tradeResult);
      } else if (signal.action === 'CLOSE') {
        bot.positions.delete(tradeResult.id);
      }

      // Update risk manager
      bot.riskManager.updateEquity(bot.config.capital);

      // Save to database
      await this.saveTrade(bot, tradeResult);

      this.emit('trade:executed', { botId: bot.id, trade: tradeResult });

    } catch (error) {
      this.logger.error(`Failed to execute signal: ${error.message}`);
      throw error;
    }
  }

  private async saveTrade(bot: BotInstance, trade: any): Promise<void> {
    await this.prisma.trade.create({
      data: {
        userId: bot.userId,
        symbol: trade.symbol,
        side: trade.side,
        quantity: trade.quantity,
        price: trade.price,
        pnl: 0, // Will be updated when position closes
        metadata: {
          botId: bot.id,
          stopLoss: trade.stopLoss,
          takeProfit: trade.takeProfit,
        },
      },
    });
  }

  private updateBotMetrics(bot: BotInstance): void {
    const trades = bot.trades;
    const winningTrades = trades.filter(t => (t.pnl || 0) > 0);
    const losingTrades = trades.filter(t => (t.pnl || 0) < 0);
    const returns = trades.map(t => t.pnl || 0);

    bot.metrics = {
      totalTrades: trades.length,
      winningTrades: winningTrades.length,
      losingTrades: losingTrades.length,
      totalPnL: returns.reduce((sum, r) => sum + r, 0),
      winRate: trades.length > 0 ? (winningTrades.length / trades.length) * 100 : 0,
      maxDrawdown: this.calculateMaxDrawdown(returns),
      sharpeRatio: this.calculateSharpeRatio(returns),
      startTime: bot.metrics.startTime,
    };
  }

  private calculateMaxDrawdown(returns: number[]): number {
    let maxDrawdown = 0;
    let peak = 0;
    let equity = 10000;

    returns.forEach(ret => {
      equity += ret;
      if (equity > peak) peak = equity;
      const drawdown = peak > 0 ? (peak - equity) / peak * 100 : 0;
      if (drawdown > maxDrawdown) maxDrawdown = drawdown;
    });

    return maxDrawdown;
  }

  private calculateSharpeRatio(returns: number[]): number {
    if (returns.length < 2) return 0;
    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / (returns.length - 1);
    const stdDev = Math.sqrt(variance);
    return stdDev > 0 ? (avgReturn / stdDev) * Math.sqrt(252) : 0;
  }

  private async getMarketData(bot: BotInstance): Promise<any> {
    // In production, this would fetch from Deriv connector
    return {
      symbol: 'R_100',
      timestamp: Date.now(),
      open: 1000,
      high: 1010,
      low: 990,
      close: 1005,
      volume: 1000,
    };
  }

  getBotStatus(botId: string): BotInstance | undefined {
    return this.bots.get(botId);
  }

  getAllBots(): BotInstance[] {
    return Array.from(this.bots.values());
  }

  getActiveBots(): BotInstance[] {
    return Array.from(this.bots.values()).filter(b => b.status === 'ACTIVE');
  }

  async shutdown(): Promise<void> {
    this.logger.info('Shutting down trading engine...');
    
    for (const [botId] of this.bots) {
      await this.stopBot(botId);
    }

    this.scheduler.clear();
    this.logger.info('Trading engine shut down');
  }
}