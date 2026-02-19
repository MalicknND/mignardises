import {
  ExpenseCategory,
  OrderStatus,
  PaymentStatus,
} from "@/lib/generated/prisma";
import { z } from "zod";

export const createOrderSchema = z.object({
  customerName: z.string().min(2, "Le nom du client est requis"),
  customerPhone: z.string().min(6, "Le téléphone est requis"),
  customerNotes: z.string().optional(),
  itemsText: z.string().min(2, "Ajoutez au moins un article"),
  totalPrice: z.coerce.number().positive("Le montant doit être supérieur à 0"),
  deliveryDate: z.string().min(1, "La date de livraison est requise"),
  status: z.nativeEnum(OrderStatus),
  paymentStatus: z.nativeEnum(PaymentStatus),
  notes: z.string().optional(),
});

export const addPaymentSchema = z.object({
  orderId: z.string().min(1),
  amount: z.coerce.number().positive("Le montant doit être supérieur à 0"),
  paidAt: z.string().optional(),
  note: z.string().optional(),
});

export const createExpenseSchema = z.object({
  amount: z.coerce.number().positive("Le montant doit être supérieur à 0"),
  category: z.nativeEnum(ExpenseCategory),
  date: z.string().min(1, "La date est requise"),
  note: z.string().optional(),
});

export const markCustomerPaidSchema = z.object({
  customerId: z.string().min(1),
  note: z.string().optional(),
});

export const updateOrderSchema = z.object({
  orderId: z.string().min(1),
  status: z.nativeEnum(OrderStatus),
  paymentStatus: z.nativeEnum(PaymentStatus).optional(),
  notes: z.string().optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type AddPaymentInput = z.infer<typeof addPaymentSchema>;
export type MarkCustomerPaidInput = z.infer<typeof markCustomerPaidSchema>;
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;
