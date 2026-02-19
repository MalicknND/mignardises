export type ProjectConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  features: {
    auth: {
      enabled: boolean;
      providers: {
        credentials: boolean;
      };
    };
    darkMode: boolean;
    stripe: {
      enabled: boolean;
      plans: {
        name: string;
        description: string;
        price: string;
        priceId: string;
        features: string[];
        buttonText: string;
        popular: boolean;
      }[];
    };
  };
};

export const projectConfig: ProjectConfig = {
  /* SEO main title and description */
  name: "Mignardise",
  description: "Suivi caisse et commandes pour vendeurs de cuisine maison",

  /* Base url */
  url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",

  /* Open Graph Image */
  // Image url or /public/... path
  ogImage:
    "https://unsplash.com/fr/photos/une-vue-rapprochee-dun-mur-blanc-PDpJ14vS8AM",

  /* Project Features */
  features: {
    auth: {
      enabled: true,
      providers: {
        credentials: true,
        // JUST COMPLETE GOOGLE CLIENT ENV VARIABLES TO ENABLE GOOGLE AUTH
      },
    },
    darkMode: false,
    stripe: {
      enabled: false,
      plans: [
        {
          name: "Basic",
          description: "Perfect for getting started",
          price: "$9/month",
          priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID || "",
          features: ["Basic features", "Email support", "1 user"],
          buttonText: "Start Basic",
          popular: false,
        },
        {
          name: "Pro",
          description: "Best for professionals",
          price: "$29/month",
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "",
          features: [
            "All Basic features",
            "Priority support",
            "5 users",
            "Advanced analytics",
          ],
          buttonText: "Start Pro",
          popular: true,
        },
        {
          name: "Enterprise",
          description: "For large teams",
          price: "$99/month",
          priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID || "",
          features: [
            "All Pro features",
            "24/7 support",
            "Unlimited users",
            "Custom features",
          ],
          buttonText: "Contact Sales",
          popular: false,
        },
      ],
    },
  },
};
