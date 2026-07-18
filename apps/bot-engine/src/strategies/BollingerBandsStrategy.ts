// apps/bot-engine/src/strategies/BollingerBandsStrategy.ts
import { BaseStrategy, StrategyConfig, SignalResult, MarketData } from './BaseStrategy';
import { BollingerBands, SMA } from 'technicalindicators';

export class BollingerBandsStrategy extends BaseStrategy {
  private bb: { upper: number[]; middle: number[]; lower: number[] } = {
    upper: [],
    middle: [],
    lower: [],
  };

  constructor(config: StrategyConfig) {
    super(config);
    
    this.config.parameters = {
      period: config.parameters.period || 20,
      stdDev: config.parameters.stdDev || 2,
      ...config.parameters,
    };
  }

  calculateIndicators(data: MarketData[]): Record<string, any> {
    const closes = data.map(d => d.close);
    const { period, stdDev } = this.config.parameters;

    const bbResult = BollingerBands.calculate({
      period,
      stdDev,
      values: closes,
    });

    this.bb = {
      upper: bbResult.map(b => b.upper),
      middle: bbResult.map(b => b.middle),
      lower: bbResult.map(b => b.lower),
    };

    const currentUpper = this.bb.upper[this.bb.upper.length - 1];
    const currentMiddle = this.bb.middle[this.bb.middle.length - 1];
    const currentLower = this.bb.lower[this.bb.lower.length - 1];
    const bandwidth = ((currentUpper - currentLower) / currentMiddle) * 100;
    const percentB = ((data[data.length - 1].close - currentLower) / (currentUpper - currentLower)) * 100;

    return {
      upper: currentUpper,
      middle: currentMiddle,
      lower: currentLower,
      bandwidth,
      percentB,
    };
  }

  analyze(data: MarketData): SignalResult {
    const currentUpper = this.bb.upper[this.bb.upper.length - 1];
    const currentMiddle = this.bb.middle[this.bb.middle.length - 1];
    const currentLower = this.bb.lower[this.bb.lower.length - 1];

    if (!currentUpper) {
      return {
        action: 'HOLD',
        symbol: data.symbol,
        confidence: 0,
        reason: 'Calculating Bollinger Bands...',
      };
    }

    const bandwidth = ((currentUpper - currentLower) / currentMiddle) * 100;
    
    // Price at lower band - Oversold, potential buy
    if (data.close <= currentLower) {
      const confidence = Math.min(70 + (bandwidth / 2), 90);
      return {
        action: 'BUY',
        symbol: data.symbol,
        price: data.close,
        stopLoss: data.close * 0.98,
        takeProfit: currentMiddle,
        confidence,
        reason: `Price at lower band (${bandwidth.toFixed(1)}% bandwidth)`,
        metadata: {
          band: 'LOWER',
          bandwidth,
          targetPrice: currentMiddle,
        },
      };
    }

    // Price at upper band - Overbought, potential sell
    if (data.close >= currentUpper) {
      const confidence = Math.min(70 + (bandwidth / 2), 90);
      return {
        action: 'SELL',
        symbol: data.symbol,
        price: data.close,
        stopLoss: data.close * 1.02,
        takeProfit: currentMiddle,
        confidence,
        reason: `Price at upper band (${bandwidth.toFixed(1)}% bandwidth)`,
        metadata: {
          band: 'UPPER',
          bandwidth,
          targetPrice: currentMiddle,
        },
      };
    }

    // Price crossed middle band
    const previousClose = data.close; // In real implementation, compare with previous candle
    
    if (Math.abs(data.close - currentMiddle) / currentMiddle < 0.001) {
      return {
        action: data.close > currentMiddle ? 'BUY' : 'SELL',
        symbol: data.symbol,
        price: data.close,
        confidence: 60,
        reason: `Price at middle band bounce`,
        metadata: {
          band: 'MIDDLE',
          targetPrice: data.close > currentMiddle ? currentUpper : currentLower,
        },
      };
    }

    return {
      action: 'HOLD',
      symbol: data.symbol,
      confidence: 50,
      reason: `BB: ${bandwidth.toFixed(1)}% bandwidth`,
    };
  }
}