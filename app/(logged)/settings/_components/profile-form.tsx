"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toastSystem } from "@/lib/toasts";
import { updateUser } from "@/lib/auth/auth-client";

type Props = {
  initialName: string;
  email: string;
};

export function ProfileForm({ initialName, email }: Props) {
  const [name, setName] = useState(initialName);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    const { error } = await updateUser({ name: name.trim() });
    setIsLoading(false);

    if (error) {
      toastSystem.error("Impossible de mettre à jour le profil.");
    } else {
      toastSystem.success("Profil mis à jour.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nom affiché</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Votre nom"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Adresse e-mail</Label>
        <Input
          id="email"
          value={email}
          disabled
          className="bg-muted text-muted-foreground"
        />
        <p className="text-xs text-muted-foreground">
          L'adresse e-mail ne peut pas être modifiée.
        </p>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>
    </form>
  );
}
