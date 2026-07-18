// apps/backend/src/modules/auth/guards/admin.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    // Check if user has admin role
    const allowedRoles = ['SUPER_ADMIN', 'ADMIN'];
    if (!allowedRoles.includes(user.role)) {
      throw new ForbiddenException('Admin access required');
    }

    // Additional IP check for super admin
    if (user.role === 'SUPER_ADMIN') {
      const allowedIPs = process.env.ADMIN_ALLOWED_IPS?.split(',') || [];
      const clientIP = request.ip;
      
      if (allowedIPs.length > 0 && !allowedIPs.includes(clientIP)) {
        throw new ForbiddenException('Access restricted to specific IP addresses');
      }
    }

    return true;
  }
}
