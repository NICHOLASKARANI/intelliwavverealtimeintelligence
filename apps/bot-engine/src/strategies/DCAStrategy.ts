// apps/bot-engine/src/strategies/DCAStrategy.ts
import { BaseStrategy, StrategyConfig, SignalResult, MarketData } from './BaseStrategy';

export class DCAStrategy extends BaseStrategy {
  private investmentAmount: number;
  private interval: number; // in minutes
  private lastInvestmentTime: number = 0;

  constructor(config: StrategyConfig) {
    super(config);
    
    this.config.parameters = {
      investmentAmount: config.parameters.investmentAmount || 100,
      interval: config.parameters.interval || 60, // minutes
      maxInvestments: config.parameters.maxInvestments || 0, // 0 = unlimited
      ...config.parameters,
    };

    this.investmentAmount = this.config.parameters.investmentAmount;
    this.interval = this.config.parameters.interval * 60 * 1000; // Convert to milliseconds
  }

  calculateIndicators(data: MarketData[]): Record<string, any> {
    const totalInvested = this.positions.size * this.investmentAmount;
    const averagePrice = this.calculateAveragePrice();
    
    return {
      totalInvested,
      averagePrice,
      numberOfInvestments: this.positions.size,
      nextInvestmentIn: this.getNextInvestmentTime(data[data.length - 1]),
    };
  }

  analyze(data: MarketData): SignalResult {
    const now = data.timestamp;
    const { maxInvestments } = this.config.parameters;

    // Check if we've reached max investments
    if (maxInvestments > 0 && this.positions.size >= maxInvestments) {
      return {
        action: 'HOLD',
        symbol: data.symbol,
        confidence: 50,
        reason: 'Maximum investments reached',
      };
    }

    // Check if it's time for next investment
    if (now - this.lastInvestmentTime >= this.interval) {
      this.lastInvestmentTime = now;
      
      const averagePrice = this.calculateAveragePrice();
      const currentDiscount = ((averagePrice - data.close) / averagePrice) * 100;

      return {
        action: 'BUY',
        symbol: data.symbol,
        price: data.close,
        confidence: 80,
        reason: `DCA investment #${this.positions.size + 1}: ${currentDiscount > 0 ? `${currentDiscount.toFixed(1)}% below average` : 'Regular interval'}`,
        metadata: {
          investmentNumber: this.positions.size + 1,
          averagePrice,
          currentDiscount,
          amount: this.investmentAmount,
        },
      };
    }

    // Check for exit conditions
    const averagePrice = this.calculateAveragePrice();
    const profitPercent = ((data.close - averagePrice) / averagePrice) * 100;

    if (profitPercent >= 20) { // 20% profit target
      return {
        action: 'CLOSE',
        symbol: data.symbol,
        confidence: 90,
        reason: `Profit target reached: ${profitPercent.toFixed(1)}%`,
        metadata: { profitPercent },
      };
    }

    return {
      action: 'HOLD',
      symbol: data.symbol,
      confidence: 50,
      reason: `Next DCA in ${Math.round((this.getNextInvestmentTime(data) - now) / 1000 / 60)} minutes`,
    };
  }

  private calculateAveragePrice(): number {
    if (this.positions.size === 0) return 0;
    
    let totalPrice = 0;
    this.positions.forEach(position => {
      totalPrice += position.entryPrice || 0;
    });
    
    return totalPrice / this.positions.size;
  }

  private getNextInvestmentTime(data: MarketData): number {
    return this.lastInvestmentTime + this.interval;
  }
}