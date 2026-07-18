// apps/backend/src/modules/bots/bots.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@intelliwave/database';
import { CreateBotDto, UpdateBotDto, StartBotDto } from './dto/bot.dto';

@Injectable()
export class BotsService {
  private readonly logger = new Logger(BotsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createBot(userId: string, createBotDto: CreateBotDto) {
    // Validate strategy
    const strategy = await this.prisma.strategy.findFirst({
      where: { id: createBotDto.strategyId, userId },
    });

    if (!strategy) {
      throw new NotFoundException('Strategy not found');
    }

    // Validate trading account
    const account = await this.prisma.tradingAccount.findFirst({
      where: { id: createBotDto.tradingAccountId, userId },
    });

    if (!account) {
      throw new NotFoundException('Trading account not found');
    }

    // Create bot
    const bot = await this.prisma.bot.create({
      data: {
        userId,
        name: createBotDto.name,
        description: createBotDto.description,
        strategyId: createBotDto.strategyId,
        tradingAccountId: createBotDto.tradingAccountId,
        riskProfileId: createBotDto.riskProfileId,
        config: createBotDto.config || {},
        capital: createBotDto.capital,
        maxDrawdown: createBotDto.maxDrawdown || 20,
        dailyLossLimit: createBotDto.dailyLossLimit || 5,
        takeProfit: createBotDto.takeProfit,
        stopLoss: createBotDto.stopLoss,
        maxPositions: createBotDto.maxPositions || 5,
      },
    });

    return bot;
  }

  async getUserBots(userId: string) {
    return this.prisma.bot.findMany({
      where: { userId },
      include: {
        strategy: true,
        tradingAccount: true,
        riskProfile: true,
        _count: {
          select: {
            runs: true,
            trades: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getBotById(userId: string, botId: string) {
    const bot = await this.prisma.bot.findFirst({
      where: { id: botId, userId },
      include: {
        strategy: true,
        tradingAccount: true,
        riskProfile: true,
        runs: {
          orderBy: { startTime: 'desc' },
          take: 10,
        },
        positions: {
          where: { isOpen: true },
        },
        _count: {
          select: {
            trades: true,
            orders: true,
          },
        },
      },
    });

    if (!bot) {
      throw new NotFoundException('Bot not found');
    }

    return bot;
  }

  async updateBot(userId: string, botId: string, updateBotDto: UpdateBotDto) {
    const bot = await this.prisma.bot.findFirst({
      where: { id: botId, userId },
    });

    if (!bot) {
      throw new NotFoundException('Bot not found');
    }

    if (bot.status === 'ACTIVE') {
      throw new BadRequestException('Cannot update active bot. Stop it first.');
    }

    return this.prisma.bot.update({
      where: { id: botId },
      data: updateBotDto,
    });
  }

  async startBot(userId: string, botId: string) {
    const bot = await this.prisma.bot.findFirst({
      where: { id: botId, userId },
    });

    if (!bot) {
      throw new NotFoundException('Bot not found');
    }

    if (bot.status === 'ACTIVE') {
      throw new BadRequestException('Bot is already running');
    }

    // Validate bot configuration
    await this.validateBotConfig(bot);

    // Create bot run
    const run = await this.prisma.botRun.create({
      data: {
        botId,
        status: 'RUNNING',
        startTime: new Date(),
      },
    });

    // Update bot status
    await this.prisma.bot.update({
      where: { id: botId },
      data: {
        status: 'ACTIVE',
        isActive: true,
        lastRunAt: new Date(),
      },
    });

    // Publish bot start event to Redis for engine
    // await this.redis.publish('bot:start', { botId, userId, runId: run.id });

    return { bot, run };
  }

  async stopBot(userId: string, botId: string) {
    const bot = await this.prisma.bot.findFirst({
      where: { id: botId, userId, status: 'ACTIVE' },
    });

    if (!bot) {
      throw new NotFoundException('Active bot not found');
    }

    // Update current run
    const currentRun = await this.prisma.botRun.findFirst({
      where: { botId, status: 'RUNNING' },
      orderBy: { startTime: 'desc' },
    });

    if (currentRun) {
      await this.prisma.botRun.update({
        where: { id: currentRun.id },
        data: {
          status: 'STOPPED',
          endTime: new Date(),
        },
      });
    }

    // Update bot status
    await this.prisma.bot.update({
      where: { id: botId },
      data: {
        status: 'STOPPED',
        isActive: false,
      },
    });

    return { message: 'Bot stopped successfully' };
  }

  async deleteBot(userId: string, botId: string) {
    const bot = await this.prisma.bot.findFirst({
      where: { id: botId, userId },
    });

    if (!bot) {
      throw new NotFoundException('Bot not found');
    }

    if (bot.status === 'ACTIVE') {
      throw new BadRequestException('Stop the bot before deleting');
    }

    await this.prisma.bot.delete({
      where: { id: botId },
    });

    return { message: 'Bot deleted successfully' };
  }

  async getBotPerformance(userId: string, botId: string) {
    const bot = await this.prisma.bot.findFirst({
      where: { id: botId, userId },
    });

    if (!bot) {
      throw new NotFoundException('Bot not found');
    }

    const trades = await this.prisma.trade.findMany({
      where: {
        userId,
        position: {
          botId,
        },
      },
    });

    const winningTrades = trades.filter(t => t.pnl > 0);
    const losingTrades = trades.filter(t => t.pnl < 0);

    const totalPnL = trades.reduce((sum, t) => sum + Number(t.pnl), 0);
    const winRate = trades.length > 0 ? (winningTrades.length / trades.length) * 100 : 0;
    const avgWin = winningTrades.length > 0
      ? winningTrades.reduce((sum, t) => sum + Number(t.pnl), 0) / winningTrades.length
      : 0;
    const avgLoss = losingTrades.length > 0
      ? Math.abs(losingTrades.reduce((sum, t) => sum + Number(t.pnl), 0) / losingTrades.length)
      : 0;
    const profitFactor = avgLoss > 0 ? avgWin / avgLoss : 0;

    return {
      totalTrades: trades.length,
      winningTrades: winningTrades.length,
      losingTrades: losingTrades.length,
      totalPnL,
      winRate,
      avgWin,
      avgLoss,
      profitFactor,
      bot: {
        name: bot.name,
        status: bot.status,
        capital: bot.capital,
      },
    };
  }

  async duplicateBot(userId: string, botId: string) {
    const bot = await this.prisma.bot.findFirst({
      where: { id: botId, userId },
    });

    if (!bot) {
      throw new NotFoundException('Bot not found');
    }

    const newBot = await this.prisma.bot.create({
      data: {
        userId: bot.userId,
        name: `${bot.name} (Copy)`,
        description: bot.description,
        strategyId: bot.strategyId,
        tradingAccountId: bot.tradingAccountId,
        riskProfileId: bot.riskProfileId,
        config: bot.config as any,
        capital: bot.capital,
        maxDrawdown: bot.maxDrawdown,
        dailyLossLimit: bot.dailyLossLimit,
        takeProfit: bot.takeProfit,
        stopLoss: bot.stopLoss,
        maxPositions: bot.maxPositions,
      },
    });

    return newBot;
  }

  private async validateBotConfig(bot: any) {
    // Validate strategy exists and is configured
    const strategy = await this.prisma.strategy.findUnique({
      where: { id: bot.strategyId },
    });

    if (!strategy) {
      throw new BadRequestException('Strategy not found');
    }

    // Validate trading account has sufficient balance
    const account = await this.prisma.tradingAccount.findUnique({
      where: { id: bot.tradingAccountId },
    });

    if (!account) {
      throw new BadRequestException('Trading account not found');
    }

    if (account.balance < bot.capital) {
      throw new BadRequestException(
        `Insufficient balance. Required: ${bot.capital}, Available: ${account.balance}`,
      );
    }

    // Check if user has reached bot limit based on subscription
    const user = await this.prisma.user.findUnique({
      where: { id: bot.userId },
      include: {
        subscriptions: {
          where: { status: 'ACTIVE' },
        },
      },
    });

    const activeBots = await this.prisma.bot.count({
      where: {
        userId: bot.userId,
        status: 'ACTIVE',
      },
    });

    const botLimit = this.getBotLimit(user.subscriptions[0]?.plan || 'FREE');
    if (activeBots >= botLimit) {
      throw new BadRequestException(
        `Bot limit (${botLimit}) reached for your subscription plan`,
      );
    }
  }

  private getBotLimit(plan: string): number {
    switch (plan) {
      case 'ENTERPRISE': return 100;
      case 'PROFESSIONAL': return 25;
      case 'STARTER': return 5;
      default: return 1;
    }
  }
}