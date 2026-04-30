'use client';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeatureCard from '@/components/home/FeatureCard';
import { useApp } from '@/context/AppContext';

const assetClasses = [
  { name: 'Forex', icon: '💱', desc: 'Currency pairs — Major, Minor & Exotic' },
  { name: 'Stocks', icon: '📈', desc: 'Equities from global markets' },
  { name: 'Crypto', icon: '₿', desc: 'Digital assets & altcoins' },
  { name: 'Commodities', icon: '🥇', desc: 'Gold, Oil, Silver & more' },
  { name: 'Indices', icon: '📊', desc: 'SPX, NASDAQ, DXY & global indices' },
];

const mockPreview = {
  symbol: 'EURUSD', bias: 'Bullish', grade: 'A+', verdict: 'Enter',
  confidence: 89, entry: '1.08450 – 1.08520', sl: '1.08190', tp1: '1.08870', tp2: '1.09250', rr: '1 : 2.8',
};

const icons = [
  <svg key="1" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M21 21H3"/></svg>,
  <svg key="2" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>,
  <svg key="3" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>,
  <svg key="4" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"/></svg>,
  <svg key="5" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3"/></svg>,
  <svg key="6" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>,
];

export default function HomePage() {
  const { t } = useApp();
  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden mesh-bg">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%,rgba(59,130,246,0.08) 0%,transparent 70%)' }} />
          <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'linear-gradient(var(--cv-border2) 1px,transparent 1px),linear-gradient(90deg,var(--cv-border2) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20 text-center">
            <div className="inline-flex mb-6 animate-fade-up">
              <span className="badge" style={{ background: 'var(--cv-accent-glow)', color: 'var(--cv-accent2)', border: '1px solid rgba(59,130,246,0.2)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                {t.hero.badge}
              </span>
            </div>
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl mb-6 leading-tight animate-fade-up-1">
              <span style={{ color: 'var(--cv-text)' }}>{t.hero.headline1}</span><br />
              <span className="gradient-text">{t.hero.headline2}</span>
            </h1>
            <p className="font-display text-lg sm:text-xl font-medium mb-4 animate-fade-up-2" style={{ color: 'var(--cv-text2)' }}>{t.hero.slogan}</p>
            <p className="max-w-2xl mx-auto text-base leading-relaxed mb-10 animate-fade-up-3" style={{ color: 'var(--cv-text3)' }}>{t.hero.description}</p>
            <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-up-3">
              <Link href="/dashboard" className="btn-primary" style={{ padding: '13px 32px', fontSize: '15px' }}>{t.hero.startBtn} →</Link>
              <Link href="/features" className="btn-secondary" style={{ padding: '13px 32px', fontSize: '15px' }}>{t.hero.learnBtn}</Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 mt-16">
              {[['5','Asset Classes'],['4','Strategies'],['7','Timeframes'],['A+','Max Grade']].map(([v,l]) => (
                <div key={l} className="text-center">
                  <div className="font-display font-bold text-3xl gradient-text">{v}</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--cv-text3)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer banner */}
        <div style={{ background: 'rgba(245,158,11,0.06)', borderTop: '1px solid rgba(245,158,11,0.12)', borderBottom: '1px solid rgba(245,158,11,0.12)' }}>
          <p className="max-w-7xl mx-auto px-4 py-3 text-xs text-center" style={{ color: 'rgba(245,158,11,0.8)' }}>⚠️ {t.disclaimer.text}</p>
        </div>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3" style={{ color: 'var(--cv-text)' }}>{t.features.title}</h2>
            <p style={{ color: 'var(--cv-text2)' }}>{t.features.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.features.items.map((item, i) => (
              <FeatureCard key={i} icon={icons[i]} title={item.title} desc={item.desc} delay={i * 0.08} />
            ))}
          </div>
        </section>

        {/* How it works */}
        <section style={{ background: 'var(--cv-surface)', borderTop: '1px solid var(--cv-border)', borderBottom: '1px solid var(--cv-border)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3" style={{ color: 'var(--cv-text)' }}>{t.howItWorks.title}</h2>
              <p style={{ color: 'var(--cv-text2)' }}>{t.howItWorks.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.howItWorks.steps.map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 font-display font-bold text-xl gradient-text" style={{ background: 'var(--cv-surface2)', border: '1px solid var(--cv-border2)' }}>{step.num}</div>
                  <h3 className="font-display font-semibold text-lg mb-2" style={{ color: 'var(--cv-text)' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--cv-text2)' }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Asset classes */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3" style={{ color: 'var(--cv-text)' }}>{t.assets.title}</h2>
            <p style={{ color: 'var(--cv-text2)' }}>{t.assets.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {assetClasses.map((a) => (
              <div key={a.name} className="cv-card p-4 text-center hover:border-blue-500/20 transition-colors">
                <div className="text-3xl mb-2">{a.icon}</div>
                <h3 className="font-display font-semibold text-sm mb-1" style={{ color: 'var(--cv-text)' }}>{a.name}</h3>
                <p className="text-xs" style={{ color: 'var(--cv-text3)' }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI Preview */}
        <section style={{ background: 'var(--cv-surface)', borderTop: '1px solid var(--cv-border)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="badge mb-4 inline-flex" style={{ background: 'var(--cv-accent-glow)', color: 'var(--cv-accent2)', border: '1px solid rgba(59,130,246,0.2)' }}>Live Preview</span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4" style={{ color: 'var(--cv-text)' }}>Structured Analysis,<br /><span className="gradient-text">Instantly</span></h2>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--cv-text2)' }}>Upload your chart, configure your parameters, and receive a complete professional trade plan — including entry zones, stop loss, three take-profit targets, and a risk-to-reward ratio.</p>
                <Link href="/dashboard" className="btn-primary inline-block">Try It Now →</Link>
              </div>
              <div className="cv-card-lg p-5 glow-blue">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="font-display font-bold text-lg" style={{ color: 'var(--cv-text)' }}>{mockPreview.symbol}</span>
                    <span className="text-xs ml-2 font-mono" style={{ color: 'var(--cv-text3)' }}>4H · Forex</span>
                  </div>
                  <span className="badge" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>● {mockPreview.bias}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[{label:'Grade',value:mockPreview.grade,color:'var(--cv-gold)'},{label:'Verdict',value:mockPreview.verdict,color:'var(--cv-green)'},{label:'Confidence',value:`${mockPreview.confidence}%`,color:'var(--cv-accent2)'}].map(({label,value,color}) => (
                    <div key={label} className="rounded-lg p-2 text-center" style={{ background: 'var(--cv-surface2)' }}>
                      <div className="text-xs mb-0.5" style={{ color: 'var(--cv-text3)' }}>{label}</div>
                      <div className="font-display font-bold text-sm" style={{ color }}>{value}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[{label:'Entry Zone',value:mockPreview.entry},{label:'Stop Loss',value:mockPreview.sl},{label:'TP1',value:mockPreview.tp1},{label:'TP2',value:mockPreview.tp2}].map(({label,value}) => (
                    <div key={label} className="rounded-lg p-2" style={{ background: 'var(--cv-surface2)' }}>
                      <div className="text-xs mb-0.5" style={{ color: 'var(--cv-text3)' }}>{label}</div>
                      <div className="font-mono text-xs font-semibold" style={{ color: 'var(--cv-text)' }}>{value}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-center" style={{ color: 'var(--cv-text3)' }}>Powered by <span style={{ color: 'var(--cv-accent2)' }}>ChartVertex AI</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="cv-card-lg p-10 mesh-bg">
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4" style={{ color: 'var(--cv-text)' }}>Ready to Analyze Your Charts?</h2>
            <p className="mb-8" style={{ color: 'var(--cv-text2)' }}>Upload your first chart and receive a professional trade plan in seconds.</p>
            <Link href="/dashboard" className="btn-primary" style={{ padding: '14px 36px', fontSize: '15px' }}>{t.hero.startBtn} →</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
