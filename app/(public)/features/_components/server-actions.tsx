import { FormInput } from "lucide-react";
import { FeatureCard } from "./feature-card";

const SERVER_ACTION_EXAMPLE = `"use server"

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
};`;

export function SmartServerActions() {
  return (
    <FeatureCard
      title="Smart Server Actions"
      description="Useful server actions with validation and post action management"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FormInput className="h-5 w-5" />
          <span className="text-sm text-muted-foreground">Server Action Example</span>
        </div>
        <pre className="h-[500px] overflow-y-auto rounded-lg bg-muted p-4 overflow-x-auto">
          <code className="text-sm">{SERVER_ACTION_EXAMPLE}</code>
        </pre>
      </div>
    </FeatureCard>
  );
} 