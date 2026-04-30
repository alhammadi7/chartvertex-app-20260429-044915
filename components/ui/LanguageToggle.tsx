'use client';
import { useApp } from '@/context/AppContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useApp();
  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className="h-9 px-3 flex items-center gap-1.5 rounded-lg text-sm font-semibold transition-colors hover:bg-white/5"
      style={{ color: 'var(--cv-text2)' }}
    >
      <span style={{ color: 'var(--cv-accent)', fontSize: '16px' }}>
        {language === 'en' ? '🌐' : '🌐'}
      </span>
      {language === 'en' ? 'AR' : 'EN'}
    </button>
  );
}
