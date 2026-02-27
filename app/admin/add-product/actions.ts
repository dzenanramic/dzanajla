"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { slugToCategory } from "@/lib/utils";

export async function addProductAction(formData: FormData) {
  "use server";

  const password = formData.get("admin_password") as string;
  if (password !== process.env.ADMIN_PASSWORD) {
    throw new Error("Pogrešna lozinka.");
  }

  const title = (formData.get("title") as string).trim();
  const description = (formData.get("description") as string).trim();
  const price = parseFloat(formData.get("price") as string);
  const categorySlug = formData.get("category") as string;
  const imageFile = formData.get("image") as File | null;

  if (!title || !description || isNaN(price) || !categorySlug) {
    throw new Error("Sva obavezna polja moraju biti popunjena.");
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
      .upload(fileName, buffer, { contentType: imageFile.type, upsert: false });

    if (uploadError)
      throw new Error(`Greška pri uploadu: ${uploadError.message}`);

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

  if (insertError) throw new Error(`Greška pri unosu: ${insertError.message}`);

  redirect("/admin/add-product?success=1");
}
