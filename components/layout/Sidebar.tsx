'use client';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/ui/LanguageToggle';

const navItems = [
  {
    href: '/dashboard',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
      </svg>
    ),
    labelKey: 'dashboard' as const,
  },
];

const quickLinks = [
  { href: '/', labelKey: 'home' as const },
  { href: '/features', labelKey: 'features' as const },
  { href: '/about', labelKey: 'about' as const },
  { href: '/contact', labelKey: 'contact' as const },
];

export default function Sidebar() {
  const { t } = useApp();

  return (
    <aside
      className="hidden lg:flex flex-col w-60 shrink-0"
      style={{
        background: 'var(--cv-surface)',
        borderRight: '1px solid var(--cv-border)',
        minHeight: '100vh',
        position: 'sticky',
        top: 0,
      }}
    >
      {/* Logo */}
      <div className="p-5" style={{ borderBottom: '1px solid var(--cv-border)' }}>
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <span className="font-display font-bold" style={{ color: 'var(--cv-text)' }}>
            Chart<span className="gradient-text">Vertex</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="cv-label px-2 mb-3">Analysis</p>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
            style={{ background: 'var(--cv-accent-glow)', color: 'var(--cv-accent2)', border: '1px solid rgba(59,130,246,0.15)' }}
          >
            {item.icon}
            {t.nav[item.labelKey]}
          </Link>
        ))}

        <div className="cv-divider" />
        <p className="cv-label px-2 mb-3">Navigation</p>
        {quickLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5"
            style={{ color: 'var(--cv-text2)' }}
          >
            {t.nav[l.labelKey]}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-4 flex items-center gap-2" style={{ borderTop: '1px solid var(--cv-border)' }}>
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </aside>
  );
}
