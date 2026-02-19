"use server";

import { ContactFormSchema, type ContactFormType } from "@/lib/schemas/contact.schema";

import { createAction } from "@/lib/actions/action-wrapper";
import { sendEmail } from "@/lib/emails";

export async function sendContactEmailAction(input: ContactFormType): Promise<{ success?: true, error?: string }> {
  return await createAction({
    input: input,
    schema: ContactFormSchema,
    handler: async () => {
      await sendEmail({
        to: process.env.NEXT_PUBLIC_CONTACT_EMAIL!,
        subject: `New contact from ${input.name}`,
        text: `
          Name: ${input.name}
          Email: ${input.email}
          Message: ${input.message}
        `,
      });

      return { success: true };
    }
  });
};