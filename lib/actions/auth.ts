'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function signIn(email: string, password: string): Promise<string | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return 'Identifiants incorrects. Veuillez réessayer.';
  }

  if (data.user.app_metadata?.superadmin !== true) {
    await supabase.auth.signOut();
    return 'Accès non autorisé.';
  }

  redirect('/super-admin');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/super-admin/login');
}
