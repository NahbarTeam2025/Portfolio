import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Settings, Info, Check, ChevronDown, ChevronUp } from 'lucide-react';

export const CookieBanner: React.FC<{ handleNavigate: (page: string) => void }> = ({ handleNavigate }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      try {
        const consent = localStorage.getItem('cookie-consent');
        const urlParams = new URLSearchParams(window.location.search);
        const forceShow = urlParams.get('debug_cookies') === 'true';
        
        if (forceShow) {
          setIsVisible(true);
          return;
        }

        if (!consent) {
          setIsVisible(true);
        } else if (consent === 'granted') {
          setAnalyticsEnabled(true);
        }
      } catch (e) {
        setIsVisible(true);
      }
    };

    checkConsent();

    const handleOpenBanner = () => {
      setIsVisible(true);
      setShowSettings(true);
      if (localStorage.getItem('cookie-consent') === 'granted') {
        setAnalyticsEnabled(true);
      }
    };
    
    window.addEventListener('open-cookie-banner', handleOpenBanner);

    return () => {
      window.removeEventListener('open-cookie-banner', handleOpenBanner);
    };
  }, []);

  const grantAnalytics = () => {
    localStorage.setItem('cookie-consent', 'granted');
    if ((window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
      
      (window as any).gtag('config', 'G-90T4169WJP', {
        page_path: window.location.pathname,
        page_location: window.location.href,
        page_title: document.title,
        send_page_view: true,
      });

      (window as any).gtag('event', 'cookie_consent_granted', {
        event_category: 'engagement',
        event_label: 'Cookie Banner Accepted'
      });
    }
  };

  const denyAnalytics = () => {
    localStorage.setItem('cookie-consent', 'denied');
    if ((window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
  };

  const handleAcceptAll = () => {
    grantAnalytics();
    closeBanner();
  };

  const handleAcceptEssential = () => {
    denyAnalytics();
    closeBanner();
  };

  const handleSaveSettings = () => {
    if (analyticsEnabled) {
      grantAnalytics();
    } else {
      denyAnalytics();
    }
    closeBanner();
  };

  const closeBanner = () => {
    setIsVisible(false);
    setShowSettings(false);
  };

  if (!isVisible) {
    return null;
  }

  const bannerText = t?.common?.cookieBanner || {
    text: 'Ich nutze Cookies, um diese Website sicher bereitzustellen (notwendig) und die Nutzung zu analysieren (Analyse). Analyse-Cookies werden nur mit deiner Zustimmung gesetzt. Du kannst deine Wahl jederzeit anpassen.',
    privacyLink: 'Datenschutzerklärung',
    acceptAll: 'Alles akzeptieren',
    acceptEssential: 'Nur notwendige',
    settings: 'Einstellungen',
    saveSettings: 'Auswahl speichern',
    settingsTitle: 'Cookie-Einstellungen',
    settingsDesc: 'Hier kannst du entscheiden, welche Cookies du zulassen möchtest.',
    essentialTitle: 'Notwendig',
    essentialDesc: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich. Ohne sie kann die Website nicht richtig funktionieren.',
    analyticsTitle: 'Analyse',
    analyticsDesc: 'Mit diesen Cookies (Google Analytics 4) erfasse ich anonymisierte Daten, um zu verstehen, wie Besucher die Website nutzen und das Erlebnis zu verbessern.',
    alwaysActive: 'Immer aktiv'
  };

  return (
    <div 
      id="consent-banner" 
      className="fixed bottom-0 left-0 right-0 md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:w-[600px] z-[2147483647] flex justify-center pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="w-full bg-zinc-900/95 backdrop-blur-xl md:rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col ring-1 ring-white/5">
        
        {/* Settings View */}
        {showSettings ? (
          <div className="p-5 md:p-6 flex flex-col gap-6 w-full max-h-[80vh] overflow-y-auto">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">{bannerText.settingsTitle}</h3>
              <p className="text-[13px] text-white/70 leading-relaxed">
                {bannerText.settingsDesc}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Essential Cookies */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white flex-1">{bannerText.essentialTitle}</span>
                      <span className="text-[11px] font-medium text-white/50 bg-white/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {bannerText.alwaysActive}
                      </span>
                    </div>
                    <p className="text-[12px] text-white/60 leading-relaxed mt-2">{bannerText.essentialDesc}</p>
                  </div>
                  <div className="shrink-0 flex items-center justify-center w-10 h-6 bg-blue-600/50 rounded-full cursor-not-allowed">
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm transform translate-x-2"></div>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white">{bannerText.analyticsTitle}</span>
                    </div>
                    <p className="text-[12px] text-white/60 leading-relaxed mt-2">{bannerText.analyticsDesc}</p>
                  </div>
                  <button 
                    onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                    className={`shrink-0 flex items-center relative w-10 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${analyticsEnabled ? 'bg-blue-600' : 'bg-white/20'}`}
                    role="switch"
                    aria-checked={analyticsEnabled}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${analyticsEnabled ? 'translate-x-5' : 'translate-x-1'}`}></div>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleSaveSettings}
                className="flex-1 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[12px] font-semibold transition-all duration-300"
              >
                {bannerText.saveSettings}
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-5 py-2.5 rounded-xl bg-white text-black hover:bg-gray-100 text-[12px] font-semibold transition-all duration-300"
              >
                {bannerText.acceptAll}
              </button>
            </div>
          </div>
        ) : (
          /* Standard View */
          <div className="p-5 md:p-6 flex flex-col gap-5">
            <div className="flex gap-4">
              <div className="shrink-0 hidden sm:flex h-10 w-10 bg-blue-600/20 text-blue-400 rounded-full items-center justify-center">
                <Info className="w-5 h-5" />
              </div>
              <p className="text-[13px] leading-relaxed text-white/80 font-medium pt-1">
                {bannerText.text}{' '}
                <button 
                  onClick={() => handleNavigate('datenschutz')}
                  className="text-white hover:text-blue-400 underline underline-offset-4 transition-colors font-semibold"
                >
                  {bannerText.privacyLink}
                </button>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-end pt-2">
              <button
                onClick={() => setShowSettings(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/20 hover:bg-white/5 text-white text-[12px] font-medium transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" />
                {bannerText.settings}
              </button>
              
              <div className="flex w-full sm:w-auto gap-3">
                <button
                  onClick={handleAcceptEssential}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[12px] font-semibold transition-all duration-300"
                >
                  {bannerText.acceptEssential}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[12px] font-semibold transition-all duration-300"
                >
                  {bannerText.acceptAll}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
