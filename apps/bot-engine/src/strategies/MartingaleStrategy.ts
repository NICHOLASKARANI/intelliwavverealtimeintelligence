// apps/bot-engine/src/strategies/MartingaleStrategy.ts
import { BaseStrategy, StrategyConfig, SignalResult, MarketData } from './BaseStrategy';

export class MartingaleStrategy extends BaseStrategy {
  private consecutiveLosses: number = 0;
  private baseStake: number;
  private maxMultiplier: number;
  private currentMultiplier: number = 1;

  constructor(config: StrategyConfig) {
    super(config);
    
    this.baseStake = config.parameters.baseStake || 10;
    this.maxMultiplier = config.parameters.maxMultiplier || 16;
    
    this.config.parameters = {
      baseStake: this.baseStake,
      maxMultiplier: this.maxMultiplier,
      direction: config.parameters.direction || 'BUY',
      ...config.parameters,
    };
  }

  calculateIndicators(data: MarketData[]): Record<string, any> {
    return {
      consecutiveLosses: this.consecutiveLosses,
      currentMultiplier: this.currentMultiplier,
      nextStake: this.calculateNextStake(),
    };
  }

  analyze(data: MarketData): SignalResult {
    const direction = this.config.parameters.direction;
    
    // Always trade in the configured direction
    const currentStake = this.calculateNextStake();
    
    if (this.currentMultiplier > this.maxMultiplier) {
      this.logger.warn('Max multiplier reached, resetting Martingale');
      this.consecutiveLosses = 0;
      this.currentMultiplier = 1;
    }

    return {
      action: direction as 'BUY' | 'SELL',
      symbol: data.symbol,
      price: data.close,
      confidence: 70 - (this.consecutiveLosses * 5), // Confidence decreases with losses
      reason: `Martingale ${direction}: Stake ${currentStake} (${this.currentMultiplier}x) after ${this.consecutiveLosses} losses`,
      metadata: {
        stake: currentStake,
        multiplier: this.currentMultiplier,
        consecutiveLosses: this.consecutiveLosses,
        maxMultiplier: this.maxMultiplier,
      },
    };
  }

  onWin(): void {
    this.consecutiveLosses = 0;
    this.currentMultiplier = 1;
    this.logger.info('Martingale reset after win');
  }

  onLoss(): void {
    this.consecutiveLosses++;
    this.currentMultiplier = Math.min(
      Math.pow(2, this.consecutiveLosses),
      this.maxMultiplier
    );
    this.logger.info(`Martingale: ${this.consecutiveLosses} losses, multiplier: ${this.currentMultiplier}x`);
  }

  private calculateNextStake(): number {
    return this.baseStake * this.currentMultiplier;
  }
}