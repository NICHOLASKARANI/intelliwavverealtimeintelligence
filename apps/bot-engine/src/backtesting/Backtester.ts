// apps/bot-engine/src/backtesting/Backtester.ts
import { BaseStrategy } from '../strategies/BaseStrategy';
import { RiskManager } from '../core/RiskManager';
import { Logger } from '../utils/logger';
import { MathUtil } from '@intelliwave/shared';

export interface BacktestConfig {
  symbol: string;
  startDate: Date;
  endDate: Date;
  initialCapital: number;
  commission: number;
  slippage: number;
}

export interface BacktestResult {
  totalReturn: number;
  totalReturnPercent: number;
  annualizedReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  maxDrawdownPercent: number;
  winRate: number;
  profitFactor: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  averageWin: number;
  averageLoss: number;
  expectancy: number;
  equityCurve: { date: Date; equity: number }[];
  trades: BacktestTrade[];
}

export interface BacktestTrade {
  entryDate: Date;
  exitDate: Date;
  symbol: string;
  side: 'BUY' | 'SELL';
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  pnl: number;
  pnlPercent: number;
  exitReason: string;
}

export class Backtester {
  private logger: Logger;
  private config: BacktestConfig;

  constructor(config: BacktestConfig) {
    this.config = {
      commission: 0.001, // 0.1%
      slippage: 0.0005, // 0.05%
      ...config,
    };
    this.logger = new Logger('Backtester');
  }

  async run(
    strategy: BaseStrategy,
    historicalData: any[],
  ): Promise<BacktestResult> {
    this.logger.info(`Starting backtest for ${this.config.symbol}`);
    this.logger.info(`Period: ${this.config.startDate} to ${this.config.endDate}`);
    
    const riskManager = new RiskManager({
      maxDrawdownPercent: 30,
      dailyLossLimit: 1000,
      maxPositions: 10,
    });

    let equity = this.config.initialCapital;
    let peakEquity = equity;
    const trades: BacktestTrade[] = [];
    const equityCurve: { date: Date; equity: number }[] = [];
    const positions: Map<string, BacktestTrade> = new Map();

    equityCurve.push({
      date: new Date(this.config.startDate),
      equity,
    });

    // Process each candle
    for (let i = 0; i < historicalData.length; i++) {
      const candle = historicalData[i];
      
      // Apply slippage to OHLC
      const slippedCandle = this.applySlippage(candle);
      
      // Calculate indicators
      const dataSlice = historicalData.slice(0, i + 1);
      strategy.calculateIndicators(dataSlice);
      
      // Generate signal
      const signal = await strategy.onTick(slippedCandle);

      if (signal && signal.action !== 'HOLD') {
        // Validate trade
        const validation = riskManager.validateTrade(
          signal,
          Array.from(positions.values()),
          equity,
        );

        if (validation.allowed) {
          if (signal.action === 'BUY' || signal.action === 'SELL') {
            // Open position
            const position: BacktestTrade = {
              entryDate: new Date(candle.timestamp),
              exitDate: new Date(candle.timestamp),
              symbol: signal.symbol,
              side: signal.action as 'BUY' | 'SELL',
              entryPrice: signal.price || slippedCandle.close,
              exitPrice: 0,
              quantity: this.calculatePositionSize(
                equity,
                signal.price || slippedCandle.close,
                signal.stopLoss || 0,
              ),
              pnl: 0,
              pnlPercent: 0,
              exitReason: 'OPEN',
            };

            // Apply commission
            equity -= position.quantity * position.entryPrice * this.config.commission;
            positions.set(candle.timestamp.toString(), position);

            this.logger.debug(`Opened ${signal.action} position at ${position.entryPrice}`);
          }
        }
      }

      // Check stop loss and take profit for open positions
      for (const [id, position] of positions.entries()) {
        let shouldClose = false;
        let exitReason = '';

        // Stop loss hit
        if (position.side === 'BUY' && slippedCandle.low <= (signal?.stopLoss || 0)) {
          position.exitPrice = signal?.stopLoss || slippedCandle.low;
          shouldClose = true;
          exitReason = 'STOP_LOSS';
        } else if (position.side === 'SELL' && slippedCandle.high >= (signal?.stopLoss || Infinity)) {
          position.exitPrice = signal?.stopLoss || slippedCandle.high;
          shouldClose = true;
          exitReason = 'STOP_LOSS';
        }

        // Take profit hit
        if (position.side === 'BUY' && slippedCandle.high >= (signal?.takeProfit || 0)) {
          position.exitPrice = signal?.takeProfit || slippedCandle.high;
          shouldClose = true;
          exitReason = 'TAKE_PROFIT';
        } else if (position.side === 'SELL' && slippedCandle.low <= (signal?.takeProfit || Infinity)) {
          position.exitPrice = signal?.takeProfit || slippedCandle.low;
          shouldClose = true;
          exitReason = 'TAKE_PROFIT';
        }

        if (shouldClose) {
          // Calculate P&L
          position.exitDate = new Date(candle.timestamp);
          position.pnl = this.calculatePnL(position);
          position.pnlPercent = (position.pnl / (position.entryPrice * position.quantity)) * 100;
          position.exitReason = exitReason;

          // Update equity
          equity += position.pnl;
          equity -= position.quantity * position.exitPrice * this.config.commission;

          trades.push({ ...position });
          positions.delete(id);

          // Update risk manager
          riskManager.updateEquity(equity);

          // Update peak equity
          if (equity > peakEquity) {
            peakEquity = equity;
          }
        }
      }

      // Record equity curve
      equityCurve.push({
        date: new Date(candle.timestamp),
        equity: MathUtil.roundTo(equity, 2),
      });
    }

    // Close any remaining positions at last price
    const lastCandle = historicalData[historicalData.length - 1];
    for (const [, position] of positions.entries()) {
      position.exitPrice = lastCandle.close;
      position.exitDate = new Date(lastCandle.timestamp);
      position.pnl = this.calculatePnL(position);
      position.pnlPercent = (position.pnl / (position.entryPrice * position.quantity)) * 100;
      position.exitReason = 'END_OF_TEST';
      
      equity += position.pnl;
      trades.push({ ...position });
    }

    // Calculate metrics
    const winningTrades = trades.filter(t => t.pnl > 0);
    const losingTrades = trades.filter(t => t.pnl < 0);
    const totalReturn = equity - this.config.initialCapital;
    const totalReturnPercent = (totalReturn / this.config.initialCapital) * 100;

    const result: BacktestResult = {
      totalReturn: MathUtil.roundTo(totalReturn, 2),
      totalReturnPercent: MathUtil.roundTo(totalReturnPercent, 2),
      annualizedReturn: this.calculateAnnualizedReturn(
        totalReturnPercent,
        this.config.startDate,
        this.config.endDate,
      ),
      sharpeRatio: this.calculateSharpeRatio(trades),
      maxDrawdown: this.calculateMaxDrawdown(equityCurve),
      maxDrawdownPercent: this.calculateMaxDrawdownPercent(equityCurve),
      winRate: trades.length > 0 ? (winningTrades.length / trades.length) * 100 : 0,
      profitFactor: this.calculateProfitFactor(winningTrades, losingTrades),
      totalTrades: trades.length,
      winningTrades: winningTrades.length,
      losingTrades: losingTrades.length,
      averageWin: winningTrades.length > 0
        ? winningTrades.reduce((sum, t) => sum + t.pnl, 0) / winningTrades.length
        : 0,
      averageLoss: losingTrades.length > 0
        ? Math.abs(losingTrades.reduce((sum, t) => sum + t.pnl, 0) / losingTrades.length)
        : 0,
      expectancy: this.calculateExpectancy(trades),
      equityCurve,
      trades,
    };

    this.logger.info(`Backtest completed: ${trades.length} trades, ${result.totalReturnPercent}% return`);
    
    return result;
  }

  private applySlippage(candle: any): any {
    const { slippage } = this.config;
    return {
      ...candle,
      open: candle.open * (1 + (Math.random() - 0.5) * slippage),
      high: candle.high * (1 + (Math.random() - 0.5) * slippage),
      low: candle.low * (1 - (Math.random() - 0.5) * slippage),
      close: candle.close * (1 + (Math.random() - 0.5) * slippage),
    };
  }

  private calculatePositionSize(
    equity: number,
    entryPrice: number,
    stopLoss: number,
  ): number {
    const riskAmount = equity * 0.02; // 2% risk
    const priceRisk = Math.abs(entryPrice - stopLoss);
    return priceRisk > 0 ? Math.floor(riskAmount / priceRisk) : 100;
  }

  private calculatePnL(position: BacktestTrade): number {
    const priceDiff = position.side === 'BUY'
      ? position.exitPrice - position.entryPrice
      : position.entryPrice - position.exitPrice;
    
    return priceDiff * position.quantity;
  }

  private calculateAnnualizedReturn(
    totalReturnPercent: number,
    startDate: Date,
    endDate: Date,
  ): number {
    const days = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const years = days / 365;
    
    if (years === 0) return 0;
    
    return MathUtil.roundTo(
      (Math.pow(1 + totalReturnPercent / 100, 1 / years) - 1) * 100,
      2,
    );
  }

  private calculateSharpeRatio(trades: BacktestTrade[]): number {
    const returns = trades.map(t => t.pnlPercent);
    return MathUtil.calculateSharpeRatio(returns);
  }

  private calculateMaxDrawdown(equityCurve: { equity: number }[]): number {
    const equities = equityCurve.map(e => e.equity);
    return MathUtil.calculateMaxDrawdown(equities);
  }

  private calculateMaxDrawdownPercent(equityCurve: { equity: number }[]): number {
    let maxDrawdown = 0;
    let peak = equityCurve[0]?.equity || 0;

    for (const point of equityCurve) {
      if (point.equity > peak) {
        peak = point.equity;
      }
      const drawdown = ((peak - point.equity) / peak) * 100;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }

    return MathUtil.roundTo(maxDrawdown, 2);
  }

  private calculateProfitFactor(
    winningTrades: BacktestTrade[],
    losingTrades: BacktestTrade[],
  ): number {
    const totalWins = winningTrades.reduce((sum, t) => sum + t.pnl, 0);
    const totalLosses = Math.abs(losingTrades.reduce((sum, t) => sum + t.pnl, 0));
    
    return totalLosses > 0 ? MathUtil.roundTo(totalWins / totalLosses, 2) : 0;
  }

  private calculateExpectancy(trades: BacktestTrade[]): number {
    if (trades.length === 0) return 0;
    
    const winningTrades = trades.filter(t => t.pnl > 0);
    const losingTrades = trades.filter(t => t.pnl < 0);
    
    const winRate = winningTrades.length / trades.length;
    const avgWin = winningTrades.length > 0
      ? winningTrades.reduce((sum, t) => sum + t.pnl, 0) / winningTrades.length
      : 0;
    const avgLoss = losingTrades.length > 0
      ? Math.abs(losingTrades.reduce((sum, t) => sum + t.pnl, 0) / losingTrades.length)
      : 0;

    return MathUtil.roundTo((winRate * avgWin) - ((1 - winRate) * avgLoss), 2);
  }
}