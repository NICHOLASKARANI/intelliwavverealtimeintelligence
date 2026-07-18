// apps/backend/src/modules/auth/decorators/device-info.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const DeviceInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return {
      ip: request.ip,
      userAgent: request.headers['user-agent'],
      platform: request.headers['sec-ch-ua-platform'],
      mobile: request.headers['sec-ch-ua-mobile'],
    };
  },
);