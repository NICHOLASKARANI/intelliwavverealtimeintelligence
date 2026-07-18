// apps/backend/src/modules/admin/admin.service.ts
import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@intelliwave/database';
import { MathUtil } from '@intelliwave/shared';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getSystemStats() {
    const [
      totalUsers,
      activeUsers,
      totalBots,
      activeBots,
      totalTrades,
      totalVolume,
      revenue,
      subscriptions,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { status: 'ACTIVE' } }),
      this.prisma.bot.count(),
      this.prisma.bot.count({ where: { status: 'ACTIVE' } }),
      this.prisma.trade.count(),
      this.calculateTotalVolume(),
      this.calculateRevenue(),
      this.prisma.subscription.count({ where: { status: 'ACTIVE' } }),
    ]);

    return {
      users: { total: totalUsers, active: activeUsers },
      bots: { total: totalBots, active: activeBots },
      trades: totalTrades,
      volume: totalVolume,
      revenue,
      subscriptions,
    };
  }

  async getUsers(filters: any) {
    const where: any = {};

    if (filters.status) where.status = filters.status;
    if (filters.role) where.role = filters.role;
    if (filters.search) {
      where.OR = [
        { email: { contains: filters.search, mode: 'insensitive' } },
        { username: { contains: filters.search, mode: 'insensitive' } },
        { firstName: { contains: filters.search, mode: 'insensitive' } },
        { lastName: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          username: true,
          firstName: true,
          lastName: true,
          role: true,
          status: true,
          emailVerified: true,
          twoFactorEnabled: true,
          lastLoginAt: true,
          createdAt: true,
          _count: {
            select: {
              bots: true,
              trades: true,
              subscriptions: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: filters.limit || 50,
        skip: filters.offset || 0,
      }),
      this.prisma.user.count({ where }),
    ]);

    return { users, total, page: Math.floor((filters.offset || 0) / (filters.limit || 50)) + 1 };
  }

  async getUserDetails(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        sessions: true,
        derivAccounts: true,
        tradingAccounts: true,
        strategies: true,
        bots: {
          include: {
            runs: {
              orderBy: { startTime: 'desc' },
              take: 10,
            },
          },
        },
        orders: {
          orderBy: { createdAt: 'desc' },
          take: 50,
        },
        trades: {
          orderBy: { timestamp: 'desc' },
          take: 50,
        },
        subscriptions: true,
        payments: true,
        apiKeys: true,
        auditLogs: {
          orderBy: { createdAt: 'desc' },
          take: 100,
        },
        referrals: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const { passwordHash, twoFactorSecret, ...safeUser } = user;
    return safeUser;
  }

  async updateUserStatus(userId: string, status: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    // Stop all active bots if suspending/banning
    if (status === 'SUSPENDED' || status === 'BANNED') {
      await this.prisma.bot.updateMany({
        where: { userId, status: 'ACTIVE' },
        data: { status: 'STOPPED', isActive: false },
      });
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { status: status as any },
    });
  }

  async updateUserRole(userId: string, role: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.update({
      where: { id: userId },
      data: { role: role as any },
    });
  }

  async getRevenueAnalytics(period: string = 'monthly') {
    const startDate = this.getStartDate(period);
    
    const payments = await this.prisma.payment.findMany({
      where: {
        createdAt: { gte: startDate },
        status: 'COMPLETED',
      },
      orderBy: { createdAt: 'asc' },
    });

    const subscriptionRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);
    
    // Group by period
    const grouped = this.groupByPeriod(payments, period);

    return {
      totalRevenue: MathUtil.roundTo(subscriptionRevenue, 2),
      period,
      data: grouped,
    };
  }

  async getTradingAnalytics(period: string = 'monthly') {
    const startDate = this.getStartDate(period);

    const trades = await this.prisma.trade.findMany({
      where: { timestamp: { gte: startDate } },
      orderBy: { timestamp: 'asc' },
    });

    const totalVolume = trades.reduce((sum, t) => sum + Number(t.quantity) * Number(t.price), 0);
    const totalPnL = trades.reduce((sum, t) => sum + Number(t.pnl), 0);

    // Top symbols
    const symbolStats: Record<string, { count: number; volume: number; pnl: number }> = {};
    trades.forEach(trade => {
      if (!symbolStats[trade.symbol]) {
        symbolStats[trade.symbol] = { count: 0, volume: 0, pnl: 0 };
      }
      symbolStats[trade.symbol].count++;
      symbolStats[trade.symbol].volume += Number(trade.quantity) * Number(trade.price);
      symbolStats[trade.symbol].pnl += Number(trade.pnl);
    });

    const topSymbols = Object.entries(symbolStats)
      .map(([symbol, stats]) => ({ symbol, ...stats }))
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 10);

    return {
      totalVolume: MathUtil.roundTo(totalVolume, 2),
      totalPnL: MathUtil.roundTo(totalPnL, 2),
      totalTrades: trades.length,
      topSymbols,
    };
  }

  async getBotAnalytics() {
    const bots = await this.prisma.bot.findMany({
      include: {
        user: {
          select: { email: true, username: true },
        },
        strategy: {
          select: { name: true, type: true },
        },
        _count: {
          select: { trades: true, runs: true },
        },
      },
    });

    const activeBots = bots.filter(b => b.status === 'ACTIVE');
    const errorBots = bots.filter(b => b.status === 'ERROR');

    const strategyUsage: Record<string, number> = {};
    bots.forEach(bot => {
      const type = bot.strategy?.type || 'Unknown';
      strategyUsage[type] = (strategyUsage[type] || 0) + 1;
    });

    return {
      totalBots: bots.length,
      activeBots: activeBots.length,
      errorBots: errorBots.length,
      strategyUsage,
      recentBots: bots.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 10),
    };
  }

  async getAuditLogs(filters: any) {
    const where: any = {};

    if (filters.userId) where.userId = filters.userId;
    if (filters.action) where.action = filters.action;
    if (filters.startDate) {
      where.createdAt = { gte: new Date(filters.startDate) };
    }

    const [logs, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        include: {
          user: {
            select: { email: true, username: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: filters.limit || 100,
        skip: filters.offset || 0,
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return { logs, total };
  }

  async getSystemHealth() {
    const dbStart = Date.now();
    await this.prisma.$queryRaw`SELECT 1`;
    const dbLatency = Date.now() - dbStart;

    // Get Redis health (would need Redis client)
    const redisHealthy = true; // Placeholder

    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: {
          status: dbLatency < 1000 ? 'healthy' : 'degraded',
          latency: `${dbLatency}ms`,
        },
        redis: {
          status: redisHealthy ? 'healthy' : 'unhealthy',
        },
        api: {
          status: 'healthy',
          uptime: process.uptime(),
        },
      },
      memory: process.memoryUsage(),
    };
  }

  async getFeatureFlags() {
    // In production, this would come from a feature flag service
    return {
      ENABLE_AI_TRADING: process.env.ENABLE_AI_TRADING === 'true',
      ENABLE_COPY_TRADING: process.env.ENABLE_COPY_TRADING === 'true',
      ENABLE_SOCIAL_FEATURES: process.env.ENABLE_SOCIAL_FEATURES === 'true',
      MAINTENANCE_MODE: process.env.MAINTENANCE_MODE === 'true',
      MAX_BOTS_PER_USER: parseInt(process.env.MAX_BOTS_PER_USER || '10'),
    };
  }

  async updateFeatureFlag(flag: string, value: any) {
    // In production, update feature flag service
    this.logger.info(`Feature flag ${flag} updated to ${value}`);
    return { flag, value, updated: true };
  }

  async getSupportTickets(filters: any) {
    const where: any = {};
    
    if (filters.status) where.status = filters.status;
    if (filters.priority) where.priority = filters.priority;

    return this.prisma.supportTicket.findMany({
      where,
      include: {
        user: {
          select: { email: true, username: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: filters.limit || 50,
      skip: filters.offset || 0,
    });
  }

  async resolveTicket(ticketId: string) {
    return this.prisma.supportTicket.update({
      where: { id: ticketId },
      data: {
        status: 'RESOLVED',
        resolvedAt: new Date(),
      },
    });
  }

  private async calculateTotalVolume(): Promise<number> {
    const result = await this.prisma.trade.aggregate({
      _sum: {
        quantity: true,
      },
    });
    return Number(result._sum.quantity || 0);
  }

  private async calculateRevenue(): Promise<number> {
    const result = await this.prisma.payment.aggregate({
      where: { status: 'COMPLETED' },
      _sum: {
        amount: true,
      },
    });
    return Number(result._sum.amount || 0);
  }

  private getStartDate(period: string): Date {
    const now = new Date();
    switch (period) {
      case 'daily':
        return new Date(now.setDate(now.getDate() - 30));
      case 'weekly':
        return new Date(now.setDate(now.getDate() - 90));
      case 'monthly':
        return new Date(now.setMonth(now.getMonth() - 12));
      case 'yearly':
        return new Date(now.setFullYear(now.getFullYear() - 3));
      default:
        return new Date(now.setMonth(now.getMonth() - 12));
    }
  }

  private groupByPeriod(data: any[], period: string) {
    const grouped: Record<string, any> = {};

    data.forEach(item => {
      let key: string;
      const date = new Date(item.createdAt);

      switch (period) {
        case 'daily':
          key = date.toISOString().slice(0, 10);
          break;
        case 'weekly':
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          key = weekStart.toISOString().slice(0, 10);
          break;
        case 'monthly':
          key = date.toISOString().slice(0, 7);
          break;
        case 'yearly':
          key = date.getFullYear().toString();
          break;
        default:
          key = date.toISOString().slice(0, 7);
      }

      if (!grouped[key]) {
        grouped[key] = { period: key, count: 0, amount: 0 };
      }
      grouped[key].count++;
      grouped[key].amount += Number(item.amount);
    });

    return Object.values(grouped).sort((a: any, b: any) => a.period.localeCompare(b.period));
  }
}