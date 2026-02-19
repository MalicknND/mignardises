import { projectConfig } from "@/config/project"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { SubscribeButton } from "./subscribe-button"

export function SubscriptionPlans() {
  const plans = projectConfig.features.stripe.plans

  return (
    <>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Choose your plan</h1>
        <p className="text-muted-foreground mt-4">Select the perfect plan for your needs</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`
              flex flex-col relative group
              transition-all duration-300 ease-out
              hover:scale-105 hover:shadow-xl
              ${plan.popular ? 'border-0 bg-secondary before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/50 before:to-primary before:opacity-[0.15] before:rounded-lg before:-z-10' : ''}
              ${plan.popular ? 'after:absolute after:inset-0 after:bg-gradient-to-br after:from-primary after:to-primary/50 after:opacity-0 after:rounded-lg after:transition-opacity after:duration-300 after:-z-10 hover:after:opacity-[0.15]' : 'hover:border-primary/50'}
            `}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {plan.name}
                {plan.popular && (
                  <span className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full shadow-lg">
                    Popular
                  </span>
                )}
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="font-bold text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {plan.price}
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li 
                    key={feature} 
                    className="flex items-center gap-2 opacity-0 animate-fadeIn"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <Check className={`h-4 w-4 ${plan.popular ? 'text-primary' : 'text-primary/70'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <SubscribeButton 
                priceId={plan.priceId}
                variant={plan.popular ? "default" : "outline"}
                className={`
                  w-full transition-all duration-300
                  ${plan.popular ? 'shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5' : 'hover:bg-primary hover:text-primary-foreground hover:dark:text-white/80'}
                `}
              >
                {plan.buttonText}
              </SubscribeButton>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
} 