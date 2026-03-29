'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { adminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { smsService, formatGuineanPhone } from '@/lib/sms';

async function getSchoolId(): Promise<string> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/school-admin/login');

  const { data } = await adminClient
    .from('school_admins')
    .select('school_id')
    .eq('user_id', user.id)
    .single();

  if (!data) {
    console.error('No school associated with user:', user.id);
    redirect('/school-admin/login');
  }

  return data.school_id;
}

// ─── Dashboard stats ──────────────────────────────────────────────────────────

export async function getSchoolDashboard() {
  const schoolId = await getSchoolId();

  const [totalStudents, activeStudents, totalPayments, totalExpenses, recentStudents, { data: school }] = await Promise.all([
    adminClient.from('students').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).then(r => r.count ?? 0),
    adminClient.from('students').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'active').then(r => r.count ?? 0),
    adminClient.from('payments').select('amount').eq('school_id', schoolId).eq('status', 'paid').then(r => (r.data ?? []).reduce((s, p) => s + Number(p.amount), 0)),
    adminClient.from('expenses').select('amount').eq('school_id', schoolId).then(r => (r.data ?? []).reduce((s, e) => s + Number(e.amount), 0)),
    adminClient.from('students').select('id, first_name, last_name, status, created_at').eq('school_id', schoolId).order('created_at', { ascending: false }).limit(5).then(r => r.data ?? []),
    adminClient.from('schools').select('name, status, onboarding_done').eq('id', schoolId).single(),
  ]);

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

export async function getStudentDetails(id: string) {
  const schoolId = await getSchoolId();
  const { data, error } = await adminClient
    .from('students')
    .select('*, classes(name)')
    .eq('id', id)
    .eq('school_id', schoolId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getRankInClass(studentId: string, classId: string, period: string) {
  const schoolId = await getSchoolId();

  // 1. Get all students in the class
  const { data: students } = await adminClient
    .from('students')
    .select('id')
    .eq('class_id', classId)
    .eq('school_id', schoolId);

  if (!students) return null;

  // 2. Get grades for all students in this class/period
  const { data: allGrades } = await adminClient
    .from('grades')
    .select('student_id, score')
    .in('student_id', students.map(s => s.id))
    .eq('period', period)
    .eq('school_id', schoolId);

  if (!allGrades) return null;

  // 3. Group by student and calculate average
  const averages: { id: string; avg: number }[] = students.map(s => {
    const sGrades = allGrades.filter(g => g.student_id === s.id);
    const avg = sGrades.length > 0 
      ? sGrades.reduce((acc, g) => acc + (Number(g.score) || 0), 0) / sGrades.length
      : 0;
    return { id: s.id, avg };
  });

  // 4. Sort by average DESC
  averages.sort((a, b) => b.avg - a.avg);

  // 5. Find index of studentId
  const rank = averages.findIndex(a => a.id === studentId) + 1;
  return { rank, total: students.length, avg: averages.find(a => a.id === studentId)?.avg || 0 };
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

export async function getLatePayments() {
  const schoolId = await getSchoolId();
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

  // 1. Get all active students
  const { data: students } = await adminClient
    .from('students')
    .select('id, first_name, last_name, guardian_phone, classes(name)')
    .eq('school_id', schoolId)
    .eq('status', 'active');

  if (!students) return [];

  // 2. Get students who paid this month
  const { data: paidRecords } = await adminClient
    .from('payments')
    .select('student_id')
    .eq('school_id', schoolId)
    .eq('status', 'paid')
    .gte('created_at', `${currentMonth}-01`);

  const paidIds = new Set((paidRecords ?? []).map(p => p.student_id));

  // 3. Filter students who haven't paid
  return students.filter(s => !paidIds.has(s.id));
}

export async function sendBulkPaymentReminders(studentIds: string[]) {
  const schoolId = await getSchoolId();
  const { data: students } = await adminClient
    .from('students')
    .select('first_name, last_name, guardian_phone')
    .in('id', studentIds);

  if (!students) return 'Erreur lors de la récupération des élèves.';

  let sentCount = 0;
  for (const student of students) {
    if (student.guardian_phone) {
      const message = `Edusphère Rappel: Le paiement de la scolarité pour ${student.first_name} ${student.last_name} est en attente. Merci de régulariser au plus vite.`;
      const res = await smsService.send({
        to: formatGuineanPhone(student.guardian_phone),
        message
      });
      if (res.success) sentCount++;
    }
  }

  return `Rappels envoyés avec succès à ${sentCount} parents.`;
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

  // 1. Save attendance records
  const { error } = await adminClient
    .from('attendance')
    .upsert(records.map(r => ({ ...r, school_id: schoolId })), {
      onConflict: 'student_id,date'
    });

  if (error) return error.message;

  // 2. Trigger SMS for absent students
  const absentStudents = records.filter(r => r.status === 'absent');
  if (absentStudents.length > 0) {
    const studentIds = absentStudents.map(s => s.student_id);
    
    // Get student names and guardian phones
    const { data: students } = await adminClient
      .from('students')
      .select('id, first_name, last_name, guardian_phone, school:schools(name)')
      .in('id', studentIds);

    if (students) {
      for (const student of students) {
        if (student.guardian_phone) {
          const dateStr = new Date(records[0].date).toLocaleDateString('fr-FR');
          const message = `Edusphère: ${student.first_name} ${student.last_name} est marqué ABSENT ce jour (${dateStr}). Veuillez contacter l'école pour plus d'infos.`;
          
          await smsService.send({
            to: formatGuineanPhone(student.guardian_phone),
            message: message
          });
        }
      }
    }
  }

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
  password?: string;
}): Promise<string | null> {
  const schoolId = await getSchoolId();
  const { error } = await adminClient
    .from('teachers')
    .insert({ ...input, school_id: schoolId });
  
  if (error) return error.message;
  revalidatePath('/school-admin/teachers');
  return null;
}

export async function updateTeacherPassword(id: string, password: string): Promise<string | null> {
  const { error } = await adminClient
    .from('teachers')
    .update({ password })
    .eq('id', id);
  
  if (error) return error.message;
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
