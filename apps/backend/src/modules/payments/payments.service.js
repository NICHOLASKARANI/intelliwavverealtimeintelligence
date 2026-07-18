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
exports.PaymentsService = void 0;
// apps/backend/src/modules/payments/payments.service.ts
var common_1 = require("@nestjs/common");
var PaymentsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PaymentsService = _classThis = /** @class */ (function () {
        function PaymentsService_1(prisma, stripe, configService) {
            this.prisma = prisma;
            this.stripe = stripe;
            this.configService = configService;
            this.logger = new common_1.Logger(PaymentsService.name);
            this.plans = {
                FREE: {
                    name: 'Free',
                    price: 0,
                    features: ['1 Active Bot', 'Basic Analytics', 'Manual Trading', 'Community Access'],
                },
                STARTER: {
                    name: 'Starter',
                    price: 29,
                    features: ['5 Active Bots', 'Advanced Analytics', 'Copy Trading', 'Email Support'],
                    stripePriceId: 'price_starter_monthly',
                },
                PROFESSIONAL: {
                    name: 'Professional',
                    price: 99,
                    features: ['25 Active Bots', 'AI Predictions', 'Priority Support', 'API Access', 'Custom Strategies'],
                    stripePriceId: 'price_pro_monthly',
                },
                ENTERPRISE: {
                    name: 'Enterprise',
                    price: 299,
                    features: ['Unlimited Bots', 'White Label', 'Dedicated Support', 'Custom Development', 'SLA Guarantee'],
                    stripePriceId: 'price_enterprise_monthly',
                },
            };
        }
        PaymentsService_1.prototype.getPlans = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, Object.entries(this.plans).map(function (_a) {
                            var id = _a[0], plan = _a[1];
                            return (__assign({ id: id }, plan));
                        })];
                });
            });
        };
        PaymentsService_1.prototype.getCurrentSubscription = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.subscription.findFirst({
                            where: {
                                userId: userId,
                                status: 'ACTIVE',
                            },
                            include: {
                                payments: {
                                    orderBy: { createdAt: 'desc' },
                                    take: 5,
                                },
                            },
                        })];
                });
            });
        };
        PaymentsService_1.prototype.createCheckoutSession = function (userId, planId) {
            return __awaiter(this, void 0, void 0, function () {
                var plan, user, session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            plan = this.plans[planId];
                            if (!plan || planId === 'FREE') {
                                throw new common_1.BadRequestException('Invalid plan');
                            }
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { id: userId },
                                })];
                        case 1:
                            user = _a.sent();
                            return [4 /*yield*/, this.stripe.checkout.sessions.create({
                                    customer_email: user.email,
                                    payment_method_types: ['card'],
                                    line_items: [
                                        {
                                            price: plan.stripePriceId,
                                            quantity: 1,
                                        },
                                    ],
                                    mode: 'subscription',
                                    success_url: "".concat(this.configService.get('FRONTEND_URL'), "/billing?success=true"),
                                    cancel_url: "".concat(this.configService.get('FRONTEND_URL'), "/billing?canceled=true"),
                                    metadata: {
                                        userId: userId,
                                        planId: planId,
                                    },
                                })];
                        case 2:
                            session = _a.sent();
                            return [2 /*return*/, { sessionId: session.id, url: session.url }];
                    }
                });
            });
        };
        PaymentsService_1.prototype.handleWebhook = function (signature, payload) {
            return __awaiter(this, void 0, void 0, function () {
                var webhookSecret, event, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
                            try {
                                event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
                            }
                            catch (err) {
                                this.logger.error("Webhook signature verification failed: ".concat(err.message));
                                throw new common_1.BadRequestException('Invalid signature');
                            }
                            _a = event.type;
                            switch (_a) {
                                case 'checkout.session.completed': return [3 /*break*/, 1];
                                case 'customer.subscription.updated': return [3 /*break*/, 3];
                                case 'customer.subscription.deleted': return [3 /*break*/, 5];
                                case 'invoice.payment_failed': return [3 /*break*/, 7];
                            }
                            return [3 /*break*/, 9];
                        case 1: return [4 /*yield*/, this.handleCheckoutCompleted(event.data.object)];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 9];
                        case 3: return [4 /*yield*/, this.handleSubscriptionUpdated(event.data.object)];
                        case 4:
                            _b.sent();
                            return [3 /*break*/, 9];
                        case 5: return [4 /*yield*/, this.handleSubscriptionDeleted(event.data.object)];
                        case 6:
                            _b.sent();
                            return [3 /*break*/, 9];
                        case 7: return [4 /*yield*/, this.handlePaymentFailed(event.data.object)];
                        case 8:
                            _b.sent();
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/, { received: true }];
                    }
                });
            });
        };
        PaymentsService_1.prototype.handleCheckoutCompleted = function (session) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, userId, planId;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = session.metadata, userId = _a.userId, planId = _a.planId;
                            return [4 /*yield*/, this.prisma.subscription.create({
                                    data: {
                                        userId: userId,
                                        plan: planId,
                                        status: 'ACTIVE',
                                        startDate: new Date(),
                                        metadata: {
                                            stripeSessionId: session.id,
                                            stripeSubscriptionId: session.subscription,
                                        },
                                    },
                                })];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, this.prisma.payment.create({
                                    data: {
                                        userId: userId,
                                        subscriptionId: session.subscription,
                                        provider: 'STRIPE',
                                        providerId: session.id,
                                        amount: session.amount_total / 100,
                                        currency: session.currency.toUpperCase(),
                                        status: 'COMPLETED',
                                        paidAt: new Date(),
                                    },
                                })];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        PaymentsService_1.prototype.handleSubscriptionUpdated = function (subscription) {
            return __awaiter(this, void 0, void 0, function () {
                var existingSubscription, status;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.subscription.findFirst({
                                where: {
                                    metadata: {
                                        path: ['stripeSubscriptionId'],
                                        equals: subscription.id,
                                    },
                                },
                            })];
                        case 1:
                            existingSubscription = _a.sent();
                            if (!existingSubscription)
                                return [2 /*return*/];
                            status = subscription.status === 'active' ? 'ACTIVE' :
                                subscription.status === 'past_due' ? 'PAST_DUE' : 'CANCELLED';
                            return [4 /*yield*/, this.prisma.subscription.update({
                                    where: { id: existingSubscription.id },
                                    data: { status: status },
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        PaymentsService_1.prototype.handleSubscriptionDeleted = function (subscription) {
            return __awaiter(this, void 0, void 0, function () {
                var existingSubscription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.subscription.findFirst({
                                where: {
                                    metadata: {
                                        path: ['stripeSubscriptionId'],
                                        equals: subscription.id,
                                    },
                                },
                            })];
                        case 1:
                            existingSubscription = _a.sent();
                            if (!existingSubscription)
                                return [2 /*return*/];
                            return [4 /*yield*/, this.prisma.subscription.update({
                                    where: { id: existingSubscription.id },
                                    data: {
                                        status: 'CANCELLED',
                                        endDate: new Date(),
                                    },
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        PaymentsService_1.prototype.handlePaymentFailed = function (invoice) {
            return __awaiter(this, void 0, void 0, function () {
                var subscription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.subscription.findFirst({
                                where: {
                                    metadata: {
                                        path: ['stripeSubscriptionId'],
                                        equals: invoice.subscription,
                                    },
                                },
                            })];
                        case 1:
                            subscription = _a.sent();
                            if (!subscription)
                                return [2 /*return*/];
                            return [4 /*yield*/, this.prisma.subscription.update({
                                    where: { id: subscription.id },
                                    data: { status: 'PAST_DUE' },
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        PaymentsService_1.prototype.getBillingHistory = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.payment.findMany({
                            where: { userId: userId },
                            orderBy: { createdAt: 'desc' },
                        })];
                });
            });
        };
        PaymentsService_1.prototype.cancelSubscription = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var subscription, stripeSubscriptionId;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.subscription.findFirst({
                                where: {
                                    userId: userId,
                                    status: 'ACTIVE',
                                },
                            })];
                        case 1:
                            subscription = _b.sent();
                            if (!subscription) {
                                throw new common_1.BadRequestException('No active subscription found');
                            }
                            stripeSubscriptionId = (_a = subscription.metadata) === null || _a === void 0 ? void 0 : _a.stripeSubscriptionId;
                            if (!stripeSubscriptionId) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.stripe.subscriptions.cancel(stripeSubscriptionId)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3: return [4 /*yield*/, this.prisma.subscription.update({
                                where: { id: subscription.id },
                                data: {
                                    status: 'CANCELLED',
                                    cancelAtPeriodEnd: true,
                                    endDate: new Date(),
                                },
                            })];
                        case 4:
                            _b.sent();
                            return [2 /*return*/, { message: 'Subscription cancelled successfully' }];
                    }
                });
            });
        };
        return PaymentsService_1;
    }());
    __setFunctionName(_classThis, "PaymentsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PaymentsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaymentsService = _classThis;
}();
exports.PaymentsService = PaymentsService;
