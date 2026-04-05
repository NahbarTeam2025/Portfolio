import React from 'react';
import { m } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/analytics';

export const HeroSection = React.memo(({ handleNavigate }: { handleNavigate: (page: string) => void }) => {
  const { t } = useLanguage();

  // Define particles for the background
  const particles = React.useMemo(() => 
    Array.from({ length: 25 }).map((_, i) => {
      const colorType = i % 3;
      let color = 'rgba(0, 0, 0, 0.1)'; // Black
      if (colorType === 1) color = 'rgba(59, 130, 246, 0.15)'; // Blue
      if (colorType === 2) color = 'rgba(107, 114, 128, 0.12)'; // Gray

      return {
        id: i,
        size: Math.random() * 5 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 20,
        delay: Math.random() * -20,
        color,
      };
    }), []);

  return (
    <div id="hero" className="w-full max-w-[1200px] mx-auto relative z-10 flex-grow px-4 sm:px-6 py-0 flex flex-col justify-center overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-center w-full relative z-10">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* 01. Minimalist Status Badge */}
          <div 
            className="mb-2 lg:mb-6 animate-in fade-in slide-in-from-left-4 duration-700 fill-mode-both"
          >
            <div className="inline-flex items-center gap-2 lg:gap-3 px-2.5 py-1 lg:px-4 lg:py-1.5 rounded-full bg-black/[0.02] border border-black/10 backdrop-blur-2xl">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              <span className="text-black/70 text-[9px] lg:text-[10px] font-bold tracking-[0.4em] uppercase">Status: Available</span>
            </div>
          </div>

          {/* 02. Main Typographic Core */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left w-full">
            
            {/* Name - Fluid & Massive */}
            <h1 
              className="font-display font-bold tracking-[-0.04em] text-black text-[clamp(1.6rem,8vw,5rem)] leading-[0.9] mb-2 lg:mb-4 -ml-[0.05em]"
            >
              {t.hero.title}
            </h1>
            
            {/* Motto - Elegant & Balanced */}
            <h2 
              className="font-sans text-blue-500 text-[clamp(0.85rem,3vw,1.8rem)] font-semibold tracking-tight leading-tight max-w-[95%] mb-3 lg:mb-6 animate-in fade-in slide-in-from-left-6 duration-700 delay-100 fill-mode-both"
            >
              {t.hero.subtitlePart1}
            </h2>
            
            {/* Subtitle Part 2 - Technical Rail */}
            <div 
              className="flex items-center justify-center lg:justify-start gap-3 lg:gap-6 text-black font-sans text-[7px] md:text-[10px] uppercase tracking-[0.2em] lg:tracking-[0.5em] font-bold mb-4 lg:mb-6 whitespace-nowrap animate-in fade-in slide-in-from-left-4 duration-700 delay-150 fill-mode-both"
            >
              {t.hero.subtitlePart2}
              <div className="hidden lg:block w-8 lg:w-20 h-px bg-gradient-to-r from-black to-transparent" />
            </div>

            {/* Description - Focused Content */}
            <p 
              className="text-black/90 font-sans text-[clamp(0.7rem,1.5vw,1rem)] font-medium leading-relaxed max-w-[550px] mb-4 lg:mb-10 animate-in fade-in slide-in-from-left-4 duration-700 delay-200 fill-mode-both"
            >
              {t.hero.desc}
            </p>

            {/* 03. Feature Rail - Minimalist Grid */}
            <div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-8 w-full max-w-[650px] border-y border-black/10 py-3 lg:py-6 mb-5 lg:mb-10 animate-in fade-in slide-in-from-left-4 duration-700 delay-300 fill-mode-both"
            >
              {[t.hero.design, t.hero.structure, t.hero.ki].map((item, idx) => (
                <div key={item} className="flex items-center justify-center lg:justify-start gap-x-2 group">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-black/60 text-[8px] md:text-[10px] font-mono tracking-widest uppercase leading-none mb-0.5 font-bold">0{idx + 1}</div>
                    <div className="w-1 h-1 rounded-full bg-green-500/60 group-hover:bg-green-400 transition-colors" />
                  </div>
                  <span className="text-black/80 text-[7px] sm:text-[10px] lg:text-xs font-semibold tracking-[0.1em] sm:tracking-[0.2em] uppercase transition-colors group-hover:text-blue-600 text-center lg:text-left leading-[1.2] whitespace-normal sm:whitespace-pre-line">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 04. Primary Action - High Contrast CTA */}
          <div 
            className="relative w-full sm:w-auto flex justify-center lg:justify-start animate-in fade-in slide-in-from-left-4 duration-700 delay-500 fill-mode-both"
          >
            <button 
              id="btn-hero-projects"
              onClick={() => {
                trackEvent('click', 'projects_cta', 'hero');
                handleNavigate('projects');
              }}
              aria-label={t.hero.cta}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full px-6 py-2.5 lg:px-8 lg:py-3.5 bg-blue-500/15 border border-blue-500/50 text-black text-[13px] lg:text-[15px] font-medium tracking-wide shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:bg-blue-600/25 hover:border-blue-400 transition-all duration-300 cursor-pointer hover:scale-[0.98] active:scale-95"
            >
              <span className="relative z-10">{t.hero.cta}</span>
              <svg className="w-3 h-3 lg:w-4 lg:h-4 relative z-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Hero Image Container */}
        <div
          className="relative flex justify-center items-center mt-2 lg:mt-0"
        >
          {/* Subtle Floating Particles - Positioned around the image to avoid text */}
          <div className="absolute inset-0 pointer-events-none overflow-visible z-0">
            {particles.map((p) => (
              <m.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  backgroundColor: p.color,
                  filter: 'blur(1px)',
                }}
                animate={{
                  x: [0, Math.random() * 60 - 30, 0],
                  y: [0, Math.random() * 60 - 30, 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "linear",
                }}
              />
            ))}
          </div>
          
          <div 
            className="relative w-full max-w-[220px] sm:max-w-[320px] lg:max-w-[500px] group translate-x-0 -translate-y-[10px] lg:translate-x-[10px] lg:translate-y-0"
            style={{ aspectRatio: '1 / 1' }}
          >
            {/* Soft Blue Veil Overlay - Shaped to the image pixels */}
            <div 
              className="absolute inset-0 bg-blue-400/20 mix-blend-color pointer-events-none z-10 opacity-0 animate-hero-fade-in hero-mask"
            />
            <picture className="absolute inset-0 w-full h-full z-[5] block">
              <source 
                media="(max-width: 768px)" 
                srcSet="https://meine-assets.pages.dev/ichklein.webp" 
              />
              <img 
                src="https://meine-assets.pages.dev/ich.webp" 
                alt="Robert Erbach" 
                width="500"
                height="500"
                fetchPriority="high"
                loading="eager"
                decoding="sync"
                className="w-full h-full object-contain drop-shadow-2xl animate-hero-fade-in block"
                referrerPolicy="no-referrer"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
});
