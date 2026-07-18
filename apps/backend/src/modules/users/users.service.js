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
exports.UsersService = void 0;
// apps/backend/src/modules/users/users.service.ts
var common_1 = require("@nestjs/common");
var shared_1 = require("@intelliwave/shared");
var UsersService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UsersService = _classThis = /** @class */ (function () {
        function UsersService_1(prisma) {
            this.prisma = prisma;
            this.logger = new common_1.Logger(UsersService.name);
        }
        UsersService_1.prototype.getUserById = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var user, passwordHash, twoFactorSecret, safeUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { id: userId },
                                include: {
                                    derivAccounts: true,
                                    tradingAccounts: true,
                                    subscriptions: {
                                        where: { status: 'ACTIVE' },
                                    },
                                    riskProfiles: true,
                                },
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            passwordHash = user.passwordHash, twoFactorSecret = user.twoFactorSecret, safeUser = __rest(user, ["passwordHash", "twoFactorSecret"]);
                            return [2 /*return*/, safeUser];
                    }
                });
            });
        };
        UsersService_1.prototype.updateUser = function (userId, updateUserDto) {
            return __awaiter(this, void 0, void 0, function () {
                var user, existingUser, updatedUser, passwordHash, twoFactorSecret, safeUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { id: userId },
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            if (!(updateUserDto.username && updateUserDto.username !== user.username)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { username: updateUserDto.username },
                                })];
                        case 2:
                            existingUser = _a.sent();
                            if (existingUser) {
                                throw new common_1.ConflictException('Username already taken');
                            }
                            _a.label = 3;
                        case 3: return [4 /*yield*/, this.prisma.user.update({
                                where: { id: userId },
                                data: {
                                    firstName: updateUserDto.firstName,
                                    lastName: updateUserDto.lastName,
                                    username: updateUserDto.username,
                                    phone: updateUserDto.phone,
                                    avatar: updateUserDto.avatar,
                                },
                            })];
                        case 4:
                            updatedUser = _a.sent();
                            passwordHash = updatedUser.passwordHash, twoFactorSecret = updatedUser.twoFactorSecret, safeUser = __rest(updatedUser, ["passwordHash", "twoFactorSecret"]);
                            return [2 /*return*/, safeUser];
                    }
                });
            });
        };
        UsersService_1.prototype.updatePreferences = function (userId, preferencesDto) {
            return __awaiter(this, void 0, void 0, function () {
                var user, currentMetadata, updatedUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { id: userId },
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            currentMetadata = user.metadata || {};
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: userId },
                                    data: {
                                        metadata: __assign(__assign({}, currentMetadata), { preferences: preferencesDto }),
                                    },
                                })];
                        case 2:
                            updatedUser = _a.sent();
                            return [2 /*return*/, { message: 'Preferences updated successfully' }];
                    }
                });
            });
        };
        UsersService_1.prototype.getTradingAccounts = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.tradingAccount.findMany({
                            where: { userId: userId },
                            include: {
                                positions: {
                                    where: { isOpen: true },
                                },
                            },
                        })];
                });
            });
        };
        UsersService_1.prototype.createTradingAccount = function (userId, data) {
            return __awaiter(this, void 0, void 0, function () {
                var account;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.tradingAccount.create({
                                data: {
                                    userId: userId,
                                    name: data.name,
                                    description: data.description,
                                },
                            })];
                        case 1:
                            account = _a.sent();
                            return [2 /*return*/, account];
                    }
                });
            });
        };
        UsersService_1.prototype.getDerivAccounts = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.derivAccount.findMany({
                            where: { userId: userId, isActive: true },
                        })];
                });
            });
        };
        UsersService_1.prototype.createApiKey = function (userId, createApiKeyDto) {
            return __awaiter(this, void 0, void 0, function () {
                var apiKey, apiSecret, key;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            apiKey = shared_1.EncryptionUtil.generateToken(32);
                            apiSecret = shared_1.EncryptionUtil.generateToken(64);
                            return [4 /*yield*/, this.prisma.apiKey.create({
                                    data: {
                                        userId: userId,
                                        name: createApiKeyDto.name,
                                        key: apiKey,
                                        secret: apiSecret,
                                        permissions: createApiKeyDto.permissions || ['read'],
                                        expiresAt: createApiKeyDto.expiresAt ? new Date(createApiKeyDto.expiresAt) : null,
                                    },
                                })];
                        case 1:
                            key = _a.sent();
                            return [2 /*return*/, {
                                    id: key.id,
                                    name: key.name,
                                    key: apiKey,
                                    secret: apiSecret,
                                    permissions: key.permissions,
                                    expiresAt: key.expiresAt,
                                    message: 'Make sure to save your secret key. You won\'t be able to see it again!',
                                }];
                    }
                });
            });
        };
        UsersService_1.prototype.getApiKeys = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.apiKey.findMany({
                            where: { userId: userId, isActive: true },
                            select: {
                                id: true,
                                name: true,
                                key: true,
                                permissions: true,
                                lastUsedAt: true,
                                expiresAt: true,
                                createdAt: true,
                            },
                        })];
                });
            });
        };
        UsersService_1.prototype.revokeApiKey = function (userId, keyId) {
            return __awaiter(this, void 0, void 0, function () {
                var key;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.apiKey.findFirst({
                                where: { id: keyId, userId: userId },
                            })];
                        case 1:
                            key = _a.sent();
                            if (!key) {
                                throw new common_1.NotFoundException('API key not found');
                            }
                            return [4 /*yield*/, this.prisma.apiKey.update({
                                    where: { id: keyId },
                                    data: { isActive: false },
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: 'API key revoked successfully' }];
                    }
                });
            });
        };
        UsersService_1.prototype.getRiskProfiles = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.riskProfile.findMany({
                            where: { userId: userId },
                        })];
                });
            });
        };
        UsersService_1.prototype.createRiskProfile = function (userId, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.riskProfile.create({
                            data: __assign({ userId: userId }, data),
                        })];
                });
            });
        };
        UsersService_1.prototype.updateRiskProfile = function (userId, profileId, data) {
            return __awaiter(this, void 0, void 0, function () {
                var profile;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.riskProfile.findFirst({
                                where: { id: profileId, userId: userId },
                            })];
                        case 1:
                            profile = _a.sent();
                            if (!profile) {
                                throw new common_1.NotFoundException('Risk profile not found');
                            }
                            return [2 /*return*/, this.prisma.riskProfile.update({
                                    where: { id: profileId },
                                    data: data,
                                })];
                    }
                });
            });
        };
        UsersService_1.prototype.deleteRiskProfile = function (userId, profileId) {
            return __awaiter(this, void 0, void 0, function () {
                var profile, botsUsingProfile;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.riskProfile.findFirst({
                                where: { id: profileId, userId: userId },
                            })];
                        case 1:
                            profile = _a.sent();
                            if (!profile) {
                                throw new common_1.NotFoundException('Risk profile not found');
                            }
                            return [4 /*yield*/, this.prisma.bot.findMany({
                                    where: { riskProfileId: profileId },
                                })];
                        case 2:
                            botsUsingProfile = _a.sent();
                            if (botsUsingProfile.length > 0) {
                                throw new common_1.BadRequestException("Cannot delete risk profile. It's being used by ".concat(botsUsingProfile.length, " bot(s)"));
                            }
                            return [4 /*yield*/, this.prisma.riskProfile.delete({
                                    where: { id: profileId },
                                })];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, { message: 'Risk profile deleted successfully' }];
                    }
                });
            });
        };
        return UsersService_1;
    }());
    __setFunctionName(_classThis, "UsersService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersService = _classThis;
}();
exports.UsersService = UsersService;
