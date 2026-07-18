// apps/connector/src/index.ts
import { DerivConnector } from './deriv/DerivConnector';
import { RedisPubSub } from './redis/RedisPubSub';
import { Logger } from './utils/logger';

export class IntelliWaveConnector {
  private connector: DerivConnector;
  private pubsub: RedisPubSub;
  private logger: Logger;

  constructor() {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    
    this.connector = new DerivConnector(redisUrl);
    this.pubsub = new RedisPubSub(redisUrl);
    this.logger = new Logger('IntelliWaveConnector');

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.connector.on('connection_added', (data) => {
      this.logger.info(`New connection: ${data.id}`);
    });

    this.connector.on('connection_removed', (data) => {
      this.logger.info(`Connection removed: ${data.id}`);
    });

    this.connector.on('trade_executed', (data) => {
      this.pubsub.publishTradeUpdate(data.userId, data.trade);
    });

    this.connector.on('transaction', (data) => {
      this.pubsub.publish(`transactions:${data.userId}`, data);
    });
  }

  getConnector(): DerivConnector {
    return this.connector;
  }

  getPubSub(): RedisPubSub {
    return this.pubsub;
  }

  async shutdown(): Promise<void> {
    await this.connector.shutdown();
    await this.pubsub.close();
  }
}

// Export types
export * from './deriv/DerivConnector';
export * from './deriv/DerivAPI';
export * from './deriv/DerivWebSocket';
export * from './redis/RedisPubSub';