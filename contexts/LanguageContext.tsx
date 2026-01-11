import React, { createContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'es' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es'); // Default to Spanish
  const [translations, setTranslations] = useState<{ [key: string]: any } | null>(null);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const [enRes, esRes, frRes] = await Promise.all([
          fetch('/locales/en.json'),
          fetch('/locales/es.json'),
          fetch('/locales/fr.json'),
        ]);

        if (!enRes.ok || !esRes.ok || !frRes.ok) {
          throw new Error('Failed to fetch translation files');
        }

        const enData = await enRes.json();
        const esData = await esRes.json();
        const frData = await frRes.json();

        setTranslations({ en: enData, es: esData, fr: frData });
      } catch (error) {
        console.error("Failed to load translations:", error);
      }
    };

    fetchTranslations();
  }, []);

  const t = (key: string): string => {
    if (!translations) {
      return key; // Return key as fallback during load
    }
    return translations[language]?.[key] || key;
  };

  // Prevent rendering children until translations are loaded to avoid untranslated text
  if (!translations) {
    return null; // Or a loading spinner
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};