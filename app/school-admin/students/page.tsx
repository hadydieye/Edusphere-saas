'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { getStudents } from '@/lib/actions/school-admin';

type Student = { id: string; first_name: string; last_name: string; gender: string; status: string; classes: { name: string } | null; created_at: string };

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async (p: number, q: string) => {
    setIsLoading(true);
    const res = await getStudents({ page: p, search: q });
    setStudents(res.students as Student[]);
    setTotal(res.total);
    setIsLoading(false);
  }, []);

  useEffect(() => { load(page, search); }, [page, search, load]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <h1 className="font-display text-2xl font-bold text-text">Élèves</h1>
          <span className="font-mono text-sm text-muted">{total}</span>
        </div>
        <Link href="/school-admin/students/new" className="bg-primary hover:bg-primary/90 text-white font-body text-sm font-medium px-4 py-2 rounded-xl transition-colors">
          + Inscrire un élève
        </Link>
      </div>

      <input
        type="search"
        placeholder="Rechercher un élève…"
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        className="w-full max-w-xs bg-surface border border-border rounded-xl px-4 py-2 text-sm font-body text-text placeholder:text-muted outline-none focus:border-accent transition-colors"
      />

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {['Nom', 'Prénom', 'Sexe', 'Classe', 'Statut', 'Inscription'].map((col) => (
                <th key={col} className="px-4 py-3 text-left font-body text-xs font-medium text-muted uppercase tracking-wider">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>{Array.from({ length: 6 }).map((_, j) => (
                  <td key={j} className="px-4 py-3"><div className="h-4 bg-border/60 rounded animate-pulse w-3/4" /></td>
                ))}</tr>
              ))
            ) : students.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-12 text-center font-body text-sm text-muted">Aucun élève trouvé</td></tr>
            ) : students.map((s) => (
              <tr key={s.id} className="hover:bg-bg/60 transition-colors">
                <td className="px-4 py-3 font-body text-sm text-text font-medium">{s.last_name}</td>
                <td className="px-4 py-3 font-body text-sm text-text">{s.first_name}</td>
                <td className="px-4 py-3 font-body text-sm text-muted">{s.gender ?? '—'}</td>
                <td className="px-4 py-3 font-body text-sm text-muted">{s.classes?.name ?? '—'}</td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-xs px-2 py-0.5 rounded-full border ${
                    s.status === 'active' ? 'bg-success/10 text-success border-success/20' : 'bg-danger/10 text-danger border-danger/20'
                  }`}>{s.status === 'active' ? 'Actif' : 'Inactif'}</span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted">
                  {new Date(s.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: '2-digit' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
