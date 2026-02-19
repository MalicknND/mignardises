'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createPaymentAction } from "../_actions/payment.action";
import { toastSystem } from "@/lib/toasts";

export function PaymentCard() {
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const res = await createPaymentAction({ amount });
      if (res.error) return toastSystem.error(res.error);
      if (res.data?.url) window.location.href = res.data.url;
    } catch (error) {
      toastSystem.error("An error occurred while processing payment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Make a Payment</CardTitle>
        <CardDescription>
          You can test a custom amount Stripe payment just here.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Amount in euros"
          />
          <Button onClick={handlePayment} disabled={amount < 1 || isLoading}>
            {isLoading ? "Processing..." : "Pay"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 