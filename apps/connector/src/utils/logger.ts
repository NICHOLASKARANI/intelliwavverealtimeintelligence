// apps/connector/src/utils/logger.ts
import pino from 'pino';

export class Logger {
  private logger: pino.Logger;

  constructor(name: string) {
    this.logger = pino({
      name,
      level: process.env.LOG_LEVEL || 'info',
      transport: process.env.NODE_ENV === 'development' ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss.l',
          ignore: 'pid,hostname',
        },
      } : undefined,
    });
  }

  info(message: string, ...args: any[]): void {
    this.logger.info(args.length ? { args } : undefined, message);
  }

  warn(message: string, ...args: any[]): void {
    this.logger.warn(args.length ? { args } : undefined, message);
  }

  error(message: string, ...args: any[]): void {
    this.logger.error(args.length ? { args } : undefined, message);
  }

  debug(message: string, ...args: any[]): void {
    this.logger.debug(args.length ? { args } : undefined, message);
  }

  fatal(message: string, ...args: any[]): void {
    this.logger.fatal(args.length ? { args } : undefined, message);
  }
}