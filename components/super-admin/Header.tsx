'use client';

import { usePathname } from 'next/navigation';
import { signOut } from '@/lib/actions/auth';

const ROUTE_LABELS: Record<string, string> = {
  '/super-admin':         'Dashboard',
  '/super-admin/schools': 'Écoles',
  '/super-admin/audit':   'Audit Log',
};

const IconMenu = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
  </svg>
);

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();

  const matchedRoute = Object.keys(ROUTE_LABELS)
    .filter((r) => pathname === r || pathname.startsWith(r + '/'))
    .sort((a, b) => b.length - a.length)[0];

  const pageTitle = matchedRoute ? ROUTE_LABELS[matchedRoute] : 'Admin';

  const segments = matchedRoute
    ? [{ label: 'Edusphère', href: '/super-admin' }, { label: pageTitle, href: matchedRoute }]
    : [{ label: 'Edusphère', href: '/super-admin' }];

  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 px-6 h-14 bg-surface/80 backdrop-blur-md border-b border-border">
      <button
        onClick={onMenuClick}
        className="md:hidden p-1.5 rounded-lg text-muted hover:text-text hover:bg-border transition-colors"
        aria-label="Ouvrir le menu"
      >
        <IconMenu />
      </button>

      <div className="flex flex-col justify-center flex-1">
        <h1 className="font-display text-base font-semibold text-text leading-tight">{pageTitle}</h1>
        <nav aria-label="breadcrumb">
          <ol className="flex items-center gap-1">
            {segments.map((seg, i) => (
              <li key={seg.href} className="flex items-center gap-1">
                {i > 0 && <span className="text-border text-xs">/</span>}
                <span className={`font-body text-xs ${i === segments.length - 1 ? 'text-muted' : 'text-muted/60'}`}>
                  {seg.label}
                </span>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <form action={signOut}>
        <button type="submit" className="font-body text-xs text-muted hover:text-danger transition-colors px-3 py-1.5 rounded-lg hover:bg-danger/10">
          Déconnexion
        </button>
      </form>
    </header>
  );
}
