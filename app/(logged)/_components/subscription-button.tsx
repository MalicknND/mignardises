"use client"

import { useSubscription } from "@/lib/hooks/use-subscription"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles } from "lucide-react"

export function SubscriptionButton() {
  const subscription = useSubscription((state) => state.subscription)

  return (
    <Button variant="outline" size="sm" asChild>
      <Link href="/profile/subscription" className="flex items-center gap-2">
        <Sparkles className="h-4 w-4" />
        <span>{subscription ? "Gérer mon abonnement" : "Passer premium"}</span>
      </Link>
    </Button>
  )
}