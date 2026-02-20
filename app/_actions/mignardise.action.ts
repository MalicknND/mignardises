"use server";

import prisma from "@/lib/prisma";
import { createAction } from "@/lib/actions/action-wrapper";
import { requireWorkspace } from "@/lib/workspace";
import {
  addPaymentSchema,
  createExpenseSchema,
  createOrderSchema,
  markCustomerPaidSchema,
  updateOrderSchema,
  type AddPaymentInput,
  type CreateExpenseInput,
  type CreateOrderInput,
  type MarkCustomerPaidInput,
  type UpdateOrderInput,
} from "@/lib/schemas/mignardise.schema";
import { Prisma } from "@/lib/generated/prisma";
import { revalidatePath } from "next/cache";

const parseItems = (itemsText: string) =>
  itemsText
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const decimal = (value: number) => new Prisma.Decimal(value);

export async function createOrderAction(
  input: CreateOrderInput,
): Promise<{ success?: boolean; error?: string }> {
  return createAction({
    input,
    schema: createOrderSchema,
    handler: async (validatedInput) => {
      const workspace = await requireWorkspace();
      if (!validatedInput) {
        return { error: "Données invalides" };
      }

      const customer = await prisma.customer.upsert({
        where: {
          workspaceId_phone: {
            workspaceId: workspace.id,
            phone: validatedInput.customerPhone,
          },
        },
        create: {
          workspaceId: workspace.id,
          name: validatedInput.customerName,
          phone: validatedInput.customerPhone,
          notes: validatedInput.customerNotes,
        },
        update: {
          name: validatedInput.customerName,
          notes: validatedInput.customerNotes,
        },
      });

      await prisma.order.create({
        data: {
          workspaceId: workspace.id,
          customerId: customer.id,
          items: parseItems(validatedInput.itemsText),
          totalPrice: decimal(validatedInput.totalPrice),
          deliveryDate: new Date(validatedInput.deliveryDate),
          status: validatedInput.status,
          paymentStatus: validatedInput.paymentStatus,
          notes: validatedInput.notes,
        },
      });

      revalidatePath("/today");
      revalidatePath("/orders");
      revalidatePath("/debts");

      return { success: true };
    },
  });
}

export async function updateOrderAction(
  input: UpdateOrderInput,
): Promise<{ success?: boolean; error?: string }> {
  return createAction({
    input,
    schema: updateOrderSchema,
    handler: async (validatedInput) => {
      const workspace = await requireWorkspace();
      if (!validatedInput) {
        return { error: "Données invalides" };
      }

      await prisma.order.updateMany({
        where: {
          id: validatedInput.orderId,
          workspaceId: workspace.id,
        },
        data: {
          status: validatedInput.status,
          paymentStatus: validatedInput.paymentStatus,
          notes: validatedInput.notes,
        },
      });

      revalidatePath("/today");
      revalidatePath("/orders");
      revalidatePath(`/orders/${validatedInput.orderId}`);

      return { success: true };
    },
  });
}

export async function addPaymentAction(
  input: AddPaymentInput,
): Promise<{ success?: boolean; error?: string }> {
  return createAction({
    input,
    schema: addPaymentSchema,
    handler: async (validatedInput) => {
      const workspace = await requireWorkspace();
      if (!validatedInput) {
        return { error: "Données invalides" };
      }

      await prisma.$transaction(async (tx) => {
        const order = await tx.order.findFirst({
          where: {
            id: validatedInput.orderId,
            workspaceId: workspace.id,
          },
          include: {
            orderPayments: true,
          },
        });

        if (!order) {
          throw new Error("Commande introuvable");
        }

        await tx.orderPayment.create({
          data: {
            workspaceId: workspace.id,
            orderId: order.id,
            amount: decimal(validatedInput.amount),
            paidAt: validatedInput.paidAt
              ? new Date(validatedInput.paidAt)
              : new Date(),
            note: validatedInput.note,
          },
        });

        const paidTotal =
          order.orderPayments.reduce(
            (acc, payment) => acc + Number(payment.amount),
            0,
          ) + validatedInput.amount;

        await tx.order.update({
          where: { id: order.id },
          data: {
            paymentStatus:
              paidTotal >= Number(order.totalPrice)
                ? "paid"
                : paidTotal > 0
                  ? "deposit"
                  : "unpaid",
          },
        });
      });

      revalidatePath("/today");
      revalidatePath("/orders");
      revalidatePath("/debts");
      revalidatePath(`/orders/${validatedInput.orderId}`);

      return { success: true };
    },
  });
}

export async function createExpenseAction(
  input: CreateExpenseInput,
): Promise<{ success?: boolean; error?: string }> {
  return createAction({
    input,
    schema: createExpenseSchema,
    handler: async (validatedInput) => {
      const workspace = await requireWorkspace();
      if (!validatedInput) {
        return { error: "Données invalides" };
      }

      await prisma.expense.create({
        data: {
          workspaceId: workspace.id,
          amount: decimal(validatedInput.amount),
          category: validatedInput.category,
          date: new Date(validatedInput.date),
          note: validatedInput.note,
        },
      });

      revalidatePath("/today");
      revalidatePath("/expenses");

      return { success: true };
    },
  });
}

export async function markCustomerPaidAction(
  input: MarkCustomerPaidInput,
): Promise<{ success?: boolean; error?: string }> {
  return createAction({
    input,
    schema: markCustomerPaidSchema,
    handler: async (validatedInput) => {
      const workspace = await requireWorkspace();
      if (!validatedInput) {
        return { error: "Données invalides" };
      }

      await prisma.$transaction(async (tx) => {
        const orders = await tx.order.findMany({
          where: {
            workspaceId: workspace.id,
            customerId: validatedInput.customerId,
          },
          include: {
            orderPayments: { select: { amount: true } },
          },
        });

        const ordersWithDebt = orders
          .map((order) => {
            const totalPaid = order.orderPayments.reduce(
              (acc, p) => acc + Number(p.amount),
              0,
            );
            return { id: order.id, remaining: Number(order.totalPrice) - totalPaid };
          })
          .filter((o) => o.remaining > 0);

        if (ordersWithDebt.length === 0) return;

        await tx.orderPayment.createMany({
          data: ordersWithDebt.map((o) => ({
            workspaceId: workspace.id,
            orderId: o.id,
            amount: decimal(o.remaining),
            note: validatedInput.note ?? "Paiement total depuis Dettes",
          })),
        });

        await tx.order.updateMany({
          where: { id: { in: ordersWithDebt.map((o) => o.id) } },
          data: { paymentStatus: "paid" },
        });
      });

      revalidatePath("/today");
      revalidatePath("/orders");
      revalidatePath("/debts");

      return { success: true };
    },
  });
}

export async function getCustomersForSheetAction() {
  const workspace = await requireWorkspace();
  return prisma.customer.findMany({
    where: { workspaceId: workspace.id },
    select: { id: true, name: true, phone: true },
    orderBy: { name: "asc" },
  });
}
