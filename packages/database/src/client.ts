// packages/database/src/client.ts
import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Redis client
const globalForRedis = globalThis as unknown as {
  redis: ReturnType<typeof createClient> | undefined;
};

export const redisClient = globalForRedis.redis ?? createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        console.error('Redis max reconnection attempts reached');
        return new Error('Redis max reconnection attempts reached');
      }
      return Math.min(retries * 100, 3000);
    },
  },
});

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redisClient;

redisClient.on('error', (error) => {
  console.error('Redis Client Error:', error);
});

redisClient.connect().catch(console.error);