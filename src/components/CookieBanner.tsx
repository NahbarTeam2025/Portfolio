import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const CookieBanner: React.FC<{ handleNavigate: (page: string) => void }> = ({ handleNavigate }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie-consent');
      // Erneut erzwungen, damit du das neue kompakte Design sehen kannst
      setIsVisible(true);
    } catch (e) {
      setIsVisible(true);
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
    <div id="consent-banner" className="fixed bottom-6 left-4 right-4 z-[99999999] flex justify-center pointer-events-auto">
      <div className="max-w-2xl w-full bg-black/70 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-4 text-white flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto">
        <div className="flex-grow">
          <p className="text-[13px] leading-relaxed text-white/90">
            {t?.common?.cookieBanner?.text || 'Ich verwende analytische Cookies zur Seiten-Interaktion.'}{' '}
            <button 
              onClick={() => handleNavigate('datenschutz')} 
              className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors font-medium"
            >
              {t?.common?.cookieBanner?.privacyLink || 'Datenschutz'}
            </button>.
          </p>
        </div>
        <div className="flex gap-2 shrink-0 w-full md:w-auto">
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none px-4 py-2 bg-white text-black hover:bg-white/90 font-bold rounded-lg transition-all text-[12px] uppercase tracking-wider active:scale-95"
          >
            {t?.common?.cookieBanner?.accept || 'OK'}
          </button>
          <button 
            onClick={handleDecline}
            className="flex-1 md:flex-none px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/10 font-bold rounded-lg transition-all text-[12px] uppercase tracking-wider active:scale-95"
          >
            {t?.common?.cookieBanner?.decline || 'Nein'}
          </button>
        </div>
      </div>
    </div>
  );
};
