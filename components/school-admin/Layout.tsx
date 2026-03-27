'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '@/lib/actions/school-auth';
import Logo from '@/components/Logo';

const NAV = [
  { href: '/school-admin',          label: 'Dashboard', icon: '📊' },
  { href: '/school-admin/students', label: 'Élèves',    icon: '👨‍🎓' },
  { href: '/school-admin/classes',  label: 'Classes',   icon: '🏫' },
  { href: '/school-admin/payments', label: 'Paiements', icon: '💰' },
];

export default function SchoolAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-border bg-surface">
        <div className="flex items-center gap-2 px-5 h-16 border-b border-border">
          <Logo size={24} />
          <span className="font-display text-sm font-bold text-primary">Edusphère</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== '/school-admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm transition-colors ${
                  active ? 'bg-primary/15 text-primary font-medium' : 'text-muted hover:text-text hover:bg-bg'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-border">
          <form action={signOut}>
            <button type="submit" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm text-muted hover:text-danger hover:bg-danger/10 transition-colors">
              <span>🚪</span> Déconnexion
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <header className="h-16 border-b border-border flex items-center px-6">
          <span className="font-display text-sm font-semibold text-text">Portail Administrateur</span>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
