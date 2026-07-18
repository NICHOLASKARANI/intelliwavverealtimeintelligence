"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceInfo = void 0;
// apps/backend/src/modules/auth/decorators/device-info.decorator.ts
var common_1 = require("@nestjs/common");
exports.DeviceInfo = (0, common_1.createParamDecorator)(function (data, ctx) {
    var request = ctx.switchToHttp().getRequest();
    return {
        ip: request.ip,
        userAgent: request.headers['user-agent'],
        platform: request.headers['sec-ch-ua-platform'],
        mobile: request.headers['sec-ch-ua-mobile'],
    };
});
