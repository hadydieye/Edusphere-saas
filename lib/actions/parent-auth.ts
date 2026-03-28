'use server';

import { adminClient } from '@/lib/supabase/admin';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const SECRET_KEY = Buffer.from(process.env.SUPABASE_SERVICE_ROLE_KEY || 'default_secret', 'utf8');
const COOKIE_NAME = 'parent_session';

export async function loginParent(formData: FormData): Promise<string | null> {
  const phone = formData.get('phone') as string;
  const password = formData.get('password') as string;

  if (!phone || !password) return 'Veuillez remplir tous les champs.';

  // 1. Verify credentials against students table
  // Note: For high security, guardian_password should be hashed (e.g. bcrypt).
  // For this implementation, we check plain text or assume hashing is done elsewhere.
  const { data: student, error } = await adminClient
    .from('students')
    .select('guardian_phone, guardian_password')
    .eq('guardian_phone', phone)
    .eq('guardian_password', password)
    .limit(1)
    .single();

  if (error || !student) {
    return 'Numéro de téléphone ou mot de passe incorrect.';
  }

  // 2. Create JWT session
  const token = await new SignJWT({ phone })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY);

  // 3. Set cookie
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_SET_COOKIE_SECURE === 'true', // check env or set true for prod
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  revalidatePath('/parent');
  redirect('/parent/dashboard');
}

export async function logoutParent() {
  cookies().delete(COOKIE_NAME);
  redirect('/parent/login');
}

export async function getParentSession() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as { phone: string };
  } catch (err) {
    return null;
  }
}

/**
 * Returns all students linked to the currently logged in parent's phone number.
 */
export async function getParentStudents() {
  const session = await getParentSession();
  if (!session) return [];

  const { data } = await adminClient
    .from('students')
    .select(`
      id, 
      first_name, 
      last_name, 
      gender,
      status,
      classes(name),
      school:schools(name)
    `)
    .eq('guardian_phone', session.phone);

  return data ?? [];
}
