import React from 'react';

export const HeroSection = React.memo(({ handleNavigate }: { handleNavigate: (page: string) => void }) => {
  return (
    <div id="hero" className="flex flex-col items-center justify-center gap-6 md:gap-8 lg:gap-12 max-w-[680px] lg:max-w-[900px] animate-in fade-in duration-500 subtle-float relative z-10 h-full">
      {/* Heading & Subtitle Container */}
      <div className="flex flex-col items-center gap-4 lg:gap-6">
        {/* Heading */}
        <h1 className="flex flex-col items-center text-[32px] md:text-[48px] lg:text-[72px] leading-[1.1] max-w-[800px] lg:max-w-[1000px]">
          <span className="font-audiowide font-bold tracking-tighter text-glow-animated pb-2">Robert Erbach</span>
          <span className="text-[16px] md:text-[20px] lg:text-[24px] text-white/85 mt-2 lg:mt-4 font-normal tracking-wider whitespace-nowrap">
            Digital Specialist für Marketing, Content & KI
          </span>
        </h1>

        {/* Subtitle */}
        <div className="flex flex-col items-center gap-3 lg:gap-6 mt-4 lg:mt-6">
          <p className="text-white/90 font-medium text-[12px] md:text-[14px] lg:text-[16px] tracking-widest uppercase text-center">
            Content Creation • SEO • Design • Automatisierung • KI
          </p>
          <p className="text-white/60 text-[14px] md:text-[16px] lg:text-[18px] font-normal max-w-[600px] lg:max-w-[700px] leading-relaxed text-center">
            Ich verbinde Content, Design und KI-Workflows zu klaren, durchdachten Lösungen – strukturiert entwickelt und auf den Punkt gebracht.
          </p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mt-4 lg:mt-6">
        <button 
          onClick={() => handleNavigate('Projekte')}
          className="flex items-center justify-center gap-3 rounded-full px-8 py-3.5 bg-white/10 border border-white/20 text-white text-[15px] font-semibold tracking-wide transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer group/cta"
        >
          <span className="relative z-10">Projekte entdecken</span>
          <svg className="w-5 h-5 transform transition-transform duration-300 group-hover/cta:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
});
