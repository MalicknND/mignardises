import { getSupabaseAdmin } from "@/lib/supabase";

type UploadConfig = {
  file: File;
  userId: string;
  bucket?: string;
  oldUrl?: string | null;
};

export async function uploadFile({
  file,
  userId,
  bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET!,
  oldUrl = null,
}: UploadConfig) {
  try {
    const supabase = getSupabaseAdmin();
    const fileExt = file.name.split(".").pop();
    const fileName = `public/${userId}/${Date.now()}.${fileExt}`;

    // Delete previous file if exists
    if (oldUrl) {
      try {
        const oldFileName = oldUrl.split("/").pop();
        if (oldFileName) {
          await supabase.storage
            .from(bucket)
            .remove([`public/${userId}/${oldFileName}`]);
        }
      } catch (error) {
        console.error("Error deleting old file:", error);
      }
    }

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload file");
  }
}

export async function deleteFile(url: string, bucket = "next15-fs-temp-storage") {
  try {
    const supabase = getSupabaseAdmin();
    const fileName = url.split("/").pop();
    if (!fileName) throw new Error("Invalid file URL");

    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Failed to delete file");
  }
}

export function getFileUrl(path: string, bucket = "next15-fs-temp-storage") {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  
  const supabase = getSupabaseAdmin();
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
    
  return data.publicUrl;
}
