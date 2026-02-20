import {
  ExpenseCategory,
  OrderStatus,
  PaymentStatus,
} from "@/lib/generated/prisma";

export const orderStatusLabel: Record<OrderStatus, string> = {
  pending: "En attente",
  preparing: "En prépa",
  delivered: "Livré",
};

export const paymentStatusLabel: Record<PaymentStatus, string> = {
  unpaid: "Impayé",
  deposit: "Acompte",
  paid: "Payé",
};

export const expenseCategoryLabel: Record<ExpenseCategory, string> = {
  ingredients: "Ingrédients",
  packaging: "Packaging",
  transport: "Transport",
  equipment: "Équipement",
  other: "Autre",
};

const moneyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "XOF",
  maximumFractionDigits: 0,
});

export const formatMoney = (value: number) => moneyFormatter.format(value);
