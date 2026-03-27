'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function signInSchoolAdmin(email: string, password: string): Promise<string | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) return 'Identifiants incorrects. Veuillez réessayer.';

  if (data.user.app_metadata?.school_admin !== true) {
    await supabase.auth.signOut();
    return 'Accès non autorisé.';
  }

  redirect('/school-admin');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/school-admin/login');
}

export async function requestPasswordReset(email: string): Promise<string | null> {
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/school-admin/reset-password`,
  });
  if (error) return error.message;
  return null;
}

export async function updatePassword(password: string): Promise<string | null> {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return error.message;
  redirect('/school-admin');
}
