'use client';

import { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface School {
  id: string;
  name: string;
  code: string;
  region: string;
  city: string;
  phone: string;
  email: string;
  plan: 'starter' | 'pro' | 'enterprise';
  status: 'active' | 'suspended';
  created_at: string;
  trial_ends_at: string;
}

export interface SchoolAdmin {
  id: string;
  name: string;
  email: string;
}

export interface AuditLog {
  id: string;
  action: string;
  description: string;
  timestamp: string;
}

interface SchoolDetailPageProps {
  school: School;
  admin: SchoolAdmin;
  auditLogs: AuditLog[];
  onSuspend: () => void;
  onReactivate: () => void;
  isLoading: boolean;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

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

const IconKey = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

const IconX = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const Spinner = () => (
  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PLAN_LABELS: Record<School['plan'], string> = {
  starter: 'Starter', pro: 'Pro', enterprise: 'Enterprise',
};

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-body text-xs text-muted">{label}</span>
      <span className="font-body text-sm text-text">{value || '—'}</span>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-base font-semibold text-text">{title}</h2>
      {children}
    </div>
  );
}

// ─── Suspension Modal ─────────────────────────────────────────────────────────

function SuspendModal({ schoolName, onConfirm, onClose, isLoading }: {
  schoolName: string;
  onConfirm: () => void;
  onClose: () => void;
  isLoading: boolean;
}) {
  const [input, setInput] = useState('');
  const confirmed = input === schoolName;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-bg/70 backdrop-blur-sm" onClick={onClose} />

      {/* Card */}
      <div
        className="relative w-full max-w-md rounded-2xl border border-border p-6 space-y-5"
        style={{ background: 'rgba(15,23,36,0.95)', backdropFilter: 'blur(16px)' }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="w-10 h-10 rounded-xl bg-danger/10 border border-danger/20 flex items-center justify-center text-danger shrink-0">
            <IconBan />
          </div>
          <button onClick={onClose} className="text-muted hover:text-text transition-colors mt-0.5">
            <IconX />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="font-display text-lg font-semibold text-text">Confirmer la suspension</h3>
          <p className="font-body text-sm text-muted leading-relaxed">
            Cette action suspendra immédiatement l'accès à l'école et à tous ses utilisateurs.
            Les données seront conservées.
          </p>
        </div>

        <div className="bg-warning/5 border border-warning/20 rounded-xl px-4 py-3 font-body text-xs text-warning">
          ⚠ Les enseignants et élèves ne pourront plus se connecter tant que l'école est suspendue.
        </div>

        <div className="space-y-1.5">
          <label className="font-body text-xs text-muted">
            Tapez <span className="font-mono text-text">{schoolName}</span> pour confirmer
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={schoolName}
            className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm font-body text-text placeholder:text-muted/40 outline-none focus:border-danger transition-colors"
          />
        </div>

        <div className="flex gap-3 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-border font-body text-sm text-muted hover:text-text hover:border-muted transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={!confirmed || isLoading}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-danger hover:bg-danger/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-display font-semibold text-sm transition-colors"
          >
            {isLoading && <Spinner />}
            Suspendre
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SchoolDetailPage({
  school, admin, auditLogs, onSuspend, onReactivate, isLoading,
}: SchoolDetailPageProps) {
  const [showModal, setShowModal] = useState(false);

  const handleSuspendConfirm = () => {
    onSuspend();
    setShowModal(false);
  };

  return (
    <>
      <div className="space-y-6 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 font-body text-xs text-muted">
          {['Dashboard', 'Écoles', school.name].map((seg, i, arr) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-border">/</span>}
              <span className={i === arr.length - 1 ? 'text-text truncate max-w-[200px]' : ''}>{seg}</span>
            </span>
          ))}
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="font-display text-2xl font-bold text-text truncate">{school.name}</h1>
            <span className={`shrink-0 inline-flex items-center font-mono text-xs px-2.5 py-0.5 rounded-full border ${
              school.status === 'active'
                ? 'bg-success/10 text-success border-success/20'
                : 'bg-danger/10 text-danger border-danger/20'
            }`}>
              {school.status === 'active' ? 'Active' : 'Suspendue'}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border font-body text-sm text-muted hover:text-text hover:border-muted transition-colors">
              <IconEdit />
              Modifier
            </button>
            {school.status === 'active' ? (
              <button
                onClick={() => setShowModal(true)}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-danger/10 border border-danger/20 text-danger hover:bg-danger/20 disabled:opacity-50 font-body text-sm transition-colors"
              >
                <IconBan />
                Suspendre
              </button>
            ) : (
              <button
                onClick={onReactivate}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-success/10 border border-success/20 text-success hover:bg-success/20 disabled:opacity-50 font-body text-sm transition-colors"
              >
                {isLoading ? <Spinner /> : <IconCheck />}
                Réactiver
              </button>
            )}
          </div>
        </div>

        {/* School info */}
        <Card title="Informations de l'école">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
            <InfoItem label="Code"          value={school.code} />
            <InfoItem label="Région"        value={school.region} />
            <InfoItem label="Ville"         value={school.city} />
            <InfoItem label="Téléphone"     value={school.phone} />
            <InfoItem label="Email"         value={school.email} />
            <InfoItem label="Plan"          value={PLAN_LABELS[school.plan]} />
            <InfoItem label="Date création" value={fmt(school.created_at)} />
            <InfoItem label="Fin du trial"  value={fmt(school.trial_ends_at)} />
          </div>
        </Card>

        {/* Admin */}
        <Card title="Administrateur initial">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                <span className="font-mono text-xs font-semibold text-primary">
                  {admin.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-body text-sm font-medium text-text">{admin.name}</p>
                <p className="font-mono text-xs text-muted">{admin.email}</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border font-body text-xs text-muted hover:text-text hover:border-muted transition-colors shrink-0">
              <IconKey />
              Réinitialiser mot de passe
            </button>
          </div>
        </Card>

        {/* Audit log */}
        <Card title="Historique des actions">
          {auditLogs.length === 0 ? (
            <p className="font-body text-sm text-muted text-center py-4">Aucune action enregistrée.</p>
          ) : (
            <ul className="space-y-1">
              {auditLogs.slice(0, 10).map((log) => (
                <li key={log.id} className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-bg transition-colors">
                  <span className="text-muted mt-0.5"><IconClock /></span>
                  <div className="flex-1 min-w-0">
                    <span className="font-body text-sm text-text">{log.action}</span>
                    {log.description && (
                      <span className="font-body text-xs text-muted ml-2">{log.description}</span>
                    )}
                  </div>
                  <span className="font-mono text-xs text-muted shrink-0">{fmtTime(log.timestamp)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* Suspension modal */}
      {showModal && (
        <SuspendModal
          schoolName={school.name}
          onConfirm={handleSuspendConfirm}
          onClose={() => setShowModal(false)}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
