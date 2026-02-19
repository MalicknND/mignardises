"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { IUser } from "@/types/interfaces/user/IUser";
import { Gender } from "@/lib/generated/prisma";

import { updateProfileAction } from "../_actions/update-profile.action";

import { toastSystem } from "@/lib/toasts";

type IProps = {
  user: IUser;
};

const ProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  image: z.any().optional(),
  birthDate: z.date().optional().nullable(),
  gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER] as const),
  phoneNumber: z.string().optional().nullable().refine((val) => {
    if (!val) return true;
    // Utilise la fonction isValidPhoneNumber de la librairie pour valider le format
    return isValidPhoneNumber(val);
  }, "Invalid phone number"),
  address: z.string().optional().nullable(),
});

type ProfileFormType = z.infer<typeof ProfileSchema>;

export function ProfileForm({ user }: IProps) {  
  const router = useRouter();
  
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      birthDate: user.profile?.birthDate || null,
      gender: user.profile?.gender || Gender.OTHER,
      phoneNumber: user.profile?.phoneNumber || null,
      address: user.profile?.address || null,
    },
  });

  const handleImageChange = (e: FileList | null) => {
    if (e?.[0]) {
      const file = e[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("image", e);
    }
  };

  async function handleSubmit(data: ProfileFormType) {
    try {
      setIsLoading(true);
      const formData = { ...data };
      if (data.image?.[0]) {
        formData.image = data.image[0];
      }

      const { error } = await updateProfileAction(formData);

      if (error) {
        toastSystem.error(error);
        return;
      }

      toastSystem.success("Profile updated successfully!");
      router.refresh();
    } catch (error) {      
      toastSystem.error(error as string);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="flex items-center gap-x-6">
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormControl>
                  <div className="relative group cursor-pointer">
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageChange(e.target.files)}
                      {...field}
                    />
                    <Avatar 
                      className="h-20 w-20 transition-opacity group-hover:opacity-75"
                      onClick={() => {
                        const input = document.querySelector('input[type="file"]') as HTMLInputElement;
                        if (input) {
                          input.click();
                        }
                      }}
                    >
                      <AvatarImage src={previewImage || user.image || undefined} alt={user.name} />
                      <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <h3 className="text-lg font-medium">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birth Date</FormLabel>
                <FormControl>
                  <DatePicker 
                    date={field.value || undefined}
                    setDate={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput
                    className="flex h-9 w-full rounded-md border border-input shadow-xs bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    international
                    defaultCountry="FR"
                    value={field.value || ''}
                    onChange={(value) => field.onChange(value || '')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Profile"
          )}
        </Button>
      </form>
    </Form>
  );
} 