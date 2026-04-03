import React, { useState, startTransition } from 'react';
import { User, Mail, Linkedin, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/analytics';

export const KontaktSection = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-start gap-1 md:gap-2 w-full h-full animate-in fade-in duration-500 overflow-y-auto md:overflow-hidden">
      <h1 className="heading-gradient fluid-h2 font-medium tracking-tight shrink-0">
        {t.contact.title}
      </h1>
      <div className="w-full h-[1px] bg-black/10 shrink-0" />
      <div className="flex flex-col gap-2 md:gap-3 w-full max-w-2xl mx-auto pt-1 md:pt-2 h-full">
        <div className="flex flex-col gap-3 md:gap-2 w-full">
          <div className="space-y-1 md:space-y-1 text-center">
            <h2 className="text-black text-[20px] md:text-[28px] font-medium leading-tight">{t.contact.subtitle}</h2>
            <p className="text-black/90 text-[15px] md:text-[18px] leading-relaxed whitespace-normal md:whitespace-pre-line">
              {t.contact.desc}
            </p>
          </div>
          
          <div className="wow-card flex flex-col gap-3 md:gap-4 relative p-4 md:p-6">
            <div className="wow-card-border" />
            <div className="flex items-center gap-3 md:gap-4 group relative z-10">
              <User className="text-black w-5 h-5 md:w-6 md:h-6" />
              <div className="flex flex-col">
                <span className="text-black/60 text-[11px] md:text-[13px] uppercase tracking-widest font-bold">{t.contact.name}</span>
                <span className="text-black text-[16px] md:text-[18px] font-medium">Robert Erbach</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 md:gap-4 group">
              <Mail className="text-black w-5 h-5 md:w-6 md:h-6" />
              <div className="flex flex-col">
                <span className="text-black/60 text-[11px] md:text-[13px] uppercase tracking-widest font-bold">{t.contact.email}</span>
                <a 
                  href="mailto:roberterbach@web.de" 
                  onClick={() => {
                    trackEvent('click', 'email', 'contact', { email: 'roberterbach@web.de' });
                  }}
                  className="text-black text-[16px] md:text-[18px] font-medium hover:!text-blue-500 transition-colors break-all"
                >
                  roberterbach@web.de
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3 md:gap-4 group">
              <Linkedin className="text-black w-5 h-5 md:w-6 md:h-6" />
              <div className="flex flex-col">
                <span className="text-black/60 text-[11px] md:text-[13px] uppercase tracking-widest font-bold">LinkedIn</span>
                <a 
                  href="https://www.linkedin.com/in/robert-erbach-a173b2371" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => {
                    trackEvent('click', 'linkedin', 'contact');
                  }}
                  className="text-black text-[16px] md:text-[18px] font-medium hover:!text-blue-500 transition-colors break-all"
                >
                  @roberterbach
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3 md:gap-4 group">
              <MapPin className="text-black w-5 h-5 md:w-6 md:h-6" />
              <div className="flex flex-col">
                <span className="text-black/60 text-[11px] md:text-[13px] uppercase tracking-widest font-bold">{t.contact.location}</span>
                <span className="text-black text-[16px] md:text-[18px] font-medium">{t.contact.locationValue}</span>
              </div>
            </div>

            {/* CV Download Section */}
            <div className="pt-3 md:pt-4 mt-1 border-t border-black/10">
              <div className="flex flex-col items-center w-fit mx-auto">
                <span className="text-black/60 text-[10px] md:text-[12px] uppercase tracking-widest font-bold mb-3 text-center w-full">{t.contact.downloadCV}</span>
                
                <a 
                  href="https://meine-assets.pages.dev/pdf/robert_erbach_lebenslauf.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  onClick={() => {
                    trackEvent('download', 'cv', 'contact', { file: 'robert_erbach_lebenslauf.pdf' });
                  }}
                  className="flex items-center justify-center w-full gap-2 rounded-full px-4 py-3.5 bg-green-500/10 border border-green-500/50 text-black text-[13px] md:text-[15px] font-medium tracking-wide shadow-[0_0_15px_rgba(74,222,128,0.2)] hover:shadow-[0_0_25px_rgba(74,222,128,0.4)] hover:bg-green-500/20 hover:border-green-400 transition-all duration-300 cursor-pointer focus-ring"
                >
                  <span className="relative z-10">{t.contact.downloadButton}</span>
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

