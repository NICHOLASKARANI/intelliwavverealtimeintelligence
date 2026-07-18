// apps/connector/src/utils/RateLimiter.ts
import { Logger } from './logger';

interface RateLimiterConfig {
  maxRequests: number;
  perSecond: number;
}

export class RateLimiter {
  private config: RateLimiterConfig;
  private queue: Array<{
    resolve: () => void;
    timestamp: number;
  }> = [];
  private requestTimestamps: number[] = [];
  private processing = false;
  private logger: Logger;

  constructor(config: RateLimiterConfig) {
    this.config = config;
    this.logger = new Logger('RateLimiter');
  }

  async waitForSlot(): Promise<void> {
    return new Promise((resolve) => {
      this.queue.push({
        resolve,
        timestamp: Date.now(),
      });
      this.processQueue();
    });
  }

  private async processQueue(): Promise<void> {
    if (this.processing) return;
    this.processing = true;

    while (this.queue.length > 0) {
      await this.cleanupOldRequests();
      
      if (this.canMakeRequest()) {
        const request = this.queue.shift();
        if (request) {
          this.requestTimestamps.push(Date.now());
          request.resolve();
        }
      } else {
        // Calculate wait time
        const oldestRequest = this.requestTimestamps[0];
        const waitTime = Math.max(0, oldestRequest + (1000 / this.config.perSecond) - Date.now());
        await this.sleep(waitTime);
      }
    }

    this.processing = false;
  }

  private canMakeRequest(): boolean {
    const now = Date.now();
    const windowStart = now - 1000;
    
    // Remove timestamps outside window
    this.requestTimestamps = this.requestTimestamps.filter(t => t > windowStart);
    
    return this.requestTimestamps.length < this.config.maxRequests;
  }

  private async cleanupOldRequests(): Promise<void> {
    const now = Date.now();
    this.requestTimestamps = this.requestTimestamps.filter(t => now - t < 1000);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  get queueLength(): number {
    return this.queue.length;
  }

  get currentRate(): number {
    const now = Date.now();
    const windowStart = now - 1000;
    return this.requestTimestamps.filter(t => t > windowStart).length;
  }
}