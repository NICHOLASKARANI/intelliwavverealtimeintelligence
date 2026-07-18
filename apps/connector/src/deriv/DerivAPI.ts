// apps/connector/src/deriv/DerivAPI.ts
import { DerivWebSocket } from './DerivWebSocket';
import { Logger } from '../utils/logger';
import { RateLimiter } from '../utils/RateLimiter';

export interface DerivConfig {
  appId: string;
  token?: string;
  url?: string;
  language?: string;
  brand?: string;
}

export interface TickData {
  symbol: string;
  ask: number;
  bid: number;
  quote: number;
  epoch: number;
  pip_size: number;
}

export interface CandleData {
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  epoch: number;
  granularity: number;
}

export interface BalanceData {
  balance: number;
  currency: string;
  loginid: string;
}

export interface PortfolioData {
  contracts: any[];
  total_value: number;
}

export interface TradeRequest {
  symbol: string;
  contract_type: 'CALL' | 'PUT' | 'MULTUP' | 'MULTDOWN' | 'UP' | 'DOWN' | 'TURBOS' | 'VANILLA';
  amount: number;
  basis: 'stake' | 'payout';
  duration: number;
  duration_unit: 't' | 's' | 'm' | 'h' | 'd';
  currency?: string;
}

export class DerivAPI {
  private ws: DerivWebSocket;
  private logger: Logger;
  private rateLimiter: RateLimiter;
  private authorization: string | null = null;

  constructor(config: DerivConfig) {
    this.ws = new DerivWebSocket({
      url: config.url || 'wss://ws.derivws.com/websockets/v3',
      appId: config.appId,
      token: config.token,
      language: config.language,
      brand: config.brand,
      reconnectDelay: 2000,
      maxReconnectAttempts: 15,
      pingInterval: 30000,
    });

    this.logger = new Logger('DerivAPI');
    this.rateLimiter = new RateLimiter({
      maxRequests: 30,
      perSecond: 1,
    });

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.ws.on('connected', () => {
      this.logger.info('Deriv API connected');
      if (this.authorization) {
        this.authorize(this.authorization).catch(error => {
          this.logger.error('Failed to reauthorize:', error);
        });
      }
    });

    this.ws.on('disconnected', () => {
      this.logger.warn('Deriv API disconnected');
    });

    this.ws.on('error', (error) => {
      this.logger.error('Deriv API error:', error);
    });
  }

  async connect(): Promise<void> {
    return this.ws.connect();
  }

  async disconnect(): Promise<void> {
    return this.ws.disconnect();
  }

  async authorize(token: string): Promise<any> {
    await this.rateLimiter.waitForSlot();

    this.authorization = token;

    const response = await this.ws.send({
      authorize: token,
    });

    if (response.error) {
      throw new Error(`Authorization failed: ${response.error.message}`);
    }

    this.logger.info('Authorized successfully');
    return response.authorize;
  }

  async getBalance(): Promise<BalanceData> {
    await this.rateLimiter.waitForSlot();

    const response = await this.ws.send({
      balance: 1,
      subscribe: 1,
    });

    if (response.error) {
      throw new Error(`Failed to get balance: ${response.error.message}`);
    }

    return response.balance;
  }

  async getPortfolio(): Promise<PortfolioData> {
    await this.rateLimiter.waitForSlot();

    const response = await this.ws.send({
      portfolio: 1,
    });

    if (response.error) {
      throw new Error(`Failed to get portfolio: ${response.error.message}`);
    }

    return response.portfolio;
  }

  async getActiveSymbols(): Promise<any[]> {
    await this.rateLimiter.waitForSlot();

    const response = await this.ws.send({
      active_symbols: 'brief',
      product_type: 'basic',
    });

    if (response.error) {
      throw new Error(`Failed to get active symbols: ${response.error.message}`);
    }

    return response.active_symbols;
  }

  async getTicks(symbol: string): Promise<TickData> {
    await this.rateLimiter.waitForSlot();

    const response = await this.ws.send({
      ticks: symbol,
    });

    if (response.error) {
      throw new Error(`Failed to get ticks for ${symbol}: ${response.error.message}`);
    }

    return response.tick;
  }

  async subscribeTicks(symbol: string, callback: (tick: TickData) => void): Promise<string> {
    await this.rateLimiter.waitForSlot();

    const response = await this.ws.subscribe({
      ticks: symbol,
      subscribe: 1,
    });

    if (response.error) {
      throw new Error(`Failed to subscribe to ticks for ${symbol}: ${response.error.message}`);
    }

    const subscriptionId = response.subscription.id;

    this.ws.on(`subscription:${subscriptionId}`, (message) => {
      if (message.tick) {
        callback(message.tick);
      }
    });

    return subscriptionId;
  }

  async getCandles(
    symbol: string,
    granularity: number,
    count?: number,
    end?: number,
  ): Promise<CandleData[]> {
    await this.rateLimiter.waitForSlot();

    const request: any = {
      ticks_history: symbol,
      granularity,
      style: 'candles',
    };

    if (count) request.count = count;
    if (end) request.end = end;

    const response = await this.ws.send(request);

    if (response.error) {
      throw new Error(`Failed to get candles for ${symbol}: ${response.error.message}`);
    }

    return response.candles;
  }

  async subscribeCandles(
    symbol: string,
    granularity: number,
    callback: (candle: CandleData) => void,
  ): Promise<string> {
    await this.rateLimiter.waitForSlot();

    const response = await this.ws.subscribe({
      candles: symbol,
      granularity,
      subscribe: 1,
    });

    if (response.error) {
      throw new Error(`Failed to subscribe to candles for ${symbol}: ${response.error.message}`);
    }

    const subscriptionId = response.subscription.id;

    this.ws.on(`subscription:${subscriptionId}`, (message) => {
      if (message.candle) {
        callback(message.candle);
      }
    });

    return subscriptionId;
  }

  async getProposal(request: {
    symbol: string;
    contract_type: string;
    amount: number;
    basis: string;
    duration: number;
    duration_unit: string;
    currency?: string;
  }): Promise<any> {
    await this.rateLimiter.waitForSlot();

    const response = await this.ws.send({
      proposal: 1,
      amount: request.amount,
      basis: request.basis,
      contract_type: request.contract_type,
      currency: request.currency || 'USD',
      duration: request.duration,
      duration_unit: request.duration_unit,
      symbol: request.symbol,
    });

    if (response.error) {
      throw new Error(`Failed to get proposal: ${response.error.message}`);
    }

    return response.proposal;
  }

  async buyContract(request: TradeRequest): Promise<any> {
    await this.rateLimiter.waitForSlot();

    const response = await this.ws.send({
      buy: request.symbol,
      price: request.amount,
      parameters: {
        amount: request.amount,
        basis: request.basis,
        contract_type: request.contract_type,
        currency: request.currency || 'USD',
        duration: request.duration,
        duration_unit: request.duration_unit,
        symbol: request.symbol,
      },
    });

    if (response.error) {
      throw new Error(`Failed to buy contract: ${response.error.message}`);
    }

    return response.buy;
  }

  async sellContract(contractId: string, price: number): Promise<any> {
    await this.rateLimiter.waitForSlot();

    const response = await this.ws.send({
      sell: contractId,
      price,
    });

    if (response.error) {
      throw new Error(`Failed to sell contract: ${response.error.message}`);
    }

    return response.sell;
  }

  async getTransactionHistory(count?: number): Promise<any[]> {
    await this.rateLimiter.waitForSlot();

    const request: any = {
      transactions_stream: 1,
    };

    if (count) request.count = count;

    const response = await this.ws.send(request);

    if (response.error) {
      throw new Error(`Failed to get transactions: ${response.error.message}`);
    }

    return response.transactions;
  }

  async subscribeTransactions(callback: (transaction: any) => void): Promise<string> {
    await this.rateLimiter.waitForSlot();

    const response = await this.ws.subscribe({
      transaction: 1,
      subscribe: 1,
    });

    if (response.error) {
      throw new Error(`Failed to subscribe to transactions: ${response.error.message}`);
    }

    const subscriptionId = response.subscription.id;

    this.ws.on(`subscription:${subscriptionId}`, (message) => {
      if (message.transaction) {
        callback(message.transaction);
      }
    });

    return subscriptionId;
  }

  async unsubscribe(subscriptionId: string): Promise<void> {
    await this.ws.unsubscribe(subscriptionId);
  }

  on(event: string, listener: (...args: any[]) => void): void {
    this.ws.on(event, listener);
  }

  off(event: string, listener: (...args: any[]) => void): void {
    this.ws.off(event, listener);
  }

  get connected(): boolean {
    return this.ws.connected;
  }
}