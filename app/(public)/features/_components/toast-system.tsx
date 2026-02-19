'use client';

import { Bell } from "lucide-react";
import { FeatureCard } from "./feature-card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ToastSystem() {
  const showToast = () => {
    toast("This is a toast notification!", {
      description: "Easy to use toast system with sonner",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };

  return (
    <FeatureCard
      title="Toast System"
      description="Beautiful toast notifications with sonner"
    >
      <div className="flex items-center gap-4">
        <Bell className="h-8 w-8 text-muted-foreground" />
        <Button onClick={showToast}>Try Toast</Button>
      </div>
    </FeatureCard>
  );
} 