// apps/backend/src/modules/ai/ai.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AIService } from './ai.service';

@ApiTags('AI Engine')
@Controller('ai')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('analyze/:symbol')
  @ApiOperation({ summary: 'Analyze market' })
  async analyzeMarket(
    @CurrentUser() user: any,
    @Param('symbol') symbol: string,
    @Body() data: any,
  ) {
    return this.aiService.analyzeMarket(symbol, data.data);
  }

  @Post('recommend/:symbol')
  @ApiOperation({ summary: 'Get trade recommendation' })
  async getRecommendation(
    @CurrentUser() user: any,
    @Param('symbol') symbol: string,
    @Body() body: any,
  ) {
    return this.aiService.getRecommendation(
      symbol,
      body.data,
      body.balance || 10000,
      body.riskProfile || {},
    );
  }

  @Post('assistant')
  @ApiOperation({ summary: 'AI Trading Assistant' })
  async askAssistant(
    @CurrentUser() user: any,
    @Body() body: { query: string; context?: any },
  ) {
    return this.aiService.processQuery(body.query, user.id, body.context);
  }

  @Post('optimize-portfolio')
  @ApiOperation({ summary: 'Optimize portfolio' })
  async optimizePortfolio(
    @CurrentUser() user: any,
    @Body() body: { assets: any[]; constraints?: any },
  ) {
    return this.aiService.optimizePortfolio(body.assets, body.constraints);
  }
}