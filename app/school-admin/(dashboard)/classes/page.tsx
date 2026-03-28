'use client';

import { useState, useEffect, useTransition } from 'react';
import { createClass, deleteClass, getClasses } from '@/lib/actions/school-admin';

type Class = { id: string; name: string; level: string };

const LEVELS = ['CP', 'CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale'];

const inputCls = 'bg-bg border border-border rounded-xl px-4 py-2.5 text-sm font-body text-text placeholder:text-muted outline-none focus:border-accent transition-colors';

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const load = () => getClasses().then(setClasses);
  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const err = await createClass({ name: fd.get('name') as string, level: fd.get('level') as string });
    if (err) setError(err);
    // redirect handled in action on success
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteClass(id);
      load();
    });
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-2xl font-bold text-text">Classes</h1>

      {/* Create form */}
      <form onSubmit={handleCreate} className="bg-surface border border-border rounded-2xl p-5 space-y-4">
        <h2 className="font-display text-base font-semibold text-text">Nouvelle classe</h2>
        {error && <p className="font-body text-xs text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">{error}</p>}
        <div className="flex gap-3">
          <select name="level" required className={`${inputCls} appearance-none w-36`}>
            <option value="">Niveau…</option>
            {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <input name="name" required placeholder="Ex: Classe A" className={`${inputCls} flex-1`} />
          <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-display font-semibold text-sm px-5 rounded-xl transition-colors">
            Ajouter
          </button>
        </div>
      </form>

      {/* List */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        {classes.length === 0 ? (
          <p className="px-5 py-10 text-center font-body text-sm text-muted">Aucune classe créée</p>
        ) : (
          <ul className="divide-y divide-border">
            {classes.map((c) => (
              <li key={c.id} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full">{c.level}</span>
                  <span className="font-body text-sm text-text">{c.name}</span>
                </div>
                <button
                  onClick={() => handleDelete(c.id)}
                  disabled={isPending}
                  className="font-body text-xs text-muted hover:text-danger transition-colors disabled:opacity-40"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
