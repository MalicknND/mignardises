import { NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/auth/auth-check"
import { stripe } from "@/lib/stripe"
import { Role } from "@/lib/generated/prisma"

export async function GET(request: NextRequest) {
  return withAuth(request, async (user) => {
    try {
      if (!stripe) return NextResponse.json({ error: "Stripe is not enabled" }, { status: 500 })

      if (!user.stripeCustomerId) {
        return NextResponse.json(
          { error: "No Stripe customer found" },
          { status: 400 }
        )
      }

      const { url } = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/subscription`,
      })

      return NextResponse.json({ url })
    } catch (error) {
      console.error('Failed to create portal session:', error)
      return NextResponse.json(
        { error: "Failed to access billing portal" },
        { status: 500 }
      )
    }
  }, [Role.USER])
} 