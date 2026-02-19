'use client'

import { projectConfig } from "@/config/project"
import { useSubscription } from "@/lib/hooks/use-subscription"
import { CurrentSubscription } from "./_components/current-subscription"
import { SubscriptionPlans } from "./_components/subscription-plans"

export default function SubscriptionPage() {
  const subscription = useSubscription((state) => state.subscription)  
  if (!projectConfig.features.stripe.enabled) {
    throw new Error("Stripe is not enabled in project config")
  }
  
  return (
    <div className="container mx-auto py-10">
      <CurrentSubscription />
      {!subscription && <SubscriptionPlans />}
    </div>
  )
} 