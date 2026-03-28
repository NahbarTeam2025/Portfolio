/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef, startTransition, Suspense, lazy } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Linkedin, ArrowRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate, useTransform, useScroll } from 'motion/react';

// Import refactored components
import { MagneticButton } from './components/MagneticButton';
import { TerminalStatus } from './components/TerminalStatus';
import { BentoCard } from './components/BentoCard';
import { Typewriter } from './components/Typewriter';
import { HeroSection } from './components/HeroSection';
import { Footer } from './components/Footer';
import { useSEO } from './hooks/useSEO';
import { useParallaxIntersection } from './hooks/useParallaxIntersection';
import { useLanguage } from './contexts/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useIsMobile } from './hooks/useIsMobile';

// Lazy load components
const CommandTerminal = lazy(() => import('./components/CommandTerminal.tsx'));
const SkillsSection = lazy(() => import('./components/SkillsSection.tsx').then(m => ({ default: m.SkillsSection })));
const ProjekteSection = lazy(() => import('./components/ProjekteSection.tsx').then(m => ({ default: m.ProjekteSection })));
const ZertifikateSection = lazy(() => import('./components/ZertifikateSection.tsx').then(m => ({ default: m.ZertifikateSection })));
const KontaktSection = lazy(() => import('./components/KontaktSection.tsx').then(m => ({ default: m.KontaktSection })));
const UberMichSection = lazy(() => import('./components/UberMichSection.tsx').then(m => ({ default: m.UberMichSection })));
const ImpressumPage = lazy(() => import('./pages/ImpressumPage.tsx').then(m => ({ default: m.ImpressumPage })));
const DatenschutzPage = lazy(() => import('./pages/DatenschutzPage.tsx').then(m => ({ default: m.DatenschutzPage })));
const ImpressumModal = lazy(() => import('./components/ImpressumModal.tsx').then(m => ({ default: m.ImpressumModal })));
const DatenschutzModal = lazy(() => import('./components/DatenschutzModal.tsx').then(m => ({ default: m.DatenschutzModal })));
const CookieBanner = lazy(() => import('./components/CookieBanner.tsx').then(m => ({ default: m.CookieBanner })));
const ToolsPage = lazy(() => import('./pages/ToolsPage.tsx').then(m => ({ default: m.ToolsPage })));

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

const PAGES = ['about', 'projects', 'skills', 'certificates', 'tools'];

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
      if ((window as any).gtag) {
        (window as any).gtag('config', 'G-90T4169WJP', {
          page_path: location.pathname,
          page_location: window.location.href,
          page_title: document.title,
          send_page_view: true,
        });
      }
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

  useEffect(() => {
    setIsInitialEntrance(true);
  }, [currentPage]);

  const [isHighContrast, setIsHighContrast] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('high-contrast') === 'true';
    }
    return false;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
      localStorage.setItem('high-contrast', 'true');
    } else {
      document.documentElement.classList.remove('high-contrast');
      localStorage.setItem('high-contrast', 'false');
    }
  }, [isHighContrast]);

  // Loading timer removed for immediate LCP rendering

  useEffect(() => {
    // Start video loading immediately
    setIsVideoDeferred(true);
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

  const [isCertUnlocked, setIsCertUnlocked] = useState(false);
  const [isStartVideoReady, setIsStartVideoReady] = useState(false);
  const [isSubVideoReady, setIsSubVideoReady] = useState(false);
  const [isVideoDeferred, setIsVideoDeferred] = useState(false);
  const isMobile = useIsMobile();
  const [certPasswordInput, setCertPasswordInput] = useState('');
  const [certError, setCertError] = useState(false);

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

  const requestRef = useRef<number>();
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
    <>
      <div 
        className="relative min-h-[100dvh] w-full font-sans"
        onMouseMove={handleMouseMove}
      >
      {/* Background Videos Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
        {/* Start Page Video */}
        {currentPage === 'start' && isVideoDeferred && (
          <div className="absolute inset-0">
            <video
              key="start-video-main"
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline={true}
              preload="auto"
              onCanPlay={() => setIsStartVideoReady(true)}
              className={`w-full h-full object-cover transition-opacity duration-1000 ${isStartVideoReady ? 'opacity-100' : 'opacity-0'}`}
            >
              <source src="https://meine-assets.pages.dev/bgstart.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}

        {/* Subpages Video */}
        {currentPage !== 'start' && isVideoDeferred && (
          <div className="absolute inset-0 bg-black">
            <video
              key="sub-video-main"
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline={true}
              preload="metadata"
              onCanPlay={() => setIsSubVideoReady(true)}
              className={`w-full h-full object-cover transition-opacity duration-1000 ${isSubVideoReady ? 'opacity-15' : 'opacity-0'}`}
            >
              <source src="https://meine-assets.pages.dev/bgunterseiten.mp4" type="video/mp4" />
            </video>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          >
            <div className="relative w-48 h-[2px] bg-white/10 overflow-hidden rounded-full">
              <motion.div
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
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-4 text-white/60 text-[11px] tracking-[0.3em] uppercase font-medium"
            >
              {t.common.loadingExperience}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Overlay */}
      
      {/* Scroll Progress Indicator */}
      {currentPage !== 'start' && (
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[1px] bg-blue-500 origin-left z-[100] shadow-[0_0_10px_rgba(59,130,246,0.8)] lg:hidden" 
          style={{ scaleX }} 
        />
      )}

      <div className={`relative z-10 flex flex-col h-[100dvh] overflow-x-hidden`}>
        {/* Navbar */}
        <nav className={`sticky top-0 flex items-center justify-between px-4 py-1 md:px-6 md:py-3 w-full z-50 transition-all duration-300 ${(currentPage !== 'start' || isMobileMenuOpen) ? 'bg-black/20 backdrop-blur-[15px] saturate-[180%] border-b border-white/5' : 'bg-transparent'}`}>
          <div className="flex items-center">
            {/* Logo */}
            <a 
              href={PAGE_ROUTES['start']} 
              className="flex items-center gap-3 h-[24px] md:h-[28px] cursor-pointer group" 
              onClick={(e) => {
                e.preventDefault();
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'logo_click', {
                    'event_category': 'navigation',
                    'event_label': 'Header Logo'
                  });
                }
                handleNavigate('start');
              }}
            >
              <img 
                src="https://meine-assets.pages.dev/logo.png" 
                alt="Logo Robert Erbach" 
                width="66"
                height="49"
                decoding="async"
                className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                style={{ forcedColorAdjust: 'none' }}
              />
            </a>
          </div>

          {/* Navigation Bar */}
          <div className="hidden lg:flex items-center gap-1 ml-6">
            {PAGES.map((pageId, index) => (
              <React.Fragment key={pageId}>
                  <a
                    href={PAGE_ROUTES[pageId]}
                    onMouseEnter={() => {
                      // Pre-fetch component using static map to avoid Vite dynamic import issues
                      const prefetchMap: Record<string, () => Promise<any>> = {
                        'about': () => import('./components/UberMichSection.tsx'),
                        'projects': () => import('./components/ProjekteSection.tsx'),
                        'certificates': () => import('./components/ZertifikateSection.tsx'),
                        'skills': () => import('./components/SkillsSection.tsx'),
                      };
                      if (prefetchMap[pageId]) {
                        prefetchMap[pageId]().catch(() => {});
                      }
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(pageId);
                    }}
                    className={`px-2 xl:px-4 py-1.5 text-[11px] xl:text-[13px] font-medium transition-all duration-500 cursor-pointer relative group hover:scale-110 font-sans focus-ring ${
                      currentPage === pageId
                        ? 'text-white text-glow-blue'
                        : 'text-white/85 hover:text-white'
                    }`}
                  >
                  <span className="relative z-10">{(t.nav as any)[pageId]}</span>
                  {currentPage === pageId ? (
                    <motion.span 
                      layoutId="active-nav-indicator"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white/40 transition-all duration-300 group-hover:w-1/3" />
                  )}
                </a>
                {/* No separator */}
              </React.Fragment>
            ))}
          </div>

          {/* Right side: CTA Button + Mobile Menu Toggle */}
          <div className="flex items-center gap-4 lg:gap-6 ml-auto">

            {/* Language Switcher */}
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setIsHighContrast(!isHighContrast)}
              className={`relative hidden lg:flex p-2 transition-colors focus-ring rounded-full ${isHighContrast ? 'text-blue-400' : 'text-white/60 hover:text-white'}`}
              aria-label="Toggle High Contrast Mode"
            >
              <span className="text-[10px] font-bold">HC</span>
              {isHighContrast && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-400 rounded-full" />}
            </button>

            <MagneticButton className="hidden lg:flex">
              <a 
                href={PAGE_ROUTES['contact']}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate('contact');
                }}
                className="flex items-center justify-center rounded-xl px-6 py-2 bg-black/40 border border-blue-500/60 text-blue-50 text-[11px] font-bold tracking-[0.15em] uppercase shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 cursor-pointer focus-ring"
              >
                <span className="relative z-10">{t.nav.contact}</span>
              </a>
            </MagneticButton>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden text-white p-1.5 md:p-2 -mr-1.5 md:-mr-2 cursor-pointer focus-ring"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 md:w-7 md:h-7" /> : <Menu className="w-6 h-6 md:w-7 md:h-7" />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="absolute top-full left-0 w-full h-[calc(100dvh-100%)] bg-black/20 backdrop-blur-[15px] saturate-[180%] border-t border-white/5 p-6 flex flex-col gap-4 lg:hidden z-40 overflow-y-auto pb-24 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              >
                {PAGES.map((pageId, index) => (
                  <motion.a
                    key={pageId}
                    href={PAGE_ROUTES[pageId]}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(pageId);
                    }}
                    className={`text-center text-lg font-medium py-3 border-b border-white/5 transition-colors font-sans focus-ring ${
                      currentPage === pageId ? 'text-blue-400 text-glow-blue' : 'text-white/85 hover:text-white'
                    }`}
                  >
                    {(t.nav as any)[pageId]}
                  </motion.a>
                ))}
                <motion.a 
                  href={PAGE_ROUTES['contact']}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + PAGES.length * 0.05, duration: 0.4 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate('contact');
                  }}
                  className="mt-4 flex items-center justify-center w-full lg:hidden rounded-xl px-5 py-3 bg-black/40 border border-blue-500/60 text-blue-50 text-[12px] font-bold tracking-[0.15em] uppercase shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 cursor-pointer focus-ring"
                >
                  <span className="relative z-10">{t.nav.contact}</span>
                </motion.a>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (PAGES.length + 3) * 0.05, duration: 0.4 }}
                  className="flex justify-center mt-4"
                >
                  <LanguageSwitcher />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (PAGES.length + 2) * 0.05, duration: 0.4 }}
                  className="flex justify-center mt-2"
                >
                  <button
                    onClick={() => setIsHighContrast(!isHighContrast)}
                    className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white transition-colors focus-ring rounded-full"
                    aria-label="Toggle High Contrast Mode"
                  >
                    <span className="text-[12px] font-bold">HC</span>
                    <span className="text-[12px] uppercase tracking-wider">{isHighContrast ? t.common.highContrastOff : t.common.highContrastOn}</span>
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Main Content */}
        <main className={`flex-grow flex flex-col px-6 ${currentPage === 'start' ? 'items-center justify-center text-center' : 'items-start justify-start pt-4 pb-12 md:py-6 lg:py-2 max-w-7xl mx-auto w-full'} ${isMobileMenuOpen ? 'hidden lg:flex' : ''} lg:h-[calc(100dvh-80px)] lg:overflow-hidden`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`w-full flex flex-col flex-grow lg:overflow-y-auto glass-scrollbar ${currentPage === 'start' ? 'items-center justify-center h-full' : 'h-full'}`}
            >
              <Suspense fallback={<div className="text-white/50">{t.common.loading}</div>}>
                {currentPage === 'start' ? (
                  <HeroSection handleNavigate={handleNavigate} />
                ) : currentPage === 'about' ? (
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
                    isCertUnlocked={isCertUnlocked}
                    certPasswordInput={certPasswordInput}
                    setCertPasswordInput={setCertPasswordInput}
                    certError={certError}
                    setIsCertUnlocked={setIsCertUnlocked}
                    setCertError={setCertError}
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
                    <h1 className="heading-gradient text-[28px] md:text-[40px] lg:text-[56px] font-medium leading-[1.28] tracking-tight">
                      {currentPage}
                    </h1>
                    <div className="w-full h-[1px] bg-white/10 shrink-0" />
                    <p className="text-white/70 text-[14px] md:text-lg font-normal max-w-[680px] leading-relaxed">
                      This is the placeholder page for {currentPage}. The background is now solid black, and the content can fill the page.
                    </p>
                  </div>
                )}
              </Suspense>
            </motion.div>
          </AnimatePresence>
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
      
      <CookieBanner handleNavigate={handleNavigate} />
    </div>
  </>
);
}
