import React, { useState, startTransition, useRef } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import ReactMarkdown from 'react-markdown';

export const UberMichSection = React.memo(({ handleNavigate }: { handleNavigate: (page: string) => void }) => {
  const { t } = useLanguage();
  const [expandedQual, setExpandedQual] = useState<number | null>(null);
  const qualData = t.qualifications.items;
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
      <div className="UberMichSection-container flex flex-col items-start gap-1 md:gap-1.5 lg:gap-2 w-full flex-grow animate-in fade-in duration-500 pb-1 md:pb-1">
        <h1 className="heading-gradient fluid-h2 font-medium tracking-tight shrink-0">
          {t.about.title}
        </h1>
        <div className="w-full h-[1px] bg-black/10 shrink-0" />
        <div className="flex flex-col gap-1 md:gap-1.5 text-black/90 text-[15px] sm:text-[17px] md:text-[19px] lg:text-[21px] font-normal max-w-2xl leading-relaxed pt-0.5 md:pt-2">
          <p className="font-bold text-black text-[16px] sm:text-[19px] md:text-[23px] lg:text-[26px] mb-0.5 md:mb-1.5">
            {t.about.boldText}
          </p>
          <div className="flex flex-col gap-1 md:gap-2">
            <div className="flex flex-col gap-0.5 md:gap-1">
              <p>
                {t.about.text1}
              </p>
              <p>
                {t.about.text2}
              </p>
            </div>
            <p className="mt-0.5 md:mt-0.5">
              {t.about.text3}
            </p>
          </div>
          <div className="pt-2 md:pt-3 flex flex-col gap-1 md:gap-2">
            <p className="text-black font-medium tracking-wider text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] leading-relaxed">
              {t.about.motto}
            </p>
            <p className="text-blue-600 font-medium tracking-wider text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] leading-relaxed">
              {t.about.mottoBlue}
            </p>
            <div className="shrink-0 my-2 md:my-3">
              <img 
                src="https://meine-assets.pages.dev/signature.png" 
                alt={t.hero.title} 
                width="250"
                height="60"
                className="h-10 sm:h-11 md:h-16 lg:h-20 w-auto object-contain opacity-90 transform-gpu signature-image transition-all duration-500"
                style={{ forcedColorAdjust: 'none' }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Werdegang Section */}
          <div className="mt-40 md:mt-32 w-full">
            <h2 className="heading-gradient text-[20px] md:text-[26px] lg:text-[32px] font-medium tracking-tight mb-6">
              {t.qualifications.title}
            </h2>
            <div className="relative flex flex-col gap-4 w-full pl-8 md:pl-12">
              {/* Timeline Line */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute left-[16px] md:left-[24px] -translate-x-1/2 top-2 w-[2px] bg-gradient-to-b from-blue-500/50 via-blue-400/30 to-transparent origin-top" 
              />
              
              {qualData.map((qual: any, i: number) => {
                const isExpanded = expandedQual === i;
                return (
                  <div key={i} className="relative group scroll-mt-20 lg:scroll-mt-0" ref={(el) => { cardRefs.current[i] = el; }}>
                    {/* Timeline Node */}
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
                      className="absolute -left-[16px] md:-left-[24px] -translate-x-1/2 top-6 w-3 h-3 md:w-4 md:h-4 rounded-full bg-white border-2 border-blue-500/60 z-10 group-hover:scale-125 group-hover:border-blue-400 transition-all duration-300"
                    />

                    <div className={`wow-card flex flex-col transition-all duration-500 ${isExpanded ? 'ring-1 ring-gray-600/30' : 'overflow-hidden'}`}>
                      <div className="wow-card-border" />
                      <button 
                        onClick={() => {
                          startTransition(() => {
                            const nextExpanded = isExpanded ? null : i;
                            setExpandedQual(nextExpanded);
                            if (nextExpanded !== null) {
                                setTimeout(() => {
                                    cardRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }, 500);
                            }
                          });
                        }}
                        className="w-full text-left p-3 md:p-4 flex justify-between items-center group/btn relative z-10"
                      >
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-3">
                            <h3 className="text-[15px] md:text-base font-semibold text-black dark:text-white leading-tight group-hover/btn:text-blue-400 transition-colors">{qual.title}</h3>
                            <span className="hidden sm:inline-block text-gray-800 dark:text-white/70 font-mono text-[10px] bg-gray-600/20 border border-gray-600/30 px-2 py-0.5 rounded-md">{qual.date}</span>
                          </div>
                          <span className="text-black/80 dark:text-white/80 text-[13px] md:text-[14px]">{qual.company}</span>
                        </div>
                        <div className={`w-7 h-7 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-brand-blue/20 border-brand-blue/40' : ''}`}>
                          <svg className="w-3 h-3 text-black/50 dark:text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      <div className={`transition-all duration-500 ease-in-out relative z-10 ${isExpanded ? 'max-h-[none] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        <div className="px-4 pb-4 md:px-5 md:pb-5 flex flex-col gap-3">
                          <div className="w-full h-[1px] bg-black/5 dark:bg-white/5 shrink-0" />
                          <div className="sm:hidden mb-1">
                            <span className="text-gray-800 dark:text-white/70 font-mono text-[10px] bg-gray-600/20 border border-gray-600/30 px-2 py-0.5 rounded-md">{qual.date}</span>
                          </div>
                          {qual.desc && (
                            <div className="text-black/70 dark:text-white/70 text-[14px] md:text-[15px] leading-relaxed [&_strong]:text-black dark:[&_strong]:text-white [&_strong]:font-bold [&_p]:mb-4">
                              <ReactMarkdown>{qual.desc}</ReactMarkdown>
                            </div>
                          )}
                          {qual.content && (
                            <div className="flex flex-wrap gap-2">
                              {qual.content.map((item: string, j: number) => (
                                <span key={j} className="px-2.5 py-1 rounded-full border border-gray-600/40 text-[12px] md:text-[13px] font-medium text-black dark:text-white">
                                  {item}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-1 mt-16 md:mt-24 pb-12 md:pb-20 w-full">
            {/* CTA Button */}
            <div className="flex flex-col items-center gap-1 shrink-0 w-fit mx-auto">
              <p className="text-black/70 text-[12px] md:text-[13px] text-center">
                {t.about.cta.text}
              </p>
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'cta_contact_click', {
                      'event_category': 'engagement',
                      'event_label': 'About Section CTA'
                    });
                  }
                  handleNavigate('contact');
                }}
                className="w-full flex items-center justify-center gap-2 rounded-full px-8 py-3 bg-blue-500/10 border border-blue-500/50 text-black text-[13px] md:text-[14px] font-medium tracking-wide shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:bg-blue-600/20 hover:border-blue-400 transition-all duration-300 cursor-pointer focus-ring"
              >
                <span className="relative z-10">{t.about.cta.button}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
  );
});

