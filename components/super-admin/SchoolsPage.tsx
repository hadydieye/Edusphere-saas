'use client';

import { useState, useEffect, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface School {
  id: string;
  name: string;
  code: string;
  address: { city: string };
  status: 'active' | 'suspended';
  plan: string;
  created_at: string;
}

interface SchoolsPageProps {
  schools: School[];
  total: number;
  page: number;
  isLoading: boolean;
  onSearch: (q: string) => void;
  onFilter: (status: string) => void;
  onPageChange: (p: number) => void;
  onCreateNew: () => void;
  onView: (id: string) => void;
  onSuspend: (id: string) => void;
  onActivate: (id: string) => void;
}

const PAGE_SIZE = 25;

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconPlus = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

const IconSearch = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-muted">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);

const IconEye = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
  </svg>
);

const IconEdit = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
);

const IconBan = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: School['status'] }) {
  return (
    <span className={`inline-flex items-center font-mono text-xs px-2.5 py-0.5 rounded-full border ${
      status === 'active'
        ? 'bg-success/10 text-success border-success/20'
        : 'bg-danger/10 text-danger border-danger/20'
    }`}>
      {status === 'active' ? 'Active' : 'Suspendue'}
    </span>
  );
}

function SkeletonRow() {
  return (
    <tr>
      {Array.from({ length: 7 }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-border/60 rounded animate-pulse" style={{ width: `${[60, 40, 50, 30, 35, 45, 20][i]}%` }} />
        </td>
      ))}
    </tr>
  );
}

function EmptyState() {
  return (
    <tr>
      <td colSpan={7} className="px-4 py-16 text-center">
        <div className="flex flex-col items-center gap-3">
          <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 opacity-20">
            <rect x="8" y="12" width="48" height="40" rx="4" stroke="#7C5CFC" strokeWidth="2" />
            <line x1="8" y1="24" x2="56" y2="24" stroke="#7C5CFC" strokeWidth="2" />
            <line x1="20" y1="12" x2="20" y2="52" stroke="#7C5CFC" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="32" cy="38" r="8" stroke="#00D4FF" strokeWidth="2" />
            <line x1="38" y1="44" x2="44" y2="50" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p className="font-body text-muted text-sm">Aucune école trouvée</p>
        </div>
      </td>
    </tr>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const STATUS_FILTERS = [
  { value: '',          label: 'Toutes' },
  { value: 'active',    label: 'Actives' },
  { value: 'suspended', label: 'Suspendues' },
];

export default function SchoolsPage({
  schools, total, page, isLoading,
  onSearch, onFilter, onPageChange,
  onCreateNew, onView, onSuspend, onActivate,
}: SchoolsPageProps) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSearch(query), 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const from = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  const handleFilter = (value: string) => {
    setActiveFilter(value);
    onFilter(value);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <h1 className="font-display text-2xl font-bold text-text">Écoles</h1>
          <span className="font-mono text-sm text-muted">{total.toLocaleString('fr-FR')}</span>
        </div>
        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-body text-sm font-medium px-4 py-2 rounded-xl transition-colors"
        >
          <IconPlus />
          Nouvelle école
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <IconSearch />
          </span>
          <input
            type="search"
            placeholder="Rechercher une école…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-surface border border-border rounded-xl pl-9 pr-4 py-2 text-sm font-body text-text placeholder:text-muted outline-none focus:border-accent transition-colors"
          />
        </div>

        {/* Status tabs */}
        <div className="flex items-center gap-1 bg-surface border border-border rounded-xl p-1">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => handleFilter(f.value)}
              className={`font-body text-sm px-3 py-1.5 rounded-lg transition-colors ${
                activeFilter === f.value
                  ? 'bg-primary text-white'
                  : 'text-muted hover:text-text'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['Nom', 'Code', 'Ville', 'Statut', 'Plan', 'Création', 'Actions'].map((col) => (
                  <th key={col} className="px-4 py-3 text-left font-body text-xs font-medium text-muted uppercase tracking-wider">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              ) : schools.length === 0 ? (
                <EmptyState />
              ) : (
                schools.map((school) => (
                  <tr key={school.id} className="hover:bg-bg/60 transition-colors">
                    <td className="px-4 py-3 font-body text-sm text-text font-medium">{school.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted">{school.code}</td>
                    <td className="px-4 py-3 font-body text-sm text-muted">{school.address.city}</td>
                    <td className="px-4 py-3"><StatusBadge status={school.status} /></td>
                    <td className="px-4 py-3 font-body text-sm text-muted">{school.plan}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted">
                      {new Date(school.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: '2-digit' })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onView(school.id)}
                          title="Voir"
                          className="p-1.5 rounded-lg text-muted hover:text-accent hover:bg-accent/10 transition-colors"
                        >
                          <IconEye />
                        </button>
                        <button
                          title="Modifier"
                          className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-primary/10 transition-colors"
                        >
                          <IconEdit />
                        </button>
                        {school.status === 'active' ? (
                          <button
                            onClick={() => onSuspend(school.id)}
                            title="Suspendre"
                            className="p-1.5 rounded-lg text-muted hover:text-danger hover:bg-danger/10 transition-colors"
                          >
                            <IconBan />
                          </button>
                        ) : (
                          <button
                            onClick={() => onActivate(school.id)}
                            title="Activer"
                            className="p-1.5 rounded-lg text-muted hover:text-success hover:bg-success/10 transition-colors"
                          >
                            <IconCheck />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && total > 0 && (
          <div className="flex items-center justify-between gap-4 px-4 py-3 border-t border-border">
            <span className="font-body text-xs text-muted">
              Affichage {from}–{to} sur {total.toLocaleString('fr-FR')} écoles
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
                    {prev && p - prev > 1 && (
                      <span className="font-mono text-xs text-muted px-1">…</span>
                    )}
                    <button
                      onClick={() => onPageChange(p)}
                      className={`min-w-[28px] h-7 rounded-lg font-mono text-xs transition-colors ${
                        p === page
                          ? 'bg-primary text-white'
                          : 'text-muted hover:text-text hover:bg-border'
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
  );
}
