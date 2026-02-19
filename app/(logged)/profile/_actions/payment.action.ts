"use server";

import { createAction } from "@/lib/actions/action-wrapper";
import { z } from "zod";
import { customFetch } from "@/lib/fetch";
import { redirect } from "next/navigation";
import { PaymentSchema } from "@/lib/schemas/payment.schema";

type TInput = z.infer<typeof PaymentSchema>;

export async function createPaymentAction(input: TInput): Promise<{ data?: { url: string }, error?: string }> {  
  const res: { data?: { url: string }, error?: string } = await createAction({
    input,
    schema: PaymentSchema,
    handler: async () => {
      return await customFetch({
        url: "/api/stripe/payment",
        method: "POST",
        body: input
      });
    }
  });

  if (res.error) return { error: res.error };
  redirect(res.data!.url);
} 