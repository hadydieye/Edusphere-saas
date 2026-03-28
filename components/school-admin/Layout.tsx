'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '@/lib/actions/school-auth';
import Logo from '@/components/Logo';
import OnboardingWizard from './OnboardingWizard';

const NAV = [
  { href: '/school-admin',          label: 'Dashboard', icon: '📊' },
  { href: '/school-admin/students', label: 'Élèves',    icon: '👨‍🎓' },
  { href: '/school-admin/classes',  label: 'Classes',   icon: '🏫' },
  { href: '/school-admin/teachers', label: 'Enseignants', icon: '👨‍🏫' },
  { href: '/school-admin/attendance',label: 'Présences', icon: '📅' },
  { href: '/school-admin/expenses',  label: 'Dépenses', icon: '💸' },
  { href: '/school-admin/payments', label: 'Paiements', icon: '💰' },
  { href: '/school-admin/grades',   label: 'Notes',     icon: '📝' },
  { href: '/school-admin/bulletins',label: 'Bulletins', icon: '📄' },
  { href: '/school-admin/settings', label: 'Paramètres', icon: '⚙️' },
];

interface Props {
  children: React.ReactNode;
  school?: { name: string; onboarding_done: boolean } | null;
  overdueCount?: number;
}

export default function SchoolAdminLayout({ children, school, overdueCount = 0 }: Props) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Close drawer on resize to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => { if (e.matches) setDrawerOpen(false); };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2 px-5 h-16 border-b border-border bg-surface">
        <Logo size={24} />
        <span className="font-display text-sm font-bold text-primary">Edusphère</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
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
              {item.label === 'Paiements' && overdueCount > 0 && (
                <span className="ml-auto w-5 h-5 flex items-center justify-center bg-danger text-white text-[10px] font-bold rounded-full">
                  {overdueCount}
                </span>
              )}
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
    </>
  );

  return (
    <div className="flex h-screen bg-bg overflow-hidden relative">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-border bg-surface">
        <SidebarContent />
      </aside>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-bg/60 backdrop-blur-sm md:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 md:hidden flex flex-col bg-surface border-r border-border
          transition-transform duration-200 shadow-xl
          ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarContent />
      </div>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <header className="h-16 border-b border-border flex items-center px-4 md:px-6 gap-4 bg-surface/80 backdrop-blur-sm sticky top-0 z-30">
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center hover:bg-bg rounded-xl text-xl"
            aria-label="Ouvrir le menu"
          >
            ☰
          </button>
          <span className="font-display text-sm font-semibold text-text truncate">
            {school?.name || 'Portail Administrateur'}
          </span>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>

      {school && !school.onboarding_done && (
        <OnboardingWizard schoolName={school.name} />
      )}
    </div>
  );
}
