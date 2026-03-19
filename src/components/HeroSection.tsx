import React from 'react';
import { GlitchWord } from './GlitchWord';
import { TerminalStatus } from './TerminalStatus';

export const HeroSection = React.memo(({ handleNavigate }: { handleNavigate: (page: string) => void }) => {
  return (
    <div id="hero" className="flex flex-col items-center gap-6 md:gap-8 lg:gap-12 max-w-[680px] lg:max-w-[900px] animate-in fade-in duration-500 subtle-float relative z-10">
      {/* Badge / Pill */}
      <div className="flex items-center gap-2 rounded-[20px] bg-brand-teal/10 border border-brand-teal/20 px-4 py-1.5 backdrop-blur-sm">
        <div className="w-1 h-1 bg-brand-teal rounded-full shadow-[0_0_8px_rgba(5,184,194,0.8)]" />
        <span className="text-[12px] md:text-[14px] font-medium">
          <span className="text-brand-teal">Portfolio & Projekte</span>
        </span>
      </div>

      {/* Heading & Subtitle Container */}
      <div className="flex flex-col items-center gap-4 lg:gap-6">
        {/* Heading */}
        <h1 className="flex flex-col items-center text-[32px] md:text-[48px] lg:text-[72px] leading-[1.1] max-w-[800px] lg:max-w-[1000px]">
          <span className="font-audiowide font-bold tracking-tighter text-glow-animated pb-2">Robert Erbach</span>
          <span className="text-[18px] md:text-[24px] lg:text-[32px] text-white/80 mt-1 lg:mt-3 font-medium tracking-tight">
            Digital Specialist für <GlitchWord word="Marketing" colorClass="text-brand-teal" />, <GlitchWord word="Content" colorClass="text-brand-violet" /> & <GlitchWord word="KI" colorClass="text-brand-teal" />
          </span>
          <TerminalStatus />
        </h1>

        {/* Subtitle */}
        <div className="flex flex-col items-center gap-2 lg:gap-4">
          <p className="text-white/90 font-medium text-[12px] md:text-[14px] lg:text-[16px] tracking-widest uppercase text-center">
            Content Creation • SEO • Design • Automatisierung • KI
          </p>
          <p className="text-white/70 text-[14px] md:text-[16px] lg:text-[20px] font-normal max-w-[680px] lg:max-w-[800px] leading-relaxed text-center">
            Ich verbinde Content, Design und KI-Workflows zu digitalen Lösungen, die strukturiert aufgebaut sind und in der Praxis funktionieren.
          </p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mt-2 lg:mt-4">
        <button 
          onClick={() => handleNavigate('Kontakt')}
          className="flex items-center justify-center gap-2 rounded-full px-[40px] py-[12px] bg-gradient-to-r from-brand-violet/20 to-brand-teal/20 border border-white/10 text-white text-[15px] font-semibold tracking-wide shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:from-brand-violet/40 hover:to-brand-teal/40 transition-all duration-500 hover:scale-105 cursor-pointer group/cta animate-pulse-subtle"
        >
          <span className="relative z-10">Kontakt aufnehmen</span>
          <svg className="w-5 h-5 transform transition-transform duration-300 group-hover/cta:translate-x-2 animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
});
