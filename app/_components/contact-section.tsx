import { Card, CardContent } from "@/components/ui/card";
import { SectionLayout } from "@/components/layouts/section-layout";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  return (
    <SectionLayout id="contact">
      <div className="max-w-xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
          <p className="text-lg text-muted-foreground">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        <Card className="backdrop-blur-sm border-primary/10">
          <CardContent className="p-8">
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </SectionLayout>
  );
} 