// apps/connector/src/deriv/DerivWebSocket.ts
import WebSocket from 'ws';
import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '../utils/logger';

export interface WebSocketConfig {
  url: string;
  appId: string;
  token?: string;
  language?: string;
  brand?: string;
  reconnectDelay?: number;
  maxReconnectAttempts?: number;
  pingInterval?: number;
  pongTimeout?: number;
}

export interface DerivRequest {
  [key: string]: any;
}

export interface DerivResponse {
  echo_req: any;
  msg_type: string;
  error?: {
    code: string;
    message: string;
  };
  [key: string]: any;
}

export class DerivWebSocket extends EventEmitter {
  private ws: WebSocket | null = null;
  private config: Required<WebSocketConfig>;
  private reconnectAttempts = 0;
  private isConnected = false;
  private isConnecting = false;
  private pingTimer: NodeJS.Timeout | null = null;
  private pongTimer: NodeJS.Timeout | null = null;
  private requestQueue: Map<string, { 
    resolve: (value: any) => void; 
    reject: (reason: any) => void;
    timer: NodeJS.Timeout;
    request: DerivRequest;
  }> = new Map();
  private subscriptionMap: Map<string, Set<string>> = new Map();
  private logger: Logger;
  private readonly requestTimeout = 30000; // 30 seconds

  constructor(config: WebSocketConfig) {
    super();
    this.config = {
      language: 'EN',
      brand: 'intelliwave',
      reconnectDelay: 1000,
      maxReconnectAttempts: 10,
      pingInterval: 30000,
      pongTimeout: 10000,
      ...config,
    };
    this.logger = new Logger('DerivWebSocket');
  }

  async connect(): Promise<void> {
    if (this.isConnected || this.isConnecting) {
      return;
    }

    this.isConnecting = true;
    this.logger.info('Connecting to Deriv WebSocket...');

    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.config.url, {
          headers: {
            'User-Agent': 'IntelliWave-ITIS/1.0',
          },
        });

        this.ws.on('open', () => {
          this.logger.info('WebSocket connection established');
          this.isConnected = true;
          this.isConnecting = false;
          this.reconnectAttempts = 0;
          this.startPingPong();
          this.emit('connected');
          resolve();
        });

        this.ws.on('message', (data: WebSocket.Data) => {
          this.handleMessage(data);
        });

        this.ws.on('error', (error: Error) => {
          this.logger.error('WebSocket error:', error);
          this.emit('error', error);
          if (this.isConnecting) {
            reject(error);
          }
        });

        this.ws.on('close', (code: number, reason: Buffer) => {
          this.logger.warn(`WebSocket closed: ${code} - ${reason.toString()}`);
          this.handleDisconnect();
          if (this.isConnecting) {
            reject(new Error(`Connection closed: ${reason.toString()}`));
          }
        });

        this.ws.on('ping', () => {
          this.ws?.pong();
        });

      } catch (error) {
        this.isConnecting = false;
        this.logger.error('Failed to create WebSocket:', error);
        reject(error);
      }
    });
  }

  async disconnect(): Promise<void> {
    this.stopPingPong();
    this.clearRequestQueue();
    this.subscriptionMap.clear();
    
    if (this.ws) {
      this.ws.removeAllListeners();
      this.ws.close();
      this.ws = null;
    }
    
    this.isConnected = false;
    this.isConnecting = false;
    this.emit('disconnected');
    this.logger.info('Disconnected from Deriv WebSocket');
  }

  async send(request: DerivRequest, timeout: number = this.requestTimeout): Promise<DerivResponse> {
    if (!this.isConnected || !this.ws) {
      await this.connect();
    }

    return new Promise((resolve, reject) => {
      const requestId = request.req_id || uuidv4();
      
      // Add required fields
      const fullRequest = {
        ...request,
        req_id: requestId,
        app_id: this.config.appId,
        passthrough: {
          ...request.passthrough,
          timestamp: Date.now(),
        },
      };

      // Set timeout
      const timer = setTimeout(() => {
        this.requestQueue.delete(requestId);
        reject(new Error(`Request timeout for ${request.msg_type || 'unknown'} request`));
      }, timeout);

      // Store in queue
      this.requestQueue.set(requestId, {
        resolve,
        reject,
        timer,
        request: fullRequest,
      });

      // Send request
      try {
        const message = JSON.stringify(fullRequest);
        this.ws!.send(message);
        this.logger.debug(`Sent request: ${request.msg_type || 'unknown'}`, { requestId });
      } catch (error) {
        clearTimeout(timer);
        this.requestQueue.delete(requestId);
        reject(error);
      }
    });
  }

  async subscribe(request: DerivRequest): Promise<DerivResponse> {
    const subscriptionId = request.subscribe || request.subscription_id || uuidv4();
    
    // Track subscription
    if (request.subscribe) {
      const key = `${request.subscribe}_${request.ticks || 'all'}`;
      if (!this.subscriptionMap.has(key)) {
        this.subscriptionMap.set(key, new Set());
      }
      this.subscriptionMap.get(key)!.add(subscriptionId);
    }

    // Add subscription ID
    const subscribeRequest = {
      ...request,
      subscription_id: subscriptionId,
      subscribe: request.subscribe || 1,
    };

    return this.send(subscribeRequest);
  }

  async unsubscribe(subscriptionId: string): Promise<void> {
    const request = {
      forget: subscriptionId,
    };

    try {
      await this.send(request);
      
      // Remove from subscription map
      for (const [key, ids] of this.subscriptionMap.entries()) {
        if (ids.has(subscriptionId)) {
          ids.delete(subscriptionId);
          if (ids.size === 0) {
            this.subscriptionMap.delete(key);
          }
          break;
        }
      }
    } catch (error) {
      this.logger.error(`Failed to unsubscribe ${subscriptionId}:`, error);
    }
  }

  private handleMessage(data: WebSocket.Data): void {
    try {
      const message: DerivResponse = JSON.parse(data.toString());
      const requestId = message.echo_req?.req_id;

      this.logger.debug(`Received message: ${message.msg_type}`, { requestId });

      // Handle error messages
      if (message.error) {
        const errorInfo = this.requestQueue.get(requestId);
        if (errorInfo) {
          clearTimeout(errorInfo.timer);
          this.requestQueue.delete(requestId);
          errorInfo.reject(new Error(message.error.message));
        }
        this.emit('error', message.error);
        return;
      }

      // Handle request responses
      if (requestId && this.requestQueue.has(requestId)) {
        const pending = this.requestQueue.get(requestId)!;
        clearTimeout(pending.timer);
        this.requestQueue.delete(requestId);
        pending.resolve(message);
        return;
      }

      // Handle subscription updates
      const subscriptionId = message.subscription?.id;
      if (subscriptionId) {
        this.emit('subscription', message);
        this.emit(`subscription:${subscriptionId}`, message);
        return;
      }

      // Handle general messages
      this.emit('message', message);
      this.emit(message.msg_type, message);

    } catch (error) {
      this.logger.error('Failed to parse message:', error);
    }
  }

  private async handleDisconnect(): Promise<void> {
    this.isConnected = false;
    this.stopPingPong();
    this.clearRequestQueue();
    this.emit('disconnected');

    // Auto reconnect
    if (this.reconnectAttempts < this.config.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.config.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      
      this.logger.info(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.config.maxReconnectAttempts})`);
      
      setTimeout(async () => {
        try {
          await this.connect();
          await this.resubscribe();
        } catch (error) {
          this.logger.error('Reconnection failed:', error);
        }
      }, delay);
    } else {
      this.logger.error('Max reconnection attempts reached');
      this.emit('max_reconnect_attempts');
    }
  }

  private async resubscribe(): Promise<void> {
    this.logger.info('Resubscribing to channels...');
    
    for (const [key, ids] of this.subscriptionMap.entries()) {
      const [type, symbol] = key.split('_');
      
      try {
        switch (type) {
          case 'ticks':
            await this.subscribe({ ticks: symbol });
            break;
          case 'candles':
            await this.subscribe({ candles: symbol });
            break;
          case 'proposal':
            await this.subscribe({ proposal: 1 });
            break;
        }
        this.logger.debug(`Resubscribed to ${key}`);
      } catch (error) {
        this.logger.error(`Failed to resubscribe to ${key}:`, error);
      }
    }
  }

  private startPingPong(): void {
    this.pingTimer = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.ping();
        
        // Set pong timeout
        this.pongTimer = setTimeout(() => {
          this.logger.warn('Pong not received, reconnecting...');
          this.ws?.terminate();
        }, this.config.pongTimeout);
      }
    }, this.config.pingInterval);

    this.ws?.on('pong', () => {
      if (this.pongTimer) {
        clearTimeout(this.pongTimer);
        this.pongTimer = null;
      }
    });
  }

  private stopPingPong(): void {
    if (this.pingTimer) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
    if (this.pongTimer) {
      clearTimeout(this.pongTimer);
      this.pongTimer = null;
    }
  }

  private clearRequestQueue(): void {
    for (const [requestId, pending] of this.requestQueue.entries()) {
      clearTimeout(pending.timer);
      pending.reject(new Error('WebSocket disconnected'));
      this.requestQueue.delete(requestId);
    }
  }

  get connected(): boolean {
    return this.isConnected;
  }

  get activeSubscriptions(): string[] {
    return Array.from(this.subscriptionMap.keys());
  }
}