import { projectConfig } from "@/config/project";

export const isEmailProviderEnabled = () => {
  return projectConfig.features.auth.providers.credentials;
}

export const isGoogleProviderEnabled = () => {
  return !!(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET);
}; 