// apps/bot-engine/src/strategies/MACrossStrategy.ts
import { BaseStrategy, StrategyConfig, SignalResult, MarketData } from './BaseStrategy';
import { SMA, EMA } from 'technicalindicators';

export class MACrossStrategy extends BaseStrategy {
  private fastMA: number[];
  private slowMA: number[];
  private previousFastMA: number;
  private previousSlowMA: number;

  constructor(config: StrategyConfig) {
    super(config);
    
    // Default parameters
    this.config.parameters = {
      fastPeriod: config.parameters.fastPeriod || 10,
      slowPeriod: config.parameters.slowPeriod || 30,
      maType: config.parameters.maType || 'EMA',
      ...config.parameters,
    };
  }

  calculateIndicators(data: MarketData[]): Record<string, any> {
    const closes = data.map(d => d.close);
    const { fastPeriod, slowPeriod, maType } = this.config.parameters;
    
    let fastMA: number[];
    let slowMA: number[];

    if (maType === 'SMA') {
      fastMA = SMA.calculate({ period: fastPeriod, values: closes });
      slowMA = SMA.calculate({ period: slowPeriod, values: closes });
    } else {
      fastMA = EMA.calculate({ period: fastPeriod, values: closes });
      slowMA = EMA.calculate({ period: slowPeriod, values: closes });
    }

    // Store previous values for crossover detection
    if (fastMA.length >= 2) {
      this.previousFastMA = fastMA[fastMA.length - 2];
    }
    if (slowMA.length >= 2) {
      this.previousSlowMA = slowMA[slowMA.length - 2];
    }

    this.fastMA = fastMA;
    this.slowMA = slowMA;

    return {
      fastMA: fastMA[fastMA.length - 1],
      slowMA: slowMA[slowMA.length - 1],
      fastPeriod,
      slowPeriod,
    };
  }

  analyze(data: MarketData): SignalResult {
    const fastMAValue = this.fastMA?.[this.fastMA.length - 1];
    const slowMAValue = this.slowMA?.[this.slowMA.length - 1];

    if (!fastMAValue || !slowMAValue) {
      return {
        action: 'HOLD',
        symbol: data.symbol,
        confidence: 0,
        reason: 'Insufficient data',
      };
    }

    const fastAboveSlow = fastMAValue > slowMAValue;
    const previousFastAboveSlow = this.previousFastMA > this.previousSlowMA;

    // Bullish crossover
    if (fastAboveSlow && !previousFastAboveSlow) {
      const confidence = this.calculateConfidence(data, 'BUY');
      return {
        action: 'BUY',
        symbol: data.symbol,
        price: data.close,
        stopLoss: data.close * 0.98, // 2% stop loss
        takeProfit: data.close * 1.04, // 4% take profit
        confidence,
        reason: `Bullish crossover: Fast MA crossed above Slow MA`,
        metadata: {
          fastMA: fastMAValue,
          slowMA: slowMAValue,
          trend: 'BULLISH',
        },
      };
    }

    // Bearish crossover
    if (!fastAboveSlow && previousFastAboveSlow) {
      const confidence = this.calculateConfidence(data, 'SELL');
      return {
        action: 'SELL',
        symbol: data.symbol,
        price: data.close,
        stopLoss: data.close * 1.02, // 2% stop loss
        takeProfit: data.close * 0.96, // 4% take profit
        confidence,
        reason: `Bearish crossover: Fast MA crossed below Slow MA`,
        metadata: {
          fastMA: fastMAValue,
          slowMA: slowMAValue,
          trend: 'BEARISH',
        },
      };
    }

    return {
      action: 'HOLD',
      symbol: data.symbol,
      confidence: 50,
      reason: 'No crossover detected',
    };
  }

  private calculateConfidence(data: MarketData, direction: string): number {
    let confidence = 60; // Base confidence for crossover

    // Increase confidence if price is far from MA
    const fastMAValue = this.fastMA[this.fastMA.length - 1];
    const priceDistance = Math.abs(data.close - fastMAValue) / data.close;
    
    if (priceDistance > 0.02) {
      confidence += 10;
    }

    // Increase confidence if volume is high (if available)
    if (data.volume > 0) {
      confidence += 5;
    }

    // Cap confidence
    return Math.min(confidence, 95);
  }
}