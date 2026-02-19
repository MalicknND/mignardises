import { Database } from "lucide-react";
import { FeatureCard } from "./feature-card";

const PRISMA_EXAMPLE = `// Prisma schema example
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}

// Prisma query example
const user = await prisma.user.findUnique({
  where: { email },
  include: { posts: true }
});`;

export function DatabaseFeature() {
  return (
    <FeatureCard
      title="Supabase + Prisma"
      description="Powerful database setup with Supabase PostgreSQL and Prisma ORM"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          <span className="text-sm text-muted-foreground">Type-safe database operations</span>
        </div>
        <pre className="h-[500px] overflow-y-auto rounded-lg bg-muted p-4 overflow-x-auto">
          <code className="text-sm">{PRISMA_EXAMPLE}</code>
        </pre>
      </div>
    </FeatureCard>
  );
} 