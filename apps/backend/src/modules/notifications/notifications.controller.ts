import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../database/prisma.service';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getNotifications(@Req() req: any) {
    return this.prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  @Put(':id/read')
  async markAsRead(@Req() req: any, @Param('id') id: string) {
    return this.prisma.notification.updateMany({
      where: { id, userId: req.user.id },
      data: { isRead: true },
    });
  }

  @Post('read-all')
  async markAllAsRead(@Req() req: any) {
    return this.prisma.notification.updateMany({
      where: { userId: req.user.id, isRead: false },
      data: { isRead: true },
    });
  }

  @Get('unread-count')
  async getUnreadCount(@Req() req: any) {
    return {
      count: await this.prisma.notification.count({
        where: { userId: req.user.id, isRead: false },
      }),
    };
  }
}
