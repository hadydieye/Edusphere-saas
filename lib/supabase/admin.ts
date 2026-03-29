import { createClient } from '@supabase/supabase-js';

export const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function inviteSchoolAdmin(email: string, schoolName: string) {
  const { data, error } = await adminClient.auth.admin.inviteUserByEmail(
    email,
    {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/school-admin/set-password`,
      data: {
        role: 'school_admin',
        school_name: schoolName,
        invited_at: new Date().toISOString(),
      }
    }
  )
  if (error) throw error
  return data
}
