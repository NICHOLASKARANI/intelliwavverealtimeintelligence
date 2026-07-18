// apps/bot-engine/src/index.ts
import { TradingEngine } from './core/Engine';
import { Backtester } from './backtesting/Backtester';
import { RiskManager } from './core/RiskManager';
import { Scheduler } from './core/Scheduler';

// Export all components
export {
  TradingEngine,
  Backtester,
  RiskManager,
  Scheduler,
};

// Export strategies
export { BaseStrategy } from './strategies/BaseStrategy';
export { MACrossStrategy } from './strategies/MACrossStrategy';
export { RSIMeanReversion } from './strategies/RSIMeanReversion';
export { GridStrategy } from './strategies/GridStrategy';
export { DCAStrategy } from './strategies/DCAStrategy';
export { MartingaleStrategy } from './strategies/MartingaleStrategy';
export { BollingerBandsStrategy } from './strategies/BollingerBandsStrategy';
export { ScalpingStrategy } from './strategies/ScalpingStrategy';

// Export types
export type { StrategyConfig, SignalResult, MarketData } from './strategies/BaseStrategy';
export type { BacktestConfig, BacktestResult, BacktestTrade } from './backtesting/Backtester';
export type { RiskConfig, PositionRisk } from './core/RiskManager';
export type { BotConfig, BotInstance, BotMetrics } from './core/Engine';