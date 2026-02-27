import { NextRequest, NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/mail";
import { getProductById } from "@/lib/supabase";
import type { OrderFormData, ApiResponse } from "@/types";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as OrderFormData;

    // ── Validation ───────────────────────────────────────────────────────────
    if (!body.full_name?.trim()) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Ime i prezime su obavezni." },
        { status: 400 },
      );
    }
    if (!body.email?.trim() || !isValidEmail(body.email)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Unesite ispravnu email adresu." },
        { status: 400 },
      );
    }
    if (!body.phone?.trim()) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Broj telefona je obavezan." },
        { status: 400 },
      );
    }
    if (!body.product_id) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Nevažeći zahtjev." },
        { status: 400 },
      );
    }

    // ── Fetch product from Supabase ───────────────────────────────────────────
    const product = await getProductById(body.product_id);
    if (!product) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Proizvod nije pronađen." },
        { status: 404 },
      );
    }

    // ── Send email ───────────────────────────────────────────────────────────
    await sendOrderEmail({
      full_name: body.full_name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      message: body.message?.trim(),
      product_id: product.id,
      product_title: product.title,
      product_price: product.price,
      product_category: product.category,
      product_image_url: product.image_url,
    });

    return NextResponse.json<ApiResponse<null>>(
      { success: true, data: null },
      { status: 200 },
    );
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Interna greška servera. Pokušajte ponovo." },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json(
    { error: "Metoda nije dozvoljena." },
    { status: 405 },
  );
}
