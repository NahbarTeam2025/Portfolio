import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-black/5 border border-black/10 rounded-xl p-1">
      <button
        onClick={() => setLanguage('de')}
        className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all duration-300 ${
          language === 'de' 
            ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.8)]' 
            : 'text-black/60 hover:text-black'
        }`}
      >
        DE
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all duration-300 ${
          language === 'en' 
            ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.8)]' 
            : 'text-black/60 hover:text-black'
        }`}
      >
        EN
      </button>
    </div>
  );
};
