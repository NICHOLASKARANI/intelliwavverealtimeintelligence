// apps/ai-engine/src/predictions/TradeRecommender.ts
import { Logger } from '../utils/logger';
import { MarketAnalyzer, MarketAnalysis } from '../analysis/MarketAnalyzer';
import { MathUtil } from '@intelliwave/shared';

export interface TradeRecommendation {
  symbol: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  timeframe: string;
  reasoning: string[];
  riskRewardRatio: number;
  probabilityOfSuccess: number;
  suggestedPositionSize: number;
  technicalFactors: Record<string, any>;
  aiInsights: string[];
}

export class TradeRecommender {
  private analyzer: MarketAnalyzer;
  private logger: Logger;

  constructor() {
    this.analyzer = new MarketAnalyzer();
    this.logger = new Logger('TradeRecommender');
  }

  async getRecommendation(
    symbol: string,
    historicalData: any[],
    accountBalance: number,
    riskProfile: any,
  ): Promise<TradeRecommendation> {
    // Analyze market
    const analysis = await this.analyzer.analyze(symbol, historicalData);
    
    // Generate recommendation based on analysis
    const action = this.determineAction(analysis);
    const confidence = analysis.confidence;
    
    // Calculate entry, stop, and target
    const currentPrice = historicalData[historicalData.length - 1].close;
    const volatility = analysis.volatility.atr;
    
    let stopLoss: number;
    let takeProfit: number;
    let riskRewardRatio: number;

    if (action === 'BUY') {
      stopLoss = this.calculateStopLoss(currentPrice, volatility, 'BUY', analysis.supportResistance);
      takeProfit = this.calculateTakeProfit(currentPrice, volatility, 'BUY', analysis.supportResistance);
    } else if (action === 'SELL') {
      stopLoss = this.calculateStopLoss(currentPrice, volatility, 'SELL', analysis.supportResistance);
      takeProfit = this.calculateTakeProfit(currentPrice, volatility, 'SELL', analysis.supportResistance);
    } else {
      stopLoss = 0;
      takeProfit = 0;
    }

    riskRewardRatio = action !== 'HOLD'
      ? Math.abs(takeProfit - currentPrice) / Math.abs(currentPrice - stopLoss)
      : 0;

    // Calculate probability of success
    const probabilityOfSuccess = this.calculateProbability(analysis, action);

    // Calculate position size
    const suggestedPositionSize = this.calculatePositionSize(
      accountBalance,
      currentPrice,
      stopLoss,
      riskProfile,
      analysis.volatility.riskLevel,
    );

    // Generate reasoning
    const reasoning = this.generateReasoning(analysis, action, stopLoss, takeProfit);

    // AI insights
    const aiInsights = this.generateAIInsights(analysis, action);

    const riskLevel = this.determineRiskLevel(analysis, riskRewardRatio);

    return {
      symbol,
      action,
      confidence,
      entryPrice: MathUtil.roundTo(currentPrice, 4),
      stopLoss: MathUtil.roundTo(stopLoss, 4),
      takeProfit: MathUtil.roundTo(takeProfit, 4),
      riskLevel,
      timeframe: '1h',
      reasoning,
      riskRewardRatio: MathUtil.roundTo(riskRewardRatio, 2),
      probabilityOfSuccess: MathUtil.roundTo(probabilityOfSuccess, 2),
      suggestedPositionSize: MathUtil.roundTo(suggestedPositionSize, 2),
      technicalFactors: {
        rsi: analysis.momentum.rsi,
        trendStrength: analysis.trend.strength,
        volatility: analysis.volatility.volatilityPercentile,
        patterns: analysis.patterns.length,
      },
      aiInsights,
    };
  }

  private determineAction(analysis: MarketAnalysis): 'BUY' | 'SELL' | 'HOLD' {
    if (analysis.confidence < 60) return 'HOLD';

    const bullishSignals = 0;
    const bearishSignals = 0;

    // Strong trend = follow trend
    if (analysis.trend.strength > 40) {
      if (analysis.trend.direction === 'UP' && analysis.momentum.momentumScore > 50) {
        return 'BUY';
      } else if (analysis.trend.direction === 'DOWN' && analysis.momentum.momentumScore < 50) {
        return 'SELL';
      }
    }

    // Oversold/Overbought reversals
    if (analysis.momentum.rsi < 25 && analysis.trend.direction !== 'DOWN') {
      return 'BUY';
    }
    if (analysis.momentum.rsi > 75 && analysis.trend.direction !== 'UP') {
      return 'SELL';
    }

    // Pattern-based signals
    const bullishPatterns = analysis.patterns.filter(p => p.direction === 'BULLISH');
    const bearishPatterns = analysis.patterns.filter(p => p.direction === 'BEARISH');

    if (bullishPatterns.length > bearishPatterns.length && bullishPatterns.length >= 2) {
      return 'BUY';
    }
    if (bearishPatterns.length > bullishPatterns.length && bearishPatterns.length >= 2) {
      return 'SELL';
    }

    return 'HOLD';
  }

  private calculateStopLoss(
    price: number,
    atr: number,
    action: 'BUY' | 'SELL',
    levels: any,
  ): number {
    // Use ATR for dynamic stop loss
    const atrStop = action === 'BUY' ? price - atr * 2 : price + atr * 2;

    // Use support/resistance for more precise stops
    let srStop: number;
    if (action === 'BUY') {
      srStop = levels.supports[0] || atrStop;
      srStop = Math.min(srStop, price - atr * 1.5); // Don't set stop too tight
    } else {
      srStop = levels.resistances[0] || atrStop;
      srStop = Math.max(srStop, price + atr * 1.5);
    }

    // Blend ATR and S/R stops
    return (atrStop + srStop) / 2;
  }

  private calculateTakeProfit(
    price: number,
    atr: number,
    action: 'BUY' | 'SELL',
    levels: any,
  ): number {
    const riskAmount = atr * 2;
    const rewardMultiplier = 2; // 2:1 risk-reward ratio

    if (action === 'BUY') {
      const atrTarget = price + riskAmount * rewardMultiplier;
      const srTarget = levels.resistances[0] || atrTarget;
      return Math.min(atrTarget, srTarget);
    } else {
      const atrTarget = price - riskAmount * rewardMultiplier;
      const srTarget = levels.supports[0] || atrTarget;
      return Math.max(atrTarget, srTarget);
    }
  }

  private calculateProbability(analysis: MarketAnalysis, action: string): number {
    let probability = 50;

    if (action === 'BUY') {
      probability += analysis.trend.direction === 'UP' ? 15 : -10;
      probability += analysis.momentum.rsi < 30 ? 10 : 0;
      probability += analysis.trend.strength * 0.2;
    } else if (action === 'SELL') {
      probability += analysis.trend.direction === 'DOWN' ? 15 : -10;
      probability += analysis.momentum.rsi > 70 ? 10 : 0;
      probability += analysis.trend.strength * 0.2;
    }

    // Pattern confidence contribution
    analysis.patterns.forEach(pattern => {
      if (pattern.direction === (action === 'BUY' ? 'BULLISH' : 'BEARISH')) {
        probability += pattern.confidence * 0.1;
      }
    });

    return Math.max(30, Math.min(90, probability));
  }

  private calculatePositionSize(
    balance: number,
    price: number,
    stopLoss: number,
    riskProfile: any,
    riskLevel: string,
  ): number {
    const riskPerTrade = riskProfile?.riskPerTrade || 2; // Default 2%
    const riskAmount = balance * (riskPerTrade / 100);
    const priceRisk = Math.abs(price - stopLoss);

    if (priceRisk === 0) return 0;

    let positionSize = riskAmount / priceRisk;

    // Adjust for risk level
    if (riskLevel === 'HIGH') positionSize *= 0.5;
    else if (riskLevel === 'LOW') positionSize *= 1.5;

    // Cap position size
    const maxPositionValue = balance * 0.1; // Max 10% of balance
    positionSize = Math.min(positionSize, maxPositionValue / price);

    return positionSize;
  }

  private determineRiskLevel(
    analysis: MarketAnalysis,
    riskRewardRatio: number,
  ): 'LOW' | 'MEDIUM' | 'HIGH' {
    let riskScore = 0;

    // Volatility contribution
    if (analysis.volatility.riskLevel === 'HIGH') riskScore += 30;
    else if (analysis.volatility.riskLevel === 'MEDIUM') riskScore += 15;

    // Trend strength (stronger trend = lower risk)
    riskScore -= analysis.trend.strength * 0.2;

    // Risk-reward
    if (riskRewardRatio > 3) riskScore -= 20;
    else if (riskRewardRatio > 2) riskScore -= 10;
    else if (riskRewardRatio < 1) riskScore += 20;

    if (riskScore > 25) return 'HIGH';
    if (riskScore > 10) return 'MEDIUM';
    return 'LOW';
  }

  private generateReasoning(
    analysis: MarketAnalysis,
    action: string,
    stopLoss: number,
    takeProfit: number,
  ): string[] {
    const reasons: string[] = [];

    reasons.push(`Market sentiment: ${analysis.overallSentiment}`);
    reasons.push(`Trend: ${analysis.trend.direction} (${analysis.trend.strength}% strength)`);
    reasons.push(`RSI: ${analysis.momentum.rsi}`);
    reasons.push(`Volatility: ${analysis.volatility.riskLevel} (${analysis.volatility.volatilityPercentile}th percentile)`);

    if (action !== 'HOLD') {
      reasons.push(`Stop Loss: ${stopLoss} (ATR-based)`);
      reasons.push(`Take Profit: ${takeProfit} (${action === 'BUY' ? '+' : '-'}${Math.abs(takeProfit - analysis.momentum.rsi).toFixed(2)})`);
    }

    analysis.patterns.forEach(pattern => {
      reasons.push(`${pattern.pattern.replace('_', ' ')}: ${pattern.description}`);
    });

    return reasons;
  }

  private generateAIInsights(analysis: MarketAnalysis, action: string): string[] {
    const insights: string[] = [];

    if (analysis.momentum.rsi > 75) {
      insights.push('Market appears overbought. Consider waiting for pullback before entering long.');
    } else if (analysis.momentum.rsi < 25) {
      insights.push('Market appears oversold. Potential bounce opportunity if support holds.');
    }

    if (analysis.volatility.riskLevel === 'HIGH') {
      insights.push('High volatility detected. Reduce position size or wait for calmer conditions.');
    }

    if (analysis.trend.strength > 60) {
      insights.push(`Strong ${analysis.trend.direction.toLowerCase()} trend. Following the trend may be beneficial.`);
    }

    if (analysis.patterns.length >= 3) {
      insights.push('Multiple patterns detected. Higher confidence in potential move.');
    }

    return insights;
  }
}