import React, { useState, startTransition } from 'react';
import { User, Mail, Linkedin, MapPin, ChevronDown, Eye, EyeOff, Lock, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const KontaktSection = React.memo(({ 
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

  const handleUnlockCv = async () => {
    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: cvPasswordInput }),
      });

      if (response.ok) {
        setIsCvUnlocked(true);
        setCvError(false);
        setShowPasswordInput(false);
      } else {
        const data = await response.json();
        setCvError(true);
        // Optional: Hier könnte man die Fehlermeldung vom Server anzeigen
        console.warn(data.message || 'Ungültiges Passwort');
      }
    } catch (error) {
      console.error('Fehler bei der Passwortprüfung:', error);
      setCvError(true);
    }
  };

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
                <div className="flex flex-col w-full">
                  <span className="text-white/60 text-[10px] md:text-[12px] uppercase tracking-widest font-bold mb-2">{t.contact.downloadCV}</span>
                  <div className="flex items-center gap-2">
                    {isCvUnlocked ? (
                      <a 
                        href="https://meine-assets.pages.dev/Lebenslauf_Robert_Erbach.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors text-[13px] md:text-[15px] font-medium py-2.5 rounded-xl"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>{t.contact.downloadButton}</span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 w-full bg-black/20 p-3 rounded-xl border border-white/5">
                        <button 
                          onClick={() => setShowPasswordInput(!showPasswordInput)}
                          className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${showPasswordInput ? 'bg-blue-500' : 'bg-white/20'}`}
                        >
                          <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${showPasswordInput ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                        <span className="text-white/60 text-[12px] md:text-[14px] italic">{showPasswordInput ? t.contact.passwordPrompt : t.contact.unlockPrompt}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {!isCvUnlocked && showPasswordInput && (
                <div className="mt-4">
                  {/* Password Input */}
                  <div className="flex flex-col gap-3 animate-in slide-in-from-top-2 duration-300">
                    <div className="relative z-10 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/60 text-[11px] uppercase tracking-wider font-bold">{t.contact.cvProtectedTitle}</span>
                      </div>
                      <div className="relative">
                        <input 
                          id="cv-password"
                          name="cv-password"
                          type={showPassword ? "text" : "password"} 
                          placeholder={t.certificates.passwordPlaceholder}
                          value={cvPasswordInput}
                          onChange={(e) => setCvPasswordInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleUnlockCv()}
                          className={`w-full bg-black/40 border ${cvError ? 'border-red-500/50' : 'border-white/20'} rounded-xl px-4 py-3 pr-10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-all`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {cvError && <p className="text-red-400 text-[12px]">{t.certificates.invalidPassword}</p>}
                      <button 
                        onClick={handleUnlockCv}
                        className="w-full bg-white text-black text-sm font-bold py-3 rounded-xl hover:bg-gray-200 active:scale-[0.98] transition-all"
                      >
                        {t.certificates.unlockButton}
                      </button>
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

