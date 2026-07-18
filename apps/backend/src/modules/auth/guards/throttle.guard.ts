// apps/backend/src/modules/auth/guards/throttle.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard implements CanActivate {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    // Use IP address and endpoint for rate limiting
    return `${req.ip}-${req.route?.path || req.url}`;
  }

  protected async getLimit(context: ExecutionContext): Promise<number> {
    const request = context.switchToHttp().getRequest();
    const path = request.route?.path || request.url;

    // Custom limits based on endpoint
    if (path.includes('/auth/login')) {
      return 5; // 5 requests per minute for login
    }
    if (path.includes('/auth/register')) {
      return 3; // 3 requests per minute for registration
    }
    if (path.includes('/auth/forgot-password')) {
      return 2; // 2 requests per minute for password reset
    }

    return 30; // Default: 30 requests per minute
  }
}