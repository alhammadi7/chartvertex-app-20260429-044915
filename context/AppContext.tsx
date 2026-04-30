'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Language, Theme } from '@/types';

interface AppContextType {
  language: Language;
  setLanguage: (l: Language) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  t: typeof import('@/lib/translations').translations.en;
  dir: 'ltr' | 'rtl';
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [theme, setThemeState] = useState<Theme>('dark');
  const [translations, setTranslations] = useState<typeof import('@/lib/translations').translations.en | null>(null);

  useEffect(() => {
    import('@/lib/translations').then((mod) => {
      setTranslations(mod.translations[language]);
    });
  }, [language]);

  useEffect(() => {
    import('@/lib/translations').then((mod) => {
      setTranslations(mod.translations[language]);
    });
  }, []);

  const setLanguage = (l: Language) => {
    setLanguageState(l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
    if (t === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  if (!translations) return null;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        t: translations,
        dir: language === 'ar' ? 'rtl' : 'ltr',
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
