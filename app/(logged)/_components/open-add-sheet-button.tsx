"use client";

import { Button } from "@/components/ui/button";
import { useAddSheet } from "./add-sheet-provider";

type AddSheetMode = "order" | "expense";

export function OpenAddSheetButton({
  mode = "order",
  children,
  className,
}: {
  mode?: AddSheetMode;
  children: React.ReactNode;
  className?: string;
}) {
  const { openSheet } = useAddSheet();

  return (
    <Button className={className} onClick={() => openSheet(mode)}>
      {children}
    </Button>
  );
}
