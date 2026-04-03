import React, { startTransition } from 'react';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../contexts/LanguageContext';

export const DatenschutzModal = ({ setIsDatenschutz }: { setIsDatenschutz: (open: boolean) => void }) => {
  const { t } = useLanguage();
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-md" onClick={() => startTransition(() => setIsDatenschutz(false))} />
      <div className="relative w-full max-w-3xl max-h-[85vh] max-h-[85dvh] bg-white/80 dark:bg-black/80 backdrop-blur-[20px] saturate-[180%] border border-black/10 dark:border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300" tabIndex={-1}>
        <div className="flex items-center justify-between p-6 border-b border-black/5 dark:border-white/5 shrink-0">
          <h2 id="modal-title" className="text-2xl font-medium text-black/90 dark:text-white html:not(.dark):text-white">{t.privacy.title}</h2>
          <button 
            onClick={() => startTransition(() => setIsDatenschutz(false))}
            className="p-2 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors"
            aria-label={t.privacy.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto text-black/70 dark:text-white/70 text-sm leading-relaxed space-y-8 markdown-body">
          <ReactMarkdown>{t.privacy.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
