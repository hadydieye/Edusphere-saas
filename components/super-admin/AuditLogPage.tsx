'use client';

import { useState, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuditLog {
  id: string;
  action: string;
  actor_id: string;
  target_id: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface AuditFilters {
  action?: string;
  from?: string;
  to?: string;
}

interface AuditLogPageProps {
  logs: AuditLog[];
  total: number;
  page: number;
  isLoading: boolean;
  onFilter: (filters: AuditFilters) => void;
  onPageChange: (p: number) => void;
  onExport: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 25;

const ACTION_OPTIONS = [
  { value: '',                      label: 'Toutes les actions' },
  { value: 'school.created',        label: 'school.created' },
  { value: 'school.updated',        label: 'school.updated' },
  { value: 'school.suspended',      label: 'school.suspended' },
  { value: 'school.activated',      label: 'school.activated' },
  { value: 'school_admin.created',  label: 'school_admin.created' },
];

const ACTION_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  created:   { bg: 'bg-success/10',  text: 'text-success', border: 'border-success/20' },
  updated:   { bg: 'bg-accent/10',   text: 'text-accent',  border: 'border-accent/20' },
  suspended: { bg: 'bg-danger/10',   text: 'text-danger',  border: 'border-danger/20' },
  activated: { bg: 'bg-success/10',  text: 'text-success', border: 'border-success/20' },
};

function getActionStyle(action: string) {
  const key = Object.keys(ACTION_STYLES).find((k) => action.includes(k));
  return key ? ACTION_STYLES[key] : { bg: 'bg-border/40', text: 'text-muted', border: 'border-border' };
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconDownload = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const IconX = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const IconChevronLeft = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const IconChevronRight = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);

// ─── JSON Highlight ───────────────────────────────────────────────────────────

function JsonHighlight({ data }: { data: Record<string, unknown> }) {
  const lines = JSON.stringify(data, null, 2).split('\n');
  return (
    <pre className="font-mono text-xs leading-relaxed overflow-auto">
      {lines.map((line, i) => {
        // key: "value" pattern
        const keyMatch = line.match(/^(\s*)("[\w_]+")(\s*:\s*)(.*)$/);
        if (keyMatch) {
          const [, indent, key, colon, val] = keyMatch;
          return (
            <div key={i}>
              <span className="text-muted">{indent}</span>
              <span className="text-accent">{key}</span>
              <span className="text-muted">{colon}</span>
              <span className="text-text">{val}</span>
            </div>
          );
        }
        return <div key={i} className="text-muted">{line}</div>;
      })}
    </pre>
  );
}

// ─── Details Modal ────────────────────────────────────────────────────────────

function DetailsModal({ log, onClose }: { log: AuditLog; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-bg/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-bg border border-border rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <p className="font-display text-sm font-semibold text-text">{log.action}</p>
            <p className="font-mono text-xs text-muted mt-0.5">{log.id}</p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-text transition-colors">
            <IconX />
          </button>
        </div>
        {/* Body */}
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          <JsonHighlight data={log.metadata} />
        </div>
      </div>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <tr>
      {[40, 30, 25, 25, 15].map((w, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-border/60 rounded animate-pulse" style={{ width: `${w}%` }} />
        </td>
      ))}
    </tr>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AuditLogPage({
  logs, total, page, isLoading, onFilter, onPageChange, onExport,
}: AuditLogPageProps) {
  const [filters, setFilters] = useState<AuditFilters>({});
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const from = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1);

  const updateFilter = (patch: Partial<AuditFilters>) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    onFilter(next);
  };

  const resetFilters = () => {
    setFilters({});
    onFilter({});
  };

  const inputCls = 'bg-surface border border-border rounded-xl px-3 py-2 text-sm font-body text-text placeholder:text-muted outline-none focus:border-accent transition-colors';

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-display text-2xl font-bold text-text">Journal d'audit</h1>
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border font-body text-sm text-muted hover:text-text hover:border-muted transition-colors"
          >
            <IconDownload />
            Exporter CSV
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filters.action ?? ''}
            onChange={(e) => updateFilter({ action: e.target.value || undefined })}
            className={`${inputCls} appearance-none`}
          >
            {ACTION_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <input
            type="date"
            value={filters.from ?? ''}
            onChange={(e) => updateFilter({ from: e.target.value || undefined })}
            className={inputCls}
          />

          <input
            type="date"
            value={filters.to ?? ''}
            onChange={(e) => updateFilter({ to: e.target.value || undefined })}
            className={inputCls}
          />

          {(filters.action || filters.from || filters.to) && (
            <button
              onClick={resetFilters}
              className="font-body text-xs text-muted hover:text-text underline underline-offset-2 transition-colors"
            >
              Réinitialiser filtres
            </button>
          )}
        </div>

        {/* Table */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {['Date / Heure', 'Action', 'Acteur', 'Cible', 'Détails'].map((col) => (
                    <th key={col} className="px-4 py-3 text-left font-body text-xs font-medium text-muted uppercase tracking-wider">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center font-body text-sm text-muted">
                      Aucune entrée trouvée
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => {
                    const style = getActionStyle(log.action);
                    return (
                      <tr key={log.id} className="hover:bg-bg/60 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-muted whitespace-nowrap">
                          {new Date(log.created_at).toLocaleDateString('fr-FR', {
                            day: '2-digit', month: 'short', year: 'numeric',
                          })}{' '}
                          à{' '}
                          {new Date(log.created_at).toLocaleTimeString('fr-FR', {
                            hour: '2-digit', minute: '2-digit',
                          })}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center font-mono text-xs px-2.5 py-0.5 rounded-full border ${style.bg} ${style.text} ${style.border}`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-muted">
                          {log.actor_id.slice(0, 8)}…
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-muted">
                          {log.target_id.slice(0, 8)}…
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setSelectedLog(log)}
                            className="font-body text-xs text-accent hover:text-accent/80 underline underline-offset-2 transition-colors"
                          >
                            Voir
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!isLoading && total > 0 && (
            <div className="flex items-center justify-between gap-4 px-4 py-3 border-t border-border">
              <span className="font-body text-xs text-muted">
                Affichage {from}–{to} sur {total.toLocaleString('fr-FR')} entrées
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onPageChange(page - 1)}
                  disabled={page === 1}
                  className="p-1.5 rounded-lg text-muted hover:text-text hover:bg-border disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <IconChevronLeft />
                </button>
                {pageNumbers.map((p, i) => {
                  const prev = pageNumbers[i - 1];
                  return (
                    <span key={p} className="flex items-center gap-1">
                      {prev && p - prev > 1 && <span className="font-mono text-xs text-muted px-1">…</span>}
                      <button
                        onClick={() => onPageChange(p)}
                        className={`min-w-[28px] h-7 rounded-lg font-mono text-xs transition-colors ${
                          p === page ? 'bg-primary text-white' : 'text-muted hover:text-text hover:bg-border'
                        }`}
                      >
                        {p}
                      </button>
                    </span>
                  );
                })}
                <button
                  onClick={() => onPageChange(page + 1)}
                  disabled={page === totalPages}
                  className="p-1.5 rounded-lg text-muted hover:text-text hover:bg-border disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <IconChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedLog && (
        <DetailsModal log={selectedLog} onClose={() => setSelectedLog(null)} />
      )}
    </>
  );
}
