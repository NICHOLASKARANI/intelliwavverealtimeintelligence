// apps/backend/src/modules/notifications/notifications.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@intelliwave/database';
import { NotificationType } from '@prisma/client';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createNotification(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    data?: any,
  ) {
    return this.prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        data: data || {},
      },
    });
  }

  async getUserNotifications(userId: string, limit: number = 50) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async getUnreadNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId, isRead: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(userId: string, notificationId: string) {
    await this.prisma.notification.updateMany({
      where: {
        id: notificationId,
        userId,
      },
      data: { isRead: true },
    });

    return { message: 'Notification marked as read' };
  }

  async markAllAsRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: { isRead: true },
    });

    return { message: 'All notifications marked as read' };
  }

  async deleteNotification(userId: string, notificationId: string) {
    await this.prisma.notification.deleteMany({
      where: {
        id: notificationId,
        userId,
      },
    });

    return { message: 'Notification deleted' };
  }

  async getNotificationCount(userId: string) {
    const count = await this.prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });

    return { unreadCount: count };
  }

  // Business event notifications
  async notifyTradeOpened(userId: string, trade: any) {
    return this.createNotification(
      userId,
      'TRADE_OPENED',
      'Trade Opened',
      `${trade.side} ${trade.symbol} @ ${trade.price}`,
      { tradeId: trade.id, symbol: trade.symbol },
    );
  }

  async notifyTradeClosed(userId: string, trade: any) {
    const pnlFormatted = trade.pnl >= 0 ? `+$${trade.pnl}` : `-$${Math.abs(trade.pnl)}`;
    return this.createNotification(
      userId,
      'TRADE_CLOSED',
      'Trade Closed',
      `${trade.symbol} closed with ${pnlFormatted}`,
      { tradeId: trade.id, pnl: trade.pnl },
    );
  }

  async notifyBotStarted(userId: string, bot: any) {
    return this.createNotification(
      userId,
      'BOT_STARTED',
      'Bot Started',
      `${bot.name} has started trading`,
      { botId: bot.id },
    );
  }

  async notifyBotError(userId: string, bot: any, error: string) {
    return this.createNotification(
      userId,
      'BOT_ERROR',
      'Bot Error',
      `${bot.name}: ${error}`,
      { botId: bot.id, error },
    );
  }

  async notifyAIDedication(userId: string, recommendation: any) {
    return this.createNotification(
      userId,
      'AI_RECOMMENDATION',
      'AI Trade Recommendation',
      `${recommendation.symbol}: ${recommendation.direction} with ${recommendation.confidence}% confidence`,
      { recommendation },
    );
  }
}
