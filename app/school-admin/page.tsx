import { getSchoolDashboard } from '@/lib/actions/school-admin';

export default async function SchoolDashboardPage() {
  const { school, stats, recentStudents } = await getSchoolDashboard();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-text">{school?.name ?? 'Dashboard'}</h1>
        <p className="font-body text-sm text-muted mt-1">Vue d'ensemble de votre établissement</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total élèves',    value: stats.totalStudents,  color: 'text-text' },
          { label: 'Élèves actifs',   value: stats.activeStudents, color: 'text-success' },
          { label: 'Recettes (GNF)',  value: stats.totalPayments.toLocaleString('fr-FR'), color: 'text-accent' },
        ].map((s) => (
          <div key={s.label} className="bg-surface border border-border rounded-2xl p-5 space-y-2">
            <p className="font-body text-sm text-muted">{s.label}</p>
            <p className={`font-display text-3xl font-bold ${s.color}`}>{s.value}</p>
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
