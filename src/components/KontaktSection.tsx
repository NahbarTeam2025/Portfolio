import React, { useState, startTransition } from 'react';
import { User, Mail, Linkedin, MapPin, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const KontaktSection = React.memo(({ isSubmitting, submitSuccess, submitError, privacyAccepted, setPrivacyAccepted, handleNavigate, handleSubmit }: any) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col items-start gap-4 md:gap-8 w-full h-full animate-in fade-in duration-500 overflow-y-auto md:overflow-hidden">
      <h1 className="heading-gradient fluid-h2 font-medium tracking-tight shrink-0">
        {t.contact.title}
      </h1>
      <div className="w-full h-[1px] bg-white/10 shrink-0" />
      <div className="flex flex-col lg:flex-row gap-8 md:gap-12 w-full max-w-[1200px] pt-4 md:pt-8 h-full">
        <div className="flex flex-col gap-6 md:gap-10 w-full lg:w-1/2">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-white text-[20px] md:text-[28px] font-medium leading-tight">{t.contact.subtitle}</h2>
            <p className="text-white/90 text-[14px] md:text-[18px] leading-relaxed">
              {t.contact.desc}
            </p>
          </div>
          
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-center gap-4 md:gap-5 group">
              <div className="flex items-center justify-center shrink-0">
                <User className="text-white" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-white/80 text-[11px] md:text-[12px] uppercase tracking-widest font-bold">{t.contact.name}</span>
                <span className="text-white text-[14px] md:text-[18px]">Robert Erbach</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 md:gap-5 group">
              <div className="flex items-center justify-center shrink-0">
                <Mail className="text-white" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-white/80 text-[11px] md:text-[12px] uppercase tracking-widest font-bold">{t.contact.email}</span>
                <a href="mailto:roberterbach@web.de" className="text-white text-[14px] md:text-[18px] hover:text-blue-400 transition-colors break-all">roberterbach@web.de</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4 md:gap-5 group">
              <div className="flex items-center justify-center shrink-0">
                <Linkedin className="text-white" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-white/80 text-[11px] md:text-[12px] uppercase tracking-widest font-bold">LinkedIn</span>
                <a href="https://www.linkedin.com/in/robert-erbach-a173b2371" target="_blank" rel="noopener noreferrer" className="text-white text-[14px] md:text-[18px] hover:text-blue-400 transition-colors break-all">@roberterbach</a>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-5 group">
              <div className="flex items-center justify-center shrink-0">
                <MapPin className="text-white" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-white/80 text-[11px] md:text-[12px] uppercase tracking-widest font-bold">{t.contact.location}</span>
                <span className="text-white text-[14px] md:text-[18px]">Falkenberg/Elster</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="wow-card parallax-element p-6 md:p-8 relative h-full">
            <div className="wow-card-border" />
            <div className="relative z-10 h-full">
              {submitSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 rounded-full bg-blue-400/10 flex items-center justify-center border border-blue-400/20 mb-6">
                    <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-2">{t.contact.successTitle}</h3>
                  <p className="text-white/60">{t.contact.successDesc}</p>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center justify-between w-full text-left text-white font-medium text-[16px] md:text-[18px] hover:text-blue-400 transition-colors md:hidden mb-6"
                  >
                    <span>{isExpanded ? t.contact.formClose : t.contact.formOpen}</span>
                    <ChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} md:grid-rows-[1fr] md:opacity-100`}>
                    <div className="overflow-hidden">
                      <h3 className="text-white font-medium text-[16px] md:text-[18px] mb-6 hidden md:block">{t.contact.formTitle}</h3>
                      <form action="https://api.web3forms.com/submit" method="POST" className="flex flex-col gap-3 md:gap-4">
                        <input type="hidden" name="access_key" value="1ebce7a4-5cb3-49d8-b826-2be2c6447608" />
                        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                        {submitError && (
                          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
                            {t.contact.error}
                          </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                          <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="text-white font-medium text-[12px] md:text-[13px]">{t.contact.name}</label>
                            <input 
                              type="text" 
                              id="name" 
                              name="name"
                              placeholder={t.contact.placeholderName} 
                              required
                              className="bg-white/15 border border-white/25 rounded-xl px-3 py-2 text-[13px] md:text-[14px] text-white placeholder:text-white/75 focus:outline-none focus:border-blue-400/50 focus:bg-white/20 transition-all"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-white font-medium text-[12px] md:text-[13px]">{t.contact.email}</label>
                            <input 
                              type="email" 
                              id="email" 
                              name="email"
                              placeholder={t.contact.placeholderEmail} 
                              required
                              className="bg-white/15 border border-white/25 rounded-xl px-3 py-2 text-[13px] md:text-[14px] text-white placeholder:text-white/75 focus:outline-none focus:border-blue-400/50 focus:bg-white/20 transition-all"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label htmlFor="message" className="text-white font-medium text-[12px] md:text-[13px]">{t.contact.message}</label>
                          <textarea 
                            id="message" 
                            name="message"
                            placeholder={t.contact.placeholderMessage} 
                            required
                            rows={3}
                            className="bg-white/15 border border-white/25 rounded-xl px-3 py-2 text-[13px] md:text-[14px] text-white placeholder:text-white/75 focus:outline-none focus:border-blue-400/50 focus:bg-white/20 transition-all resize-none"
                          />
                        </div>
                        <div className="flex items-start gap-2 mt-1">
                          <input 
                            type="checkbox" 
                            id="privacy" 
                            name="privacy"
                            checked={privacyAccepted}
                            onChange={(e) => startTransition(() => setPrivacyAccepted(e.target.checked))}
                            className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-blue-400 focus:ring-blue-400 focus:ring-offset-0 cursor-pointer"
                            required
                          />
                          <label htmlFor="privacy" className="text-[11px] md:text-[12px] text-white leading-relaxed cursor-pointer">
                            {t.contact.privacy.split(t.contact.privacyLink)[0]}
                            <button type="button" onClick={() => handleNavigate('Datenschutz')} className="text-blue-400 hover:underline focus-ring">{t.contact.privacyLink}</button>
                            {t.contact.privacy.split(t.contact.privacyLink)[1]}
                          </label>
                        </div>
                        <button 
                          type="submit" 
                          disabled={!privacyAccepted || isSubmitting}
                          className={`mt-1 text-white text-[13px] md:text-sm font-bold py-2 px-6 rounded-xl transition-all focus-ring ${privacyAccepted && !isSubmitting ? 'bg-gradient-to-r from-brand-blue to-blue-400 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/10 text-white/40 cursor-not-allowed'}`}
                        >
                          {isSubmitting ? t.contact.sending : t.contact.send}
                        </button>
                        <p className="text-white/70 text-[11px] md:text-xs text-center mt-1">{t.contact.responseTime}</p>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
