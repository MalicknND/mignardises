"use server";

import { createAction } from "@/lib/actions/action-wrapper";
import { z } from "zod";
import { customFetch } from "@/lib/fetch";
import { redirect } from "next/navigation";

import { ISubscription } from "@/types/interfaces/user/IUser";
import { CreateSubscriptionSchema } from "@/lib/schemas/payment.schema";

type CreateSubscriptionInput = z.infer<typeof CreateSubscriptionSchema>;

export async function getSubscriptionAction(): Promise<{ data?: { subscription: ISubscription|null }, error?: string }> {
  const res: { data?: { subscription: ISubscription|null }, error?: string } = await createAction({
    handler: async () => {
      return await customFetch({
        url: `/api/stripe/subscription`,
        method: "GET"
      });
    }
  });

  if (res.error) return { error: res.error };
  return res;
}

export async function createSubscriptionAction(input: CreateSubscriptionInput): Promise<{ data?: { url: string }, error?: string }> {
  const res: { data?: { url: string }, error?: string } = await createAction({
    input: input,
    schema: CreateSubscriptionSchema,
    handler: async () => {
      return await customFetch({
        url: `/api/stripe/subscription`,
        method: "POST",
        body: input,
        tags: ["subscription"]
      });
    }
  });

  if (res.error) return { error: res.error };
  redirect(res.data!.url);
};

export async function getPortalUrlAction(): Promise<{ data?: { url: string }, success?: boolean, error?: string }> {
  const res: { data?: { url: string }, error?: string } = await createAction({
    handler: async () => {
      try {
        const result = await customFetch({
          url: '/api/stripe/portal',
          method: 'GET'
        })

        if (result.error) return { error: result.error }
        if (!result.data?.url) return { error: "Invalid portal URL response" }

        return { data: { url: result.data.url } }
      } catch (error) {
        console.error('Failed to access portal:', error)
        return { error: "Failed to access billing portal" }
      }
    }
  })

  if (res.error) return { error: res.error };
  redirect(res.data!.url);
} 