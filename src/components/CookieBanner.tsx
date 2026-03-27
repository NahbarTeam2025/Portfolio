import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const CookieBanner: React.FC<{ handleNavigate: (page: string) => void }> = ({ handleNavigate }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie-consent');
      const urlParams = new URLSearchParams(window.location.search);
      const forceShow = urlParams.get('debug_cookies') === 'true';
      
      if (forceShow) {
        setIsVisible(true);
        return;
      }

      if (consent === 'granted' || consent === 'denied') {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    } catch (e) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      const el = document.getElementById('consent-banner');
      if (!el) {
        // Silent error check
      }
    }
  }, [isVisible]);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'granted');
    if ((window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
      
      (window as any).gtag('event', 'page_view', {
        page_location: window.location.href,
        page_path: window.location.pathname,
        page_title: document.title,
        debug_mode: true
      });
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('debug_cookies') !== 'true') {
      setIsVisible(false);
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'denied');
    if ((window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('debug_cookies') !== 'true') {
      setIsVisible(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return createPortal(
    <div 
      id="consent-banner" 
      className="fixed bottom-0 left-0 right-0 md:bottom-6 md:left-4 md:right-4 z-[2147483647] flex justify-center pointer-events-auto"
      style={{ display: 'flex', visibility: 'visible', opacity: 1 }}
    >
      <div className="max-w-2xl w-full bg-black/80 backdrop-blur-md border border-white/10 rounded-t-xl md:rounded-xl shadow-2xl p-4 text-white flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto">
        <div className="flex-grow">
          <p className="text-[13px] leading-relaxed text-white/90 font-medium">
            {t?.common?.cookieBanner?.text || 'Ich verwende analytische Cookies zur Seiten-Interaktion.'}{' '}
            <button 
              onClick={() => handleNavigate('datenschutz')}
              className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors font-bold"
            >
              {t?.common?.cookieBanner?.privacyLink || 'Datenschutzerklärung'}
            </button>
          </p>
        </div>
        
        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
          <button
            onClick={handleAccept}
            className="flex-1 md:flex-none px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[12px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all duration-300"
          >
            {t?.common?.cookieBanner?.accept || 'Akzeptieren'}
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 md:flex-none px-5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-[12px] font-bold transition-all duration-300"
          >
            {t?.common?.cookieBanner?.decline || 'Ablehnen'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
