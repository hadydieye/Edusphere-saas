'use client';

import { useState } from 'react';
import Link from 'next/link';
import { requestPasswordReset } from '@/lib/actions/school-auth';

const inputCls = 'w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm font-body text-text placeholder:text-muted outline-none focus:border-accent transition-colors';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const err = await requestPasswordReset(fd.get('email') as string);
    if (err) { setError(err); setIsLoading(false); }
    else setSent(true);
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-surface border border-border rounded-2xl p-8 space-y-6">
        <div className="space-y-1">
          <h1 className="font-display text-xl font-bold text-text">Mot de passe oublié</h1>
          <p className="font-body text-sm text-muted">Entrez votre email pour recevoir un lien de réinitialisation.</p>
        </div>

        {sent ? (
          <div className="space-y-4">
            <p className="font-body text-sm text-success bg-success/10 border border-success/20 rounded-xl px-4 py-3">
              Email envoyé ! Vérifiez votre boîte de réception.
            </p>
            <Link href="/school-admin/login" className="block text-center font-body text-sm text-muted hover:text-text transition-colors">
              ← Retour à la connexion
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="email" type="email" required placeholder="votre@email.com" className={inputCls} />
            {error && <p className="font-body text-xs text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-display font-semibold text-sm py-3 rounded-xl transition-colors">
              {isLoading ? 'Envoi…' : 'Envoyer le lien'}
            </button>
            <Link href="/school-admin/login" className="block text-center font-body text-sm text-muted hover:text-text transition-colors">
              ← Retour à la connexion
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
