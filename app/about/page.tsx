'use client';
import LegalPageLayout from '@/components/layout/LegalPageLayout';
import { useApp } from '@/context/AppContext';

export default function AboutPage() {
  const { t } = useApp();
  return (
    <LegalPageLayout title={t.about.title}>
      <div className="space-y-6">
        {t.about.content.split('\n\n').map((para, i) => (
          <p key={i} className="text-base leading-relaxed" style={{ color: 'var(--cv-text2)' }}>{para}</p>
        ))}
        <div className="cv-card p-6 mt-8">
          <h3 className="font-display font-semibold text-lg mb-4" style={{ color: 'var(--cv-text)' }}>Our Mission</h3>
          <p style={{ color: 'var(--cv-text2)' }}>To democratize institutional-grade chart analysis for independent traders worldwide — delivering precision, structure, and clarity in every analysis.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {[['5', 'Asset Classes'],['4', 'Strategies'],['7', 'Timeframes']].map(([v, l]) => (
            <div key={l} className="cv-card p-4 text-center">
              <div className="font-display font-bold text-3xl gradient-text mb-1">{v}</div>
              <div className="text-sm" style={{ color: 'var(--cv-text3)' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </LegalPageLayout>
  );
}
