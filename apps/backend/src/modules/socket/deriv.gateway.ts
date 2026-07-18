// apps/backend/src/modules/socket/deriv.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards, Logger } from '@nestjs/common';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';
import { DerivService } from '../deriv/deriv.service';

@WebSocketGateway({
  namespace: '/deriv',
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class DerivGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(DerivGateway.name);
  private userSockets: Map<string, Set<string>> = new Map();
  private subscriptions: Map<string, any> = new Map();

  constructor(private readonly derivService: DerivService) {}

  async handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    
    try {
      // Authenticate WebSocket connection
      const token = client.handshake.auth.token;
      if (!token) {
        client.disconnect();
        return;
      }

      // Verify token (implement JWT verification)
      // const user = await this.verifyToken(token);
      
      client.emit('connected', { message: 'Connected to Deriv stream' });
    } catch (error) {
      this.logger.error(`Connection error: ${error.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    
    // Clean up subscriptions
    for (const [userId, sockets] of this.userSockets.entries()) {
      sockets.delete(client.id);
      if (sockets.size === 0) {
        this.userSockets.delete(userId);
        this.cleanupSubscriptions(userId);
      }
    }
  }

  @SubscribeMessage('subscribe:ticks')
  async handleSubscribeTicks(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { symbol: string; userId: string },
  ) {
    try {
      const subscriptionId = await this.derivService.subscribeTicks(
        data.userId,
        data.symbol,
        (tick) => {
          client.emit('tick', { symbol: data.symbol, data: tick });
        },
      );

      // Store subscription
      const key = `${data.userId}:ticks:${data.symbol}`;
      this.subscriptions.set(key, subscriptionId);

      return { success: true, subscriptionId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('unsubscribe:ticks')
  async handleUnsubscribeTicks(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { symbol: string; userId: string },
  ) {
    const key = `${data.userId}:ticks:${data.symbol}`;
    const subscriptionId = this.subscriptions.get(key);
    
    if (subscriptionId) {
      // Unsubscribe logic
      this.subscriptions.delete(key);
    }

    return { success: true };
  }

  private async cleanupSubscriptions(userId: string) {
    // Clean up all subscriptions for user
    for (const [key, subscriptionId] of this.subscriptions.entries()) {
      if (key.startsWith(userId)) {
        // Unsubscribe
        this.subscriptions.delete(key);
      }
    }
  }
}