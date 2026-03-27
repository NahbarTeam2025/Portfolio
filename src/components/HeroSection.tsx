import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export const HeroSection = React.memo(({ handleNavigate }: { handleNavigate: (page: string) => void }) => {
  const { t } = useLanguage();
  return (
    <div id="hero" className="flex flex-col items-center justify-center w-full max-w-[1200px] mx-auto relative z-10 h-full px-6 lg:py-0 pt-2 pb-4 lg:max-h-[70vh]">
      
      {/* 01. Minimalist Status Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-4 lg:mb-6"
      >
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-2xl">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
          </span>
          <span className="text-white/70 text-[10px] font-bold tracking-[0.4em] uppercase">Status: Available</span>
        </div>
      </motion.div>

      {/* 02. Main Typographic Core */}
      <div className="flex flex-col items-center text-center w-full">
        
        {/* Name - Fluid & Massive */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display font-bold tracking-[-0.04em] text-white text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.9] mb-3 lg:mb-4"
        >
          {t.hero.title}
        </motion.h1>
        
        {/* Motto - Elegant & Balanced */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-sans text-blue-400/90 text-[clamp(1rem,2.5vw,1.8rem)] font-light tracking-tight leading-tight max-w-[90%] mb-4 lg:mb-6"
        >
          {t.hero.subtitlePart1}
        </motion.h2>
        
        {/* Subtitle Part 2 - Technical Rail */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="flex items-center gap-6 text-white/80 font-sans text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-semibold mb-5 lg:mb-6"
        >
          <div className="w-10 h-px bg-gradient-to-r from-transparent to-white/80" />
          {t.hero.subtitlePart2}
          <div className="w-10 h-px bg-gradient-to-l from-transparent to-white/80" />
        </motion.div>

        {/* Description - Focused Content */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="text-white/70 font-sans text-[clamp(0.85rem,1.4vw,1rem)] font-light leading-relaxed max-w-[550px] mb-8 lg:mb-10"
        >
          {t.hero.desc}
        </motion.p>

        {/* 03. Feature Rail - Minimalist Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8 w-full max-w-[650px] border-y border-white/5 py-6 mb-8 lg:mb-10"
        >
          {[t.hero.design, t.hero.structure, t.hero.ki].map((item, idx) => (
            <div key={item} className="flex flex-col items-center gap-3 group">
              <div className="text-white/30 text-[9px] font-mono tracking-widest uppercase mb-0.5">0{idx + 1}</div>
              <div className="flex items-center gap-2.5">
                <div className="w-1 h-1 rounded-full bg-green-500/70 group-hover:bg-green-400 transition-colors" />
                <span className="text-white/70 text-[10px] lg:text-xs font-medium tracking-[0.2em] uppercase transition-colors group-hover:text-white">{item}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 04. Primary Action - High Contrast CTA */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        className="relative group"
      >
        {/* Outer Glow Effect */}
        <div className="absolute -inset-4 bg-blue-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <motion.button 
          id="btn-hero-projects"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'view_projects_click');
            }
            handleNavigate('projects');
          }}
          className="w-full flex items-center justify-center gap-2 rounded-xl px-6 py-2 bg-black/40 border border-blue-500/60 text-blue-50 text-[13px] md:text-[14px] font-semibold tracking-wide shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 cursor-pointer focus-ring"
        >
          {t.hero.cta}
        </motion.button>
      </motion.div>
    </div>
  );
});
