'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface School {
  id: string;
  name: string;
  status: 'active' | 'suspended' | 'pending';
  createdAt: string; // ISO date string
}

export interface AuditLog {
  id: string;
  action: string;
  target: string;
  timestamp: string; // ISO date string
}

interface DashboardPageProps {
  stats: { total: number; active: number; suspended: number; admins: number };
  chartData: { date: string; count: number }[];
  recentSchools: School[];
  recentAuditLogs: AuditLog[];
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconBuilding = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm0 4h2v2H7V9zm0 4h2v2H7v-2zm4-8h2v2h-2V5zm0 4h2v2h-2V9zm0 4h2v2h-2v-2z" clipRule="evenodd" />
  </svg>
);

const IconCheckCircle = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const IconBan = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
  </svg>
);

const IconUsers = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
  </svg>
);

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;       // tailwind text class
  glow: string;        // tailwind shadow class
  trend?: number;
}

function StatCard({ label, value, icon, color, glow, trend }: StatCardProps) {
  return (
    <div className={`bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3 transition-shadow duration-200 hover:shadow-lg ${glow}`}>
      <div className="flex items-center justify-between">
        <span className="font-body text-sm text-muted">{label}</span>
        <span className={color}>{icon}</span>
      </div>
      <div className="flex items-end gap-2">
        <span className="font-display text-3xl font-bold text-text">{value.toLocaleString('fr-FR')}</span>
        {trend !== undefined && (
          <span className={`font-body text-xs mb-1 ${trend >= 0 ? 'text-success' : 'text-danger'}`}>
            {trend >= 0 ? '+' : ''}{trend} ce mois
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<School['status'], string> = {
  active:    'bg-success/10 text-success border-success/20',
  suspended: 'bg-danger/10 text-danger border-danger/20',
  pending:   'bg-warning/10 text-warning border-warning/20',
};

const STATUS_LABELS: Record<School['status'], string> = {
  active:    'Active',
  suspended: 'Suspendue',
  pending:   'En attente',
};

function StatusBadge({ status }: { status: School['status'] }) {
  return (
    <span className={`font-mono text-xs px-2 py-0.5 rounded-full border ${STATUS_STYLES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface border border-border rounded-lg px-3 py-2 text-xs font-body">
      <p className="text-muted mb-0.5">{label}</p>
      <p className="text-primary font-semibold">{payload[0].value} inscription{payload[0].value > 1 ? 's' : ''}</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DashboardPage({ stats, chartData, recentSchools, recentAuditLogs }: DashboardPageProps) {
  const statCards: StatCardProps[] = [
    { label: 'Total Écoles',     value: stats.total,     icon: <IconBuilding />,    color: 'text-text',    glow: 'hover:shadow-primary/10',  trend: undefined },
    { label: 'Écoles Actives',   value: stats.active,    icon: <IconCheckCircle />, color: 'text-success', glow: 'hover:shadow-success/10',  trend: 3 },
    { label: 'Suspendues',       value: stats.suspended, icon: <IconBan />,         color: 'text-danger',  glow: 'hover:shadow-danger/10',   trend: -1 },
    { label: 'Administrateurs',  value: stats.admins,    icon: <IconUsers />,       color: 'text-accent',  glow: 'hover:shadow-accent/10',   trend: 2 },
  ];

  return (
    <div className="space-y-8">
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Chart */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <h2 className="font-display text-base font-semibold text-text mb-6">
          Inscriptions des 30 derniers jours
        </h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} barSize={10}>
            <CartesianGrid vertical={false} stroke="#1E2D45" strokeDasharray="4 4" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#6B7A99', fontSize: 11, fontFamily: 'var(--font-mono)' }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: '#6B7A99', fontSize: 11, fontFamily: 'var(--font-mono)' }}
              axisLine={false}
              tickLine={false}
              width={28}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: '#7C5CFC', fillOpacity: 0.06 }} />
            <Bar dataKey="count" fill="#7C5CFC" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent schools */}
        <div className="bg-surface border border-border rounded-2xl p-5">
          <h2 className="font-display text-base font-semibold text-text mb-4">Dernières écoles</h2>
          <ul className="space-y-1">
            {recentSchools.slice(0, 5).map((school) => (
              <li
                key={school.id}
                className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-bg transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-mono text-xs text-muted shrink-0">{school.id}</span>
                  <span className="font-body text-sm text-text truncate">{school.name}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={school.status} />
                  <span className="font-mono text-xs text-muted hidden sm:block">
                    {new Date(school.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent audit logs */}
        <div className="bg-surface border border-border rounded-2xl p-5">
          <h2 className="font-display text-base font-semibold text-text mb-4">Dernières actions</h2>
          <ul className="space-y-1">
            {recentAuditLogs.slice(0, 5).map((log) => (
              <li
                key={log.id}
                className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-bg transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-body text-sm text-text truncate">{log.action}</span>
                  <span className="font-body text-xs text-muted truncate hidden sm:block">→ {log.target}</span>
                </div>
                <span className="font-mono text-xs text-muted shrink-0">
                  {new Date(log.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
