"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.AnalyticsService = void 0;
// apps/backend/src/modules/analytics/analytics.service.ts
var common_1 = require("@nestjs/common");
var shared_1 = require("@intelliwave/shared");
var AnalyticsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AnalyticsService = _classThis = /** @class */ (function () {
        function AnalyticsService_1(prisma) {
            this.prisma = prisma;
            this.logger = new common_1.Logger(AnalyticsService.name);
        }
        AnalyticsService_1.prototype.getDashboardStats = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, totalTrades, openPositions, activeBots, totalPnL;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.prisma.trade.count({ where: { userId: userId } }),
                                this.prisma.position.count({ where: { userId: userId, isOpen: true } }),
                                this.prisma.bot.count({ where: { userId: userId, status: 'ACTIVE' } }),
                                this.getTotalPnL(userId),
                            ])];
                        case 1:
                            _a = _b.sent(), totalTrades = _a[0], openPositions = _a[1], activeBots = _a[2], totalPnL = _a[3];
                            return [2 /*return*/, {
                                    totalTrades: totalTrades,
                                    openPositions: openPositions,
                                    activeBots: activeBots,
                                    totalPnL: totalPnL,
                                }];
                    }
                });
            });
        };
        AnalyticsService_1.prototype.getEquityCurve = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, days) {
                var startDate, trades, equity, equityCurve;
                if (days === void 0) { days = 30; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            startDate = new Date();
                            startDate.setDate(startDate.getDate() - days);
                            return [4 /*yield*/, this.prisma.trade.findMany({
                                    where: {
                                        userId: userId,
                                        timestamp: { gte: startDate },
                                    },
                                    orderBy: { timestamp: 'asc' },
                                })];
                        case 1:
                            trades = _a.sent();
                            equity = 10000;
                            equityCurve = [];
                            trades.forEach(function (trade) {
                                equity += Number(trade.pnl);
                                equityCurve.push({
                                    date: trade.timestamp.toISOString(),
                                    equity: shared_1.MathUtil.roundTo(equity, 2),
                                    pnl: Number(trade.pnl),
                                });
                            });
                            return [2 /*return*/, equityCurve];
                    }
                });
            });
        };
        AnalyticsService_1.prototype.getPerformanceMetrics = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var trades, returns, winningTrades, losingTrades;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.trade.findMany({
                                where: { userId: userId },
                            })];
                        case 1:
                            trades = _a.sent();
                            returns = trades.map(function (t) { return Number(t.pnl); });
                            winningTrades = returns.filter(function (r) { return r > 0; });
                            losingTrades = returns.filter(function (r) { return r < 0; });
                            return [2 /*return*/, {
                                    totalTrades: returns.length,
                                    winningTrades: winningTrades.length,
                                    losingTrades: losingTrades.length,
                                    winRate: returns.length > 0
                                        ? shared_1.MathUtil.roundTo((winningTrades.length / returns.length) * 100, 2)
                                        : 0,
                                    totalPnL: shared_1.MathUtil.roundTo(returns.reduce(function (sum, r) { return sum + r; }, 0), 2),
                                    averageWin: winningTrades.length > 0
                                        ? shared_1.MathUtil.roundTo(winningTrades.reduce(function (sum, r) { return sum + r; }, 0) / winningTrades.length, 2)
                                        : 0,
                                    averageLoss: losingTrades.length > 0
                                        ? shared_1.MathUtil.roundTo(Math.abs(losingTrades.reduce(function (sum, r) { return sum + r; }, 0) / losingTrades.length), 2)
                                        : 0,
                                    profitFactor: this.calculateProfitFactor(winningTrades, losingTrades),
                                    sharpeRatio: shared_1.MathUtil.calculateSharpeRatio(returns),
                                    maxDrawdown: shared_1.MathUtil.calculateMaxDrawdown(returns),
                                    expectancy: this.calculateExpectancy(returns, winningTrades, losingTrades),
                                }];
                    }
                });
            });
        };
        AnalyticsService_1.prototype.getDailyPnL = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, days) {
                var startDate, trades, dailyPnL, today, i, date;
                if (days === void 0) { days = 30; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            startDate = new Date();
                            startDate.setDate(startDate.getDate() - days);
                            return [4 /*yield*/, this.prisma.trade.findMany({
                                    where: {
                                        userId: userId,
                                        timestamp: { gte: startDate },
                                    },
                                })];
                        case 1:
                            trades = _a.sent();
                            dailyPnL = {};
                            today = new Date();
                            // Initialize all days with 0
                            for (i = 0; i < days; i++) {
                                date = new Date(today);
                                date.setDate(date.getDate() - i);
                                dailyPnL[date.toISOString().slice(0, 10)] = 0;
                            }
                            // Sum PnL by day
                            trades.forEach(function (trade) {
                                var day = trade.timestamp.toISOString().slice(0, 10);
                                dailyPnL[day] = (dailyPnL[day] || 0) + Number(trade.pnl);
                            });
                            return [2 /*return*/, Object.entries(dailyPnL)
                                    .map(function (_a) {
                                    var date = _a[0], pnl = _a[1];
                                    return ({ date: date, pnl: shared_1.MathUtil.roundTo(pnl, 2) });
                                })
                                    .sort(function (a, b) { return a.date.localeCompare(b.date); })];
                    }
                });
            });
        };
        AnalyticsService_1.prototype.getTradeDistribution = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var trades, bySymbol;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.trade.findMany({
                                where: { userId: userId },
                                select: {
                                    symbol: true,
                                    pnl: true,
                                    side: true,
                                },
                            })];
                        case 1:
                            trades = _a.sent();
                            bySymbol = {};
                            trades.forEach(function (trade) {
                                if (!bySymbol[trade.symbol]) {
                                    bySymbol[trade.symbol] = { count: 0, pnl: 0, buys: 0, sells: 0 };
                                }
                                bySymbol[trade.symbol].count++;
                                bySymbol[trade.symbol].pnl += Number(trade.pnl);
                                if (trade.side === 'BUY')
                                    bySymbol[trade.symbol].buys++;
                                else
                                    bySymbol[trade.symbol].sells++;
                            });
                            return [2 /*return*/, Object.entries(bySymbol).map(function (_a) {
                                    var symbol = _a[0], data = _a[1];
                                    return (__assign(__assign({ symbol: symbol }, data), { pnl: shared_1.MathUtil.roundTo(data.pnl, 2) }));
                                })];
                    }
                });
            });
        };
        AnalyticsService_1.prototype.getBotAnalytics = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var bots;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.bot.findMany({
                                where: { userId: userId },
                                include: {
                                    runs: {
                                        orderBy: { startTime: 'desc' },
                                        take: 30,
                                    },
                                    trades: true,
                                },
                            })];
                        case 1:
                            bots = _a.sent();
                            return [2 /*return*/, bots.map(function (bot) {
                                    var trades = bot.trades;
                                    var winningTrades = trades.filter(function (t) { return t.pnl > 0; });
                                    return {
                                        id: bot.id,
                                        name: bot.name,
                                        status: bot.status,
                                        capital: bot.capital,
                                        totalTrades: trades.length,
                                        totalPnL: trades.reduce(function (sum, t) { return sum + Number(t.pnl); }, 0),
                                        winRate: trades.length > 0 ? (winningTrades.length / trades.length) * 100 : 0,
                                        avgTradeDuration: _this.calculateAvgTradeDuration(trades),
                                        runs: bot.runs.map(function (run) { return ({
                                            id: run.id,
                                            status: run.status,
                                            startTime: run.startTime,
                                            endTime: run.endTime,
                                            pnl: run.pnl,
                                            trades: run.trades,
                                            winRate: run.winRate,
                                        }); }),
                                    };
                                })];
                    }
                });
            });
        };
        AnalyticsService_1.prototype.getTradeCalendar = function (userId, month, year) {
            return __awaiter(this, void 0, void 0, function () {
                var startDate, endDate, trades, calendar;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            startDate = new Date(year, month - 1, 1);
                            endDate = new Date(year, month, 0);
                            return [4 /*yield*/, this.prisma.trade.findMany({
                                    where: {
                                        userId: userId,
                                        timestamp: {
                                            gte: startDate,
                                            lte: endDate,
                                        },
                                    },
                                })];
                        case 1:
                            trades = _a.sent();
                            calendar = {};
                            trades.forEach(function (trade) {
                                var day = new Date(trade.timestamp).getDate();
                                if (!calendar[day]) {
                                    calendar[day] = { count: 0, pnl: 0, wins: 0, losses: 0 };
                                }
                                calendar[day].count++;
                                calendar[day].pnl += Number(trade.pnl);
                                if (trade.pnl > 0)
                                    calendar[day].wins++;
                                else
                                    calendar[day].losses++;
                            });
                            return [2 /*return*/, calendar];
                    }
                });
            });
        };
        AnalyticsService_1.prototype.getTotalPnL = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.trade.aggregate({
                                where: { userId: userId },
                                _sum: { pnl: true },
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result._sum.pnl || 0];
                    }
                });
            });
        };
        AnalyticsService_1.prototype.calculateProfitFactor = function (winners, losers) {
            var totalWins = winners.reduce(function (sum, w) { return sum + w; }, 0);
            var totalLosses = Math.abs(losers.reduce(function (sum, l) { return sum + l; }, 0));
            return totalLosses > 0 ? shared_1.MathUtil.roundTo(totalWins / totalLosses, 2) : 0;
        };
        AnalyticsService_1.prototype.calculateExpectancy = function (returns, winners, losers) {
            if (returns.length === 0)
                return 0;
            var winRate = winners.length / returns.length;
            var avgWin = winners.length > 0
                ? winners.reduce(function (sum, w) { return sum + w; }, 0) / winners.length
                : 0;
            var avgLoss = losers.length > 0
                ? Math.abs(losers.reduce(function (sum, l) { return sum + l; }, 0) / losers.length)
                : 0;
            return shared_1.MathUtil.roundTo((winRate * avgWin) - ((1 - winRate) * avgLoss), 2);
        };
        AnalyticsService_1.prototype.calculateAvgTradeDuration = function (trades) {
            if (trades.length === 0)
                return 0;
            // This would need position open/close times
            // Simplified version
            return 0;
        };
        return AnalyticsService_1;
    }());
    __setFunctionName(_classThis, "AnalyticsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AnalyticsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AnalyticsService = _classThis;
}();
exports.AnalyticsService = AnalyticsService;
