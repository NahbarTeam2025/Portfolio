import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
      <button
        onClick={() => setLanguage('de')}
        className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all duration-300 ${
          language === 'de' 
            ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.8)]' 
            : 'text-white/60 hover:text-white'
        }`}
      >
        DE
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all duration-300 ${
          language === 'en' 
            ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.8)]' 
            : 'text-white/60 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
};
