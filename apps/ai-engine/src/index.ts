// apps/ai-engine/src/index.ts
import { MarketAnalyzer } from './analysis/MarketAnalyzer';
import { TradeRecommender } from './predictions/TradeRecommender';
import { TradingAssistant } from './nlp/TradingAssistant';
import { PortfolioOptimizer } from './optimization/PortfolioOptimizer';
import { PatternDetector } from './analysis/PatternDetector';
import { SentimentAnalyzer } from './analysis/SentimentAnalyzer';
import { AnomalyDetector } from './analysis/AnomalyDetector';

export {
  MarketAnalyzer,
  TradeRecommender,
  TradingAssistant,
  PortfolioOptimizer,
  PatternDetector,
  SentimentAnalyzer,
  AnomalyDetector,
};

export type { MarketAnalysis } from './analysis/MarketAnalyzer';
export type { TradeRecommendation } from './predictions/TradeRecommender';