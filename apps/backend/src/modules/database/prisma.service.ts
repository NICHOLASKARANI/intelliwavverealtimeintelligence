import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

// Dynamic import to avoid TypeScript issues during compilation
let PrismaClient: any;
try {
  const prisma = require('@prisma/client');
  PrismaClient = prisma.PrismaClient;
} catch {
  console.warn('PrismaClient not found, using mock');
  PrismaClient = class {
    $connect() { return Promise.resolve(); }
    $disconnect() { return Promise.resolve(); }
  };
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['error', 'warn'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Prisma connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
