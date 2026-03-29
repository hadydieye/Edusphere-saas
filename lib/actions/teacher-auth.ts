'use server';

import { adminClient } from '@/lib/supabase/admin';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const SECRET_KEY = Buffer.from(process.env.SUPABASE_SERVICE_ROLE_KEY || 'default_secret', 'utf8');
const COOKIE_NAME = 'teacher_session';

export async function loginTeacher(formData: FormData): Promise<string | null> {
  const phone = formData.get('phone') as string;
  const password = formData.get('password') as string;

  if (!phone || !password) return 'Veuillez remplir tous les champs.';

  // 1. Verify credentials against teachers table
  const { data: teacher, error } = await adminClient
    .from('teachers')
    .select('id, phone, password')
    .eq('phone', phone)
    .eq('password', password)
    .limit(1)
    .single();

  if (error || !teacher) {
    return 'Numéro de téléphone ou mot de passe incorrect.';
  }

  // 2. Create JWT session
  const token = await new SignJWT({ id: teacher.id, phone: teacher.phone })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY);

  // 3. Set cookie
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  revalidatePath('/teacher');
  redirect('/teacher');
}

export async function logoutTeacher() {
  cookies().delete(COOKIE_NAME);
  redirect('/teacher/login');
}

export async function getTeacherSession() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as { id: string; phone: string };
  } catch (err) {
    return null;
  }
}

/**
 * Returns the currently logged in teacher's profile.
 */
export async function getTeacherProfile() {
  const session = await getTeacherSession();
  if (!session) return null;

  const { data } = await adminClient
    .from('teachers')
    .select(`
      id, 
      first_name, 
      last_name, 
      specialty,
      phone,
      email,
      school:schools(name)
    `)
    .eq('id', session.id)
    .single();

  return data ?? null;
}
