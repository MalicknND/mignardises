import { FormInput } from "lucide-react";
import { FeatureCard } from "./feature-card";

const FORM_EXAMPLE = `export function UserForm() {
  const form = useForm({
    schema: UserSchema,
    defaultValues: {
      name: "",
      email: "",
    },
  });

  return (
    <FormBuilder
      form={form}
      onSubmit={handleSubmit}
      fields={[
        {
          name: "name",
          label: "Name",
          type: "text",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
        },
      ]}
    />
  );
}`;

export function FormBuilder() {
  return (
    <FeatureCard
      title="Form Builder"
      description="Easy form creation with validation and type safety"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FormInput className="h-5 w-5" />
          <span className="text-sm text-muted-foreground">Form Builder Example</span>
        </div>
        <pre className="h-[500px] overflow-y-auto rounded-lg bg-muted p-4 overflow-x-auto">
          <code className="text-sm">{FORM_EXAMPLE}</code>
        </pre>
      </div>
    </FeatureCard>
  );
} 