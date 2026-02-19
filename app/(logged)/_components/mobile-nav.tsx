'use client'

import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LoggedSidebar } from "@/components/layouts/logged-sidebar"
import { Button } from "@/components/ui/button"

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <LoggedSidebar />
      </SheetContent>
    </Sheet>
  )
} 