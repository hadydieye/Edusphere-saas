'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createStudent, getClasses } from '@/lib/actions/school-admin';

type Class = { id: string; name: string; level: string };

const inputCls = 'w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm font-body text-text placeholder:text-muted outline-none focus:border-accent transition-colors';

export default function NewStudentPage() {
  const router = useRouter();
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { getClasses().then(setClasses); }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const err = await createStudent({
      first_name:     fd.get('first_name') as string,
      last_name:      fd.get('last_name') as string,
      birth_date:     fd.get('birth_date') as string || undefined,
      gender:         fd.get('gender') as string || undefined,
      guardian_name:  fd.get('guardian_name') as string || undefined,
      guardian_phone: fd.get('guardian_phone') as string || undefined,
      class_id:       fd.get('class_id') as string || undefined,
    });
    if (err) { setError(err); setIsLoading(false); }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-2xl font-bold text-text">Inscrire un élève</h1>

      {error && <p className="font-body text-sm text-danger bg-danger/10 border border-danger/20 rounded-xl px-4 py-3">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-2xl p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-body text-xs text-muted">Nom <span className="text-danger">*</span></label>
            <input name="last_name" required placeholder="Diallo" className={inputCls} />
          </div>
          <div className="space-y-1.5">
            <label className="font-body text-xs text-muted">Prénom <span className="text-danger">*</span></label>
            <input name="first_name" required placeholder="Mamadou" className={inputCls} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-body text-xs text-muted">Date de naissance</label>
            <input name="birth_date" type="date" className={inputCls} />
          </div>
          <div className="space-y-1.5">
            <label className="font-body text-xs text-muted">Sexe</label>
            <select name="gender" className={`${inputCls} appearance-none`}>
              <option value="">—</option>
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="font-body text-xs text-muted">Classe</label>
          <select name="class_id" className={`${inputCls} appearance-none`}>
            <option value="">Sélectionner une classe…</option>
            {classes.map((c) => <option key={c.id} value={c.id}>{c.level} — {c.name}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-body text-xs text-muted">Nom du tuteur</label>
            <input name="guardian_name" placeholder="Ibrahima Diallo" className={inputCls} />
          </div>
          <div className="space-y-1.5">
            <label className="font-body text-xs text-muted">Téléphone tuteur</label>
            <input name="guardian_phone" placeholder="+224 6XX XXX XXX" className={inputCls} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="button" onClick={() => router.back()} className="px-5 py-2.5 rounded-xl border border-border font-body text-sm text-muted hover:text-text transition-colors">
            Annuler
          </button>
          <button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-display font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors">
            {isLoading ? 'Enregistrement…' : 'Inscrire'}
          </button>
        </div>
      </form>
    </div>
  );
}
