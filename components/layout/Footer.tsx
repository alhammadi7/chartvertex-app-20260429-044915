'use client';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const { t } = useApp();

  return (
    <footer style={{ background: 'var(--cv-surface)', borderTop: '1px solid var(--cv-border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <span className="font-display font-bold text-lg" style={{ color: 'var(--cv-text)' }}>
                Chart<span className="gradient-text">Vertex</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--cv-text2)' }}>{t.footer.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: 'var(--cv-text)' }}>{t.footer.links}</h4>
            <ul className="space-y-2">
              {[['/', t.nav.home], ['/dashboard', t.nav.dashboard], ['/features', t.nav.features], ['/about', t.nav.about]].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors hover:text-blue-400" style={{ color: 'var(--cv-text2)' }}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: 'var(--cv-text)' }}>{t.footer.legal}</h4>
            <ul className="space-y-2">
              {[['/terms', t.terms.title], ['/disclaimer', t.disclaimer2.title], ['/privacy', t.privacy.title]].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors hover:text-blue-400" style={{ color: 'var(--cv-text2)' }}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: 'var(--cv-text)' }}>{t.footer.support}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm transition-colors hover:text-blue-400" style={{ color: 'var(--cv-text2)' }}>{t.nav.contact}</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="cv-divider" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'var(--cv-text3)' }}>{t.footer.copyright}</p>
          <p className="text-xs" style={{ color: 'var(--cv-text3)' }}>
            {t.disclaimer.text.slice(0, 80)}...
          </p>
        </div>
      </div>
    </footer>
  );
}
