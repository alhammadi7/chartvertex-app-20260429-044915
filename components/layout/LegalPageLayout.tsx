'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
  lastUpdated?: string;
}

export default function LegalPageLayout({ title, children, lastUpdated = 'January 2026' }: LegalPageLayoutProps) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-16">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl sm:text-4xl mb-3" style={{ color: 'var(--cv-text)' }}>
            {title}
          </h1>
          <p className="text-sm" style={{ color: 'var(--cv-text3)' }}>Last updated: {lastUpdated}</p>
        </div>
        <div
          className="prose-like"
          style={{
            color: 'var(--cv-text2)',
            lineHeight: 1.8,
          }}
        >
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
