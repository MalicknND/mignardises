import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

const STRIPE_CONFIG_EXAMPLE = `export const projectConfig: ProjectConfig = {
  ...
  /* Project Features */
  features: {
    ...
    stripe: {
      enabled: true,
      plans: [
        {
          name: "Basic",
          description: "Perfect for getting started",
          price: "$9/month",
          priceId: process.env.STRIPE_STARTER_PRICE_ID || "",
          features: ["Basic features", "Email support", "1 user"],
          buttonText: "Start Basic",
          popular: false
        }
      ]
    }
  }
}`;

export function StripeFeature() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          <CardTitle className="text-lg">Stripe Integration</CardTitle>
        </div>
        <CardDescription>Ready-to-use payment and subscription system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Process payments and manage subscriptions with ease using our pre-configured Stripe integration.
        </p>
        <ul className="text-sm space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-primary">→</span>
            <span>One-time payments processing</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">→</span>
            <span>Subscription management</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">→</span>
            <span>Webhook handling setup</span>
          </li>
        </ul>
        <pre className="mt-6 h-[500px] overflow-y-auto rounded-lg bg-muted p-4 overflow-x-auto">
          <code className="text-sm">{STRIPE_CONFIG_EXAMPLE}</code>
        </pre>
      </CardContent>
    </Card>
  );
} 