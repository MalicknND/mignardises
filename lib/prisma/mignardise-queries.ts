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

export const getTodayData = async (workspaceId: string, date = new Date()) => {
  const dayStart = startOfDay(date);
  const dayEnd = endOfDay(date);

  const [receivedAggregate, expenseAggregate, todayOrdersRaw, customersRaw] =
    await prisma.$transaction([
      prisma.orderPayment.aggregate({
        where: {
          workspaceId,
          paidAt: {
            gte: dayStart,
            lte: dayEnd,
          },
        },
        _sum: {
          amount: true,
        },
      }),
      prisma.expense.aggregate({
        where: {
          workspaceId,
          date: {
            gte: dayStart,
            lte: dayEnd,
          },
        },
        _sum: {
          amount: true,
        },
      }),
      prisma.order.findMany({
        where: {
          workspaceId,
          deliveryDate: {
            gte: dayStart,
            lte: dayEnd,
          },
        },
        include: {
          customer: true,
          orderPayments: {
            select: {
              amount: true,
            },
          },
        },
        orderBy: {
          deliveryDate: "asc",
        },
      }),
      prisma.customer.findMany({
        where: { workspaceId },
        include: {
          orders: {
            select: {
              id: true,
              totalPrice: true,
              orderPayments: {
                select: {
                  amount: true,
                },
              },
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      }),
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

  const debts: CustomerDebt[] = customersRaw
    .map((customer) => {
      const totalOrders = customer.orders.reduce(
        (acc, order) => acc + decimalToNumber(order.totalPrice),
        0,
      );
      const totalPaid = customer.orders.reduce(
        (acc, order) =>
          acc +
          order.orderPayments.reduce(
            (subAcc, payment) => subAcc + decimalToNumber(payment.amount),
            0,
          ),
        0,
      );
      const debt = totalOrders - totalPaid;

      return {
        customerId: customer.id,
        customerName: customer.name,
        phone: customer.phone,
        totalOrders,
        totalPaid,
        debt,
      };
    })
    .filter((customer) => customer.debt > 0);

  const received = decimalToNumber(receivedAggregate._sum.amount);
  const spent = decimalToNumber(expenseAggregate._sum.amount);

  return {
    summary: {
      received,
      spent,
      balance: received - spent,
      receivable: debts.reduce((acc, item) => acc + item.debt, 0),
      preparingCount: todayOrders.filter(
        (order) => order.status !== "delivered",
      ).length,
      debtCustomersCount: debts.length,
    },
    todayOrders,
    debts,
  };
};

export const getOrders = async (workspaceId: string) => {
  const orders = await prisma.order.findMany({
    where: { workspaceId },
    include: {
      customer: true,
      orderPayments: {
        select: { amount: true },
      },
    },
    orderBy: {
      deliveryDate: "desc",
    },
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

export const getDebts = async (workspaceId: string) => {
  const customers = await prisma.customer.findMany({
    where: { workspaceId },
    include: {
      orders: {
        select: {
          totalPrice: true,
          orderPayments: {
            select: { amount: true },
          },
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return customers
    .map((customer) => {
      const totalOrders = customer.orders.reduce(
        (acc, order) => acc + decimalToNumber(order.totalPrice),
        0,
      );
      const totalPaid = customer.orders.reduce(
        (acc, order) =>
          acc +
          order.orderPayments.reduce(
            (subAcc, payment) => subAcc + decimalToNumber(payment.amount),
            0,
          ),
        0,
      );

      return {
        customerId: customer.id,
        customerName: customer.name,
        phone: customer.phone,
        totalOrders,
        totalPaid,
        debt: totalOrders - totalPaid,
      };
    })
    .filter((customer) => customer.debt > 0);
};

export const getExpenses = async (workspaceId: string) => {
  const expenses = await prisma.expense.findMany({
    where: { workspaceId },
    orderBy: {
      date: "desc",
    },
  });

  const byCategory = Object.values(ExpenseCategory).reduce(
    (acc, category) => {
      acc[category] = 0;
      return acc;
    },
    {} as Record<ExpenseCategory, number>,
  );

  for (const expense of expenses) {
    byCategory[expense.category] += decimalToNumber(expense.amount);
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
