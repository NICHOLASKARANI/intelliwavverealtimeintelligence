// apps/bot-engine/src/core/RiskManager.ts
import { Logger } from '../utils/logger';
import { MathUtil } from '@intelliwave/shared';

export interface RiskConfig {
  maxDrawdownPercent: number;
  dailyLossLimit: number;
  maxPositionSize: number;
  maxLeverage: number;
  maxPositions: number;
  maxCorrelatedPositions: number;
  useKellyCriterion: boolean;
  kellyFraction: number;
  volatilityAdjustment: boolean;
}

export interface PositionRisk {
  positionSize: number;
  stopLoss: number;
  takeProfit: number;
  riskAmount: number;
  potentialProfit: number;
  riskRewardRatio: number;
}

export class RiskManager {
  private config: RiskConfig;
  private logger: Logger;
  private dailyPnL: number = 0;
  private currentDrawdown: number = 0;
  private peakEquity: number = 0;
  private equity: number = 10000; // Starting equity

  constructor(config: Partial<RiskConfig>) {
    this.config = {
      maxDrawdownPercent: 20,
      dailyLossLimit: 1000,
      maxPositionSize: 5000,
      maxLeverage: 100,
      maxPositions: 5,
      maxCorrelatedPositions: 2,
      useKellyCriterion: false,
      kellyFraction: 0.5,
      volatilityAdjustment: false,
      ...config,
    };
    this.logger = new Logger('RiskManager');
  }

  calculatePositionSize(
    accountBalance: number,
    riskPercent: number,
    entryPrice: number,
    stopLoss: number,
  ): number {
    const riskAmount = accountBalance * (riskPercent / 100);
    const priceDifference = Math.abs(entryPrice - stopLoss);
    
    if (priceDifference === 0) return 0;

    const positionSize = riskAmount / priceDifference;
    const maxSize = this.config.maxPositionSize;

    if (positionSize > maxSize) {
      this.logger.warn(`Position size ${positionSize} exceeds max ${maxSize}`);
      return maxSize;
    }

    return MathUtil.roundTo(positionSize, 2);
  }

  calculateKellyCriterion(
    winRate: number,
    averageWin: number,
    averageLoss: number,
  ): number {
    if (averageLoss === 0) return 0;

    const kelly = winRate - ((1 - winRate) / (averageWin / averageLoss));
    const adjustedKelly = kelly * this.config.kellyFraction;

    return Math.max(0, Math.min(adjustedKelly, 0.25)); // Cap at 25%
  }

  validateTrade(
    signal: any,
    currentPositions: any[],
    accountBalance: number,
  ): { allowed: boolean; reason?: string } {
    // Check daily loss limit
    if (this.dailyPnL <= -this.config.dailyLossLimit) {
      return {
        allowed: false,
        reason: `Daily loss limit of ${this.config.dailyLossLimit} reached`,
      };
    }

    // Check max positions
    if (currentPositions.length >= this.config.maxPositions) {
      return {
        allowed: false,
        reason: `Maximum positions (${this.config.maxPositions}) reached`,
      };
    }

    // Check max drawdown
    if (this.currentDrawdown >= this.config.maxDrawdownPercent) {
      return {
        allowed: false,
        reason: `Maximum drawdown (${this.config.maxDrawdownPercent}%) reached`,
      };
    }

    // Check correlation limits
    const sameSymbolPositions = currentPositions.filter(
      p => p.symbol === signal.symbol,
    );
    if (sameSymbolPositions.length >= 2) {
      return {
        allowed: false,
        reason: `Maximum positions for ${signal.symbol} reached`,
      };
    }

    // Calculate position risk
    const riskAmount = accountBalance * 0.02; // 2% risk per trade
    if (riskAmount > accountBalance * 0.1) { // Max 10% risk total
      return {
        allowed: false,
        reason: 'Trade exceeds maximum risk per trade',
      };
    }

    return { allowed: true };
  }

  calculatePositionRisk(
    entryPrice: number,
    positionSize: number,
    stopLoss: number,
    takeProfit: number,
  ): PositionRisk {
    const riskAmount = Math.abs(entryPrice - stopLoss) * positionSize;
    const potentialProfit = Math.abs(takeProfit - entryPrice) * positionSize;
    const riskRewardRatio = riskAmount > 0 ? potentialProfit / riskAmount : 0;

    return {
      positionSize,
      stopLoss,
      takeProfit,
      riskAmount,
      potentialProfit,
      riskRewardRatio,
    };
  }

  adjustForVolatility(
    positionSize: number,
    volatility: number,
  ): number {
    if (!this.config.volatilityAdjustment) return positionSize;

    // Reduce position size in high volatility
    const averageVolatility = 0.02; // 2% average
    const adjustment = averageVolatility / volatility;
    
    return MathUtil.roundTo(positionSize * Math.min(adjustment, 1.5), 2);
  }

  updateEquity(newEquity: number): void {
    const previousEquity = this.equity;
    this.equity = newEquity;

    // Update P&L
    this.dailyPnL += (newEquity - previousEquity);

    // Update peak and drawdown
    if (newEquity > this.peakEquity) {
      this.peakEquity = newEquity;
      this.currentDrawdown = 0;
    } else if (this.peakEquity > 0) {
      this.currentDrawdown = ((this.peakEquity - newEquity) / this.peakEquity) * 100;
    }
  }

  resetDailyPnL(): void {
    this.dailyPnL = 0;
    this.logger.info('Daily P&L reset');
  }

  getRiskMetrics(): Record<string, any> {
    return {
      currentEquity: this.equity,
      peakEquity: this.peakEquity,
      currentDrawdown: MathUtil.roundTo(this.currentDrawdown, 2),
      dailyPnL: MathUtil.roundTo(this.dailyPnL, 2),
      maxDrawdown: this.config.maxDrawdownPercent,
      dailyLossLimit: this.config.dailyLossLimit,
      riskPerTrade: MathUtil.roundTo(this.equity * 0.02, 2),
    };
  }

  shouldCircuitBreak(): boolean {
    return (
      this.currentDrawdown >= this.config.maxDrawdownPercent ||
      this.dailyPnL <= -this.config.dailyLossLimit
    );
  }
}