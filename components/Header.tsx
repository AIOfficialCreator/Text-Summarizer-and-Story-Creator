import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Header: React.FC = () => {
  const { t } = useLanguage();
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 max-w-4xl flex justify-between items-center">
        <div>
          <h1
            className="text-3xl font-bold text-white"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            {t('appTitle')}
          </h1>
          <p className="text-slate-400 mt-1">{t('appDescription')}</p>
        </div>
        <LanguageSelector />
      </div>
    </header>
  );
};

export default Header;