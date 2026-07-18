// apps/backend/src/modules/bots/bots.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { BotsService } from './bots.service';
import { CreateBotDto, UpdateBotDto } from './dto/bot.dto';

@ApiTags('Bots')
@Controller('bots')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BotsController {
  constructor(private readonly botsService: BotsService) {}

  @Post()
  @ApiOperation({ summary: 'Create bot' })
  async createBot(@CurrentUser() user: any, @Body() dto: CreateBotDto) {
    return this.botsService.createBot(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bots' })
  async getBots(@CurrentUser() user: any) {
    return this.botsService.getUserBots(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get bot by ID' })
  async getBot(@CurrentUser() user: any, @Param('id') id: string) {
    return this.botsService.getBotById(user.id, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update bot' })
  async updateBot(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: UpdateBotDto,
  ) {
    return this.botsService.updateBot(user.id, id, dto);
  }

  @Post(':id/start')
  @ApiOperation({ summary: 'Start bot' })
  async startBot(@CurrentUser() user: any, @Param('id') id: string) {
    return this.botsService.startBot(user.id, id);
  }

  @Post(':id/stop')
  @ApiOperation({ summary: 'Stop bot' })
  async stopBot(@CurrentUser() user: any, @Param('id') id: string) {
    return this.botsService.stopBot(user.id, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete bot' })
  async deleteBot(@CurrentUser() user: any, @Param('id') id: string) {
    return this.botsService.deleteBot(user.id, id);
  }

  @Get(':id/performance')
  @ApiOperation({ summary: 'Get bot performance' })
  async getBotPerformance(@CurrentUser() user: any, @Param('id') id: string) {
    return this.botsService.getBotPerformance(user.id, id);
  }

  @Post(':id/duplicate')
  @ApiOperation({ summary: 'Duplicate bot' })
  async duplicateBot(@CurrentUser() user: any, @Param('id') id: string) {
    return this.botsService.duplicateBot(user.id, id);
  }
}