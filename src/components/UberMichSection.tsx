import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const UberMichSection = React.memo(({ handleNavigate }: { handleNavigate: (page: string) => void }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-start gap-4 md:gap-6 lg:gap-6 w-full flex-grow animate-in fade-in duration-500">
      <h1 className="heading-gradient fluid-h2 font-medium tracking-tight shrink-0">
        {t.about.title}
      </h1>
      <div className="w-full h-[1px] bg-white/10 shrink-0" />
      <div className="flex flex-col gap-2 md:gap-3 text-white/80 text-[13px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-normal max-w-[1000px] leading-snug md:leading-relaxed pt-1 md:pt-2">
        <p className="font-bold text-white">
          {t.about.boldText}
        </p>
        <p>
          {t.about.text1}
        </p>
        <p>
          {t.about.text2}
        </p>
        <p>
          {t.about.text3}
        </p>
        <p className="text-blue-400 font-medium tracking-wider text-[11px] sm:text-[13px] md:text-[14px] lg:text-[15px] uppercase leading-relaxed pt-2">
          {t.about.motto}
        </p>
        <div className="mt-1 md:mt-2 shrink-0">
          <img 
            src="https://meine-assets.pages.dev/signature.png" 
            alt={t.hero.title} 
            width="250"
            height="64"
            className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto object-contain invert mix-blend-screen opacity-90"
              style={{ forcedColorAdjust: 'none' }}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      {/* CTA Button */}
      <div className="w-full flex flex-col items-center justify-center pb-32 md:pb-4 pt-4 gap-3 mt-auto shrink-0">
        <p className="text-white/80 text-sm md:text-base text-center">
          {t.about.cta.text}
        </p>
        <button 
          onClick={() => handleNavigate(t.nav.contact)}
          className="w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3 bg-black/40 border border-blue-500/60 text-blue-50 text-[14px] md:text-[15px] font-semibold tracking-wide shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 cursor-pointer focus-ring"
        >
          <span className="relative z-10">{t.about.cta.button}</span>
        </button>
      </div>
    </div>
  );
});

