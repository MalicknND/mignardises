import { Settings } from "lucide-react";
import { FeatureCard } from "./feature-card";

const CONFIG_EXAMPLE = `export const siteConfig = {
  name: "Next.js Template",
  description: "Your project description",
  url: "https://your-url.com",
  ogImage: "https://your-url.com/og.jpg",
  links: {
    twitter: "https://twitter.com/your-account",
    github: "https://github.com/your-account"
  }
}`;

export function SiteConfig() {
  return (
    <FeatureCard
      title="Site Configuration"
      description="Easy to customize site configuration"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          <span className="text-sm text-muted-foreground">config/site.ts</span>
        </div>
        <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
          <code className="text-sm">{CONFIG_EXAMPLE}</code>
        </pre>
      </div>
    </FeatureCard>
  );
} 