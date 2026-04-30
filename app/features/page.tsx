'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeatureCard from '@/components/home/FeatureCard';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';

const icons = [
  <svg key="1" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M21 21H3"/></svg>,
  <svg key="2" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>,
  <svg key="3" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>,
  <svg key="4" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"/></svg>,
  <svg key="5" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3"/></svg>,
  <svg key="6" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>,
];

const extras = [
  { title: 'Dark & Light Mode', desc: 'Seamlessly switch between dark and light themes. Both are carefully designed for extended screen sessions.', icon: '🌓' },
  { title: 'Arabic & English', desc: 'Full bilingual support with proper RTL layout for Arabic and LTR for English — both feel native.', icon: '🌐' },
  { title: 'Mobile Responsive', desc: 'Fully responsive design that works perfectly on phones, tablets, and desktops.', icon: '📱' },
  { title: 'Privacy First', desc: 'Chart images are processed in-browser only. Nothing is uploaded or stored on external servers.', icon: '🔒' },
];

export default function FeaturesPage() {
  const { t } = useApp();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="font-display font-bold text-4xl sm:text-5xl mb-3" style={{ color: 'var(--cv-text)' }}>{t.featuresPage.title}</h1>
            <p className="text-lg" style={{ color: 'var(--cv-text2)' }}>{t.featuresPage.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {t.features.items.map((item, i) => (
              <FeatureCard key={i} icon={icons[i]} title={item.title} desc={item.desc} delay={i * 0.08} />
            ))}
          </div>

          <h2 className="font-display font-bold text-2xl mb-6" style={{ color: 'var(--cv-text)' }}>Platform Capabilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {extras.map((e) => (
              <div key={e.title} className="cv-card p-5">
                <div className="text-2xl mb-3">{e.icon}</div>
                <h3 className="font-display font-semibold text-sm mb-2" style={{ color: 'var(--cv-text)' }}>{e.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--cv-text2)' }}>{e.desc}</p>
              </div>
            ))}
          </div>

          <div className="cv-card-lg p-10 text-center mesh-bg">
            <h2 className="font-display font-bold text-2xl mb-3" style={{ color: 'var(--cv-text)' }}>Start Analyzing Your Charts</h2>
            <p className="mb-6" style={{ color: 'var(--cv-text2)' }}>All features are available instantly — no signup required.</p>
            <Link href="/dashboard" className="btn-primary" style={{ padding: '13px 32px' }}>Open Dashboard →</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
