import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client for server-side operations (admin routes, image upload).
 * NEVER expose this to the browser.
 */
export function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!url || !serviceKey) {
    throw new Error("Missing Supabase service role environment variables");
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
