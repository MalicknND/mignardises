import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ProfileForm } from "./_components/profile-form";
import { ChangePasswordForm } from "./_components/change-password-form";
import { LogoutButton } from "./_components/logout-button";
import { User, Lock, LogOut } from "lucide-react";

export default async function SettingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  return (
    <div className="space-y-6 pb-4">
      <h1 className="text-2xl font-bold">Paramètres</h1>

      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">Informations personnelles</CardTitle>
            <CardDescription>Modifiez votre nom affiché</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ProfileForm
            initialName={user?.name ?? ""}
            email={user?.email ?? ""}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Lock className="w-4 h-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">Mot de passe</CardTitle>
            <CardDescription>Changez votre mot de passe de connexion</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>

      <Card className="border-destructive/30">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center">
            <LogOut className="w-4 h-4 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-base">Déconnexion</CardTitle>
            <CardDescription>Terminer votre session en cours</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          <LogoutButton />
        </CardContent>
      </Card>
    </div>
  );
}
