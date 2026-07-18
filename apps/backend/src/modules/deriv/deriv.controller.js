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
exports.DerivController = void 0;
// apps/backend/src/modules/deriv/deriv.controller.ts
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
var DerivController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Deriv Integration'), (0, common_1.Controller)('deriv'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _connectAccount_decorators;
    var _disconnectAccount_decorators;
    var _getBalance_decorators;
    var _getPortfolio_decorators;
    var _getActiveSymbols_decorators;
    var _getCandles_decorators;
    var _buyContract_decorators;
    var _sellContract_decorators;
    var DerivController = _classThis = /** @class */ (function () {
        function DerivController_1(derivService) {
            this.derivService = (__runInitializers(this, _instanceExtraInitializers), derivService);
        }
        DerivController_1.prototype.connectAccount = function (user, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.derivService.addUserConnection(user.id, body.apiToken, body.appId, body.accountType)];
                });
            });
        };
        DerivController_1.prototype.disconnectAccount = function (user, accountType) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.derivService.removeUserConnection(user.id, accountType)];
                });
            });
        };
        DerivController_1.prototype.getBalance = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.derivService.getUserBalance(user.id)];
                });
            });
        };
        DerivController_1.prototype.getPortfolio = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.derivService.getUserPortfolio(user.id)];
                });
            });
        };
        DerivController_1.prototype.getActiveSymbols = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.derivService.getActiveSymbols(user.id)];
                });
            });
        };
        DerivController_1.prototype.getCandles = function (user_1, symbol_1) {
            return __awaiter(this, arguments, void 0, function (user, symbol, granularity, count) {
                if (granularity === void 0) { granularity = 60; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.derivService.getCandles(user.id, symbol, granularity, count)];
                });
            });
        };
        DerivController_1.prototype.buyContract = function (user, tradeRequest) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.derivService.buyContract(user.id, tradeRequest)];
                });
            });
        };
        DerivController_1.prototype.sellContract = function (user, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.derivService.sellContract(user.id, body.contractId, body.price)];
                });
            });
        };
        return DerivController_1;
    }());
    __setFunctionName(_classThis, "DerivController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _connectAccount_decorators = [(0, common_1.Post)('connect'), (0, swagger_1.ApiOperation)({ summary: 'Connect Deriv account' })];
        _disconnectAccount_decorators = [(0, common_1.Delete)('disconnect/:accountType'), (0, swagger_1.ApiOperation)({ summary: 'Disconnect Deriv account' })];
        _getBalance_decorators = [(0, common_1.Get)('balance'), (0, swagger_1.ApiOperation)({ summary: 'Get account balance' })];
        _getPortfolio_decorators = [(0, common_1.Get)('portfolio'), (0, swagger_1.ApiOperation)({ summary: 'Get portfolio' })];
        _getActiveSymbols_decorators = [(0, common_1.Get)('symbols'), (0, swagger_1.ApiOperation)({ summary: 'Get active symbols' })];
        _getCandles_decorators = [(0, common_1.Get)('candles/:symbol'), (0, swagger_1.ApiOperation)({ summary: 'Get candle data' })];
        _buyContract_decorators = [(0, common_1.Post)('trade/buy'), (0, swagger_1.ApiOperation)({ summary: 'Buy contract' })];
        _sellContract_decorators = [(0, common_1.Post)('trade/sell'), (0, swagger_1.ApiOperation)({ summary: 'Sell contract' })];
        __esDecorate(_classThis, null, _connectAccount_decorators, { kind: "method", name: "connectAccount", static: false, private: false, access: { has: function (obj) { return "connectAccount" in obj; }, get: function (obj) { return obj.connectAccount; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _disconnectAccount_decorators, { kind: "method", name: "disconnectAccount", static: false, private: false, access: { has: function (obj) { return "disconnectAccount" in obj; }, get: function (obj) { return obj.disconnectAccount; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getBalance_decorators, { kind: "method", name: "getBalance", static: false, private: false, access: { has: function (obj) { return "getBalance" in obj; }, get: function (obj) { return obj.getBalance; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPortfolio_decorators, { kind: "method", name: "getPortfolio", static: false, private: false, access: { has: function (obj) { return "getPortfolio" in obj; }, get: function (obj) { return obj.getPortfolio; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getActiveSymbols_decorators, { kind: "method", name: "getActiveSymbols", static: false, private: false, access: { has: function (obj) { return "getActiveSymbols" in obj; }, get: function (obj) { return obj.getActiveSymbols; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCandles_decorators, { kind: "method", name: "getCandles", static: false, private: false, access: { has: function (obj) { return "getCandles" in obj; }, get: function (obj) { return obj.getCandles; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _buyContract_decorators, { kind: "method", name: "buyContract", static: false, private: false, access: { has: function (obj) { return "buyContract" in obj; }, get: function (obj) { return obj.buyContract; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _sellContract_decorators, { kind: "method", name: "sellContract", static: false, private: false, access: { has: function (obj) { return "sellContract" in obj; }, get: function (obj) { return obj.sellContract; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DerivController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DerivController = _classThis;
}();
exports.DerivController = DerivController;
