import React from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export const HeroSection = React.memo(({ handleNavigate }: { handleNavigate: (page: string) => void }) => {
  const { t } = useLanguage();
  return (
    <div id="hero" className="flex flex-col items-center justify-center gap-0 max-w-[680px] lg:max-w-[900px] animate-in fade-in duration-500 subtle-float relative z-10 h-full px-4">
      {/* Heading & Subtitle Container */}
      <div className="flex flex-col items-center gap-0">
        {/* Heading */}
        <h1 className="flex flex-col items-center max-w-[800px] lg:max-w-[1050px]">
          <span className="font-audiowide font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-400 text-[32px] sm:text-[48px] md:text-[60px] lg:text-[72px] leading-tight text-center">{t.hero.title}</span>
          <span className="text-white/85 mt-[6px] md:mt-[8px] font-normal tracking-wider text-center block">
            <span className="text-blue-500 block mb-[6px] md:mb-[10px] text-[18px] sm:text-[24px] md:text-[28px] lg:text-[32px] italic leading-tight">{t.hero.subtitlePart1}</span>
            <span className="block text-[14px] sm:text-[18px] md:text-[20px] lg:text-[22px] leading-tight">{t.hero.subtitlePart2}</span>
          </span>
        </h1>

        {/* Subtitle */}
        <div className="flex flex-col items-center gap-0 mt-[16px] md:mt-[28px]">
          <p className="text-white/80 text-[13px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-normal max-w-[600px] lg:max-w-[700px] leading-relaxed text-center">
            {t.hero.desc}
          </p>
        </div>

        {/* Checkmark Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-[20px] md:mt-[36px]">
          {[t.hero.design, t.hero.structure, t.hero.ki].map((item) => (
            <div key={item} className="flex items-center gap-1.5 sm:gap-2 text-white/80 text-[11px] sm:text-sm">
              <CheckCircle className="w-4 h-4 sm:w-5 h-5 text-blue-500" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mt-[24px] md:mt-[36px]">
        <motion.button 
          id="btn-hero-projects"
          whileHover="hover"
          initial="initial"
          onClick={() => {
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'view_projects_click');
            }
            handleNavigate('projects');
          }}
          className="group relative flex items-center gap-3 rounded-xl pl-2 pr-8 py-2 bg-black/40 border border-blue-500/60 text-blue-50 text-[11px] font-bold tracking-[0.15em] uppercase shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-500 cursor-pointer focus-ring overflow-hidden"
        >
          {/* Switch Track */}
          <div className="relative flex items-center w-12 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 overflow-hidden px-1">
            {/* Switch Thumb */}
            <motion.div 
              variants={{
                initial: { x: 0, backgroundColor: "rgb(59, 130, 246)" }, // blue-500
                hover: { x: 20, backgroundColor: "rgb(255, 255, 255)", boxShadow: "0 0 15px rgba(255, 255, 255, 0.8)" }
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-5 h-5 rounded-md shadow-[0_0_8px_rgba(59,130,246,0.5)] flex items-center justify-center"
            >
              {/* Inner light dot */}
              <motion.div 
                variants={{
                  initial: { backgroundColor: "rgb(255, 255, 255)" },
                  hover: { backgroundColor: "rgb(59, 130, 246)" }
                }}
                className="w-1.5 h-1.5 rounded-sm" 
              />
            </motion.div>
          </div>
          
          <span className="relative z-10">{t.hero.cta}</span>
          
          {/* Subtle Glow Background */}
          <motion.div 
            variants={{
              initial: { opacity: 0, scale: 0.8 },
              hover: { opacity: 1, scale: 1.2 }
            }}
            className="absolute inset-0 bg-blue-500/5 blur-xl pointer-events-none"
          />
        </motion.button>
      </div>
    </div>
  );
});
