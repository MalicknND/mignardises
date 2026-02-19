import { createClient } from '@supabase/supabase-js';
import { auth } from './auth';
import { headers } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

export function getSupabaseAdmin() {
  return createClient(
    supabaseUrl as string,
    supabaseServiceKey as string,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    }
  );
}

export async function getSupabaseClient() {
  const session = await auth.api.getSession({ headers: await headers() });
  
  return createClient(
    supabaseUrl as string,
    supabaseServiceKey as string,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: session?.session ? {
          Authorization: `Bearer ${session.session.token}`,
        } : {},
      },
    }
  );
} 