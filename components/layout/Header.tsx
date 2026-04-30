'use client';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { useState } from 'react';

export default function Header() {
  const { t } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/dashboard', label: t.nav.dashboard },
    { href: '/features', label: t.nav.features },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <header
      className="sticky top-0 z-50 glass"
      style={{ borderBottom: '1px solid var(--cv-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <span className="font-display font-bold text-lg" style={{ color: 'var(--cv-text)' }}>
            Chart<span className="gradient-text">Vertex</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5"
              style={{ color: 'var(--cv-text2)' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LanguageToggle />
          <Link href="/dashboard" className="btn-primary hidden sm:inline-flex ml-2" style={{ padding: '8px 18px', fontSize: '13px' }}>
            {t.nav.startAnalysis}
          </Link>
          {/* Mobile menu button */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg"
            style={{ color: 'var(--cv-text2)' }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M6 18L18 6M6 6l12 12"/></svg>
            ) : (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-1" style={{ borderTop: '1px solid var(--cv-border)' }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium"
              style={{ color: 'var(--cv-text2)' }}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/dashboard" className="btn-primary mt-2 text-center" onClick={() => setMobileOpen(false)}>
            {t.nav.startAnalysis}
          </Link>
        </div>
      )}
    </header>
  );
}
