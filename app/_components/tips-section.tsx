import { SectionLayout } from "@/components/layouts/section-layout";
import { UserPlus, ShoppingBag, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Créez votre atelier",
    description:
      "Inscrivez-vous en quelques secondes. Votre espace de travail est créé automatiquement, prêt à accueillir vos premières commandes.",
  },
  {
    number: "02",
    icon: ShoppingBag,
    title: "Ajoutez vos clients et commandes",
    description:
      "Enregistrez vos clients une seule fois et créez des commandes en précisant les articles, la date de livraison et le statut de paiement.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Suivez votre activité",
    description:
      "Consultez les commandes du jour, suivez les paiements en attente et gardez un œil sur vos dépenses pour rester rentable.",
  },
];

export function TipsSection() {
  return (
    <SectionLayout id="fonctionnement">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">Comment ça marche</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Opérationnel en moins de 5 minutes, sans formation nécessaire.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-8 top-10 bottom-10 w-px bg-border hidden md:block" />

        <div className="space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex gap-8 items-start group">
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors z-10 relative">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 text-xs font-bold text-primary/60 bg-background px-1">
                    {step.number}
                  </span>
                </div>
                <div className="pt-2 space-y-2">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionLayout>
  );
}
