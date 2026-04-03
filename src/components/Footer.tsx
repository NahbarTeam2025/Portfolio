import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/analytics';

export const Footer = React.memo(({ isMobileMenuOpen, handleNavigate }: { isMobileMenuOpen: boolean, handleNavigate: (page: string) => void }) => {
  const { t } = useLanguage();
  return (
    <footer className={`w-full bg-transparent py-1 px-6 mt-auto relative ${isMobileMenuOpen ? 'z-50' : 'z-10'} shrink-0`}>
      <div className="max-w-7xl mx-auto w-full flex flex-row justify-between items-center gap-4">
        <button 
          onClick={() => {
            trackEvent('click', 'logo', 'footer');
            handleNavigate('start');
          }}
          className="flex items-center cursor-pointer group" 
          aria-label="Robert Erbach Portfolio Home"
        >
          {/* Light mode logo */}
          <img 
            src="https://3dab3910.meine-assets.pages.dev/favicon-96x96.png" 
            alt="Logo Robert Erbach Footer" 
            width="66"
            height="49"
            className="h-[24px] md:h-[28px] w-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(5,184,194,0.6)] dark:hidden"
            loading="lazy"
            decoding="async"
          />
          {/* Dark mode logo */}
          <img 
            src="https://3dab3910.meine-assets.pages.dev/favicon.ico" 
            alt="Logo Robert Erbach Footer" 
            width="66"
            height="49"
            className="h-[24px] md:h-[28px] w-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(5,184,194,0.6)] hidden dark:block"
            loading="lazy"
            decoding="async"
          />
          <span className="ml-3 text-black/70 text-[10px] md:text-xs font-medium">Falkenberg/Elster</span>
        </button>
        
        <div className="flex flex-row justify-end items-center gap-4 md:gap-6 text-[11px]">
          <button 
            onClick={() => {
              trackEvent('click', 'impressum', 'footer');
              handleNavigate('impressum');
            }}
            className="text-black/70 hover:text-black transition-colors"
          >
            {t.footer.impressum}
          </button>
          <button 
            onClick={() => {
              trackEvent('click', 'datenschutz', 'footer');
              handleNavigate('datenschutz');
            }}
            className="text-black/70 hover:text-black transition-colors"
          >
            {t.footer.privacy}
          </button>
        </div>
      </div>
    </footer>
  );
});
