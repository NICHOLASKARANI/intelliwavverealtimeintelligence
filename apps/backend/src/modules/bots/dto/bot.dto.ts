// apps/backend/src/modules/bots/dto/bot.dto.ts
import {
  IsString,
  IsNumber,
  IsOptional,
  IsObject,
  Min,
  Max,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBotDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  strategyId: string;

  @ApiProperty()
  @IsString()
  tradingAccountId: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  riskProfileId?: string;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  config?: Record<string, any>;

  @ApiProperty()
  @IsNumber()
  @Min(10)
  capital: number;

  @ApiProperty({ default: 20 })
  @IsNumber()
  @Min(1)
  @Max(50)
  @IsOptional()
  maxDrawdown?: number;

  @ApiProperty({ default: 5 })
  @IsNumber()
  @Min(1)
  @Max(20)
  @IsOptional()
  dailyLossLimit?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  takeProfit?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  stopLoss?: number;

  @ApiProperty({ default: 5 })
  @IsNumber()
  @Min(1)
  @Max(20)
  @IsOptional()
  maxPositions?: number;
}

export class UpdateBotDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  config?: Record<string, any>;

  @ApiProperty({ required: false })
  @IsNumber()
  @Min(10)
  @IsOptional()
  capital?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @Min(1)
  @Max(50)
  @IsOptional()
  maxDrawdown?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  takeProfit?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  stopLoss?: number;
}