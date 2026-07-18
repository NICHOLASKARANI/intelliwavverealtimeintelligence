import { NestFactory } from '@nestjs/core';
import { Module, Controller, Post, Get, Body, Req } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// ============ PRISMA SETUP ============
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  log: ['error', 'warn'],
  datasources: {
    db: { url: process.env.DATABASE_URL || 'postgresql://intelliwave:intelliwave123@localhost:5432/intelliwave_itis?schema=public' },
  },
});

// ============ DTOs ============
class RegisterDto {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

class LoginDto {
  email: string;
  password: string;
}

// ============ CONTROLLER ============
@Controller('auth')
class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email: dto.email }, { username: dto.username }] },
    });
    if (existing) return { error: 'User exists' };

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await prisma.user.create({
      data: { email: dto.email, username: dto.username, passwordHash, firstName: dto.firstName, lastName: dto.lastName, role: 'USER', status: 'ACTIVE', emailVerified: true },
    });

    const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
    return { user: { id: user.id, email: user.email, username: user.username, role: user.role }, accessToken: token, refreshToken: token };
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) return { error: 'Invalid credentials' };

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) return { error: 'Invalid credentials' };

    const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
    return { user: { id: user.id, email: user.email, username: user.username, role: user.role }, accessToken: token, refreshToken: token };
  }

  @Get('profile')
  async profile(@Req() req: any) {
    try {
      const auth = req.headers.authorization?.split(' ')[1];
      const payload = this.jwtService.verify(auth);
      const user = await prisma.user.findUnique({ where: { id: payload.sub }, select: { id: true, email: true, username: true, firstName: true, lastName: true, role: true, createdAt: true } });
      return user || { error: 'Not found' };
    } catch { return { error: 'Unauthorized' }; }
  }

  @Post('logout')
  logout() { return { message: 'Logged out' }; }

  @Get('health')
  health() { return { status: 'ok', timestamp: new Date().toISOString() }; }
}

// ============ MODULE ============
@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET || 'dev-secret-key-1234567890', signOptions: { expiresIn: '1h' } })],
  controllers: [AuthController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:3000', credentials: true });
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`✅ Backend on http://localhost:${port}`);
  console.log(`✅ Login: POST http://localhost:${port}/api/auth/login`);
}

bootstrap();
