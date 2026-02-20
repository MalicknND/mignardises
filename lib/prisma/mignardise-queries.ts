import prisma from "@/lib/prisma";
import { ExpenseCategory, Prisma } from "@/lib/generated/prisma";
import { endOfDay, startOfDay } from "date-fns";

const decimalToNumber = (value: Prisma.Decimal | number | null | undefined) =>
  value ? Number(value) : 0;

export type TodayOrder = {
  id: string;
  customerName: string;
  items: unknown;
  totalPrice: number;
  paidAmount: number;
  deliveryDate: Date;
  status: string;
  paymentStatus: string;
};

export type CustomerDebt = {
  customerId: string;
  customerName: string;
  phone: string;
  totalOrders: number;
  totalPaid: number;
  debt: number;
};

type DebtSummaryRow = { debt_count: bigint; receivable: Prisma.Decimal };

export const getTodayData = async (workspaceId: string, date = new Date()) => {
  const dayStart = startOfDay(date);
  const dayEnd = endOfDay(date);

  const [receivedAggregate, expenseAggregate, todayOrdersRaw, debtSummaryRows] =
    await Promise.all([
      prisma.orderPayment.aggregate({
        where: {
          workspaceId,
          paidAt: { gte: dayStart, lte: dayEnd },
        },
        _sum: { amount: true },
      }),
      prisma.expense.aggregate({
        where: {
          workspaceId,
          date: { gte: dayStart, lte: dayEnd },
        },
        _sum: { amount: true },
      }),
      prisma.order.findMany({
        where: {
          workspaceId,
          deliveryDate: { gte: dayStart, lte: dayEnd },
        },
        include: {
          customer: true,
          orderPayments: { select: { amount: true } },
        },
        orderBy: { deliveryDate: "asc" },
      }),
      prisma.$queryRaw<DebtSummaryRow[]>`
        SELECT
          COUNT(*) AS debt_count,
          COALESCE(SUM(orders_agg.total_orders - COALESCE(payments_agg.total_paid, 0)), 0) AS receivable
        FROM customer c
        JOIN (
          SELECT "customerId", SUM("totalPrice") AS total_orders
          FROM "order"
          WHERE "workspaceId" = ${workspaceId}
          GROUP BY "customerId"
        ) orders_agg ON orders_agg."customerId" = c.id
        LEFT JOIN (
          SELECT o."customerId", SUM(op.amount) AS total_paid
          FROM order_payment op
          JOIN "order" o ON o.id = op."orderId"
          WHERE o."workspaceId" = ${workspaceId}
          GROUP BY o."customerId"
        ) payments_agg ON payments_agg."customerId" = c.id
        WHERE c."workspaceId" = ${workspaceId}
          AND orders_agg.total_orders > COALESCE(payments_agg.total_paid, 0)
      `,
    ]);

  const todayOrders: TodayOrder[] = todayOrdersRaw.map((order) => {
    const paidAmount = order.orderPayments.reduce(
      (acc, payment) => acc + decimalToNumber(payment.amount),
      0,
    );
    return {
      id: order.id,
      customerName: order.customer.name,
      items: order.items,
      totalPrice: decimalToNumber(order.totalPrice),
      paidAmount,
      deliveryDate: order.deliveryDate,
      status: order.status,
      paymentStatus: order.paymentStatus,
    };
  });

  const received = decimalToNumber(receivedAggregate._sum.amount);
  const spent = decimalToNumber(expenseAggregate._sum.amount);
  const debtRow = debtSummaryRows[0] ?? {
    debt_count: BigInt(0),
    receivable: new Prisma.Decimal(0),
  };

  return {
    summary: {
      received,
      spent,
      balance: received - spent,
      receivable: decimalToNumber(debtRow.receivable),
      preparingCount: todayOrders.filter((o) => o.status !== "delivered")
        .length,
      debtCustomersCount: Number(debtRow.debt_count),
    },
    todayOrders,
  };
};

export const getOrders = async (workspaceId: string, page = 1, limit = 50) => {
  const orders = await prisma.order.findMany({
    where: { workspaceId },
    include: {
      customer: true,
      orderPayments: { select: { amount: true } },
    },
    orderBy: { deliveryDate: "desc" },
    take: limit,
    skip: (page - 1) * limit,
  });

  return orders.map((order) => ({
    id: order.id,
    customerName: order.customer.name,
    deliveryDate: order.deliveryDate,
    status: order.status,
    paymentStatus: order.paymentStatus,
    totalPrice: decimalToNumber(order.totalPrice),
    paidAmount: order.orderPayments.reduce(
      (acc, payment) => acc + decimalToNumber(payment.amount),
      0,
    ),
  }));
};

type DebtRow = {
  customer_id: string;
  customer_name: string;
  phone: string;
  total_orders: Prisma.Decimal;
  total_paid: Prisma.Decimal;
  debt: Prisma.Decimal;
};

export const getDebts = async (workspaceId: string) => {
  const rows = await prisma.$queryRaw<DebtRow[]>`
    SELECT
      c.id AS customer_id,
      c.name AS customer_name,
      c.phone,
      orders_agg.total_orders,
      COALESCE(payments_agg.total_paid, 0) AS total_paid,
      orders_agg.total_orders - COALESCE(payments_agg.total_paid, 0) AS debt
    FROM customer c
    JOIN (
      SELECT "customerId", SUM("totalPrice") AS total_orders
      FROM "order"
      WHERE "workspaceId" = ${workspaceId}
      GROUP BY "customerId"
    ) orders_agg ON orders_agg."customerId" = c.id
    LEFT JOIN (
      SELECT o."customerId", SUM(op.amount) AS total_paid
      FROM order_payment op
      JOIN "order" o ON o.id = op."orderId"
      WHERE o."workspaceId" = ${workspaceId}
      GROUP BY o."customerId"
    ) payments_agg ON payments_agg."customerId" = c.id
    WHERE c."workspaceId" = ${workspaceId}
      AND orders_agg.total_orders > COALESCE(payments_agg.total_paid, 0)
    ORDER BY c.name ASC
  `;

  return rows.map((row) => ({
    customerId: row.customer_id,
    customerName: row.customer_name,
    phone: row.phone,
    totalOrders: decimalToNumber(row.total_orders),
    totalPaid: decimalToNumber(row.total_paid),
    debt: decimalToNumber(row.debt),
  }));
};

export const getOrderById = async (workspaceId: string, orderId: string) => {
  const order = await prisma.order.findFirst({
    where: { id: orderId, workspaceId },
    include: {
      customer: true,
      orderPayments: { orderBy: { paidAt: "asc" } },
    },
  });

  if (!order) return null;

  const paidAmount = order.orderPayments.reduce(
    (acc, p) => acc + decimalToNumber(p.amount),
    0,
  );

  return {
    id: order.id,
    customer: {
      id: order.customer.id,
      name: order.customer.name,
      phone: order.customer.phone,
    },
    items: order.items as string[],
    totalPrice: decimalToNumber(order.totalPrice),
    paidAmount,
    remaining: decimalToNumber(order.totalPrice) - paidAmount,
    deliveryDate: order.deliveryDate,
    status: order.status,
    paymentStatus: order.paymentStatus,
    notes: order.notes,
    payments: order.orderPayments.map((p) => ({
      id: p.id,
      amount: decimalToNumber(p.amount),
      paidAt: p.paidAt,
      note: p.note,
    })),
  };
};

export const getExpenses = async (workspaceId: string) => {
  const [expenses, categoryAggregates] = await Promise.all([
    prisma.expense.findMany({
      where: { workspaceId },
      orderBy: { date: "desc" },
      take: 100,
    }),
    prisma.expense.groupBy({
      by: ["category"],
      where: { workspaceId },
      _sum: { amount: true },
    }),
  ]);

  const byCategory = Object.values(ExpenseCategory).reduce(
    (acc, category) => {
      acc[category] = 0;
      return acc;
    },
    {} as Record<ExpenseCategory, number>,
  );

  for (const row of categoryAggregates) {
    byCategory[row.category] = decimalToNumber(row._sum.amount);
  }

  return {
    expenses: expenses.map((expense) => ({
      id: expense.id,
      amount: decimalToNumber(expense.amount),
      category: expense.category,
      date: expense.date,
      note: expense.note,
    })),
    byCategory,
  };
};
