// apps/backend/src/modules/ai/ai.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { MarketAnalyzer, TradeRecommender, TradingAssistant, PortfolioOptimizer } from '@intelliwave/ai-engine';

@Injectable()
export class AIService {
  private analyzer: MarketAnalyzer;
  private recommender: TradeRecommender;
  private assistant: TradingAssistant;
  private optimizer: PortfolioOptimizer;
  private readonly logger = new Logger(AIService.name);

  constructor() {
    this.analyzer = new MarketAnalyzer();
    this.recommender = new TradeRecommender();
    this.assistant = new TradingAssistant();
    this.optimizer = new PortfolioOptimizer();
  }

  async analyzeMarket(symbol: string, data: any[]) {
    return this.analyzer.analyze(symbol, data);
  }

  async getRecommendation(symbol: string, data: any[], balance: number, riskProfile: any) {
    return this.recommender.getRecommendation(symbol, data, balance, riskProfile);
  }

  async processQuery(query: string, userId: string, context?: any) {
    return this.assistant.processQuery(query, userId, context);
  }

  async optimizePortfolio(assets: any[], constraints?: any) {
    return this.optimizer.optimizePortfolio(assets, constraints);
  }
}