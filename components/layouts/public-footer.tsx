import Link from "next/link";
import { Cookie } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="border-t mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Cookie className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg">Mignardise</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Suivi de caisse et commandes pour vendeurs de cuisine maison.
              Simple, rapide, efficace.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Navigation</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/#fonctionnalites" className="text-muted-foreground hover:text-foreground transition-colors">
                Fonctionnalités
              </Link>
              <Link href="/#fonctionnement" className="text-muted-foreground hover:text-foreground transition-colors">
                Comment ça marche
              </Link>
              <Link href="/#demarrer" className="text-muted-foreground hover:text-foreground transition-colors">
                Démarrer
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Compte</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/signup" className="text-muted-foreground hover:text-foreground transition-colors">
                Créer un compte
              </Link>
              <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                Se connecter
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Mignardise. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
