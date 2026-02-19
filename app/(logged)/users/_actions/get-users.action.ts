"use server";

import { z } from "zod";
import { createAction } from "@/lib/actions/action-wrapper";
import prisma from "@/lib/prisma";

const GetUsersSchema = z.object({
  search: z.string().default(""),
  page: z.number().int().positive().default(1),
});

type GetUsersInput = z.infer<typeof GetUsersSchema>;

export async function getUsersAction(input: GetUsersInput): Promise<{ data?: { users: any[]; totalPages: number }, error?: string }> {
  return await createAction({
    input,
    schema: GetUsersSchema,
    handler: async () => {
      const take = 10;
      const skip = (input.page - 1) * take;

      const where = {
        OR: [
          {
            name: {
              contains: input.search,
              mode: "insensitive" as const,
            },
          },
          {
            email: {
              contains: input.search,
              mode: "insensitive" as const,
            },
          },
        ],
      };

      const [users, count] = await Promise.all([
        prisma.user.findMany({
          where,
          take,
          skip,
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            createdAt: true,
            updatedAt: true,
          },
        }),
        prisma.user.count({ where }),
      ]);

      return {
        data: {
          users,
          totalPages: Math.ceil(count / take),
        },
      };
    }
  });
}