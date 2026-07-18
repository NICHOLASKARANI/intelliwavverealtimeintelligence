import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { TradingController } from './modules/trading/trading.controller';
import { BotsController } from './modules/bots/bots.controller';
import { AnalyticsController } from './modules/analytics/analytics.controller';
import { NotificationsController } from './modules/notifications/notifications.controller';
import { PrismaService } from './modules/database/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev-secret-key-1234567890',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [
    AuthController,
    TradingController,
    BotsController,
    AnalyticsController,
    NotificationsController,
  ],
  providers: [AuthService, JwtStrategy, PrismaService],
})
export class AppModule {}
