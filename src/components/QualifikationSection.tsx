import React, { startTransition } from 'react';
import { motion } from 'framer-motion';

export const QualifikationSection = React.memo(({ 
  expandedQual, 
  setExpandedQual, 
  showTimeline, 
  isInitialEntrance, 
  setIsInitialEntrance 
}: any) => {
  const qualData = [
    {
      date: '07/2025 – 04/2026',
      title: 'Digital Marketing Manager (Weiterbildung)',
      company: 'GFN GmbH',
      items: ['Content Marketing', 'Social Media Marketing', 'SEO / SEA', 'E-Commerce und datengetriebene Kampagnen', 'Web Analytics (Google Analytics, Tag Manager)', 'Neuromarketing']
    },
    {
      date: '06/2024 – 05/2025',
      title: 'Kaufmännische Weiterbildung',
      company: 'Fortbildungsakademie der Wirtschaft (IBB)',
      items: ['Kaufmännischer Schriftverkehr nach DIN 5008', 'MS Office', 'Datenbanken (MS Access)', 'IT-Sicherheit', 'Datenschutz (DSGVO)']
    },
    {
      date: '07/2017 – 05/2024',
      title: 'Berufliche Tätigkeiten',
      company: 'Handwerker- und Büroservice',
      desc: 'Berufliche Tätigkeiten im Handwerker- und Büroservice.\nParallel gezielte Vorbereitung auf den Einstieg ins Digital Marketing mit Fokus auf digitale Themen.'
    },
    {
      date: '09/2013 – 09/2016',
      title: 'Ausbildung Kaufmann im Gesundheitswesen',
      company: 'Sanitätshaus Bauch'
    }
  ];

  return (
    <div className="flex flex-col items-start gap-4 md:gap-6 w-full h-full overflow-hidden animate-in fade-in duration-500">
      <h1 className="heading-gradient text-[28px] md:text-[40px] lg:text-[48px] font-medium leading-[1.2] tracking-tight shrink-0">
        Berufliche Qualifikation
      </h1>
      <div className="w-full h-[1px] bg-white/10 shrink-0" />
      <div className={`relative flex flex-col gap-4 w-full max-w-[1200px] pb-4 transition-all duration-500 overflow-hidden ${expandedQual === null ? 'pl-8 md:pl-16' : 'pl-0'}`}>
        {/* Vertical Timeline Line */}
        {showTimeline && (
          <motion.div 
            initial={{ scaleY: 0, originY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 0.2 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute left-[15px] md:left-[31px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-brand-teal via-brand-violet to-brand-teal" 
          />
        )}
        
        {qualData.filter((_, i) => expandedQual === null || expandedQual === i).map((qual, i) => {
          const actualIndex = expandedQual === null ? i : expandedQual;
          const isExpanded = expandedQual !== null;
          return (
            <div 
              key={actualIndex} 
              className={`relative group ${isExpanded ? 'flex-1 min-h-0' : ''}`}
            >
              {/* Timeline Node */}
              {showTimeline && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: i * 0.1 + 0.2,
                    ease: "backOut"
                  }}
                  className="absolute -left-[23px] md:-left-[39px] top-[30px] w-3 h-3 rounded-full bg-black border border-brand-teal z-20 shadow-[0_0_10px_rgba(5,184,194,0.5)] group-hover:scale-125 transition-transform duration-300" 
                />
              )}
              
              <div 
                className={`wow-card flex flex-col h-full ${isExpanded ? 'flex-1 min-h-0 ring-1 ring-brand-teal/30' : 'overflow-hidden'} ${!isExpanded && isInitialEntrance ? 'animate-project-entrance' : ''}`}
                style={{ animationDelay: isExpanded ? '0ms' : `${i * 400}ms` }}
              >
                <div className="wow-card-border" />
                <button 
                  onClick={() => {
                    startTransition(() => {
                      setExpandedQual(isExpanded ? null : actualIndex);
                      setIsInitialEntrance(false);
                    });
                  }}
                  aria-expanded={isExpanded}
                  aria-label={isExpanded ? "Qualifikation-Details einklappen" : "Qualifikation-Details ausklappen"}
                  className={`w-full text-left p-4 md:p-5 flex justify-between items-center group/btn relative z-10 ${isExpanded ? 'shrink-0' : 'min-h-[80px]'}`}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm md:text-base font-semibold text-white leading-tight group-hover/btn:text-brand-teal transition-colors">{qual.title}</h3>
                      <span className="hidden sm:inline-block text-white font-mono text-[10px] bg-brand-teal/20 border border-brand-teal/30 px-2 py-0.5 rounded-md">{qual.date}</span>
                    </div>
                  <span className="text-white/60 text-[12px] md:text-[14px]">{qual.company}</span>
                </div>
                <div className={`w-7 h-7 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-brand-violet/20 border-brand-violet/40' : ''}`}>
                  <svg className="w-3 h-3 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <div 
                className={`transition-all duration-500 ease-in-out relative z-10 ${isExpanded ? 'flex-1 min-h-0 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
              >
                <div className="px-4 pb-4 md:px-5 md:pb-5 flex flex-col gap-3 h-full">
                  <div className="w-full h-[1px] bg-white/5 shrink-0" />
                  <div className="pr-2 overflow-y-auto">
                      <div className="sm:hidden mb-3">
                        <span className="text-white font-mono text-[10px] bg-brand-teal/20 border border-brand-teal/30 px-2 py-0.5 rounded-md">{qual.date}</span>
                      </div>
                    {qual.desc && (
                      <p className="text-white/70 text-[13px] md:text-[14px] leading-relaxed whitespace-pre-line mb-3">{qual.desc}</p>
                    )}
                    {qual.items && (
                      <div className="flex flex-wrap gap-2">
                        {qual.items.map((item, j) => (
                          <span 
                            key={j} 
                            className={`px-2.5 py-1 rounded-full border text-[11px] md:text-[12px] font-medium transition-all duration-300 hover:scale-105 hover:bg-white/5 ${
                              j % 2 === 0 
                                ? 'border-brand-teal/40 text-brand-teal' 
                                : 'border-brand-violet/40 text-brand-violet'
                            }`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-auto" />
                </div>
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
});
