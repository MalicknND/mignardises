"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toastSystem } from "@/lib/toasts";
import { updateOrderAction } from "@/app/_actions/mignardise.action";
import { OrderStatus, PaymentStatus } from "@/lib/generated/prisma";
import { orderStatusLabel, paymentStatusLabel } from "@/lib/mignardise";

type Props = {
  orderId: string;
  initialStatus: OrderStatus;
  initialPaymentStatus: PaymentStatus;
  initialNotes: string | null;
};

export function UpdateOrderForm({
  orderId,
  initialStatus,
  initialPaymentStatus,
  initialNotes,
}: Props) {
  const [status, setStatus] = useState<OrderStatus>(initialStatus);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(initialPaymentStatus);
  const [notes, setNotes] = useState(initialNotes ?? "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await updateOrderAction({ orderId, status, paymentStatus, notes });
    setIsLoading(false);
    if (error) {
      toastSystem.error("Impossible de mettre à jour la commande.");
    } else {
      toastSystem.success("Commande mise à jour.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Statut</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as OrderStatus)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(OrderStatus).map((s) => (
                <SelectItem key={s} value={s}>
                  {orderStatusLabel[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Paiement</Label>
          <Select value={paymentStatus} onValueChange={(v) => setPaymentStatus(v as PaymentStatus)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(PaymentStatus).map((s) => (
                <SelectItem key={s} value={s}>
                  {paymentStatusLabel[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes sur la commande..."
          rows={2}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Enregistrement..." : "Mettre à jour"}
        </Button>
      </div>
    </form>
  );
}
