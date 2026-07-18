"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
// apps/backend/src/modules/admin/admin.controller.ts
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
var roles_guard_1 = require("../auth/guards/roles.guard");
var roles_decorator_1 = require("../auth/decorators/roles.decorator");
var AdminController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Admin'), (0, common_1.Controller)('admin'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN'), (0, swagger_1.ApiBearerAuth)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getSystemStats_decorators;
    var _getUsers_decorators;
    var _getUserDetails_decorators;
    var _updateUserStatus_decorators;
    var _updateUserRole_decorators;
    var _getRevenueAnalytics_decorators;
    var _getTradingAnalytics_decorators;
    var _getBotAnalytics_decorators;
    var _getAuditLogs_decorators;
    var _getSystemHealth_decorators;
    var _getFeatureFlags_decorators;
    var _updateFeatureFlag_decorators;
    var _getSupportTickets_decorators;
    var _resolveTicket_decorators;
    var AdminController = _classThis = /** @class */ (function () {
        function AdminController_1(adminService) {
            this.adminService = (__runInitializers(this, _instanceExtraInitializers), adminService);
        }
        AdminController_1.prototype.getSystemStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getSystemStats()];
                });
            });
        };
        AdminController_1.prototype.getUsers = function (status, role, search, limit, offset) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getUsers({ status: status, role: role, search: search, limit: limit, offset: offset })];
                });
            });
        };
        AdminController_1.prototype.getUserDetails = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getUserDetails(id)];
                });
            });
        };
        AdminController_1.prototype.updateUserStatus = function (id, status) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.updateUserStatus(id, status)];
                });
            });
        };
        AdminController_1.prototype.updateUserRole = function (id, role) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.updateUserRole(id, role)];
                });
            });
        };
        AdminController_1.prototype.getRevenueAnalytics = function (period) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getRevenueAnalytics(period)];
                });
            });
        };
        AdminController_1.prototype.getTradingAnalytics = function (period) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getTradingAnalytics(period)];
                });
            });
        };
        AdminController_1.prototype.getBotAnalytics = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getBotAnalytics()];
                });
            });
        };
        AdminController_1.prototype.getAuditLogs = function (userId, action, startDate, limit, offset) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getAuditLogs({ userId: userId, action: action, startDate: startDate, limit: limit, offset: offset })];
                });
            });
        };
        AdminController_1.prototype.getSystemHealth = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getSystemHealth()];
                });
            });
        };
        AdminController_1.prototype.getFeatureFlags = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getFeatureFlags()];
                });
            });
        };
        AdminController_1.prototype.updateFeatureFlag = function (flag, value) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.updateFeatureFlag(flag, value)];
                });
            });
        };
        AdminController_1.prototype.getSupportTickets = function (status, priority, limit, offset) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.getSupportTickets({ status: status, priority: priority, limit: limit, offset: offset })];
                });
            });
        };
        AdminController_1.prototype.resolveTicket = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminService.resolveTicket(id)];
                });
            });
        };
        return AdminController_1;
    }());
    __setFunctionName(_classThis, "AdminController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getSystemStats_decorators = [(0, common_1.Get)('stats'), (0, swagger_1.ApiOperation)({ summary: 'Get system statistics' })];
        _getUsers_decorators = [(0, common_1.Get)('users'), (0, swagger_1.ApiOperation)({ summary: 'Get all users' })];
        _getUserDetails_decorators = [(0, common_1.Get)('users/:id'), (0, swagger_1.ApiOperation)({ summary: 'Get user details' })];
        _updateUserStatus_decorators = [(0, common_1.Put)('users/:id/status'), (0, swagger_1.ApiOperation)({ summary: 'Update user status' })];
        _updateUserRole_decorators = [(0, common_1.Put)('users/:id/role'), (0, swagger_1.ApiOperation)({ summary: 'Update user role' })];
        _getRevenueAnalytics_decorators = [(0, common_1.Get)('analytics/revenue'), (0, swagger_1.ApiOperation)({ summary: 'Get revenue analytics' })];
        _getTradingAnalytics_decorators = [(0, common_1.Get)('analytics/trading'), (0, swagger_1.ApiOperation)({ summary: 'Get trading analytics' })];
        _getBotAnalytics_decorators = [(0, common_1.Get)('analytics/bots'), (0, swagger_1.ApiOperation)({ summary: 'Get bot analytics' })];
        _getAuditLogs_decorators = [(0, common_1.Get)('audit-logs'), (0, swagger_1.ApiOperation)({ summary: 'Get audit logs' })];
        _getSystemHealth_decorators = [(0, common_1.Get)('health'), (0, swagger_1.ApiOperation)({ summary: 'Get system health' })];
        _getFeatureFlags_decorators = [(0, common_1.Get)('feature-flags'), (0, swagger_1.ApiOperation)({ summary: 'Get feature flags' })];
        _updateFeatureFlag_decorators = [(0, common_1.Put)('feature-flags/:flag'), (0, swagger_1.ApiOperation)({ summary: 'Update feature flag' })];
        _getSupportTickets_decorators = [(0, common_1.Get)('support-tickets'), (0, swagger_1.ApiOperation)({ summary: 'Get support tickets' })];
        _resolveTicket_decorators = [(0, common_1.Post)('support-tickets/:id/resolve'), (0, swagger_1.ApiOperation)({ summary: 'Resolve support ticket' })];
        __esDecorate(_classThis, null, _getSystemStats_decorators, { kind: "method", name: "getSystemStats", static: false, private: false, access: { has: function (obj) { return "getSystemStats" in obj; }, get: function (obj) { return obj.getSystemStats; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUsers_decorators, { kind: "method", name: "getUsers", static: false, private: false, access: { has: function (obj) { return "getUsers" in obj; }, get: function (obj) { return obj.getUsers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUserDetails_decorators, { kind: "method", name: "getUserDetails", static: false, private: false, access: { has: function (obj) { return "getUserDetails" in obj; }, get: function (obj) { return obj.getUserDetails; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateUserStatus_decorators, { kind: "method", name: "updateUserStatus", static: false, private: false, access: { has: function (obj) { return "updateUserStatus" in obj; }, get: function (obj) { return obj.updateUserStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateUserRole_decorators, { kind: "method", name: "updateUserRole", static: false, private: false, access: { has: function (obj) { return "updateUserRole" in obj; }, get: function (obj) { return obj.updateUserRole; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getRevenueAnalytics_decorators, { kind: "method", name: "getRevenueAnalytics", static: false, private: false, access: { has: function (obj) { return "getRevenueAnalytics" in obj; }, get: function (obj) { return obj.getRevenueAnalytics; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getTradingAnalytics_decorators, { kind: "method", name: "getTradingAnalytics", static: false, private: false, access: { has: function (obj) { return "getTradingAnalytics" in obj; }, get: function (obj) { return obj.getTradingAnalytics; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getBotAnalytics_decorators, { kind: "method", name: "getBotAnalytics", static: false, private: false, access: { has: function (obj) { return "getBotAnalytics" in obj; }, get: function (obj) { return obj.getBotAnalytics; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAuditLogs_decorators, { kind: "method", name: "getAuditLogs", static: false, private: false, access: { has: function (obj) { return "getAuditLogs" in obj; }, get: function (obj) { return obj.getAuditLogs; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getSystemHealth_decorators, { kind: "method", name: "getSystemHealth", static: false, private: false, access: { has: function (obj) { return "getSystemHealth" in obj; }, get: function (obj) { return obj.getSystemHealth; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getFeatureFlags_decorators, { kind: "method", name: "getFeatureFlags", static: false, private: false, access: { has: function (obj) { return "getFeatureFlags" in obj; }, get: function (obj) { return obj.getFeatureFlags; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateFeatureFlag_decorators, { kind: "method", name: "updateFeatureFlag", static: false, private: false, access: { has: function (obj) { return "updateFeatureFlag" in obj; }, get: function (obj) { return obj.updateFeatureFlag; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getSupportTickets_decorators, { kind: "method", name: "getSupportTickets", static: false, private: false, access: { has: function (obj) { return "getSupportTickets" in obj; }, get: function (obj) { return obj.getSupportTickets; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resolveTicket_decorators, { kind: "method", name: "resolveTicket", static: false, private: false, access: { has: function (obj) { return "resolveTicket" in obj; }, get: function (obj) { return obj.resolveTicket; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminController = _classThis;
}();
exports.AdminController = AdminController;
