import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionLayout } from "@/components/layouts/section-layout";
import {
  ClipboardList,
  Users,
  CreditCard,
  Receipt,
  CalendarDays,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    title: "Suivi des commandes",
    description: "De la prise de commande à la livraison",
    body: "Créez des commandes, ajoutez vos articles et suivez leur avancement : en attente, en préparation ou livré.",
  },
  {
    icon: Users,
    title: "Gestion des clients",
    description: "Votre carnet d'adresses intégré",
    body: "Enregistrez vos clients, retrouvez leur historique de commandes et gardez leurs coordonnées à portée de main.",
  },
  {
    icon: CreditCard,
    title: "Suivi des paiements",
    description: "Impayés, acomptes, soldés",
    body: "Sachez en temps réel qui a payé, qui a versé un acompte et qui doit encore régler sa commande.",
  },
  {
    icon: Receipt,
    title: "Dépenses & charges",
    description: "Gardez le contrôle de vos coûts",
    body: "Enregistrez vos dépenses par catégorie (ingrédients, emballages, transport…) pour piloter votre marge.",
  },
  {
    icon: CalendarDays,
    title: "Vue du jour",
    description: "Ce qui vous attend aujourd'hui",
    body: "Visualisez d'un coup d'œil les commandes à préparer et à livrer pour la journée en cours.",
  },
  {
    icon: BarChart3,
    title: "Tableau de bord",
    description: "Vos chiffres en un regard",
    body: "Chiffre d'affaires, commandes du mois, dépenses : suivez la santé de votre activité facilement.",
  },
];

export function FeaturesSection() {
  return (
    <SectionLayout id="fonctionnalites">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">
          Tout ce qu'il vous faut
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Un outil pensé pour les vendeurs de cuisine maison, sans la
          complexité des logiciels professionnels.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card
              key={feature.title}
              className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/25 group"
            >
              <CardHeader>
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm leading-relaxed">
                {feature.body}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </SectionLayout>
  );
}
