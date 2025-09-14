import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';

export const createClient = (): SupabaseClient<
  any,
  'public' extends keyof Omit<any, '__InternalSupabase'>
    ? 'public'
    : string & keyof Omit<any, '__InternalSupabase'>
> =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
  );
