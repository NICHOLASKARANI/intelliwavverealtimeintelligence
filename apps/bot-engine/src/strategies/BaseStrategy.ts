// apps/bot-engine/src/strategies/BaseStrategy.ts
import { EventEmitter } from 'events';
import { Logger } from '../utils/logger';

export interface StrategyConfig {
  name: string;
  symbol: string;
  timeframe: string;
  parameters: Record<string, any>;
  riskPerTrade: number;
  maxPositions: number;
}

export interface SignalResult {
  action: 'BUY' | 'SELL' | 'HOLD' | 'CLOSE';
  symbol: string;
  price?: number;
  stopLoss?: number;
  takeProfit?: number;
  confidence: number;
  reason: string;
  metadata?: Record<string, any>;
}

export interface MarketData {
  symbol: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  indicators?: Record<string, any>;
}

export abstract class BaseStrategy extends EventEmitter {
  protected config: StrategyConfig;
  protected logger: Logger;
  protected isRunning: boolean = false;
  protected positions: Map<string, any> = new Map();
  protected indicators: Record<string, any> = {};

  constructor(config: StrategyConfig) {
    super();
    this.config = config;
    this.logger = new Logger(`Strategy:${config.name}`);
    this.validateConfig();
  }

  abstract analyze(data: MarketData): SignalResult;
  abstract calculateIndicators(data: MarketData[]): Record<string, any>;

  protected validateConfig(): void {
    if (!this.config.symbol) {
      throw new Error('Symbol is required');
    }
    if (!this.config.timeframe) {
      throw new Error('Timeframe is required');
    }
  }

  async start(): Promise<void> {
    this.isRunning = true;
    this.logger.info(`Strategy ${this.config.name} started for ${this.config.symbol}`);
    this.emit('started', { strategy: this.config.name });
  }

  async stop(): Promise<void> {
    this.isRunning = false;
    this.logger.info(`Strategy ${this.config.name} stopped`);
    this.emit('stopped', { strategy: this.config.name });
  }

  async onTick(tick: MarketData): Promise<SignalResult | null> {
    if (!this.isRunning) return null;

    try {
      const signal = this.analyze(tick);
      
      if (signal.action !== 'HOLD') {
        this.emit('signal', signal);
        this.logger.info(`Signal generated: ${signal.action} ${signal.symbol} (${signal.confidence}%)`);
      }

      return signal;
    } catch (error) {
      this.logger.error(`Error analyzing tick: ${error.message}`);
      return null;
    }
  }

  async onCandle(candles: MarketData[]): Promise<SignalResult | null> {
    if (!this.isRunning || candles.length === 0) return null;

    try {
      // Calculate indicators
      this.indicators = this.calculateIndicators(candles);
      
      // Analyze latest candle
      const latestCandle = candles[candles.length - 1];
      latestCandle.indicators = this.indicators;
      
      const signal = this.analyze(latestCandle);
      
      if (signal.action !== 'HOLD') {
        this.emit('signal', signal);
      }

      return signal;
    } catch (error) {
      this.logger.error(`Error analyzing candles: ${error.message}`);
      return null;
    }
  }

  getStatus(): Record<string, any> {
    return {
      name: this.config.name,
      symbol: this.config.symbol,
      timeframe: this.config.timeframe,
      isRunning: this.isRunning,
      positions: this.positions.size,
      indicators: Object.keys(this.indicators),
    };
  }

  updateConfig(config: Partial<StrategyConfig>): void {
    this.config = { ...this.config, ...config };
    this.validateConfig();
  }
}