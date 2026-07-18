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
exports.DerivGateway = void 0;
// apps/backend/src/modules/socket/deriv.gateway.ts
var websockets_1 = require("@nestjs/websockets");
var common_1 = require("@nestjs/common");
var DerivGateway = function () {
    var _classDecorators = [(0, websockets_1.WebSocketGateway)({
            namespace: '/deriv',
            cors: {
                origin: '*',
                credentials: true,
            },
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _server_decorators;
    var _server_initializers = [];
    var _server_extraInitializers = [];
    var _handleSubscribeTicks_decorators;
    var _handleUnsubscribeTicks_decorators;
    var DerivGateway = _classThis = /** @class */ (function () {
        function DerivGateway_1(derivService) {
            this.derivService = (__runInitializers(this, _instanceExtraInitializers), derivService);
            this.server = __runInitializers(this, _server_initializers, void 0);
            this.logger = (__runInitializers(this, _server_extraInitializers), new common_1.Logger(DerivGateway.name));
            this.userSockets = new Map();
            this.subscriptions = new Map();
        }
        DerivGateway_1.prototype.handleConnection = function (client) {
            return __awaiter(this, void 0, void 0, function () {
                var token;
                return __generator(this, function (_a) {
                    this.logger.log("Client connected: ".concat(client.id));
                    try {
                        token = client.handshake.auth.token;
                        if (!token) {
                            client.disconnect();
                            return [2 /*return*/];
                        }
                        // Verify token (implement JWT verification)
                        // const user = await this.verifyToken(token);
                        client.emit('connected', { message: 'Connected to Deriv stream' });
                    }
                    catch (error) {
                        this.logger.error("Connection error: ".concat(error.message));
                        client.disconnect();
                    }
                    return [2 /*return*/];
                });
            });
        };
        DerivGateway_1.prototype.handleDisconnect = function (client) {
            this.logger.log("Client disconnected: ".concat(client.id));
            // Clean up subscriptions
            for (var _i = 0, _a = this.userSockets.entries(); _i < _a.length; _i++) {
                var _b = _a[_i], userId = _b[0], sockets = _b[1];
                sockets.delete(client.id);
                if (sockets.size === 0) {
                    this.userSockets.delete(userId);
                    this.cleanupSubscriptions(userId);
                }
            }
        };
        DerivGateway_1.prototype.handleSubscribeTicks = function (client, data) {
            return __awaiter(this, void 0, void 0, function () {
                var subscriptionId, key, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.derivService.subscribeTicks(data.userId, data.symbol, function (tick) {
                                    client.emit('tick', { symbol: data.symbol, data: tick });
                                })];
                        case 1:
                            subscriptionId = _a.sent();
                            key = "".concat(data.userId, ":ticks:").concat(data.symbol);
                            this.subscriptions.set(key, subscriptionId);
                            return [2 /*return*/, { success: true, subscriptionId: subscriptionId }];
                        case 2:
                            error_1 = _a.sent();
                            return [2 /*return*/, { success: false, error: error_1.message }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        DerivGateway_1.prototype.handleUnsubscribeTicks = function (client, data) {
            return __awaiter(this, void 0, void 0, function () {
                var key, subscriptionId;
                return __generator(this, function (_a) {
                    key = "".concat(data.userId, ":ticks:").concat(data.symbol);
                    subscriptionId = this.subscriptions.get(key);
                    if (subscriptionId) {
                        // Unsubscribe logic
                        this.subscriptions.delete(key);
                    }
                    return [2 /*return*/, { success: true }];
                });
            });
        };
        DerivGateway_1.prototype.cleanupSubscriptions = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, _b, key, subscriptionId;
                return __generator(this, function (_c) {
                    // Clean up all subscriptions for user
                    for (_i = 0, _a = this.subscriptions.entries(); _i < _a.length; _i++) {
                        _b = _a[_i], key = _b[0], subscriptionId = _b[1];
                        if (key.startsWith(userId)) {
                            // Unsubscribe
                            this.subscriptions.delete(key);
                        }
                    }
                    return [2 /*return*/];
                });
            });
        };
        return DerivGateway_1;
    }());
    __setFunctionName(_classThis, "DerivGateway");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _server_decorators = [(0, websockets_1.WebSocketServer)()];
        _handleSubscribeTicks_decorators = [(0, websockets_1.SubscribeMessage)('subscribe:ticks')];
        _handleUnsubscribeTicks_decorators = [(0, websockets_1.SubscribeMessage)('unsubscribe:ticks')];
        __esDecorate(_classThis, null, _handleSubscribeTicks_decorators, { kind: "method", name: "handleSubscribeTicks", static: false, private: false, access: { has: function (obj) { return "handleSubscribeTicks" in obj; }, get: function (obj) { return obj.handleSubscribeTicks; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleUnsubscribeTicks_decorators, { kind: "method", name: "handleUnsubscribeTicks", static: false, private: false, access: { has: function (obj) { return "handleUnsubscribeTicks" in obj; }, get: function (obj) { return obj.handleUnsubscribeTicks; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _server_decorators, { kind: "field", name: "server", static: false, private: false, access: { has: function (obj) { return "server" in obj; }, get: function (obj) { return obj.server; }, set: function (obj, value) { obj.server = value; } }, metadata: _metadata }, _server_initializers, _server_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DerivGateway = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DerivGateway = _classThis;
}();
exports.DerivGateway = DerivGateway;
