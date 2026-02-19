import { PublicLayout } from "@/components/layouts/public-layout";
import { ContactSection } from "./_components/contact-section";
import { FeaturesSection } from "./_components/features-section";
import { HeroSection } from "./_components/hero-section";
import { TipsSection } from "./_components/tips-section";

//import { getExampleAction } from "./_actions/example.action";

export default async function Home() {
  // Following lines is an example of how you can manage errors in an action from server component
  // If you throw an error, it will be redirected to the error page
  /*
  const { data, error }  = await getExampleAction({ email: "test@test.com" });
  if (error) throw new Error(error);
  */
  
  return (
    <PublicLayout showHeader showFooter>  
      <HeroSection />
      <FeaturesSection />
      <TipsSection />
      <ContactSection />
    </PublicLayout>
  );
}
