import { createClient } from "@supabase/supabase-js";

// CREATE TABLE waitlist (
//   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//   email text UNIQUE NOT NULL,
//   created_at timestamptz DEFAULT now()
// );

function firstDefined(...values: Array<string | undefined>) {
  return values.find((value) => Boolean(value));
}

const supabaseUrl = firstDefined(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_URL
);

const supabaseAnonKey = firstDefined(
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  process.env.SUPABASE_ANON_KEY
);

const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

export function getSupabaseServerClient() {
  if (!supabaseUrl) {
    return null;
  }

  const serverKey = supabaseServiceRoleKey ?? supabaseAnonKey;
  if (!serverKey) {
    return null;
  }

  return createClient(supabaseUrl, serverKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
