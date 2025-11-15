import React, { useState } from 'react';
import { SummarizerType } from './types';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Summarizer from './components/Summarizer';
import RecipeCreator from './components/RecipeCreator';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SummarizerType>(SummarizerType.TEXT);
  const { t, language } = useLanguage();

  const toolConfigs = {
    [SummarizerType.TEXT]: {
      key: "text-summarizer",
      type: SummarizerType.TEXT,
      title: t('textSummarizerTitle'),
      placeholder: t('textSummarizerPlaceholder'),
      promptPrefix: "Summarize the following text concisely and accurately:",
      buttonText: t('summarizeTextButton'),
      outputPlaceholder: t('summaryOutputPlaceholder'),
      loadingText: t('analyzingContentLoading')
    },
    [SummarizerType.VIDEO]: {
      key: "video-summarizer",
      type: SummarizerType.VIDEO,
      title: t('videoSummarizerTitle'),
      placeholder: t('videoSummarizerPlaceholder'),
      promptPrefix: "Summarize the key points from the following video transcript:",
      buttonText: t('summarizeVideoButton'),
      outputPlaceholder: t('summaryOutputPlaceholder'),
      loadingText: t('analyzingTranscriptLoading')
    },
    [SummarizerType.STORY]: {
      key: "story-writer",
      type: SummarizerType.STORY,
      title: t('storyWriterTitle'),
      placeholder: t('storyWriterPlaceholder'),
      promptPrefix: "Write a creative and engaging story based on the following idea:",
      buttonText: t('writeStoryButton'),
      outputPlaceholder: t('storyOutputPlaceholder'),
      loadingText: t('writingStoryLoading')
    },
    [SummarizerType.RECIPE]: {
      key: "recipe-creator",
      type: SummarizerType.RECIPE,
      title: t('recipeCreatorTitle'),
      buttonText: t('createRecipeButton'),
      outputPlaceholder: t('recipeOutputPlaceholder'),
      loadingText: t('creatingRecipeLoading')
    }
  };

  const activeConfig = toolConfigs[activeTab];

  const renderActiveTool = () => {
    switch(activeTab) {
      case SummarizerType.RECIPE:
        return <RecipeCreator {...activeConfig} />;
      case SummarizerType.TEXT:
      case SummarizerType.VIDEO:
      case SummarizerType.STORY:
        return <Summarizer {...activeConfig} />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-8">
          {renderActiveTool()}
        </div>
      </main>
      <footer className="text-center py-4 mt-8">
        <p className="text-sm text-slate-500">{t('footerPoweredBy')}</p>
      </footer>
    </div>
  );
};

export default App;