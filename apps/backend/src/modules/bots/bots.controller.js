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
exports.BotsController = void 0;
// apps/backend/src/modules/bots/bots.controller.ts
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
var BotsController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Bots'), (0, common_1.Controller)('bots'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createBot_decorators;
    var _getBots_decorators;
    var _getBot_decorators;
    var _updateBot_decorators;
    var _startBot_decorators;
    var _stopBot_decorators;
    var _deleteBot_decorators;
    var _getBotPerformance_decorators;
    var _duplicateBot_decorators;
    var BotsController = _classThis = /** @class */ (function () {
        function BotsController_1(botsService) {
            this.botsService = (__runInitializers(this, _instanceExtraInitializers), botsService);
        }
        BotsController_1.prototype.createBot = function (user, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.botsService.createBot(user.id, dto)];
                });
            });
        };
        BotsController_1.prototype.getBots = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.botsService.getUserBots(user.id)];
                });
            });
        };
        BotsController_1.prototype.getBot = function (user, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.botsService.getBotById(user.id, id)];
                });
            });
        };
        BotsController_1.prototype.updateBot = function (user, id, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.botsService.updateBot(user.id, id, dto)];
                });
            });
        };
        BotsController_1.prototype.startBot = function (user, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.botsService.startBot(user.id, id)];
                });
            });
        };
        BotsController_1.prototype.stopBot = function (user, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.botsService.stopBot(user.id, id)];
                });
            });
        };
        BotsController_1.prototype.deleteBot = function (user, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.botsService.deleteBot(user.id, id)];
                });
            });
        };
        BotsController_1.prototype.getBotPerformance = function (user, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.botsService.getBotPerformance(user.id, id)];
                });
            });
        };
        BotsController_1.prototype.duplicateBot = function (user, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.botsService.duplicateBot(user.id, id)];
                });
            });
        };
        return BotsController_1;
    }());
    __setFunctionName(_classThis, "BotsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createBot_decorators = [(0, common_1.Post)(), (0, swagger_1.ApiOperation)({ summary: 'Create bot' })];
        _getBots_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Get all bots' })];
        _getBot_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Get bot by ID' })];
        _updateBot_decorators = [(0, common_1.Put)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Update bot' })];
        _startBot_decorators = [(0, common_1.Post)(':id/start'), (0, swagger_1.ApiOperation)({ summary: 'Start bot' })];
        _stopBot_decorators = [(0, common_1.Post)(':id/stop'), (0, swagger_1.ApiOperation)({ summary: 'Stop bot' })];
        _deleteBot_decorators = [(0, common_1.Delete)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Delete bot' })];
        _getBotPerformance_decorators = [(0, common_1.Get)(':id/performance'), (0, swagger_1.ApiOperation)({ summary: 'Get bot performance' })];
        _duplicateBot_decorators = [(0, common_1.Post)(':id/duplicate'), (0, swagger_1.ApiOperation)({ summary: 'Duplicate bot' })];
        __esDecorate(_classThis, null, _createBot_decorators, { kind: "method", name: "createBot", static: false, private: false, access: { has: function (obj) { return "createBot" in obj; }, get: function (obj) { return obj.createBot; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getBots_decorators, { kind: "method", name: "getBots", static: false, private: false, access: { has: function (obj) { return "getBots" in obj; }, get: function (obj) { return obj.getBots; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getBot_decorators, { kind: "method", name: "getBot", static: false, private: false, access: { has: function (obj) { return "getBot" in obj; }, get: function (obj) { return obj.getBot; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateBot_decorators, { kind: "method", name: "updateBot", static: false, private: false, access: { has: function (obj) { return "updateBot" in obj; }, get: function (obj) { return obj.updateBot; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _startBot_decorators, { kind: "method", name: "startBot", static: false, private: false, access: { has: function (obj) { return "startBot" in obj; }, get: function (obj) { return obj.startBot; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _stopBot_decorators, { kind: "method", name: "stopBot", static: false, private: false, access: { has: function (obj) { return "stopBot" in obj; }, get: function (obj) { return obj.stopBot; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteBot_decorators, { kind: "method", name: "deleteBot", static: false, private: false, access: { has: function (obj) { return "deleteBot" in obj; }, get: function (obj) { return obj.deleteBot; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getBotPerformance_decorators, { kind: "method", name: "getBotPerformance", static: false, private: false, access: { has: function (obj) { return "getBotPerformance" in obj; }, get: function (obj) { return obj.getBotPerformance; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _duplicateBot_decorators, { kind: "method", name: "duplicateBot", static: false, private: false, access: { has: function (obj) { return "duplicateBot" in obj; }, get: function (obj) { return obj.duplicateBot; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BotsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BotsController = _classThis;
}();
exports.BotsController = BotsController;
