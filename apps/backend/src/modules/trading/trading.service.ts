// apps/backend/src/modules/trading/trading.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@intelliwave/database';
import { DerivService } from '../deriv/deriv.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/trading.dto';
import { MathUtil } from '@intelliwave/shared';

@Injectable()
export class TradingService {
  private readonly logger = new Logger(TradingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly derivService: DerivService,
  ) {}

  async createOrder(userId: string, createOrderDto: CreateOrderDto) {
    // Validate trading account
    const account = await this.prisma.tradingAccount.findFirst({
      where: { id: createOrderDto.tradingAccountId, userId },
    });

    if (!account) {
      throw new NotFoundException('Trading account not found');
    }

    // Check risk limits
    await this.checkRiskLimits(userId, createOrderDto);

    // Create order in database
    const order = await this.prisma.order.create({
      data: {
        userId,
        tradingAccountId: createOrderDto.tradingAccountId,
        symbol: createOrderDto.symbol,
        type: createOrderDto.type,
        side: createOrderDto.side,
        quantity: createOrderDto.quantity,
        price: createOrderDto.price,
        stopPrice: createOrderDto.stopPrice,
        limitPrice: createOrderDto.limitPrice,
        timeInForce: createOrderDto.timeInForce || 'GTC',
        metadata: createOrderDto.metadata,
      },
    });

    // Execute market orders immediately
    if (createOrderDto.type === 'MARKET') {
      try {
        const tradeResult = await this.executeMarketOrder(userId, order);
        return { order, trade: tradeResult };
      } catch (error) {
        await this.prisma.order.update({
          where: { id: order.id },
          data: { status: 'REJECTED' },
        });
        throw error;
      }
    }

    return { order };
  }

  private async executeMarketOrder(userId: string, order: any) {
    // Call Deriv API to execute trade
    const tradeRequest = {
      symbol: order.symbol,
      contract_type: order.side === 'BUY' ? 'CALL' : 'PUT',
      amount: order.quantity,
      basis: 'stake',
      duration: 1,
      duration_unit: 't',
    };

    const result = await this.derivService.buyContract(userId, tradeRequest);

    // Update order status
    await this.prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'FILLED',
        derivOrderId: result.contract_id,
        filledQuantity: order.quantity,
        price: result.buy_price,
      },
    });

    // Create or update position
    const position = await this.createOrUpdatePosition(userId, order, result);

    // Create trade record
    const trade = await this.prisma.trade.create({
      data: {
        userId,
        orderId: order.id,
        positionId: position.id,
        symbol: order.symbol,
        side: order.side,
        quantity: order.quantity,
        price: result.buy_price,
        commission: 0,
      },
    });

    return { result, position, trade };
  }

  private async createOrUpdatePosition(userId: string, order: any, tradeResult: any) {
    const existingPosition = await this.prisma.position.findFirst({
      where: {
        userId,
        tradingAccountId: order.tradingAccountId,
        symbol: order.symbol,
        isOpen: true,
      },
    });

    if (existingPosition) {
      return this.prisma.position.update({
        where: { id: existingPosition.id },
        data: {
          quantity: existingPosition.quantity + order.quantity,
          currentPrice: tradeResult.buy_price,
          unrealizedPnL: 0,
        },
      });
    }

    return this.prisma.position.create({
      data: {
        userId,
        tradingAccountId: order.tradingAccountId,
        symbol: order.symbol,
        side: order.side,
        quantity: order.quantity,
        entryPrice: tradeResult.buy_price,
        currentPrice: tradeResult.buy_price,
        leverage: 100,
      },
    });
  }

  async getOrders(userId: string, filters?: any) {
    const where: any = { userId };

    if (filters?.status) {
      where.status = filters.status;
    }
    if (filters?.symbol) {
      where.symbol = filters.symbol;
    }
    if (filters?.startDate) {
      where.createdAt = { gte: new Date(filters.startDate) };
    }

    return this.prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: filters?.limit || 50,
      skip: filters?.offset || 0,
    });
  }

  async getOrderById(userId: string, orderId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
      include: {
        trades: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async cancelOrder(userId: string, orderId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId, status: 'OPEN' },
    });

    if (!order) {
      throw new NotFoundException('Open order not found');
    }

    await this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED' },
    });

    return { message: 'Order cancelled successfully' };
  }

  async getPositions(userId: string) {
    return this.prisma.position.findMany({
      where: { userId, isOpen: true },
      include: {
        tradingAccount: true,
      },
      orderBy: { openedAt: 'desc' },
    });
  }

  async closePosition(userId: string, positionId: string) {
    const position = await this.prisma.position.findFirst({
      where: { id: positionId, userId, isOpen: true },
    });

    if (!position) {
      throw new NotFoundException('Open position not found');
    }

    // Call Deriv to close position
    try {
      const result = await this.derivService.sellContract(
        userId,
        positionId,
        position.currentPrice,
      );

      // Update position
      const pnl = (position.currentPrice - position.entryPrice) * position.quantity;
      
      await this.prisma.position.update({
        where: { id: positionId },
        data: {
          isOpen: false,
          closedAt: new Date(),
          realizedPnL: pnl,
        },
      });

      return { position, pnl, result };
    } catch (error) {
      this.logger.error(`Failed to close position: ${error.message}`);
      throw new BadRequestException('Failed to close position');
    }
  }

  async getTradeHistory(userId: string, filters?: any) {
    const where: any = { userId };

    if (filters?.symbol) {
      where.symbol = filters.symbol;
    }
    if (filters?.startDate && filters?.endDate) {
      where.timestamp = {
        gte: new Date(filters.startDate),
        lte: new Date(filters.endDate),
      };
    }

    return this.prisma.trade.findMany({
      where,
      orderBy: { timestamp: 'desc' },
      take: filters?.limit || 100,
      skip: filters?.offset || 0,
    });
  }

  private async checkRiskLimits(userId: string, order: CreateOrderDto) {
    // Get user's risk profile
    const riskProfiles = await this.prisma.riskProfile.findMany({
      where: { userId },
    });

    if (riskProfiles.length === 0) return;

    const profile = riskProfiles[0]; // Use default profile

    // Check max positions
    const openPositions = await this.prisma.position.count({
      where: { userId, isOpen: true },
    });

    if (openPositions >= profile.maxPositions) {
      throw new BadRequestException(
        `Maximum positions (${profile.maxPositions}) reached`,
      );
    }

    // Check daily loss limit
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayTrades = await this.prisma.trade.findMany({
      where: {
        userId,
        timestamp: { gte: todayStart },
      },
    });

    const todayPnL = todayTrades.reduce((sum, trade) => sum + Number(trade.pnl), 0);
    const dailyLossLimit = (profile.dailyLossLimit / 100) * 10000; // Assume $10k account

    if (todayPnL < -dailyLossLimit) {
      throw new BadRequestException(
        `Daily loss limit of $${dailyLossLimit} reached`,
      );
    }
  }
}