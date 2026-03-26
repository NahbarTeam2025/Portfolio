import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const CookieBanner: React.FC<{ handleNavigate: (page: string) => void }> = ({ handleNavigate }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    } else if (consent === 'granted') {
      // If previously granted, update consent state immediately
      if (window.gtag) {
        window.gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        });
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'granted');
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'denied');
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div id="consent-banner" className="fixed bottom-0 left-0 right-0 z-[9999] p-3 md:p-4 flex justify-center pointer-events-auto">
      <div className="max-w-2xl w-full bg-black/80 backdrop-blur-[20px] saturate-[180%] border border-white/10 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] p-4 md:p-5 text-white/90 text-[13px] leading-relaxed flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto">
        <p>
          {t.common.cookieBanner.text}{' '}
          <button 
            onClick={() => handleNavigate('datenschutz')} 
            className="text-blue-400 hover:underline"
          >
            {t.common.cookieBanner.privacyLink}
          </button>.{' '}
          <button 
            onClick={() => handleNavigate('impressum')} 
            className="text-blue-400 hover:underline ml-1"
          >
            {t.common.cookieBanner.impressumLink}
          </button>.
        </p>
        <div className="flex gap-2 shrink-0">
          <button 
            onClick={handleAccept}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-[11px] uppercase tracking-wider"
          >
            {t.common.cookieBanner.accept}
          </button>
          <button 
            onClick={handleDecline}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors text-[11px] uppercase tracking-wider"
          >
            {t.common.cookieBanner.decline}
          </button>
        </div>
      </div>
    </div>
  );
};
