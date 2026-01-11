import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslations();

  const languages: { key: 'es' | 'en' | 'fr'; label: string }[] = [
    { key: 'es', label: 'ES' },
    { key: 'en', label: 'EN' },
    { key: 'fr', label: 'FR' },
  ];

  return (
    <div className="flex space-x-1 bg-gray-200/80 rounded-full p-1 border border-gray-300">
      {languages.map((lang) => (
        <button
          key={lang.key}
          onClick={() => setLanguage(lang.key)}
          className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${
            language === lang.key
              ? 'bg-white text-sky-600 shadow'
              : 'text-gray-600 hover:bg-white/50'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};
