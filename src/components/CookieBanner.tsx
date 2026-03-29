import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const CookieBanner: React.FC<{ handleNavigate: (page: string) => void }> = ({ handleNavigate }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Force clear once for the user to see it now
    localStorage.removeItem('cookie-consent');

    const checkConsent = () => {
      console.log('Checking cookie consent...');
      try {
        const consent = localStorage.getItem('cookie-consent');
        console.log('Current consent:', consent);
        const urlParams = new URLSearchParams(window.location.search);
        const forceShow = urlParams.get('debug_cookies') === 'true';
        
        if (forceShow) {
          console.log('Forcing show via URL param');
          setIsVisible(true);
          return;
        }

        // Only show if no consent has been given yet
        if (!consent) {
          console.log('No consent found, showing banner');
          setIsVisible(true);
        } else {
          console.log('Consent already given, hiding banner');
        }
      } catch (e) {
        console.error('Error checking consent:', e);
        setIsVisible(true);
      }
    };

    checkConsent();

    const handleOpenBanner = () => setIsVisible(true);
    window.addEventListener('open-cookie-banner', handleOpenBanner);

    return () => {
      window.removeEventListener('open-cookie-banner', handleOpenBanner);
    };
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'granted');
    if ((window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
      
      // Send a config update to ensure page view is tracked with new consent
      (window as any).gtag('config', 'G-90T4169WJP', {
        page_path: window.location.pathname,
        page_location: window.location.href,
        page_title: document.title,
        send_page_view: true,
      });

      // Send a custom event to make it immediately visible in Realtime reports
      (window as any).gtag('event', 'cookie_consent_granted', {
        event_category: 'engagement',
        event_label: 'Cookie Banner Accepted'
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

  return (
    <div 
      id="consent-banner" 
      className="fixed bottom-0 left-0 right-0 md:bottom-6 md:left-4 md:right-4 z-[2147483647] flex justify-center pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="max-w-xl w-full bg-black/30 backdrop-blur-xl border border-white/10 rounded-t-xl md:rounded-xl shadow-2xl p-4 md:p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6 pointer-events-auto ring-1 ring-white/5">
        <div className="flex-grow text-center sm:text-left">
          <p className="text-[12px] md:text-[13px] leading-relaxed text-white/90 font-medium">
            {t?.common?.cookieBanner?.text || 'Ich verwende ausschließlich analytische Cookies zur Seiten-Interaktion. Keine personenbezogenen Daten, keine Marketing-Cookies. Details findest du in der'}{' '}
            <button 
              onClick={() => handleNavigate('datenschutz')}
              className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors font-bold"
            >
              {t?.common?.cookieBanner?.privacyLink || 'Datenschutzerklärung'}
            </button>
          </p>
        </div>
        
        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={handleAccept}
            className="flex-1 sm:flex-none px-5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95"
          >
            {t?.common?.cookieBanner?.accept || 'Akzeptieren'}
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 sm:flex-none px-5 py-1.5 rounded-lg bg-white/80 hover:bg-white text-black text-[11px] font-bold transition-all duration-300 active:scale-95"
          >
            {t?.common?.cookieBanner?.decline || 'Ablehnen'}
          </button>
        </div>
      </div>
    </div>
  );
};
