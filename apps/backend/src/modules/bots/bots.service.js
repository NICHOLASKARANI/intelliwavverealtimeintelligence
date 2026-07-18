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
exports.BotsService = void 0;
// apps/backend/src/modules/bots/bots.service.ts
var common_1 = require("@nestjs/common");
var BotsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var BotsService = _classThis = /** @class */ (function () {
        function BotsService_1(prisma) {
            this.prisma = prisma;
            this.logger = new common_1.Logger(BotsService.name);
        }
        BotsService_1.prototype.createBot = function (userId, createBotDto) {
            return __awaiter(this, void 0, void 0, function () {
                var strategy, account, bot;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.strategy.findFirst({
                                where: { id: createBotDto.strategyId, userId: userId },
                            })];
                        case 1:
                            strategy = _a.sent();
                            if (!strategy) {
                                throw new common_1.NotFoundException('Strategy not found');
                            }
                            return [4 /*yield*/, this.prisma.tradingAccount.findFirst({
                                    where: { id: createBotDto.tradingAccountId, userId: userId },
                                })];
                        case 2:
                            account = _a.sent();
                            if (!account) {
                                throw new common_1.NotFoundException('Trading account not found');
                            }
                            return [4 /*yield*/, this.prisma.bot.create({
                                    data: {
                                        userId: userId,
                                        name: createBotDto.name,
                                        description: createBotDto.description,
                                        strategyId: createBotDto.strategyId,
                                        tradingAccountId: createBotDto.tradingAccountId,
                                        riskProfileId: createBotDto.riskProfileId,
                                        config: createBotDto.config || {},
                                        capital: createBotDto.capital,
                                        maxDrawdown: createBotDto.maxDrawdown || 20,
                                        dailyLossLimit: createBotDto.dailyLossLimit || 5,
                                        takeProfit: createBotDto.takeProfit,
                                        stopLoss: createBotDto.stopLoss,
                                        maxPositions: createBotDto.maxPositions || 5,
                                    },
                                })];
                        case 3:
                            bot = _a.sent();
                            return [2 /*return*/, bot];
                    }
                });
            });
        };
        BotsService_1.prototype.getUserBots = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.bot.findMany({
                            where: { userId: userId },
                            include: {
                                strategy: true,
                                tradingAccount: true,
                                riskProfile: true,
                                _count: {
                                    select: {
                                        runs: true,
                                        trades: true,
                                    },
                                },
                            },
                            orderBy: { createdAt: 'desc' },
                        })];
                });
            });
        };
        BotsService_1.prototype.getBotById = function (userId, botId) {
            return __awaiter(this, void 0, void 0, function () {
                var bot;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.bot.findFirst({
                                where: { id: botId, userId: userId },
                                include: {
                                    strategy: true,
                                    tradingAccount: true,
                                    riskProfile: true,
                                    runs: {
                                        orderBy: { startTime: 'desc' },
                                        take: 10,
                                    },
                                    positions: {
                                        where: { isOpen: true },
                                    },
                                    _count: {
                                        select: {
                                            trades: true,
                                            orders: true,
                                        },
                                    },
                                },
                            })];
                        case 1:
                            bot = _a.sent();
                            if (!bot) {
                                throw new common_1.NotFoundException('Bot not found');
                            }
                            return [2 /*return*/, bot];
                    }
                });
            });
        };
        BotsService_1.prototype.updateBot = function (userId, botId, updateBotDto) {
            return __awaiter(this, void 0, void 0, function () {
                var bot;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.bot.findFirst({
                                where: { id: botId, userId: userId },
                            })];
                        case 1:
                            bot = _a.sent();
                            if (!bot) {
                                throw new common_1.NotFoundException('Bot not found');
                            }
                            if (bot.status === 'ACTIVE') {
                                throw new common_1.BadRequestException('Cannot update active bot. Stop it first.');
                            }
                            return [2 /*return*/, this.prisma.bot.update({
                                    where: { id: botId },
                                    data: updateBotDto,
                                })];
                    }
                });
            });
        };
        BotsService_1.prototype.startBot = function (userId, botId) {
            return __awaiter(this, void 0, void 0, function () {
                var bot, run;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.bot.findFirst({
                                where: { id: botId, userId: userId },
                            })];
                        case 1:
                            bot = _a.sent();
                            if (!bot) {
                                throw new common_1.NotFoundException('Bot not found');
                            }
                            if (bot.status === 'ACTIVE') {
                                throw new common_1.BadRequestException('Bot is already running');
                            }
                            // Validate bot configuration
                            return [4 /*yield*/, this.validateBotConfig(bot)];
                        case 2:
                            // Validate bot configuration
                            _a.sent();
                            return [4 /*yield*/, this.prisma.botRun.create({
                                    data: {
                                        botId: botId,
                                        status: 'RUNNING',
                                        startTime: new Date(),
                                    },
                                })];
                        case 3:
                            run = _a.sent();
                            // Update bot status
                            return [4 /*yield*/, this.prisma.bot.update({
                                    where: { id: botId },
                                    data: {
                                        status: 'ACTIVE',
                                        isActive: true,
                                        lastRunAt: new Date(),
                                    },
                                })];
                        case 4:
                            // Update bot status
                            _a.sent();
                            // Publish bot start event to Redis for engine
                            // await this.redis.publish('bot:start', { botId, userId, runId: run.id });
                            return [2 /*return*/, { bot: bot, run: run }];
                    }
                });
            });
        };
        BotsService_1.prototype.stopBot = function (userId, botId) {
            return __awaiter(this, void 0, void 0, function () {
                var bot, currentRun;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.bot.findFirst({
                                where: { id: botId, userId: userId, status: 'ACTIVE' },
                            })];
                        case 1:
                            bot = _a.sent();
                            if (!bot) {
                                throw new common_1.NotFoundException('Active bot not found');
                            }
                            return [4 /*yield*/, this.prisma.botRun.findFirst({
                                    where: { botId: botId, status: 'RUNNING' },
                                    orderBy: { startTime: 'desc' },
                                })];
                        case 2:
                            currentRun = _a.sent();
                            if (!currentRun) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.prisma.botRun.update({
                                    where: { id: currentRun.id },
                                    data: {
                                        status: 'STOPPED',
                                        endTime: new Date(),
                                    },
                                })];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: 
                        // Update bot status
                        return [4 /*yield*/, this.prisma.bot.update({
                                where: { id: botId },
                                data: {
                                    status: 'STOPPED',
                                    isActive: false,
                                },
                            })];
                        case 5:
                            // Update bot status
                            _a.sent();
                            return [2 /*return*/, { message: 'Bot stopped successfully' }];
                    }
                });
            });
        };
        BotsService_1.prototype.deleteBot = function (userId, botId) {
            return __awaiter(this, void 0, void 0, function () {
                var bot;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.bot.findFirst({
                                where: { id: botId, userId: userId },
                            })];
                        case 1:
                            bot = _a.sent();
                            if (!bot) {
                                throw new common_1.NotFoundException('Bot not found');
                            }
                            if (bot.status === 'ACTIVE') {
                                throw new common_1.BadRequestException('Stop the bot before deleting');
                            }
                            return [4 /*yield*/, this.prisma.bot.delete({
                                    where: { id: botId },
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: 'Bot deleted successfully' }];
                    }
                });
            });
        };
        BotsService_1.prototype.getBotPerformance = function (userId, botId) {
            return __awaiter(this, void 0, void 0, function () {
                var bot, trades, winningTrades, losingTrades, totalPnL, winRate, avgWin, avgLoss, profitFactor;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.bot.findFirst({
                                where: { id: botId, userId: userId },
                            })];
                        case 1:
                            bot = _a.sent();
                            if (!bot) {
                                throw new common_1.NotFoundException('Bot not found');
                            }
                            return [4 /*yield*/, this.prisma.trade.findMany({
                                    where: {
                                        userId: userId,
                                        position: {
                                            botId: botId,
                                        },
                                    },
                                })];
                        case 2:
                            trades = _a.sent();
                            winningTrades = trades.filter(function (t) { return t.pnl > 0; });
                            losingTrades = trades.filter(function (t) { return t.pnl < 0; });
                            totalPnL = trades.reduce(function (sum, t) { return sum + Number(t.pnl); }, 0);
                            winRate = trades.length > 0 ? (winningTrades.length / trades.length) * 100 : 0;
                            avgWin = winningTrades.length > 0
                                ? winningTrades.reduce(function (sum, t) { return sum + Number(t.pnl); }, 0) / winningTrades.length
                                : 0;
                            avgLoss = losingTrades.length > 0
                                ? Math.abs(losingTrades.reduce(function (sum, t) { return sum + Number(t.pnl); }, 0) / losingTrades.length)
                                : 0;
                            profitFactor = avgLoss > 0 ? avgWin / avgLoss : 0;
                            return [2 /*return*/, {
                                    totalTrades: trades.length,
                                    winningTrades: winningTrades.length,
                                    losingTrades: losingTrades.length,
                                    totalPnL: totalPnL,
                                    winRate: winRate,
                                    avgWin: avgWin,
                                    avgLoss: avgLoss,
                                    profitFactor: profitFactor,
                                    bot: {
                                        name: bot.name,
                                        status: bot.status,
                                        capital: bot.capital,
                                    },
                                }];
                    }
                });
            });
        };
        BotsService_1.prototype.duplicateBot = function (userId, botId) {
            return __awaiter(this, void 0, void 0, function () {
                var bot, newBot;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.bot.findFirst({
                                where: { id: botId, userId: userId },
                            })];
                        case 1:
                            bot = _a.sent();
                            if (!bot) {
                                throw new common_1.NotFoundException('Bot not found');
                            }
                            return [4 /*yield*/, this.prisma.bot.create({
                                    data: {
                                        userId: bot.userId,
                                        name: "".concat(bot.name, " (Copy)"),
                                        description: bot.description,
                                        strategyId: bot.strategyId,
                                        tradingAccountId: bot.tradingAccountId,
                                        riskProfileId: bot.riskProfileId,
                                        config: bot.config,
                                        capital: bot.capital,
                                        maxDrawdown: bot.maxDrawdown,
                                        dailyLossLimit: bot.dailyLossLimit,
                                        takeProfit: bot.takeProfit,
                                        stopLoss: bot.stopLoss,
                                        maxPositions: bot.maxPositions,
                                    },
                                })];
                        case 2:
                            newBot = _a.sent();
                            return [2 /*return*/, newBot];
                    }
                });
            });
        };
        BotsService_1.prototype.validateBotConfig = function (bot) {
            return __awaiter(this, void 0, void 0, function () {
                var strategy, account, user, activeBots, botLimit;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.strategy.findUnique({
                                where: { id: bot.strategyId },
                            })];
                        case 1:
                            strategy = _b.sent();
                            if (!strategy) {
                                throw new common_1.BadRequestException('Strategy not found');
                            }
                            return [4 /*yield*/, this.prisma.tradingAccount.findUnique({
                                    where: { id: bot.tradingAccountId },
                                })];
                        case 2:
                            account = _b.sent();
                            if (!account) {
                                throw new common_1.BadRequestException('Trading account not found');
                            }
                            if (account.balance < bot.capital) {
                                throw new common_1.BadRequestException("Insufficient balance. Required: ".concat(bot.capital, ", Available: ").concat(account.balance));
                            }
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { id: bot.userId },
                                    include: {
                                        subscriptions: {
                                            where: { status: 'ACTIVE' },
                                        },
                                    },
                                })];
                        case 3:
                            user = _b.sent();
                            return [4 /*yield*/, this.prisma.bot.count({
                                    where: {
                                        userId: bot.userId,
                                        status: 'ACTIVE',
                                    },
                                })];
                        case 4:
                            activeBots = _b.sent();
                            botLimit = this.getBotLimit(((_a = user.subscriptions[0]) === null || _a === void 0 ? void 0 : _a.plan) || 'FREE');
                            if (activeBots >= botLimit) {
                                throw new common_1.BadRequestException("Bot limit (".concat(botLimit, ") reached for your subscription plan"));
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        BotsService_1.prototype.getBotLimit = function (plan) {
            switch (plan) {
                case 'ENTERPRISE': return 100;
                case 'PROFESSIONAL': return 25;
                case 'STARTER': return 5;
                default: return 1;
            }
        };
        return BotsService_1;
    }());
    __setFunctionName(_classThis, "BotsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BotsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BotsService = _classThis;
}();
exports.BotsService = BotsService;
