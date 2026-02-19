import { PublicLayout } from "@/components/layouts/public-layout";
import { HeroSection } from "./_components/hero-section";
import { FeaturesSection } from "./_components/features-section";
import { TipsSection } from "./_components/tips-section";
import { ContactSection } from "./_components/contact-section";

export default async function Home() {
  return (
    <PublicLayout showHeader showFooter>
      <HeroSection />
      <FeaturesSection />
      <TipsSection />
      <ContactSection />
    </PublicLayout>
  );
}
