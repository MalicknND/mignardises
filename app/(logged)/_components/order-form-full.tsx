"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createOrderAction } from "@/app/_actions/mignardise.action";
import {
  createOrderSchema,
  type CreateOrderInput,
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
import { OrderStatus, PaymentStatus } from "@/lib/generated/prisma";

type SheetCustomer = {
  id: string;
  name: string;
  phone: string;
};

export function OrderFormFull({
  onSuccess,
  customers,
}: {
  onSuccess: () => void;
  customers: SheetCustomer[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateOrderInput>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerNotes: "",
      itemsText: "",
      totalPrice: 0,
      deliveryDate: new Date().toISOString().slice(0, 10),
      status: OrderStatus.pending,
      paymentStatus: PaymentStatus.unpaid,
      notes: "",
    },
  });

  const onSubmit = (values: CreateOrderInput) => {
    startTransition(async () => {
      const result = await createOrderAction(values);

      if (result?.error) {
        toastSystem.error(result.error);
        return;
      }

      toastSystem.success("Commande créée");
      onSuccess();
      form.reset();
      router.refresh();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Clients existants</label>
          <select
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            onChange={(event) => {
              const customer = customers.find(
                (item) => item.id === event.target.value,
              );
              if (!customer) {
                return;
              }
              form.setValue("customerName", customer.name);
              form.setValue("customerPhone", customer.phone);
            }}
            defaultValue=""
          >
            <option value="">Sélectionner un client</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name} ({customer.phone})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom client</FormLabel>
                <FormControl>
                  <Input placeholder="Awa Ndiaye" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customerPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input placeholder="77 000 00 00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="itemsText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Articles (1 ligne = 1 article)</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Gâteau anniversaire\nMignardises x24"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="totalPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total commande</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deliveryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date livraison</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statut</FormLabel>
                <FormControl>
                  <select
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <option value={OrderStatus.pending}>En attente</option>
                    <option value={OrderStatus.preparing}>En prépa</option>
                    <option value={OrderStatus.delivered}>Livré</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paiement</FormLabel>
                <FormControl>
                  <select
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <option value={PaymentStatus.unpaid}>Impayé</option>
                    <option value={PaymentStatus.deposit}>Acompte</option>
                    <option value={PaymentStatus.paid}>Payé</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder="Détails de livraison, saveur, etc."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Création..." : "Créer la commande"}
        </Button>
      </form>
    </Form>
  );
}
