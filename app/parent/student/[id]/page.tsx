'use server';

import { adminClient } from '@/lib/supabase/admin';
import { getParentSession } from '@/lib/actions/parent-auth';
import { redirect, notFound } from 'next/navigation';
import { 
  ChevronLeft, 
  GraduationCap, 
  Calendar, 
  CreditCard, 
  Search,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import Link from 'next/link';

export default async function StudentDetailPage({ params }: { params: { id: string } }) {
  const session = await getParentSession();
  if (!session) redirect('/parent/login');

  // 1. Fetch student and verify it belongs to this parent
  const { data: student } = await adminClient
    .from('students')
    .select(`
      *,
      classes(name),
      school:schools(name)
    `)
    .eq('id', params.id)
    .eq('guardian_phone', session.phone)
    .single();

  if (!student) notFound();

  // 2. Fetch Grades
  const { data: grades } = await adminClient
    .from('grades')
    .select('*, subjects(name)')
    .eq('student_id', student.id)
    .order('created_at', { ascending: false });

  // 3. Fetch Attendance
  const { data: attendance } = await adminClient
    .from('attendance')
    .select('*')
    .eq('student_id', student.id)
    .order('date', { ascending: false })
    .limit(10);

  const absences = attendance?.filter(a => a.status === 'absent').length || 0;

  // 4. Fetch Payments
  const { data: payments } = await adminClient
    .from('payments')
    .select('*')
    .eq('student_id', student.id)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-bg pb-24">
      {/* Dynamic Header */}
      <div className="bg-primary text-white p-6 pb-20 sticky top-0 z-20">
        <div className="max-w-lg mx-auto flex items-center justify-between mb-6">
          <Link href="/parent/dashboard" className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </Link>
          <div className="flex-1 text-center">
            <h1 className="font-display font-bold text-lg">Détails de l'élève</h1>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        <div className="max-w-lg mx-auto flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl font-bold shadow-xl border border-white/10">
            {student.first_name[0]}{student.last_name[0]}
          </div>
          <div className="space-y-1">
            <h2 className="font-display font-bold text-xl">{student.first_name} {student.last_name}</h2>
            <p className="text-white/70 text-sm font-body flex items-center gap-1.5 capitalize">
              <GraduationCap size={16} />
              {student.classes?.name} • {student.school?.name}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-12 relative z-30 space-y-6">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface border border-border rounded-3xl p-4 shadow-xl shadow-primary/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-accent/10 text-accent">
                <BookOpen size={18} />
              </div>
              <p className="font-body text-[10px] text-muted uppercase font-bold tracking-wider">Moyenne</p>
            </div>
            <p className="font-display text-2xl font-bold text-text">--/20</p>
          </div>
          <div className="bg-surface border border-border rounded-3xl p-4 shadow-xl shadow-primary/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-danger/10 text-danger">
                <AlertCircle size={18} />
              </div>
              <p className="font-body text-[10px] text-muted uppercase font-bold tracking-wider">Absences</p>
            </div>
            <p className="font-display text-2xl font-bold text-text">{absences}</p>
          </div>
        </div>

        {/* Grades Table */}
        <section className="bg-surface border border-border rounded-[32px] overflow-hidden shadow-xl shadow-primary/5">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="font-display font-bold text-text flex items-center gap-2">
              <GraduationCap size={20} className="text-primary" />
              Dernières Notes
            </h3>
            <button className="text-primary text-xs font-bold hover:underline">Tout voir</button>
          </div>
          <div className="divide-y divide-border/50">
            {!grades || grades.length === 0 ? (
              <p className="p-8 text-center text-sm text-muted font-body">Aucune note enregistrée pour le moment.</p>
            ) : (
              grades.map((grade: any) => (
                <div key={grade.id} className="p-4 flex items-center justify-between hover:bg-bg/50 transition-colors">
                  <div className="space-y-0.5">
                    <p className="font-display font-semibold text-text text-sm">{grade.subjects?.name}</p>
                    <p className="font-body text-[10px] text-muted capitalize">{grade.period}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-2xl font-display font-bold text-sm ${
                    grade.score >= 10 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                  }`}>
                    {grade.score}/{grade.max_score}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Recent Attendance */}
        <section className="bg-surface border border-border rounded-[32px] overflow-hidden shadow-xl shadow-primary/5">
          <div className="p-6 border-b border-border">
            <h3 className="font-display font-bold text-text flex items-center gap-2">
              <Calendar size={20} className="text-warning" />
              Présence Récente
            </h3>
          </div>
          <div className="divide-y divide-border/50">
            {!attendance || attendance.length === 0 ? (
              <p className="p-8 text-center text-sm text-muted font-body">Historique de présence vide.</p>
            ) : (
              attendance.map((entry: any) => (
                <div key={entry.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${
                      entry.status === 'present' ? 'bg-success/10 text-success' : 
                      entry.status === 'late' ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'
                    }`}>
                      {entry.status === 'present' ? <CheckCircle2 size={16} /> : 
                       entry.status === 'late' ? <Clock size={16} /> : <AlertCircle size={16} />}
                    </div>
                    <p className="font-body text-xs font-medium text-text">
                      {new Date(entry.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                  </div>
                  <p className="font-body text-[10px] text-muted capitalize">{entry.status}</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Payments Status */}
        <section className="bg-surface border border-border rounded-[32px] overflow-hidden shadow-xl shadow-primary/5">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="font-display font-bold text-text flex items-center gap-2">
              <CreditCard size={20} className="text-accent" />
              Frais de Scolarité
            </h3>
          </div>
          <div className="p-4">
            {!payments || payments.length === 0 ? (
                <div className="bg-bg/50 border border-dashed border-border rounded-2xl p-6 text-center">
                    <p className="font-body text-xs text-muted">Aucun paiement enregistré.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {payments.map((p: any) => (
                        <div key={p.id} className="bg-bg/50 rounded-2xl p-4 border border-border/50 flex items-center justify-between">
                            <div>
                                <p className="font-display font-bold text-text text-sm">{p.label}</p>
                                <p className="font-body text-[10px] text-muted">{new Date(p.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-display font-bold text-primary text-sm">{new Intl.NumberFormat('fr-GN').format(p.amount)} GNF</p>
                                <p className={`font-body text-[10px] font-bold ${p.status === 'paid' ? 'text-success' : 'text-warning'}`}>
                                    {p.status === 'paid' ? 'Payé' : 'En attente'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
