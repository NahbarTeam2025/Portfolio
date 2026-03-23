import React from 'react';
import { CheckCircle } from 'lucide-react';

export const HeroSection = React.memo(({ handleNavigate }: { handleNavigate: (page: string) => void }) => {
  return (
    <div id="hero" className="flex flex-col items-center justify-center gap-4 md:gap-6 lg:gap-8 max-w-[680px] lg:max-w-[900px] animate-in fade-in duration-500 subtle-float relative z-10 h-full">
      {/* Heading & Subtitle Container */}
      <div className="flex flex-col items-center gap-2 lg:gap-4">
        {/* Heading */}
        <h1 className="flex flex-col items-center text-[32px] md:text-[48px] lg:text-[72px] leading-[1.1] max-w-[800px] lg:max-w-[1000px]">
          <span className="font-audiowide font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-purple-300 pb-2">Robert Erbach</span>
          <span className="text-[16px] md:text-[20px] lg:text-[24px] text-white/85 mt-2 lg:mt-4 font-normal tracking-wider whitespace-nowrap">
            Digital Specialist für Marketing, Content & KI
          </span>
        </h1>

        {/* Subtitle */}
        <div className="flex flex-col items-center gap-3 lg:gap-6 mt-2 lg:mt-4">
          <p className="text-white/60 text-[14px] md:text-[16px] lg:text-[18px] font-normal max-w-[600px] lg:max-w-[700px] leading-relaxed text-center">
            Ich verbinde Content, Design und KI-Workflows zu klaren, durchdachten Lösungen – strukturiert entwickelt und auf den Punkt gebracht.
          </p>
        </div>

        {/* Checkmark Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          {['Content Creation', 'SEO & Design', 'KI-Automatisierung'].map((item) => (
            <div key={item} className="flex items-center gap-2 text-white/80 text-sm">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mt-2 lg:mt-4">
        <button 
          onClick={() => handleNavigate('Projekte')}
          className="rounded-full px-8 py-3.5 bg-blue-900/20 backdrop-blur-md text-white text-[15px] font-semibold tracking-wide transition-all duration-300 hover:bg-white/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] cursor-pointer"
        >
          Projekte entdecken
        </button>
      </div>
    </div>
  );
});
