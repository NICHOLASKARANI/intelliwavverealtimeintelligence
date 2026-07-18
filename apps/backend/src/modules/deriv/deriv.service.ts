// apps/backend/src/modules/deriv/deriv.service.ts
import { Injectable, Inject, Logger } from '@nestjs/common';
import { DerivConnector } from '@intelliwave/connector';

@Injectable()
export class DerivService {
  private readonly logger = new Logger(DerivService.name);

  constructor(
    @Inject('DERIV_CONNECTOR') private readonly connector: DerivConnector,
  ) {}

  async addUserConnection(userId: string, apiToken: string, appId: string, accountType: 'real' | 'demo') {
    const connectionId = `${userId}_${accountType}`;
    
    return this.connector.addConnection({
      id: connectionId,
      userId,
      apiToken,
      appId,
      accountType,
    });
  }

  async removeUserConnection(userId: string, accountType: string) {
    const connectionId = `${userId}_${accountType}`;
    return this.connector.removeConnection(connectionId);
  }

  async getUserBalance(userId: string) {
    const connectionId = `${userId}_real`;
    return this.connector.getBalance(connectionId);
  }

  async getUserPortfolio(userId: string) {
    const connectionId = `${userId}_real`;
    return this.connector.getPortfolio(connectionId);
  }

  async getActiveSymbols(userId: string) {
    const connectionId = `${userId}_real`;
    return this.connector.getActiveSymbols(connectionId);
  }

  async subscribeTicks(userId: string, symbol: string, callback: (tick: any) => void) {
    const connectionId = `${userId}_real`;
    return this.connector.subscribeTicks(connectionId, symbol, callback);
  }

  async buyContract(userId: string, request: any) {
    const connectionId = `${userId}_real`;
    return this.connector.buyContract(connectionId, request);
  }

  async sellContract(userId: string, contractId: string, price: number) {
    const connectionId = `${userId}_real`;
    return this.connector.sellContract(connectionId, contractId, price);
  }

  async getCandles(userId: string, symbol: string, granularity: number, count?: number) {
    const connectionId = `${userId}_real`;
    return this.connector.getCandles(connectionId, symbol, granularity, count);
  }
}