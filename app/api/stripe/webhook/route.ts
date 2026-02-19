import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not initialized" }, { status: 500 });
  }

  if (!signature || !endpointSecret) {
    return NextResponse.json({ error: "Missing signature or endpoint secret" }, { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(body, signature, endpointSecret);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        // Handle subscription creation
        if (session.mode === 'subscription') {
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
          
          const existingSubscription = await prisma.subscription.findUnique({
            where: { stripeId: subscription.id }
          });
          
          if (existingSubscription) {
            console.log("Subscription already exists");
            break;
          }
          
          await prisma.subscription.create({
            data: {
              userId: subscription.metadata.userId,
              stripeId: subscription.id,
              status: subscription.status,
              priceId: subscription.items.data[0].price.id,
              quantity: subscription.items.data[0].quantity ?? 1,
              currentPeriodStart: new Date(subscription.items.data[0].current_period_start * 1000),
              currentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
              cancelAtPeriodEnd: subscription.cancel_at_period_end,
              cancelAt: subscription.cancel_at ? new Date(subscription.cancel_at * 1000) : null,
              canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
              endedAt: subscription.ended_at ? new Date(subscription.ended_at * 1000) : null
            }
          });
        }
        break;
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        
        await prisma.subscription.update({
          where: { stripeId: subscription.id },
          data: {
            status: subscription.status,
            priceId: subscription.items.data[0].price.id,
            quantity: subscription.items.data[0].quantity ?? 1,
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            cancelAt: subscription.cancel_at ? new Date(subscription.cancel_at * 1000) : null,
            canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
            currentPeriodStart: new Date(subscription.items.data[0].current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
            endedAt: subscription.ended_at ? new Date(subscription.ended_at * 1000) : null
          }
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        
        await prisma.subscription.update({
          where: { stripeId: subscription.id },
          data: {
            status: subscription.status,
            endedAt: new Date()
          }
        });
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Stripe webhook error" }, { status: 400 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}; 