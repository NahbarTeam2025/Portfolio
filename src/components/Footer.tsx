import React from 'react';
import { Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = React.memo(({ isMobileMenuOpen, handleNavigate }: { isMobileMenuOpen: boolean, handleNavigate: (page: string) => void }) => {
  return (
    <footer className="w-full border-t border-white/5 bg-black/35 backdrop-blur-xl py-3 px-6 md:px-[120px] mt-auto relative z-10 shrink-0">
      <div className="max-w-7xl mx-auto flex flex-row justify-between items-center gap-4">
        <button 
          onClick={() => handleNavigate('Start')}
          className="flex items-center gap-2 cursor-pointer group" 
        >
          <img 
            src="https://ik.imagekit.io/roberterbach/site-logo.png?tr=w-132,h-98" 
            alt="Logo Robert Erbach Footer" 
            width="66"
            height="49"
            className="h-[28px] w-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(5,184,194,0.6)]"
            loading="lazy"
            decoding="async"
          />
          <span className="text-white text-[11px] hidden sm:block group-hover:text-brand-teal transition-colors">Robert Erbach</span>
        </button>
        
        <div className="flex flex-row justify-end items-center gap-4 md:gap-6 text-[11px]">
          <a 
            href="https://www.linkedin.com/in/roberterbach" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:text-brand-teal transition-all duration-300 hover:scale-110"
            aria-label="LinkedIn Profil von Robert Erbach"
          >
            <Linkedin size={18} strokeWidth={1.5} />
          </a>
          <Link to="/impressum" className="text-white hover:text-brand-teal transition-colors">Impressum</Link>
          <Link to="/datenschutz" className="text-white hover:text-brand-teal transition-colors">Datenschutz</Link>
        </div>
      </div>
    </footer>
  );
});
