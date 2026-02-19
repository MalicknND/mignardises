import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { WorkspaceMemberRole } from "@/lib/generated/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const requireWorkspace = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  const memberWorkspace = await prisma.workspaceMember.findFirst({
    where: { userId: user.id },
    include: { workspace: true },
    orderBy: { createdAt: "asc" },
  });

  if (memberWorkspace?.workspace) {
    return memberWorkspace.workspace;
  }

  const workspace = await prisma.workspace.create({
    data: {
      name: `Atelier ${user.name ?? "Mignardise"}`,
      ownerId: user.id,
      members: {
        create: {
          userId: user.id,
          role: WorkspaceMemberRole.OWNER,
        },
      },
    },
  });

  return workspace;
});
