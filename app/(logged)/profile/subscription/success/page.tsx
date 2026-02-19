import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default async function SubscriptionSuccessPage({ searchParams }: { searchParams: Promise<{ session_id: string }> }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error("No Stripe session ID provided");
  }

  // Auto redirect after 5 seconds
  const redirectAfterTimeout = `
    <script>
      setTimeout(() => {
        window.location.href = '/profile/subscription'
      }, 5000)
    </script>
  `;

  return (
    <div className="container max-w-lg mx-auto py-10">
      <Card className="p-6">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="rounded-full bg-primary/10 p-3">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Thank you for your subscription!
            </h1>
            <p className="text-muted-foreground">
              Your subscription has been confirmed. You will be redirected to your profile page in a few seconds.
            </p>
          </div>
        </div>
      </Card>
      <div dangerouslySetInnerHTML={{ __html: redirectAfterTimeout }} />
    </div>
  );
} 