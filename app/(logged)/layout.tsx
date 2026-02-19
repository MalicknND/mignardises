import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AddSheetProvider } from "@/app/(logged)/_components/add-sheet-provider";
import { BottomNav } from "@/app/(logged)/_components/bottom-nav";
import { requireWorkspace } from "@/lib/workspace";

export default async function LoggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  const user: any = session?.user;

  if (!user) {
    redirect("/login");
  }

  const workspace = await requireWorkspace();
  const customers = await prisma.customer.findMany({
    where: { workspaceId: workspace.id },
    select: {
      id: true,
      name: true,
      phone: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <AddSheetProvider customers={customers}>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-4 pb-24 pt-4 md:px-6 md:pt-6">
          <main>{children}</main>
        </div>
        <BottomNav />
      </div>
    </AddSheetProvider>
  );
}
