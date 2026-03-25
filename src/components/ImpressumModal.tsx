import React, { startTransition } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const ImpressumModal = ({ setIsImpressum }: { setIsImpressum: (open: boolean) => void }) => {
  const { t } = useLanguage();
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => startTransition(() => setIsImpressum(false))} />
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-black/20 backdrop-blur-[20px] saturate-[180%] border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300" tabIndex={-1}>
        <div className="flex items-center justify-between p-6 border-b border-white/5 shrink-0">
          <h2 id="modal-title" className="text-2xl font-medium text-white">{t.impressum.title}</h2>
          <button 
            onClick={() => startTransition(() => setIsImpressum(false))}
            className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label={t.impressum.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto text-white/70 text-sm leading-relaxed space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">{t.impressum.section1Title}</h3>
            <p>
              {t.impressum.name}<br />
              {t.impressum.address}<br />
              {t.impressum.city}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-2">{t.impressum.section2Title}</h3>
            <p>
              {t.impressum.phone}<br />
              {t.impressum.email}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-2">{t.impressum.section3Title}</h3>
            <p>
              {t.impressum.name}<br />
              {t.impressum.address}<br />
              {t.impressum.city}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
