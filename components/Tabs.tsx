import React from 'react';
import { SummarizerType } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface TabsProps {
  activeTab: SummarizerType;
  setActiveTab: (tab: SummarizerType) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();

  const tabs = [
    { type: SummarizerType.TEXT, label: t('summarizeTextTab'), icon: '📝' },
    { type: SummarizerType.VIDEO, label: t('summarizeVideoTab'), icon: '🎬' },
    { type: SummarizerType.STORY, label: t('writeStoryTab'), icon: '📖' },
    { type: SummarizerType.RECIPE, label: t('createRecipeTab'), icon: '🍳' },
  ];

  const getTabClass = (type: SummarizerType) => {
    const baseClass = "flex-1 text-center px-4 py-3 rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500";
    if (type === activeTab) {
      return `${baseClass} bg-sky-600 text-white shadow-lg`;
    }
    return `${baseClass} bg-slate-800 text-slate-300 hover:bg-slate-700`;
  };

  return (
    <div className="flex bg-slate-800/50 rounded-lg p-1 space-x-1 border border-slate-700">
      {tabs.map((tab) => (
        <button
          key={tab.type}
          onClick={() => setActiveTab(tab.type)}
          className={getTabClass(tab.type)}
          aria-label={tab.label}
        >
          <span className="mr-2">{tab.icon}</span>
          <span className="hidden sm:inline">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Tabs;