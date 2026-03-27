'use client';

import { useState, useCallback, useEffect } from 'react';
import AuditLogPage from '@/components/super-admin/AuditLogPage';
import type { AuditLog, AuditFilters } from '@/components/super-admin/AuditLogPage';
import { getAuditLogs } from '@/lib/actions/audit';

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<AuditFilters>({});
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async (p: number, f: AuditFilters) => {
    setIsLoading(true);
    try {
      const res = await getAuditLogs({ page: p, filters: f });
      setLogs(res.logs);
      setTotal(res.total);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { load(page, filters); }, [page, filters, load]);

  const handleFilter = useCallback((f: AuditFilters) => {
    setFilters(f);
    setPage(1);
  }, []);

  const handleExport = () => {
    const header = 'id,action,actor_id,target_id,created_at\n';
    const rows = logs.map((l) => `${l.id},${l.action},${l.actor_id},${l.target_id},${l.created_at}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'audit-log.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AuditLogPage
      logs={logs}
      total={total}
      page={page}
      isLoading={isLoading}
      onFilter={handleFilter}
      onPageChange={setPage}
      onExport={handleExport}
    />
  );
}
