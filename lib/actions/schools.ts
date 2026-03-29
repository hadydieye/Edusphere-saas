'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { adminClient, inviteSchoolAdmin } from '@/lib/supabase/admin';
import type { CreateSchoolInput } from '@/components/super-admin/CreateSchoolForm';
import type { School } from '@/components/super-admin/SchoolsPage';

const PAGE_SIZE = 25;

// ─── List ─────────────────────────────────────────────────────────────────────

export async function getSchools(opts: {
  page?: number;
  search?: string;
  status?: string;
}): Promise<{ schools: School[]; total: number }> {
  const { page = 1, search = '', status = '' } = opts;

  let query = adminClient
    .from('schools')
    .select('id, name, code, address, status, created_at', { count: 'exact' });

  if (search) query = query.or(`name.ilike.%${search}%,code.ilike.%${search}%`);
  if (status) query = query.eq('status', status);

  const { data, count, error } = await query
    .order('created_at', { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (error) throw new Error(error.message);

  return {
    schools: (data ?? []).map((s) => ({
      id: s.id,
      name: s.name,
      code: s.code,
      address: s.address ?? { city: '' },
      status: s.status,
      plan: (s as any).plan ?? '—',
      created_at: s.created_at,
    })),
    total: count ?? 0,
  };
}

// ─── Get one ──────────────────────────────────────────────────────────────────

export async function getSchool(id: string) {
  const { data, error } = await adminClient
    .from('schools')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createSchool(input: CreateSchoolInput): Promise<string | null> {
  // 1. Create school
  const { data: school, error: schoolErr } = await adminClient
    .from('schools')
    .insert({
      name: input.name,
      code: input.code,
      address: { region: input.region, city: input.city, phone: input.phone, email: input.email },
      status: 'active',
    })
    .select('id')
    .single();

  if (schoolErr) return schoolErr.message;

  // 2. Invite admin user with Supabase auth invite flow
  let authData;
  try {
    authData = await inviteSchoolAdmin(input.adminEmail, input.name);
  } catch (err: any) {
    await adminClient.from('schools').delete().eq('id', school.id);
    return err.message;
  }


  // 3. Link admin to school
  const { error: linkErr } = await adminClient.from('school_admins').insert({
    school_id: school.id,
    user_id: authData.user.id,
    email: input.adminEmail,
  });

  if (linkErr) return linkErr.message;

  // 4. Audit log
  await adminClient.from('audit_logs').insert({
    action: 'school_created',
    actor_id: authData.user.id,
    target_id: school.id,
    metadata: { school_name: input.name, admin_email: input.adminEmail },
  });

  revalidatePath('/super-admin/schools');
  redirect('/super-admin/schools');
}

// ─── Update status ────────────────────────────────────────────────────────────

export async function updateSchoolStatus(
  id: string,
  status: 'active' | 'suspended',
  actorId: string
): Promise<string | null> {
  const { error } = await adminClient
    .from('schools')
    .update({ status })
    .eq('id', id);

  if (error) return error.message;

  await adminClient.from('audit_logs').insert({
    action: status === 'suspended' ? 'school_suspended' : 'school_reactivated',
    actor_id: actorId,
    target_id: id,
    metadata: {},
  });

  revalidatePath('/super-admin/schools');
  revalidatePath(`/super-admin/schools/${id}`);
  return null;
}
