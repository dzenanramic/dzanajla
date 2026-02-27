"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function deleteProductAction(formData: FormData) {
  "use server";

  const password = formData.get("admin_password") as string;
  if (password !== process.env.ADMIN_PASSWORD) {
    throw new Error("Pogrešna lozinka.");
  }

  const productId = formData.get("product_id") as string;
  if (!productId) throw new Error("Nevažeći zahtjev.");

  const supabase = createServerSupabaseClient();

  // Fetch image_url to delete from storage too
  const { data: product } = await supabase
    .from("products")
    .select("image_url")
    .eq("id", productId)
    .single();

  // Delete from database
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) throw new Error(`Greška pri brisanju: ${error.message}`);

  // Try to delete image from storage if it's from our bucket
  if (product?.image_url?.includes("product-images")) {
    const fileName = product.image_url.split("/").pop();
    if (fileName) {
      await supabase.storage.from("product-images").remove([fileName]);
    }
  }

  redirect("/admin/products?deleted=1");
}
