import React, { startTransition, useState } from 'react';
import { flushSync } from 'react-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/analytics';

export const ZertifikateSection = ({ 
  expandedCert, 
  setExpandedCert, 
  handleNavigate 
}: any) => {
  const { t } = useLanguage();

  const certs = t.certificates.items || [];

  const gfnCerts = certs.filter((c: any) => (c.issuer === 'GFN GmbH / WPI' || c.issuer === 'GFN GmbH') && c.category !== 'KI');
  const fawCerts = certs.filter((c: any) => c.issuer === 'FAW');
  const kiCerts = certs.filter((c: any) => c.category === 'KI');

  const renderCertCard = (cert: any) => {
    const actualIndex = certs.findIndex((c: any) => c.id === cert.id);
    const isExpanded = expandedCert !== null && expandedCert === actualIndex;
    
    if (expandedCert !== null && expandedCert !== actualIndex) return null;

    return (
      <div 
        key={cert.id} 
        id={`cert-${cert.id}`}
        className={`relative group transition-all duration-500 ${isExpanded ? 'flex-1 min-h-0 z-50' : 'z-10'}`}
      >
        <div 
          className={`wow-card flex flex-col h-full ${isExpanded ? 'flex-1 min-h-0 ring-1 ring-gray-600/30 expanded' : 'overflow-hidden'}`}
        >
          <div className="wow-card-border" />
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              
              if (isExpanded) {
                flushSync(() => {
                  setExpandedCert(null);
                });
                const newEl = document.getElementById(`cert-${cert.id}`);
                if (newEl) {
                  const y = newEl.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top: y, behavior: 'instant' });
                }
              } else {
                flushSync(() => {
                  setExpandedCert(actualIndex);
                });
                const newEl = document.getElementById(`cert-${cert.id}`);
                if (newEl) {
                  const y = newEl.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }
            }}
            className={`w-full text-left p-3 md:p-5 flex justify-between items-center group/btn relative z-10 ${isExpanded ? 'shrink-0' : 'min-h-[70px] md:min-h-[80px]'}`}
          >
            <div className="flex flex-col gap-1 pr-2">
              <div className="flex items-center gap-3">
                <h3 className="text-[14px] md:text-[15px] font-semibold text-black leading-tight group-hover/btn:text-blue-400 transition-colors">{cert.title}</h3>
              </div>
              <span className="text-black/80 text-[11px] md:text-[12px]">{cert.issuer}</span>
            </div>
            <div className={`w-8 h-8 rounded-full border border-black/20 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-brand-blue/20 border-brand-blue/40' : ''}`}>
              <svg className="w-4 h-4 text-black/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          <div 
            className={`transition-all duration-500 ease-in-out relative z-10 ${isExpanded ? 'flex-1 min-h-0 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
          >
            <div className="px-5 pb-5 md:px-6 md:pb-6 flex flex-col gap-4 h-full">
              <div className="w-full h-[1px] bg-black/5 shrink-0" />
              
              <div className="flex flex-col gap-1 text-[13px] md:text-[14px] text-black/60 font-light">
                <p>{t.certificates.issuerLabel} {cert.issuer}</p>
                <p>{cert.date}</p>
                {cert.info && <p>{cert.info}</p>}
              </div>

              <div className="flex-1 flex flex-col items-center justify-center gap-4 py-4">
                {cert.url ? (
                    <a 
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      onClick={() => {
                        const formattedTitle = cert.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '');
                        trackEvent('download', `cert_${formattedTitle}`, 'certificates', { cert_title: cert.title });
                      }}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full px-6 py-2.5 lg:px-8 lg:py-3.5 bg-green-500/15 border border-green-500/50 text-black text-[13px] lg:text-[15px] font-medium tracking-wide shadow-[0_0_15px_rgba(74,222,128,0.2)] hover:shadow-[0_0_25px_rgba(74,222,128,0.4)] hover:bg-green-500/25 hover:border-green-400 transition-all duration-300 cursor-pointer hover:scale-[0.98] active:scale-95"
                    >
                      <span className="relative z-10">{t.certificates.view}</span>
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 relative z-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </a>
                  ) : (
                    <div 
                      onClick={() => {
                        const formattedTitle = cert.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '');
                        trackEvent('click', `view_attempt_${formattedTitle}`, 'certificates', { cert_title: cert.title });
                      }}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full px-6 py-2.5 lg:px-8 lg:py-3.5 bg-green-500/15 border border-green-500/50 text-black text-[13px] lg:text-[15px] font-medium tracking-wide shadow-[0_0_15px_rgba(74,222,128,0.2)] hover:shadow-[0_0_25px_rgba(74,222,128,0.4)] hover:bg-green-500/25 hover:border-green-400 transition-all duration-300 cursor-pointer hover:scale-[0.98] active:scale-95 opacity-50"
                      title="Zertifikat bald verfügbar"
                    >
                      <span className="relative z-10">{t.certificates.view}</span>
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 relative z-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  )}
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-start gap-2 md:gap-3 w-full flex-grow animate-in fade-in duration-500">
      <h1 className="heading-gradient fluid-h2 font-medium tracking-tight shrink-0">
        {t.certificates.title}
      </h1>
      <div className="w-full h-[1px] bg-black/10 shrink-0" />
      
      <div className="w-full flex flex-col gap-4 md:gap-8 mt-1">
        {/* GFN GmbH Category */}
        {gfnCerts.length > 0 && (expandedCert === null || gfnCerts.some((c: any) => certs.findIndex((orig: any) => orig.id === c.id) === expandedCert)) && (
          <div className="flex flex-col gap-3 w-full">
            {expandedCert === null && (
              <h2 className="text-lg md:text-xl font-bold text-black/90 px-1">GFN GmbH / WPI</h2>
            )}
            <div className={`grid grid-cols-1 ${expandedCert === null ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[1400px]' : 'max-w-[800px] mx-auto'} gap-2 md:gap-3 w-full pb-0 md:pb-1`}>
              {gfnCerts.map(renderCertCard)}
            </div>
          </div>
        )}

        {/* FAW Category */}
        {fawCerts.length > 0 && (expandedCert === null || fawCerts.some((c: any) => certs.findIndex((orig: any) => orig.id === c.id) === expandedCert)) && (
          <div className="flex flex-col gap-3 w-full">
            {expandedCert === null && (
              <h2 className="text-lg md:text-xl font-bold text-black/90 px-1">FAW</h2>
            )}
            <div className={`grid grid-cols-1 ${expandedCert === null ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[1400px]' : 'max-w-[800px] mx-auto'} gap-2 md:gap-3 w-full pb-0 md:pb-1`}>
              {fawCerts.map(renderCertCard)}
            </div>
          </div>
        )}

        {/* KI Category */}
        {kiCerts.length > 0 && (expandedCert === null || kiCerts.some((c: any) => certs.findIndex((orig: any) => orig.id === c.id) === expandedCert)) && (
          <div className="flex flex-col gap-3 w-full">
            {expandedCert === null && (
              <h2 className="text-lg md:text-xl font-bold text-black/90 px-1">KI</h2>
            )}
            <div className={`grid grid-cols-1 ${expandedCert === null ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[1400px]' : 'max-w-[800px] mx-auto'} gap-2 md:gap-3 w-full pb-0 md:pb-1`}>
              {kiCerts.map(renderCertCard)}
            </div>
          </div>
        )}
      </div>

      {/* CTA Button */}
      <div className="w-fit max-w-full mx-auto flex flex-col items-center justify-center pb-2 md:pb-4 pt-11 md:pt-9 gap-1 md:gap-1.5 mt-auto mb-4 md:mb-12 shrink-0">
        <p className="text-black/80 text-[12px] md:text-[13px] text-center whitespace-normal md:whitespace-nowrap">
          {t.certificates.ctaText}
        </p>
        <button 
          onClick={() => {
            trackEvent('click', 'contact_cta', 'certificates');
            handleNavigate('contact');
          }}
          className="w-full flex items-center justify-center gap-2 rounded-full py-2.5 lg:py-3.5 bg-blue-500/15 border border-blue-500/50 text-black text-[13px] lg:text-[15px] font-medium tracking-wide shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:bg-blue-600/25 hover:border-blue-400 transition-all duration-300 cursor-pointer hover:scale-[0.98] active:scale-95"
        >
          <span className="relative z-10">{t.certificates.ctaButton}</span>
        </button>
      </div>
    </div>
  );
};
