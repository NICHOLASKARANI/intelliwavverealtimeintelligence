// apps/backend/src/modules/analytics/analytics.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AnalyticsService } from './analytics.service';

@ApiTags('Analytics')
@Controller('analytics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get dashboard stats' })
  async getDashboard(@CurrentUser() user: any) {
    return this.analyticsService.getDashboardStats(user.id);
  }

  @Get('equity-curve')
  @ApiOperation({ summary: 'Get equity curve' })
  async getEquityCurve(
    @CurrentUser() user: any,
    @Query('days') days?: number,
  ) {
    return this.analyticsService.getEquityCurve(user.id, days);
  }

  @Get('performance')
  @ApiOperation({ summary: 'Get performance metrics' })
  async getPerformance(@CurrentUser() user: any) {
    return this.analyticsService.getPerformanceMetrics(user.id);
  }

  @Get('daily-pnl')
  @ApiOperation({ summary: 'Get daily P&L' })
  async getDailyPnL(
    @CurrentUser() user: any,
    @Query('days') days?: number,
  ) {
    return this.analyticsService.getDailyPnL(user.id, days);
  }

  @Get('trade-distribution')
  @ApiOperation({ summary: 'Get trade distribution' })
  async getTradeDistribution(@CurrentUser() user: any) {
    return this.analyticsService.getTradeDistribution(user.id);
  }

  @Get('bot-analytics')
  @ApiOperation({ summary: 'Get bot analytics' })
  async getBotAnalytics(@CurrentUser() user: any) {
    return this.analyticsService.getBotAnalytics(user.id);
  }

  @Get('calendar')
  @ApiOperation({ summary: 'Get trade calendar' })
  async getTradeCalendar(
    @CurrentUser() user: any,
    @Query('month') month: number,
    @Query('year') year: number,
  ) {
    return this.analyticsService.getTradeCalendar(user.id, month, year);
  }
}