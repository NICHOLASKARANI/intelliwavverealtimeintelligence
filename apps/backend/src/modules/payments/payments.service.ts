// apps/backend/src/modules/payments/payments.service.ts
import { Injectable, Inject, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@intelliwave/database';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject('STRIPE_CLIENT') private readonly stripe: Stripe,
    private readonly configService: ConfigService,
  ) {}

  private readonly plans = {
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

  async getPlans() {
    return Object.entries(this.plans).map(([id, plan]) => ({
      id,
      ...plan,
    }));
  }

  async getCurrentSubscription(userId: string) {
    return this.prisma.subscription.findFirst({
      where: {
        userId,
        status: 'ACTIVE',
      },
      include: {
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });
  }

  async createCheckoutSession(userId: string, planId: string) {
    const plan = this.plans[planId];
    if (!plan || planId === 'FREE') {
      throw new BadRequestException('Invalid plan');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    // Create Stripe checkout session
    const session = await this.stripe.checkout.sessions.create({
      customer_email: user.email,
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${this.configService.get('FRONTEND_URL')}/billing?success=true`,
      cancel_url: `${this.configService.get('FRONTEND_URL')}/billing?canceled=true`,
      metadata: {
        userId,
        planId,
      },
    });

    return { sessionId: session.id, url: session.url };
  }

  async handleWebhook(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');

    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err) {
      this.logger.error(`Webhook signature verification failed: ${err.message}`);
      throw new BadRequestException('Invalid signature');
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutCompleted(event.data.object);
        break;
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(event.data.object);
        break;
      case 'invoice.payment_failed':
        await this.handlePaymentFailed(event.data.object);
        break;
    }

    return { received: true };
  }

  private async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const { userId, planId } = session.metadata;

    await this.prisma.subscription.create({
      data: {
        userId,
        plan: planId as any,
        status: 'ACTIVE',
        startDate: new Date(),
        metadata: {
          stripeSessionId: session.id,
          stripeSubscriptionId: session.subscription,
        },
      },
    });

    await this.prisma.payment.create({
      data: {
        userId,
        subscriptionId: session.subscription as string,
        provider: 'STRIPE',
        providerId: session.id,
        amount: session.amount_total / 100,
        currency: session.currency.toUpperCase(),
        status: 'COMPLETED',
        paidAt: new Date(),
      },
    });
  }

  private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    const existingSubscription = await this.prisma.subscription.findFirst({
      where: {
        metadata: {
          path: ['stripeSubscriptionId'],
          equals: subscription.id,
        },
      },
    });

    if (!existingSubscription) return;

    const status = subscription.status === 'active' ? 'ACTIVE' :
                   subscription.status === 'past_due' ? 'PAST_DUE' : 'CANCELLED';

    await this.prisma.subscription.update({
      where: { id: existingSubscription.id },
      data: { status: status as any },
    });
  }

  private async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    const existingSubscription = await this.prisma.subscription.findFirst({
      where: {
        metadata: {
          path: ['stripeSubscriptionId'],
          equals: subscription.id,
        },
      },
    });

    if (!existingSubscription) return;

    await this.prisma.subscription.update({
      where: { id: existingSubscription.id },
      data: {
        status: 'CANCELLED',
        endDate: new Date(),
      },
    });
  }

  private async handlePaymentFailed(invoice: Stripe.Invoice) {
    const subscription = await this.prisma.subscription.findFirst({
      where: {
        metadata: {
          path: ['stripeSubscriptionId'],
          equals: invoice.subscription as string,
        },
      },
    });

    if (!subscription) return;

    await this.prisma.subscription.update({
      where: { id: subscription.id },
      data: { status: 'PAST_DUE' },
    });
  }

  async getBillingHistory(userId: string) {
    return this.prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async cancelSubscription(userId: string) {
    const subscription = await this.prisma.subscription.findFirst({
      where: {
        userId,
        status: 'ACTIVE',
      },
    });

    if (!subscription) {
      throw new BadRequestException('No active subscription found');
    }

    // Cancel in Stripe
    const stripeSubscriptionId = (subscription.metadata as any)?.stripeSubscriptionId;
    if (stripeSubscriptionId) {
      await this.stripe.subscriptions.cancel(stripeSubscriptionId);
    }

    await this.prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: 'CANCELLED',
        cancelAtPeriodEnd: true,
        endDate: new Date(),
      },
    });

    return { message: 'Subscription cancelled successfully' };
  }
}