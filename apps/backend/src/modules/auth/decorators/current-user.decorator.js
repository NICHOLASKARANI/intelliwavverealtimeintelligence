"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
// apps/backend/src/modules/auth/decorators/current-user.decorator.ts
var common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)(function (data, ctx) {
    var request = ctx.switchToHttp().getRequest();
    var user = request.user;
    if (data) {
        return user === null || user === void 0 ? void 0 : user[data];
    }
    return user;
});
