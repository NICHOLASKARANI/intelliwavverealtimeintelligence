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
exports.CreateOrderDto = void 0;
// apps/backend/src/modules/trading/dto/trading.dto.ts
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var CreateOrderDto = function () {
    var _a;
    var _symbol_decorators;
    var _symbol_initializers = [];
    var _symbol_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _side_decorators;
    var _side_initializers = [];
    var _side_extraInitializers = [];
    var _tradingAccountId_decorators;
    var _tradingAccountId_initializers = [];
    var _tradingAccountId_extraInitializers = [];
    var _quantity_decorators;
    var _quantity_initializers = [];
    var _quantity_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _stopPrice_decorators;
    var _stopPrice_initializers = [];
    var _stopPrice_extraInitializers = [];
    var _limitPrice_decorators;
    var _limitPrice_initializers = [];
    var _limitPrice_extraInitializers = [];
    var _timeInForce_decorators;
    var _timeInForce_initializers = [];
    var _timeInForce_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateOrderDto() {
                this.symbol = __runInitializers(this, _symbol_initializers, void 0);
                this.type = (__runInitializers(this, _symbol_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.side = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _side_initializers, void 0));
                this.tradingAccountId = (__runInitializers(this, _side_extraInitializers), __runInitializers(this, _tradingAccountId_initializers, void 0));
                this.quantity = (__runInitializers(this, _tradingAccountId_extraInitializers), __runInitializers(this, _quantity_initializers, void 0));
                this.price = (__runInitializers(this, _quantity_extraInitializers), __runInitializers(this, _price_initializers, void 0));
                this.stopPrice = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _stopPrice_initializers, void 0));
                this.limitPrice = (__runInitializers(this, _stopPrice_extraInitializers), __runInitializers(this, _limitPrice_initializers, void 0));
                this.timeInForce = (__runInitializers(this, _limitPrice_extraInitializers), __runInitializers(this, _timeInForce_initializers, void 0));
                this.metadata = (__runInitializers(this, _timeInForce_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
                __runInitializers(this, _metadata_extraInitializers);
            }
            return CreateOrderDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _symbol_decorators = [(0, swagger_1.ApiProperty)({ example: 'R_100' }), (0, class_validator_1.IsString)()];
            _type_decorators = [(0, swagger_1.ApiProperty)({ enum: ['MARKET', 'LIMIT', 'STOP', 'STOP_LIMIT', 'TRAILING_STOP'] }), (0, class_validator_1.IsEnum)(['MARKET', 'LIMIT', 'STOP', 'STOP_LIMIT', 'TRAILING_STOP'])];
            _side_decorators = [(0, swagger_1.ApiProperty)({ enum: ['BUY', 'SELL'] }), (0, class_validator_1.IsEnum)(['BUY', 'SELL'])];
            _tradingAccountId_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)()];
            _quantity_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
            _price_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)()];
            _stopPrice_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)()];
            _limitPrice_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)()];
            _timeInForce_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _metadata_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsObject)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _symbol_decorators, { kind: "field", name: "symbol", static: false, private: false, access: { has: function (obj) { return "symbol" in obj; }, get: function (obj) { return obj.symbol; }, set: function (obj, value) { obj.symbol = value; } }, metadata: _metadata }, _symbol_initializers, _symbol_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _side_decorators, { kind: "field", name: "side", static: false, private: false, access: { has: function (obj) { return "side" in obj; }, get: function (obj) { return obj.side; }, set: function (obj, value) { obj.side = value; } }, metadata: _metadata }, _side_initializers, _side_extraInitializers);
            __esDecorate(null, null, _tradingAccountId_decorators, { kind: "field", name: "tradingAccountId", static: false, private: false, access: { has: function (obj) { return "tradingAccountId" in obj; }, get: function (obj) { return obj.tradingAccountId; }, set: function (obj, value) { obj.tradingAccountId = value; } }, metadata: _metadata }, _tradingAccountId_initializers, _tradingAccountId_extraInitializers);
            __esDecorate(null, null, _quantity_decorators, { kind: "field", name: "quantity", static: false, private: false, access: { has: function (obj) { return "quantity" in obj; }, get: function (obj) { return obj.quantity; }, set: function (obj, value) { obj.quantity = value; } }, metadata: _metadata }, _quantity_initializers, _quantity_extraInitializers);
            __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
            __esDecorate(null, null, _stopPrice_decorators, { kind: "field", name: "stopPrice", static: false, private: false, access: { has: function (obj) { return "stopPrice" in obj; }, get: function (obj) { return obj.stopPrice; }, set: function (obj, value) { obj.stopPrice = value; } }, metadata: _metadata }, _stopPrice_initializers, _stopPrice_extraInitializers);
            __esDecorate(null, null, _limitPrice_decorators, { kind: "field", name: "limitPrice", static: false, private: false, access: { has: function (obj) { return "limitPrice" in obj; }, get: function (obj) { return obj.limitPrice; }, set: function (obj, value) { obj.limitPrice = value; } }, metadata: _metadata }, _limitPrice_initializers, _limitPrice_extraInitializers);
            __esDecorate(null, null, _timeInForce_decorators, { kind: "field", name: "timeInForce", static: false, private: false, access: { has: function (obj) { return "timeInForce" in obj; }, get: function (obj) { return obj.timeInForce; }, set: function (obj, value) { obj.timeInForce = value; } }, metadata: _metadata }, _timeInForce_initializers, _timeInForce_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateOrderDto = CreateOrderDto;
