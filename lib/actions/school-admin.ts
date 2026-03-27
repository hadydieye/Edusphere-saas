'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { adminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

async function getSchoolId(): Promise<string> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data } = await adminClient
    .from('school_admins')
    .select('school_id')
    .eq('user_id', user!.id)
    .single();
  return data!.school_id;
}

// ─── Dashboard stats ──────────────────────────────────────────────────────────

export async function getSchoolDashboard() {
  const schoolId = await getSchoolId();

  const [totalStudents, activeStudents, totalPayments, recentStudents] = await Promise.all([
    adminClient.from('students').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).then(r => r.count ?? 0),
    adminClient.from('students').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'active').then(r => r.count ?? 0),
    adminClient.from('payments').select('amount').eq('school_id', schoolId).eq('status', 'paid').then(r => (r.data ?? []).reduce((s, p) => s + p.amount, 0)),
    adminClient.from('students').select('id, first_name, last_name, status, created_at').eq('school_id', schoolId).order('created_at', { ascending: false }).limit(5).then(r => r.data ?? []),
  ]);

  const { data: school } = await adminClient.from('schools').select('name, status').eq('id', schoolId).single();

  return { school, stats: { totalStudents, activeStudents, totalPayments }, recentStudents };
}

// ─── Students ─────────────────────────────────────────────────────────────────

export async function getStudents(opts: { page?: number; search?: string } = {}) {
  const schoolId = await getSchoolId();
  const { page = 1, search = '' } = opts;
  const PAGE_SIZE = 25;

  let query = adminClient
    .from('students')
    .select('id, first_name, last_name, gender, status, class_id, created_at, classes(name)', { count: 'exact' })
    .eq('school_id', schoolId);

  if (search) query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%`);

  const { data, count } = await query
    .order('last_name')
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  return { students: data ?? [], total: count ?? 0 };
}

export async function createStudent(input: {
  first_name: string; last_name: string; birth_date?: string;
  gender?: string; guardian_name?: string; guardian_phone?: string; class_id?: string;
}): Promise<string | null> {
  const schoolId = await getSchoolId();

  const { error } = await adminClient.from('students').insert({ ...input, school_id: schoolId });
  if (error) return error.message;

  revalidatePath('/school-admin/students');
  redirect('/school-admin/students');
}

// ─── Classes ──────────────────────────────────────────────────────────────────

export async function getClasses() {
  const schoolId = await getSchoolId();
  const { data } = await adminClient.from('classes').select('id, name, level').eq('school_id', schoolId).order('level');
  return data ?? [];
}

export async function createClass(input: { name: string; level: string }): Promise<string | null> {
  const schoolId = await getSchoolId();
  const { error } = await adminClient.from('classes').insert({ ...input, school_id: schoolId });
  if (error) return error.message;
  revalidatePath('/school-admin/classes');
  redirect('/school-admin/classes');
}

export async function deleteClass(id: string): Promise<string | null> {
  const { error } = await adminClient.from('classes').delete().eq('id', id);
  if (error) return error.message;
  revalidatePath('/school-admin/classes');
  return null;
}

// ─── Payments ─────────────────────────────────────────────────────────────────

export async function getPayments(opts: { page?: number } = {}) {
  const schoolId = await getSchoolId();
  const { page = 1 } = opts;
  const PAGE_SIZE = 25;

  const { data, count } = await adminClient
    .from('payments')
    .select('id, amount, label, status, paid_at, created_at, students(first_name, last_name)', { count: 'exact' })
    .eq('school_id', schoolId)
    .order('created_at', { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  return { payments: data ?? [], total: count ?? 0 };
}

export async function createPayment(input: {
  student_id: string; amount: number; label: string; status: string;
}): Promise<string | null> {
  const schoolId = await getSchoolId();

  const { error } = await adminClient.from('payments').insert({
    ...input,
    school_id: schoolId,
    paid_at: input.status === 'paid' ? new Date().toISOString() : null,
  });
  if (error) return error.message;

  revalidatePath('/school-admin/payments');
  redirect('/school-admin/payments');
}
