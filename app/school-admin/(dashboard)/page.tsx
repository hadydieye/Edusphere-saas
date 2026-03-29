import { getSchoolDashboard, getPendingPaymentsCount } from '@/lib/actions/school-admin';
import Link from 'next/link';

export default async function SchoolDashboardPage() {
  console.log('--- RENDERING SCHOOL DASHBOARD PAGE ---');
  const [{ school, stats, recentStudents }, overdueCount] = await Promise.all([
    getSchoolDashboard(),
    getPendingPaymentsCount()
  ]);
  console.log('--- DASHBOARD DATA FETCHED ---', { schoolName: school?.name });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-text">{school?.name ?? 'Dashboard'}</h1>
        <p className="font-body text-sm text-muted mt-1">Vue d'ensemble de votre établissement</p>
      </div>

      {overdueCount > 0 && (
        <div className="bg-danger/10 border border-danger/20 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-body text-sm font-semibold text-danger">{overdueCount} paiement(s) en retard</p>
              <p className="font-body text-xs text-danger/80">Certains paiements en attente datent de plus d'une semaine.</p>
            </div>
          </div>
          <Link href="/school-admin/payments" className="text-danger font-body text-sm font-bold hover:underline">Voir tout →</Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total élèves',    value: stats.totalStudents,  color: 'text-text' },
          { label: 'Recettes',        value: `${stats.totalPayments.toLocaleString('fr-FR')} GNF`, color: 'text-success' },
          { label: 'Dépenses',        value: `${stats.totalExpenses.toLocaleString('fr-FR')} GNF`, color: 'text-danger' },
          { label: 'Bénéfice Net',    value: `${(stats.totalPayments - stats.totalExpenses).toLocaleString('fr-FR')} GNF`, color: 'text-accent' },
        ].map((s) => (
          <div key={s.label} className="bg-surface border border-border rounded-2xl p-5 space-y-2">
            <p className="font-body text-xs text-muted font-medium uppercase">{s.label}</p>
            <p className={`font-display text-xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recent students */}
      <div className="bg-surface border border-border rounded-2xl p-5 space-y-4">
        <h2 className="font-display text-base font-semibold text-text">Derniers élèves inscrits</h2>
        {recentStudents.length === 0 ? (
          <p className="font-body text-sm text-muted">Aucun élève inscrit pour l'instant.</p>
        ) : (
          <ul className="divide-y divide-border">
            {recentStudents.map((s) => (
              <li key={s.id} className="flex items-center justify-between py-2.5">
                <span className="font-body text-sm text-text">{s.last_name} {s.first_name}</span>
                <span className={`font-mono text-xs px-2 py-0.5 rounded-full border ${
                  s.status === 'active' ? 'bg-success/10 text-success border-success/20' : 'bg-danger/10 text-danger border-danger/20'
                }`}>{s.status === 'active' ? 'Actif' : 'Inactif'}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
