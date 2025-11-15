import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { translations } from '../i18n/translations';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Fix: The 'children' prop is made optional to resolve a TypeScript error in index.tsx.
export const LanguageProvider = ({ children }: { children?: ReactNode }) => {
  const [language, setLanguage] = useState('en'); // Default language

  const t = useCallback((key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
