// apps/backend/src/modules/analytics/analytics.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@intelliwave/database';
import { MathUtil } from '@intelliwave/shared';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats(userId: string) {
    const [totalTrades, openPositions, activeBots, totalPnL] = await Promise.all([
      this.prisma.trade.count({ where: { userId } }),
      this.prisma.position.count({ where: { userId, isOpen: true } }),
      this.prisma.bot.count({ where: { userId, status: 'ACTIVE' } }),
      this.getTotalPnL(userId),
    ]);

    return {
      totalTrades,
      openPositions,
      activeBots,
      totalPnL,
    };
  }

  async getEquityCurve(userId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const trades = await this.prisma.trade.findMany({
      where: {
        userId,
        timestamp: { gte: startDate },
      },
      orderBy: { timestamp: 'asc' },
    });

    let equity = 10000; // Starting equity
    const equityCurve: { date: string; equity: number; pnl: number }[] = [];

    trades.forEach(trade => {
      equity += Number(trade.pnl);
      equityCurve.push({
        date: trade.timestamp.toISOString(),
        equity: MathUtil.roundTo(equity, 2),
        pnl: Number(trade.pnl),
      });
    });

    return equityCurve;
  }

  async getPerformanceMetrics(userId: string) {
    const trades = await this.prisma.trade.findMany({
      where: { userId },
    });

    const returns = trades.map(t => Number(t.pnl));
    const winningTrades = returns.filter(r => r > 0);
    const losingTrades = returns.filter(r => r < 0);

    return {
      totalTrades: returns.length,
      winningTrades: winningTrades.length,
      losingTrades: losingTrades.length,
      winRate: returns.length > 0
        ? MathUtil.roundTo((winningTrades.length / returns.length) * 100, 2)
        : 0,
      totalPnL: MathUtil.roundTo(returns.reduce((sum, r) => sum + r, 0), 2),
      averageWin: winningTrades.length > 0
        ? MathUtil.roundTo(winningTrades.reduce((sum, r) => sum + r, 0) / winningTrades.length, 2)
        : 0,
      averageLoss: losingTrades.length > 0
        ? MathUtil.roundTo(Math.abs(losingTrades.reduce((sum, r) => sum + r, 0) / losingTrades.length), 2)
        : 0,
      profitFactor: this.calculateProfitFactor(winningTrades, losingTrades),
      sharpeRatio: MathUtil.calculateSharpeRatio(returns),
      maxDrawdown: MathUtil.calculateMaxDrawdown(returns),
      expectancy: this.calculateExpectancy(returns, winningTrades, losingTrades),
    };
  }

  async getDailyPnL(userId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const trades = await this.prisma.trade.findMany({
      where: {
        userId,
        timestamp: { gte: startDate },
      },
    });

    const dailyPnL: { [key: string]: number } = {};
    const today = new Date();

    // Initialize all days with 0
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dailyPnL[date.toISOString().slice(0, 10)] = 0;
    }

    // Sum PnL by day
    trades.forEach(trade => {
      const day = trade.timestamp.toISOString().slice(0, 10);
      dailyPnL[day] = (dailyPnL[day] || 0) + Number(trade.pnl);
    });

    return Object.entries(dailyPnL)
      .map(([date, pnl]) => ({ date, pnl: MathUtil.roundTo(pnl, 2) }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  async getTradeDistribution(userId: string) {
    const trades = await this.prisma.trade.findMany({
      where: { userId },
      select: {
        symbol: true,
        pnl: true,
        side: true,
      },
    });

    const bySymbol: { [key: string]: { count: number; pnl: number; buys: number; sells: number } } = {};

    trades.forEach(trade => {
      if (!bySymbol[trade.symbol]) {
        bySymbol[trade.symbol] = { count: 0, pnl: 0, buys: 0, sells: 0 };
      }
      bySymbol[trade.symbol].count++;
      bySymbol[trade.symbol].pnl += Number(trade.pnl);
      if (trade.side === 'BUY') bySymbol[trade.symbol].buys++;
      else bySymbol[trade.symbol].sells++;
    });

    return Object.entries(bySymbol).map(([symbol, data]) => ({
      symbol,
      ...data,
      pnl: MathUtil.roundTo(data.pnl, 2),
    }));
  }

  async getBotAnalytics(userId: string) {
    const bots = await this.prisma.bot.findMany({
      where: { userId },
      include: {
        runs: {
          orderBy: { startTime: 'desc' },
          take: 30,
        },
        trades: true,
      },
    });

    return bots.map(bot => {
      const trades = bot.trades;
      const winningTrades = trades.filter(t => t.pnl > 0);

      return {
        id: bot.id,
        name: bot.name,
        status: bot.status,
        capital: bot.capital,
        totalTrades: trades.length,
        totalPnL: trades.reduce((sum, t) => sum + Number(t.pnl), 0),
        winRate: trades.length > 0 ? (winningTrades.length / trades.length) * 100 : 0,
        avgTradeDuration: this.calculateAvgTradeDuration(trades),
        runs: bot.runs.map(run => ({
          id: run.id,
          status: run.status,
          startTime: run.startTime,
          endTime: run.endTime,
          pnl: run.pnl,
          trades: run.trades,
          winRate: run.winRate,
        })),
      };
    });
  }

  async getTradeCalendar(userId: string, month: number, year: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const trades = await this.prisma.trade.findMany({
      where: {
        userId,
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const calendar: { [key: number]: { count: number; pnl: number; wins: number; losses: number } } = {};

    trades.forEach(trade => {
      const day = new Date(trade.timestamp).getDate();
      if (!calendar[day]) {
        calendar[day] = { count: 0, pnl: 0, wins: 0, losses: 0 };
      }
      calendar[day].count++;
      calendar[day].pnl += Number(trade.pnl);
      if (trade.pnl > 0) calendar[day].wins++;
      else calendar[day].losses++;
    });

    return calendar;
  }

  private async getTotalPnL(userId: string) {
    const result = await this.prisma.trade.aggregate({
      where: { userId },
      _sum: { pnl: true },
    });
    return result._sum.pnl || 0;
  }

  private calculateProfitFactor(winners: number[], losers: number[]): number {
    const totalWins = winners.reduce((sum, w) => sum + w, 0);
    const totalLosses = Math.abs(losers.reduce((sum, l) => sum + l, 0));
    return totalLosses > 0 ? MathUtil.roundTo(totalWins / totalLosses, 2) : 0;
  }

  private calculateExpectancy(
    returns: number[],
    winners: number[],
    losers: number[],
  ): number {
    if (returns.length === 0) return 0;
    
    const winRate = winners.length / returns.length;
    const avgWin = winners.length > 0
      ? winners.reduce((sum, w) => sum + w, 0) / winners.length
      : 0;
    const avgLoss = losers.length > 0
      ? Math.abs(losers.reduce((sum, l) => sum + l, 0) / losers.length)
      : 0;

    return MathUtil.roundTo((winRate * avgWin) - ((1 - winRate) * avgLoss), 2);
  }

  private calculateAvgTradeDuration(trades: any[]): number {
    if (trades.length === 0) return 0;
    
    // This would need position open/close times
    // Simplified version
    return 0;
  }
}