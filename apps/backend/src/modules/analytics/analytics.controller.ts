import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../database/prisma.service';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('dashboard')
  async getDashboard(@Req() req: any) {
    const [trades, positions, bots, totalPnL] = await Promise.all([
      this.prisma.trade.count({ where: { userId: req.user.id } }),
      this.prisma.position.count({ where: { userId: req.user.id, isOpen: true } }),
      this.prisma.bot.count({ where: { userId: req.user.id, status: 'ACTIVE' } }),
      this.prisma.trade.aggregate({ where: { userId: req.user.id }, _sum: { pnl: true } }),
    ]);
    return { totalTrades: trades, openPositions: positions, activeBots: bots, totalPnL: totalPnL._sum.pnl || 0 };
  }

  @Get('performance')
  async getPerformance(@Req() req: any) {
    const trades = await this.prisma.trade.findMany({ where: { userId: req.user.id } });
    const winning = trades.filter(t => t.pnl > 0);
    const winRate = trades.length > 0 ? (winning.length / trades.length) * 100 : 0;
    const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);
    return { totalTrades: trades.length, winRate, totalPnL, winningTrades: winning.length };
  }

  @Get('daily-pnl')
  async getDailyPnL(@Req() req: any, @Query('days') days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const trades = await this.prisma.trade.findMany({
      where: { userId: req.user.id, timestamp: { gte: startDate } },
      orderBy: { timestamp: 'asc' },
    });
    const dailyPnL: Record<string, number> = {};
    for (let i = 0; i < days; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      dailyPnL[d.toISOString().slice(0, 10)] = 0;
    }
    trades.forEach(t => {
      const day = t.timestamp.toISOString().slice(0, 10);
      dailyPnL[day] = (dailyPnL[day] || 0) + t.pnl;
    });
    return Object.entries(dailyPnL).map(([date, pnl]) => ({ date, pnl: Math.round(pnl * 100) / 100 })).reverse();
  }
}
