import { GoogleGenAI } from "@google/genai";
import { languages } from "../i18n/translations";

// Assume API_KEY is set in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateGeminiContent = async (promptPrefix: string, content: string, language: string): Promise<string> => {
  try {
    const languageName = languages.find(lang => lang.code === language)?.name || 'English';
    const fullPrompt = `${promptPrefix}\n\nPlease provide the response in ${languageName}.\n\n---\n\n${content}`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred while trying to generate content: ${error.message}`;
    }
    return "An unknown error occurred while trying to generate content.";
  }
};