"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type RecentUser = {
  name: string
  email: string
  amount: string
  image?: string
  initials: string
}

export const RECENT_USERS_EXAMPLE: RecentUser[] = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    initials: "OM"
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    initials: "JL"
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    initials: "IN"
  },
  {
    name: "William Kim",
    email: "william.kim@email.com",
    amount: "+$99.00",
    initials: "WK"
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    initials: "SD"
  }
]

export function RecentUsers() {
  return (
    <Card className="col-span-4 border-none shadow-lg hover:shadow-xl transition-all bg-white dark:bg-black">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Recent Users
        </CardTitle>

        <CardDescription className="text-muted-foreground/60">
          A list of users who recently joined your platform.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {RECENT_USERS_EXAMPLE.map((user) => (
            <div 
              key={user.email} 
              className="flex items-center p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-sm text-muted-foreground/60">
                  {user.email}
                </p>
              </div>
              <div className="ml-auto font-medium text-green-600 dark:text-green-400 bg-green-100/10 px-3 py-1 rounded-full">
                {user.amount}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 