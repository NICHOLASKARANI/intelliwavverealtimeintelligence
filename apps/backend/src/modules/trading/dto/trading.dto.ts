export class CreateOrderDto {
  symbol: string;
  type: string;
  side: string;
  tradingAccountId: string;
  quantity: number;
  price?: number;
  stopPrice?: number;
  limitPrice?: number;
  timeInForce?: string;
  metadata?: Record<string, any>;
}

export class UpdateOrderDto {
  status?: string;
  price?: number;
}
