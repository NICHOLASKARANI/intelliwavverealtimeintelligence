// apps/backend/src/modules/admin/admin.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN')
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get system statistics' })
  async getSystemStats() {
    return this.adminService.getSystemStats();
  }

  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  async getUsers(
    @Query('status') status?: string,
    @Query('role') role?: string,
    @Query('search') search?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.adminService.getUsers({ status, role, search, limit, offset });
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get user details' })
  async getUserDetails(@Param('id') id: string) {
    return this.adminService.getUserDetails(id);
  }

  @Put('users/:id/status')
  @ApiOperation({ summary: 'Update user status' })
  async updateUserStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.adminService.updateUserStatus(id, status);
  }

  @Put('users/:id/role')
  @ApiOperation({ summary: 'Update user role' })
  async updateUserRole(
    @Param('id') id: string,
    @Body('role') role: string,
  ) {
    return this.adminService.updateUserRole(id, role);
  }

  @Get('analytics/revenue')
  @ApiOperation({ summary: 'Get revenue analytics' })
  async getRevenueAnalytics(@Query('period') period?: string) {
    return this.adminService.getRevenueAnalytics(period);
  }

  @Get('analytics/trading')
  @ApiOperation({ summary: 'Get trading analytics' })
  async getTradingAnalytics(@Query('period') period?: string) {
    return this.adminService.getTradingAnalytics(period);
  }

  @Get('analytics/bots')
  @ApiOperation({ summary: 'Get bot analytics' })
  async getBotAnalytics() {
    return this.adminService.getBotAnalytics();
  }

  @Get('audit-logs')
  @ApiOperation({ summary: 'Get audit logs' })
  async getAuditLogs(
    @Query('userId') userId?: string,
    @Query('action') action?: string,
    @Query('startDate') startDate?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.adminService.getAuditLogs({ userId, action, startDate, limit, offset });
  }

  @Get('health')
  @ApiOperation({ summary: 'Get system health' })
  async getSystemHealth() {
    return this.adminService.getSystemHealth();
  }

  @Get('feature-flags')
  @ApiOperation({ summary: 'Get feature flags' })
  async getFeatureFlags() {
    return this.adminService.getFeatureFlags();
  }

  @Put('feature-flags/:flag')
  @ApiOperation({ summary: 'Update feature flag' })
  async updateFeatureFlag(
    @Param('flag') flag: string,
    @Body('value') value: any,
  ) {
    return this.adminService.updateFeatureFlag(flag, value);
  }

  @Get('support-tickets')
  @ApiOperation({ summary: 'Get support tickets' })
  async getSupportTickets(
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.adminService.getSupportTickets({ status, priority, limit, offset });
  }

  @Post('support-tickets/:id/resolve')
  @ApiOperation({ summary: 'Resolve support ticket' })
  async resolveTicket(@Param('id') id: string) {
    return this.adminService.resolveTicket(id);
  }
}