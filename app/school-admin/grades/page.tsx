'use client';

import { useState, useEffect } from 'react';
import { getClasses, getSubjects, getGrades, upsertGrade, createSubject } from '@/lib/actions/school-admin';

export default function GradesPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [period, setPeriod] = useState('T1');
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      const [c, s] = await Promise.all([getClasses(), getSubjects()]);
      setClasses(c);
      setSubjects(s);
    }
    init();
  }, []);

  useEffect(() => {
    if (selectedClass && selectedSubject && period) {
      loadGrades();
    }
  }, [selectedClass, selectedSubject, period]);

  async function loadGrades() {
    setIsLoading(true);
    const data = await getGrades({ classId: selectedClass, subjectId: selectedSubject, period });
    setStudents(data);
    setIsLoading(false);
  }

  async function handleGradeChange(studentId: string, score: string) {
    const val = score === '' ? null : parseFloat(score);
    setIsSaving(studentId);
    
    await upsertGrade({
      student_id: studentId,
      subject_id: selectedSubject,
      class_id: selectedClass,
      period,
      score: val,
      max_score: 20,
    });
    
    setIsSaving(null);
  }

  async function handleAddSubject() {
    const name = prompt('Nom de la nouvelle matière :');
    if (name) {
      await createSubject(name);
      setSubjects(await getSubjects());
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-text">Saisie des notes</h1>
        <button 
          onClick={handleAddSubject}
          className="text-accent hover:text-accent/80 font-body text-sm font-medium"
        >
          + Gérer les matières
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-surface border border-border rounded-2xl p-4">
        <div className="space-y-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase">Classe</label>
          <select 
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm font-body text-text outline-none focus:border-accent"
          >
            <option value="">Sélectionner une classe</option>
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase">Matière</label>
          <select 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm font-body text-text outline-none focus:border-accent"
          >
            <option value="">Sélectionner une matière</option>
            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="font-body text-xs font-medium text-muted uppercase">Période</label>
          <select 
            value={period} 
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm font-body text-text outline-none focus:border-accent"
          >
            <option value="T1">1er Trimestre</option>
            <option value="T2">2ème Trimestre</option>
            <option value="T3">3ème Trimestre</option>
          </select>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-bg/30">
              <th className="px-6 py-4 font-body text-xs font-semibold text-muted uppercase tracking-wider">Élève</th>
              <th className="px-6 py-4 font-body text-xs font-semibold text-muted uppercase tracking-wider w-32">Note / 20</th>
              <th className="px-6 py-4 font-body text-xs font-semibold text-muted uppercase tracking-wider">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}><td colSpan={3} className="px-6 py-4 animate-pulse bg-border/10 h-10"></td></tr>
              ))
            ) : !selectedClass || !selectedSubject ? (
              <tr><td colSpan={3} className="px-6 py-12 text-center text-muted font-body text-sm">Veuillez sélectionner une classe et une matière</td></tr>
            ) : students.length === 0 ? (
              <tr><td colSpan={3} className="px-6 py-12 text-center text-muted font-body text-sm">Aucun élève dans cette classe</td></tr>
            ) : students.map((s) => (
              <tr key={s.student.id} className="hover:bg-bg/40 transition-colors">
                <td className="px-6 py-4 font-body text-sm text-text font-medium">{s.student.last_name} {s.student.first_name}</td>
                <td className="px-6 py-4">
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.25"
                      defaultValue={s.grade?.score ?? ''}
                      onBlur={(e) => handleGradeChange(s.student.id, e.target.value)}
                      className="w-20 bg-bg border border-border rounded-lg px-2 py-1.5 text-sm font-mono text-center focus:border-accent outline-none"
                    />
                    {isSaving === s.student.id && (
                      <span className="absolute -right-6 top-2 text-[10px] animate-spin">⏳</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {s.grade ? (
                    <span className="text-[10px] text-success font-mono uppercase bg-success/5 px-2 py-0.5 rounded border border-success/10">Enregistré</span>
                  ) : (
                    <span className="text-[10px] text-muted font-mono uppercase">Non saisie</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
