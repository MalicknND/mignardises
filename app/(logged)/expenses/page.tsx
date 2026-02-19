import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OpenAddSheetButton } from "@/app/(logged)/_components/open-add-sheet-button";
import { expenseCategoryLabel, formatMoney } from "@/lib/mignardise";
import { getExpenses } from "@/lib/prisma/mignardise-queries";
import { requireWorkspace } from "@/lib/workspace";
import { format } from "date-fns";

export default async function ExpensesPage() {
  const workspace = await requireWorkspace();
  const { expenses, byCategory } = await getExpenses(workspace.id);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dépenses</h1>
        <OpenAddSheetButton mode="expense">
          Ajouter une dépense
        </OpenAddSheetButton>
      </div>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {Object.entries(byCategory).map(([category, value]) => (
          <Card key={category}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">
                {
                  expenseCategoryLabel[
                    category as keyof typeof expenseCategoryLabel
                  ]
                }
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm font-semibold">
              {formatMoney(value)}
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Historique</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {expenses.map((expense) => (
              <article key={expense.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">
                    {expenseCategoryLabel[expense.category]}
                  </p>
                  <p className="font-semibold">{formatMoney(expense.amount)}</p>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {format(expense.date, "dd/MM/yyyy")}
                </p>
                {expense.note ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {expense.note}
                  </p>
                ) : null}
              </article>
            ))}
            {expenses.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Aucune dépense enregistrée.
              </p>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
