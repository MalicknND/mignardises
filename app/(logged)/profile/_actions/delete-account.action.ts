"use server";

import { createAction } from "@/lib/actions/action-wrapper";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function deleteAccountAction(): Promise<{error?: string, success?: true}> {
  return await createAction({
    handler: async () => {
      const headersList = await headers();
      const session = await auth.api.getSession({ headers: headersList });
      const user = session?.user;

      if (!user) {
        return { error: "Not authenticated" };
      }

      await prisma.$transaction(async (tx) => {
        await tx.userProfile.delete({
          where: { userId: user.id },
        }).catch(() => {});

        await tx.user.delete({
          where: { id: user.id },
        });
      });

      return { success: true };
    }
  });
}