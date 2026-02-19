"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createExpenseAction } from "@/app/_actions/mignardise.action";
import {
  createExpenseSchema,
  type CreateExpenseInput,
} from "@/lib/schemas/mignardise.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toastSystem } from "@/lib/toasts";
import { ExpenseCategory } from "@/lib/generated/prisma";

export function ExpenseForm({ onSuccess }: { onSuccess: () => void }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateExpenseInput>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      amount: 0,
      category: ExpenseCategory.ingredients,
      date: new Date().toISOString().slice(0, 10),
      note: "",
    },
  });

  const onSubmit = (values: CreateExpenseInput) => {
    startTransition(async () => {
      const result = await createExpenseAction(values);

      if (result?.error) {
        toastSystem.error(result.error);
        return;
      }

      toastSystem.success("Dépense enregistrée");
      onSuccess();
      form.reset();
      router.refresh();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Montant</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <FormControl>
                <select
                  className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm"
                  value={field.value}
                  onChange={field.onChange}
                >
                  <option value={ExpenseCategory.ingredients}>
                    Ingrédients
                  </option>
                  <option value={ExpenseCategory.packaging}>Packaging</option>
                  <option value={ExpenseCategory.transport}>Transport</option>
                  <option value={ExpenseCategory.equipment}>Équipement</option>
                  <option value={ExpenseCategory.other}>Autre</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder="Ingrédients marché central"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Enregistrement..." : "Ajouter une dépense"}
        </Button>
      </form>
    </Form>
  );
}
