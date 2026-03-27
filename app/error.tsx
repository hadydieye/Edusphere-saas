'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="text-center space-y-4 max-w-sm">
        <p className="font-mono text-5xl text-danger">500</p>
        <h1 className="font-display text-xl font-bold text-text">Une erreur est survenue</h1>
        <p className="font-body text-sm text-muted">Quelque chose s'est mal passé. Veuillez réessayer.</p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={reset} className="bg-primary hover:bg-primary/90 text-white font-body text-sm px-5 py-2.5 rounded-xl transition-colors">
            Réessayer
          </button>
          <Link href="/" className="font-body text-sm text-muted hover:text-text border border-border px-5 py-2.5 rounded-xl transition-colors">
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
