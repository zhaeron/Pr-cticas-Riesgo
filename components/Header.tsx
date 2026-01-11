import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header: React.FC = () => {
  const { t } = useTranslations();

  return (
    <header className="relative text-center">
       <div className="absolute top-0 right-0">
        <LanguageSwitcher />
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">
        {t('headerTitle')}
      </h1>
      <p className="mt-2 text-lg text-gray-600">
        {t('headerSubtitle')}
      </p>
    </header>
  );
};