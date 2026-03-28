import React, { useState, startTransition } from 'react';
import { User, Mail, Linkedin, MapPin, ChevronDown, Eye, EyeOff, Lock, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const KontaktSection = React.memo(() => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-start gap-1 md:gap-2 w-full h-full animate-in fade-in duration-500 overflow-y-auto md:overflow-hidden">
      <h1 className="heading-gradient text-2xl md:text-4xl font-medium tracking-tight shrink-0">
        {t.contact.title}
      </h1>
      <div className="w-full h-[1px] bg-white/10 shrink-0" />
      <div className="flex flex-col gap-2 md:gap-3 w-full max-w-2xl mx-auto pt-1 md:pt-2 h-full">
        <div className="flex flex-col gap-3 md:gap-2 w-full">
          <div className="space-y-1 md:space-y-1 text-center">
            <h2 className="text-white text-[20px] md:text-[28px] font-medium leading-tight">{t.contact.subtitle}</h2>
            <p className="text-white/90 text-[15px] md:text-[18px] leading-relaxed">
              {t.contact.desc}
            </p>
          </div>
          
          <div className="wow-card flex flex-col gap-3 md:gap-4 relative p-4 md:p-6">
            <div className="wow-card-border" />
            <div className="flex items-center gap-3 md:gap-4 group relative z-10">
              <div className="flex items-center justify-center shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 border border-white/20 group-hover:bg-white/20 transition-colors">
                <User className="text-white w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-white/60 text-[11px] md:text-[13px] uppercase tracking-widest font-bold">{t.contact.name}</span>
                <span className="text-white text-[16px] md:text-[18px] font-medium">Robert Erbach</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 md:gap-4 group">
              <div className="flex items-center justify-center shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 border border-white/20 group-hover:bg-white/20 transition-colors">
                <Mail className="text-white w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-white/60 text-[11px] md:text-[13px] uppercase tracking-widest font-bold">{t.contact.email}</span>
                <a href="mailto:roberterbach@web.de" className="text-white text-[16px] md:text-[18px] font-medium hover:text-blue-400 transition-colors break-all">roberterbach@web.de</a>
              </div>
            </div>
            
            <div className="flex items-center gap-3 md:gap-4 group">
              <div className="flex items-center justify-center shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 border border-white/20 group-hover:bg-white/20 transition-colors">
                <Linkedin className="text-white w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-white/60 text-[11px] md:text-[13px] uppercase tracking-widest font-bold">LinkedIn</span>
                <a href="https://www.linkedin.com/in/robert-erbach-a173b2371" target="_blank" rel="noopener noreferrer" className="text-white text-[16px] md:text-[18px] font-medium hover:text-blue-400 transition-colors break-all">@roberterbach</a>
              </div>
            </div>
            
            <div className="flex items-center gap-3 md:gap-4 group">
              <div className="flex items-center justify-center shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 border border-white/20 group-hover:bg-white/20 transition-colors">
                <MapPin className="text-white w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-white/60 text-[11px] md:text-[13px] uppercase tracking-widest font-bold">{t.contact.location}</span>
                <span className="text-white text-[16px] md:text-[18px] font-medium">{t.contact.locationValue}</span>
              </div>
            </div>

            {/* CV Download Section */}
            <div className="pt-3 md:pt-4 mt-1 border-t border-white/10">
              <div className="flex items-center gap-3 group">
                <div className="flex flex-col w-full items-center">
                  <span className="text-white/60 text-[10px] md:text-[12px] uppercase tracking-widest font-bold mb-3 text-center">{t.contact.downloadCV}</span>
                  <div className="flex items-center gap-2 w-full">
                      <a 
                        href="https://meine-assets.pages.dev/Lebenslauf_Robert_Erbach.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => {
                          if (typeof window !== 'undefined' && (window as any).gtag) {
                            (window as any).gtag('event', 'cv_download', {
                              'event_category': 'engagement',
                              'event_label': 'Lebenslauf_Robert_Erbach.pdf'
                            });
                          }
                        }}
                        className="flex items-center justify-center w-full gap-2 rounded-xl px-6 py-3 bg-black/10 border border-green-500/60 text-green-50 text-[13px] md:text-[15px] font-bold tracking-wide shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:shadow-[0_0_25px_rgba(34,197,94,0.8)] hover:bg-green-500/20 hover:border-green-400 transition-all duration-300 cursor-pointer focus-ring"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="relative z-10">{t.contact.downloadButton}</span>
                      </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

