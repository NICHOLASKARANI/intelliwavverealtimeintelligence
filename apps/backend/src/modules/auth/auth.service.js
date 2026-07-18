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
exports.AuthService = void 0;
// apps/backend/src/modules/auth/auth.service.ts
var common_1 = require("@nestjs/common");
var shared_1 = require("@intelliwave/shared");
var bcrypt = require("bcrypt");
var otplib_1 = require("otplib");
var AuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(prisma, jwtService, configService, emailService) {
            this.prisma = prisma;
            this.jwtService = jwtService;
            this.configService = configService;
            this.emailService = emailService;
            this.logger = new common_1.Logger(AuthService.name);
            this.encryptionKey = this.configService.get('ENCRYPTION_KEY');
            this.encryptionIv = this.configService.get('ENCRYPTION_IV');
        }
        AuthService_1.prototype.register = function (registerDto, ipAddress) {
            return __awaiter(this, void 0, void 0, function () {
                var email, username, password, firstName, lastName, existingUser, passwordHash, referralCode, user, tokens;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = registerDto.email, username = registerDto.username, password = registerDto.password, firstName = registerDto.firstName, lastName = registerDto.lastName;
                            // Validate email format
                            if (!shared_1.ValidationUtil.isValidEmail(email)) {
                                throw new common_1.BadRequestException('Invalid email format');
                            }
                            // Validate password strength
                            if (!shared_1.ValidationUtil.isValidPassword(password)) {
                                throw new common_1.BadRequestException('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
                            }
                            return [4 /*yield*/, this.prisma.user.findFirst({
                                    where: {
                                        OR: [{ email: email }, { username: username }],
                                    },
                                })];
                        case 1:
                            existingUser = _a.sent();
                            if (existingUser) {
                                if (existingUser.email === email) {
                                    throw new common_1.BadRequestException('Email already registered');
                                }
                                throw new common_1.BadRequestException('Username already taken');
                            }
                            return [4 /*yield*/, bcrypt.hash(password, 12)];
                        case 2:
                            passwordHash = _a.sent();
                            referralCode = shared_1.EncryptionUtil.generateToken(8).toUpperCase();
                            return [4 /*yield*/, this.prisma.user.create({
                                    data: {
                                        email: email,
                                        username: username,
                                        passwordHash: passwordHash,
                                        firstName: firstName,
                                        lastName: lastName,
                                        referralCode: referralCode,
                                        status: 'PENDING_VERIFICATION',
                                    },
                                })];
                        case 3:
                            user = _a.sent();
                            // Create default portfolio
                            return [4 /*yield*/, this.prisma.portfolio.create({
                                    data: {
                                        userId: user.id,
                                        name: 'Main Portfolio',
                                    },
                                })];
                        case 4:
                            // Create default portfolio
                            _a.sent();
                            // Create default risk profile
                            return [4 /*yield*/, this.prisma.riskProfile.create({
                                    data: {
                                        userId: user.id,
                                        name: 'Default',
                                    },
                                })];
                        case 5:
                            // Create default risk profile
                            _a.sent();
                            // Send verification email
                            return [4 /*yield*/, this.sendVerificationEmail(user)];
                        case 6:
                            // Send verification email
                            _a.sent();
                            // Log audit
                            return [4 /*yield*/, this.createAuditLog(user.id, 'REGISTER', 'User', user.id, ipAddress)];
                        case 7:
                            // Log audit
                            _a.sent();
                            return [4 /*yield*/, this.generateTokens(user.id, user.email, user.role)];
                        case 8:
                            tokens = _a.sent();
                            return [2 /*return*/, __assign({ user: this.sanitizeUser(user) }, tokens)];
                    }
                });
            });
        };
        AuthService_1.prototype.login = function (loginDto, ipAddress, userAgent) {
            return __awaiter(this, void 0, void 0, function () {
                var email, password, twoFactorCode, user, isPasswordValid, is2FAValid, tokens;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = loginDto.email, password = loginDto.password, twoFactorCode = loginDto.twoFactorCode;
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { email: email },
                                })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.UnauthorizedException('Invalid credentials');
                            }
                            // Check account status
                            if (user.status === 'BANNED') {
                                throw new common_1.ForbiddenException('Account has been banned');
                            }
                            if (user.status === 'DELETED') {
                                throw new common_1.ForbiddenException('Account has been deleted');
                            }
                            return [4 /*yield*/, bcrypt.compare(password, user.passwordHash)];
                        case 2:
                            isPasswordValid = _a.sent();
                            if (!!isPasswordValid) return [3 /*break*/, 4];
                            // Log failed attempt
                            return [4 /*yield*/, this.logFailedLogin(user.id, ipAddress)];
                        case 3:
                            // Log failed attempt
                            _a.sent();
                            throw new common_1.UnauthorizedException('Invalid credentials');
                        case 4:
                            // Check 2FA
                            if (user.twoFactorEnabled) {
                                if (!twoFactorCode) {
                                    return [2 /*return*/, {
                                            requires2FA: true,
                                            userId: user.id,
                                        }];
                                }
                                is2FAValid = otplib_1.authenticator.verify({
                                    token: twoFactorCode,
                                    secret: user.twoFactorSecret,
                                });
                                if (!is2FAValid) {
                                    throw new common_1.UnauthorizedException('Invalid 2FA code');
                                }
                            }
                            // Update last login
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: user.id },
                                    data: {
                                        lastLoginAt: new Date(),
                                        lastLoginIp: ipAddress,
                                    },
                                })];
                        case 5:
                            // Update last login
                            _a.sent();
                            if (!userAgent) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.createDeviceSession(user.id, userAgent, ipAddress)];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7: return [4 /*yield*/, this.generateTokens(user.id, user.email, user.role)];
                        case 8:
                            tokens = _a.sent();
                            // Log audit
                            return [4 /*yield*/, this.createAuditLog(user.id, 'LOGIN', 'User', user.id, ipAddress)];
                        case 9:
                            // Log audit
                            _a.sent();
                            // Send login alert
                            return [4 /*yield*/, this.sendLoginAlert(user, ipAddress, userAgent)];
                        case 10:
                            // Send login alert
                            _a.sent();
                            return [2 /*return*/, __assign({ user: this.sanitizeUser(user) }, tokens)];
                    }
                });
            });
        };
        AuthService_1.prototype.refreshToken = function (refreshTokenDto) {
            return __awaiter(this, void 0, void 0, function () {
                var refreshToken, payload, storedToken, user, tokens, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            refreshToken = refreshTokenDto.refreshToken;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 5, , 6]);
                            payload = this.jwtService.verify(refreshToken, {
                                secret: this.configService.get('JWT_REFRESH_SECRET'),
                            });
                            return [4 /*yield*/, this.prisma.refreshToken.findUnique({
                                    where: { token: refreshToken },
                                    include: { user: true },
                                })];
                        case 2:
                            storedToken = _a.sent();
                            if (!storedToken || storedToken.revoked || storedToken.expiresAt < new Date()) {
                                throw new common_1.UnauthorizedException('Invalid refresh token');
                            }
                            // Revoke old refresh token
                            return [4 /*yield*/, this.prisma.refreshToken.update({
                                    where: { id: storedToken.id },
                                    data: { revoked: true },
                                })];
                        case 3:
                            // Revoke old refresh token
                            _a.sent();
                            user = storedToken.user;
                            return [4 /*yield*/, this.generateTokens(user.id, user.email, user.role)];
                        case 4:
                            tokens = _a.sent();
                            return [2 /*return*/, tokens];
                        case 5:
                            error_1 = _a.sent();
                            throw new common_1.UnauthorizedException('Invalid refresh token');
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.logout = function (userId, refreshToken) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!refreshToken) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.prisma.refreshToken.updateMany({
                                    where: {
                                        userId: userId,
                                        token: refreshToken,
                                    },
                                    data: { revoked: true },
                                })];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 2: 
                        // Revoke all refresh tokens
                        return [4 /*yield*/, this.prisma.refreshToken.updateMany({
                                where: { userId: userId },
                                data: { revoked: true },
                            })];
                        case 3:
                            // Revoke all refresh tokens
                            _a.sent();
                            _a.label = 4;
                        case 4: 
                        // Delete all sessions
                        return [4 /*yield*/, this.prisma.session.deleteMany({
                                where: { userId: userId },
                            })];
                        case 5:
                            // Delete all sessions
                            _a.sent();
                            return [2 /*return*/, { message: 'Logged out successfully' }];
                    }
                });
            });
        };
        AuthService_1.prototype.changePassword = function (userId, changePasswordDto) {
            return __awaiter(this, void 0, void 0, function () {
                var currentPassword, newPassword, user, isCurrentPasswordValid, newPasswordHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            currentPassword = changePasswordDto.currentPassword, newPassword = changePasswordDto.newPassword;
                            // Validate new password
                            if (!shared_1.ValidationUtil.isValidPassword(newPassword)) {
                                throw new common_1.BadRequestException('New password must be at least 8 characters with uppercase, lowercase, number, and special character');
                            }
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { id: userId },
                                })];
                        case 1:
                            user = _a.sent();
                            return [4 /*yield*/, bcrypt.compare(currentPassword, user.passwordHash)];
                        case 2:
                            isCurrentPasswordValid = _a.sent();
                            if (!isCurrentPasswordValid) {
                                throw new common_1.BadRequestException('Current password is incorrect');
                            }
                            return [4 /*yield*/, bcrypt.hash(newPassword, 12)];
                        case 3:
                            newPasswordHash = _a.sent();
                            // Update password
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: userId },
                                    data: { passwordHash: newPasswordHash },
                                })];
                        case 4:
                            // Update password
                            _a.sent();
                            // Revoke all refresh tokens for security
                            return [4 /*yield*/, this.prisma.refreshToken.updateMany({
                                    where: { userId: userId },
                                    data: { revoked: true },
                                })];
                        case 5:
                            // Revoke all refresh tokens for security
                            _a.sent();
                            // Send password change notification
                            return [4 /*yield*/, this.sendSecurityAlert(user, 'Password changed')];
                        case 6:
                            // Send password change notification
                            _a.sent();
                            return [2 /*return*/, { message: 'Password changed successfully' }];
                    }
                });
            });
        };
        AuthService_1.prototype.forgotPassword = function (forgotPasswordDto) {
            return __awaiter(this, void 0, void 0, function () {
                var email, user, resetToken, resetTokenExpiry;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = forgotPasswordDto.email;
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { email: email },
                                })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                // Return success even if user not found (security best practice)
                                return [2 /*return*/, { message: 'If the email exists, a reset link has been sent' }];
                            }
                            resetToken = shared_1.EncryptionUtil.generateToken(32);
                            resetTokenExpiry = shared_1.DateUtil.addHours(new Date(), 1);
                            // Store reset token
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: user.id },
                                    data: {
                                        metadata: {
                                            resetToken: resetToken,
                                            resetTokenExpiry: resetTokenExpiry.toISOString(),
                                        },
                                    },
                                })];
                        case 2:
                            // Store reset token
                            _a.sent();
                            // Send reset email
                            return [4 /*yield*/, this.emailService.sendPasswordResetEmail(user.email, resetToken)];
                        case 3:
                            // Send reset email
                            _a.sent();
                            return [2 /*return*/, { message: 'If the email exists, a reset link has been sent' }];
                    }
                });
            });
        };
        AuthService_1.prototype.resetPassword = function (resetPasswordDto) {
            return __awaiter(this, void 0, void 0, function () {
                var token, newPassword, users, user, passwordHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            token = resetPasswordDto.token, newPassword = resetPasswordDto.newPassword;
                            // Validate password
                            if (!shared_1.ValidationUtil.isValidPassword(newPassword)) {
                                throw new common_1.BadRequestException('Invalid password format');
                            }
                            return [4 /*yield*/, this.prisma.user.findMany({
                                    where: {
                                        metadata: {
                                            path: ['resetToken'],
                                            equals: token,
                                        },
                                    },
                                })];
                        case 1:
                            users = _a.sent();
                            user = users.find(function (u) {
                                var metadata = u.metadata;
                                return (metadata === null || metadata === void 0 ? void 0 : metadata.resetTokenExpiry) && new Date(metadata.resetTokenExpiry) > new Date();
                            });
                            if (!user) {
                                throw new common_1.BadRequestException('Invalid or expired reset token');
                            }
                            return [4 /*yield*/, bcrypt.hash(newPassword, 12)];
                        case 2:
                            passwordHash = _a.sent();
                            // Update password and clear reset token
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: user.id },
                                    data: {
                                        passwordHash: passwordHash,
                                        metadata: {
                                            resetToken: null,
                                            resetTokenExpiry: null,
                                        },
                                    },
                                })];
                        case 3:
                            // Update password and clear reset token
                            _a.sent();
                            // Revoke all refresh tokens
                            return [4 /*yield*/, this.prisma.refreshToken.updateMany({
                                    where: { userId: user.id },
                                    data: { revoked: true },
                                })];
                        case 4:
                            // Revoke all refresh tokens
                            _a.sent();
                            return [2 /*return*/, { message: 'Password reset successfully' }];
                    }
                });
            });
        };
        AuthService_1.prototype.enable2FA = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var user, secret, otpauthUrl;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { id: userId },
                            })];
                        case 1:
                            user = _a.sent();
                            if (user.twoFactorEnabled) {
                                throw new common_1.BadRequestException('2FA is already enabled');
                            }
                            secret = otplib_1.authenticator.generateSecret();
                            otpauthUrl = otplib_1.authenticator.keyuri(user.email, 'IntelliWave ITIS', secret);
                            // Store secret temporarily
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: userId },
                                    data: {
                                        metadata: {
                                            twoFactorTempSecret: secret,
                                        },
                                    },
                                })];
                        case 2:
                            // Store secret temporarily
                            _a.sent();
                            return [2 /*return*/, {
                                    secret: secret,
                                    otpauthUrl: otpauthUrl,
                                    qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=".concat(encodeURIComponent(otpauthUrl), "&size=200x200"),
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.verify2FA = function (userId, verify2FADto) {
            return __awaiter(this, void 0, void 0, function () {
                var code, user, metadata, secret, isValid, backupCodes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            code = verify2FADto.code;
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { id: userId },
                                })];
                        case 1:
                            user = _a.sent();
                            metadata = user.metadata;
                            secret = metadata === null || metadata === void 0 ? void 0 : metadata.twoFactorTempSecret;
                            if (!secret) {
                                throw new common_1.BadRequestException('2FA setup not initiated');
                            }
                            isValid = otplib_1.authenticator.verify({
                                token: code,
                                secret: secret,
                            });
                            if (!isValid) {
                                throw new common_1.BadRequestException('Invalid 2FA code');
                            }
                            // Enable 2FA
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: userId },
                                    data: {
                                        twoFactorEnabled: true,
                                        twoFactorSecret: secret,
                                        metadata: {
                                            twoFactorTempSecret: null,
                                        },
                                    },
                                })];
                        case 2:
                            // Enable 2FA
                            _a.sent();
                            backupCodes = Array.from({ length: 8 }, function () {
                                return shared_1.EncryptionUtil.generateToken(4).toUpperCase();
                            });
                            return [2 /*return*/, {
                                    message: '2FA enabled successfully',
                                    backupCodes: backupCodes,
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.disable2FA = function (userId, code) {
            return __awaiter(this, void 0, void 0, function () {
                var user, isValid;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { id: userId },
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user.twoFactorEnabled) {
                                throw new common_1.BadRequestException('2FA is not enabled');
                            }
                            isValid = otplib_1.authenticator.verify({
                                token: code,
                                secret: user.twoFactorSecret,
                            });
                            if (!isValid) {
                                throw new common_1.BadRequestException('Invalid 2FA code');
                            }
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: userId },
                                    data: {
                                        twoFactorEnabled: false,
                                        twoFactorSecret: null,
                                    },
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: '2FA disabled successfully' }];
                    }
                });
            });
        };
        AuthService_1.prototype.getSessions = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.deviceSession.findMany({
                            where: { userId: userId },
                            orderBy: { lastActive: 'desc' },
                        })];
                });
            });
        };
        AuthService_1.prototype.revokeSession = function (userId, sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.deviceSession.deleteMany({
                                where: {
                                    id: sessionId,
                                    userId: userId,
                                },
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { message: 'Session revoked successfully' }];
                    }
                });
            });
        };
        // Private helper methods
        AuthService_1.prototype.generateTokens = function (userId, email, role) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, accessToken, refreshToken;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.jwtService.signAsync({
                                    sub: userId,
                                    email: email,
                                    role: role,
                                    type: 'access',
                                }, {
                                    secret: this.configService.get('JWT_SECRET'),
                                    expiresIn: this.configService.get('JWT_EXPIRATION', '15m'),
                                }),
                                this.jwtService.signAsync({
                                    sub: userId,
                                    email: email,
                                    role: role,
                                    type: 'refresh',
                                }, {
                                    secret: this.configService.get('JWT_REFRESH_SECRET'),
                                    expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION', '7d'),
                                }),
                            ])];
                        case 1:
                            _a = _b.sent(), accessToken = _a[0], refreshToken = _a[1];
                            // Store refresh token
                            return [4 /*yield*/, this.prisma.refreshToken.create({
                                    data: {
                                        userId: userId,
                                        token: refreshToken,
                                        expiresAt: shared_1.DateUtil.addDays(new Date(), 7),
                                    },
                                })];
                        case 2:
                            // Store refresh token
                            _b.sent();
                            // Create session
                            return [4 /*yield*/, this.prisma.session.create({
                                    data: {
                                        userId: userId,
                                        token: accessToken,
                                        expiresAt: shared_1.DateUtil.addMinutes(new Date(), 15),
                                    },
                                })];
                        case 3:
                            // Create session
                            _b.sent();
                            return [2 /*return*/, {
                                    accessToken: accessToken,
                                    refreshToken: refreshToken,
                                    expiresIn: 900, // 15 minutes in seconds
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.createDeviceSession = function (userId, userAgent, ipAddress) {
            return __awaiter(this, void 0, void 0, function () {
                var deviceId, deviceInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            deviceId = shared_1.EncryptionUtil.generateToken(16);
                            deviceInfo = this.parseUserAgent(userAgent);
                            return [4 /*yield*/, this.prisma.deviceSession.create({
                                    data: {
                                        userId: userId,
                                        deviceId: deviceId,
                                        deviceName: deviceInfo.name,
                                        deviceType: deviceInfo.type,
                                        ipAddress: ipAddress,
                                        lastActive: new Date(),
                                    },
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.parseUserAgent = function (userAgent) {
            // Simple user agent parsing (in production, use a library like ua-parser-js)
            var name = 'Unknown Device';
            var type = 'Unknown';
            if (userAgent.includes('Windows')) {
                name = 'Windows PC';
                type = 'Desktop';
            }
            else if (userAgent.includes('Macintosh')) {
                name = 'Mac';
                type = 'Desktop';
            }
            else if (userAgent.includes('Linux')) {
                name = 'Linux PC';
                type = 'Desktop';
            }
            else if (userAgent.includes('iPhone')) {
                name = 'iPhone';
                type = 'Mobile';
            }
            else if (userAgent.includes('iPad')) {
                name = 'iPad';
                type = 'Tablet';
            }
            else if (userAgent.includes('Android')) {
                name = 'Android Device';
                type = 'Mobile';
            }
            return { name: name, type: type };
        };
        AuthService_1.prototype.sendVerificationEmail = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                var verificationToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            verificationToken = shared_1.EncryptionUtil.generateToken(32);
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: user.id },
                                    data: {
                                        metadata: {
                                            verificationToken: verificationToken,
                                            verificationTokenExpiry: shared_1.DateUtil.addHours(new Date(), 24).toISOString(),
                                        },
                                    },
                                })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.emailService.sendVerificationEmail(user.email, verificationToken)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.sendLoginAlert = function (user, ipAddress, userAgent) {
            return __awaiter(this, void 0, void 0, function () {
                var error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.emailService.sendLoginAlert(user.email, {
                                    time: new Date().toISOString(),
                                    ip: ipAddress || 'Unknown',
                                    device: userAgent || 'Unknown',
                                })];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _a.sent();
                            this.logger.error("Failed to send login alert: ".concat(error_2.message));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.sendSecurityAlert = function (user, action) {
            return __awaiter(this, void 0, void 0, function () {
                var error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.emailService.sendSecurityAlert(user.email, {
                                    action: action,
                                    time: new Date().toISOString(),
                                })];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            this.logger.error("Failed to send security alert: ".concat(error_3.message));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.logFailedLogin = function (userId, ipAddress) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.auditLog.create({
                                data: {
                                    userId: userId,
                                    action: 'LOGIN',
                                    entity: 'User',
                                    entityId: userId,
                                    ipAddress: ipAddress,
                                    metadata: { status: 'FAILED' },
                                },
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.createAuditLog = function (userId, action, entity, entityId, ipAddress, metadata) {
            return __awaiter(this, void 0, void 0, function () {
                var error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.prisma.auditLog.create({
                                    data: {
                                        userId: userId,
                                        action: action,
                                        entity: entity,
                                        entityId: entityId,
                                        ipAddress: ipAddress,
                                        metadata: metadata,
                                    },
                                })];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_4 = _a.sent();
                            this.logger.error("Failed to create audit log: ".concat(error_4.message));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.sanitizeUser = function (user) {
            var passwordHash = user.passwordHash, twoFactorSecret = user.twoFactorSecret, metadata = user.metadata, safeUser = __rest(user, ["passwordHash", "twoFactorSecret", "metadata"]);
            return safeUser;
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
exports.AuthService = AuthService;
