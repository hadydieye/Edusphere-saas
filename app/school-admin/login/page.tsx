'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signInSchoolAdmin } from '@/lib/actions/school-auth';
import Logo from '@/components/Logo';

export default function SchoolAdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const err = await signInSchoolAdmin(fd.get('email') as string, fd.get('password') as string);
    if (err) { setError(err); setIsLoading(false); }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-surface border border-border rounded-2xl p-8 space-y-6">
        <div className="text-center space-y-1">
          <div className="flex justify-center mb-1"><Logo size={36} /></div>
          <h1 className="font-display text-xl font-bold text-text">Portail École</h1>
          <p className="font-body text-sm text-muted">Connectez-vous à votre espace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm font-body text-text placeholder:text-muted outline-none focus:border-accent transition-colors"
          />
          <input
            name="password"
            type="password"
            placeholder="Mot de passe"
            required
            className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm font-body text-text placeholder:text-muted outline-none focus:border-accent transition-colors"
          />

          {error && (
            <p className="font-body text-xs text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-display font-semibold text-sm py-3 rounded-xl transition-colors"
          >
            {isLoading ? 'Connexion…' : 'Se connecter'}
          </button>
          <Link href="/school-admin/forgot-password" className="block text-center font-body text-xs text-muted hover:text-text transition-colors">
            Mot de passe oublié ?
          </Link>
        </form>
      </div>
    </div>
  );
}
