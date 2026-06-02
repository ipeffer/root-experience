export interface SupabaseServerEnv {
  supabaseUrl: string;
  serviceRoleKey: string;
}

export function getSupabaseServerEnv(): SupabaseServerEnv | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return {
    supabaseUrl,
    serviceRoleKey,
  };
}
