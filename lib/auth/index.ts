import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../prisma";
import { render } from '@react-email/render'
import ResetPasswordEmail from '@/lib/emails/reset-password'
import { sendEmail } from "../emails";
import { nextCookies } from "better-auth/next-js";
import { Role } from "../generated/prisma";

const {
  NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NEXT_PUBLIC_BASE_URL,
} = process.env;

export const auth = betterAuth({
  baseURL: NEXT_PUBLIC_BASE_URL,
  trustedOrigins: NEXT_PUBLIC_BASE_URL ? [NEXT_PUBLIC_BASE_URL] : undefined,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  user: {
    additionalFields: {
      roles: {
        type: "string[]",
        default: [Role.USER],
      },
      stripeCustomerId: {
        type: "string",
        default: null,
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    allowSignup: true,
    autoSignIn: true,
    allowLogin: true,
    allowResetPassword: true,
    allowChangePassword: true,
    sendResetPassword: async ({ user, url }) => {
      const html = await render(ResetPasswordEmail({ resetLink: url }))
      await sendEmail({
        to: user.email,
        subject: 'Reset your password',
        html,
      });
    }, 
  },
  socialProviders: {
    ...(!!NEXT_PUBLIC_GOOGLE_CLIENT_ID && !!GOOGLE_CLIENT_SECRET) && {
      google: {
        clientId: NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        clientSecret: GOOGLE_CLIENT_SECRET!,
      }
    }
  },
  plugins: [
    nextCookies()
  ]
});