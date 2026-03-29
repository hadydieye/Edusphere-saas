'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Logo from '@/components/Logo';

export default function SetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Password strength
  const getStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    
    if (pass.length === 0) return { label: '', color: 'bg-transparent' };
    if (score < 2) return { label: 'Faible', color: 'bg-danger' };
    if (score === 2 || score === 3) return { label: 'Moyen', color: 'bg-warning' };
    return { label: 'Fort', color: 'bg-success' };
  };

  const strength = getStrength(password);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setIsLoading(true);
    setError(null);

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setIsLoading(false);
    } else {
      router.push('/school-admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-surface border border-border rounded-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2"><Logo size={42} /></div>
          <h1 className="font-display text-2xl font-bold text-text">Bienvenue sur Edusphère 🇬🇳</h1>
          <p className="font-body text-sm text-muted">Créez votre mot de passe pour activer votre compte</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm font-body text-text placeholder:text-muted outline-none focus:border-accent transition-colors"
            />
            {password && (
              <div className="flex items-center space-x-2 px-1">
                <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${strength.color} transition-all duration-300`} 
                    style={{ width: strength.label === 'Faible' ? '33%' : strength.label === 'Moyen' ? '66%' : '100%' }}
                  />
                </div>
                <span className="text-xs font-body text-muted w-10 text-right">{strength.label}</span>
              </div>
            )}
          </div>

          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm font-body text-text placeholder:text-muted outline-none focus:border-accent transition-colors"
          />

          {error && (
            <p className="font-body text-xs text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading || password.length < 8}
            style={{ backgroundColor: '#CE1126' }}
            className="w-full hover:opacity-90 disabled:opacity-60 text-white font-display font-semibold text-sm py-3 rounded-xl transition-opacity mt-4"
          >
            {isLoading ? 'Activation en cours...' : 'Activer mon compte'}
          </button>
        </form>
      </div>
    </div>
  );
}
