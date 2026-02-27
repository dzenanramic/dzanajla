import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import type { ApiResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const password = formData.get("admin_password") as string;
    const productId = formData.get("product_id") as string;

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Pogrešna lozinka." },
        { status: 401 },
      );
    }

    if (!productId) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Nevažeći zahtjev." },
        { status: 400 },
      );
    }

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

    if (error) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: `Greška pri brisanju: ${error.message}` },
        { status: 500 },
      );
    }

    // Delete image from storage if applicable
    if (product?.image_url?.includes("product-images")) {
      const parts = product.image_url.split("/product-images/");
      const fileName = parts[1];
      if (fileName) {
        await supabase.storage.from("product-images").remove([fileName]);
      }
    }

    return NextResponse.json<ApiResponse<null>>({ success: true, data: null });
  } catch (err) {
    console.error("Delete product error:", err);
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Interna greška servera." },
      { status: 500 },
    );
  }
}
