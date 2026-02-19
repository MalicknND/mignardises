import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

export function DashboardCalendar() {
  return (
    <Card className="col-span-4 sm:col-span-3 border-none shadow-lg hover:shadow-xl transition-all bg-white dark:bg-black h-[450px]">
      <CardHeader className="flex-none">
        <CardTitle className="text-xl font-semibold">
          Calendar
        </CardTitle>

        <CardDescription className="text-muted-foreground/60">
          Keep track of your meetings and events.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-center">
        <Calendar 
          mode="single" 
          className="flex justify-center rounded-md border-none bg-muted/50 p-3" 
          classNames={{
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-muted text-accent-foreground",
          }}
        />
      </CardContent>
    </Card>
  )
} 