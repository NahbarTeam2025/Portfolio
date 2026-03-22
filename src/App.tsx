/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef, startTransition, Suspense, lazy } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Linkedin, ArrowRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate, useTransform } from 'framer-motion';

// Import refactored components
import { MouseGlow } from './components/MouseGlow';
import { TerminalStatus } from './components/TerminalStatus';
import { BentoCard } from './components/BentoCard';
import { Typewriter } from './components/Typewriter';
import { HeroSection } from './components/HeroSection';
import { Footer } from './components/Footer';
import { ImpressumModal } from './components/ImpressumModal';
import { DatenschutzModal } from './components/DatenschutzModal';
import { useSEO } from './hooks/useSEO';

// Lazy load components
const QualifikationSection = lazy(() => import('./components/QualifikationSection').then(m => ({ default: m.QualifikationSection })));
const SkillsSection = lazy(() => import('./components/SkillsSection').then(m => ({ default: m.SkillsSection })));
const ProjekteSection = lazy(() => import('./components/ProjekteSection').then(m => ({ default: m.ProjekteSection })));
const ZertifikateSection = lazy(() => import('./components/ZertifikateSection').then(m => ({ default: m.ZertifikateSection })));
const KontaktSection = lazy(() => import('./components/KontaktSection').then(m => ({ default: m.KontaktSection })));
const UberMichSection = lazy(() => import('./components/UberMichSection').then(m => ({ default: m.UberMichSection })));
const ImpressumPage = lazy(() => import('./pages/ImpressumPage').then(m => ({ default: m.ImpressumPage })));
const DatenschutzPage = lazy(() => import('./pages/DatenschutzPage').then(m => ({ default: m.DatenschutzPage })));

const PAGE_ROUTES: Record<string, string> = {
  'Start': '/',
  'Über mich': '/ueber-mich',
  'Skills': '/skills',
  'Projekte': '/projekte',
  'Qualifikation': '/qualifikation',
  'Zertifikate': '/zertifikate',
  'Kontakt': '/kontakt',
  'Impressum': '/impressum',
  'Datenschutz': '/datenschutz'
};

const ROUTE_TO_PAGE: Record<string, string> = Object.fromEntries(
  Object.entries(PAGE_ROUTES).map(([key, value]) => [value, key])
);

const PAGES = ['Über mich', 'Projekte', 'Skills', 'Qualifikation', 'Zertifikate'];

export default function App() {
  useSEO(); // Initialize dynamic SEO tags
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!ROUTE_TO_PAGE[location.pathname]) {
      navigate('/', { replace: true });
    }
  }, [location.pathname, navigate]);

  const currentPage = ROUTE_TO_PAGE[location.pathname] || 'Start';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
  }, [currentPage]);
  const [expandedQual, setExpandedQual] = useState<number | null>(null);
  const [showTimeline, setShowTimeline] = useState(expandedQual === null);

  useEffect(() => {
    if (expandedQual === null) {
      const timer = setTimeout(() => setShowTimeline(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowTimeline(false);
    }
  }, [expandedQual]);

  const [expandedCert, setExpandedCert] = useState<number | null>(null);
  const [isInitialEntrance, setIsInitialEntrance] = useState(true);

  useEffect(() => {
    setIsInitialEntrance(true);
  }, [currentPage]);

  const [isContactFormExpanded, setIsContactFormExpanded] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Shorter loading time if page is ready, but keep a minimum for the animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const originalTitle = document.title;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Zurück zu Robert Erbach";
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const [isCertUnlocked, setIsCertUnlocked] = useState(false);
  const [certPasswordInput, setCertPasswordInput] = useState('');
  const [certError, setCertError] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const pages = ['Start', 'Über mich', 'Skills', 'Projekte', 'Qualifikation', 'Zertifikate'];

  const handleNavigate = useCallback((page: string) => {
    const targetPath = PAGE_ROUTES[page] || '/';
    if (location.pathname === targetPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      startTransition(() => {
        navigate(targetPath);
      });
    }
    setIsMobileMenuOpen(false);
  }, [navigate, location.pathname]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => {
        setSubmitSuccess(true);
        setIsSubmitting(false);
        form.reset();
        setPrivacyAccepted(false);
      })
      .catch((error) => {
        console.error(error);
        setSubmitError(true);
        setIsSubmitting(false);
      });
  };

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

    if (!isLoading) {
      playVideos();
      // Small delay to ensure DOM is ready
      const timer = setTimeout(playVideos, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, currentPage]);

  return (
    <div 
      className="relative h-[100dvh] w-full font-sans overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Videos Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
        {/* Start Page Video */}
        {currentPage === 'Start' && (
          <div className="absolute inset-0">
            <video
              key="start-video-main"
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline={true}
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source src="https://meine-assets.pages.dev/bgstart.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}

        {/* Subpages Video */}
        {currentPage !== 'Start' && (
          <div className="absolute inset-0 bg-black">
            <video
              key="sub-video-main"
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline={true}
              preload="auto"
              className="w-full h-full object-cover opacity-10"
            >
              <source src="https://meine-assets.pages.dev/bgunterseiten.mp4" type="video/mp4" />
            </video>
          </div>
        )}
        
        {/* Global Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      </div>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
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
                className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-teal to-transparent"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-4 text-white/40 text-[10px] tracking-[0.3em] uppercase font-medium"
            >
              Loading Experience
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Overlay */}
      <MouseGlow />
      <div className={`relative z-10 flex flex-col h-[100dvh] overflow-x-hidden overflow-y-auto`}>
        {/* Navbar */}
        <nav className={`sticky top-0 flex items-center justify-between px-4 py-2 md:px-6 md:py-3 w-full z-50 transition-all duration-300 ${(currentPage !== 'Start' || isMobileMenuOpen) ? 'bg-black/60 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
          <div className="flex items-center">
            {/* Logo */}
            <a 
              href={PAGE_ROUTES['Start']} 
              className="flex items-center gap-3 h-[24px] md:h-[28px] cursor-pointer group" 
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('Start');
              }}
            >
              <img 
                src="https://meine-assets.pages.dev/logo.png" 
                alt="Logo Robert Erbach" 
                width="66"
                height="49"
                decoding="async"
                fetchPriority="high"
                className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <span className="font-audiowide font-bold text-white/90 text-[12px] md:text-[15px] ml-1 md:ml-2">
                Robert Erbach
              </span>
            </a>
          </div>

          {/* Centered Navigation Bar */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-1">
            {PAGES.map((page, index) => (
              <React.Fragment key={page}>
                <a
                  href={PAGE_ROUTES[page]}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(page);
                  }}
                  className={`px-2 xl:px-4 py-1.5 text-[11px] xl:text-[13px] font-medium transition-all duration-500 cursor-pointer relative group hover:scale-110 ${
                    currentPage === page
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{page}</span>
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white/40 transition-all duration-300 group-hover:w-1/3" />
                </a>
                {index < PAGES.length - 1 && (
                  <span className="w-[1px] h-3 bg-white/20 mx-1" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Right side: CTA Button + Mobile Menu Toggle */}
          <div className="flex items-center gap-4 lg:gap-6">

            {/* CTA Button */}
            <a 
              href={PAGE_ROUTES['Kontakt']}
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('Kontakt');
              }}
              className="hidden sm:flex items-center justify-center rounded-full px-6 py-2 bg-gradient-to-r from-brand-violet/20 to-brand-teal/20 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-500 hover:scale-105 hover:from-brand-violet/40 hover:to-brand-teal/40 hover:border-white/20 hover:shadow-[0_0_20px_rgba(5,184,194,0.3)] shadow-[0_0_15px_rgba(124,58,237,0.1)] cursor-pointer active:scale-95"
            >
              <span className="relative z-10">Kontakt</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden text-white p-1.5 md:p-2 -mr-1.5 md:-mr-2 cursor-pointer"
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
                className="absolute top-full left-0 w-full h-[calc(100dvh-100%)] bg-[#050505]/95 backdrop-blur-2xl border-t border-white/5 p-6 flex flex-col gap-4 lg:hidden z-40 overflow-y-auto pb-24 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              >
                {PAGES.map((page, index) => (
                  <motion.a
                    key={page}
                    href={PAGE_ROUTES[page]}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(page);
                    }}
                    className={`text-center text-lg font-medium py-3 border-b border-white/5 transition-colors ${
                      currentPage === page ? 'text-brand-teal' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {page}
                  </motion.a>
                ))}
                <motion.a 
                  href={PAGE_ROUTES['Kontakt']}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + PAGES.length * 0.05, duration: 0.4 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate('Kontakt');
                  }}
                  className="mt-4 flex items-center justify-center w-full sm:hidden rounded-full px-5 py-3 bg-gradient-to-r from-brand-violet/20 to-brand-teal/20 backdrop-blur-md border border-white/10 text-white text-[12px] font-bold tracking-[0.15em] uppercase transition-all duration-500 hover:from-brand-violet/40 hover:to-brand-teal/40 hover:shadow-[0_0_20px_rgba(5,184,194,0.3)] shadow-[0_0_15px_rgba(124,58,237,0.1)] cursor-pointer"
                >
                  <span className="relative z-10">Kontakt</span>
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Main Content */}
        <main className={`grow shrink-0 flex flex-col px-6 ${currentPage === 'Start' ? 'items-center justify-center text-center' : 'items-start justify-start py-4 md:py-10 lg:py-16 max-w-7xl mx-auto w-full'} ${isMobileMenuOpen ? 'hidden lg:flex' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`w-full flex flex-col ${currentPage === 'Start' ? 'h-full items-center justify-center' : ''}`}
            >
              <Suspense fallback={<div className="text-white/50">Lade...</div>}>
                {currentPage === 'Start' ? (
                  <HeroSection handleNavigate={handleNavigate} />
                ) : currentPage === 'Über mich' ? (
                  <UberMichSection handleNavigate={handleNavigate} />
                ) : currentPage === 'Skills' ? (
                  <SkillsSection />
                ) : currentPage === 'Projekte' ? (
                  <ProjekteSection 
                    setIsInitialEntrance={setIsInitialEntrance} 
                  />
                ) : currentPage === 'Qualifikation' ? (
                  <QualifikationSection 
                    expandedQual={expandedQual}
                    setExpandedQual={setExpandedQual}
                    showTimeline={showTimeline}
                    isInitialEntrance={isInitialEntrance}
                    setIsInitialEntrance={setIsInitialEntrance}
                  />
                ) : currentPage === 'Zertifikate' ? (
                  <ZertifikateSection 
                    expandedCert={expandedCert}
                    setExpandedCert={setExpandedCert}
                    isCertUnlocked={isCertUnlocked}
                    certPasswordInput={certPasswordInput}
                    setCertPasswordInput={setCertPasswordInput}
                    certError={certError}
                    setIsCertUnlocked={setIsCertUnlocked}
                    setCertError={setCertError}
                  />
                ) : currentPage === 'Kontakt' ? (
                  <KontaktSection 
                    isSubmitting={isSubmitting}
                    submitSuccess={submitSuccess}
                    submitError={submitError}
                    privacyAccepted={privacyAccepted}
                    setPrivacyAccepted={setPrivacyAccepted}
                    handleNavigate={handleNavigate}
                    handleSubmit={handleSubmit}
                  />
                ) : currentPage === 'Impressum' ? (
                  <ImpressumPage />
                ) : currentPage === 'Datenschutz' ? (
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

      </div>
    </div>
  );
}
