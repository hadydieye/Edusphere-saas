'use client';

import { useState, useId } from 'react';
import Logo from '@/components/Logo';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

function FloatingInput({
  id,
  label,
  type,
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  children?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete={type === 'password' ? 'current-password' : 'email'}
        className={`
          peer w-full bg-bg border rounded-xl px-4 pt-6 pb-2 text-sm font-body text-text outline-none transition-colors
          ${focused ? 'border-accent' : 'border-border'}
          ${children ? 'pr-11' : ''}
        `}
      />
      <label
        htmlFor={id}
        className={`
          absolute left-4 font-body text-muted pointer-events-none transition-all duration-150
          ${lifted ? 'top-2 text-xs text-accent' : 'top-1/2 -translate-y-1/2 text-sm'}
        `}
      >
        {label}
      </label>
      {children && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">{children}</div>
      )}
    </div>
  );
}

const IconEye = ({ off }: { off: boolean }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    {off ? (
      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
    ) : (
      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    )}
    {!off && <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />}
  </svg>
);

const Spinner = () => (
  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

export default function LoginForm({ onSubmit, isLoading, error }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const emailId = useId();
  const pwdId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <div className="relative min-h-screen bg-bg flex items-center justify-center overflow-hidden">
      {/* Grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.03,
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex items-center gap-12">
        {/* Left — illustration (desktop only) */}
        <div className="hidden lg:flex flex-col flex-1 gap-8">
          {/* Abstract geometric illustration */}
          <svg viewBox="0 0 400 400" className="w-full max-w-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background circles */}
            <circle cx="200" cy="200" r="180" stroke="#7C5CFC" strokeOpacity="0.08" strokeWidth="1" />
            <circle cx="200" cy="200" r="130" stroke="#00D4FF" strokeOpacity="0.08" strokeWidth="1" />
            {/* Hexagon */}
            <polygon points="200,60 310,130 310,270 200,340 90,270 90,130" stroke="#7C5CFC" strokeOpacity="0.4" strokeWidth="1.5" fill="#7C5CFC" fillOpacity="0.04" />
            {/* Inner diamond */}
            <polygon points="200,110 260,200 200,290 140,200" stroke="#00D4FF" strokeOpacity="0.5" strokeWidth="1.5" fill="#00D4FF" fillOpacity="0.04" />
            {/* Accent dots */}
            <circle cx="200" cy="60" r="4" fill="#7C5CFC" />
            <circle cx="310" cy="130" r="4" fill="#7C5CFC" />
            <circle cx="310" cy="270" r="4" fill="#7C5CFC" />
            <circle cx="200" cy="340" r="4" fill="#7C5CFC" />
            <circle cx="90" cy="270" r="4" fill="#7C5CFC" />
            <circle cx="90" cy="130" r="4" fill="#7C5CFC" />
            <circle cx="200" cy="200" r="6" fill="#00D4FF" fillOpacity="0.8" />
            {/* Connecting lines */}
            <line x1="200" y1="60" x2="200" y2="110" stroke="#7C5CFC" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="310" y1="130" x2="260" y2="200" stroke="#7C5CFC" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="90" y1="270" x2="140" y2="200" stroke="#7C5CFC" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4 4" />
            {/* Glow center */}
            <circle cx="200" cy="200" r="30" fill="#7C5CFC" fillOpacity="0.06" />
            <circle cx="200" cy="200" r="15" fill="#00D4FF" fillOpacity="0.08" />
          </svg>

          <div className="space-y-3">
            <h2 className="font-display text-3xl font-bold text-text leading-tight">
              Gérez vos écoles<br />
              <span className="text-primary">en toute sécurité</span>
            </h2>
            <p className="font-body text-muted text-sm leading-relaxed max-w-xs">
              Plateforme centralisée pour superviser l'ensemble de votre réseau d'établissements.
            </p>
          </div>
        </div>

        {/* Right — form card */}
        <div
          className="w-full max-w-sm mx-auto flex-shrink-0"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2.5rem' }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <div className="flex items-center gap-2">
              <Logo size={36} />
              <span className="font-display text-xl font-bold text-primary">Edusphère</span>
            </div>
            <h1 className="font-display text-lg font-semibold text-text">Accès Administrateur</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <FloatingInput id={emailId} label="Adresse email" type="email" value={email} onChange={setEmail} />

            <FloatingInput id={pwdId} label="Mot de passe" type={showPwd ? 'text' : 'password'} value={password} onChange={setPassword}>
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="text-muted hover:text-text transition-colors"
                aria-label={showPwd ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                <IconEye off={showPwd} />
              </button>
            </FloatingInput>

            {error && (
              <p className="font-body text-xs text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-display font-semibold text-sm py-3 rounded-xl transition-colors mt-2"
            >
              {isLoading && <Spinner />}
              {isLoading ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
