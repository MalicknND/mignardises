"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ClipboardList,
  HandCoins,
  Plus,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAddSheet } from "./add-sheet-provider";

const items = [
  { href: "/today", label: "Aujourd'hui", icon: CalendarDays },
  { href: "/orders", label: "Commandes", icon: ClipboardList },
  { href: "/debts", label: "À recevoir", icon: HandCoins },
  { href: "/settings", label: "Paramètres", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();
  const { openSheet } = useAddSheet();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto grid h-16 max-w-3xl grid-cols-5 items-center px-2">
        {items.slice(0, 1).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-xs",
              pathname === item.href ? "text-primary" : "text-muted-foreground",
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}

        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => openSheet("order")}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
            aria-label="Ajouter"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {items.slice(1).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-xs",
              pathname === item.href ? "text-primary" : "text-muted-foreground",
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
