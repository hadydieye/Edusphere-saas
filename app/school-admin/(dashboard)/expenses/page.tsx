'use client';

import { useState, useEffect } from 'react';
import { getExpenses, createExpense, deleteExpense } from '@/lib/actions/school-admin';

const CATEGORIES = ['Salaire', 'Loyer', 'Fournitures', 'Maintenance', 'Électricité/Eau', 'Autre'];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    label: '',
    category: CATEGORIES[0],
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    setIsLoading(true);
    const data = await getExpenses();
    setExpenses(data);
    setIsLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const error = await createExpense({
      ...formData,
      amount: parseInt(formData.amount)
    });
    if (error) {
      alert('Erreur: ' + error);
    } else {
      setFormData({ amount: '', label: '', category: CATEGORIES[0], date: new Date().toISOString().split('T')[0] });
      setIsAdding(false);
      loadExpenses();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette dépense ?')) return;
    const error = await deleteExpense(id);
    if (error) alert('Erreur: ' + error);
    else loadExpenses();
  }

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-text">Dépenses</h1>
          <p className="font-body text-sm text-muted mt-1">Suivi des sorties d'argent de l'établissement</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold transition-all hover:shadow-lg hover:shadow-primary/20"
        >
          {isAdding ? 'Annuler' : '+ Enregistrer une dépense'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface border border-border rounded-2xl p-5 space-y-1">
          <p className="font-body text-xs text-muted uppercase font-medium">Total Dépenses</p>
          <p className="font-display text-3xl font-bold text-danger">{totalExpenses.toLocaleString('fr-FR')} GNF</p>
        </div>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-2xl p-6 space-y-4 animate-in fade-in slide-in-from-top-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-body text-xs font-medium text-muted uppercase">Libellé</label>
              <input 
                required
                value={formData.label}
                onChange={e => setFormData({ ...formData, label: e.target.value })}
                placeholder="Ex: Facture électricité Mars"
                className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm font-body text-text outline-none focus:border-accent"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-body text-xs font-medium text-muted uppercase">Montant (GNF)</label>
              <input 
                required
                type="number"
                value={formData.amount}
                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm font-mono text-text outline-none focus:border-accent"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-body text-xs font-medium text-muted uppercase">Catégorie</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm font-body text-text outline-none focus:border-accent"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="font-body text-xs font-medium text-muted uppercase">Date</label>
              <input 
                type="date"
                required
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm font-body text-text outline-none focus:border-accent"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button type="submit" className="bg-accent text-white px-6 py-2 rounded-xl text-sm font-bold">
              Enregistrer
            </button>
          </div>
        </form>
      )}

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-bg/30">
              <th className="px-6 py-4 font-body text-xs font-semibold text-muted uppercase tracking-wider">Libellé</th>
              <th className="px-6 py-4 font-body text-xs font-semibold text-muted uppercase tracking-wider">Catégorie</th>
              <th className="px-6 py-4 font-body text-xs font-semibold text-muted uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 font-body text-xs font-semibold text-muted uppercase tracking-wider text-right">Montant</th>
              <th className="px-6 py-4 font-body text-xs font-semibold text-muted uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i}><td colSpan={5} className="px-6 py-4 animate-pulse bg-border/10 h-10"></td></tr>
              ))
            ) : expenses.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-muted font-body text-sm">Aucune dépense enregistrée</td></tr>
            ) : expenses.map((exp) => (
              <tr key={exp.id} className="hover:bg-bg/40 transition-colors">
                <td className="px-6 py-4 font-body text-sm text-text font-medium">{exp.label}</td>
                <td className="px-6 py-4">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-muted/20 text-muted border border-border">
                    {exp.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-body text-xs text-muted">
                  {new Date(exp.date).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 font-mono text-sm text-danger text-right font-bold">
                  -{exp.amount.toLocaleString('fr-FR')}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleDelete(exp.id)}
                    className="text-muted hover:text-danger transition-colors text-xs font-medium"
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
