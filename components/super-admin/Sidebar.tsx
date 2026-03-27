'use client';

import NavItem from './NavItem';
import Logo from '@/components/Logo';

const IconGrid = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const IconBuilding = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm0 4h2v2H7V9zm0 4h2v2H7v-2zm4-8h2v2h-2V5zm0 4h2v2h-2V9zm0 4h2v2h-2v-2z" clipRule="evenodd" />
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
  </svg>
);

const IconLogout = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h7a1 1 0 000-2H4V5h6a1 1 0 000-2H3zm11.707 4.293a1 1 0 010 1.414L13.414 10l1.293 1.293a1 1 0 01-1.414 1.414l-2-2a1 1 0 010-1.414l2-2a1 1 0 011.414 0z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M13 10a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1z" clipRule="evenodd" />
  </svg>
);

const NAV_ITEMS = [
  { href: '/super-admin',         label: 'Dashboard', icon: <IconGrid /> },
  { href: '/super-admin/schools', label: 'Écoles',     icon: <IconBuilding /> },
  { href: '/super-admin/audit',   label: 'Audit Log',  icon: <IconShield /> },
];

interface SidebarProps {
  collapsed: boolean;
  onClose?: () => void;
}

export default function Sidebar({ collapsed, onClose }: SidebarProps) {
  return (
    <aside
      className={`
        flex flex-col h-full bg-bg border-r border-border transition-all duration-200
        ${collapsed ? 'w-16' : 'w-60'}
      `}
    >
      {/* Logo */}
      <div className={`flex items-center gap-2.5 px-4 py-5 ${collapsed ? 'justify-center px-0' : ''}`}>
        <Logo size={28} />
        {!collapsed && (
          <span className="font-display text-lg font-bold text-primary tracking-tight">
            Edusphère
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className={`flex-1 flex flex-col gap-1 px-3 ${collapsed ? 'px-2' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className={`border-t border-border p-3 ${collapsed ? 'flex justify-center' : ''}`}>
        {collapsed ? (
          <button
            onClick={onClose}
            title="Déconnexion"
            className="p-2 rounded-lg text-muted hover:text-danger hover:bg-surface transition-colors"
          >
            <IconLogout />
          </button>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
              <span className="font-mono text-xs font-semibold text-primary">SA</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-xs font-medium text-text truncate">Super Admin</p>
              <p className="font-mono text-xs text-muted truncate">admin@edusphere.io</p>
            </div>
            <button
              title="Déconnexion"
              className="p-1.5 rounded-lg text-muted hover:text-danger hover:bg-surface transition-colors shrink-0"
            >
              <IconLogout />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
