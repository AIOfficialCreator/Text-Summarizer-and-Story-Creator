import React, { useState, useCallback } from 'react';
import { generateGeminiContent } from '../services/geminiService';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import { useLanguage } from '../contexts/LanguageContext';

interface RecipeCreatorProps {
  title: string;
  buttonText: string;
  outputPlaceholder: string;
  loadingText: string;
}

const RecipeCreator: React.FC<RecipeCreatorProps> = ({ title, buttonText, outputPlaceholder, loadingText }) => {
  const [ingredients, setIngredients] = useState('');
  const [tools, setTools] = useState('');
  const [time, setTime] = useState('');
  const [skill, setSkill] = useState('Beginner');
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  const handleCreateRecipe = useCallback(async () => {
    if (!ingredients.trim()) return;

    setIsLoading(true);
    setError(null);
    setRecipe('');

    const promptPrefix = `You are an expert chef. Create a delicious recipe based on the following constraints. Provide a creative name for the recipe, a list of ingredients, clear step-by-step instructions, and the approximate total time. The recipe should be easy to follow for the specified skill level. Format the response neatly.`;
    const content = `
      Ingredients available: ${ingredients}
      Cooking appliances and tools: ${tools || 'Standard kitchen tools'}
      Maximum time: ${time || 'No time limit'}
      My cooking skill level is: ${skill}
    `;

    try {
      const result = await generateGeminiContent(promptPrefix, content, language);
      if (result.startsWith('An error occurred')) {
          setError(result);
      } else {
          setRecipe(result);
      }
    } catch (e) {
      setError('An unexpected error occurred. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  }, [ingredients, tools, time, skill, language]);

  const isButtonDisabled = isLoading || !ingredients.trim();

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 shadow-2xl">
      <h2 className="text-2xl font-bold mb-4 text-sky-400">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inputs Column */}
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-slate-300 mb-1">{t('ingredientsLabel')}*</label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder={t('ingredientsPlaceholder')}
              className="w-full h-28 p-2 bg-slate-900 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 resize-y text-slate-300"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="tools" className="block text-sm font-medium text-slate-300 mb-1">{t('toolsLabel')}</label>
            <input
              id="tools"
              type="text"
              value={tools}
              onChange={(e) => setTools(e.target.value)}
              placeholder={t('toolsPlaceholder')}
              className="w-full p-2 bg-slate-900 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-300"
              disabled={isLoading}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="time" className="block text-sm font-medium text-slate-300 mb-1">{t('timeLabel')}</label>
                <input
                  id="time"
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder={t('timePlaceholder')}
                  className="w-full p-2 bg-slate-900 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-300"
                  disabled={isLoading}
                />
            </div>
            <div>
                <label htmlFor="skill" className="block text-sm font-medium text-slate-300 mb-1">{t('skillLabel')}</label>
                <select 
                    id="skill"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    className="w-full p-2 bg-slate-900 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-300"
                    disabled={isLoading}
                >
                    <option>{t('skillBeginner')}</option>
                    <option>{t('skillIntermediate')}</option>
                    <option>{t('skillAdvanced')}</option>
                </select>
            </div>
          </div>
        </div>

        {/* Output Column */}
        <div className="w-full h-80 p-4 bg-slate-900 border border-slate-700 rounded-md overflow-y-auto prose prose-invert prose-p:text-slate-300 prose-headings:text-sky-400">
            {isLoading && <div className="flex justify-center items-center h-full"><Spinner text={loadingText} /></div>}
            {error && <ErrorMessage message={error} />}
            {recipe && <div className="whitespace-pre-wrap">{recipe}</div>}
            {!isLoading && !error && !recipe && <p className="text-slate-500">{outputPlaceholder}</p>}
        </div>
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={handleCreateRecipe}
          disabled={isButtonDisabled}
          className="px-8 py-3 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg disabled:transform-none"
        >
          {isLoading ? t('generatingButton') : buttonText}
        </button>
      </div>
    </div>
  );
};

export default RecipeCreator;