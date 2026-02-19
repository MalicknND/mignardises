import { z } from "zod";
import { UseFormReturn, DefaultValues, Path } from "react-hook-form";

export type FormFieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "date"
  | "file";

export type TFormField<T = any> = {
  name: Path<T>;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  options?: { label: string; value: string | number }[];
  validation?: z.ZodType<any>;
  defaultValue?: any;
};

export type FormBuilderProps<T extends z.ZodType<any>> = {
  fields: TFormField<z.infer<T>>[];
  schema: T;
  onSubmit: (values: z.infer<T>) => Promise<void> | void;
  defaultValues?: DefaultValues<z.infer<T>>;
  submitText?: string;
  className?: string;
  form?: UseFormReturn<z.infer<T>>;
}; 