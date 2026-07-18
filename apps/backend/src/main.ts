import { NestFactory } from '@nestjs/core';
import { Module, Controller, Post, Get, Body, Req } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

@Controller('auth')
class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Post('login')
  async login(@Body() body: any) {
    try {
      const user = await prisma.user.findUnique({ where: { email: body.email } });
      if (!user) return { error: 'User not found' };
      const valid = await bcrypt.compare(body.password, user.passwordHash);
      if (!valid) return { error: 'Invalid password' };
      const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
      return { 
        user: { id: user.id, email: user.email, username: user.username, firstName: user.firstName, lastName: user.lastName, role: user.role }, 
        accessToken: token, 
        refreshToken: token 
      };
    } catch (e) {
      return { error: 'Login failed', details: e.message };
    }
  }

  @Post('register')
  async register(@Body() body: any) {
    try {
      const exists = await prisma.user.findFirst({ where: { OR: [{ email: body.email }, { username: body.username }] } });
      if (exists) return { error: 'User already exists' };
      const hash = await bcrypt.hash(body.password, 12);
      const user = await prisma.user.create({ 
        data: { email: body.email, username: body.username, passwordHash: hash, firstName: body.firstName, lastName: body.lastName, role: 'USER', status: 'ACTIVE', emailVerified: true } 
      });
      const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
      return { user: { id: user.id, email: user.email, username: user.username }, accessToken: token, refreshToken: token };
    } catch (e) {
      return { error: 'Registration failed', details: e.message };
    }
  }

  @Get('profile')
  async profile(@Req() req: any) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const payload = this.jwtService.verify(token);
      const user = await prisma.user.findUnique({ where: { id: payload.sub }, select: { id: true, email: true, username: true, firstName: true, lastName: true, role: true } });
      return user;
    } catch { return { error: 'Unauthorized' }; }
  }

  @Post('logout')
  logout() { return { message: 'Logged out' }; }
}

@Controller('health')
class HealthController {
  @Get()
  check() { return { status: 'healthy', timestamp: new Date().toISOString(), uptime: process.uptime() }; }
}

@Controller('trading')
class TradingController {
  @Get('positions') async getPositions() { return []; }
  @Get('history') async getHistory() { return []; }
}

@Controller('bots')
class BotsController {
  @Get() async getBots() { return []; }
}

@Controller('analytics')
class AnalyticsController {
  @Get('dashboard') async getDashboard() { return { totalTrades: 0, openPositions: 0, activeBots: 0, totalPnL: 0 }; }
  @Get('daily-pnl') async getDailyPnL() { return []; }
}

@Controller('notifications')
class NotificationsController {
  @Get() async getAll() { return []; }
  @Get('unread-count') async count() { return { count: 0 }; }
}


@Controller()
class RootController {
  @Get()
  root() {
    return {
      name: 'IntelliWave ITIS API',
      version: '1.0.0',
      status: 'operational',
      docs: '/api/health',
      endpoints: {
        auth: '/api/auth/login',
        trading: '/api/trading/positions',
        bots: '/api/bots',
        analytics: '/api/analytics/dashboard',
        health: '/api/health'
      }
    };
  }
}
@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET || 'dev-secret-key-1234567890', signOptions: { expiresIn: '24h' } })],
  controllers: [RootController,AuthController, HealthController, TradingController, BotsController, AnalyticsController, NotificationsController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:3000', credentials: true, methods: 'GET,POST,PUT,DELETE,OPTIONS', allowedHeaders: 'Content-Type,Authorization' });
  app.setGlobalPrefix('api');
  try {
    await prisma.$connect();
    console.log('✅ Database connected');
  } catch (e) {
    console.log('⚠ Database connection issue:', e.message);
  }
  await app.listen(3001);
  console.log('');
  console.log('🚀 Backend running on http://localhost:3001');
  console.log('📡 Health: http://localhost:3001/api/health');
  console.log('🔑 Login: POST http://localhost:3001/api/auth/login');
  console.log('   Body: {"email":"demo@intelliwave.com","password":"demo123"}');
}
bootstrap();
