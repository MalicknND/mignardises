import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeft, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { requireWorkspace } from "@/lib/workspace";
import { getOrderById } from "@/lib/prisma/mignardise-queries";
import {
  formatMoney,
  orderStatusLabel,
  paymentStatusLabel,
} from "@/lib/mignardise";
import { UpdateOrderForm } from "./_components/update-order-form";
import { AddPaymentForm } from "./_components/add-payment-form";
import type { PageParams } from "@/types/next";

export default async function OrderDetailPage({ params }: PageParams<{ id: string }>) {
  const { id } = await params;

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center gap-3">
        <Link
          href="/orders"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Commandes
        </Link>
      </div>
      <Suspense fallback={<OrderDetailSkeleton />}>
        <OrderDetailContent id={id} />
      </Suspense>
    </div>
  );
}

async function OrderDetailContent({ id }: { id: string }) {
  const workspace = await requireWorkspace();
  const order = await getOrderById(workspace.id, id);

  if (!order) notFound();

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{order.customer.name}</h1>
          <a
            href={`tel:${order.customer.phone}`}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mt-1"
          >
            <Phone className="w-3.5 h-3.5" />
            {order.customer.phone}
          </a>
        </div>
        <div className="text-right text-sm text-muted-foreground">
          <p>Livraison</p>
          <p className="font-semibold text-foreground">
            {format(order.deliveryDate, "dd MMM yyyy", { locale: fr })}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Articles</CardTitle>
        </CardHeader>
        <CardContent>
          {order.items.length > 0 ? (
            <ul className="space-y-1">
              {order.items.map((item, i) => (
                <li key={i} className="text-sm py-1 border-b last:border-0">{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Aucun article renseigné.</p>
          )}
          {order.notes && (
            <p className="mt-3 text-sm text-muted-foreground italic">{order.notes}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Paiement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-lg bg-muted/50 p-3 text-center">
              <p className="text-muted-foreground mb-1">Total</p>
              <p className="font-bold">{formatMoney(order.totalPrice)}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3 text-center">
              <p className="text-muted-foreground mb-1">Payé</p>
              <p className="font-bold text-green-600">{formatMoney(order.paidAmount)}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3 text-center">
              <p className="text-muted-foreground mb-1">Reste</p>
              <p className="font-bold text-destructive">{formatMoney(order.remaining)}</p>
            </div>
          </div>

          {order.remaining > 0 && (
            <AddPaymentForm orderId={order.id} remaining={order.remaining} />
          )}

          {order.payments.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Historique des paiements
                </p>
                {order.payments.map((p) => (
                  <div key={p.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {format(p.paidAt, "dd/MM/yyyy")}
                      {p.note && ` — ${p.note}`}
                    </span>
                    <span className="font-medium">{formatMoney(p.amount)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Modifier — {orderStatusLabel[order.status]} · {paymentStatusLabel[order.paymentStatus]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateOrderForm
            orderId={order.id}
            initialStatus={order.status}
            initialPaymentStatus={order.paymentStatus}
            initialNotes={order.notes}
          />
        </CardContent>
      </Card>
    </>
  );
}

function OrderDetailSkeleton() {
  return (
    <>
      <div className="flex items-start justify-between animate-pulse">
        <div className="space-y-2">
          <div className="h-6 w-40 rounded bg-muted" />
          <div className="h-4 w-28 rounded bg-muted" />
        </div>
        <div className="h-10 w-24 rounded bg-muted" />
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-xl border bg-card p-4 space-y-3">
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="h-3 w-full rounded bg-muted" />
          <div className="h-3 w-3/4 rounded bg-muted" />
        </div>
      ))}
    </>
  );
}
