// apps/bot-engine/src/strategies/ScalpingStrategy.ts
import { BaseStrategy, StrategyConfig, SignalResult, MarketData } from './BaseStrategy';
import { RSI, Stochastic, EMA } from 'technicalindicators';

export class ScalpingStrategy extends BaseStrategy {
  private ema: number[] = [];
  private rsi: number[] = [];
  private stoch: { K: number[]; D: number[] } = { K: [], D: [] };

  constructor(config: StrategyConfig) {
    super(config);
    
    this.config.parameters = {
      emaPeriod: config.parameters.emaPeriod || 20,
      rsiPeriod: config.parameters.rsiPeriod || 7,
      stochPeriod: config.parameters.stochPeriod || 5,
      profitTarget: config.parameters.profitTarget || 5, // pips
      stopLoss: config.parameters.stopLoss || 3, // pips
      ...config.parameters,
    };
  }

  calculateIndicators(data: MarketData[]): Record<string, any> {
    const closes = data.map(d => d.close);
    const highs = data.map(d => d.high);
    const lows = data.map(d => d.low);
    const { emaPeriod, rsiPeriod, stochPeriod } = this.config.parameters;

    this.ema = EMA.calculate({ period: emaPeriod, values: closes });
    this.rsi = RSI.calculate({ period: rsiPeriod, values: closes });
    
    const stochResult = Stochastic.calculate({
      high: highs,
      low: lows,
      close: closes,
      period: stochPeriod,
      signalPeriod: 3,
    });

    this.stoch = {
      K: stochResult.map(s => s.k),
      D: stochResult.map(s => s.d),
    };

    return {
      ema: this.ema[this.ema.length - 1],
      rsi: this.rsi[this.rsi.length - 1],
      stochK: this.stoch.K[this.stoch.K.length - 1],
      stochD: this.stoch.D[this.stoch.D.length - 1],
    };
  }

  analyze(data: MarketData): SignalResult {
    const currentEMA = this.ema[this.ema.length - 1];
    const currentRSI = this.rsi[this.rsi.length - 1];
    const currentStochK = this.stoch.K[this.stoch.K.length - 1];
    const currentStochD = this.stoch.D[this.stoch.D.length - 1];

    if (!currentEMA || !currentRSI || !currentStochK) {
      return {
        action: 'HOLD',
        symbol: data.symbol,
        confidence: 0,
        reason: 'Loading indicators...',
      };
    }

    const { profitTarget, stopLoss } = this.config.parameters;
    const pipSize = 0.0001; // For forex pairs

    // Long signal conditions
    const longCondition = (
      data.close > currentEMA &&
      currentRSI < 30 && // Oversold
      currentStochK > currentStochD && // Stoch bullish crossover
      currentStochK < 20 // Oversold stoch
    );

    // Short signal conditions
    const shortCondition = (
      data.close < currentEMA &&
      currentRSI > 70 && // Overbought
      currentStochK < currentStochD && // Stoch bearish crossover
      currentStochK > 80 // Overbought stoch
    );

    if (longCondition) {
      return {
        action: 'BUY',
        symbol: data.symbol,
        price: data.close,
        stopLoss: data.close - (stopLoss * pipSize),
        takeProfit: data.close + (profitTarget * pipSize),
        confidence: 75,
        reason: `Scalp long: RSI oversold + Stoch crossover`,
        metadata: {
          type: 'SCALP',
          duration: 'SHORT_TERM',
          rsi: currentRSI,
          stochK: currentStochK,
        },
      };
    }

    if (shortCondition) {
      return {
        action: 'SELL',
        symbol: data.symbol,
        price: data.close,
        stopLoss: data.close + (stopLoss * pipSize),
        takeProfit: data.close - (profitTarget * pipSize),
        confidence: 75,
        reason: `Scalp short: RSI overbought + Stoch crossover`,
        metadata: {
          type: 'SCALP',
          duration: 'SHORT_TERM',
          rsi: currentRSI,
          stochK: currentStochK,
        },
      };
    }

    return {
      action: 'HOLD',
      symbol: data.symbol,
      confidence: 50,
      reason: 'Waiting for scalp setup',
    };
  }
}