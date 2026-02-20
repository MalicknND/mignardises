import { AddSheetProvider } from "@/app/(logged)/_components/add-sheet-provider";
import { BottomNav } from "@/app/(logged)/_components/bottom-nav";

export default function LoggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AddSheetProvider>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-4 pb-24 pt-4 md:px-6 md:pt-6">
          <main>{children}</main>
        </div>
        <BottomNav />
      </div>
    </AddSheetProvider>
  );
}
