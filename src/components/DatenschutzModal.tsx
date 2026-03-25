import React, { startTransition } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const DatenschutzModal = ({ setIsDatenschutz }: { setIsDatenschutz: (open: boolean) => void }) => {
  const { t } = useLanguage();
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => startTransition(() => setIsDatenschutz(false))} />
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-black/20 backdrop-blur-[20px] saturate-[180%] border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300" tabIndex={-1}>
        <div className="flex items-center justify-between p-6 border-b border-white/5 shrink-0">
          <h2 id="modal-title" className="text-2xl font-medium text-white">{t.privacy.title}</h2>
          <button 
            onClick={() => startTransition(() => setIsDatenschutz(false))}
            className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label={t.privacy.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto text-white/70 text-sm leading-relaxed space-y-8">
          
          <section>
            <h3 className="text-lg font-medium text-white mb-3">{t.privacy.section1.title}</h3>
            <h4 className="text-base font-medium text-white/90 mb-2">{t.privacy.section1.subtitle1}</h4>
            <p className="mb-4">
              {t.privacy.section1.text1}
            </p>
            <h4 className="text-base font-medium text-white/90 mb-2">{t.privacy.section1.subtitle2}</h4>
            <p className="mb-2"><strong>{t.privacy.section1.q1}</strong></p>
            <p className="mb-4">{t.privacy.section1.a1}</p>
            <p className="mb-2"><strong>{t.privacy.section1.q2}</strong></p>
            <p className="mb-4">{t.privacy.section1.a2}</p>
            <p className="mb-2"><strong>{t.privacy.section1.q3}</strong></p>
            <p className="mb-4">{t.privacy.section1.a3}</p>
            <p className="mb-2"><strong>{t.privacy.section1.q4}</strong></p>
            <p>{t.privacy.section1.a4}</p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-white mb-3">{t.privacy.section2.title}</h3>
            <p className="mb-2">{t.privacy.section2.text1}</p>
            <h4 className="text-base font-medium text-white/90 mb-2">{t.privacy.section2.subtitle1}</h4>
            <p className="mb-4">{t.privacy.section2.text2}</p>
            <p className="mb-4">{t.privacy.section2.text3} <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://www.cloudflare.com/privacypolicy/</a>.</p>
            <p>{t.privacy.section2.text4}</p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-white mb-3">{t.privacy.section3.title}</h3>
            <h4 className="text-base font-medium text-white/90 mb-2">{t.privacy.section3.subtitle1}</h4>
            <p className="mb-4">{t.privacy.section3.text1}</p>
            <h4 className="text-base font-medium text-white/90 mb-2">{t.privacy.section3.subtitle2}</h4>
            <p className="mb-4">{t.privacy.section3.text2}</p>
            <p className="mb-4">
              {t.privacy.section3.address}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-white mb-3">{t.privacy.section4.title}</h3>
            <h4 className="text-base font-medium text-white/90 mb-2">{t.privacy.section4.subtitle1}</h4>
            <p className="mb-4">{t.privacy.section4.text1}</p>
            <p className="mb-4">{t.privacy.section4.text2}</p>
            <p className="mb-4">{t.privacy.section4.text3}</p>
            <p className="mb-6">{t.privacy.section4.text4}</p>

            <h4 className="text-base font-medium text-white/90 mb-2">{t.privacy.section4.subtitle2}</h4>
            <p className="mb-6">{t.privacy.section4.text5}</p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-white mb-3">{t.privacy.section5.title}</h3>
            <h4 className="text-base font-medium text-white/90 mb-2">{t.privacy.section5.subtitle1}</h4>
            <p className="mb-4">{t.privacy.section5.text1}</p>
            
            <h4 className="text-base font-medium text-white/90 mb-2">{t.privacy.section5.subtitle2}</h4>
            <p className="mb-4">{t.privacy.section5.text2}</p>
            <p className="mb-4">{t.privacy.section5.text3}</p>
            <p className="mb-4">{t.privacy.section5.text4} <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://www.cloudflare.com/privacypolicy/</a>.</p>
            <p>{t.privacy.section5.text5}</p>
          </section>

        </div>
      </div>
    </div>
  );
};
