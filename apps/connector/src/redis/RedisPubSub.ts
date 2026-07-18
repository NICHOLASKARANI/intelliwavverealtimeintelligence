// apps/connector/src/redis/RedisPubSub.ts
import { Redis } from 'ioredis';
import { EventEmitter } from 'events';
import { Logger } from '../utils/logger';

export class RedisPubSub extends EventEmitter {
  private publisher: Redis;
  private subscriber: Redis;
  private logger: Logger;

  constructor(redisUrl: string) {
    super();
    this.publisher = new Redis(redisUrl);
    this.subscriber = new Redis(redisUrl);
    this.logger = new Logger('RedisPubSub');

    this.subscriber.on('message', (channel, message) => {
      try {
        const data = JSON.parse(message);
        this.emit(channel, data);
      } catch (error) {
        this.logger.error(`Failed to parse message from ${channel}:`, error);
      }
    });
  }

  async publish(channel: string, data: any): Promise<void> {
    try {
      const message = JSON.stringify(data);
      await this.publisher.publish(channel, message);
    } catch (error) {
      this.logger.error(`Failed to publish to ${channel}:`, error);
    }
  }

  async subscribe(channel: string): Promise<void> {
    try {
      await this.subscriber.subscribe(channel);
      this.logger.info(`Subscribed to channel: ${channel}`);
    } catch (error) {
      this.logger.error(`Failed to subscribe to ${channel}:`, error);
    }
  }

  async unsubscribe(channel: string): Promise<void> {
    try {
      await this.subscriber.unsubscribe(channel);
      this.logger.info(`Unsubscribed from channel: ${channel}`);
    } catch (error) {
      this.logger.error(`Failed to unsubscribe from ${channel}:`, error);
    }
  }

  async publishTradeUpdate(userId: string, trade: any): Promise<void> {
    await this.publish(`trades:${userId}`, trade);
  }

  async publishPriceUpdate(symbol: string, price: any): Promise<void> {
    await this.publish(`prices:${symbol}`, price);
  }

  async publishBotUpdate(userId: string, botUpdate: any): Promise<void> {
    await this.publish(`bots:${userId}`, botUpdate);
  }

  async close(): Promise<void> {
    await this.publisher.quit();
    await this.subscriber.quit();
  }
}