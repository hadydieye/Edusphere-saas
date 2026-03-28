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

  const [totalStudents, activeStudents, totalPayments, totalExpenses, recentStudents] = await Promise.all([
    adminClient.from('students').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).then(r => r.count ?? 0),
    adminClient.from('students').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'active').then(r => r.count ?? 0),
    adminClient.from('payments').select('amount').eq('school_id', schoolId).eq('status', 'paid').then(r => (r.data ?? []).reduce((s, p) => s + Number(p.amount), 0)),
    adminClient.from('expenses').select('amount').eq('school_id', schoolId).then(r => (r.data ?? []).reduce((s, e) => s + Number(e.amount), 0)),
    adminClient.from('students').select('id, first_name, last_name, status, created_at').eq('school_id', schoolId).order('created_at', { ascending: false }).limit(5).then(r => r.data ?? []),
  ]);

  const { data: school } = await adminClient.from('schools').select('name, status, onboarding_done').eq('id', schoolId).single();

  return { school, stats: { totalStudents, activeStudents, totalPayments, totalExpenses }, recentStudents };
}

// ─── Students ─────────────────────────────────────────────────────────────────

export async function getStudents(opts: { page?: number; search?: string } = {}) {
  const schoolId = await getSchoolId();
  const { page = 1, search = '' } = opts;
  const PAGE_SIZE = 25;

  let query = adminClient
    .from('students')
    .select('id, first_name, last_name, gender, status, class_id, created_at, guardian_phone, classes(name)', { count: 'exact' })
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

export async function getPendingPaymentsCount() {
  const schoolId = await getSchoolId();
  const { count } = await adminClient
    .from('payments')
    .select('*', { count: 'exact', head: true })
    .eq('school_id', schoolId)
    .eq('status', 'pending');
  return count ?? 0;
}

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

// ─── Settings ─────────────────────────────────────────────────────────────────

export async function getSchoolProfile() {
  const schoolId = await getSchoolId();
  const { data, error } = await adminClient
    .from('schools')
    .select('id, name, code, address, status')
    .eq('id', schoolId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateSchoolProfile(input: {
  name: string;
  address: any;
}): Promise<string | null> {
  const schoolId = await getSchoolId();

  const { error } = await adminClient
    .from('schools')
    .update({
      name: input.name,
      address: input.address,
    })
    .eq('id', schoolId);

  if (error) return error.message;

  revalidatePath('/school-admin/settings');
  revalidatePath('/school-admin');
  return null;
}

// ─── Subjects ─────────────────────────────────────────────────────────────────

export async function getSubjects() {
  const schoolId = await getSchoolId();
  const { data } = await adminClient
    .from('subjects')
    .select('*')
    .eq('school_id', schoolId)
    .order('name');
  return data ?? [];
}

export async function createSubject(name: string): Promise<string | null> {
  const schoolId = await getSchoolId();
  const { error } = await adminClient
    .from('subjects')
    .insert({ name, school_id: schoolId });
  
  if (error) return error.message;
  revalidatePath('/school-admin/grades');
  return null;
}

// ─── Grades ───────────────────────────────────────────────────────────────────

export async function getGrades(opts: { classId: string; subjectId: string; period: string }) {
  const schoolId = await getSchoolId();
  
  // 1. Get all students in the class
  const { data: students } = await adminClient
    .from('students')
    .select('id, first_name, last_name')
    .eq('class_id', opts.classId)
    .eq('school_id', schoolId)
    .order('last_name');

  if (!students) return [];

  // 2. Get existing grades for this subject/period
  const { data: grades } = await adminClient
    .from('grades')
    .select('*')
    .eq('subject_id', opts.subjectId)
    .eq('period', opts.period)
    .eq('school_id', schoolId);

  const gradeMap = new Map((grades ?? []).map(g => [g.student_id, g]));

  return students.map(s => ({
    student: s,
    grade: gradeMap.get(s.id) || null
  }));
}

export async function upsertGrade(input: {
  student_id: string;
  subject_id: string;
  class_id: string;
  period: string;
  score: number | null;
  max_score: number;
  comment?: string;
}): Promise<string | null> {
  const schoolId = await getSchoolId();

  const { error } = await adminClient
    .from('grades')
    .upsert({
      ...input,
      school_id: schoolId,
    }, {
      onConflict: 'student_id,subject_id,period'
    });

  if (error) return error.message;
  return null;
}

export async function getStudentBulletin(studentId: string, period: string) {
  const schoolId = await getSchoolId();

  const { data: grades } = await adminClient
    .from('grades')
    .select('*, subjects(name)')
    .eq('student_id', studentId)
    .eq('period', period)
    .eq('school_id', schoolId);

  return grades ?? [];
}

export async function completeOnboarding() {
  const schoolId = await getSchoolId();
  const { error } = await adminClient
    .from('schools')
    .update({ onboarding_done: true })
    .eq('id', schoolId);

  if (error) return error.message;
  revalidatePath('/school-admin');
  return null;
}

// ─── Attendance ───────────────────────────────────────────────────────────────

export async function getAttendance(classId: string, date: string) {
  const schoolId = await getSchoolId();

  // 1. Get all students in class
  const { data: students } = await adminClient
    .from('students')
    .select('id, first_name, last_name')
    .eq('class_id', classId)
    .eq('school_id', schoolId)
    .order('last_name');

  if (!students) return [];

  // 2. Get attendance for this date
  const { data: attendance } = await adminClient
    .from('attendance')
    .select('*')
    .eq('class_id', classId)
    .eq('date', date)
    .eq('school_id', schoolId);

  const attendanceMap = new Map((attendance ?? []).map(a => [a.student_id, a]));

  return students.map(s => ({
    student: s,
    attendance: attendanceMap.get(s.id) || null
  }));
}

export async function saveAttendance(records: {
  student_id: string;
  class_id: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  comment?: string;
}[]) {
  const schoolId = await getSchoolId();

  const { error } = await adminClient
    .from('attendance')
    .upsert(records.map(r => ({ ...r, school_id: schoolId })), {
      onConflict: 'student_id,date'
    });

  if (error) return error.message;
  revalidatePath('/school-admin/attendance');
  return null;
}

// ─── Teachers ─────────────────────────────────────────────────────────────────

export async function getTeachers() {
  const schoolId = await getSchoolId();
  const { data } = await adminClient
    .from('teachers')
    .select('*')
    .eq('school_id', schoolId)
    .order('last_name');
  return data ?? [];
}

export async function createTeacher(input: {
  first_name: string;
  last_name: string;
  phone?: string;
  email?: string;
  specialty?: string;
}): Promise<string | null> {
  const schoolId = await getSchoolId();
  const { error } = await adminClient
    .from('teachers')
    .insert({ ...input, school_id: schoolId });
  
  if (error) return error.message;
  revalidatePath('/school-admin/teachers');
  return null;
}

export async function deleteTeacher(id: string): Promise<string | null> {
  const { error } = await adminClient
    .from('teachers')
    .delete()
    .eq('id', id);
  
  if (error) return error.message;
  revalidatePath('/school-admin/teachers');
  return null;
}

// ─── Expenses ─────────────────────────────────────────────────────────────────

export async function getExpenses() {
  const schoolId = await getSchoolId();
  const { data } = await adminClient
    .from('expenses')
    .select('*')
    .eq('school_id', schoolId)
    .order('date', { ascending: false });
  return data ?? [];
}

export async function createExpense(input: {
  amount: number;
  label: string;
  category: string;
  date: string;
}): Promise<string | null> {
  const schoolId = await getSchoolId();
  const { error } = await adminClient
    .from('expenses')
    .insert({ ...input, school_id: schoolId });
  
  if (error) return error.message;
  revalidatePath('/school-admin/expenses');
  revalidatePath('/school-admin'); // For Dashboard profit calculation
  return null;
}

export async function deleteExpense(id: string): Promise<string | null> {
  const { error } = await adminClient
    .from('expenses')
    .delete()
    .eq('id', id);
  
  if (error) return error.message;
  revalidatePath('/school-admin/expenses');
  revalidatePath('/school-admin');
  return null;
}

// ─── SMS ──────────────────────────────────────────────────────────────────────

import { smsService, formatGuineanPhone } from '@/lib/sms';

export async function sendSMSNotification(studentId: string, message: string): Promise<{ success: boolean; error?: string }> {
  const { data: student } = await adminClient
    .from('students')
    .select('guardian_phone, first_name, last_name')
    .eq('id', studentId)
    .single();

  if (!student?.guardian_phone) return { success: false, error: "Numéro du tuteur manquant" };

  const response = await smsService.send({
    to: formatGuineanPhone(student.guardian_phone),
    message: message
  });

  return response;
}
