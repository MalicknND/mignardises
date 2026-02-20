import { cache } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { projectConfig } from "@/config/project";

export const getSession = cache(async () => {
  return auth.api.getSession({ headers: await headers() });
});

export const isEmailProviderEnabled = () => {
  return projectConfig.features.auth.providers.credentials;
}

export const isGoogleProviderEnabled = () => {
  return !!(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET);
};