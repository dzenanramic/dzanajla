"use server";

import { createServerSupabaseClient } from "@/lib/supabase-server";
import { slugToCategory } from "@/lib/utils";

export type AddProductState = {
  success: boolean;
  error?: string;
};

export async function addProductAction(
  _prevState: AddProductState | null,
  formData: FormData,
): Promise<AddProductState> {
  try {
    const password = formData.get("admin_password") as string;
    if (password !== process.env.ADMIN_PASSWORD) {
      return { success: false, error: "Pogrešna lozinka." };
    }

    const title = (formData.get("title") as string).trim();
    const description = (formData.get("description") as string).trim();
    const price = parseFloat(formData.get("price") as string);
    const categorySlug = formData.get("category") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title || !description || isNaN(price) || !categorySlug) {
      return {
        success: false,
        error: "Sva obavezna polja moraju biti popunjena.",
      };
    }

    const supabase = createServerSupabaseClient();
    let image_url = "";

    if (imageFile && imageFile.size > 0) {
      const ext = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, buffer, {
          contentType: imageFile.type,
          upsert: false,
        });

      if (uploadError) {
        return {
          success: false,
          error: `Greška pri uploadu: ${uploadError.message}`,
        };
      }

      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      image_url = urlData.publicUrl;
    }

    const { error: insertError } = await supabase.from("products").insert({
      title,
      description,
      price,
      category: slugToCategory(categorySlug),
      image_url,
    });

    if (insertError) {
      return {
        success: false,
        error: `Greška pri unosu: ${insertError.message}`,
      };
    }

    return { success: true };
  } catch (err) {
    console.error("addProductAction error:", err);
    return { success: false, error: "Neočekivana greška. Pokušajte ponovo." };
  }
}
