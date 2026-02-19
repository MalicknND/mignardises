import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "@/lib/auth/auth-check";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { Role } from "@/lib/generated/prisma";
import { PaymentSchema } from "@/lib/schemas/payment.schema";
import { projectConfig } from "@/config/project";

// This route permit to create a payment from a Stripe priceId or a custom amount
export async function POST(request: NextRequest) {
  if (!projectConfig.features.stripe.enabled) {
    return NextResponse.json({ error: "Stripe is enabled in project config" }, { status: 500 });
  }

  return withAuth(request, async () => {
    try {      
      const body = await request.json();
      const validatedData = PaymentSchema.parse(body);

      if (!stripe) {
        return NextResponse.json({ error: "Stripe is not initialized" }, { status: 500 });
      }

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      const session = await stripe.checkout.sessions.create({
        line_items: validatedData?.priceIds ? validatedData.priceIds.map(priceId => ({
          price: priceId,
          quantity: 1,
        })) : [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: 'Custom amount payment',
              },
              unit_amount: validatedData.amount! * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${baseUrl}/profile/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/profile`,
      });
  
      return NextResponse.json({ url: session.url }, { status: 200 })
    } catch (error) {
      console.log(error);
      
      if (error instanceof z.ZodError) {
        return NextResponse.json({ error: "Invalid request data", details: error.errors }, { status: 400 });
      }

      return NextResponse.json({ error: "Failed to create payment" }, { status: 500 });
    }
  }, [Role.USER]);
}