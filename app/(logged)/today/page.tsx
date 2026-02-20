import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OpenAddSheetButton } from "@/app/(logged)/_components/open-add-sheet-button";
import { OrderCardLink } from "@/app/(logged)/_components/order-card-link";
import {
  formatMoney,
  orderStatusLabel,
  paymentStatusLabel,
} from "@/lib/mignardise";
import { getTodayData } from "@/lib/prisma/mignardise-queries";
import { requireWorkspace } from "@/lib/workspace";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default async function TodayPage() {
  const workspace = await requireWorkspace();
  const { summary, todayOrders } = await getTodayData(workspace.id);

  return (
    <div className="space-y-6">
      <header className="rounded-xl bg-primary p-4 text-primary-foreground">
        <p className="text-sm/none opacity-90">Aujourd&apos;hui</p>
        <h1 className="mt-2 text-2xl font-bold capitalize">
          {format(new Date(), "EEEE d MMMM yyyy", { locale: fr })}
        </h1>
      </header>

      <section className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Reçu</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-bold">
            {formatMoney(summary.received)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Dépensé</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-bold">
            <a href="/expenses" className="hover:underline">
              {formatMoney(summary.spent)}
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Solde du jour</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-bold">
            {formatMoney(summary.balance)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">À recevoir</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-bold">
            <a href="/debts" className="hover:underline">
              {formatMoney(summary.receivable)}
            </a>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-xl border bg-card p-4">
        <p className="text-sm text-muted-foreground">
          {summary.preparingCount} commande(s) à préparer aujourd&apos;hui
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Il reste{" "}
          <a
            href="/debts"
            className="font-semibold text-primary hover:underline"
          >
            {summary.debtCustomersCount} client(s)
          </a>{" "}
          à payer
        </p>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Commandes du jour</h2>
          <OpenAddSheetButton mode="order">Ajouter commande</OpenAddSheetButton>
        </div>

        {todayOrders.length === 0 ? (
          <Card>
            <CardContent className="p-4 text-sm text-muted-foreground">
              Aucune commande prévue aujourd&apos;hui.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {todayOrders.map((order) => (
              <article
                key={order.id}
                id={`order-${order.id}`}
                className="relative rounded-xl border bg-card p-4"
              >
                <OrderCardLink
                  href={`/orders/${order.id}`}
                  label={`Voir la commande de ${order.customerName}`}
                />
                <div className="relative z-0 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold">{order.customerName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatMoney(order.totalPrice)}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {
                      orderStatusLabel[
                        order.status as keyof typeof orderStatusLabel
                      ]
                    }{" "}
                    •{" "}
                    {
                      paymentStatusLabel[
                        order.paymentStatus as keyof typeof paymentStatusLabel
                      ]
                    }
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
