import type { Metadata, Viewport } from "next";
import { Nunito, Fira_Code } from "next/font/google";
import "./globals.css";
import { projectConfig } from "@/config/project";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SubscriptionProvider } from "@/components/providers/subscription-provider";

const primaryFont = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const secondaryFont = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: projectConfig.name,
  description: projectConfig.description,
  metadataBase: new URL(projectConfig.url),
  openGraph: {
    title: projectConfig.name,
    description: projectConfig.description,
    url: projectConfig.url,
    siteName: projectConfig.name,
    images: [
      {
        url: projectConfig.ogImage,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${primaryFont.variable} ${secondaryFont.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme={!projectConfig.features.darkMode ? "light" : undefined}
          enableSystem={projectConfig.features.darkMode}
          disableTransitionOnChange
        >
          <SubscriptionProvider>
            <NuqsAdapter>
              {children}
              <Toaster
                position="top-right"
                expand={false}
                richColors
                closeButton
              />
            </NuqsAdapter>
          </SubscriptionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
