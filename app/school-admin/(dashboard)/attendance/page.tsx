'use client';

import { useState, useEffect } from 'react';
import { getClasses, getAttendance, saveAttendance } from '@/lib/actions/school-admin';

export default function AttendancePage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function init() {
      const c = await getClasses();
      setClasses(c);
    }
    init();
  }, []);

  useEffect(() => {
    if (selectedClass && date) {
      loadAttendance();
    }
  }, [selectedClass, date]);

  async function loadAttendance() {
    setIsLoading(true);
    const data = await getAttendance(selectedClass, date);
    setStudents(data);
    setIsLoading(false);
  }

  const handleStatusChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setStudents(prev => prev.map(s => 
      s.student.id === studentId 
        ? { ...s, attendance: { ...s.attendance, status } } 
        : s
    ));
  };

  const handleCommentChange = (studentId: string, comment: string) => {
    setStudents(prev => prev.map(s => 
      s.student.id === studentId 
        ? { ...s, attendance: { ...s.attendance, comment } } 
        : s
    ));
  };

  async function handleSave() {
    if (!selectedClass || !date) return;
    setIsSaving(true);
    
    const records = students.map(s => ({
      student_id: s.student.id,
      class_id: selectedClass,
      date,
      status: s.attendance?.status || 'present',
      comment: s.attendance?.comment || '',
    }));

    const error = await saveAttendance(records);
    if (error) {
      alert('Erreur lors de l\'enregistrement : ' + error);
    } else {
      // Success feedback
      await loadAttendance();
    }
    setIsSaving(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-text">Émargement / Présences</h1>
          <p className="font-body text-sm text-muted mt-1">Suivi quotidien des élèves</p>
        </div>
        {selectedClass && (
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
              isSaving 
                ? 'bg-muted text-bg opacity-50 cursor-not-allowed' 
                : 'bg-primary text-white hover:shadow-lg hover:shadow-primary/20 active:scale-95'
            }`}
          >
            {isSaving ? 'Enregistrement...' : 'Enregistrer tout'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-surface border border-border rounded-2xl p-4">
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
          <label className="font-body text-xs font-medium text-muted uppercase">Date</label>
          <input 
            type="date"
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm font-body text-text outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-bg/30">
              <th className="px-6 py-4 font-body text-xs font-semibold text-muted uppercase tracking-wider">Élève</th>
              <th className="px-6 py-4 font-body text-xs font-semibold text-muted uppercase tracking-wider text-center">Statut</th>
              <th className="px-6 py-4 font-body text-xs font-semibold text-muted uppercase tracking-wider">Commentaire</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}><td colSpan={3} className="px-6 py-4 animate-pulse bg-border/10 h-10"></td></tr>
              ))
            ) : !selectedClass ? (
              <tr><td colSpan={3} className="px-6 py-12 text-center text-muted font-body text-sm">Veuillez sélectionner une classe</td></tr>
            ) : students.length === 0 ? (
              <tr><td colSpan={3} className="px-6 py-12 text-center text-muted font-body text-sm">Aucun élève dans cette classe</td></tr>
            ) : students.map((s) => (
              <tr key={s.student.id} className="hover:bg-bg/40 transition-colors">
                <td className="px-6 py-4 font-body text-sm text-text font-medium">{s.student.last_name} {s.student.first_name}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    {[
                      { id: 'present', label: 'Présent', color: 'bg-success text-white', inactive: 'bg-success/10 text-success border-success/20' },
                      { id: 'absent',  label: 'Absent',  color: 'bg-danger text-white',  inactive: 'bg-danger/10 text-danger border-danger/20' },
                      { id: 'late',    label: 'Retard',  color: 'bg-warning text-white',  inactive: 'bg-warning/10 text-warning border-warning/20' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleStatusChange(s.student.id, opt.id as any)}
                        className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full border transition-all ${
                          (s.attendance?.status || 'present') === opt.id 
                            ? opt.color + ' border-transparent shadow-sm' 
                            : opt.inactive + ' hover:bg-opacity-20'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={s.attendance?.comment || ''}
                    onChange={(e) => handleCommentChange(s.student.id, e.target.value)}
                    placeholder="Note optionnelle..."
                    className="w-full bg-bg border border-border rounded-lg px-2 py-1 text-xs font-body focus:border-accent outline-none"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
