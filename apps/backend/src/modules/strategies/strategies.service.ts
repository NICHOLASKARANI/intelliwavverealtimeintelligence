// apps/backend/src/modules/strategies/strategies.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@intelliwave/database';

@Injectable()
export class StrategiesService {
  private readonly logger = new Logger(StrategiesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createStrategy(userId: string, data: any) {
    return this.prisma.strategy.create({
      data: {
        userId,
        name: data.name,
        description: data.description,
        type: data.type,
        config: data.config,
        riskLevel: data.riskLevel || 'MEDIUM',
        indicators: data.indicators,
        isPublic: data.isPublic || false,
      },
    });
  }

  async getUserStrategies(userId: string) {
    return this.prisma.strategy.findMany({
      where: { userId },
      include: {
        bots: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPublicStrategies() {
    return this.prisma.strategy.findMany({
      where: { isPublic: true },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            bots: true,
          },
        },
      },
      orderBy: { totalReturns: 'desc' },
    });
  }

  async getStrategyById(userId: string, strategyId: string) {
    const strategy = await this.prisma.strategy.findFirst({
      where: {
        id: strategyId,
        OR: [
          { userId },
          { isPublic: true },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        bots: {
          select: {
            id: true,
            name: true,
            status: true,
            capital: true,
          },
        },
      },
    });

    if (!strategy) {
      throw new NotFoundException('Strategy not found');
    }

    return strategy;
  }

  async updateStrategy(userId: string, strategyId: string, data: any) {
    const strategy = await this.prisma.strategy.findFirst({
      where: { id: strategyId, userId },
    });

    if (!strategy) {
      throw new NotFoundException('Strategy not found');
    }

    return this.prisma.strategy.update({
      where: { id: strategyId },
      data,
    });
  }

  async deleteStrategy(userId: string, strategyId: string) {
    const strategy = await this.prisma.strategy.findFirst({
      where: { id: strategyId, userId },
    });

    if (!strategy) {
      throw new NotFoundException('Strategy not found');
    }

    // Check if strategy is used by active bots
    const activeBots = await this.prisma.bot.count({
      where: {
        strategyId,
        status: 'ACTIVE',
      },
    });

    if (activeBots > 0) {
      throw new BadRequestException(
        `Cannot delete strategy. ${activeBots} active bot(s) are using it.`,
      );
    }

    await this.prisma.strategy.delete({
      where: { id: strategyId },
    });

    return { message: 'Strategy deleted successfully' };
  }

  async getStrategyPerformance(strategyId: string) {
    const trades = await this.prisma.trade.findMany({
      where: {
        order: {
          strategyId,
        },
      },
    });

    const monthlyPerformance = this.calculateMonthlyPerformance(trades);
    const riskMetrics = this.calculateRiskMetrics(trades);

    return {
      totalTrades: trades.length,
      ...riskMetrics,
      monthlyPerformance,
    };
  }

  private calculateMonthlyPerformance(trades: any[]) {
    const monthly: { [key: string]: { pnl: number; trades: number } } = {};

    trades.forEach(trade => {
      const month = trade.timestamp.toISOString().slice(0, 7);
      if (!monthly[month]) {
        monthly[month] = { pnl: 0, trades: 0 };
      }
      monthly[month].pnl += Number(trade.pnl);
      monthly[month].trades += 1;
    });

    return Object.entries(monthly).map(([month, data]) => ({
      month,
      ...data,
    }));
  }

  private calculateRiskMetrics(trades: any[]) {
    const returns = trades.map(t => Number(t.pnl));
    const winningTrades = returns.filter(r => r > 0);
    const losingTrades = returns.filter(r => r < 0);

    return {
      totalPnL: returns.reduce((sum, r) => sum + r, 0),
      winRate: returns.length > 0 ? (winningTrades.length / returns.length) * 100 : 0,
      averageWin: winningTrades.length > 0
        ? winningTrades.reduce((sum, r) => sum + r, 0) / winningTrades.length
        : 0,
      averageLoss: losingTrades.length > 0
        ? Math.abs(losingTrades.reduce((sum, r) => sum + r, 0) / losingTrades.length)
        : 0,
      maxDrawdown: this.calculateMaxDrawdown(returns),
      sharpeRatio: this.calculateSharpeRatio(returns),
    };
  }

  private calculateMaxDrawdown(returns: number[]): number {
    let maxDrawdown = 0;
    let peak = 0;
    let equity = 0;

    returns.forEach(ret => {
      equity += ret;
      if (equity > peak) peak = equity;
      const drawdown = peak > 0 ? (peak - equity) / peak : 0;
      if (drawdown > maxDrawdown) maxDrawdown = drawdown;
    });

    return maxDrawdown * 100;
  }

  private calculateSharpeRatio(returns: number[]): number {
    if (returns.length < 2) return 0;
    
    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / (returns.length - 1);
    const stdDev = Math.sqrt(variance);
    
    return stdDev > 0 ? (avgReturn / stdDev) * Math.sqrt(252) : 0;
  }
}