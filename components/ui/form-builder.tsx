"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Path } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { FormBuilderProps, TFormField } from "@/types/form";

import { cn } from "@/lib/utils";

export function FormBuilder<T extends z.ZodType<any>>({
  className,
  fields,
  schema,
  defaultValues,
  submitText = "Submit",
  onSubmit,
  form: externalForm,
}: FormBuilderProps<T>) {
  const defaultForm = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  
  const form = externalForm || defaultForm;

  const renderField = (field: TFormField<z.infer<T>>) => {
    return (
      <FormField
        key={field.name}
        control={form.control}
        name={field.name as Path<z.infer<T>>}
        render={({ field: formField }) => (
          <FormItem>
            <FormLabel>{field.label}</FormLabel>
            
            <FormControl>
              <>
                {field.type === "text" && (
                  <Input
                    placeholder={field.placeholder}
                    {...formField}
                  />
                )}

                {field.type === "email" && (
                  <Input
                    type="email"
                    placeholder={field.placeholder}
                    {...formField}
                  />
                )}

                {field.type === "password" && (
                  <Input
                    type="password"
                    placeholder={field.placeholder}
                    {...formField}
                  />
                )}

                {field.type === "number" && (
                  <Input
                    type="number"
                    placeholder={field.placeholder}
                    {...formField}
                    onChange={(e) => formField.onChange(Number(e.target.value))}
                  />
                )}

                {field.type === "textarea" && (
                  <Textarea
                    placeholder={field.placeholder}
                    {...formField}
                  />
                )}

                {field.type === "select" && field.options && (
                  <Select
                    onValueChange={formField.onChange}
                    defaultValue={formField.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((option) => (
                        <SelectItem
                          key={option.value.toString()}
                          value={option.value.toString()}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {field.type === "checkbox" && (
                  <Checkbox
                    checked={formField.value}
                    onCheckedChange={formField.onChange}
                  />
                )}

                {field.type === "radio" && field.options && (
                  <RadioGroup
                    onValueChange={formField.onChange}
                    defaultValue={formField.value}
                  >
                    {field.options.map((option) => (
                      <div key={option.value.toString()} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value.toString()} />
                        <span>{option.label}</span>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {field.type === "date" && (
                  <Calendar
                    mode="single"
                    selected={formField.value}
                    onSelect={formField.onChange}
                    className="rounded-md border"
                  />
                )}

                {field.type === "file" && (
                  <Input
                    type="file"
                    onChange={(e) => formField.onChange(e.target.files?.[0])}
                  />
                )}
              </>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4", className)}
      >
        {fields.map(renderField)}

        <Button type="submit" className="w-full">
          {submitText}
        </Button>
      </form>
    </Form>
  );
} 