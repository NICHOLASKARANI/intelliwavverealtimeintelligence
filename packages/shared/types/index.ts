// packages/shared/types/index.ts
export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: UserRole;
  status: AccountStatus;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR' | 'PREMIUM_USER' | 'USER' | 'FREE_USER';
export type AccountStatus = 'ACTIVE' | 'SUSPENDED' | 'BANNED' | 'PENDING_VERIFICATION' | 'DELETED';

export interface LoginRequest {
  email: string;
  password: string;
  twoFactorCode?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface TradeOrder {
  symbol: string;
  type: OrderType;
  side: OrderSide;
  quantity: number;
  price?: number;
  stopPrice?: number;
  limitPrice?: number;
  timeInForce?: TimeInForce;
}

export type OrderType = 'MARKET' | 'LIMIT' | 'STOP' | 'STOP_LIMIT' | 'TRAILING_STOP';
export type OrderSide = 'BUY' | 'SELL';
export type TimeInForce = 'GTC' | 'IOC' | 'FOK' | 'DAY';

export interface BotConfig {
  strategyId: string;
  tradingAccountId: string;
  riskProfileId?: string;
  capital: number;
  maxDrawdown: number;
  dailyLossLimit: number;
  maxPositions: number;
  takeProfit?: number;
  stopLoss?: number;
  parameters: Record<string, any>;
}

export interface MarketData {
  symbol: string;
  price: number;
  bid: number;
  ask: number;
  spread: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  volume: number;
  timestamp: number;
}

export interface AIPrediction {
  symbol: string;
  timeframe: string;
  prediction: string;
  confidence: number;
  direction: 'BUY' | 'SELL' | 'HOLD';
  entryPrice?: number;
  targetPrice?: number;
  stopLoss?: number;
  reasoning?: string;
}

export interface WebSocketEvent {
  type: string;
  payload: any;
  timestamp: string;
}