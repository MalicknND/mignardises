import 'server-only'

import Stripe from 'stripe'

const stripeKey = process.env.STRIPE_SECRET_KEY || null;

export const stripe = !!stripeKey ? new Stripe(process.env.STRIPE_SECRET_KEY!) : undefined