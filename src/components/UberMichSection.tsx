import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const UberMichSection = React.memo(({ handleNavigate }: { handleNavigate: (page: string) => void }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-start gap-2 md:gap-4 lg:gap-6 w-full flex-grow animate-in fade-in duration-500 pb-4 md:pb-4">
      <h1 className="heading-gradient fluid-h2 font-medium tracking-tight shrink-0">
        {t.about.title}
      </h1>
      <div className="w-full h-[1px] bg-white/10 shrink-0" />
      <div className="flex flex-col gap-2 md:gap-4 text-white/90 text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-normal max-w-[1000px] leading-relaxed pt-0.5 md:pt-2">
        <p className="font-bold text-white text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px]">
          {t.about.boldText}
        </p>
        <div className="flex flex-col gap-1.5 md:gap-3">
          <p>
            {t.about.text1}
          </p>
          <p>
            {t.about.text2}
          </p>
          <p>
            {t.about.text3}
          </p>
        </div>
        <div className="pt-1 md:pt-4 flex flex-col gap-2 md:gap-6">
          <p className="text-white font-medium tracking-wider text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed">
            {t.about.motto}
          </p>
          <div className="flex flex-col gap-2 md:gap-6">
            <p className="text-blue-400 font-medium tracking-wider text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed">
              {t.about.mottoBlue}
            </p>
            <div className="shrink-0">
              <img 
                src="https://meine-assets.pages.dev/signature.png" 
                alt={t.hero.title} 
                width="250"
                height="64"
                className="h-8 sm:h-12 md:h-14 lg:h-16 w-auto object-contain invert mix-blend-screen opacity-90"
                style={{ forcedColorAdjust: 'none' }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center sm:items-start gap-2 mt-1 md:mt-4">
          {/* CTA Button */}
          <div className="flex flex-col items-stretch gap-2 shrink-0 w-full sm:w-auto">
            <p className="text-white/70 text-[12px] md:text-[14px] italic text-center sm:text-left">
              {t.about.cta.text}
            </p>
            <button 
              onClick={() => handleNavigate('contact')}
              className="flex items-center justify-center gap-2 rounded-xl px-5 py-2 md:px-8 md:py-3 bg-black/40 border border-blue-500/60 text-blue-50 text-[13px] md:text-[15px] font-semibold tracking-wide shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 cursor-pointer focus-ring"
            >
              <span className="relative z-10">{t.about.cta.button}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

