// apps/connector/src/deriv/DerivConnector.ts
import { DerivAPI } from './DerivAPI';
import { Redis } from 'ioredis';
import { Logger } from '../utils/logger';
import { EventEmitter } from 'events';

export interface ConnectionConfig {
  id: string;
  userId: string;
  apiToken: string;
  appId: string;
  accountType: 'real' | 'demo';
}

export class DerivConnector extends EventEmitter {
  private connections: Map<string, {
    config: ConnectionConfig;
    api: DerivAPI;
    subscriptions: Map<string, string>;
    lastActive: Date;
  }> = new Map();
  private redis: Redis;
  private logger: Logger;

  constructor(redisUrl: string) {
    super();
    this.redis = new Redis(redisUrl);
    this.logger = new Logger('DerivConnector');
    this.setupRedis();
  }

  private setupRedis(): void {
    this.redis.on('connect', () => {
      this.logger.info('Redis connected');
    });

    this.redis.on('error', (error) => {
      this.logger.error('Redis error:', error);
    });
  }

  async addConnection(config: ConnectionConfig): Promise<void> {
    const existing = this.connections.get(config.id);
    if (existing) {
      await this.removeConnection(config.id);
    }

    const api = new DerivAPI({
      appId: config.appId,
      token: config.apiToken,
    });

    try {
      await api.connect();
      await api.authorize(config.apiToken);

      this.connections.set(config.id, {
        config,
        api,
        subscriptions: new Map(),
        lastActive: new Date(),
      });

      // Subscribe to transactions
      const transactionSubId = await api.subscribeTransactions((transaction) => {
        this.handleTransactionUpdate(config.id, transaction);
      });

      const connection = this.connections.get(config.id)!;
      connection.subscriptions.set('transactions', transactionSubId);

      // Cache connection in Redis
      await this.redis.hset(
        `deriv:connections:${config.userId}`,
        config.id,
        JSON.stringify({
          ...config,
          lastActive: new Date().toISOString(),
        })
      );

      this.logger.info(`Connection added: ${config.id}`);
      this.emit('connection_added', { id: config.id, userId: config.userId });

    } catch (error) {
      this.logger.error(`Failed to add connection ${config.id}:`, error);
      throw error;
    }
  }

  async removeConnection(connectionId: string): Promise<void> {
    const connection = this.connections.get(connectionId);
    if (!connection) return;

    try {
      // Unsubscribe all
      for (const [name, subId] of connection.subscriptions.entries()) {
        await connection.api.unsubscribe(subId);
      }

      await connection.api.disconnect();
      this.connections.delete(connectionId);

      // Remove from Redis
      const userId = connection.config.userId;
      await this.redis.hdel(`deriv:connections:${userId}`, connectionId);

      this.logger.info(`Connection removed: ${connectionId}`);
      this.emit('connection_removed', { id: connectionId, userId });

    } catch (error) {
      this.logger.error(`Failed to remove connection ${connectionId}:`, error);
      throw error;
    }
  }

  async getBalance(connectionId: string): Promise<any> {
    const connection = this.getConnection(connectionId);
    return connection.api.getBalance();
  }

  async getPortfolio(connectionId: string): Promise<any> {
    const connection = this.getConnection(connectionId);
    return connection.api.getPortfolio();
  }

  async getActiveSymbols(connectionId: string): Promise<any[]> {
    const connection = this.getConnection(connectionId);
    return connection.api.getActiveSymbols();
  }

  async subscribeTicks(
    connectionId: string,
    symbol: string,
    callback: (tick: any) => void,
  ): Promise<string> {
    const connection = this.getConnection(connectionId);
    const subId = await connection.api.subscribeTicks(symbol, callback);
    connection.subscriptions.set(`ticks:${symbol}`, subId);
    return subId;
  }

  async subscribeCandles(
    connectionId: string,
    symbol: string,
    granularity: number,
    callback: (candle: any) => void,
  ): Promise<string> {
    const connection = this.getConnection(connectionId);
    const subId = await connection.api.subscribeCandles(symbol, granularity, callback);
    connection.subscriptions.set(`candles:${symbol}:${granularity}`, subId);
    return subId;
  }

  async getCandles(
    connectionId: string,
    symbol: string,
    granularity: number,
    count?: number,
  ): Promise<any[]> {
    const connection = this.getConnection(connectionId);
    return connection.api.getCandles(symbol, granularity, count);
  }

  async buyContract(connectionId: string, request: any): Promise<any> {
    const connection = this.getConnection(connectionId);
    
    // Cache trade in Redis for analytics
    const tradeResult = await connection.api.buyContract(request);
    
    await this.redis.lpush(
      `deriv:trades:${connection.config.userId}`,
      JSON.stringify({
        connectionId,
        ...tradeResult,
        timestamp: Date.now(),
      })
    );

    // Emit trade event
    this.emit('trade_executed', {
      userId: connection.config.userId,
      connectionId,
      trade: tradeResult,
    });

    return tradeResult;
  }

  async sellContract(connectionId: string, contractId: string, price: number): Promise<any> {
    const connection = this.getConnection(connectionId);
    const result = await connection.api.sellContract(contractId, price);

    // Cache sell in Redis
    await this.redis.lpush(
      `deriv:sells:${connection.config.userId}`,
      JSON.stringify({
        connectionId,
        contractId,
        price,
        result,
        timestamp: Date.now(),
      })
    );

    return result;
  }

  async getProposal(connectionId: string, request: any): Promise<any> {
    const connection = this.getConnection(connectionId);
    return connection.api.getProposal(request);
  }

  async getTransactionHistory(connectionId: string, count?: number): Promise<any[]> {
    const connection = this.getConnection(connectionId);
    return connection.api.getTransactionHistory(count);
  }

  private getConnection(connectionId: string) {
    const connection = this.connections.get(connectionId);
    if (!connection) {
      throw new Error(`Connection not found: ${connectionId}`);
    }
    connection.lastActive = new Date();
    return connection;
  }

  private async handleTransactionUpdate(connectionId: string, transaction: any): Promise<void> {
    const connection = this.connections.get(connectionId);
    if (!connection) return;

    // Publish to Redis for other services
    await this.redis.publish(
      `deriv:transactions:${connection.config.userId}`,
      JSON.stringify({
        connectionId,
        transaction,
        timestamp: Date.now(),
      })
    );

    this.emit('transaction', {
      userId: connection.config.userId,
      connectionId,
      transaction,
    });
  }

  async getCachedData<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async setCachedData(key: string, data: any, ttl?: number): Promise<void> {
    const serialized = JSON.stringify(data);
    if (ttl) {
      await this.redis.setex(key, ttl, serialized);
    } else {
      await this.redis.set(key, serialized);
    }
  }

  getActiveConnections(): string[] {
    return Array.from(this.connections.keys());
  }

  getConnectionStatus(connectionId: string): boolean {
    const connection = this.connections.get(connectionId);
    return connection?.api.connected || false;
  }

  async healthCheck(): Promise<{ [key: string]: boolean }> {
    const status: { [key: string]: boolean } = {};
    
    for (const [id, connection] of this.connections.entries()) {
      status[id] = connection.api.connected;
    }

    return status;
  }

  async shutdown(): Promise<void> {
    this.logger.info('Shutting down Deriv Connector...');
    
    for (const [id] of this.connections.entries()) {
      await this.removeConnection(id);
    }

    await this.redis.quit();
    this.logger.info('Deriv Connector shut down');
  }
}