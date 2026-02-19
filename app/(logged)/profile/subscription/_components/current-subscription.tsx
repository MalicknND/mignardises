import { projectConfig } from "@/config/project"
import { useSubscription } from "@/lib/hooks/use-subscription"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Calendar, CheckCircle2, AlertCircle } from "lucide-react"
import { getPortalUrlAction } from "../_actions/subscription.action"
import { toastSystem } from "@/lib/toasts"
import { format } from "date-fns"

export function CurrentSubscription() {
  const subscription = useSubscription((state) => state.subscription)
  const plans = projectConfig.features.stripe.plans

  if (!subscription) return null

  const currentPlan = plans.find(p => p.priceId === subscription.priceId)
  const isActive = subscription.status === 'active'
  
  const handlePortalAccess = async () => {
    const result = await getPortalUrlAction({})
    if (result.error) return toastSystem.error(result.error)
    if (result.data?.url) window.location.href = result.data.url
  }

  return (
    <Card className="mb-10 bg-card border-border overflow-hidden">      
      <CardHeader>
        <div className="grid grid-cols-2 gap-2">
          <CardTitle className="col-span-2 md:col-span-1 flex items-center gap-2 text-2xl">
            <CreditCard className="h-6 w-6 text-primary" />
            Current Subscription
          </CardTitle>

          <div className="col-span-2 md:col-span-1 flex md:justify-end">
            <Button 
              onClick={handlePortalAccess}
              variant="outline" 
              className="hover:bg-primary hover:text-white dark:hover:text-white transition-colors"
            >
              Manage Subscription
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Plan</p>
            <p className="text-lg font-semibold">{currentPlan?.name || 'Unknown'}</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary">
            {isActive ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-500">Active</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-500">
                  {subscription.status}
                </span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Renews on</p>
              <p className="font-medium">
                {format(new Date(subscription.currentPeriodEnd), 'MMMM d, yyyy')}
              </p>
            </div>
          </div>

          {subscription?.cancelAt && (
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Will cancel on</p>
                <p className="font-medium">{format(new Date(subscription.cancelAt), 'MMMM d, yyyy')}
                </p>
            </div>
          </div>
        )}
        </div>
      </CardContent>
    </Card>
  )
} 