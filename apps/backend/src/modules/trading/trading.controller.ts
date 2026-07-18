import { Controller, Get, Post, Body, UseGuards, Req, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../database/prisma.service';

@Controller('trading')
@UseGuards(JwtAuthGuard)
export class TradingController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('positions')
  async getPositions(@Req() req: any) {
    return this.prisma.position.findMany({
      where: { userId: req.user.id, isOpen: true },
      orderBy: { openedAt: 'desc' },
    });
  }

  @Get('orders')
  async getOrders(@Req() req: any) {
    return this.prisma.order.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  @Get('history')
  async getHistory(@Req() req: any) {
    return this.prisma.trade.findMany({
      where: { userId: req.user.id },
      orderBy: { timestamp: 'desc' },
      take: 100,
    });
  }

  @Post('orders')
  async createOrder(@Req() req: any, @Body() body: any) {
    return this.prisma.order.create({
      data: {
        userId: req.user.id,
        symbol: body.symbol,
        type: body.type || 'MARKET',
        side: body.side,
        quantity: body.quantity,
        price: body.price,
      },
    });
  }

  @Post('positions/:id/close')
  async closePosition(@Req() req: any, @Param('id') id: string) {
    const position = await this.prisma.position.findFirst({
      where: { id, userId: req.user.id, isOpen: true },
    });
    if (!position) throw new Error('Position not found');
    
    return this.prisma.position.update({
      where: { id },
      data: { isOpen: false, closedAt: new Date() },
    });
  }
}
