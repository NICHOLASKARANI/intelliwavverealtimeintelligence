// apps/backend/src/modules/deriv/deriv.controller.ts
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
import { DerivService } from './deriv.service';

@ApiTags('Deriv Integration')
@Controller('deriv')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DerivController {
  constructor(private readonly derivService: DerivService) {}

  @Post('connect')
  @ApiOperation({ summary: 'Connect Deriv account' })
  async connectAccount(
    @CurrentUser() user: any,
    @Body() body: { apiToken: string; appId: string; accountType: 'real' | 'demo' },
  ) {
    return this.derivService.addUserConnection(
      user.id,
      body.apiToken,
      body.appId,
      body.accountType,
    );
  }

  @Delete('disconnect/:accountType')
  @ApiOperation({ summary: 'Disconnect Deriv account' })
  async disconnectAccount(
    @CurrentUser() user: any,
    @Param('accountType') accountType: string,
  ) {
    return this.derivService.removeUserConnection(user.id, accountType);
  }

  @Get('balance')
  @ApiOperation({ summary: 'Get account balance' })
  async getBalance(@CurrentUser() user: any) {
    return this.derivService.getUserBalance(user.id);
  }

  @Get('portfolio')
  @ApiOperation({ summary: 'Get portfolio' })
  async getPortfolio(@CurrentUser() user: any) {
    return this.derivService.getUserPortfolio(user.id);
  }

  @Get('symbols')
  @ApiOperation({ summary: 'Get active symbols' })
  async getActiveSymbols(@CurrentUser() user: any) {
    return this.derivService.getActiveSymbols(user.id);
  }

  @Get('candles/:symbol')
  @ApiOperation({ summary: 'Get candle data' })
  async getCandles(
    @CurrentUser() user: any,
    @Param('symbol') symbol: string,
    @Query('granularity') granularity: number = 60,
    @Query('count') count?: number,
  ) {
    return this.derivService.getCandles(user.id, symbol, granularity, count);
  }

  @Post('trade/buy')
  @ApiOperation({ summary: 'Buy contract' })
  async buyContract(
    @CurrentUser() user: any,
    @Body() tradeRequest: any,
  ) {
    return this.derivService.buyContract(user.id, tradeRequest);
  }

  @Post('trade/sell')
  @ApiOperation({ summary: 'Sell contract' })
  async sellContract(
    @CurrentUser() user: any,
    @Body() body: { contractId: string; price: number },
  ) {
    return this.derivService.sellContract(user.id, body.contractId, body.price);
  }
}