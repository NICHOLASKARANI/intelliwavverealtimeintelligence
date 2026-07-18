"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
// apps/backend/src/modules/admin/admin.service.ts
var common_1 = require("@nestjs/common");
var shared_1 = require("@intelliwave/shared");
var AdminService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminService = _classThis = /** @class */ (function () {
        function AdminService_1(prisma) {
            this.prisma = prisma;
            this.logger = new common_1.Logger(AdminService.name);
        }
        AdminService_1.prototype.getSystemStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, totalUsers, activeUsers, totalBots, activeBots, totalTrades, totalVolume, revenue, subscriptions;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.prisma.user.count(),
                                this.prisma.user.count({ where: { status: 'ACTIVE' } }),
                                this.prisma.bot.count(),
                                this.prisma.bot.count({ where: { status: 'ACTIVE' } }),
                                this.prisma.trade.count(),
                                this.calculateTotalVolume(),
                                this.calculateRevenue(),
                                this.prisma.subscription.count({ where: { status: 'ACTIVE' } }),
                            ])];
                        case 1:
                            _a = _b.sent(), totalUsers = _a[0], activeUsers = _a[1], totalBots = _a[2], activeBots = _a[3], totalTrades = _a[4], totalVolume = _a[5], revenue = _a[6], subscriptions = _a[7];
                            return [2 /*return*/, {
                                    users: { total: totalUsers, active: activeUsers },
                                    bots: { total: totalBots, active: activeBots },
                                    trades: totalTrades,
                                    volume: totalVolume,
                                    revenue: revenue,
                                    subscriptions: subscriptions,
                                }];
                    }
                });
            });
        };
        AdminService_1.prototype.getUsers = function (filters) {
            return __awaiter(this, void 0, void 0, function () {
                var where, _a, users, total;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            where = {};
                            if (filters.status)
                                where.status = filters.status;
                            if (filters.role)
                                where.role = filters.role;
                            if (filters.search) {
                                where.OR = [
                                    { email: { contains: filters.search, mode: 'insensitive' } },
                                    { username: { contains: filters.search, mode: 'insensitive' } },
                                    { firstName: { contains: filters.search, mode: 'insensitive' } },
                                    { lastName: { contains: filters.search, mode: 'insensitive' } },
                                ];
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.user.findMany({
                                        where: where,
                                        select: {
                                            id: true,
                                            email: true,
                                            username: true,
                                            firstName: true,
                                            lastName: true,
                                            role: true,
                                            status: true,
                                            emailVerified: true,
                                            twoFactorEnabled: true,
                                            lastLoginAt: true,
                                            createdAt: true,
                                            _count: {
                                                select: {
                                                    bots: true,
                                                    trades: true,
                                                    subscriptions: true,
                                                },
                                            },
                                        },
                                        orderBy: { createdAt: 'desc' },
                                        take: filters.limit || 50,
                                        skip: filters.offset || 0,
                                    }),
                                    this.prisma.user.count({ where: where }),
                                ])];
                        case 1:
                            _a = _b.sent(), users = _a[0], total = _a[1];
                            return [2 /*return*/, { users: users, total: total, page: Math.floor((filters.offset || 0) / (filters.limit || 50)) + 1 }];
                    }
                });
            });
        };
        AdminService_1.prototype.getUserDetails = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var user, passwordHash, twoFactorSecret, safeUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { id: userId },
                                include: {
                                    sessions: true,
                                    derivAccounts: true,
                                    tradingAccounts: true,
                                    strategies: true,
                                    bots: {
                                        include: {
                                            runs: {
                                                orderBy: { startTime: 'desc' },
                                                take: 10,
                                            },
                                        },
                                    },
                                    orders: {
                                        orderBy: { createdAt: 'desc' },
                                        take: 50,
                                    },
                                    trades: {
                                        orderBy: { timestamp: 'desc' },
                                        take: 50,
                                    },
                                    subscriptions: true,
                                    payments: true,
                                    apiKeys: true,
                                    auditLogs: {
                                        orderBy: { createdAt: 'desc' },
                                        take: 100,
                                    },
                                    referrals: true,
                                },
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user)
                                throw new common_1.NotFoundException('User not found');
                            passwordHash = user.passwordHash, twoFactorSecret = user.twoFactorSecret, safeUser = __rest(user, ["passwordHash", "twoFactorSecret"]);
                            return [2 /*return*/, safeUser];
                    }
                });
            });
        };
        AdminService_1.prototype.updateUserStatus = function (userId, status) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({ where: { id: userId } })];
                        case 1:
                            user = _a.sent();
                            if (!user)
                                throw new common_1.NotFoundException('User not found');
                            if (!(status === 'SUSPENDED' || status === 'BANNED')) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.bot.updateMany({
                                    where: { userId: userId, status: 'ACTIVE' },
                                    data: { status: 'STOPPED', isActive: false },
                                })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/, this.prisma.user.update({
                                where: { id: userId },
                                data: { status: status },
                            })];
                    }
                });
            });
        };
        AdminService_1.prototype.updateUserRole = function (userId, role) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({ where: { id: userId } })];
                        case 1:
                            user = _a.sent();
                            if (!user)
                                throw new common_1.NotFoundException('User not found');
                            return [2 /*return*/, this.prisma.user.update({
                                    where: { id: userId },
                                    data: { role: role },
                                })];
                    }
                });
            });
        };
        AdminService_1.prototype.getRevenueAnalytics = function () {
            return __awaiter(this, arguments, void 0, function (period) {
                var startDate, payments, subscriptionRevenue, grouped;
                if (period === void 0) { period = 'monthly'; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            startDate = this.getStartDate(period);
                            return [4 /*yield*/, this.prisma.payment.findMany({
                                    where: {
                                        createdAt: { gte: startDate },
                                        status: 'COMPLETED',
                                    },
                                    orderBy: { createdAt: 'asc' },
                                })];
                        case 1:
                            payments = _a.sent();
                            subscriptionRevenue = payments.reduce(function (sum, p) { return sum + Number(p.amount); }, 0);
                            grouped = this.groupByPeriod(payments, period);
                            return [2 /*return*/, {
                                    totalRevenue: shared_1.MathUtil.roundTo(subscriptionRevenue, 2),
                                    period: period,
                                    data: grouped,
                                }];
                    }
                });
            });
        };
        AdminService_1.prototype.getTradingAnalytics = function () {
            return __awaiter(this, arguments, void 0, function (period) {
                var startDate, trades, totalVolume, totalPnL, symbolStats, topSymbols;
                if (period === void 0) { period = 'monthly'; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            startDate = this.getStartDate(period);
                            return [4 /*yield*/, this.prisma.trade.findMany({
                                    where: { timestamp: { gte: startDate } },
                                    orderBy: { timestamp: 'asc' },
                                })];
                        case 1:
                            trades = _a.sent();
                            totalVolume = trades.reduce(function (sum, t) { return sum + Number(t.quantity) * Number(t.price); }, 0);
                            totalPnL = trades.reduce(function (sum, t) { return sum + Number(t.pnl); }, 0);
                            symbolStats = {};
                            trades.forEach(function (trade) {
                                if (!symbolStats[trade.symbol]) {
                                    symbolStats[trade.symbol] = { count: 0, volume: 0, pnl: 0 };
                                }
                                symbolStats[trade.symbol].count++;
                                symbolStats[trade.symbol].volume += Number(trade.quantity) * Number(trade.price);
                                symbolStats[trade.symbol].pnl += Number(trade.pnl);
                            });
                            topSymbols = Object.entries(symbolStats)
                                .map(function (_a) {
                                var symbol = _a[0], stats = _a[1];
                                return (__assign({ symbol: symbol }, stats));
                            })
                                .sort(function (a, b) { return b.volume - a.volume; })
                                .slice(0, 10);
                            return [2 /*return*/, {
                                    totalVolume: shared_1.MathUtil.roundTo(totalVolume, 2),
                                    totalPnL: shared_1.MathUtil.roundTo(totalPnL, 2),
                                    totalTrades: trades.length,
                                    topSymbols: topSymbols,
                                }];
                    }
                });
            });
        };
        AdminService_1.prototype.getBotAnalytics = function () {
            return __awaiter(this, void 0, void 0, function () {
                var bots, activeBots, errorBots, strategyUsage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.bot.findMany({
                                include: {
                                    user: {
                                        select: { email: true, username: true },
                                    },
                                    strategy: {
                                        select: { name: true, type: true },
                                    },
                                    _count: {
                                        select: { trades: true, runs: true },
                                    },
                                },
                            })];
                        case 1:
                            bots = _a.sent();
                            activeBots = bots.filter(function (b) { return b.status === 'ACTIVE'; });
                            errorBots = bots.filter(function (b) { return b.status === 'ERROR'; });
                            strategyUsage = {};
                            bots.forEach(function (bot) {
                                var _a;
                                var type = ((_a = bot.strategy) === null || _a === void 0 ? void 0 : _a.type) || 'Unknown';
                                strategyUsage[type] = (strategyUsage[type] || 0) + 1;
                            });
                            return [2 /*return*/, {
                                    totalBots: bots.length,
                                    activeBots: activeBots.length,
                                    errorBots: errorBots.length,
                                    strategyUsage: strategyUsage,
                                    recentBots: bots.sort(function (a, b) { return b.createdAt.getTime() - a.createdAt.getTime(); }).slice(0, 10),
                                }];
                    }
                });
            });
        };
        AdminService_1.prototype.getAuditLogs = function (filters) {
            return __awaiter(this, void 0, void 0, function () {
                var where, _a, logs, total;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            where = {};
                            if (filters.userId)
                                where.userId = filters.userId;
                            if (filters.action)
                                where.action = filters.action;
                            if (filters.startDate) {
                                where.createdAt = { gte: new Date(filters.startDate) };
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.auditLog.findMany({
                                        where: where,
                                        include: {
                                            user: {
                                                select: { email: true, username: true },
                                            },
                                        },
                                        orderBy: { createdAt: 'desc' },
                                        take: filters.limit || 100,
                                        skip: filters.offset || 0,
                                    }),
                                    this.prisma.auditLog.count({ where: where }),
                                ])];
                        case 1:
                            _a = _b.sent(), logs = _a[0], total = _a[1];
                            return [2 /*return*/, { logs: logs, total: total }];
                    }
                });
            });
        };
        AdminService_1.prototype.getSystemHealth = function () {
            return __awaiter(this, void 0, void 0, function () {
                var dbStart, dbLatency, redisHealthy;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            dbStart = Date.now();
                            return [4 /*yield*/, this.prisma.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT 1"], ["SELECT 1"])))];
                        case 1:
                            _a.sent();
                            dbLatency = Date.now() - dbStart;
                            redisHealthy = true;
                            return [2 /*return*/, {
                                    status: 'healthy',
                                    timestamp: new Date().toISOString(),
                                    services: {
                                        database: {
                                            status: dbLatency < 1000 ? 'healthy' : 'degraded',
                                            latency: "".concat(dbLatency, "ms"),
                                        },
                                        redis: {
                                            status: redisHealthy ? 'healthy' : 'unhealthy',
                                        },
                                        api: {
                                            status: 'healthy',
                                            uptime: process.uptime(),
                                        },
                                    },
                                    memory: process.memoryUsage(),
                                }];
                    }
                });
            });
        };
        AdminService_1.prototype.getFeatureFlags = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // In production, this would come from a feature flag service
                    return [2 /*return*/, {
                            ENABLE_AI_TRADING: process.env.ENABLE_AI_TRADING === 'true',
                            ENABLE_COPY_TRADING: process.env.ENABLE_COPY_TRADING === 'true',
                            ENABLE_SOCIAL_FEATURES: process.env.ENABLE_SOCIAL_FEATURES === 'true',
                            MAINTENANCE_MODE: process.env.MAINTENANCE_MODE === 'true',
                            MAX_BOTS_PER_USER: parseInt(process.env.MAX_BOTS_PER_USER || '10'),
                        }];
                });
            });
        };
        AdminService_1.prototype.updateFeatureFlag = function (flag, value) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // In production, update feature flag service
                    this.logger.info("Feature flag ".concat(flag, " updated to ").concat(value));
                    return [2 /*return*/, { flag: flag, value: value, updated: true }];
                });
            });
        };
        AdminService_1.prototype.getSupportTickets = function (filters) {
            return __awaiter(this, void 0, void 0, function () {
                var where;
                return __generator(this, function (_a) {
                    where = {};
                    if (filters.status)
                        where.status = filters.status;
                    if (filters.priority)
                        where.priority = filters.priority;
                    return [2 /*return*/, this.prisma.supportTicket.findMany({
                            where: where,
                            include: {
                                user: {
                                    select: { email: true, username: true },
                                },
                            },
                            orderBy: { createdAt: 'desc' },
                            take: filters.limit || 50,
                            skip: filters.offset || 0,
                        })];
                });
            });
        };
        AdminService_1.prototype.resolveTicket = function (ticketId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.supportTicket.update({
                            where: { id: ticketId },
                            data: {
                                status: 'RESOLVED',
                                resolvedAt: new Date(),
                            },
                        })];
                });
            });
        };
        AdminService_1.prototype.calculateTotalVolume = function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.trade.aggregate({
                                _sum: {
                                    quantity: true,
                                },
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, Number(result._sum.quantity || 0)];
                    }
                });
            });
        };
        AdminService_1.prototype.calculateRevenue = function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.payment.aggregate({
                                where: { status: 'COMPLETED' },
                                _sum: {
                                    amount: true,
                                },
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, Number(result._sum.amount || 0)];
                    }
                });
            });
        };
        AdminService_1.prototype.getStartDate = function (period) {
            var now = new Date();
            switch (period) {
                case 'daily':
                    return new Date(now.setDate(now.getDate() - 30));
                case 'weekly':
                    return new Date(now.setDate(now.getDate() - 90));
                case 'monthly':
                    return new Date(now.setMonth(now.getMonth() - 12));
                case 'yearly':
                    return new Date(now.setFullYear(now.getFullYear() - 3));
                default:
                    return new Date(now.setMonth(now.getMonth() - 12));
            }
        };
        AdminService_1.prototype.groupByPeriod = function (data, period) {
            var grouped = {};
            data.forEach(function (item) {
                var key;
                var date = new Date(item.createdAt);
                switch (period) {
                    case 'daily':
                        key = date.toISOString().slice(0, 10);
                        break;
                    case 'weekly':
                        var weekStart = new Date(date);
                        weekStart.setDate(date.getDate() - date.getDay());
                        key = weekStart.toISOString().slice(0, 10);
                        break;
                    case 'monthly':
                        key = date.toISOString().slice(0, 7);
                        break;
                    case 'yearly':
                        key = date.getFullYear().toString();
                        break;
                    default:
                        key = date.toISOString().slice(0, 7);
                }
                if (!grouped[key]) {
                    grouped[key] = { period: key, count: 0, amount: 0 };
                }
                grouped[key].count++;
                grouped[key].amount += Number(item.amount);
            });
            return Object.values(grouped).sort(function (a, b) { return a.period.localeCompare(b.period); });
        };
        return AdminService_1;
    }());
    __setFunctionName(_classThis, "AdminService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminService = _classThis;
}();
exports.AdminService = AdminService;
var templateObject_1;
