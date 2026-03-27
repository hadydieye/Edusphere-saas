'use client';

import { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CreateSchoolInput {
  name: string;
  code: string;
  region: string;
  city: string;
  phone: string;
  email: string;
  plan: 'starter' | 'pro' | 'enterprise';
  trialDays: 30 | 60 | 90;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
}

interface CreateSchoolFormProps {
  onSubmit: (data: CreateSchoolInput) => void;
  isLoading: boolean;
  error: string | null;
}

type FormErrors = Partial<Record<keyof CreateSchoolInput, string>>;

// ─── Constants ────────────────────────────────────────────────────────────────

const REGIONS = ['Conakry', 'Kindia', 'Boké', 'Labé', 'Mamou', 'Faranah', 'Kankan', "N'Zérékoré"];

const PLANS: { value: CreateSchoolInput['plan']; label: string; price: string; desc: string }[] = [
  { value: 'starter',    label: 'Starter',    price: '150 000 GNF', desc: 'Jusqu\'à 500 élèves' },
  { value: 'pro',        label: 'Pro',         price: '400 000 GNF', desc: 'Jusqu\'à 2 000 élèves' },
  { value: 'enterprise', label: 'Enterprise',  price: '900 000 GNF', desc: 'Illimité' },
];

const TRIAL_DAYS: { value: CreateSchoolInput['trialDays']; label: string }[] = [
  { value: 30, label: '30 jours' },
  { value: 60, label: '60 jours' },
  { value: 90, label: '90 jours' },
];

// ─── Password strength ────────────────────────────────────────────────────────

function getStrength(pwd: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pwd.length >= 8)  score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const levels = [
    { label: '',       color: 'bg-border' },
    { label: 'Faible', color: 'bg-danger' },
    { label: 'Moyen',  color: 'bg-warning' },
    { label: 'Bon',    color: 'bg-accent' },
    { label: 'Fort',   color: 'bg-success' },
  ];
  return { score, ...levels[score] };
}

// ─── Small reusable field components ─────────────────────────────────────────

function Field({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-xs font-medium text-muted">
        {label}{required && <span className="text-danger ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="font-body text-xs text-danger">{error}</p>}
    </div>
  );
}

const inputCls = (err?: string) =>
  `w-full bg-bg border ${err ? 'border-danger' : 'border-border'} rounded-xl px-4 py-2.5 text-sm font-body text-text placeholder:text-muted outline-none focus:border-accent transition-colors`;

const IconEye = ({ off }: { off: boolean }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    {off
      ? <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
      : <>
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </>
    }
  </svg>
);

const Spinner = () => (
  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(d: CreateSchoolInput): FormErrors {
  const e: FormErrors = {};
  if (!d.name.trim())          e.name          = 'Le nom est requis';
  if (!d.code.trim())          e.code          = 'Le code est requis';
  if (!d.region)               e.region        = 'La région est requise';
  if (!d.adminName.trim())     e.adminName     = 'Le nom de l\'admin est requis';
  if (!d.adminEmail.trim())    e.adminEmail    = 'L\'email admin est requis';
  else if (!/\S+@\S+\.\S+/.test(d.adminEmail)) e.adminEmail = 'Email invalide';
  if (d.adminPassword.length < 8) e.adminPassword = 'Minimum 8 caractères';
  return e;
}

// ─── Section card wrapper ─────────────────────────────────────────────────────

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 space-y-5">
      <h2 className="font-display text-base font-semibold text-text">{title}</h2>
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CreateSchoolForm({ onSubmit, isLoading, error }: CreateSchoolFormProps) {
  const [form, setForm] = useState<CreateSchoolInput>({
    name: '', code: '', region: '', city: '', phone: '', email: '',
    plan: 'starter', trialDays: 30,
    adminName: '', adminEmail: '', adminPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPwd, setShowPwd] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof CreateSchoolInput>(key: K, value: CreateSchoolInput[K]) => {
    const next = { ...form, [key]: value };
    setForm(next);
    if (submitted) setErrors(validate(next));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSubmit(form);
  };

  const strength = getStrength(form.adminPassword);
  const errorCount = Object.keys(errors).length;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 font-body text-xs text-muted">
        {['Dashboard', 'Écoles', 'Nouvelle école'].map((seg, i, arr) => (
          <span key={seg} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-border">/</span>}
            <span className={i === arr.length - 1 ? 'text-text' : ''}>{seg}</span>
          </span>
        ))}
      </nav>

      <h1 className="font-display text-2xl font-bold text-text">Nouvelle école</h1>

      {/* Global error summary */}
      {submitted && errorCount > 0 && (
        <div className="bg-danger/10 border border-danger/20 rounded-xl px-4 py-3 font-body text-sm text-danger">
          {errorCount} champ{errorCount > 1 ? 's' : ''} requis manquant{errorCount > 1 ? 's' : ''}. Veuillez corriger les erreurs ci-dessous.
        </div>
      )}
      {error && (
        <div className="bg-danger/10 border border-danger/20 rounded-xl px-4 py-3 font-body text-sm text-danger">{error}</div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── Section École ── */}
          <SectionCard title="Informations de l'école">
            <Field label="Nom de l'école" required error={errors.name}>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Ex: Lycée Lamine Guèye"
                className={inputCls(errors.name)}
              />
            </Field>

            <Field label="Code unique" required error={errors.code}>
              <input
                type="text"
                value={form.code}
                onChange={(e) => set('code', e.target.value.toUpperCase())}
                placeholder="EX: LAMINE_GUEYE_CONAKRY"
                className={`${inputCls(errors.code)} font-mono`}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Région" required error={errors.region}>
                <select
                  value={form.region}
                  onChange={(e) => set('region', e.target.value)}
                  className={`${inputCls(errors.region)} appearance-none`}
                >
                  <option value="">Sélectionner…</option>
                  {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>

              <Field label="Ville" error={errors.city}>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => set('city', e.target.value)}
                  placeholder="Ex: Conakry"
                  className={inputCls(errors.city)}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Téléphone" error={errors.phone}>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  placeholder="+224 6XX XXX XXX"
                  className={inputCls(errors.phone)}
                />
              </Field>

              <Field label="Email école" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  placeholder="contact@ecole.gn"
                  className={inputCls(errors.email)}
                />
              </Field>
            </div>

            {/* Plan radio cards */}
            <Field label="Plan" required>
              <div className="grid grid-cols-3 gap-2">
                {PLANS.map((p) => (
                  <label
                    key={p.value}
                    className={`cursor-pointer rounded-xl border p-3 transition-all ${
                      form.plan === p.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-muted'
                    }`}
                  >
                    <input
                      type="radio"
                      name="plan"
                      value={p.value}
                      checked={form.plan === p.value}
                      onChange={() => set('plan', p.value)}
                      className="sr-only"
                    />
                    <p className={`font-display text-sm font-semibold ${form.plan === p.value ? 'text-primary' : 'text-text'}`}>
                      {p.label}
                    </p>
                    <p className="font-mono text-xs text-accent mt-0.5">{p.price}</p>
                    <p className="font-body text-xs text-muted mt-0.5">{p.desc}</p>
                  </label>
                ))}
              </div>
            </Field>

            <Field label="Durée du trial">
              <select
                value={form.trialDays}
                onChange={(e) => set('trialDays', Number(e.target.value) as CreateSchoolInput['trialDays'])}
                className={`${inputCls()} appearance-none`}
              >
                {TRIAL_DAYS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </Field>
          </SectionCard>

          {/* ── Section Admin ── */}
          <SectionCard title="Administrateur initial">
            <Field label="Nom complet" required error={errors.adminName}>
              <input
                type="text"
                value={form.adminName}
                onChange={(e) => set('adminName', e.target.value)}
                placeholder="Ex: Mamadou Diallo"
                className={inputCls(errors.adminName)}
              />
            </Field>

            <Field label="Email admin" required error={errors.adminEmail}>
              <input
                type="email"
                value={form.adminEmail}
                onChange={(e) => set('adminEmail', e.target.value)}
                placeholder="admin@ecole.gn"
                className={inputCls(errors.adminEmail)}
              />
            </Field>

            <Field label="Mot de passe temporaire" required error={errors.adminPassword}>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={form.adminPassword}
                  onChange={(e) => set('adminPassword', e.target.value)}
                  placeholder="Min. 8 caractères"
                  className={`${inputCls(errors.adminPassword)} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
                >
                  <IconEye off={showPwd} />
                </button>
              </div>

              {/* Strength indicator */}
              {form.adminPassword.length > 0 && (
                <div className="space-y-1 mt-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i <= strength.score ? strength.color : 'bg-border'
                        }`}
                      />
                    ))}
                  </div>
                  {strength.label && (
                    <p className="font-body text-xs text-muted">Force : <span className="text-text">{strength.label}</span></p>
                  )}
                </div>
              )}
            </Field>

            {/* Info box */}
            <div className="bg-accent/5 border border-accent/15 rounded-xl px-4 py-3 font-body text-xs text-muted leading-relaxed">
              L'administrateur recevra un email avec ses identifiants et devra changer son mot de passe à la première connexion.
            </div>
          </SectionCard>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl border border-border font-body text-sm text-muted hover:text-text hover:border-muted transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-display font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors"
          >
            {isLoading && <Spinner />}
            {isLoading ? 'Création…' : "Créer l'école"}
          </button>
        </div>
      </form>
    </div>
  );
}
