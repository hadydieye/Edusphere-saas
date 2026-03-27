'use client';

import { useState } from 'react';
import { updatePassword } from '@/lib/actions/school-auth';

const inputCls = 'w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm font-body text-text placeholder:text-muted outline-none focus:border-accent transition-colors';

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const pwd = fd.get('password') as string;
    const confirm = fd.get('confirm') as string;
    if (pwd !== confirm) { setError('Les mots de passe ne correspondent pas.'); return; }
    setIsLoading(true);
    setError(null);
    const err = await updatePassword(pwd);
    if (err) { setError(err); setIsLoading(false); }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-surface border border-border rounded-2xl p-8 space-y-6">
        <div className="space-y-1">
          <h1 className="font-display text-xl font-bold text-text">Nouveau mot de passe</h1>
          <p className="font-body text-sm text-muted">Choisissez un mot de passe sécurisé.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="password" type="password" required minLength={8} placeholder="Nouveau mot de passe" className={inputCls} />
          <input name="confirm" type="password" required minLength={8} placeholder="Confirmer le mot de passe" className={inputCls} />
          {error && <p className="font-body text-xs text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">{error}</p>}
          <button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-display font-semibold text-sm py-3 rounded-xl transition-colors">
            {isLoading ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </form>
      </div>
    </div>
  );
}
