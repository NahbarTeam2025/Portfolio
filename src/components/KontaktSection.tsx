import React, { useState, startTransition } from 'react';
import { User, Mail, Linkedin, MapPin, ChevronDown, Eye, EyeOff, Lock, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { PROTECTED_CONTENT_PASSWORD } from '../constants/auth';

export const KontaktSection = React.memo(({ 
  isSubmitting, 
  submitSuccess, 
  submitError, 
  privacyAccepted, 
  setPrivacyAccepted, 
  handleNavigate, 
  handleSubmit,
  isCvUnlocked,
  cvPasswordInput,
  setCvPasswordInput,
  cvError,
  setIsCvUnlocked,
  setCvError
}: any) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const handleUnlockCv = () => {
    if (cvPasswordInput === PROTECTED_CONTENT_PASSWORD) {
      setIsCvUnlocked(true);
      setCvError(false);
      setShowPasswordInput(false);
    } else {
      setCvError(true);
    }
  };

  return (
    <div className="flex flex-col items-start gap-1 md:gap-8 w-full h-full animate-in fade-in duration-500 overflow-y-auto md:overflow-hidden">
      <h1 className="heading-gradient fluid-h2 font-medium tracking-tight shrink-0">
        {t.contact.title}
      </h1>
      <div className="w-full h-[1px] bg-white/10 shrink-0" />
      <div className="flex flex-col lg:flex-row gap-4 md:gap-12 w-full max-w-[1200px] pt-1 md:pt-8 h-full">
        <div className="flex flex-col gap-2 md:gap-10 w-full lg:w-1/2">
          <div className="space-y-1 md:space-y-6">
            <h2 className="text-white text-[18px] md:text-[28px] font-medium leading-tight">{t.contact.subtitle}</h2>
            <p className="text-white/90 text-[13px] md:text-[18px] leading-relaxed">
              {t.contact.desc}
            </p>
          </div>
          
          <div className="flex flex-col gap-1 md:gap-6 relative">
            <div className="flex items-center gap-3 md:gap-5 group">
              <div className="flex items-center justify-center shrink-0">
                <User className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-white/80 text-[10px] md:text-[12px] uppercase tracking-widest font-bold">{t.contact.name}</span>
                <span className="text-white text-[13px] md:text-[18px]">Robert Erbach</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 md:gap-5 group">
              <div className="flex items-center justify-center shrink-0">
                <Mail className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-white/80 text-[10px] md:text-[12px] uppercase tracking-widest font-bold">{t.contact.email}</span>
                <a href="mailto:roberterbach@web.de" className="text-white text-[13px] md:text-[18px] hover:text-blue-400 transition-colors break-all">roberterbach@web.de</a>
              </div>
            </div>
            
            <div className="flex items-center gap-3 md:gap-5 group">
              <div className="flex items-center justify-center shrink-0">
                <Linkedin className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-white/80 text-[10px] md:text-[12px] uppercase tracking-widest font-bold">LinkedIn</span>
                <a href="https://www.linkedin.com/in/robert-erbach-a173b2371" target="_blank" rel="noopener noreferrer" className="text-white text-[13px] md:text-[18px] hover:text-blue-400 transition-colors break-all">@roberterbach</a>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-5 group">
              <div className="flex items-center justify-center shrink-0">
                <MapPin className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-white/80 text-[10px] md:text-[12px] uppercase tracking-widest font-bold">{t.contact.location}</span>
                <span className="text-white text-[13px] md:text-[18px]">{t.contact.locationValue}</span>
              </div>
            </div>

            {/* CV Download Section */}
            <div className="pt-6 md:pt-4">
              <div className="flex items-center gap-4 group">
                <div className="flex flex-col">
                  <span className="text-white/80 text-[10px] md:text-[12px] uppercase tracking-widest font-bold mb-1">{t.contact.downloadCV}</span>
                  <div className="flex items-center gap-3">
                    {isCvUnlocked ? (
                      <a 
                        href="https://meine-assets.pages.dev/Lebenslauf_Robert_Erbach.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-[13px] md:text-[16px] font-medium"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-400/10 flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <span>PDF herunterladen</span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setShowPasswordInput(!showPasswordInput)}
                          className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${showPasswordInput ? 'bg-blue-500' : 'bg-white/10'}`}
                        >
                          <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${showPasswordInput ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                        <span className="text-white/40 text-[12px] md:text-[14px] italic">{showPasswordInput ? 'Passwort eingeben...' : 'Klicken zum Freischalten'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {!isCvUnlocked && showPasswordInput && (
                <div className="mt-4 md:hidden">
                  {/* Mobile Password Input (Inline) */}
                  <div className="wow-card p-4 flex flex-col gap-3 max-w-[320px] animate-in slide-in-from-top-2 duration-300">
                    <div className="wow-card-border" />
                    <div className="relative z-10 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/60 text-[11px] uppercase tracking-wider font-bold">{t.contact.cvProtectedTitle}</span>
                        <button onClick={() => setShowPasswordInput(false)} className="text-white/40 hover:text-white"><ChevronDown className="rotate-180" size={16} /></button>
                      </div>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          placeholder={t.certificates.passwordPlaceholder}
                          value={cvPasswordInput}
                          onChange={(e) => setCvPasswordInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleUnlockCv()}
                          className={`w-full bg-white/5 border ${cvError ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-2.5 pr-10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-blue-400/50 transition-all`}
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {cvError && <p className="text-red-400 text-[10px]">{t.certificates.invalidPassword}</p>}
                      <button 
                        onClick={handleUnlockCv}
                        className="w-full bg-gradient-to-r from-brand-blue to-blue-400 text-white text-sm font-bold py-2.5 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        {t.certificates.unlockButton}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Password Overlay */}
            {!isCvUnlocked && showPasswordInput && (
              <div className="hidden md:flex absolute inset-0 z-20 bg-[#0f1115] items-center justify-center rounded-2xl border border-white/10 p-6 animate-in fade-in duration-300">
                <div className="w-full max-w-[300px] space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-[12px] uppercase tracking-wider font-bold">{t.contact.cvProtectedTitle}</span>
                    <button onClick={() => setShowPasswordInput(false)} className="text-white/40 hover:text-white"><X size={18} /></button>
                  </div>
                  <p className="text-white/80 text-sm">{t.contact.cvProtectedDesc}</p>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder={t.certificates.passwordPlaceholder}
                      value={cvPasswordInput}
                      onChange={(e) => setCvPasswordInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleUnlockCv()}
                      className={`w-full bg-white/5 border ${cvError ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 pr-12 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-400/50 transition-all`}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {cvError && <p className="text-red-400 text-xs">{t.certificates.invalidPassword}</p>}
                  <button 
                    onClick={handleUnlockCv}
                    className="w-full bg-gradient-to-r from-brand-blue to-blue-400 text-white font-bold py-3 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    {t.certificates.unlockButton}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="wow-card parallax-element p-4 md:p-8 relative h-full">
            <div className="wow-card-border" />
            <div className="relative z-10 h-full">
              {submitSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 md:py-12 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-400/10 flex items-center justify-center border border-blue-400/20 mb-4 md:mb-6">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{t.contact.successTitle}</h3>
                  <p className="text-white/60 text-sm md:text-base">{t.contact.successDesc}</p>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center justify-between w-full text-left text-white font-medium text-[15px] md:text-[18px] hover:text-blue-400 transition-colors md:hidden mb-2"
                  >
                    <span>{isExpanded ? t.contact.formClose : t.contact.formOpen}</span>
                    <ChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} md:grid-rows-[1fr] md:opacity-100`}>
                    <div className="overflow-hidden">
                      <h3 className="text-white font-medium text-[16px] md:text-[18px] mb-4 hidden md:block">{t.contact.formTitle}</h3>
                      <form action="https://api.web3forms.com/submit" method="POST" className="flex flex-col gap-1.5 md:gap-4">
                        <input type="hidden" name="access_key" value="1ebce7a4-5cb3-49d8-b826-2be2c6447608" />
                        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                        {submitError && (
                          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs md:text-sm">
                            {t.contact.error}
                          </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-4">
                          <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="text-white font-medium text-[11px] md:text-[13px]">{t.contact.name}</label>
                            <input 
                              type="text" 
                              id="name" 
                              name="name"
                              placeholder={t.contact.placeholderName} 
                              required
                              className="bg-white/15 border border-white/25 rounded-xl px-3 py-2 text-[12px] md:text-[14px] text-white placeholder:text-white/75 focus:outline-none focus:border-blue-400/50 focus:bg-white/20 transition-all"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-white font-medium text-[11px] md:text-[13px]">{t.contact.email}</label>
                            <input 
                              type="email" 
                              id="email" 
                              name="email"
                              placeholder={t.contact.placeholderEmail} 
                              required
                              className="bg-white/15 border border-white/25 rounded-xl px-3 py-2 text-[12px] md:text-[14px] text-white placeholder:text-white/75 focus:outline-none focus:border-blue-400/50 focus:bg-white/20 transition-all"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label htmlFor="message" className="text-white font-medium text-[11px] md:text-[13px]">{t.contact.message}</label>
                          <textarea 
                            id="message" 
                            name="message"
                            placeholder={t.contact.placeholderMessage} 
                            required
                            rows={3}
                            className="bg-white/15 border border-white/25 rounded-xl px-3 py-2 text-[12px] md:text-[14px] text-white placeholder:text-white/75 focus:outline-none focus:border-blue-400/50 focus:bg-white/20 transition-all resize-none"
                          />
                        </div>
                        <div className="flex items-start gap-2 mt-0">
                          <input 
                            type="checkbox" 
                            id="privacy" 
                            name="privacy"
                            checked={privacyAccepted}
                            onChange={(e) => startTransition(() => setPrivacyAccepted(e.target.checked))}
                            className="mt-1 w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-blue-400 focus:ring-blue-400 focus:ring-offset-0 cursor-pointer"
                            required
                          />
                          <label htmlFor="privacy" className="text-[10px] md:text-[12px] text-white leading-relaxed cursor-pointer">
                            {t.contact.privacy.split(t.contact.privacyLink)[0]}
                            <button type="button" onClick={() => handleNavigate('Datenschutz')} className="text-blue-400 hover:underline focus-ring">{t.contact.privacyLink}</button>
                            {t.contact.privacy.split(t.contact.privacyLink)[1]}
                          </label>
                        </div>
                        <button 
                          type="submit" 
                          disabled={!privacyAccepted || isSubmitting}
                          className={`mt-0 text-white text-[12px] md:text-sm font-bold py-2 px-6 rounded-xl transition-all focus-ring ${privacyAccepted && !isSubmitting ? 'bg-gradient-to-r from-brand-blue to-blue-400 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/10 text-white/40 cursor-not-allowed'}`}
                        >
                          {isSubmitting ? t.contact.sending : t.contact.send}
                        </button>
                        <p className="text-white/70 text-[10px] md:text-xs text-center mt-0">{t.contact.responseTime}</p>
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

