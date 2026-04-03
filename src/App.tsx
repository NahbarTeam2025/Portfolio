/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef, startTransition, Suspense, lazy } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { LazyMotion, domAnimation, m, AnimatePresence, useMotionValue, useSpring, useMotionTemplate, useTransform, useScroll } from 'motion/react';

// Import refactored components
import { MagneticButton } from '@/components/MagneticButton';
import { TerminalStatus } from '@/components/TerminalStatus';
import { BentoCard } from '@/components/BentoCard';
import { Typewriter } from '@/components/Typewriter';
import { HeroSection } from '@/components/HeroSection';
import { Footer } from '@/components/Footer';
import { useSEO } from '@/hooks/useSEO';
import { useParallaxIntersection } from '@/hooks/useParallaxIntersection';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useIsMobile } from '@/hooks/useIsMobile';
import { CookieBanner } from '@/components/CookieBanner';
import { trackEvent, trackPageView } from '@/lib/analytics';

// Lazy load components
const CommandTerminal = lazy(() => import('@/components/CommandTerminal.tsx'));
const SkillsSection = lazy(() => import('@/components/SkillsSection.tsx').then(m => ({ default: m.SkillsSection })));
const ProjekteSection = lazy(() => import('@/components/ProjekteSection.tsx').then(m => ({ default: m.ProjekteSection })));
const ZertifikateSection = lazy(() => import('@/components/ZertifikateSection.tsx').then(m => ({ default: m.ZertifikateSection })));
const KontaktSection = lazy(() => import('@/components/KontaktSection.tsx').then(m => ({ default: m.KontaktSection })));
const UberMichSection = lazy(() => import('@/components/UberMichSection.tsx').then(m => ({ default: m.UberMichSection })));
const ImpressumPage = lazy(() => import('@/pages/ImpressumPage.tsx').then(m => ({ default: m.ImpressumPage })));
const DatenschutzPage = lazy(() => import('@/pages/DatenschutzPage.tsx').then(m => ({ default: m.DatenschutzPage })));
const ImpressumModal = lazy(() => import('@/components/ImpressumModal.tsx').then(m => ({ default: m.ImpressumModal })));
const DatenschutzModal = lazy(() => import('@/components/DatenschutzModal.tsx').then(m => ({ default: m.DatenschutzModal })));
const ToolsPage = lazy(() => import('@/pages/ToolsPage.tsx').then(m => ({ default: m.ToolsPage })));

const PAGE_ROUTES: Record<string, string> = {
  'start': '/',
  'about': '/ueber-mich',
  'skills': '/skills',
  'projects': '/projekte',
  'certificates': '/zertifikate',
  'tools': '/tools',
  'contact': '/kontakt',
  'impressum': '/impressum',
  'datenschutz': '/datenschutz'
};

const ROUTE_TO_PAGE: Record<string, string> = Object.fromEntries(
  Object.entries(PAGE_ROUTES).map(([key, value]) => [value, key])
);

const PAGES = ['about', 'skills', 'certificates', 'projects', 'tools'];

export default function App() {
  const { t } = useLanguage();
  useSEO(); // Initialize dynamic SEO tags
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = ROUTE_TO_PAGE[location.pathname] || 'start';

  // Scroll Progress Indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (!ROUTE_TO_PAGE[location.pathname]) {
      navigate('/', { replace: true });
    } else {
      // Track page view on route change
      trackPageView(location.pathname, document.title);
    }
  }, [location.pathname, navigate]);

  useParallaxIntersection([currentPage]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isImpressumOpen, setIsImpressumOpen] = useState(false);
  const [isDatenschutzOpen, setIsDatenschutzOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
  }, [currentPage]);

  const [expandedCert, setExpandedCert] = useState<number | null>(null);
  const [isInitialEntrance, setIsInitialEntrance] = useState(true);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCookieBanner(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsInitialEntrance(true);
  }, [currentPage]);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#0a0a0a');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#ffffff');
    }
  }, [isDarkMode]);

  // Loading timer removed for immediate LCP rendering

  useEffect(() => {
    // Start video loading almost immediately, but yield 50ms to let the browser prioritize the LCP image fetch
    const timer = setTimeout(() => {
      setIsVideoDeferred(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const originalTitle = document.title;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = t.common.backToTitle;
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [t.common.backToTitle]);

  const [isStartVideoReady, setIsStartVideoReady] = useState(false);
  const [isSubVideoReady, setIsSubVideoReady] = useState(false);
  const [isVideoDeferred, setIsVideoDeferred] = useState(false);
  const isMobile = useIsMobile();


  const handleNavigate = useCallback((pageId: string) => {
    // Check if it's a modal page
    if (pageId === 'impressum') {
      setIsImpressumOpen(true);
      setIsMobileMenuOpen(false);
      return;
    }
    if (pageId === 'datenschutz') {
      setIsDatenschutzOpen(true);
      setIsMobileMenuOpen(false);
      return;
    }

    const targetPath = PAGE_ROUTES[pageId] || '/';
    if (location.pathname === targetPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      startTransition(() => {
        navigate(targetPath);
      });
    }
    setIsMobileMenuOpen(false);
  }, [navigate, location.pathname]);

  const requestRef = useRef<number>(0);
  const cardRects = useRef<Map<HTMLElement, DOMRect>>(new Map());

  useEffect(() => {
    const updateRects = () => {
      const cards = document.getElementsByClassName('wow-card');
      const newRects = new Map<HTMLElement, DOMRect>();
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement;
        newRects.set(card, card.getBoundingClientRect());
      }
      cardRects.current = newRects;
    };

    updateRects();
    window.addEventListener('resize', updateRects);
    window.addEventListener('scroll', updateRects, true);
    
    // Also update after a short delay to catch any layout shifts after initial load
    const timer = setTimeout(updateRects, 1000);
    
    return () => {
      window.removeEventListener('resize', updateRects);
      window.removeEventListener('scroll', updateRects, true);
      clearTimeout(timer);
    };
  }, [currentPage]); // Re-run when page changes as new cards might appear

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    requestRef.current = requestAnimationFrame(() => {
      const target = e.target as HTMLElement;
      const hoveredCard = target.closest('.wow-card') as HTMLElement;
      
      if (hoveredCard) {
        let rect = cardRects.current.get(hoveredCard);
        if (!rect) {
          rect = hoveredCard.getBoundingClientRect();
          cardRects.current.set(hoveredCard, rect);
        }
        
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        
        // Only update if the values are significantly different (optional, but can help)
        hoveredCard.style.setProperty('--mouse-x', `${x}px`);
        hoveredCard.style.setProperty('--mouse-y', `${y}px`);
      }
    });
  }, []);

  const [subVideoOpacity] = useState(0.2);
  const [startVideoOpacity] = useState(1.0);

  // Force play videos on mount and page change
  useEffect(() => {
    const playVideos = () => {
      const videos = document.querySelectorAll('video');
      videos.forEach(v => {
        v.play().catch(() => {
          // Fallback for browsers that block autoplay
          const playOnInteraction = () => {
            v.play().catch(() => {});
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
          };
          document.addEventListener('click', playOnInteraction);
          document.addEventListener('touchstart', playOnInteraction);
        });
      });
    };

    if (!isLoading && isVideoDeferred) {
      playVideos();
      // Small delay to ensure DOM is ready
      const timer = setTimeout(playVideos, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, currentPage, isVideoDeferred]);

  return (
    <LazyMotion features={domAnimation}>
      <div 
        className="relative min-h-screen min-h-[100dvh] w-full font-sans"
        onMouseMove={handleMouseMove}
      >
      {/* Background Videos Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Transparent background to ensure video is seen clearly */}
        
          {!isLoading && (
            <div
              key="bg-video-layer"
              className="absolute inset-0 w-full h-full animate-in fade-in duration-1000"
            >
              <video
                key="video-element"
                autoPlay
                loop
                muted
                playsInline
                aria-hidden="true"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(1)', opacity: 0.97 }}
              >
                <source 
                  src="https://meine-assets.pages.dev/bgstart.webm" 
                  type="video/webm" 
                />
                <source 
                  src="https://meine-assets.pages.dev/bgstart.mp4" 
                  type="video/mp4" 
                />
              </video>
            </div>
          )}
      </div>

      <AnimatePresence>
        {isLoading && (
          <m.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
          >
            <div className="relative w-48 h-[2px] bg-black/10 overflow-hidden rounded-full">
              <m.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
              />
            </div>
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-4 text-black/60 text-[11px] tracking-[0.3em] uppercase font-medium"
            >
              {t.common.loadingExperience}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Content Overlay */}
      
      {/* Scroll Progress Indicator */}
      {currentPage !== 'start' && (
        <m.div 
          className="fixed top-0 left-0 right-0 h-[1px] bg-blue-500 origin-left z-[100] shadow-[0_0_10px_rgba(59,130,246,0.8)] lg:hidden" 
          style={{ scaleX }} 
        />
      )}

      <div className={`relative z-10 flex flex-col ${currentPage === 'start' ? 'h-screen h-[100dvh] overflow-hidden' : 'min-h-screen min-h-[100dvh] overflow-x-hidden'}`}>
        {/* Navigation Wrapper */}
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-0 pointer-events-auto transition-all duration-300">
          {/* Navbar */}
          <nav className={`flex items-center justify-between w-full h-[52px] md:h-[60px] px-6 transition-all duration-300 ${currentPage === 'start' ? 'bg-transparent' : 'bg-white/90 backdrop-blur-md border-b border-black/5 shadow-sm'}`}>
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
              {/* Left side: Logo + Navigation Links */}
              <div className="flex items-center gap-8">
                {/* Logo */}
                <a 
                  href={PAGE_ROUTES['start']} 
                  className="flex items-center gap-3 h-[28px] md:h-[34px] cursor-pointer group" 
                  aria-label="Robert Erbach Portfolio Home"
                  onClick={(e) => {
                    e.preventDefault();
                    trackEvent('click', 'logo', 'header');
                    handleNavigate('start');
                  }}
                >
                  {/* Light mode logo */}
                  <img 
                    src="https://3dab3910.meine-assets.pages.dev/favicon-96x96.png" 
                    alt="Logo Robert Erbach" 
                    width="74"
                    height="55"
                    decoding="async"
                    className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_10px_rgba(5,184,194,0.6)] dark:hidden"
                    style={{ forcedColorAdjust: 'none' }}
                  />
                  {/* Dark mode logo */}
                  <img 
                    src="https://3dab3910.meine-assets.pages.dev/favicon.ico" 
                    alt="Logo Robert Erbach" 
                    width="74"
                    height="55"
                    decoding="async"
                    className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_10px_rgba(5,184,194,0.6)] hidden dark:block"
                    style={{ forcedColorAdjust: 'none' }}
                  />
                </a>

                {/* Navigation Bar */}
                <div className="hidden lg:flex items-center gap-1">
                  {PAGES.map((pageId, index) => (
                    <React.Fragment key={pageId}>
                        <a
                          href={PAGE_ROUTES[pageId]}
                          onMouseEnter={() => {
                            // Pre-fetch component using static map to avoid Vite dynamic import issues
                            const prefetchMap: Record<string, () => Promise<any>> = {
                              'about': () => import('@/components/UberMichSection.tsx'),
                              'projects': () => import('@/components/ProjekteSection.tsx'),
                              'certificates': () => import('@/components/ZertifikateSection.tsx'),
                              'skills': () => import('@/components/SkillsSection.tsx'),
                            };
                            if (prefetchMap[pageId]) {
                              prefetchMap[pageId]().catch(() => {});
                            }
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigate(pageId);
                          }}
                          className={`px-2 xl:px-4 py-1.5 text-[10px] xl:text-[11px] font-bold transition-all duration-500 cursor-pointer relative group hover:scale-110 font-sans focus-ring uppercase tracking-widest ${
                            currentPage === pageId
                              ? 'text-blue-400 text-glow-blue'
                              : 'text-black/85 hover:text-black'
                          }`}
                        >
                        <span className="relative z-10">{(t.nav as any)[pageId]}</span>
                        {currentPage !== pageId && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-black/40 transition-all duration-300 group-hover:w-1/3" />
                        )}
                      </a>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Right side: Language Switcher + HC + Contact Button + Mobile Menu Toggle */}
              <div className="flex items-center gap-4 lg:gap-6">

                {/* Language Switcher */}
                <div className="hidden lg:block">
                  <LanguageSwitcher />
                </div>

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`relative hidden lg:flex p-2 transition-all duration-300 focus-ring rounded-full ${isDarkMode ? 'text-blue-400 bg-blue-400/10' : 'text-black/60 hover:text-black bg-black/5 hover:bg-black/10'}`}
                  aria-label="Toggle Dark Mode"
                >
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                  {isDarkMode && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />}
                </button>

                {/* Contact Button */}
                <button 
                  onClick={() => handleNavigate('contact')}
                  className="hidden lg:flex items-center justify-center rounded-full px-6 py-2 bg-blue-500/10 border border-blue-500/50 text-black text-[13px] font-medium tracking-wide shadow-[0_0_10px_rgba(37,99,235,0.1)] hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-600/20 hover:border-blue-400 transition-all duration-300 cursor-pointer focus-ring"
                >
                  {t.nav.contact}
                </button>

                {/* Mobile Menu Toggle */}
                <button 
                  className="lg:hidden text-black p-1.5 md:p-2 -mr-1.5 md:-mr-2 cursor-pointer focus-ring"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6 md:w-7 md:h-7" /> : <Menu className="w-6 h-6 md:w-7 md:h-7" />}
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <m.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="fixed top-[52px] md:top-[60px] bottom-[40px] left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-black/10 p-6 flex flex-col gap-4 lg:hidden z-40 overflow-y-auto shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                {/* Navigation Links */}
                <div className="flex flex-col gap-1">
                  {PAGES.map((pageId, index) => (
                    <m.a
                      key={pageId}
                      href={PAGE_ROUTES[pageId]}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigate(pageId);
                      }}
                      className={`text-center text-lg font-medium py-3 border-b border-black/5 transition-colors font-sans focus-ring ${
                        currentPage === pageId ? 'text-blue-400 text-glow-blue' : 'text-black/85 hover:text-black'
                      }`}
                    >
                      {(t.nav as any)[pageId]}
                    </m.a>
                  ))}
                </div>

                <m.a 
                  href={PAGE_ROUTES['contact']}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + PAGES.length * 0.05, duration: 0.4 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate('contact');
                  }}
                  className="mt-2 flex items-center justify-center w-full lg:hidden rounded-full px-8 py-3.5 bg-blue-500/10 border border-blue-500/50 text-black text-[15px] font-medium tracking-wide shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:bg-blue-600/20 hover:border-blue-400 transition-all duration-300 cursor-pointer focus-ring"
                >
                  <span className="relative z-10">{t.nav.contact}</span>
                </m.a>

                <div className="flex flex-col items-center gap-4 mt-4">
                  <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (PAGES.length + 3) * 0.05, duration: 0.4 }}
                  >
                    <LanguageSwitcher />
                  </m.div>

                  <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (PAGES.length + 2) * 0.05, duration: 0.4 }}
                  >
                    <button
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className={`flex items-center justify-center gap-2 px-4 py-1.5 transition-all duration-300 focus-ring rounded-xl border text-[10px] font-bold ${
                        isDarkMode 
                          ? 'text-blue-400 bg-blue-400/10 border-blue-400/30' 
                          : 'text-black/70 bg-black/5 border-black/10 hover:bg-black/10'
                      }`}
                      aria-label="Toggle Dark Mode"
                    >
                      {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
                      <span className="uppercase tracking-widest">
                        {isDarkMode ? t.common.darkModeOff : t.common.darkModeOn}
                      </span>
                    </button>
                  </m.div>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Content */}
        <main className={`flex-grow flex flex-col px-6 ${
          currentPage === 'start' 
            ? 'pt-[52px] lg:pt-[60px] items-start justify-center text-left max-w-7xl mx-auto w-full' 
            : (currentPage === 'skills' || currentPage === 'projects')
              ? 'pt-20 md:pt-24 lg:pt-28 items-start justify-start pb-4 max-w-7xl mx-auto w-full lg:h-screen lg:overflow-hidden'
              : 'pt-24 md:pt-28 lg:pt-32 items-start justify-start pb-12 max-w-7xl mx-auto w-full'
        } ${isMobileMenuOpen ? 'hidden lg:flex' : ''}`}>
            <div
              key={currentPage}
              className={`w-full flex flex-col flex-grow animate-in fade-in slide-in-from-bottom-4 duration-500 ${currentPage === 'start' ? 'items-start justify-center' : ''}`}
            >
                {currentPage === 'start' ? (
                  <HeroSection handleNavigate={handleNavigate} />
                ) : (
                  <Suspense fallback={<div className="text-black/50">{t.common.loading}</div>}>
                    {currentPage === 'about' ? (
                      <UberMichSection handleNavigate={handleNavigate} />
                    ) : currentPage === 'skills' ? (
                      <SkillsSection handleNavigate={handleNavigate} />
                    ) : currentPage === 'projects' ? (
                      <ProjekteSection 
                        setIsInitialEntrance={setIsInitialEntrance} 
                        handleNavigate={handleNavigate}
                      />
                    ) : currentPage === 'certificates' ? (
                      <ZertifikateSection 
                        expandedCert={expandedCert}
                        setExpandedCert={setExpandedCert}
                        handleNavigate={handleNavigate}
                      />
                    ) : currentPage === 'contact' ? (
                      <KontaktSection />
                    ) : currentPage === 'tools' ? (
                      <ToolsPage />
                    ) : currentPage === 'impressum' ? (
                      <ImpressumPage />
                    ) : currentPage === 'datenschutz' ? (
                      <DatenschutzPage />
                    ) : (
                      <div className="flex flex-col items-start gap-4 md:gap-8 w-full animate-in fade-in duration-500 h-full">
                        <h1 className="heading-gradient fluid-h2 font-medium tracking-tight">
                          {currentPage}
                        </h1>
                        <div className="w-full h-[1px] bg-black/10 shrink-0" />
                        <p className="text-black/70 text-[14px] md:text-lg font-normal max-w-[680px] leading-relaxed">
                          This is the placeholder page for {currentPage}. The background is now solid black, and the content can fill the page.
                        </p>
                      </div>
                    )}
                  </Suspense>
                )}
            </div>
        </main>

        {/* Footer */}
        <Footer 
          isMobileMenuOpen={isMobileMenuOpen}
          handleNavigate={handleNavigate}
        />

        {/* Easter Egg Terminal */}
        <Suspense fallback={null}>
          <CommandTerminal onNavigate={handleNavigate} />
        </Suspense>

        {/* Modals */}
        {isImpressumOpen && (
          <ImpressumModal setIsImpressum={setIsImpressumOpen} />
        )}
        {isDatenschutzOpen && (
          <DatenschutzModal setIsDatenschutz={setIsDatenschutzOpen} />
        )}
      </div>
      
      {showCookieBanner && <CookieBanner handleNavigate={handleNavigate} />}
    </div>
    </LazyMotion>
  );
}
