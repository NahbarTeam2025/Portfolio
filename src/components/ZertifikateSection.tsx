import React, { startTransition, useState } from 'react';
import { ExternalLink, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const ZertifikateSection = React.memo(({ expandedCert, setExpandedCert, handleNavigate }: any) => {
  const { t } = useLanguage();
  const [showAllCerts, setShowAllCerts] = useState(false);

  const certs = t.certificates.items;

  const gfnCerts = certs.filter((c: any) => c.issuer === 'GFN GmbH');
  const fawCerts = certs.filter((c: any) => c.issuer === 'FAW');
  const kiCerts = certs.filter((c: any) => c.issuer === 'Anthropic');

  // On mobile, we only show the first 3 if not expanded
  const visibleCerts = certs.filter((_: any, i: number) => {
    if (expandedCert !== null) return expandedCert === i;
    return true;
  });

  const renderCertCard = (cert: any) => {
    const actualIndex = certs.findIndex((c: any) => c.id === cert.id);
    const isExpanded = expandedCert !== null;
    
    // Mobile visibility logic
    const globalVisibleIndex = visibleCerts.findIndex((c: any) => c.id === cert.id);
    const isHiddenOnMobile = !showAllCerts && globalVisibleIndex >= 3 && !isExpanded;

    // If a certificate is expanded, only show the expanded one
    if (isExpanded && expandedCert !== actualIndex) return null;

    return (
      <div 
        key={cert.id} 
        className={`relative group transition-all duration-500 ${isExpanded ? 'flex-1 min-h-0 z-50' : 'z-10'} ${isHiddenOnMobile ? 'hidden md:block' : 'block'}`}
      >
        <div 
          className={`wow-card parallax-element flex flex-col h-full ${isExpanded ? 'flex-1 min-h-0 ring-1 ring-gray-400/30 expanded' : 'overflow-hidden'}`}
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
              
                <div className="flex-1 flex flex-col items-center justify-center gap-4 py-6">
                  {cert.url ? (
                    <a 
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      onClick={() => {
                        if (typeof window !== 'undefined' && (window as any).gtag) {
                          (window as any).gtag('event', 'download_certificate', {
                            'cert_title': cert.title
                          });
                        }
                      }}
                      className="flex items-center justify-center w-full max-w-[280px] gap-2 rounded-xl px-6 py-3 bg-black/10 border border-green-500/60 text-green-50 text-[13px] md:text-[15px] font-bold tracking-wide shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:shadow-[0_0_25px_rgba(34,197,94,0.8)] hover:bg-green-500/20 hover:border-green-400 transition-all duration-300 cursor-pointer focus-ring"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="relative z-10">{t.certificates.view}</span>
                    </a>
                  ) : (
                    <div 
                      onClick={() => {
                        if (typeof window !== 'undefined' && (window as any).gtag) {
                          (window as any).gtag('event', 'certificate_view_attempt', {
                            'event_category': 'engagement',
                            'event_label': cert.title
                          });
                        }
                      }}
                      className="flex items-center justify-center w-full max-w-[280px] gap-2 rounded-xl px-6 py-3 bg-black/10 border border-green-500/60 text-green-50 text-[13px] md:text-[15px] font-bold tracking-wide shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:shadow-[0_0_25px_rgba(34,197,94,0.8)] hover:bg-green-500/20 hover:border-green-400 transition-all duration-300 cursor-pointer focus-ring opacity-50"
                      title="Zertifikat bald verfügbar"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="relative z-10">{t.certificates.view}</span>
                    </div>
                  )}
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const isCategoryHiddenOnMobile = (categoryCerts: any[]) => {
    if (showAllCerts || expandedCert !== null) return false;
    return categoryCerts.every((cert: any) => {
      const globalVisibleIndex = visibleCerts.findIndex((c: any) => c.id === cert.id);
      return globalVisibleIndex >= 3;
    });
  };

  return (
    <div className="flex flex-col items-start gap-2 md:gap-3 w-full flex-grow animate-in fade-in duration-500">
      <h1 className="heading-gradient fluid-h2 font-medium tracking-tight shrink-0">
        {t.certificates.title}
      </h1>
      <div className="w-full h-[1px] bg-white/10 shrink-0" />
      
      <div className="w-full flex flex-col gap-6 md:gap-8 mt-2">
        {/* GFN GmbH Category */}
        {gfnCerts.length > 0 && (expandedCert === null || gfnCerts.some((c: any) => certs.findIndex((orig: any) => orig.id === c.id) === expandedCert)) && (
          <div className={`flex-col gap-3 ${isCategoryHiddenOnMobile(gfnCerts) ? 'hidden md:flex' : 'flex'}`}>
            {expandedCert === null && (
              <h2 className="text-lg md:text-xl font-bold text-white/90 px-1">GFN GmbH</h2>
            )}
            <div className={`grid grid-cols-1 ${expandedCert === null ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[1400px]' : 'max-w-[800px] mx-auto'} gap-2.5 md:gap-3 w-full pb-0 md:pb-1`}>
              {gfnCerts.map(renderCertCard)}
            </div>
          </div>
        )}

        {/* FAW Category */}
        {fawCerts.length > 0 && (expandedCert === null || fawCerts.some((c: any) => certs.findIndex((orig: any) => orig.id === c.id) === expandedCert)) && (
          <div className={`flex-col gap-3 ${isCategoryHiddenOnMobile(fawCerts) ? 'hidden md:flex' : 'flex'}`}>
            {expandedCert === null && (
              <h2 className="text-lg md:text-xl font-bold text-white/90 px-1">FAW</h2>
            )}
            <div className={`grid grid-cols-1 ${expandedCert === null ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[1400px]' : 'max-w-[800px] mx-auto'} gap-2.5 md:gap-3 w-full pb-0 md:pb-1`}>
              {fawCerts.map(renderCertCard)}
            </div>
          </div>
        )}

        {/* KI Category */}
        {kiCerts.length > 0 && (expandedCert === null || kiCerts.some((c: any) => certs.findIndex((orig: any) => orig.id === c.id) === expandedCert)) && (
          <div className={`flex-col gap-3 ${isCategoryHiddenOnMobile(kiCerts) ? 'hidden md:flex' : 'flex'}`}>
            {expandedCert === null && (
              <h2 className="text-lg md:text-xl font-bold text-white/90 px-1">KI</h2>
            )}
            <div className={`grid grid-cols-1 ${expandedCert === null ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[1400px]' : 'max-w-[800px] mx-auto'} gap-2.5 md:gap-3 w-full pb-0 md:pb-1`}>
              {kiCerts.map(renderCertCard)}
            </div>
          </div>
        )}
      </div>

      {/* Show More Button for Mobile */}
      {!showAllCerts && certs.length > 3 && expandedCert === null && (
        <div className="w-full flex justify-center md:hidden pb-0 pt-6 shrink-0">
          <button 
            onClick={() => setShowAllCerts(true)}
            className="flex items-center gap-2 px-6 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 hover:text-white transition-all group"
          >
            {t.certificates.showAll}
            <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      )}

      {/* CTA Button */}
      <div className="w-fit max-w-full mx-auto flex flex-col items-center justify-center pb-4 md:pb-4 pt-8 md:pt-2 gap-1 md:gap-1.5 mt-auto mb-8 md:mb-12 shrink-0">
        <p className="text-white/80 text-xs md:text-sm text-center whitespace-normal md:whitespace-nowrap">
          {t.certificates.ctaText}
        </p>
        <button 
          onClick={() => {
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'cta_contact_click', {
                'event_category': 'engagement',
                'event_label': 'Certificates Section CTA'
              });
            }
            handleNavigate('contact');
          }}
          className="w-full flex items-center justify-center gap-2 rounded-xl px-6 py-2 bg-black/40 border border-blue-500/60 text-blue-50 text-[13px] md:text-[14px] font-semibold tracking-wide shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 cursor-pointer focus-ring"
        >
          <span className="relative z-10">{t.certificates.ctaButton}</span>
        </button>
      </div>
    </div>
  );
});
