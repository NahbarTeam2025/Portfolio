import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer = React.memo(({ isMobileMenuOpen, handleNavigate }: { isMobileMenuOpen: boolean, handleNavigate: (page: string) => void }) => {
  const { t } = useLanguage();
  return (
    <footer className={`w-full border-t border-white/5 bg-black/35 backdrop-blur-xl py-2 px-4 md:px-6 mt-auto relative ${isMobileMenuOpen ? 'z-50' : 'z-10'} shrink-0`}>
      <div className="flex flex-row justify-between items-center gap-4">
        <button 
          onClick={() => handleNavigate('start')}
          className="flex items-center cursor-pointer group" 
        >
          <img 
            src="https://meine-assets.pages.dev/logo.png" 
            alt="Logo Robert Erbach Footer" 
            width="66"
            height="49"
            className="h-[24px] md:h-[28px] w-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(5,184,194,0.6)]"
            loading="lazy"
            decoding="async"
          />
          <span className="ml-3 text-white/70 text-[10px] md:text-xs font-medium">Falkenberg/Elster</span>
        </button>
        
        <div className="flex flex-row justify-end items-center gap-4 md:gap-6 text-[11px]">
          <button 
            onClick={() => handleNavigate('impressum')}
            className="text-white/70 hover:text-white transition-colors"
          >
            {t.footer.impressum}
          </button>
          <button 
            onClick={() => handleNavigate('datenschutz')}
            className="text-white/70 hover:text-white transition-colors"
          >
            {t.footer.privacy}
          </button>
        </div>
      </div>
    </footer>
  );
});
