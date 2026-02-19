import { PublicLayout } from "@/components/layouts/public-layout";
import { SectionLayout } from "@/components/layouts/section-layout";
import { AuthFeature } from "./_components/auth-feature";
import { CursorRules } from "./_components/cursor-rules";
import { DatabaseFeature } from "./_components/database";
import { EmailSystem } from "./_components/email-system";
import { FormBuilder } from "./_components/form-builder";
import { SiteConfig } from "./_components/site-config";
import { ToastSystem } from "./_components/toast-system";
import { SmartServerActions } from "./_components/server-actions";
import { StripeFeature } from "./_components/stripe-feature";

export default function RoutePage() {
  return (
    <PublicLayout showHeader showFooter>
      <SectionLayout>
        <h1 className="text-3xl font-bold">Features</h1>
        <p className="text-muted-foreground mb-8">
          Discover all the features that make our product great.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <CursorRules />
          <SiteConfig />
          <AuthFeature />
          <ToastSystem />
          <FormBuilder />
          <SmartServerActions />
          <DatabaseFeature />
          <EmailSystem />
          <StripeFeature />
        </div>
      </SectionLayout>
    </PublicLayout>
  )
}