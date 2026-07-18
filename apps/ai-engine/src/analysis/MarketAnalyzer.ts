// apps/ai-engine/src/analysis/MarketAnalyzer.ts
import { Logger } from '../utils/logger';
import { MathUtil } from '@intelliwave/shared';
import { RSI, MACD, BollingerBands, ATR, ADX, Stochastic } from 'technicalindicators';

export interface MarketAnalysis {
  symbol: string;
  timestamp: number;
  trend: TrendAnalysis;
  momentum: MomentumAnalysis;
  volatility: VolatilityAnalysis;
  supportResistance: SupportResistanceLevels;
  patterns: PatternDetection[];
  overallSentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  confidence: number;
  summary: string;
}

interface TrendAnalysis {
  direction: 'UP' | 'DOWN' | 'SIDEWAYS';
  strength: number; // 0-100
  shortTermTrend: string;
  mediumTermTrend: string;
  longTermTrend: string;
}

interface MomentumAnalysis {
  rsi: number;
  macd: { value: number; signal: number; histogram: number };
  stochastic: { k: number; d: number };
  momentumScore: number; // 0-100
}

interface VolatilityAnalysis {
  atr: number;
  bollingerWidth: number;
  volatilityPercentile: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

interface SupportResistanceLevels {
  supports: number[];
  resistances: number[];
  currentLevel: 'SUPPORT' | 'RESISTANCE' | 'MIDDLE';
}

interface PatternDetection {
  pattern: string;
  confidence: number;
  direction: 'BULLISH' | 'BEARISH';
  price: number;
  description: string;
}

export class MarketAnalyzer {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('MarketAnalyzer');
  }

  async analyze(symbol: string, historicalData: any[]): Promise<MarketAnalysis> {
    if (historicalData.length < 50) {
      throw new Error('Insufficient data. Minimum 50 candles required.');
    }

    const closes = historicalData.map(d => d.close);
    const highs = historicalData.map(d => d.high);
    const lows = historicalData.map(d => d.low);
    const volumes = historicalData.map(d => d.volume);

    const trend = this.analyzeTrend(closes);
    const momentum = this.analyzeMomentum(closes, highs, lows);
    const volatility = this.analyzeVolatility(closes, highs, lows);
    const supportResistance = this.findSupportResistance(highs, lows);
    const patterns = this.detectPatterns(historicalData);
    const overallSentiment = this.calculateSentiment(trend, momentum, patterns);
    const confidence = this.calculateConfidence(trend, momentum, volatility);

    const summary = this.generateSummary(symbol, overallSentiment, trend, momentum, patterns);

    return {
      symbol,
      timestamp: Date.now(),
      trend,
      momentum,
      volatility,
      supportResistance,
      patterns,
      overallSentiment,
      confidence,
      summary,
    };
  }

  private analyzeTrend(prices: number[]): TrendAnalysis {
    const shortPeriod = 10;
    const mediumPeriod = 30;
    const longPeriod = 50;

    const shortMA = this.calculateMA(prices.slice(-shortPeriod));
    const mediumMA = this.calculateMA(prices.slice(-mediumPeriod));
    const longMA = this.calculateMA(prices.slice(-longPeriod));

    const currentPrice = prices[prices.length - 1];
    const priceChange20 = ((currentPrice - prices[prices.length - 21]) / prices[prices.length - 21]) * 100;

    // Determine direction
    let direction: 'UP' | 'DOWN' | 'SIDEWAYS';
    if (shortMA > mediumMA && mediumMA > longMA) {
      direction = 'UP';
    } else if (shortMA < mediumMA && mediumMA < longMA) {
      direction = 'DOWN';
    } else {
      direction = 'SIDEWAYS';
    }

    // Calculate trend strength (ADX)
    const adx = ADX.calculate({
      high: prices.map(p => p * 1.001),
      low: prices.map(p => p * 0.999),
      close: prices,
      period: 14,
    });

    const currentADX = adx[adx.length - 1] || 25;
    const strength = Math.min(MathUtil.roundTo(currentADX, 2), 100);

    return {
      direction,
      strength,
      shortTermTrend: priceChange20 > 1 ? 'Bullish' : priceChange20 < -1 ? 'Bearish' : 'Neutral',
      mediumTermTrend: mediumMA > longMA ? 'Bullish' : 'Bearish',
      longTermTrend: prices[prices.length - 1] > longMA ? 'Bullish' : 'Bearish',
    };
  }

  private analyzeMomentum(closes: number[], highs: number[], lows: number[]): MomentumAnalysis {
    // RSI
    const rsiValues = RSI.calculate({ period: 14, values: closes });
    const rsi = rsiValues[rsiValues.length - 1] || 50;

    // MACD
    const macdResult = MACD.calculate({
      values: closes,
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9,
    });

    const lastMACD = macdResult[macdResult.length - 1];
    const macd = lastMACD ? {
      value: lastMACD.MACD || 0,
      signal: lastMACD.signal || 0,
      histogram: lastMACD.histogram || 0,
    } : { value: 0, signal: 0, histogram: 0 };

    // Stochastic
    const stochResult = Stochastic.calculate({
      high: highs,
      low: lows,
      close: closes,
      period: 14,
      signalPeriod: 3,
    });

    const lastStoch = stochResult[stochResult.length - 1];
    const stochastic = lastStoch ? {
      k: lastStoch.k || 50,
      d: lastStoch.d || 50,
    } : { k: 50, d: 50 };

    // Momentum score (0-100)
    let momentumScore = 50;
    momentumScore += (rsi - 50) * 0.5;
    momentumScore += (macd.histogram > 0 ? 10 : -10);
    momentumScore += (stochastic.k > stochastic.d ? 5 : -5);
    momentumScore = Math.max(0, Math.min(100, momentumScore));

    return {
      rsi: MathUtil.roundTo(rsi, 2),
      macd,
      stochastic,
      momentumScore: MathUtil.roundTo(momentumScore, 2),
    };
  }

  private analyzeVolatility(closes: number[], highs: number[], lows: number[]): VolatilityAnalysis {
    // ATR
    const atrValues = ATR.calculate({
      high: highs,
      low: lows,
      close: closes,
      period: 14,
    });

    const atr = atrValues[atrValues.length - 1] || 0;

    // Bollinger Bands
    const bbResult = BollingerBands.calculate({
      period: 20,
      stdDev: 2,
      values: closes,
    });

    const lastBB = bbResult[bbResult.length - 1];
    const bollingerWidth = lastBB
      ? ((lastBB.upper - lastBB.lower) / lastBB.middle) * 100
      : 0;

    // Volatility percentile
    const returns = [];
    for (let i = 1; i < closes.length; i++) {
      returns.push(Math.abs((closes[i] - closes[i - 1]) / closes[i - 1]));
    }
    const currentVol = returns[returns.length - 1] || 0;
    const volatilityPercentile = this.calculatePercentile(returns, currentVol);

    // Risk level
    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    if (volatilityPercentile < 30) {
      riskLevel = 'LOW';
    } else if (volatilityPercentile < 70) {
      riskLevel = 'MEDIUM';
    } else {
      riskLevel = 'HIGH';
    }

    return {
      atr: MathUtil.roundTo(atr, 4),
      bollingerWidth: MathUtil.roundTo(bollingerWidth, 2),
      volatilityPercentile: MathUtil.roundTo(volatilityPercentile, 2),
      riskLevel,
    };
  }

  private findSupportResistance(highs: number[], lows: number[]): SupportResistanceLevels {
    const allPrices = [...highs, ...lows];
    const priceLevels = this.findPriceClusters(allPrices);
    
    const currentPrice = highs[highs.length - 1];
    const supports: number[] = [];
    const resistances: number[] = [];

    priceLevels.forEach(level => {
      if (level < currentPrice) {
        supports.push(level);
      } else {
        resistances.push(level);
      }
    });

    // Sort and get nearest levels
    supports.sort((a, b) => b - a);
    resistances.sort((a, b) => a - b);

    let currentLevel: 'SUPPORT' | 'RESISTANCE' | 'MIDDLE' = 'MIDDLE';
    if (supports.length > 0 && currentPrice - supports[0] < (resistances[0] || Infinity) - currentPrice) {
      currentLevel = 'SUPPORT';
    } else if (resistances.length > 0) {
      currentLevel = 'RESISTANCE';
    }

    return {
      supports: supports.slice(0, 3),
      resistances: resistances.slice(0, 3),
      currentLevel,
    };
  }

  private findPriceClusters(prices: number[], threshold: number = 0.001): number[] {
    const sorted = [...prices].sort((a, b) => a - b);
    const clusters: number[] = [];
    let currentCluster: number[] = [];

    for (let i = 0; i < sorted.length; i++) {
      if (currentCluster.length === 0) {
        currentCluster.push(sorted[i]);
      } else {
        const avg = this.calculateMA(currentCluster);
        if (Math.abs(sorted[i] - avg) / avg < threshold) {
          currentCluster.push(sorted[i]);
        } else {
          if (currentCluster.length >= 3) {
            clusters.push(this.calculateMA(currentCluster));
          }
          currentCluster = [sorted[i]];
        }
      }
    }

    return clusters;
  }

  private detectPatterns(data: any[]): PatternDetection[] {
    const patterns: PatternDetection[] = [];
    const closes = data.map(d => d.close);
    const opens = data.map(d => d.open);
    const highs = data.map(d => d.high);
    const lows = data.map(d => d.low);

    // Doji pattern
    if (this.isDoji(opens[opens.length - 1], closes[closes.length - 1], highs[highs.length - 1], lows[lows.length - 1])) {
      patterns.push({
        pattern: 'DOJI',
        confidence: 75,
        direction: 'NEUTRAL',
        price: closes[closes.length - 1],
        description: 'Doji candlestick indicates market indecision',
      });
    }

    // Hammer pattern
    if (this.isHammer(opens[opens.length - 1], closes[closes.length - 1], highs[highs.length - 1], lows[lows.length - 1])) {
      patterns.push({
        pattern: 'HAMMER',
        confidence: 80,
        direction: 'BULLISH',
        price: closes[closes.length - 1],
        description: 'Hammer pattern suggests potential bullish reversal',
      });
    }

    // Engulfing pattern
    if (data.length >= 2 && this.isEngulfing(data[data.length - 2], data[data.length - 1])) {
      const bullish = closes[closes.length - 1] > opens[opens.length - 1];
      patterns.push({
        pattern: bullish ? 'BULLISH_ENGULFING' : 'BEARISH_ENGULFING',
        confidence: 85,
        direction: bullish ? 'BULLISH' : 'BEARISH',
        price: closes[closes.length - 1],
        description: `${bullish ? 'Bullish' : 'Bearish'} engulfing pattern detected`,
      });
    }

    // Head and Shoulders (simplified detection)
    if (data.length >= 20 && this.isHeadAndShoulders(highs)) {
      patterns.push({
        pattern: 'HEAD_AND_SHOULDERS',
        confidence: 70,
        direction: 'BEARISH',
        price: closes[closes.length - 1],
        description: 'Head and shoulders pattern suggests bearish reversal',
      });
    }

    // Double Top/Bottom
    if (data.length >= 10) {
      if (this.isDoubleTop(highs)) {
        patterns.push({
          pattern: 'DOUBLE_TOP',
          confidence: 75,
          direction: 'BEARISH',
          price: closes[closes.length - 1],
          description: 'Double top pattern detected, potential bearish reversal',
        });
      }
      if (this.isDoubleBottom(lows)) {
        patterns.push({
          pattern: 'DOUBLE_BOTTOM',
          confidence: 75,
          direction: 'BULLISH',
          price: closes[closes.length - 1],
          description: 'Double bottom pattern detected, potential bullish reversal',
        });
      }
    }

    return patterns;
  }

  private isDoji(open: number, close: number, high: number, low: number): boolean {
    const body = Math.abs(close - open);
    const range = high - low;
    return body / range < 0.1;
  }

  private isHammer(open: number, close: number, high: number, low: number): boolean {
    const body = Math.abs(close - open);
    const lowerWick = Math.min(open, close) - low;
    const upperWick = high - Math.max(open, close);
    return lowerWick > body * 2 && upperWick < body;
  }

  private isEngulfing(prev: any, current: any): boolean {
    const prevBody = Math.abs(prev.close - prev.open);
    const currentBody = Math.abs(current.close - current.open);
    const prevBullish = prev.close > prev.open;
    const currentBullish = current.close > current.open;
    
    return currentBody > prevBody && prevBullish !== currentBullish &&
           ((currentBullish && current.close > prev.open && current.open < prev.close) ||
            (!currentBullish && current.close < prev.open && current.open > prev.close));
  }

  private isHeadAndShoulders(highs: number[]): boolean {
    if (highs.length < 20) return false;
    
    const recentHighs = highs.slice(-20);
    const peaks = this.findPeaks(recentHighs);
    
    if (peaks.length >= 3) {
      const leftShoulder = peaks[peaks.length - 3];
      const head = peaks[peaks.length - 2];
      const rightShoulder = peaks[peaks.length - 1];
      
      return head > leftShoulder && head > rightShoulder &&
             Math.abs(leftShoulder - rightShoulder) / leftShoulder < 0.05;
    }
    
    return false;
  }

  private isDoubleTop(highs: number[]): boolean {
    const peaks = this.findPeaks(highs.slice(-10));
    if (peaks.length >= 2) {
      const top1 = peaks[peaks.length - 2];
      const top2 = peaks[peaks.length - 1];
      return Math.abs(top1 - top2) / top1 < 0.01;
    }
    return false;
  }

  private isDoubleBottom(lows: number[]): boolean {
    const troughs = this.findTroughs(lows.slice(-10));
    if (troughs.length >= 2) {
      const bottom1 = troughs[troughs.length - 2];
      const bottom2 = troughs[troughs.length - 1];
      return Math.abs(bottom1 - bottom2) / bottom1 < 0.01;
    }
    return false;
  }

  private findPeaks(data: number[]): number[] {
    const peaks: number[] = [];
    for (let i = 1; i < data.length - 1; i++) {
      if (data[i] > data[i - 1] && data[i] > data[i + 1]) {
        peaks.push(data[i]);
      }
    }
    return peaks;
  }

  private findTroughs(data: number[]): number[] {
    const troughs: number[] = [];
    for (let i = 1; i < data.length - 1; i++) {
      if (data[i] < data[i - 1] && data[i] < data[i + 1]) {
        troughs.push(data[i]);
      }
    }
    return troughs;
  }

  private calculateSentiment(
    trend: TrendAnalysis,
    momentum: MomentumAnalysis,
    patterns: PatternDetection[],
  ): 'BULLISH' | 'BEARISH' | 'NEUTRAL' {
    let score = 0;

    // Trend contribution
    if (trend.direction === 'UP') score += 30;
    else if (trend.direction === 'DOWN') score -= 30;

    // Momentum contribution
    score += (momentum.momentumScore - 50) * 0.5;

    // Patterns contribution
    patterns.forEach(pattern => {
      if (pattern.direction === 'BULLISH') score += 15;
      else if (pattern.direction === 'BEARISH') score -= 15;
    });

    if (score > 20) return 'BULLISH';
    if (score < -20) return 'BEARISH';
    return 'NEUTRAL';
  }

  private calculateConfidence(
    trend: TrendAnalysis,
    momentum: MomentumAnalysis,
    volatility: VolatilityAnalysis,
  ): number {
    let confidence = 50;

    // Strong trend = higher confidence
    confidence += trend.strength * 0.3;

    // Extreme RSI = higher confidence
    if (momentum.rsi > 70 || momentum.rsi < 30) {
      confidence += 10;
    }

    // Low volatility = higher confidence in trends
    if (volatility.riskLevel === 'LOW') {
      confidence += 5;
    } else if (volatility.riskLevel === 'HIGH') {
      confidence -= 5;
    }

    return Math.max(30, Math.min(95, MathUtil.roundTo(confidence, 2)));
  }

  private generateSummary(
    symbol: string,
    sentiment: string,
    trend: TrendAnalysis,
    momentum: MomentumAnalysis,
    patterns: PatternDetection[],
  ): string {
    let summary = `${symbol} is showing a ${sentiment.toLowerCase()} bias. `;
    summary += `The ${trend.shortTermTrend.toLowerCase()} trend is ${trend.direction.toLowerCase()} with ${trend.strength}% strength. `;
    summary += `RSI at ${momentum.rsi} indicates ${momentum.rsi > 70 ? 'overbought' : momentum.rsi < 30 ? 'oversold' : 'neutral'} conditions. `;
    
    if (patterns.length > 0) {
      summary += `Detected patterns: ${patterns.map(p => p.pattern.replace('_', ' ')).join(', ')}.`;
    }

    return summary;
  }

  private calculateMA(values: number[]): number {
    return values.reduce((sum, v) => sum + v, 0) / values.length;
  }

  private calculatePercentile(values: number[], value: number): number {
    const sorted = [...values].sort((a, b) => a - b);
    const index = sorted.findIndex(v => v > value);
    return (index / sorted.length) * 100;
  }
}