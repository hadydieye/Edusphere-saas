'use client';

import { useState, useEffect } from 'react';
import { getTeachers, createTeacher, deleteTeacher } from '@/lib/actions/school-admin';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    specialty: ''
  });

  useEffect(() => {
    loadTeachers();
  }, []);

  async function loadTeachers() {
    setIsLoading(true);
    const data = await getTeachers();
    setTeachers(data);
    setIsLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const error = await createTeacher(formData);
    if (error) {
      alert('Erreur: ' + error);
    } else {
      setFormData({ first_name: '', last_name: '', phone: '', email: '', specialty: '' });
      setIsAdding(false);
      loadTeachers();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cet enseignant ?')) return;
    const error = await deleteTeacher(id);
    if (error) alert('Erreur: ' + error);
    else loadTeachers();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-text">Enseignants</h1>
          <p className="font-body text-sm text-muted mt-1">Gérez le corps professoral de votre établissement</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold transition-all hover:shadow-lg hover:shadow-primary/20"
        >
          {isAdding ? 'Annuler' : '+ Ajouter un enseignant'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-2xl p-6 space-y-4 animate-in fade-in slide-in-from-top-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-body text-xs font-medium text-muted uppercase">Prénom</label>
              <input 
                required
                value={formData.first_name}
                onChange={e => setFormData({ ...formData, first_name: e.target.value })}
                className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm font-body text-text outline-none focus:border-accent"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-body text-xs font-medium text-muted uppercase">Nom</label>
              <input 
                required
                value={formData.last_name}
                onChange={e => setFormData({ ...formData, last_name: e.target.value })}
                className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm font-body text-text outline-none focus:border-accent"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="font-body text-xs font-medium text-muted uppercase">Téléphone</label>
              <input 
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm font-body text-text outline-none focus:border-accent"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-body text-xs font-medium text-muted uppercase">Email</label>
              <input 
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm font-body text-text outline-none focus:border-accent"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-body text-xs font-medium text-muted uppercase">Spécialité / Matière</label>
              <input 
                value={formData.specialty}
                onChange={e => setFormData({ ...formData, specialty: e.target.value })}
                placeholder="Ex: Mathématiques"
                className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm font-body text-text outline-none focus:border-accent"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button type="submit" className="bg-accent text-white px-6 py-2 rounded-xl text-sm font-bold">
              Enregistrer l'enseignant
            </button>
          </div>
        </form>
      )}

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-bg/30">
              <th className="px-6 py-4 font-body text-xs font-semibold text-muted uppercase tracking-wider">Enseignant</th>
              <th className="px-6 py-4 font-body text-xs font-semibold text-muted uppercase tracking-wider">Spécialité</th>
              <th className="px-6 py-4 font-body text-xs font-semibold text-muted uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 font-body text-xs font-semibold text-muted uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i}><td colSpan={4} className="px-6 py-4 animate-pulse bg-border/10 h-10"></td></tr>
              ))
            ) : teachers.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-muted font-body text-sm">Aucun enseignant enregistré</td></tr>
            ) : teachers.map((t) => (
              <tr key={t.id} className="hover:bg-bg/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-body text-sm text-text font-medium">{t.last_name} {t.first_name}</div>
                </td>
                <td className="px-6 py-4 font-body text-sm text-muted">
                  {t.specialty || '—'}
                </td>
                <td className="px-6 py-4 space-y-0.5">
                  <div className="font-mono text-xs text-text">{t.phone || '—'}</div>
                  <div className="font-body text-[10px] text-muted">{t.email || '—'}</div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleDelete(t.id)}
                    className="text-danger hover:underline font-body text-xs font-medium"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
