'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { getPayments } from '@/lib/actions/school-admin';

type Payment = { id: string; amount: number; label: string; status: string; paid_at: string | null; created_at: string; students: { first_name: string; last_name: string } | null };

const STATUS_STYLE: Record<string, string> = {
  paid:      'bg-success/10 text-success border-success/20',
  pending:   'bg-warning/10 text-warning border-warning/20',
  cancelled: 'bg-danger/10 text-danger border-danger/20',
};
const STATUS_LABEL: Record<string, string> = { paid: 'Payé', pending: 'En attente', cancelled: 'Annulé' };

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async (p: number) => {
    setIsLoading(true);
    const res = await getPayments({ page: p });
    setPayments(res.payments as unknown as Payment[]);
    setTotal(res.total);
    setIsLoading(false);
  }, []);

  useEffect(() => { load(page); }, [page, load]);

  const totalPaid = payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <h1 className="font-display text-2xl font-bold text-text">Paiements</h1>
          <span className="font-mono text-sm text-muted">{total}</span>
        </div>
        <Link href="/school-admin/payments/new" className="bg-primary hover:bg-primary/90 text-white font-body text-sm font-medium px-4 py-2 rounded-xl transition-colors">
          + Nouveau paiement
        </Link>
      </div>

      <div className="bg-surface border border-border rounded-2xl px-5 py-4 flex items-center gap-2">
        <span className="font-body text-sm text-muted">Total encaissé :</span>
        <span className="font-display text-lg font-bold text-success">{totalPaid.toLocaleString('fr-FR')} GNF</span>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {['Élève', 'Libellé', 'Montant (GNF)', 'Statut', 'Date'].map((col) => (
                <th key={col} className="px-4 py-3 text-left font-body text-xs font-medium text-muted uppercase tracking-wider">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>{Array.from({ length: 5 }).map((_, j) => (
                  <td key={j} className="px-4 py-3"><div className="h-4 bg-border/60 rounded animate-pulse w-3/4" /></td>
                ))}</tr>
              ))
            ) : payments.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-12 text-center font-body text-sm text-muted">Aucun paiement enregistré</td></tr>
            ) : payments.map((p) => (
              <tr key={p.id} className="hover:bg-bg/60 transition-colors">
                <td className="px-4 py-3 font-body text-sm text-text">{p.students ? `${p.students.last_name} ${p.students.first_name}` : '—'}</td>
                <td className="px-4 py-3 font-body text-sm text-muted">{p.label}</td>
                <td className="px-4 py-3 font-mono text-sm text-text">{p.amount.toLocaleString('fr-FR')}</td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-xs px-2 py-0.5 rounded-full border ${STATUS_STYLE[p.status]}`}>{STATUS_LABEL[p.status]}</span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted">
                  {new Date(p.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: '2-digit' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
