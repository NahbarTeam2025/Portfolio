import React, { startTransition, useState } from 'react';
import { ExternalLink, ChevronDown, Eye, EyeOff } from 'lucide-react';

export const ZertifikateSection = React.memo(({ expandedCert, setExpandedCert, isCertUnlocked, certPasswordInput, setCertPasswordInput, certError, setIsCertUnlocked, setCertError, handleNavigate }: any) => {
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const certs = [
    { id: 1, title: 'Digital Marketing Manager', issuer: 'GFN GmbH' },
    { id: 2, title: 'Content Marketing Manager', issuer: 'GFN GmbH' },
    { id: 3, title: 'E-Commerce Manager/Assistenz', issuer: 'GFN GmbH' },
    { id: 4, title: 'Neuromarketing', issuer: 'GFN GmbH' },
    { id: 5, title: 'Social Media Marketing', issuer: 'GFN GmbH' },
    { id: 6, title: 'SEO', issuer: 'GFN GmbH' },
    { id: 7, title: 'PPC-Manager', issuer: 'GFN GmbH' },
    { id: 8, title: 'Web Analytics', issuer: 'GFN GmbH' },
    { id: 9, title: 'Web Analytics via Google Tag Manager', issuer: 'GFN GmbH' },
    { id: 10, title: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic' }
  ];

  // On mobile, we only show the first 4 if not expanded
  const visibleCerts = certs.filter((_, i) => {
    if (expandedCert !== null) return expandedCert === i;
    return true;
  });

  return (
    <div className="flex flex-col items-start gap-4 md:gap-6 w-full flex-grow animate-in fade-in duration-500">
      <h1 className="heading-gradient text-[24px] md:text-[32px] lg:text-[40px] font-medium leading-[1.28] tracking-tight shrink-0">
        Zertifikate
      </h1>
      <div className="w-full h-[1px] bg-white/10 shrink-0" />
      <div className={`grid grid-cols-1 ${expandedCert === null ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[1400px]' : 'max-w-[800px] mx-auto'} gap-3 md:gap-4 w-full pb-0 md:pb-4`}>
        {visibleCerts.map((cert, i) => {
          const actualIndex = certs.findIndex(c => c.id === cert.id);
          const isExpanded = expandedCert !== null;
          
          // Mobile visibility logic
          const isHiddenOnMobile = !showAllCerts && actualIndex >= 4 && !isExpanded;

          return (
            <div 
              key={cert.id} 
              className={`relative group ${isExpanded ? 'flex-1 min-h-0' : ''} ${isHiddenOnMobile ? 'hidden md:block' : 'block'}`}
            >
              <div 
                className={`wow-card flex flex-col h-full ${isExpanded ? 'flex-1 min-h-0 ring-1 ring-blue-400/30' : 'overflow-hidden'}`}
              >
                <div className="wow-card-border" />
                <button 
                  onClick={() => {
                    startTransition(() => {
                      setExpandedCert(isExpanded ? null : actualIndex);
                    });
                  }}
                  className={`w-full text-left p-4 md:p-5 flex justify-between items-center group/btn relative z-10 ${isExpanded ? 'shrink-0' : 'min-h-[80px]'}`}
                >
                  <div className="flex flex-col gap-1 pr-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-[14px] md:text-[15px] font-semibold text-white leading-tight group-hover/btn:text-blue-400 transition-colors">{cert.title}</h3>
                    </div>
                    <span className="text-white/80 text-[11px] md:text-[12px]">{cert.issuer}</span>
                  </div>
                  <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-brand-blue/20 border-brand-blue/40' : ''}`}>
                    <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <div 
                  className={`transition-all duration-500 ease-in-out relative z-10 ${isExpanded ? 'flex-1 min-h-0 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                >
                  <div className="px-5 pb-5 md:px-6 md:pb-6 flex flex-col gap-6 h-full">
                    <div className="w-full h-[1px] bg-white/5 shrink-0" />
                    
                    {!isCertUnlocked ? (
                      <div className="flex flex-col items-center justify-center gap-4 py-6 px-4 text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-400/10 flex items-center justify-center border border-blue-400/20">
                          <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-white font-medium text-lg">Geschützter Bereich</h4>
                          <p className="text-white/60 text-sm max-w-[300px]">Bitte gib das Passwort ein, um die Zertifikate einzusehen.</p>
                        </div>
                        <div className="w-full max-w-[280px] space-y-3">
                          <div className="relative">
                            <input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="Passwort"
                              value={certPasswordInput}
                              onChange={(e) => setCertPasswordInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  if (certPasswordInput === 'REZ2026') {
                                    setIsCertUnlocked(true);
                                    setCertError(false);
                                  } else {
                                    setCertError(true);
                                  }
                                }
                              }}
                              className={`w-full bg-white/5 border ${certError ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 pr-12 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-400/50 transition-all`}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1"
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                          {certError && <p className="text-red-400 text-xs">Ungültiges Passwort</p>}
                          <button 
                            onClick={() => {
                              if (certPasswordInput === 'REZ2026') {
                                setIsCertUnlocked(true);
                                setCertError(false);
                              } else {
                                setCertError(true);
                              }
                            }}
                            className="w-full bg-gradient-to-r from-brand-blue to-blue-400 text-white font-bold py-3 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                          >
                            Entsperren
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center gap-4 py-4">
                        <div className="relative group/cert w-full max-w-[320px] aspect-[1.414/1] bg-white/5 rounded-lg border border-white/10 overflow-hidden shadow-2xl">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-brand-blue/5" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                            <div className="w-10 h-10 mb-2 text-blue-400/40">
                              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            </div>
                            <h5 className="text-white font-bold text-lg mb-1">{cert.title}</h5>
                            <p className="text-white/40 text-xs">{cert.issuer}</p>
                            <div className="mt-4 pt-4 border-t border-white/10 w-full">
                              <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-white/20 font-bold">
                                <span>Zertifikat ID: {cert.id}00X-2026</span>
                                <span>Verifiziert</span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/cert:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                            <button className="bg-white text-black font-bold py-2 px-6 rounded-xl flex items-center gap-2 hover:scale-105 transition-transform">
                              <ExternalLink size={16} />
                              Ansehen
                            </button>
                          </div>
                        </div>
                        <p className="text-white/40 text-xs italic">Vorschau des Zertifikats. Klicken Sie zum Vergrößern.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More Button for Mobile */}
      {!showAllCerts && certs.length > 4 && expandedCert === null && (
        <div className="w-full flex justify-center md:hidden pb-0 pt-0 shrink-0">
          <button 
            onClick={() => setShowAllCerts(true)}
            className="flex items-center gap-2 px-6 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 hover:text-white transition-all group"
          >
            Alle Zertifikate anzeigen
            <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      )}

      {/* CTA Button */}
      <div className="w-full flex flex-col items-center justify-center pb-32 md:pb-4 pt-0 md:pt-4 gap-2 md:gap-3 mt-auto shrink-0">
        <p className="text-white/80 text-sm md:text-base text-center">
          Die Zertifikate geben einen guten Überblick – bei Interesse mehr.
        </p>
        <button 
          onClick={() => handleNavigate('Kontakt')}
          className="w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3 bg-black/40 border border-blue-500/60 text-blue-50 text-[14px] md:text-[15px] font-semibold tracking-wide shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 cursor-pointer"
        >
          <span className="relative z-10">Fragen zu den Zertifikaten?</span>
          <span className="relative z-10">→</span>
        </button>
      </div>
    </div>
  );
});
