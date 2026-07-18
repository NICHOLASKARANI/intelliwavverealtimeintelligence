// apps/bot-engine/src/strategies/GridStrategy.ts
import { BaseStrategy, StrategyConfig, SignalResult, MarketData } from './BaseStrategy';

interface GridLevel {
  price: number;
  orderPlaced: boolean;
  orderFilled: boolean;
  type: 'BUY' | 'SELL';
}

export class GridStrategy extends BaseStrategy {
  private gridLevels: GridLevel[] = [];
  private upperPrice: number;
  private lowerPrice: number;
  private gridSpacing: number;
  private levelsCount: number;

  constructor(config: StrategyConfig) {
    super(config);
    
    this.config.parameters = {
      upperPrice: config.parameters.upperPrice || 0,
      lowerPrice: config.parameters.lowerPrice || 0,
      gridLevels: config.parameters.gridLevels || 10,
      orderSize: config.parameters.orderSize || 100,
      ...config.parameters,
    };
  }

  async start(): Promise<void> {
    await super.start();
    this.initializeGrid();
  }

  private initializeGrid(): void {
    const { upperPrice, lowerPrice, gridLevels } = this.config.parameters;
    this.upperPrice = upperPrice;
    this.lowerPrice = lowerPrice;
    this.levelsCount = gridLevels;
    this.gridSpacing = (upperPrice - lowerPrice) / (gridLevels - 1);
    
    this.gridLevels = [];
    
    for (let i = 0; i < gridLevels; i++) {
      const price = lowerPrice + (this.gridSpacing * i);
      const midPoint = gridLevels / 2;
      
      this.gridLevels.push({
        price,
        orderPlaced: false,
        orderFilled: false,
        type: i < midPoint ? 'BUY' : 'SELL',
      });
    }

    this.logger.info(`Grid initialized: ${gridLevels} levels from ${lowerPrice} to ${upperPrice}`);
  }

  calculateIndicators(data: MarketData[]): Record<string, any> {
    return {
      currentPrice: data[data.length - 1]?.close,
      gridLevels: this.gridLevels.length,
      filledLevels: this.gridLevels.filter(l => l.orderFilled).length,
    };
  }

  analyze(data: MarketData): SignalResult {
    const currentPrice = data.close;
    
    // Adjust grid if price moves outside range
    if (currentPrice > this.upperPrice * 1.05 || currentPrice < this.lowerPrice * 0.95) {
      const range = this.upperPrice - this.lowerPrice;
      const midPrice = currentPrice;
      
      this.upperPrice = midPrice + (range / 2);
      this.lowerPrice = midPrice - (range / 2);
      
      this.initializeGrid();
      this.logger.info(`Grid rebalanced around ${midPrice}`);
    }

    // Check each grid level for opportunities
    for (let i = 0; i < this.gridLevels.length; i++) {
      const level = this.gridLevels[i];

      if (!level.orderPlaced && !level.orderFilled) {
        // Buy level: price dropped below grid level
        if (level.type === 'BUY' && currentPrice <= level.price) {
          level.orderPlaced = true;
          return {
            action: 'BUY',
            symbol: data.symbol,
            price: level.price,
            stopLoss: level.price * 0.95, // 5% stop
            takeProfit: level.price + this.gridSpacing, // Target next level
            confidence: 75,
            reason: `Grid buy at level ${i + 1}/${this.levelsCount} (${level.price})`,
            metadata: {
              gridLevel: i,
              targetPrice: level.price + this.gridSpacing,
            },
          };
        }

        // Sell level: price rose above grid level
        if (level.type === 'SELL' && currentPrice >= level.price) {
          level.orderPlaced = true;
          return {
            action: 'SELL',
            symbol: data.symbol,
            price: level.price,
            stopLoss: level.price * 1.05,
            takeProfit: level.price - this.gridSpacing,
            confidence: 75,
            reason: `Grid sell at level ${i + 1}/${this.levelsCount} (${level.price})`,
            metadata: {
              gridLevel: i,
              targetPrice: level.price - this.gridSpacing,
            },
          };
        }
      }
    }

    return {
      action: 'HOLD',
      symbol: data.symbol,
      confidence: 50,
      reason: `Grid monitoring: ${this.gridLevels.filter(l => l.orderFilled).length}/${this.levelsCount} filled`,
    };
  }
}