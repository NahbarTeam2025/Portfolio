import React, { startTransition } from 'react';
import { ExternalLink } from 'lucide-react';

export const ZertifikateSection = React.memo(({ expandedCert, setExpandedCert, isCertUnlocked, certPasswordInput, setCertPasswordInput, certError, setIsCertUnlocked, setCertError }: any) => {
  const certs = [
    { id: 1, title: 'Digital Marketing Manager', issuer: 'GFN GmbH', date: '2026' },
    { id: 2, title: 'SEO Spezialist', issuer: 'Google / Coursera', date: '2025' },
    { id: 3, title: 'Social Media Strategie', issuer: 'HubSpot Academy', date: '2025' },
    { id: 4, title: 'Web Analytics', issuer: 'Google Analytics', date: '2025' },
    { id: 5, title: 'KI im Marketing', issuer: 'LinkedIn Learning', date: '2024' },
    { id: 6, title: 'Kaufmännische Grundlagen', issuer: 'IBB', date: '2024' }
  ];

  return (
    <div className="flex flex-col items-start gap-4 md:gap-8 w-full animate-in fade-in duration-500">
      <h1 className="heading-gradient text-[28px] md:text-[40px] lg:text-[56px] font-medium leading-[1.28] tracking-tight shrink-0">
        Zertifikate
      </h1>
      <div className="w-full h-[1px] bg-white/10 shrink-0" />
      <div className={`grid grid-cols-1 ${expandedCert === null ? 'md:grid-cols-2 max-w-[1200px]' : 'max-w-[800px]'} gap-4 md:gap-6 w-full pb-32`}>
        {certs.filter((_, i) => expandedCert === null || expandedCert === i).map((cert, i) => {
          const actualIndex = expandedCert === null ? i : expandedCert;
          const isExpanded = expandedCert !== null;
          return (
            <div 
              key={cert.id} 
              className={`relative group ${isExpanded ? 'flex-1 min-h-0' : ''}`}
            >
              <div 
                className={`wow-card flex flex-col h-full ${isExpanded ? 'flex-1 min-h-0 ring-1 ring-brand-teal/30' : 'overflow-hidden'}`}
              >
                <div className="wow-card-border" />
                <button 
                  onClick={() => {
                    startTransition(() => {
                      setExpandedCert(isExpanded ? null : actualIndex);
                    });
                  }}
                  className={`w-full text-left p-5 md:p-6 flex justify-between items-center group/btn relative z-10 ${isExpanded ? 'shrink-0' : 'min-h-[90px]'}`}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base md:text-lg font-semibold text-white leading-tight group-hover/btn:text-brand-teal transition-colors">{cert.title}</h3>
                      <span className="text-brand-teal font-mono text-[10px] bg-brand-teal/10 px-2 py-0.5 rounded-md">{cert.date}</span>
                    </div>
                    <span className="text-white/60 text-[12px] md:text-[14px]">{cert.issuer}</span>
                  </div>
                  <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-brand-violet/20 border-brand-violet/40' : ''}`}>
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
                        <div className="w-16 h-16 rounded-full bg-brand-teal/10 flex items-center justify-center border border-brand-teal/20">
                          <svg className="w-8 h-8 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-white font-medium text-lg">Geschützter Bereich</h4>
                          <p className="text-white/60 text-sm max-w-[300px]">Bitte geben Sie das Passwort ein, um die Zertifikate einzusehen.</p>
                        </div>
                        <div className="w-full max-w-[280px] space-y-3">
                          <input 
                            type="password" 
                            placeholder="Passwort"
                            value={certPasswordInput}
                            onChange={(e) => setCertPasswordInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                if (certPasswordInput === 'Robert2026') {
                                  setIsCertUnlocked(true);
                                  setCertError(false);
                                } else {
                                  setCertError(true);
                                }
                              }
                            }}
                            className={`w-full bg-white/5 border ${certError ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-teal/50 transition-all`}
                          />
                          {certError && <p className="text-red-400 text-xs">Ungültiges Passwort</p>}
                          <button 
                            onClick={() => {
                              if (certPasswordInput === 'Robert2026') {
                                setIsCertUnlocked(true);
                                setCertError(false);
                              } else {
                                setCertError(true);
                              }
                            }}
                            className="w-full bg-gradient-to-r from-brand-violet to-brand-teal text-white font-bold py-3 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                          >
                            Entsperren
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center gap-4 py-4">
                        <div className="relative group/cert w-full max-w-[320px] aspect-[1.414/1] bg-white/5 rounded-lg border border-white/10 overflow-hidden shadow-2xl">
                          <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/5 to-brand-violet/5" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                            <div className="w-10 h-10 mb-2 text-brand-teal/40">
                              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            </div>
                            <h5 className="text-white font-bold text-lg mb-1">{cert.title}</h5>
                            <p className="text-white/40 text-xs">{cert.issuer} • {cert.date}</p>
                            <div className="mt-4 pt-4 border-t border-white/10 w-full">
                              <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-white/20 font-bold">
                                <span>Zertifikat ID: {cert.id}00X-2026</span>
                                <span>Verifiziert</span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/cert:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                            <button className="bg-white text-black font-bold py-2 px-6 rounded-full flex items-center gap-2 hover:scale-105 transition-transform">
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
    </div>
  );
});
