// apps/backend/src/modules/deriv/deriv.module.ts
import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DerivService } from './deriv.service';
import { DerivController } from './deriv.controller';

@Global()
@Module({
  imports: [ConfigModule],
  controllers: [DerivController],
  providers: [
    {
      provide: 'DERIV_CONNECTOR',
      useFactory: async (configService: ConfigService) => {
        const { IntelliWaveConnector } = await import('@intelliwave/connector');
        const connector = new IntelliWaveConnector();
        return connector.getConnector();
      },
      inject: [ConfigService],
    },
    DerivService,
  ],
  exports: [DerivService, 'DERIV_CONNECTOR'],
})
export class DerivModule {}