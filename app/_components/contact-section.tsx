import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionLayout } from "@/components/layouts/section-layout";
import { ChevronRight } from "lucide-react";

export function ContactSection() {
  return (
    <SectionLayout id="demarrer">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 md:py-20 text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/10 rounded-full filter blur-2xl" />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full filter blur-2xl" />
        </div>

        <div className="relative space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
            Prêt à prendre le contrôle ?
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto">
            Rejoignez les artisans qui gèrent leur activité sereinement avec
            Mignardise. C'est gratuit, et ça prend moins de 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="text-base px-8 gap-2 hover:scale-105 transition-transform"
              >
                Créer mon compte
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="ghost"
                className="text-base px-8 text-primary-foreground hover:bg-white/15 hover:text-primary-foreground"
              >
                Déjà un compte ? Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
