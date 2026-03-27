'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

interface NavItemProps {
  href: string;
  label: string;
  icon: ReactNode;
  collapsed: boolean;
}

export default function NavItem({ href, label, icon, collapsed }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + '/');

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={`
        flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-150
        ${collapsed ? 'justify-center px-0' : ''}
        ${isActive
          ? 'bg-primary text-white shadow-lg shadow-primary/30'
          : 'text-muted hover:bg-surface hover:text-text'
        }
      `}
    >
      <span className="shrink-0 w-5 h-5">{icon}</span>
      {!collapsed && <span className="font-body text-sm font-medium">{label}</span>}
    </Link>
  );
}
