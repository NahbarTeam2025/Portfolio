import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../contexts/LanguageContext';

export const DatenschutzPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-start gap-8 w-full max-w-3xl mx-auto py-12 px-6 animate-in fade-in duration-500">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-black/60 hover:text-blue-400 transition-colors mb-4"
      >
        <ArrowLeft size={20} />
        {t.common.back}
      </button>
      <h1 className="heading-gradient fluid-h2 font-medium text-black/90 dark:text-white/90 html:not(.dark):text-white">{t.privacy.title}</h1>
      <div className="text-black/70 dark:text-white/70 text-base leading-relaxed space-y-8 markdown-body w-full html:not(.dark):text-white">
        <ReactMarkdown>{t.privacy.content}</ReactMarkdown>
        
        <div className="pt-12 border-t border-black/10 flex justify-end w-full">
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-black/10 hover:bg-black/20 text-black rounded-xl transition-all font-medium hover:scale-[1.02] active:scale-[0.98]"
          >
            {t.privacy.close}
          </button>
        </div>
      </div>
    </div>
  );
};
