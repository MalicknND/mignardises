"use server";

import { createAction } from "@/lib/actions/action-wrapper";
import { z } from "zod";
//import prisma from "@/lib/prisma";
import { customFetch } from "@/lib/fetch";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { IUser } from "@/types/interfaces/user/IUser";
import { IPostAction } from "@/types/interfaces/common/IPostAction";

const Schema = z.object({
  email: z.string().email("Email invalide"),
});

type TInput = z.infer<typeof Schema>;

export async function getExampleAction(input: TInput, postAction?: IPostAction): Promise<{ data?: IUser, success?: boolean, error?: string }> {
  const res: { data?: IUser; error?: string } = await createAction({
    input: input,
    schema: Schema,
    handler: async () => {
      // ...Do some operations like Prisma queries, API calls, etc.

      // Example with Prisma query
      /*
        const user = await prisma.user.findUnique({
          where: { email: input.email },
        });

        if (!user) return { error: "User not found" };
        return { data: user };
      */

      // Example with API call
      return await customFetch({
        url: `/api/example?email=${input.email}`,
        method: "GET",
        tags: ["getExample"]
      });
    }
  });  

  if (res.error) return { error: res.error };
  if (postAction?.revalidateTags) postAction.revalidateTags.forEach((tag) => revalidateTag(tag));
  if (postAction?.redirectPath) redirect(postAction.redirectPath);
  return res.data ? { data: res.data } : { success: true };
};