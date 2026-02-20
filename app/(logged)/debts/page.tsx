import { Suspense } from "react";
import { markCustomerPaidAction } from "@/app/_actions/mignardise.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMoney } from "@/lib/mignardise";
import { getDebts } from "@/lib/prisma/mignardise-queries";
import { requireWorkspace } from "@/lib/workspace";

export default function DebtsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">À recevoir</h1>
      <Suspense fallback={<DebtsSkeleton />}>
        <DebtsContent />
      </Suspense>
    </div>
  );
}

async function DebtsContent() {
  const workspace = await requireWorkspace();
  const debts = await getDebts(workspace.id);

  if (debts.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-sm text-muted-foreground">
          Aucune dette client pour le moment.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {debts.map((debt) => {
        const markPaid = async () => {
          "use server";
          await markCustomerPaidAction({ customerId: debt.customerId });
        };

        return (
          <Card key={debt.customerId}>
            <CardHeader>
              <CardTitle className="text-base">{debt.customerName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Commandes: <strong>{formatMoney(debt.totalOrders)}</strong>
              </p>
              <p className="text-sm">
                Payé: <strong>{formatMoney(debt.totalPaid)}</strong>
              </p>
              <p className="text-sm">
                Reste dû: <strong>{formatMoney(debt.debt)}</strong>
              </p>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="flex-1">
                  <a href={`tel:${debt.phone}`}>Appeler</a>
                </Button>
                <form action={markPaid} className="flex-1">
                  <Button type="submit" className="w-full">
                    Marquer payé
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function DebtsSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-xl border bg-card p-4 space-y-3">
          <div className="h-4 w-28 rounded bg-muted" />
          <div className="h-3 w-36 rounded bg-muted" />
          <div className="h-3 w-32 rounded bg-muted" />
          <div className="h-3 w-24 rounded bg-muted" />
          <div className="flex gap-2">
            <div className="h-9 flex-1 rounded bg-muted" />
            <div className="h-9 flex-1 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
