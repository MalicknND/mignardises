"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toastSystem } from "@/lib/toasts";
import { addPaymentAction } from "@/app/_actions/mignardise.action";

type Props = {
  orderId: string;
  remaining: number;
};

export function AddPaymentForm({ orderId, remaining }: Props) {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = Number(amount);
    if (!parsed || parsed <= 0) return;

    setIsLoading(true);
    const { error } = await addPaymentAction({ orderId, amount: parsed });
    setIsLoading(false);

    if (error) {
      toastSystem.error("Impossible d'enregistrer le paiement.");
    } else {
      toastSystem.success("Paiement enregistré.");
      setAmount("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      <div className="flex-1 space-y-2">
        <Label htmlFor="amount">Montant reçu (FCFA)</Label>
        <Input
          id="amount"
          type="number"
          min={1}
          max={remaining}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={`Max ${remaining.toLocaleString("fr-FR")} FCFA`}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading || remaining <= 0}>
        {isLoading ? "..." : "Encaisser"}
      </Button>
    </form>
  );
}
