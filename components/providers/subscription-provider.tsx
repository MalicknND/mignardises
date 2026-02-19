'use client'

import { useEffect } from 'react'
import { useSubscription } from '@/lib/hooks/use-subscription'
import { getSubscriptionAction } from '@/app/(logged)/profile/subscription/_actions/subscription.action'

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const setSubscription = useSubscription((state) => state.setSubscription)

  useEffect(() => {
    getSubscriptionAction().then((res) => {      
      if (res.data) setSubscription(res.data.subscription)
    })
  }, [setSubscription])

  return children
} 