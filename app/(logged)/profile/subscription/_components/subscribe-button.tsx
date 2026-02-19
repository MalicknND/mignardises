'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createSubscriptionAction } from "@/app/(logged)/profile/subscription/_actions/subscription.action";
import { toastSystem } from "@/lib/toasts";

type SubscribeButtonProps = {
  priceId: string;
  variant?: "default" | "outline";
  className?: string;
  children: React.ReactNode;
}

export function SubscribeButton({ priceId, variant = "default", className, children }: SubscribeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      const result = await createSubscriptionAction({ priceId });
      if (result.error) return toastSystem.error(result.error);
      // Redirect to Stripe Checkout
      window.location.href = result.data!.url;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSubscribe}
      disabled={isLoading}
      variant={variant}
      className={className}
    >
      {isLoading ? "Loading..." : children}
    </Button>
  );
} 