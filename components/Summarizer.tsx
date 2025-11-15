import React, { useState, useCallback } from 'react';
import { SummarizerType } from '../types';
import { generateGeminiContent } from '../services/geminiService';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import { useLanguage } from '../contexts/LanguageContext';

interface SummarizerProps {
  type: SummarizerType;
  title: string;
  placeholder: string;
  promptPrefix: string;
  buttonText: string;
  outputPlaceholder: string;
  loadingText: string;
}

const Summarizer: React.FC<SummarizerProps> = ({ type, title, placeholder, promptPrefix, buttonText, outputPlaceholder, loadingText }) => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  const handleSummarize = useCallback(async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError(null);
    setSummary('');

    try {
      const result = await generateGeminiContent(promptPrefix, inputText, language);
      if (result.startsWith('An error occurred')) {
          setError(result);
      } else {
          setSummary(result);
      }
    } catch (e) {
      setError('An unexpected error occurred. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText, promptPrefix, language]);

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 shadow-2xl">
      <h2 className="text-2xl font-bold mb-4 text-sky-400">{title}</h2>
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        <div className="flex-1">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={placeholder}
            className="w-full h-80 p-4 bg-slate-900 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow resize-y text-slate-300"
            disabled={isLoading}
          />
        </div>
        <div className="flex-1">
          <div className="w-full h-80 p-4 bg-slate-900 border border-slate-700 rounded-md overflow-y-auto prose prose-invert prose-p:text-slate-300">
            {isLoading && <div className="flex justify-center items-center h-full"><Spinner text={loadingText} /></div>}
            {error && <ErrorMessage message={error} />}
            {summary && <p className="whitespace-pre-wrap">{summary}</p>}
            {!isLoading && !error && !summary && <p className="text-slate-500">{outputPlaceholder}</p>}
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={handleSummarize}
          disabled={isLoading || !inputText.trim()}
          className="px-8 py-3 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg disabled:transform-none"
        >
          {isLoading ? t('generatingButton') : buttonText}
        </button>
      </div>
    </div>
  );
};

export default Summarizer;