import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "@/lib/auth/auth-check";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { Role } from "@/lib/generated/prisma";
import { CreateSubscriptionSchema } from "@/lib/schemas/payment.schema";
import { projectConfig } from "@/config/project";
import prisma from "@/lib/prisma";

// This route permit to create a Stripe subscription
export async function GET(request: NextRequest) {
  if (!projectConfig.features.stripe.enabled) {
    return NextResponse.json({ error: "Stripe is not enabled in project config" }, { status: 500 });
  }
  
  return withAuth(request, async (user) => {
    try {
      if (!stripe) {
        return NextResponse.json({ error: "Stripe is not initialized" }, { status: 500 });
      }

      const subscription = await prisma.subscription.findFirst({
        where: {
          userId: user.id,
          OR: [
            { status: 'active' },
            { status: 'past_due' }
          ]
        },
        select: undefined
      })
  
      return NextResponse.json({ subscription }, { status: 200 });
    } catch (error) {
      console.log(error);
      
      if (error instanceof z.ZodError) {
        return NextResponse.json({ error: "Invalid request data", details: error.errors }, { status: 400 });
      }

      return NextResponse.json({ error: "Failed to create payment" }, { status: 500 });
    }
  }, [Role.USER]);
}

// This route permit to create a Stripe subscription
export async function POST(request: NextRequest) {
  if (!projectConfig.features.stripe.enabled) {
    return NextResponse.json({ error: "Stripe is not enabled in project config" }, { status: 500 });
  }
  
  return withAuth(request, async (user) => {
    try {
      const body = await request.json();
      const validatedData = CreateSubscriptionSchema.parse(body);

      if (!stripe) {
        return NextResponse.json({ error: "Stripe is not initialized" }, { status: 500 });
      }

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      // Create or get customer
      let customer = await prisma.user.findUnique({
        where: { id: user.id },
        select: { stripeCustomerId: true }
      });

      if (!customer?.stripeCustomerId) {
        const stripeCustomer = await stripe.customers.create({
          email: user.email,
          metadata: { userId: user.id }
        });

        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: stripeCustomer.id }
        });

        customer = { stripeCustomerId: stripeCustomer.id };
      }

      // Create Stripe Checkout session
      const session = await stripe.checkout.sessions.create({
        customer: customer?.stripeCustomerId || undefined,
        mode: 'subscription',
        line_items: [{
          price: validatedData.priceId,
          quantity: 1
        }],
        success_url: `${baseUrl}/profile/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/profile/subscription`,
        subscription_data: {
          metadata: {
            userId: user.id
          }
        }
      });

      if (!session.url) {
        return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
      }
  
      return NextResponse.json({ url: session.url }, { status: 200 });
    } catch (error) {
      console.log(error);
      
      if (error instanceof z.ZodError) {
        return NextResponse.json({ error: "Invalid request data", details: error.errors }, { status: 400 });
      }

      return NextResponse.json({ error: "Failed to create payment" }, { status: 500 });
    }
  }, [Role.USER]);
}