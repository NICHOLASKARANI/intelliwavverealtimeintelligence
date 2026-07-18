// apps/ai-engine/src/optimization/PortfolioOptimizer.ts
import { Logger } from '../utils/logger';
import { MathUtil } from '@intelliwave/shared';
import * as math from 'mathjs';

interface PortfolioAsset {
  symbol: string;
  allocation: number;
  expectedReturn: number;
  risk: number;
  sharpeRatio: number;
}

interface OptimizationResult {
  optimalAllocations: PortfolioAsset[];
  expectedReturn: number;
  expectedRisk: number;
  sharpeRatio: number;
  efficiency: number;
  diversification: number;
}

export class PortfolioOptimizer {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('PortfolioOptimizer');
  }

  async optimizePortfolio(
    assets: PortfolioAsset[],
    constraints: {
      minAllocation?: number;
      maxAllocation?: number;
      targetReturn?: number;
      maxRisk?: number;
    } = {},
  ): Promise<OptimizationResult> {
    this.logger.info(`Optimizing portfolio with ${assets.length} assets`);

    const n = assets.length;
    const returns = assets.map(a => a.expectedReturn);
    const risks = assets.map(a => a.risk);

    // Calculate correlation matrix (simplified)
    const correlationMatrix = this.calculateCorrelationMatrix(assets);

    // Calculate covariance matrix
    const covarianceMatrix = this.calculateCovarianceMatrix(risks, correlationMatrix);

    // Use Mean-Variance Optimization (Markowitz)
    const optimalWeights = this.meanVarianceOptimization(
      returns,
      covarianceMatrix,
      constraints,
    );

    // Calculate portfolio metrics
    const portfolioReturn = math.multiply(optimalWeights, returns) as number;
    const portfolioRisk = Math.sqrt(
      math.multiply(
        math.multiply(optimalWeights, covarianceMatrix),
        optimalWeights,
      ) as number,
    );

    const sharpeRatio = portfolioRisk > 0
      ? (portfolioReturn - 0.02) / portfolioRisk // Assuming 2% risk-free rate
      : 0;

    const diversification = this.calculateDiversification(optimalWeights);

    // Create optimized allocations
    const optimalAllocations = assets.map((asset, i) => ({
      ...asset,
      allocation: MathUtil.roundTo(optimalWeights[i] * 100, 2),
    }));

    return {
      optimalAllocations,
      expectedReturn: MathUtil.roundTo(portfolioReturn * 100, 2),
      expectedRisk: MathUtil.roundTo(portfolioRisk * 100, 2),
      sharpeRatio: MathUtil.roundTo(sharpeRatio, 2),
      efficiency: MathUtil.roundTo(portfolioReturn / (portfolioRisk || 0.001), 2),
      diversification: MathUtil.roundTo(diversification, 2),
    };
  }

  private calculateCorrelationMatrix(assets: PortfolioAsset[]): number[][] {
    const n = assets.length;
    const matrix: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === j) {
          matrix[i][j] = 1;
        } else {
          // Simplified correlation based on symbols
          const sameMarket = assets[i].symbol.split('_')[0] === assets[j].symbol.split('_')[0];
          matrix[i][j] = sameMarket ? 0.7 : 0.3;
        }
      }
    }

    return matrix;
  }

  private calculateCovarianceMatrix(risks: number[], correlations: number[][]): number[][] {
    const n = risks.length;
    const matrix: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        matrix[i][j] = risks[i] * risks[j] * correlations[i][j];
      }
    }

    return matrix;
  }

  private meanVarianceOptimization(
    returns: number[],
    covariance: number[][],
    constraints: any,
  ): number[] {
    const n = returns.length;
    
    // Start with equal weights
    let weights = Array(n).fill(1 / n);
    
    // Simple optimization using risk parity approach
    const riskContributions = weights.map((w, i) => {
      let contribution = 0;
      for (let j = 0; j < n; j++) {
        contribution += w * weights[j] * covariance[i][j];
      }
      return contribution;
    });

    const totalRisk = riskContributions.reduce((sum, rc) => sum + rc, 0);
    
    // Adjust weights to equalize risk contribution
    if (totalRisk > 0) {
      weights = riskContributions.map(rc => 1 / (rc / totalRisk));
      const weightSum = weights.reduce((sum, w) => sum + w, 0);
      weights = weights.map(w => w / weightSum);
    }

    // Apply constraints
    const minAlloc = constraints.minAllocation || 0;
    const maxAlloc = constraints.maxAllocation || 0.5;

    weights = weights.map(w => Math.max(minAlloc, Math.min(maxAlloc, w)));
    
    // Normalize weights
    const sum = weights.reduce((s, w) => s + w, 0);
    weights = weights.map(w => w / sum);

    return weights;
  }

  private calculateDiversification(weights: number[]): number {
    const n = weights.length;
    const equalWeight = 1 / n;
    
    // Herfindahl-Hirschman Index (HHI)
    const hhi = weights.reduce((sum, w) => sum + w * w, 0);
    
    // Normalize to 0-100 scale (lower HHI = more diversified)
    const diversification = ((1 - hhi) / (1 - equalWeight)) * 100;
    
    return Math.max(0, diversification);
  }

  async suggestRebalancing(
    currentAllocations: PortfolioAsset[],
    targetAllocations: PortfolioAsset[],
    threshold: number = 5, // 5% threshold
  ): Promise<{
    needsRebalancing: boolean;
    changes: { symbol: string; current: number; target: number; change: number }[];
  }> {
    const changes = currentAllocations.map((current, i) => {
      const target = targetAllocations[i].allocation;
      const change = target - current.allocation;
      return {
        symbol: current.symbol,
        current: current.allocation,
        target,
        change,
      };
    });

    const needsRebalancing = changes.some(c => Math.abs(c.change) > threshold);

    return {
      needsRebalancing,
      changes: changes.filter(c => Math.abs(c.change) > 0.01),
    };
  }

  calculateRiskContribution(allocations: PortfolioAsset[], covariance: number[][]): {
    symbol: string;
    riskContribution: number;
    percentContribution: number;
  }[] {
    const weights = allocations.map(a => a.allocation / 100);
    const total = weights.length;

    const contributions = weights.map((w, i) => {
      let contribution = 0;
      for (let j = 0; j < total; j++) {
        contribution += w * weights[j] * covariance[i][j];
      }
      return contribution;
    });

    const totalRisk = contributions.reduce((sum, c) => sum + c, 0);

    return allocations.map((asset, i) => ({
      symbol: asset.symbol,
      riskContribution: MathUtil.roundTo(contributions[i], 4),
      percentContribution: MathUtil.roundTo(
        totalRisk > 0 ? (contributions[i] / totalRisk) * 100 : 0,
        2,
      ),
    }));
  }
}