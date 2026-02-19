import { z } from "zod";

export const PaymentSchema = z.object({
  amount: z.number().min(1).optional(),
  priceIds: z.array(z.string()).min(1).optional(),
}).refine(data => data.amount || data.priceIds, {
  message: "Either amount or priceIds must be provided"
});

export const CreateSubscriptionSchema = z.object({
  priceId: z.string(),
});