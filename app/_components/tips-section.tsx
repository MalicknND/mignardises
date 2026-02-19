"use client";

import { SectionLayout } from "@/components/layouts/section-layout";
import { Button } from "@/components/ui/button";
import { toastSystem } from "@/lib/toasts";

export function TipsSection() {
  return (
    <SectionLayout id="tips">
      <div className="container space-y-24">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Built-in Features</h2>
          <p className="text-muted-foreground">Discover the powerful features integrated into this template</p>
        </div>

        {/* Site Config Block */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Site Configuration</h3>
              <p className="text-muted-foreground">Centralized site configuration for easy customization</p>
            </div>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>Manage metadata and SEO settings</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>Customize theme and styling</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>Configure navigation and layout</span>
              </li>
            </ul>
            <Button variant="outline" onClick={() => toastSystem.info("Site config can be found in @/config/site")}>
              View Config
            </Button>
          </div>
          <div className="bg-muted/50 p-8 rounded-lg border shadow-sm">
            <pre className="text-sm text-muted-foreground overflow-x-auto">
              <code>{`export const siteConfig = {
  name: "Next.js Template",
  description: "Modern stack",
  url: "https://template.dev",
  features: {
    auth: {
      enabled: true,
      providers: {
        credentials: true,
        google: true
      }
    },
    darkMode: true
  }
}`}</code>
            </pre>
          </div>
        </div>

        {/* Form Builder Block */}
        <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
          <div className="space-y-6 md:order-2">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Form Builder</h3>
              <p className="text-muted-foreground">Type-safe form handling with React Hook Form & Zod</p>
            </div>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>Built-in validation with Zod schemas</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>Type-safe form handling</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>Reusable form components</span>
              </li>
            </ul>
            <Button variant="outline" onClick={() => toastSystem.info("Form builder can be found in @/components/common/form-builder")}>
              View Builder
            </Button>
          </div>
          <div className="bg-muted/50 p-8 rounded-lg border shadow-sm md:order-1">
            <pre className="text-sm text-muted-foreground overflow-x-auto">
              <code>{`const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

<FormBuilder
  schema={schema}
  onSubmit={handleSubmit}
  fields={[
    { name: "email", type: "email" },
    { name: "password", type: "password" }
  ]}
/>`}</code>
            </pre>
          </div>
        </div>

        {/* Toast System Block */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Toast System</h3>
              <p className="text-muted-foreground">Beautiful notifications with Sonner</p>
            </div>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>Accessible notifications</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>Multiple variants (success, error, info)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>Customizable duration and position</span>
              </li>
            </ul>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => toastSystem.success("Success message!")}>
                Success Toast
              </Button>
              <Button variant="outline" onClick={() => toastSystem.error("Error message!")}>
                Error Toast
              </Button>
            </div>
          </div>
          <div className="bg-muted/50 p-8 rounded-lg border shadow-sm">
            <pre className="text-sm text-muted-foreground overflow-x-auto">
              <code>{`// Simple toast
toast.success("Task completed!")

// Custom toast
toast("Deploy started", {
  description: "Deploy to production",
  action: {
    label: "View",
    onClick: () => {}
  }
})`}</code>
            </pre>
          </div>
        </div>

        {/* Server Actions Block */}
        <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
          <div className="space-y-6 md:order-2">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Smart Server Actions</h3>
              <p className="text-muted-foreground">Same way to use on client and server components</p>
            </div>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>Call it from client or server components</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>Use super easy custom action wrapper</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>Integrated useful customFetch function</span>
              </li>
            </ul>
            <Button variant="outline" onClick={() => toastSystem.info("Example action can be found in @/app/_actions")}>
              View Actions
            </Button>
          </div>
          <div className="bg-muted/50 p-8 rounded-lg border shadow-sm md:order-1">
            <pre className="text-sm text-muted-foreground overflow-x-auto">
              <code>{`"use server"

export async function getExampleAction(input: TInput, postAction?: IPostAction): Promise<{ data?: Model, success?: boolean, error?: string }> {
  const res: { data?: Model; error?: string } = await createAction({
    input: input,
    schema: Schema,
    handler: async () => {
      return await customFetch({
        url: '/api/example',
        method: "GET",
        tags: ["getExample"]
      });
    }
  });  

  if (res.error) return { error: res.error };
  if (postAction?.revalidateTags) postAction.revalidateTags.forEach((tag) => revalidateTag(tag));
  if (postAction?.redirectPath) redirect(postAction.redirectPath);
  return res.data ? { data: res.data } : { success: true };
};`}</code>
            </pre>
          </div>
        </div>

        {/* Stripe Integration Block */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Stripe Integration</h3>
              <p className="text-muted-foreground">Ready-to-use payment and subscription system</p>
            </div>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>One-time payments processing</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>Subscription management</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>Webhook handling setup</span>
              </li>
            </ul>
            <Button variant="outline" onClick={() => toastSystem.info("Stripe integration can be found in @/app/api/stripe")}>
              View Integration
            </Button>
          </div>
          <div className="bg-muted/50 p-8 rounded-lg border shadow-sm">
            <pre className="text-sm text-muted-foreground overflow-x-auto">
              <code>{`
export const projectConfig: ProjectConfig = {
  ...
  /* Project Features */
  features: {
    ...
    stripe: {
      enabled: true,
      plans: [
        {
          name: "Basic",
          description: "Perfect for getting started",
          price: "$9/month",
          priceId: process.env.STRIPE_STARTER_PRICE_ID || "",
          features: ["Basic features", "Email support", "1 user"],
          buttonText: "Start Basic",
          popular: false
        }
      ]
    }
  }
} `}</code>
            </pre>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
} 