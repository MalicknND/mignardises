import { Code } from "lucide-react";
import { FeatureCard } from "./feature-card";

export function CursorRules() {
  return (
    <FeatureCard
      title="Cursor Rules"
      description="Pre-integrated Cursor rules for better code consistency and productivity"
    >
      <div className="flex items-center gap-4 text-muted-foreground">
        <Code className="h-8 w-8" />
        <div className="space-y-1">
          <p>Includes rules for:</p>
          <ul className="list-disc list-inside">
            <li>Naming conventions</li>
            <li>Component structure</li>
            <li>Server/Client components</li>
            <li>Prisma usage</li>
            <li>Server actions</li>
          </ul>
        </div>
      </div>
    </FeatureCard>
  );
} 