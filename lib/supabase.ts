import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Product } from "@/types";

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  _client = createClient(supabaseUrl, supabaseAnonKey);
  return _client;
}

// ─── Product Queries ────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await getClient()
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error.message);
      return [];
    }
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await getClient()
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching product ${id}:`, error.message);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  try {
    const { data, error } = await getClient()
      .from("products")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        `Error fetching products for category ${category}:`,
        error.message,
      );
      return [];
    }
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  try {
    const { data, error } = await getClient()
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching featured products:", error.message);
      return [];
    }
    return data ?? [];
  } catch {
    return [];
  }
}
