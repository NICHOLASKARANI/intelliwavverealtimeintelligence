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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBotDto = exports.CreateBotDto = void 0;
// apps/backend/src/modules/bots/dto/bot.dto.ts
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var CreateBotDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _strategyId_decorators;
    var _strategyId_initializers = [];
    var _strategyId_extraInitializers = [];
    var _tradingAccountId_decorators;
    var _tradingAccountId_initializers = [];
    var _tradingAccountId_extraInitializers = [];
    var _riskProfileId_decorators;
    var _riskProfileId_initializers = [];
    var _riskProfileId_extraInitializers = [];
    var _config_decorators;
    var _config_initializers = [];
    var _config_extraInitializers = [];
    var _capital_decorators;
    var _capital_initializers = [];
    var _capital_extraInitializers = [];
    var _maxDrawdown_decorators;
    var _maxDrawdown_initializers = [];
    var _maxDrawdown_extraInitializers = [];
    var _dailyLossLimit_decorators;
    var _dailyLossLimit_initializers = [];
    var _dailyLossLimit_extraInitializers = [];
    var _takeProfit_decorators;
    var _takeProfit_initializers = [];
    var _takeProfit_extraInitializers = [];
    var _stopLoss_decorators;
    var _stopLoss_initializers = [];
    var _stopLoss_extraInitializers = [];
    var _maxPositions_decorators;
    var _maxPositions_initializers = [];
    var _maxPositions_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateBotDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.strategyId = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _strategyId_initializers, void 0));
                this.tradingAccountId = (__runInitializers(this, _strategyId_extraInitializers), __runInitializers(this, _tradingAccountId_initializers, void 0));
                this.riskProfileId = (__runInitializers(this, _tradingAccountId_extraInitializers), __runInitializers(this, _riskProfileId_initializers, void 0));
                this.config = (__runInitializers(this, _riskProfileId_extraInitializers), __runInitializers(this, _config_initializers, void 0));
                this.capital = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _capital_initializers, void 0));
                this.maxDrawdown = (__runInitializers(this, _capital_extraInitializers), __runInitializers(this, _maxDrawdown_initializers, void 0));
                this.dailyLossLimit = (__runInitializers(this, _maxDrawdown_extraInitializers), __runInitializers(this, _dailyLossLimit_initializers, void 0));
                this.takeProfit = (__runInitializers(this, _dailyLossLimit_extraInitializers), __runInitializers(this, _takeProfit_initializers, void 0));
                this.stopLoss = (__runInitializers(this, _takeProfit_extraInitializers), __runInitializers(this, _stopLoss_initializers, void 0));
                this.maxPositions = (__runInitializers(this, _stopLoss_extraInitializers), __runInitializers(this, _maxPositions_initializers, void 0));
                __runInitializers(this, _maxPositions_extraInitializers);
            }
            return CreateBotDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)()];
            _description_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _strategyId_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)()];
            _tradingAccountId_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)()];
            _riskProfileId_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _config_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsObject)(), (0, class_validator_1.IsOptional)()];
            _capital_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(10)];
            _maxDrawdown_decorators = [(0, swagger_1.ApiProperty)({ default: 20 }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(50), (0, class_validator_1.IsOptional)()];
            _dailyLossLimit_decorators = [(0, swagger_1.ApiProperty)({ default: 5 }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(20), (0, class_validator_1.IsOptional)()];
            _takeProfit_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)()];
            _stopLoss_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)()];
            _maxPositions_decorators = [(0, swagger_1.ApiProperty)({ default: 5 }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(20), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _strategyId_decorators, { kind: "field", name: "strategyId", static: false, private: false, access: { has: function (obj) { return "strategyId" in obj; }, get: function (obj) { return obj.strategyId; }, set: function (obj, value) { obj.strategyId = value; } }, metadata: _metadata }, _strategyId_initializers, _strategyId_extraInitializers);
            __esDecorate(null, null, _tradingAccountId_decorators, { kind: "field", name: "tradingAccountId", static: false, private: false, access: { has: function (obj) { return "tradingAccountId" in obj; }, get: function (obj) { return obj.tradingAccountId; }, set: function (obj, value) { obj.tradingAccountId = value; } }, metadata: _metadata }, _tradingAccountId_initializers, _tradingAccountId_extraInitializers);
            __esDecorate(null, null, _riskProfileId_decorators, { kind: "field", name: "riskProfileId", static: false, private: false, access: { has: function (obj) { return "riskProfileId" in obj; }, get: function (obj) { return obj.riskProfileId; }, set: function (obj, value) { obj.riskProfileId = value; } }, metadata: _metadata }, _riskProfileId_initializers, _riskProfileId_extraInitializers);
            __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: function (obj) { return "config" in obj; }, get: function (obj) { return obj.config; }, set: function (obj, value) { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(null, null, _capital_decorators, { kind: "field", name: "capital", static: false, private: false, access: { has: function (obj) { return "capital" in obj; }, get: function (obj) { return obj.capital; }, set: function (obj, value) { obj.capital = value; } }, metadata: _metadata }, _capital_initializers, _capital_extraInitializers);
            __esDecorate(null, null, _maxDrawdown_decorators, { kind: "field", name: "maxDrawdown", static: false, private: false, access: { has: function (obj) { return "maxDrawdown" in obj; }, get: function (obj) { return obj.maxDrawdown; }, set: function (obj, value) { obj.maxDrawdown = value; } }, metadata: _metadata }, _maxDrawdown_initializers, _maxDrawdown_extraInitializers);
            __esDecorate(null, null, _dailyLossLimit_decorators, { kind: "field", name: "dailyLossLimit", static: false, private: false, access: { has: function (obj) { return "dailyLossLimit" in obj; }, get: function (obj) { return obj.dailyLossLimit; }, set: function (obj, value) { obj.dailyLossLimit = value; } }, metadata: _metadata }, _dailyLossLimit_initializers, _dailyLossLimit_extraInitializers);
            __esDecorate(null, null, _takeProfit_decorators, { kind: "field", name: "takeProfit", static: false, private: false, access: { has: function (obj) { return "takeProfit" in obj; }, get: function (obj) { return obj.takeProfit; }, set: function (obj, value) { obj.takeProfit = value; } }, metadata: _metadata }, _takeProfit_initializers, _takeProfit_extraInitializers);
            __esDecorate(null, null, _stopLoss_decorators, { kind: "field", name: "stopLoss", static: false, private: false, access: { has: function (obj) { return "stopLoss" in obj; }, get: function (obj) { return obj.stopLoss; }, set: function (obj, value) { obj.stopLoss = value; } }, metadata: _metadata }, _stopLoss_initializers, _stopLoss_extraInitializers);
            __esDecorate(null, null, _maxPositions_decorators, { kind: "field", name: "maxPositions", static: false, private: false, access: { has: function (obj) { return "maxPositions" in obj; }, get: function (obj) { return obj.maxPositions; }, set: function (obj, value) { obj.maxPositions = value; } }, metadata: _metadata }, _maxPositions_initializers, _maxPositions_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateBotDto = CreateBotDto;
var UpdateBotDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _config_decorators;
    var _config_initializers = [];
    var _config_extraInitializers = [];
    var _capital_decorators;
    var _capital_initializers = [];
    var _capital_extraInitializers = [];
    var _maxDrawdown_decorators;
    var _maxDrawdown_initializers = [];
    var _maxDrawdown_extraInitializers = [];
    var _takeProfit_decorators;
    var _takeProfit_initializers = [];
    var _takeProfit_extraInitializers = [];
    var _stopLoss_decorators;
    var _stopLoss_initializers = [];
    var _stopLoss_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateBotDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.config = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _config_initializers, void 0));
                this.capital = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _capital_initializers, void 0));
                this.maxDrawdown = (__runInitializers(this, _capital_extraInitializers), __runInitializers(this, _maxDrawdown_initializers, void 0));
                this.takeProfit = (__runInitializers(this, _maxDrawdown_extraInitializers), __runInitializers(this, _takeProfit_initializers, void 0));
                this.stopLoss = (__runInitializers(this, _takeProfit_extraInitializers), __runInitializers(this, _stopLoss_initializers, void 0));
                __runInitializers(this, _stopLoss_extraInitializers);
            }
            return UpdateBotDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _description_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _config_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsObject)(), (0, class_validator_1.IsOptional)()];
            _capital_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(10), (0, class_validator_1.IsOptional)()];
            _maxDrawdown_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(50), (0, class_validator_1.IsOptional)()];
            _takeProfit_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)()];
            _stopLoss_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: function (obj) { return "config" in obj; }, get: function (obj) { return obj.config; }, set: function (obj, value) { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(null, null, _capital_decorators, { kind: "field", name: "capital", static: false, private: false, access: { has: function (obj) { return "capital" in obj; }, get: function (obj) { return obj.capital; }, set: function (obj, value) { obj.capital = value; } }, metadata: _metadata }, _capital_initializers, _capital_extraInitializers);
            __esDecorate(null, null, _maxDrawdown_decorators, { kind: "field", name: "maxDrawdown", static: false, private: false, access: { has: function (obj) { return "maxDrawdown" in obj; }, get: function (obj) { return obj.maxDrawdown; }, set: function (obj, value) { obj.maxDrawdown = value; } }, metadata: _metadata }, _maxDrawdown_initializers, _maxDrawdown_extraInitializers);
            __esDecorate(null, null, _takeProfit_decorators, { kind: "field", name: "takeProfit", static: false, private: false, access: { has: function (obj) { return "takeProfit" in obj; }, get: function (obj) { return obj.takeProfit; }, set: function (obj, value) { obj.takeProfit = value; } }, metadata: _metadata }, _takeProfit_initializers, _takeProfit_extraInitializers);
            __esDecorate(null, null, _stopLoss_decorators, { kind: "field", name: "stopLoss", static: false, private: false, access: { has: function (obj) { return "stopLoss" in obj; }, get: function (obj) { return obj.stopLoss; }, set: function (obj, value) { obj.stopLoss = value; } }, metadata: _metadata }, _stopLoss_initializers, _stopLoss_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateBotDto = UpdateBotDto;
