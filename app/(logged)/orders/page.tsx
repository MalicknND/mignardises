import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OpenAddSheetButton } from "@/app/(logged)/_components/open-add-sheet-button";
import { OrderCardLink } from "@/app/(logged)/_components/order-card-link";
import { OrderRowLink } from "@/app/(logged)/_components/order-row-link";
import {
  formatMoney,
  orderStatusLabel,
  paymentStatusLabel,
} from "@/lib/mignardise";
import { getOrders } from "@/lib/prisma/mignardise-queries";
import { requireWorkspace } from "@/lib/workspace";
import { format } from "date-fns";

export default async function OrdersPage() {
  const workspace = await requireWorkspace();
  const orders = await getOrders(workspace.id);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Commandes</h1>
        <OpenAddSheetButton mode="order">Nouvelle commande</OpenAddSheetButton>
      </div>

      <div className="space-y-3 md:hidden">
        {orders.length === 0 ? (
          <div className="rounded-xl border bg-card p-8 text-center space-y-3">
            <p className="text-muted-foreground text-sm">Aucune commande pour le moment.</p>
            <OpenAddSheetButton mode="order">Créer la première</OpenAddSheetButton>
          </div>
        ) : (
          orders.map((order) => (
            <article
              key={order.id}
              className="relative rounded-xl border bg-card p-4"
            >
              <OrderCardLink
                href={`/orders/${order.id}`}
                label={`Voir la commande ${order.customerName}`}
              />
              <div className="relative z-0 space-y-1">
                <p className="font-semibold">{order.customerName}</p>
                <p className="text-sm text-muted-foreground">
                  Livraison: {format(order.deliveryDate, "dd/MM/yyyy")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {orderStatusLabel[order.status]} •{" "}
                  {paymentStatusLabel[order.paymentStatus]}
                </p>
                <p className="text-sm">
                  {formatMoney(order.paidAmount)} /{" "}
                  {formatMoney(order.totalPrice)}
                </p>
              </div>
            </article>
          ))
        )}
      </div>

      <Card className="hidden md:block">
        <CardHeader>
          <CardTitle>Liste des commandes</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="py-8 text-center space-y-3">
              <p className="text-sm text-muted-foreground">Aucune commande pour le moment.</p>
              <OpenAddSheetButton mode="order">Créer la première</OpenAddSheetButton>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="py-2">Client</th>
                  <th className="py-2">Livraison</th>
                  <th className="py-2">Statut</th>
                  <th className="py-2">Paiement</th>
                  <th className="py-2">Total</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-2">{order.customerName}</td>
                    <td className="py-2">
                      {format(order.deliveryDate, "dd/MM/yyyy")}
                    </td>
                    <td className="py-2">{orderStatusLabel[order.status]}</td>
                    <td className="py-2">
                      {paymentStatusLabel[order.paymentStatus]}
                    </td>
                    <td className="py-2">{formatMoney(order.totalPrice)}</td>
                    <td className="py-2">
                      <OrderRowLink href={`/orders/${order.id}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
