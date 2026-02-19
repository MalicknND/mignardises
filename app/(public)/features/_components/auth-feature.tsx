import { Lock } from "lucide-react";
import { FeatureCard } from "./feature-card";

export function AuthFeature() {
  return (
    <FeatureCard
      title="Better Auth Integration"
      description="Secure authentication with better-auth package"
    >
      <div className="flex items-center gap-4 text-muted-foreground">
        <Lock className="h-8 w-8" />
        <div className="space-y-1">
          <p>Features included:</p>
          <ul className="list-disc list-inside">
            <li>Email/Password authentication</li>
            <li>OAuth providers support</li>
            <li>Session management</li>
            <li>Protected routes</li>
            <li>Role-based access control</li>
          </ul>
        </div>
      </div>
    </FeatureCard>
  );
} 