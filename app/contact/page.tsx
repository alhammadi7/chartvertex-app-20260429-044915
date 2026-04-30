'use client';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useApp } from '@/context/AppContext';

export default function ContactPage() {
  const { t } = useApp();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-16">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl sm:text-4xl mb-2" style={{ color: 'var(--cv-text)' }}>{t.contact.title}</h1>
          <p style={{ color: 'var(--cv-text2)' }}>{t.contact.subtitle}</p>
        </div>

        {sent ? (
          <div className="cv-card p-8 text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
            </div>
            <p className="font-display font-semibold text-lg mb-2" style={{ color: 'var(--cv-text)' }}>{t.contact.sent}</p>
            <button onClick={() => setSent(false)} className="btn-secondary mt-4">Send Another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="cv-card p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="cv-label">{t.contact.nameLabel}</label>
                <input className="cv-input" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div>
                <label className="cv-label">{t.contact.emailLabel}</label>
                <input className="cv-input" type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="cv-label">{t.contact.subjectLabel}</label>
              <input className="cv-input" required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
            </div>
            <div>
              <label className="cv-label">{t.contact.messageLabel}</label>
              <textarea className="cv-input" required rows={6} value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={{ resize: 'vertical' }} />
            </div>
            <button type="submit" className="btn-primary w-full" style={{ padding: '13px' }}>{t.contact.sendBtn}</button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}
