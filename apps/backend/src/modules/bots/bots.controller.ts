import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../database/prisma.service';

@Controller('bots')
@UseGuards(JwtAuthGuard)
export class BotsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getBots(@Req() req: any) {
    return this.prisma.bot.findMany({
      where: { userId: req.user.id },
      include: { runs: { orderBy: { startTime: 'desc' }, take: 5 } },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Post()
  async createBot(@Req() req: any, @Body() body: any) {
    return this.prisma.bot.create({
      data: {
        userId: req.user.id,
        name: body.name,
        description: body.description,
        strategyId: body.strategyId,
        config: body.config || {},
        capital: body.capital || 1000,
        maxDrawdown: body.maxDrawdown || 20,
      },
    });
  }

  @Post(':id/start')
  async startBot(@Req() req: any, @Param('id') id: string) {
    return this.prisma.bot.update({
      where: { id },
      data: { status: 'ACTIVE', isActive: true, lastRunAt: new Date() },
    });
  }

  @Post(':id/stop')
  async stopBot(@Req() req: any, @Param('id') id: string) {
    return this.prisma.bot.update({
      where: { id },
      data: { status: 'STOPPED', isActive: false },
    });
  }

  @Delete(':id')
  async deleteBot(@Req() req: any, @Param('id') id: string) {
    return this.prisma.bot.delete({ where: { id } });
  }
}
