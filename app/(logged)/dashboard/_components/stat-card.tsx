import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { Activity, CreditCard, DollarSign, Users } from "lucide-react"

type StatCardProps = {
  title: string
  value: string
  trend: {
    value: string
    isPositive: boolean
  }
  icon: LucideIcon
  gradient: {
    from: string
    to: string
  }
}

export const STATS_EXAMPLE_DATA = [
  {
    title: "Revenue",
    value: "$45,231",
    trend: {
      value: "+20.1%",
      isPositive: true
    },
    icon: DollarSign,
    gradient: {
      from: "indigo-500",
      to: "purple-500"
    }
  },
  {
    title: "Active Users",
    value: "+2350",
    trend: {
      value: "+180.1%",
      isPositive: true
    },
    icon: Users,
    gradient: {
      from: "pink-500",
      to: "rose-500"
    }
  },
  {
    title: "Active Now",
    value: "+573",
    trend: {
      value: "-201",
      isPositive: false
    },
    icon: Activity,
    gradient: {
      from: "blue-500",
      to: "cyan-500"
    }
  },
  {
    title: "Sales",
    value: "+12,234",
    trend: {
      value: "+19%",
      isPositive: true
    },
    icon: CreditCard,
    gradient: {
      from: "amber-500",
      to: "orange-500"
    }
  }
] as const

export function StatCard({ title, value, trend, icon: Icon, gradient }: StatCardProps) {
  const getGradientClasses = (from: string, to: string) => {
    const gradientMap = {
      "indigo-500": "from-indigo-500 to-purple-500",
      "pink-500": "from-pink-500 to-rose-500",
      "blue-500": "from-blue-500 to-cyan-500",
      "amber-500": "from-amber-500 to-orange-500"
    }
    return gradientMap[from as keyof typeof gradientMap] || "from-primary to-primary-foreground"
  }
  
  return (
    <Card className={`overflow-hidden border-none bg-gradient-to-br ${getGradientClasses(gradient.from, gradient.to)} text-white shadow-lg hover:shadow-xl transition-all`}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/10 backdrop-blur-lg rounded-xl">
            <Icon className="w-6 h-6" />
          </div>

          <div>
            <p className="text-sm font-medium text-white/70">{title}</p>
            <h3 className="text-xl font-bold">{value}</h3>
            <p 
              className={`text-xs ${
                trend.isPositive 
                  ? "bg-emerald-500/20 text-emerald-100" 
                  : "bg-red-500/20 text-red-100"
              } px-2 py-0.5 rounded-full inline-block mt-1`}
            >
              {trend.value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 