// apps/ai-engine/src/nlp/TradingAssistant.ts
import { Logger } from '../utils/logger';
import { MarketAnalyzer } from '../analysis/MarketAnalyzer';
import { TradeRecommender } from '../predictions/TradeRecommender';
import natural from 'natural';

interface NLPQuery {
  intent: string;
  symbol?: string;
  timeframe?: string;
  action?: string;
  parameters: Record<string, any>;
}

interface AssistantResponse {
  answer: string;
  confidence: number;
  recommendations?: any[];
  marketData?: any;
  actions?: string[];
}

export class TradingAssistant {
  private analyzer: MarketAnalyzer;
  private recommender: TradeRecommender;
  private tokenizer: natural.WordTokenizer;
  private classifier: natural.BayesClassifier;
  private logger: Logger;

  constructor() {
    this.analyzer = new MarketAnalyzer();
    this.recommender = new TradeRecommender();
    this.tokenizer = new natural.WordTokenizer();
    this.classifier = new natural.BayesClassifier();
    this.logger = new Logger('TradingAssistant');
    
    this.trainClassifier();
  }

  private trainClassifier(): void {
    // Train intent classifier
    this.classifier.addDocument('should I buy', 'trade_recommendation');
    this.classifier.addDocument('is it good to sell', 'trade_recommendation');
    this.classifier.addDocument('what is the trend', 'market_analysis');
    this.classifier.addDocument('analyze market', 'market_analysis');
    this.classifier.addDocument('show me performance', 'performance');
    this.classifier.addDocument('what is my profit', 'performance');
    this.classifier.addDocument('what is RSI', 'indicator_query');
    this.classifier.addDocument('explain MACD', 'indicator_query');
    this.classifier.addDocument('best strategy for', 'strategy_advice');
    this.classifier.addDocument('how to trade', 'strategy_advice');
    this.classifier.addDocument('risk management', 'risk_advice');
    this.classifier.addDocument('stop loss', 'risk_advice');
    this.classifier.addDocument('market news', 'market_news');
    this.classifier.addDocument('what happened', 'market_news');
    
    this.classifier.train();
  }

  async processQuery(
    query: string,
    userId: string,
    context?: any,
  ): Promise<AssistantResponse> {
    this.logger.info(`Processing query: "${query}"`);

    // Parse query
    const nlpQuery = this.parseQuery(query);
    
    // Classify intent
    const intent = this.classifier.classify(query);
    nlpQuery.intent = intent;

    // Extract entities
    const entities = this.extractEntities(query);
    
    // Generate response based on intent
    switch (intent) {
      case 'trade_recommendation':
        return this.handleTradeRecommendation(nlpQuery, context);
      case 'market_analysis':
        return this.handleMarketAnalysis(nlpQuery, context);
      case 'performance':
        return this.handlePerformanceQuery(userId, context);
      case 'indicator_query':
        return this.handleIndicatorQuery(query);
      case 'strategy_advice':
        return this.handleStrategyAdvice(nlpQuery, context);
      case 'risk_advice':
        return this.handleRiskAdvice(userId, context);
      default:
        return this.handleGeneralQuery(query);
    }
  }

  private parseQuery(query: string): NLPQuery {
    const tokens = this.tokenizer.tokenize(query.toLowerCase());
    
    const nlpQuery: NLPQuery = {
      intent: 'general',
      parameters: {},
    };

    // Extract symbol
    const symbols = ['volatility 75', 'volatility 100', 'boom 300', 'crash 300', 'jump 10', 'step index'];
    symbols.forEach(symbol => {
      if (query.toLowerCase().includes(symbol.toLowerCase())) {
        nlpQuery.symbol = symbol.toUpperCase().replace(' ', '_');
      }
    });

    // Extract timeframe
    if (query.includes('1 minute') || query.includes('1m')) nlpQuery.timeframe = '1m';
    else if (query.includes('5 minute') || query.includes('5m')) nlpQuery.timeframe = '5m';
    else if (query.includes('15 minute') || query.includes('15m')) nlpQuery.timeframe = '15m';
    else if (query.includes('1 hour') || query.includes('1h')) nlpQuery.timeframe = '1h';
    else if (query.includes('4 hour') || query.includes('4h')) nlpQuery.timeframe = '4h';
    else if (query.includes('daily') || query.includes('1 day')) nlpQuery.timeframe = '1d';

    // Extract action
    if (query.includes('buy') || query.includes('long')) nlpQuery.action = 'BUY';
    else if (query.includes('sell') || query.includes('short')) nlpQuery.action = 'SELL';

    return nlpQuery;
  }

  private extractEntities(query: string): Record<string, string> {
    const entities: Record<string, string> = {};
    
    // Price levels
    const priceMatch = query.match(/\$?(\d+\.?\d*)/);
    if (priceMatch) entities.price = priceMatch[1];

    // Percentages
    const percentMatch = query.match(/(\d+)%/);
    if (percentMatch) entities.percentage = percentMatch[1];

    return entities;
  }

  private async handleTradeRecommendation(
    query: NLPQuery,
    context?: any,
  ): Promise<AssistantResponse> {
    const symbol = query.symbol || 'VOLATILITY_75_INDEX';
    const timeframe = query.timeframe || '1h';

    try {
      // Get market data (mock for now)
      const marketData = await this.getMarketData(symbol, timeframe);
      
      // Get recommendation
      const recommendation = await this.recommender.getRecommendation(
        symbol,
        marketData,
        10000, // Default balance
        { riskPerTrade: 2 },
      );

      const answer = this.generateTradeResponse(recommendation, query.action);

      return {
        answer,
        confidence: recommendation.confidence,
        recommendations: [recommendation],
        actions: recommendation.action !== 'HOLD' ? [
          `Set stop loss at ${recommendation.stopLoss}`,
          `Set take profit at ${recommendation.takeProfit}`,
          `Suggested position size: ${recommendation.suggestedPositionSize}`,
        ] : [],
      };
    } catch (error) {
      return {
        answer: `I couldn't analyze ${symbol} right now. Please try again later.`,
        confidence: 0,
      };
    }
  }

  private generateTradeResponse(recommendation: TradeRecommendation, userAction?: string): string {
    let response = `Based on my analysis of ${recommendation.symbol}, `;

    switch (recommendation.action) {
      case 'BUY':
        response += `I recommend a BUY at ${recommendation.entryPrice}. `;
        response += `The market shows ${recommendation.confidence}% confidence for this trade. `;
        response += recommendation.reasoning.slice(0, 2).join('. ') + '.';
        break;
      case 'SELL':
        response += `I recommend a SELL at ${recommendation.entryPrice}. `;
        response += `The market shows ${recommendation.confidence}% confidence for this trade. `;
        response += recommendation.reasoning.slice(0, 2).join('. ') + '.';
        break;
      default:
        response += `I suggest HOLDING for now. `;
        response += recommendation.reasoning[0] + '. ';
        response += `Wait for clearer signals before entering a trade.`;
    }

    if (recommendation.aiInsights.length > 0) {
      response += `\n\n💡 ${recommendation.aiInsights[0]}`;
    }

    return response;
  }

  private async handleMarketAnalysis(
    query: NLPQuery,
    context?: any,
  ): Promise<AssistantResponse> {
    const symbol = query.symbol || 'VOLATILITY_75_INDEX';

    try {
      const marketData = await this.getMarketData(symbol);
      const analysis = await this.analyzer.analyze(symbol, marketData);

      const answer = `📊 Market Analysis for ${symbol}:\n\n` +
        `• Trend: ${analysis.trend.direction} (${analysis.trend.strength}% strength)\n` +
        `• RSI: ${analysis.momentum.rsi} (${analysis.momentum.rsi > 70 ? 'Overbought' : analysis.momentum.rsi < 30 ? 'Oversold' : 'Neutral'})\n` +
        `• Volatility: ${analysis.volatility.riskLevel}\n` +
        `• Patterns: ${analysis.patterns.map(p => p.pattern.replace('_', ' ')).join(', ') || 'None detected'}\n\n` +
        `${analysis.summary}`;

      return {
        answer,
        confidence: analysis.confidence,
        marketData: analysis,
      };
    } catch (error) {
      return {
        answer: `I couldn't analyze ${symbol} at the moment. Please try again.`,
        confidence: 0,
      };
    }
  }

  private async handlePerformanceQuery(
    userId: string,
    context?: any,
  ): Promise<AssistantResponse> {
    // In production, fetch from database
    const performance = {
      totalReturn: 15.5,
      winRate: 68,
      totalTrades: 150,
      bestTrade: 250,
      worstTrade: -75,
    };

    const answer = `📈 Your Trading Performance:\n\n` +
      `• Total Return: +${performance.totalReturn}%\n` +
      `• Win Rate: ${performance.winRate}%\n` +
      `• Total Trades: ${performance.totalTrades}\n` +
      `• Best Trade: +$${performance.bestTrade}\n` +
      `• Worst Trade: -$${Math.abs(performance.worstTrade)}\n\n` +
      `You're doing well! Keep up the good risk management.`;

    return { answer, confidence: 100 };
  }

  private async handleIndicatorQuery(query: string): Promise<AssistantResponse> {
    const indicatorExplanations: Record<string, string> = {
      rsi: 'RSI (Relative Strength Index) measures the speed and change of price movements. Values above 70 indicate overbought conditions, below 30 indicate oversold.',
      macd: 'MACD (Moving Average Convergence Divergence) shows the relationship between two moving averages. Buy when MACD crosses above signal line, sell when below.',
      bollinger: 'Bollinger Bands consist of a middle band (SMA) and two outer bands (standard deviations). Price touching lower band suggests oversold, upper band suggests overbought.',
      adx: 'ADX (Average Directional Index) measures trend strength. Values above 25 indicate a strong trend, below 20 suggest a weak or ranging market.',
      atr: 'ATR (Average True Range) measures market volatility. Higher ATR = higher volatility. Use ATR multiples for stop loss placement.',
    };

    for (const [indicator, explanation] of Object.entries(indicatorExplanations)) {
      if (query.toLowerCase().includes(indicator)) {
        return {
          answer: `📊 ${explanation}`,
          confidence: 95,
        };
      }
    }

    return {
      answer: 'I can explain various technical indicators. Try asking about RSI, MACD, Bollinger Bands, ADX, or ATR.',
      confidence: 80,
    };
  }

  private async handleStrategyAdvice(
    query: NLPQuery,
    context?: any,
  ): Promise<AssistantResponse> {
    const volatility = query.symbol?.includes('VOLATILITY');
    
    let answer = '🎯 Strategy Recommendation:\n\n';

    if (volatility) {
      answer += 'For Volatility Indices, I recommend:\n' +
        '• Use shorter timeframes (1m-5m)\n' +
        '• Implement strict stop losses (1-2%)\n' +
        '• Consider RSI-based mean reversion strategies\n' +
        '• Keep position sizes small due to high volatility\n' +
        '• Use ATR for dynamic stop placement';
    } else {
      answer += 'For this market, consider:\n' +
        '• Trend following on higher timeframes\n' +
        '• Use multiple timeframe analysis\n' +
        '• Implement trailing stops to protect profits\n' +
        '• Consider MA crossover strategies\n' +
        '• Maintain 1:2 risk-reward ratio minimum';
    }

    return { answer, confidence: 75 };
  }

  private async handleRiskAdvice(
    userId: string,
    context?: any,
  ): Promise<AssistantResponse> {
    const answer = '🛡️ Risk Management Guidelines:\n\n' +
      '1. Never risk more than 2% per trade\n' +
      '2. Set daily loss limit (e.g., 5% of account)\n' +
      '3. Use proper position sizing:\n' +
      '   Position Size = (Account × Risk %) ÷ Stop Loss Distance\n' +
      '4. Maintain minimum 1:2 risk-reward ratio\n' +
      '5. Don\'t trade more than 5 positions simultaneously\n' +
      '6. Use stop losses on EVERY trade\n' +
      '7. Take regular breaks after losses\n\n' +
      'Remember: Capital preservation is key to long-term success!';

    return { answer, confidence: 100 };
  }

  private async handleGeneralQuery(query: string): Promise<AssistantResponse> {
    const generalResponses = [
      "I'm your AI trading assistant. I can help with market analysis, trade recommendations, strategy advice, and risk management.",
      "You can ask me questions like:\n• Should I buy Volatility 75?\n• What's the market trend?\n• Explain RSI\n• How's my performance?\n• What strategy should I use?",
    ];

    return {
      answer: generalResponses[Math.floor(Math.random() * generalResponses.length)],
      confidence: 90,
    };
  }

  private async getMarketData(symbol: string, timeframe: string = '1h'): Promise<any[]> {
    // Mock market data - In production, fetch from Deriv API
    const basePrice = symbol.includes('VOLATILITY') ? 1000 : 100;
    const data = [];
    
    for (let i = 0; i < 100; i++) {
      const volatility = Math.random() * 20 - 10;
      const price = basePrice + volatility * 10;
      data.push({
        timestamp: Date.now() - (100 - i) * 3600000,
        open: price - 2,
        high: price + 5,
        low: price - 5,
        close: price,
        volume: Math.random() * 1000,
      });
    }

    return data;
  }
}