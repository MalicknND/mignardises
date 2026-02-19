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
      <SheetContent side="bottom" className="max-h-[92vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Ajouter</SheetTitle>
          <SheetDescription>
            Créez une commande ou enregistrez une dépense.
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 pb-4 space-y-4">
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
