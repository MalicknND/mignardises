"use server";

import { z } from "zod";
import { createAction } from "@/lib/actions/action-wrapper";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { uploadFile } from "@/lib/storage";

const UpdateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  image: z.any().optional(),
  birthDate: z.date().optional().nullable(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'] as const),
  phoneNumber: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
});

export async function updateProfileAction(input: z.infer<typeof UpdateProfileSchema>): Promise<{error?: string, success?: true}> {
  return await createAction({
    input,
    schema: UpdateProfileSchema,
    handler: async () => {
      const session = await auth.api.getSession({ headers: await headers() })  
      const user = session?.user;

      if (!user) {
        return { error: "Not authenticated" };
      }

      const result = UpdateProfileSchema.safeParse(input);

      if (!result.success) {
        return { error: "Invalid input" };
      }

      // Check if email is already taken by another user
      const existingUser = await prisma.user.findFirst({
        where: {
          email: input.email,
          NOT: {
            id: user.id,
          },
        },
      });

      if (existingUser) {
        return { error: "Email already taken" };
      }

      let imageUrl = user.image;

      if (input.image) {
        try {          
          imageUrl = await uploadFile({
            file: input.image,
            userId: user.id,
            oldUrl: user.image
          });
        } catch (error) {
          console.error('Error uploading image:', error);
          return { error: "Failed to upload image" };
        }
      }

      await prisma.$transaction(async (tx) => {
        await tx.user.update({
          where: { id: user.id },
          data: {
            name: input.name,
            email: input.email,
            image: imageUrl,
          },
        });

        await tx.userProfile.upsert({
          where: { userId: user.id },
          create: {
            userId: user.id,
            birthDate: input.birthDate,
            gender: input.gender,
            phoneNumber: input.phoneNumber,
            address: input.address,
          },
          update: {
            birthDate: input.birthDate,
            gender: input.gender,
            phoneNumber: input.phoneNumber,
            address: input.address,
          },
        });
      });

      return { success: true };
    }
  });
}