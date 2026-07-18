"use strict";
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
exports.TradingService = void 0;
// apps/backend/src/modules/trading/trading.service.ts
var common_1 = require("@nestjs/common");
var TradingService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TradingService = _classThis = /** @class */ (function () {
        function TradingService_1(prisma, derivService) {
            this.prisma = prisma;
            this.derivService = derivService;
            this.logger = new common_1.Logger(TradingService.name);
        }
        TradingService_1.prototype.createOrder = function (userId, createOrderDto) {
            return __awaiter(this, void 0, void 0, function () {
                var account, order, tradeResult, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.tradingAccount.findFirst({
                                where: { id: createOrderDto.tradingAccountId, userId: userId },
                            })];
                        case 1:
                            account = _a.sent();
                            if (!account) {
                                throw new common_1.NotFoundException('Trading account not found');
                            }
                            // Check risk limits
                            return [4 /*yield*/, this.checkRiskLimits(userId, createOrderDto)];
                        case 2:
                            // Check risk limits
                            _a.sent();
                            return [4 /*yield*/, this.prisma.order.create({
                                    data: {
                                        userId: userId,
                                        tradingAccountId: createOrderDto.tradingAccountId,
                                        symbol: createOrderDto.symbol,
                                        type: createOrderDto.type,
                                        side: createOrderDto.side,
                                        quantity: createOrderDto.quantity,
                                        price: createOrderDto.price,
                                        stopPrice: createOrderDto.stopPrice,
                                        limitPrice: createOrderDto.limitPrice,
                                        timeInForce: createOrderDto.timeInForce || 'GTC',
                                        metadata: createOrderDto.metadata,
                                    },
                                })];
                        case 3:
                            order = _a.sent();
                            if (!(createOrderDto.type === 'MARKET')) return [3 /*break*/, 8];
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 6, , 8]);
                            return [4 /*yield*/, this.executeMarketOrder(userId, order)];
                        case 5:
                            tradeResult = _a.sent();
                            return [2 /*return*/, { order: order, trade: tradeResult }];
                        case 6:
                            error_1 = _a.sent();
                            return [4 /*yield*/, this.prisma.order.update({
                                    where: { id: order.id },
                                    data: { status: 'REJECTED' },
                                })];
                        case 7:
                            _a.sent();
                            throw error_1;
                        case 8: return [2 /*return*/, { order: order }];
                    }
                });
            });
        };
        TradingService_1.prototype.executeMarketOrder = function (userId, order) {
            return __awaiter(this, void 0, void 0, function () {
                var tradeRequest, result, position, trade;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tradeRequest = {
                                symbol: order.symbol,
                                contract_type: order.side === 'BUY' ? 'CALL' : 'PUT',
                                amount: order.quantity,
                                basis: 'stake',
                                duration: 1,
                                duration_unit: 't',
                            };
                            return [4 /*yield*/, this.derivService.buyContract(userId, tradeRequest)];
                        case 1:
                            result = _a.sent();
                            // Update order status
                            return [4 /*yield*/, this.prisma.order.update({
                                    where: { id: order.id },
                                    data: {
                                        status: 'FILLED',
                                        derivOrderId: result.contract_id,
                                        filledQuantity: order.quantity,
                                        price: result.buy_price,
                                    },
                                })];
                        case 2:
                            // Update order status
                            _a.sent();
                            return [4 /*yield*/, this.createOrUpdatePosition(userId, order, result)];
                        case 3:
                            position = _a.sent();
                            return [4 /*yield*/, this.prisma.trade.create({
                                    data: {
                                        userId: userId,
                                        orderId: order.id,
                                        positionId: position.id,
                                        symbol: order.symbol,
                                        side: order.side,
                                        quantity: order.quantity,
                                        price: result.buy_price,
                                        commission: 0,
                                    },
                                })];
                        case 4:
                            trade = _a.sent();
                            return [2 /*return*/, { result: result, position: position, trade: trade }];
                    }
                });
            });
        };
        TradingService_1.prototype.createOrUpdatePosition = function (userId, order, tradeResult) {
            return __awaiter(this, void 0, void 0, function () {
                var existingPosition;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.position.findFirst({
                                where: {
                                    userId: userId,
                                    tradingAccountId: order.tradingAccountId,
                                    symbol: order.symbol,
                                    isOpen: true,
                                },
                            })];
                        case 1:
                            existingPosition = _a.sent();
                            if (existingPosition) {
                                return [2 /*return*/, this.prisma.position.update({
                                        where: { id: existingPosition.id },
                                        data: {
                                            quantity: existingPosition.quantity + order.quantity,
                                            currentPrice: tradeResult.buy_price,
                                            unrealizedPnL: 0,
                                        },
                                    })];
                            }
                            return [2 /*return*/, this.prisma.position.create({
                                    data: {
                                        userId: userId,
                                        tradingAccountId: order.tradingAccountId,
                                        symbol: order.symbol,
                                        side: order.side,
                                        quantity: order.quantity,
                                        entryPrice: tradeResult.buy_price,
                                        currentPrice: tradeResult.buy_price,
                                        leverage: 100,
                                    },
                                })];
                    }
                });
            });
        };
        TradingService_1.prototype.getOrders = function (userId, filters) {
            return __awaiter(this, void 0, void 0, function () {
                var where;
                return __generator(this, function (_a) {
                    where = { userId: userId };
                    if (filters === null || filters === void 0 ? void 0 : filters.status) {
                        where.status = filters.status;
                    }
                    if (filters === null || filters === void 0 ? void 0 : filters.symbol) {
                        where.symbol = filters.symbol;
                    }
                    if (filters === null || filters === void 0 ? void 0 : filters.startDate) {
                        where.createdAt = { gte: new Date(filters.startDate) };
                    }
                    return [2 /*return*/, this.prisma.order.findMany({
                            where: where,
                            orderBy: { createdAt: 'desc' },
                            take: (filters === null || filters === void 0 ? void 0 : filters.limit) || 50,
                            skip: (filters === null || filters === void 0 ? void 0 : filters.offset) || 0,
                        })];
                });
            });
        };
        TradingService_1.prototype.getOrderById = function (userId, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.order.findFirst({
                                where: { id: orderId, userId: userId },
                                include: {
                                    trades: true,
                                },
                            })];
                        case 1:
                            order = _a.sent();
                            if (!order) {
                                throw new common_1.NotFoundException('Order not found');
                            }
                            return [2 /*return*/, order];
                    }
                });
            });
        };
        TradingService_1.prototype.cancelOrder = function (userId, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.order.findFirst({
                                where: { id: orderId, userId: userId, status: 'OPEN' },
                            })];
                        case 1:
                            order = _a.sent();
                            if (!order) {
                                throw new common_1.NotFoundException('Open order not found');
                            }
                            return [4 /*yield*/, this.prisma.order.update({
                                    where: { id: orderId },
                                    data: { status: 'CANCELLED' },
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: 'Order cancelled successfully' }];
                    }
                });
            });
        };
        TradingService_1.prototype.getPositions = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.position.findMany({
                            where: { userId: userId, isOpen: true },
                            include: {
                                tradingAccount: true,
                            },
                            orderBy: { openedAt: 'desc' },
                        })];
                });
            });
        };
        TradingService_1.prototype.closePosition = function (userId, positionId) {
            return __awaiter(this, void 0, void 0, function () {
                var position, result, pnl, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.position.findFirst({
                                where: { id: positionId, userId: userId, isOpen: true },
                            })];
                        case 1:
                            position = _a.sent();
                            if (!position) {
                                throw new common_1.NotFoundException('Open position not found');
                            }
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 5, , 6]);
                            return [4 /*yield*/, this.derivService.sellContract(userId, positionId, position.currentPrice)];
                        case 3:
                            result = _a.sent();
                            pnl = (position.currentPrice - position.entryPrice) * position.quantity;
                            return [4 /*yield*/, this.prisma.position.update({
                                    where: { id: positionId },
                                    data: {
                                        isOpen: false,
                                        closedAt: new Date(),
                                        realizedPnL: pnl,
                                    },
                                })];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, { position: position, pnl: pnl, result: result }];
                        case 5:
                            error_2 = _a.sent();
                            this.logger.error("Failed to close position: ".concat(error_2.message));
                            throw new common_1.BadRequestException('Failed to close position');
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        TradingService_1.prototype.getTradeHistory = function (userId, filters) {
            return __awaiter(this, void 0, void 0, function () {
                var where;
                return __generator(this, function (_a) {
                    where = { userId: userId };
                    if (filters === null || filters === void 0 ? void 0 : filters.symbol) {
                        where.symbol = filters.symbol;
                    }
                    if ((filters === null || filters === void 0 ? void 0 : filters.startDate) && (filters === null || filters === void 0 ? void 0 : filters.endDate)) {
                        where.timestamp = {
                            gte: new Date(filters.startDate),
                            lte: new Date(filters.endDate),
                        };
                    }
                    return [2 /*return*/, this.prisma.trade.findMany({
                            where: where,
                            orderBy: { timestamp: 'desc' },
                            take: (filters === null || filters === void 0 ? void 0 : filters.limit) || 100,
                            skip: (filters === null || filters === void 0 ? void 0 : filters.offset) || 0,
                        })];
                });
            });
        };
        TradingService_1.prototype.checkRiskLimits = function (userId, order) {
            return __awaiter(this, void 0, void 0, function () {
                var riskProfiles, profile, openPositions, todayStart, todayTrades, todayPnL, dailyLossLimit;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.riskProfile.findMany({
                                where: { userId: userId },
                            })];
                        case 1:
                            riskProfiles = _a.sent();
                            if (riskProfiles.length === 0)
                                return [2 /*return*/];
                            profile = riskProfiles[0];
                            return [4 /*yield*/, this.prisma.position.count({
                                    where: { userId: userId, isOpen: true },
                                })];
                        case 2:
                            openPositions = _a.sent();
                            if (openPositions >= profile.maxPositions) {
                                throw new common_1.BadRequestException("Maximum positions (".concat(profile.maxPositions, ") reached"));
                            }
                            todayStart = new Date();
                            todayStart.setHours(0, 0, 0, 0);
                            return [4 /*yield*/, this.prisma.trade.findMany({
                                    where: {
                                        userId: userId,
                                        timestamp: { gte: todayStart },
                                    },
                                })];
                        case 3:
                            todayTrades = _a.sent();
                            todayPnL = todayTrades.reduce(function (sum, trade) { return sum + Number(trade.pnl); }, 0);
                            dailyLossLimit = (profile.dailyLossLimit / 100) * 10000;
                            if (todayPnL < -dailyLossLimit) {
                                throw new common_1.BadRequestException("Daily loss limit of $".concat(dailyLossLimit, " reached"));
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return TradingService_1;
    }());
    __setFunctionName(_classThis, "TradingService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TradingService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TradingService = _classThis;
}();
exports.TradingService = TradingService;
