import { Resend } from 'resend'

export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

type EmailConfig = {
  to: string | string[];
  subject: string;
  react?: React.ReactNode;
  text?: string;
  html?: string;
  from?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
};

export async function sendEmail({
  to,
  subject,
  react,
  text,
  html,
  from = process.env.NEXT_PUBLIC_SENDER_EMAIL!,
  replyTo = process.env.NEXT_PUBLIC_SENDER_EMAIL!,
  cc,
  bcc,
}: EmailConfig) {
  try {
    if (!react && !text && !html) {
      throw new Error("Either react, text, or html content must be provided");
    }

    if (!resend) {
      throw new Error("RESEND_API_KEY not found, email sending is disabled");
    }

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      react,
      text,
      html,
      replyTo,
      cc,
      bcc,
    });

    if (error) {
      console.error("Failed to send email:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to send email");
  }
}