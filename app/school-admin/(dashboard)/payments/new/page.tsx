'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPayment, getStudents } from '@/lib/actions/school-admin';

type Student = { id: string; first_name: string; last_name: string };

const inputCls = 'w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm font-body text-text placeholder:text-muted outline-none focus:border-accent transition-colors';

export default function NewPaymentPage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { getStudents({ page: 1 }).then(r => setStudents(r.students as Student[])); }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const err = await createPayment({
      student_id: fd.get('student_id') as string,
      amount:     Number(fd.get('amount')),
      label:      fd.get('label') as string,
      status:     fd.get('status') as string,
    });
    if (err) { setError(err); setIsLoading(false); }
  };

  return (
    <div className="max-w-lg space-y-6">
      <h1 className="font-display text-2xl font-bold text-text">Nouveau paiement</h1>

      {error && <p className="font-body text-sm text-danger bg-danger/10 border border-danger/20 rounded-xl px-4 py-3">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-2xl p-6 space-y-5">
        <div className="space-y-1.5">
          <label className="font-body text-xs text-muted">Élève <span className="text-danger">*</span></label>
          <select name="student_id" required className={`${inputCls} appearance-none`}>
            <option value="">Sélectionner un élève…</option>
            {students.map((s) => <option key={s.id} value={s.id}>{s.last_name} {s.first_name}</option>)}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="font-body text-xs text-muted">Libellé <span className="text-danger">*</span></label>
          <input name="label" required placeholder="Ex: Frais de scolarité T1" className={inputCls} />
        </div>

        <div className="space-y-1.5">
          <label className="font-body text-xs text-muted">Montant (GNF) <span className="text-danger">*</span></label>
          <input name="amount" type="number" required min="0" placeholder="150000" className={inputCls} />
        </div>

        <div className="space-y-1.5">
          <label className="font-body text-xs text-muted">Statut</label>
          <select name="status" className={`${inputCls} appearance-none`}>
            <option value="paid">Payé</option>
            <option value="pending">En attente</option>
          </select>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="button" onClick={() => router.back()} className="px-5 py-2.5 rounded-xl border border-border font-body text-sm text-muted hover:text-text transition-colors">
            Annuler
          </button>
          <button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-display font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors">
            {isLoading ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
}
