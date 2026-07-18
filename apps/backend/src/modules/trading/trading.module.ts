// apps/backend/src/modules/trading/trading.module.ts
import { Module } from '@nestjs/common';
import { TradingController } from './trading.controller';
import { TradingService } from './trading.service';
import { DerivModule } from '../deriv/deriv.module';

@Module({
  imports: [DerivModule],
  controllers: [TradingController],
  providers: [TradingService],
  exports: [TradingService],
})
export class TradingModule {}