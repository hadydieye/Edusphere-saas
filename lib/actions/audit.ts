'use server';

import { adminClient } from '@/lib/supabase/admin';
import type { AuditFilters } from '@/components/super-admin/AuditLogPage';

const PAGE_SIZE = 25;

export async function getAuditLogs(opts: {
  page?: number;
  filters?: AuditFilters;
}) {
  const { page = 1, filters = {} } = opts;

  let query = adminClient
    .from('audit_logs')
    .select('*', { count: 'exact' });

  if (filters.action) query = query.eq('action', filters.action);
  if (filters.from)   query = query.gte('created_at', filters.from);
  if (filters.to)     query = query.lte('created_at', filters.to + 'T23:59:59Z');

  const { data, count, error } = await query
    .order('created_at', { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (error) throw new Error(error.message);
  return { logs: data ?? [], total: count ?? 0 };
}

export async function getDashboardStats() {
  const [total, active, suspended, admins, recentSchools, recentLogs] = await Promise.all([
    adminClient.from('schools').select('*', { count: 'exact', head: true }).then((r) => r.count ?? 0),
    adminClient.from('schools').select('*', { count: 'exact', head: true }).eq('status', 'active').then((r) => r.count ?? 0),
    adminClient.from('schools').select('*', { count: 'exact', head: true }).eq('status', 'suspended').then((r) => r.count ?? 0),
    adminClient.from('school_admins').select('*', { count: 'exact', head: true }).then((r) => r.count ?? 0),
    adminClient.from('schools').select('id, name, status, created_at').order('created_at', { ascending: false }).limit(5).then((r) => r.data ?? []),
    adminClient.from('audit_logs').select('id, action, metadata, created_at, target_id').order('created_at', { ascending: false }).limit(5).then((r) => r.data ?? []),
  ]);

  // Chart: inscriptions par jour sur 30 jours
  const since = new Date();
  since.setDate(since.getDate() - 29);
  const { data: chartRaw } = await adminClient
    .from('schools')
    .select('created_at')
    .gte('created_at', since.toISOString());

  const countByDay: Record<string, number> = {};
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    countByDay[d.toISOString().slice(0, 10)] = 0;
  }
  (chartRaw ?? []).forEach((s) => {
    const day = s.created_at.slice(0, 10);
    if (day in countByDay) countByDay[day]++;
  });

  const chartData = Object.entries(countByDay).map(([date, count]) => ({
    date: new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
    count,
  }));

  return {
    stats: { total, active, suspended, admins },
    chartData,
    recentSchools: recentSchools.map((s) => ({
      id: s.id,
      name: s.name,
      status: s.status as 'active' | 'suspended',
      createdAt: s.created_at,
    })),
    recentAuditLogs: recentLogs.map((l) => ({
      id: l.id,
      action: l.action,
      target: (l.metadata as any)?.school_name ?? l.target_id.slice(0, 8),
      timestamp: l.created_at,
    })),
  };
}
