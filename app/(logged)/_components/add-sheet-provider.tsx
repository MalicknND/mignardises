"use client";

import { createContext, useContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { getCustomersForSheetAction } from "@/app/_actions/mignardise.action";

type AddSheetMode = "order" | "expense";

type SheetCustomer = {
  id: string;
  name: string;
  phone: string;
};

type AddSheetContextType = {
  open: boolean;
  mode: AddSheetMode;
  openSheet: (mode?: AddSheetMode) => void;
  closeSheet: () => void;
  setMode: (mode: AddSheetMode) => void;
};

const AddSheetContext = createContext<AddSheetContextType | null>(null);

const DynamicAddSheet = dynamic(
  () => import("./add-sheet").then((mod) => mod.AddSheet),
  {
    ssr: false,
  },
);

export function AddSheetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AddSheetMode>("order");
  const [customers, setCustomers] = useState<SheetCustomer[]>([]);

  const value = useMemo(
    () => ({
      open,
      mode,
      openSheet: (nextMode: AddSheetMode = "order") => {
        setMode(nextMode);
        setOpen(true);
        if (customers.length === 0) {
          getCustomersForSheetAction().then(setCustomers);
        }
      },
      closeSheet: () => setOpen(false),
      setMode,
    }),
    [open, mode, customers.length],
  );

  return (
    <AddSheetContext.Provider value={value}>
      {children}
      {open ? (
        <DynamicAddSheet
          open={open}
          onOpenChange={setOpen}
          mode={mode}
          onModeChange={setMode}
          customers={customers}
        />
      ) : null}
    </AddSheetContext.Provider>
  );
}

export const useAddSheet = () => {
  const context = useContext(AddSheetContext);

  if (!context) {
    throw new Error("useAddSheet must be used within AddSheetProvider");
  }

  return context;
};
