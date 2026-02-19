import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { requireWorkspace } from "@/lib/workspace";
import { headers } from "next/headers";

export default async function SettingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const workspace = await requireWorkspace();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Paramètres</h1>
      <Card>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            Nom: <strong>{workspace.name}</strong>
          </p>
          <p>
            Utilisateur: <strong>{session?.user?.email}</strong>
          </p>
          <p className="text-muted-foreground">
            La gestion avancée des réglages peut être ajoutée dans cette page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
