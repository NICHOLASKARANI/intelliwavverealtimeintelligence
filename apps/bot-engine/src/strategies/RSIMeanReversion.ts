// apps/bot-engine/src/strategies/RSIMeanReversion.ts
import { BaseStrategy, StrategyConfig, SignalResult, MarketData } from './BaseStrategy';
import { RSI } from 'technicalindicators';

export class RSIMeanReversion extends BaseStrategy {
  private rsiValues: number[] = [];

  constructor(config: StrategyConfig) {
    super(config);
    
    this.config.parameters = {
      rsiPeriod: config.parameters.rsiPeriod || 14,
      oversold: config.parameters.oversold || 30,
      overbought: config.parameters.overbought || 70,
      ...config.parameters,
    };
  }

  calculateIndicators(data: MarketData[]): Record<string, any> {
    const closes = data.map(d => d.close);
    const { rsiPeriod } = this.config.parameters;
    
    this.rsiValues = RSI.calculate({
      period: rsiPeriod,
      values: closes,
    });

    const currentRSI = this.rsiValues[this.rsiValues.length - 1];
    const previousRSI = this.rsiValues[this.rsiValues.length - 2];

    return {
      rsi: currentRSI,
      previousRSI,
      overbought: this.config.parameters.overbought,
      oversold: this.config.parameters.oversold,
    };
  }

  analyze(data: MarketData): SignalResult {
    const currentRSI = this.rsiValues[this.rsiValues.length - 1];
    const previousRSI = this.rsiValues[this.rsiValues.length - 2];
    const { oversold, overbought } = this.config.parameters;

    if (!currentRSI) {
      return {
        action: 'HOLD',
        symbol: data.symbol,
        confidence: 0,
        reason: 'Calculating RSI...',
      };
    }

    // Oversold - Potential buy signal
    if (currentRSI <= oversold && previousRSI > oversold) {
      const confidence = this.calculateConfidence(data, 'BUY');
      return {
        action: 'BUY',
        symbol: data.symbol,
        price: data.close,
        stopLoss: data.close * 0.97, // 3% stop loss
        takeProfit: data.close * 1.05, // 5% take profit
        confidence,
        reason: `Oversold bounce: RSI crossed below ${oversold}`,
        metadata: {
          rsi: currentRSI,
          condition: 'OVERSOLD',
        },
      };
    }

    // Overbought - Potential sell signal
    if (currentRSI >= overbought && previousRSI < overbought) {
      const confidence = this.calculateConfidence(data, 'SELL');
      return {
        action: 'SELL',
        symbol: data.symbol,
        price: data.close,
        stopLoss: data.close * 1.03,
        takeProfit: data.close * 0.95,
        confidence,
        reason: `Overbought reversal: RSI crossed above ${overbought}`,
        metadata: {
          rsi: currentRSI,
          condition: 'OVERBOUGHT',
        },
      };
    }

    // Exit conditions
    if (this.positions.has(data.symbol)) {
      const position = this.positions.get(data.symbol);
      
      // Exit long if RSI becomes overbought
      if (position.side === 'BUY' && currentRSI >= overbought) {
        return {
          action: 'CLOSE',
          symbol: data.symbol,
          confidence: 70,
          reason: `Take profit: RSI reached overbought (${currentRSI})`,
          metadata: { rsi: currentRSI },
        };
      }

      // Exit short if RSI becomes oversold
      if (position.side === 'SELL' && currentRSI <= oversold) {
        return {
          action: 'CLOSE',
          symbol: data.symbol,
          confidence: 70,
          reason: `Take profit: RSI reached oversold (${currentRSI})`,
          metadata: { rsi: currentRSI },
        };
      }
    }

    return {
      action: 'HOLD',
      symbol: data.symbol,
      confidence: 50,
      reason: `RSI at ${currentRSI.toFixed(1)}`,
    };
  }

  private calculateConfidence(data: MarketData, direction: string): number {
    const currentRSI = this.rsiValues[this.rsiValues.length - 1];
    const { oversold, overbought } = this.config.parameters;
    
    let confidence = 65;

    // More extreme RSI values = higher confidence
    if (direction === 'BUY') {
      confidence += Math.abs(currentRSI - oversold) * 2;
    } else {
      confidence += Math.abs(currentRSI - overbought) * 2;
    }

    return Math.min(confidence, 95);
  }
}