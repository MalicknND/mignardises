import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-24 md:py-36 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-primary/8 via-primary/5 to-transparent" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-[10%] w-80 h-80 bg-primary/15 rounded-full filter blur-3xl animate-blob" />
        <div className="absolute top-32 right-[8%] w-72 h-72 bg-orange-200/20 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-[35%] w-72 h-72 bg-amber-100/20 rounded-full filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-fade-in">
          <Star className="w-3.5 h-3.5 fill-primary" />
          Conçu pour les artisans de la cuisine maison
        </div>

        <div className="space-y-5 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Gérez vos{" "}
            <span className="bg-linear-to-r from-primary to-amber-500 text-transparent bg-clip-text">
              commandes
            </span>{" "}
            <br className="hidden md:block" />
            sans la complexité
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-up">
            Suivez vos commandes, gérez vos clients et pilotez votre caisse —
            tout en un seul endroit.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 opacity-0 animate-fade-up animation-delay-500">
          <Link href="/signup">
            <Button size="lg" className="text-base px-8 gap-2 hover:scale-105 transition-transform shadow-lg">
              Commencer gratuitement
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="#fonctionnement">
            <Button size="lg" variant="outline" className="text-base px-8 hover:scale-105 transition-transform">
              Comment ça marche
            </Button>
          </Link>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground opacity-0 animate-fade-up animation-delay-500">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            Aucune carte bancaire requise
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            Accès immédiat
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            100% gratuit
          </span>
        </div>
      </div>
    </section>
  );
}
