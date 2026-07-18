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
exports.TradingController = void 0;
// apps/backend/src/modules/trading/trading.controller.ts
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
var TradingController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Trading'), (0, common_1.Controller)('trading'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createOrder_decorators;
    var _getOrders_decorators;
    var _getOrder_decorators;
    var _cancelOrder_decorators;
    var _getPositions_decorators;
    var _closePosition_decorators;
    var _getTradeHistory_decorators;
    var TradingController = _classThis = /** @class */ (function () {
        function TradingController_1(tradingService) {
            this.tradingService = (__runInitializers(this, _instanceExtraInitializers), tradingService);
        }
        TradingController_1.prototype.createOrder = function (user, createOrderDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.tradingService.createOrder(user.id, createOrderDto)];
                });
            });
        };
        TradingController_1.prototype.getOrders = function (user, status, symbol, limit, offset) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.tradingService.getOrders(user.id, { status: status, symbol: symbol, limit: limit, offset: offset })];
                });
            });
        };
        TradingController_1.prototype.getOrder = function (user, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.tradingService.getOrderById(user.id, id)];
                });
            });
        };
        TradingController_1.prototype.cancelOrder = function (user, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.tradingService.cancelOrder(user.id, id)];
                });
            });
        };
        TradingController_1.prototype.getPositions = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.tradingService.getPositions(user.id)];
                });
            });
        };
        TradingController_1.prototype.closePosition = function (user, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.tradingService.closePosition(user.id, id)];
                });
            });
        };
        TradingController_1.prototype.getTradeHistory = function (user, symbol, startDate, endDate, limit, offset) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.tradingService.getTradeHistory(user.id, {
                            symbol: symbol,
                            startDate: startDate,
                            endDate: endDate,
                            limit: limit,
                            offset: offset,
                        })];
                });
            });
        };
        return TradingController_1;
    }());
    __setFunctionName(_classThis, "TradingController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createOrder_decorators = [(0, common_1.Post)('orders'), (0, swagger_1.ApiOperation)({ summary: 'Create order' })];
        _getOrders_decorators = [(0, common_1.Get)('orders'), (0, swagger_1.ApiOperation)({ summary: 'Get orders' })];
        _getOrder_decorators = [(0, common_1.Get)('orders/:id'), (0, swagger_1.ApiOperation)({ summary: 'Get order by ID' })];
        _cancelOrder_decorators = [(0, common_1.Delete)('orders/:id'), (0, swagger_1.ApiOperation)({ summary: 'Cancel order' })];
        _getPositions_decorators = [(0, common_1.Get)('positions'), (0, swagger_1.ApiOperation)({ summary: 'Get positions' })];
        _closePosition_decorators = [(0, common_1.Post)('positions/:id/close'), (0, swagger_1.ApiOperation)({ summary: 'Close position' })];
        _getTradeHistory_decorators = [(0, common_1.Get)('history'), (0, swagger_1.ApiOperation)({ summary: 'Get trade history' })];
        __esDecorate(_classThis, null, _createOrder_decorators, { kind: "method", name: "createOrder", static: false, private: false, access: { has: function (obj) { return "createOrder" in obj; }, get: function (obj) { return obj.createOrder; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getOrders_decorators, { kind: "method", name: "getOrders", static: false, private: false, access: { has: function (obj) { return "getOrders" in obj; }, get: function (obj) { return obj.getOrders; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getOrder_decorators, { kind: "method", name: "getOrder", static: false, private: false, access: { has: function (obj) { return "getOrder" in obj; }, get: function (obj) { return obj.getOrder; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _cancelOrder_decorators, { kind: "method", name: "cancelOrder", static: false, private: false, access: { has: function (obj) { return "cancelOrder" in obj; }, get: function (obj) { return obj.cancelOrder; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPositions_decorators, { kind: "method", name: "getPositions", static: false, private: false, access: { has: function (obj) { return "getPositions" in obj; }, get: function (obj) { return obj.getPositions; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _closePosition_decorators, { kind: "method", name: "closePosition", static: false, private: false, access: { has: function (obj) { return "closePosition" in obj; }, get: function (obj) { return obj.closePosition; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getTradeHistory_decorators, { kind: "method", name: "getTradeHistory", static: false, private: false, access: { has: function (obj) { return "getTradeHistory" in obj; }, get: function (obj) { return obj.getTradeHistory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TradingController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TradingController = _classThis;
}();
exports.TradingController = TradingController;
