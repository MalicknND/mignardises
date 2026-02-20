"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ExpenseForm } from "./expense-form";
import { OrderFormFull } from "./order-form-full";

type AddSheetMode = "order" | "expense";

type SheetCustomer = {
  id: string;
  name: string;
  phone: string;
};

export function AddSheet({
  open,
  onOpenChange,
  mode,
  onModeChange,
  customers,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: AddSheetMode;
  onModeChange: (mode: AddSheetMode) => void;
  customers: SheetCustomer[];
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex flex-col max-h-[88dvh] gap-0 p-0"
      >
        <SheetHeader className="shrink-0 px-4 pt-4 pb-3 border-b pr-12">
          <SheetTitle>Ajouter</SheetTitle>
          <SheetDescription>
            Créez une commande ou enregistrez une dépense.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={mode === "order" ? "default" : "outline"}
              onClick={() => onModeChange("order")}
            >
              Nouvelle commande
            </Button>
            <Button
              variant={mode === "expense" ? "default" : "outline"}
              onClick={() => onModeChange("expense")}
            >
              Nouvelle dépense
            </Button>
          </div>

          {mode === "order" ? (
            <OrderFormFull
              customers={customers}
              onSuccess={() => onOpenChange(false)}
            />
          ) : (
            <ExpenseForm onSuccess={() => onOpenChange(false)} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
