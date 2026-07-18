// apps/backend/src/modules/trading/trading.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { TradingService } from './trading.service';
import { CreateOrderDto } from './dto/trading.dto';

@ApiTags('Trading')
@Controller('trading')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TradingController {
  constructor(private readonly tradingService: TradingService) {}

  @Post('orders')
  @ApiOperation({ summary: 'Create order' })
  async createOrder(
    @CurrentUser() user: any,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.tradingService.createOrder(user.id, createOrderDto);
  }

  @Get('orders')
  @ApiOperation({ summary: 'Get orders' })
  async getOrders(
    @CurrentUser() user: any,
    @Query('status') status?: string,
    @Query('symbol') symbol?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.tradingService.getOrders(user.id, { status, symbol, limit, offset });
  }

  @Get('orders/:id')
  @ApiOperation({ summary: 'Get order by ID' })
  async getOrder(@CurrentUser() user: any, @Param('id') id: string) {
    return this.tradingService.getOrderById(user.id, id);
  }

  @Delete('orders/:id')
  @ApiOperation({ summary: 'Cancel order' })
  async cancelOrder(@CurrentUser() user: any, @Param('id') id: string) {
    return this.tradingService.cancelOrder(user.id, id);
  }

  @Get('positions')
  @ApiOperation({ summary: 'Get positions' })
  async getPositions(@CurrentUser() user: any) {
    return this.tradingService.getPositions(user.id);
  }

  @Post('positions/:id/close')
  @ApiOperation({ summary: 'Close position' })
  async closePosition(@CurrentUser() user: any, @Param('id') id: string) {
    return this.tradingService.closePosition(user.id, id);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get trade history' })
  async getTradeHistory(
    @CurrentUser() user: any,
    @Query('symbol') symbol?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.tradingService.getTradeHistory(user.id, {
      symbol,
      startDate,
      endDate,
      limit,
      offset,
    });
  }
}