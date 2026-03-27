import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="text-center space-y-4 max-w-sm">
        <p className="font-mono text-5xl text-primary">404</p>
        <h1 className="font-display text-xl font-bold text-text">Page introuvable</h1>
        <p className="font-body text-sm text-muted">Cette page n'existe pas ou a été déplacée.</p>
        <Link href="/" className="inline-block bg-primary hover:bg-primary/90 text-white font-body text-sm px-5 py-2.5 rounded-xl transition-colors">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
