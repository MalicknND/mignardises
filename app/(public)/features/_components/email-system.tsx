import { Mail } from "lucide-react";
import { FeatureCard } from "./feature-card";

const EMAIL_EXAMPLE = `// Email template with React
export function WelcomeEmail({ name }) {
  return (
    <Email>
      <h1>Welcome, {name}!</h1>
      <p>Thanks for joining us.</p>
    </Email>
  );
}

// Send email with Resend
await resend.emails.send({
  from: "hello@example.com",
  to: "user@example.com",
  subject: "Welcome!",
  react: <WelcomeEmail name="John" />,
});`;

export function EmailSystem() {
  return (
    <FeatureCard
      title="Email System"
      description="Beautiful React email templates with Resend"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          <span className="text-sm text-muted-foreground">React Email + Resend</span>
        </div>
        <pre className="h-[500px] overflow-y-auto rounded-lg bg-muted p-4 overflow-x-auto">
          <code className="text-sm">{EMAIL_EXAMPLE}</code>
        </pre>
      </div>
    </FeatureCard>
  );
} 