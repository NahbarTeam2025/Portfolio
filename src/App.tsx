/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Typewriter = ({ text, delay = 20, onComplete }: { text: string, delay?: number, onComplete?: () => void }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
  
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  return (
    <span>
      {currentText}
      {currentIndex < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-brand-teal ml-1 animate-pulse align-middle" />
      )}
    </span>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('Start');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
  }, [currentPage]);
  const [expandedQual, setExpandedQual] = useState<number | null>(null);
  const [expandedCert, setExpandedCert] = useState<number | null>(null);
  const [isInitialEntrance, setIsInitialEntrance] = useState(true);

  useEffect(() => {
    setIsInitialEntrance(true);
  }, [currentPage]);

  const [isContactFormExpanded, setIsContactFormExpanded] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isImpressumOpen, setIsImpressumOpen] = useState(false);
  const [isDatenschutzOpen, setIsDatenschutzOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const pages = ['Start', 'Über mich', 'Skills', 'Projekte', 'Qualifikation', 'Zertifikate'];

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = document.getElementsByClassName('wow-card');
    for (const card of cards as any) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <div 
      className="relative h-[100dvh] w-full bg-black font-sans overflow-hidden"
      onMouseMove={handleMouseMove}
    >
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

      {/* Dynamic Subpages Background */}
      {(currentPage !== 'Start' || isMobileMenuOpen) && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            title="Abstraktes Hintergrundvideo"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            src="https://i.imgur.com/Q0b4wA3.mp4"
          />
          {/* Noise overlay */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Background Video */}
      {currentPage === 'Start' && !isMobileMenuOpen && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            title="Hintergrundvideo Robert Erbach Portfolio"
            aria-hidden="true"
            className="w-full h-full object-cover"
          >
            <source
              src="https://raw.githubusercontent.com/NahbarTeam2025/Portfolio/096f1b0a9245e761d5df47f96821eb2ebfe8cda8/15794-266811402%20(1)%20(online-video-cutter.com)%20(1).mp4"
              type="video/mp4"
            />
          </video>
          {/* 50% Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col h-[100dvh] overflow-y-auto overflow-x-hidden">
        {/* Navbar */}
        <nav className={`sticky top-0 flex items-center justify-between px-6 md:px-[120px] py-3 w-full z-50 transition-all duration-300 ${(currentPage !== 'Start' || isMobileMenuOpen) ? 'bg-black/60 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex items-center h-[28px] cursor-pointer" onClick={() => setCurrentPage('Start')}>
              <img 
                src="https://lh3.googleusercontent.com/d/16rnCFNENaFv43lqZvgd7hPXDyKyMi2Zq=s120" 
                alt="Logo" 
                width="37"
                height="28"
                decoding="async"
                className="h-full w-auto object-contain"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                fetchPriority="high"
              />
            </div>
          </div>

          {/* Right side: New Nav Bar + Join Waitlist Button */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* New Page Switcher Navigation Bar */}
            <div className="hidden lg:flex items-center gap-1">
              {pages.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-500 cursor-pointer relative overflow-hidden group hover:scale-110 ${
                    currentPage === page
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {currentPage === page && (
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-violet/20 via-brand-teal/20 to-brand-violet/20 rounded-full" />
                  )}
                  <span className="relative z-10">{page}</span>
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white/40 transition-all duration-300 group-hover:w-1/3" />
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => setCurrentPage('Kontakt')}
              className="hidden sm:flex items-center justify-center rounded-full px-[32px] py-[10px] bg-black/30 backdrop-blur-md border border-white/10 text-white text-[14px] font-semibold tracking-wide shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:bg-gradient-to-r hover:from-black hover:to-blue-900/50 transition-all duration-500 hover:scale-105 cursor-pointer"
            >
              <span className="relative z-10">Kontakt</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden text-white p-2 -mr-2 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
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
                {pages.map((page, index) => (
                  <motion.button
                    key={page}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                    onClick={() => {
                      setCurrentPage(page);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left text-lg font-medium py-3 border-b border-white/5 transition-colors ${
                      currentPage === page ? 'text-brand-teal' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {page}
                  </motion.button>
                ))}
                <motion.button 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + pages.length * 0.05, duration: 0.4 }}
                  onClick={() => {
                    setCurrentPage('Kontakt');
                    setIsMobileMenuOpen(false);
                  }}
                  className="mt-4 flex items-center justify-center w-full sm:hidden rounded-full px-[28px] py-[10px] bg-black/30 backdrop-blur-md border border-white/10 text-white text-[14px] font-semibold tracking-wide shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:bg-gradient-to-r hover:from-black hover:to-blue-900/50 transition-all duration-500 hover:scale-105 cursor-pointer"
                >
                  <span className="relative z-10">Kontakt</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Main Content */}
        <main className={`grow shrink-0 flex flex-col px-6 ${currentPage === 'Start' ? 'items-center justify-center text-center' : 'items-start justify-start py-4 md:py-10 lg:py-16 max-w-7xl mx-auto w-full'} ${isMobileMenuOpen ? 'hidden lg:flex' : ''}`}>
          {currentPage === 'Start' ? (
            <div className="flex flex-col items-center gap-6 md:gap-8 lg:gap-12 max-w-[680px] lg:max-w-[900px] animate-in fade-in duration-500 subtle-float">
              {/* Badge / Pill */}
              <div className="flex items-center gap-2 rounded-[20px] bg-brand-teal/10 border border-brand-teal/20 px-4 py-1.5 backdrop-blur-sm">
                <div className="w-1 h-1 bg-brand-teal rounded-full shadow-[0_0_8px_rgba(5,184,194,0.8)]" />
                <span className="text-[12px] md:text-[14px] font-medium">
                  <span className="text-brand-teal">Portfolio 2026</span>
                </span>
              </div>

              {/* Heading & Subtitle Container */}
              <div className="flex flex-col items-center gap-4 lg:gap-6">
                {/* Heading */}
                <h1 className="flex flex-col items-center text-[32px] md:text-[48px] lg:text-[72px] font-medium leading-[1.1] max-w-[800px] lg:max-w-[1000px] tracking-tight">
                  <span className="text-brand-teal text-glow">Robert Erbach</span>
                  <span className="text-[18px] md:text-[24px] lg:text-[32px] text-white/80 mt-1 lg:mt-3">Digital Marketing Manager</span>
                </h1>

                {/* Subtitle */}
                <div className="flex flex-col items-center gap-2 lg:gap-4">
                  <p className="text-white/90 font-medium text-[12px] md:text-[14px] lg:text-[16px] tracking-widest uppercase text-center">
                    SEO • Content Marketing • Social Media • KI Workflows
                  </p>
                  <p className="text-white/70 text-[14px] md:text-[16px] lg:text-[20px] font-normal max-w-[680px] lg:max-w-[800px] leading-relaxed text-center">
                    Ich verbinde SEO, Content und KI-Workflows zu Marketinglösungen, die nicht nur gut aussehen, sondern messbar funktionieren.
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mt-2 lg:mt-4">
                <button 
                  onClick={() => setCurrentPage('Kontakt')}
                  className="flex items-center justify-center gap-2 rounded-full px-[40px] py-[12px] bg-gradient-to-r from-brand-violet/20 to-brand-teal/20 border border-white/10 text-white text-[15px] font-semibold tracking-wide shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:from-brand-violet/40 hover:to-brand-teal/40 transition-all duration-500 hover:scale-105 cursor-pointer group/cta animate-pulse-subtle"
                >
                  <span className="relative z-10">Kontakt</span>
                  <svg className="w-5 h-5 transform transition-transform duration-300 group-hover/cta:translate-x-2 animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ) : currentPage === 'Über mich' ? (
            <div className="flex flex-col items-start gap-4 md:gap-8 w-full animate-in fade-in duration-500">
              <h1 className="heading-gradient text-[28px] md:text-[40px] lg:text-[56px] font-medium leading-[1.28] tracking-tight shrink-0">
                Über mich
              </h1>
              <div className="w-full h-[1px] bg-white/10 shrink-0" />
              <div className="flex flex-col gap-4 md:gap-6 text-white/80 text-[14px] md:text-[16px] lg:text-[20px] font-normal max-w-[1000px] leading-relaxed pt-4 md:pt-8">
                <p>
                  <Typewriter 
                    text="Marketing ist für mich ein Werkzeugkasten – und ich nutze ihn mit wachsender Präzision. Ich verbinde SEO, Content und KI-Workflows zu Lösungen, die nicht nur gut aussehen, sondern funktionieren." 
                    onComplete={() => setStep(1)}
                  />
                </p>
                {step >= 1 && (
                  <p>
                    <Typewriter 
                      text="Mein praktisches Projekt ist eine Landingpage für ein SEO-KI-System – von der Konzeption bis zum funktionierenden Kontaktformular." 
                      delay={15}
                      onComplete={() => setStep(2)}
                    />
                  </p>
                )}
                {step >= 2 && (
                  <p className="text-white font-medium mt-2 md:mt-4 text-[16px] md:text-[18px] lg:text-[24px]">
                    <Typewriter 
                      text="Mein Antrieb: aus Ideen echte Ergebnisse machen." 
                      delay={25}
                      onComplete={() => setStep(3)}
                    />
                  </p>
                )}
                <div className={`mt-4 md:mt-8 transition-opacity duration-1000 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                  <img 
                    src="https://lh3.googleusercontent.com/d/1QObFwkk3K9eYOvQaFoIlhzV5qZbvB2kC=s300" 
                    alt="Unterschrift Robert Erbach" 
                    className="h-12 md:h-20 w-auto object-contain invert mix-blend-screen opacity-90"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
             ) : currentPage === 'Skills' ? (
            <div className="flex flex-col items-start gap-3 md:gap-4 w-full animate-in fade-in duration-500">
              <h1 className="heading-gradient text-[28px] md:text-[36px] lg:text-[48px] font-medium leading-[1.2] tracking-tight shrink-0">
                Skills & Kompetenzen
              </h1>
              <div className="w-full h-[1px] bg-white/10 shrink-0" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-4 md:gap-y-4 w-full max-w-[1400px] py-2 md:py-2">
                {[
                  {
                    category: 'Marketing & SEO',
                    skills: [
                      { name: 'Digital Marketing', value: 95 },
                      { name: 'SEO & Google Ads', value: 90 },
                      { name: 'Social Media Marketing', value: 85 },
                      { name: 'Content Creation', value: 90 }
                    ]
                  },
                  {
                    category: 'Tech & KI',
                    skills: [
                      { name: 'Web Analytics', value: 80 },
                      { name: 'MS Office & DB', value: 95 },
                      { name: 'Prompt Engineering', value: 90 },
                      { name: 'KI-Workflows', value: 85 }
                    ]
                  },
                  {
                    category: 'Soft Skills',
                    skills: [
                      { name: 'Teamfähigkeit', value: 95 },
                      { name: 'Kommunikation', value: 90 },
                      { name: 'Problemlösung', value: 85 },
                      { name: 'Zeitmanagement', value: 90 }
                    ]
                  },
                  {
                    category: 'Sprachen',
                    skills: [
                      { name: 'Deutsch', value: 100 },
                      { name: 'Englisch', value: 70 }
                    ]
                  }
                ].map((group, groupIndex) => (
                  <div key={group.category} className="wow-card flex flex-col gap-2 md:gap-4 p-4 md:p-6 lg:p-7">
                    <div className="wow-card-border" />
                    <h2 className="text-brand-teal text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold opacity-90 relative z-10">{group.category}</h2>
                    <div className="flex flex-col gap-2 md:gap-4 lg:gap-5 relative z-10">
                      {group.skills.map((skill, skillIndex) => {
                        const globalIndex = groupIndex * 4 + skillIndex;
                        return (
                          <div key={skill.name} className="flex flex-col gap-1.5 md:gap-3 w-full group/skill relative">
                            {/* Custom Tooltip */}
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 border border-white/10 rounded-xl text-white text-[12px] md:text-[14px] whitespace-nowrap opacity-0 group-hover/skill:opacity-100 transition-all duration-300 pointer-events-none z-50 backdrop-blur-xl shadow-2xl translate-y-2 group-hover/skill:translate-y-0">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                                <span className="font-medium">{skill.name}</span>
                                <span className="text-brand-teal font-bold ml-1">{skill.value}%</span>
                              </div>
                              {/* Tooltip Arrow */}
                              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/80 border-r border-b border-white/10 rotate-45"></div>
                            </div>

                            <div className="flex justify-between items-end w-full">
                              <span className="text-white font-medium text-[13px] md:text-[15px] lg:text-[16px] leading-none">{skill.name}</span>
                              <span className="text-brand-teal font-mono text-[10px] md:text-[13px] leading-none">{skill.value}%</span>
                            </div>
                            <div className="w-full h-1 md:h-1.5 bg-white/10 rounded-full overflow-hidden cursor-help">
                              <div 
                                className="h-full bg-gradient-to-r from-brand-violet to-brand-teal rounded-full shadow-[0_0_15px_rgba(5,184,194,0.4)] animate-gradient-shift animate-skill-fill" 
                                style={{ 
                                  width: `${skill.value}%`,
                                  animationDelay: `${globalIndex * 200}ms`,
                                  animationFillMode: 'both'
                                }} 
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : currentPage === 'Projekte' ? (
            <div className="flex flex-col items-start gap-4 md:gap-8 w-full animate-in fade-in duration-500">
              <h1 className="heading-gradient text-[28px] md:text-[40px] lg:text-[56px] font-medium leading-[1.28] tracking-tight shrink-0">
                Projekte
              </h1>
              <div className="w-full h-[1px] bg-white/10 shrink-0" />
              <div className="flex flex-col gap-4 w-full max-w-[1200px] pb-8">
                {[
                  {
                    title: 'Social Media Kampagnenstruktur',
                    desc: 'Konzeption einer Social Media Strategie für Markenaufbau und Leadgenerierung.',
                    features: ['Plattformstrategie', 'Ad-Struktur', 'Creative Briefings', 'Tracking-Setup']
                  },
                  {
                    title: 'KI Workflow für Marketingprozesse',
                    desc: 'Automatisierte Content- und Marketingprozesse mit KI-Tools und Prompt Engineering.',
                    features: ['Prozessanalyse', 'Prompt-Bibliothek', 'Tool-Integration', 'Effizienzsteigerung']
                  },
                  {
                    title: 'SEO Landingpage Projekt',
                    desc: 'Konzeption und Entwicklung einer SEO-optimierten Landingpage inklusive Contentstruktur, UX-Design und funktionierendem Kontaktformular.',
                    features: ['SEO Struktur', 'Conversion optimiertes Layout', 'Responsive Design', 'Kontaktformular']
                  }
                ].filter((_, i) => expandedProject === null || expandedProject === i).map((project, i) => {
                  const actualIndex = expandedProject === null ? i : expandedProject;
                  const isExpanded = expandedProject !== null;
                  return (
                    <div 
                      key={actualIndex} 
                      className={`wow-card group flex flex-col transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-brand-violet/50 ${isExpanded ? 'flex-1 min-h-0 ring-1 ring-brand-violet/30 shadow-[0_0_30px_rgba(139,92,246,0.2)]' : 'overflow-hidden'} ${!isExpanded && isInitialEntrance ? 'animate-project-entrance' : ''}`}
                      style={{ animationDelay: isExpanded ? '0ms' : `${i * 400}ms` }}
                    >
                      <div className="wow-card-border" />
                      <button 
                        onClick={() => {
                          setExpandedProject(isExpanded ? null : actualIndex);
                          setIsInitialEntrance(false);
                        }}
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? "Projekt-Details einklappen" : "Projekt-Details ausklappen"}
                        className={`w-full text-left p-6 md:p-8 flex justify-between items-center group/btn relative z-10 ${isExpanded ? 'shrink-0' : 'min-h-[100px]'}`}
                      >
                        <div className="flex flex-col gap-1">
                          <span className="text-brand-teal text-[10px] font-bold uppercase tracking-widest opacity-80">Projekt {actualIndex + 1}</span>
                          <h3 className="text-lg md:text-2xl font-semibold text-white leading-tight group-hover/btn:text-brand-teal transition-colors">{project.title}</h3>
                        </div>
                        <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-brand-violet/20 border-brand-violet/40' : ''}`}>
                          <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                      
                      <div 
                        className={`transition-all duration-500 ease-in-out relative z-10 ${isExpanded ? 'flex-1 min-h-0 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                      >
                        <div className="px-6 pb-6 md:px-8 md:pb-8 flex flex-col gap-6">
                          <div className="w-full h-[1px] bg-white/5 shrink-0" />
                          <div className="pr-2">
                            <p className="text-white/70 text-[14px] md:text-[15px] lg:text-[17px] leading-relaxed mb-6">{project.desc}</p>
                            <div className="flex flex-col gap-3">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Key Features</span>
                              <ul className="flex flex-wrap gap-2">
                                {project.features.map((feature, j) => (
                                  <li key={j} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-[11px] font-medium">
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="flex mt-auto pt-4 shrink-0">
                            <button className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-brand-violet/20 to-brand-teal/20 border border-white/10 text-white font-medium text-[13px] hover:from-brand-violet/40 hover:to-brand-teal/40 transition-all group/btn2 ${isExpanded ? 'animate-pulse-subtle shadow-[0_0_15px_rgba(124,58,237,0.3)]' : ''}`}>
                              Details ansehen
                              <svg className={`w-4 h-4 transform transition-transform duration-300 group-hover/btn2:translate-x-2 ${isExpanded ? 'animate-bounce-x' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : currentPage === 'Qualifikation' ? (
            <div className="flex flex-col items-start gap-4 md:gap-8 w-full animate-in fade-in duration-500">
              <h1 className="heading-gradient text-[28px] md:text-[40px] lg:text-[56px] font-medium leading-[1.28] tracking-tight shrink-0">
                Berufliche Qualifikation
              </h1>
              <div className="w-full h-[1px] bg-white/10 shrink-0" />
              <div className="flex flex-col gap-4 w-full max-w-[1200px] pb-8">
                {[
                  {
                    date: '07/2025 – 04/2026',
                    title: 'Digital Marketing Manager (Weiterbildung)',
                    company: 'GFN GmbH',
                    items: ['Content Marketing', 'Social Media Marketing', 'SEO / SEA', 'E-Commerce und datengetriebene Kampagnen', 'Web Analytics (Google Analytics, Tag Manager)', 'Neuromarketing']
                  },
                  {
                    date: '06/2024 – 05/2025',
                    title: 'Kaufmännische Weiterbildung',
                    company: 'Fortbildungsakademie der Wirtschaft (IBB)',
                    items: ['Kaufmännischer Schriftverkehr nach DIN 5008', 'MS Office', 'Datenbanken (MS Access)', 'IT-Sicherheit', 'Datenschutz (DSGVO)']
                  },
                  {
                    date: '07/2017 – 05/2024',
                    title: 'Berufliche Tätigkeiten',
                    company: 'Handwerker- und Büroservice',
                    desc: 'Berufliche Tätigkeiten im Handwerker- und Büroservice.\nParallel gezielte Vorbereitung auf den Einstieg ins Digital Marketing mit Fokus auf digitale Themen.'
                  },
                  {
                    date: '09/2013 – 09/2016',
                    title: 'Ausbildung Kaufmann im Gesundheitswesen',
                    company: 'Sanitätshaus Bauch'
                  }
                ].filter((_, i) => expandedQual === null || expandedQual === i).map((qual, i) => {
                  const actualIndex = expandedQual === null ? i : expandedQual;
                  const isExpanded = expandedQual !== null;
                  return (
                    <div 
                      key={actualIndex} 
                      className={`wow-card group flex flex-col ${isExpanded ? 'flex-1 min-h-0 ring-1 ring-brand-teal/30' : 'overflow-hidden'} ${!isExpanded && isInitialEntrance ? 'animate-project-entrance' : ''}`}
                      style={{ animationDelay: isExpanded ? '0ms' : `${i * 400}ms` }}
                    >
                      <div className="wow-card-border" />
                      <button 
                        onClick={() => {
                          setExpandedQual(isExpanded ? null : actualIndex);
                          setIsInitialEntrance(false);
                        }}
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? "Qualifikation-Details einklappen" : "Qualifikation-Details ausklappen"}
                        className={`w-full text-left p-5 md:p-6 flex justify-between items-center group/btn relative z-10 ${isExpanded ? 'shrink-0' : 'min-h-[90px]'}`}
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-base md:text-lg font-semibold text-white leading-tight group-hover/btn:text-brand-teal transition-colors">{qual.title}</h3>
                            <span className="hidden sm:inline-block text-brand-teal font-mono text-[10px] bg-brand-teal/10 px-2 py-0.5 rounded-md">{qual.date}</span>
                          </div>
                          <span className="text-white/60 text-[12px] md:text-[14px]">{qual.company}</span>
                        </div>
                        <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-brand-violet/20 border-brand-violet/40' : ''}`}>
                          <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      <div 
                        className={`transition-all duration-500 ease-in-out relative z-10 ${isExpanded ? 'flex-1 min-h-0 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                      >
                        <div className="px-5 pb-5 md:px-6 md:pb-6 flex flex-col gap-4">
                          <div className="w-full h-[1px] bg-white/5 shrink-0" />
                          <div className="pr-2">
                            <div className="sm:hidden mb-4">
                              <span className="text-brand-teal font-mono text-[11px] bg-brand-teal/10 px-2.5 py-1 rounded-md">{qual.date}</span>
                            </div>
                            {qual.desc && (
                              <p className="text-white/70 text-[13px] md:text-[14px] leading-relaxed whitespace-pre-line mb-4">{qual.desc}</p>
                            )}
                            {qual.items && (
                              <ul className="grid grid-cols-1 gap-2">
                                {qual.items.map((item, j) => (
                                  <li key={j} className="text-white/70 flex items-start gap-2 text-[12px] md:text-[13px]">
                                    <span className="text-brand-violet mt-1.5 text-[8px]">■</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div className="mt-auto" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : currentPage === 'Zertifikate' ? (
            <div className="flex flex-col items-start gap-4 md:gap-8 w-full animate-in fade-in duration-500">
              <h1 className="heading-gradient text-[28px] md:text-[40px] lg:text-[56px] font-medium leading-[1.28] tracking-tight shrink-0">
                Zertifikate
              </h1>
              <div className="w-full h-[1px] bg-white/10 shrink-0" />
              <div className="flex flex-col gap-4 w-full max-w-[1200px] pb-32">
                {[
                  { id: 1, title: 'Digital Marketing Manager', issuer: 'GFN GmbH', date: '2026' },
                  { id: 2, title: 'SEO Spezialist', issuer: 'Google / Coursera', date: '2025' },
                  { id: 3, title: 'Social Media Strategie', issuer: 'HubSpot Academy', date: '2025' },
                  { id: 4, title: 'Web Analytics', issuer: 'Google Analytics', date: '2025' },
                  { id: 5, title: 'KI im Marketing', issuer: 'LinkedIn Learning', date: '2024' },
                  { id: 6, title: 'Kaufmännische Grundlagen', issuer: 'IBB', date: '2024' }
                ].filter((_, i) => expandedCert === null || expandedCert === i).map((cert, i) => {
                  const actualIndex = expandedCert === null ? i : expandedCert;
                  const isExpanded = expandedCert !== null;
                  return (
                    <div 
                      key={cert.id} 
                      className={`wow-card group flex flex-col ${isExpanded ? 'ring-1 ring-brand-teal/30' : ''} ${!isExpanded && isInitialEntrance ? 'animate-project-entrance' : ''}`}
                      style={{ animationDelay: isExpanded ? '0ms' : `${i * 400}ms` }}
                    >
                      <div className="wow-card-border" />
                      <button 
                        onClick={() => {
                          setExpandedCert(isExpanded ? null : actualIndex);
                          setIsInitialEntrance(false);
                        }}
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? "Zertifikat-Details einklappen" : "Zertifikat-Details ausklappen"}
                        className={`w-full text-left px-5 py-6 md:px-8 md:py-8 flex justify-between items-center group/btn relative z-10 ${isExpanded ? 'shrink-0' : 'min-h-[110px] md:min-h-[130px]'}`}
                      >
                        <div className="flex items-center gap-4 md:gap-6">
                          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-brand-teal/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(5,184,194,0.2)] group-hover/btn:scale-110 transition-transform duration-500 animate-pulse-subtle">
                            <svg className="w-5 h-5 md:w-7 md:h-7 text-brand-teal transition-transform duration-500 group-hover/btn:rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="flex flex-col gap-1">
                            <h3 className="text-lg md:text-2xl font-bold text-white leading-tight group-hover/btn:text-brand-teal transition-colors">{cert.title}</h3>
                            <span className="text-white/60 text-[12px] md:text-[15px] font-medium tracking-wide">{cert.issuer} • {cert.date}</span>
                          </div>
                        </div>
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 ${isExpanded ? 'rotate-180 bg-brand-violet/30 border-brand-violet/50 shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'group-hover/btn:border-brand-teal/50 group-hover/btn:bg-brand-teal/10'}`}>
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      <div 
                        className={`transition-all duration-500 ease-in-out relative z-10 ${isExpanded ? 'opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                      >
                        <div className="px-5 pb-5 md:px-8 md:pb-8 flex flex-col gap-4">
                          <div className="w-full h-[1px] bg-white/5 shrink-0" />
                          <div className="flex flex-col gap-6">
                            <p className="text-white/70 text-[13px] md:text-[15px] lg:text-[17px] leading-relaxed">Offizieller Nachweis über die erfolgreiche Teilnahme und den Abschluss der Weiterbildung im Bereich {cert.title}. Dieses Zertifikat bestätigt die erworbenen Fachkenntnisse und praktischen Fertigkeiten.</p>
                            <a 
                              href="#" 
                              download
                              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-brand-teal/20 to-brand-violet/20 hover:from-brand-teal/30 hover:to-brand-violet/30 border border-white/10 text-white text-[14px] font-bold shadow-[0_0_20px_rgba(5,184,194,0.2)] transition-all"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Zertifikat herunterladen (PDF)
                            </a>
                          </div>
                          <div className="mt-auto" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : currentPage === 'Kontakt' ? (
            <div className="flex flex-col items-start gap-4 md:gap-8 w-full animate-in fade-in duration-500">
              <h1 className="heading-gradient text-[28px] md:text-[40px] lg:text-[56px] font-medium leading-[1.28] tracking-tight shrink-0">
                Kontakt
              </h1>
              <div className="w-full h-[1px] bg-white/10 shrink-0" />
              
              <div className="flex flex-col gap-8 w-full pb-8">
                <div className={`flex ${isContactFormExpanded ? 'flex-col items-center' : 'flex-col md:flex-row'} gap-8 md:gap-12 lg:gap-20 w-full transition-all duration-500`}>
                  
                  {!isContactFormExpanded && (
                    <div className="flex flex-col gap-4 md:gap-8 flex-1 animate-in fade-in slide-in-from-left-4 duration-500">
                      <div className="flex flex-col gap-2 md:gap-4">
                        <h2 className="text-lg md:text-2xl font-medium text-white leading-tight">Interesse an meiner Arbeit oder Fragen zu meinen Projekten?</h2>
                        <p className="text-white/70 text-[14px] md:text-lg">Ich freue mich über eine Nachricht.</p>
                      </div>
                      
                      <div className="flex flex-col gap-4 md:gap-6 mt-2 md:mt-4">
                        <div className="flex items-start gap-3 md:gap-4">
                          <div className="mt-0.5 md:mt-1">
                            <Phone className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={1.5} />
                          </div>
                          <div className="flex flex-col gap-0.5 md:gap-1">
                            <span className="text-white/50 text-[11px] md:text-sm uppercase tracking-wider font-medium">Telefon</span>
                            <a href="tel:015204041124" className="text-white text-[14px] md:text-lg hover:underline underline-offset-4">0152 04041124</a>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 md:gap-4">
                          <div className="mt-0.5 md:mt-1">
                            <Mail className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={1.5} />
                          </div>
                          <div className="flex flex-col gap-0.5 md:gap-1">
                            <span className="text-white/50 text-[11px] md:text-sm uppercase tracking-wider font-medium">E-Mail</span>
                            <a href="mailto:roberterbach@web.de" className="text-white text-[14px] md:text-lg hover:underline underline-offset-4">roberterbach@web.de</a>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 md:gap-4">
                          <div className="mt-0.5 md:mt-1">
                            <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={1.5} />
                          </div>
                          <div className="flex flex-col gap-0.5 md:gap-1">
                            <span className="text-white/50 text-[11px] md:text-sm uppercase tracking-wider font-medium">LinkedIn</span>
                            <a href="https://www.linkedin.com/in/roberterbach" target="_blank" rel="noopener noreferrer" className="text-white text-[14px] md:text-lg hover:underline underline-offset-4">@roberterbach</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className={`transition-all duration-500 ${isContactFormExpanded ? 'w-full max-w-[800px]' : 'flex-1 w-full max-w-[600px]'}`}>
                    <div className={`wow-card group flex flex-col ${isContactFormExpanded ? 'ring-1 ring-brand-violet/30' : 'overflow-hidden'}`}>
                      <div className="wow-card-border" />
                      <button 
                        onClick={() => setIsContactFormExpanded(!isContactFormExpanded)}
                        aria-expanded={isContactFormExpanded}
                        aria-label={isContactFormExpanded ? "Kontaktformular einklappen" : "Kontaktformular ausklappen"}
                        className="w-full text-left p-4 md:p-6 flex justify-between items-center group/btn relative z-10"
                      >
                        <h3 className="text-base md:text-xl font-semibold text-white leading-tight group-hover/btn:text-brand-teal transition-colors">Nachricht senden</h3>
                        <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-300 ${isContactFormExpanded ? 'rotate-180 bg-brand-violet/20 border-brand-violet/40' : ''}`}>
                          <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      <div 
                        className={`transition-all duration-500 ease-in-out relative z-10 ${isContactFormExpanded ? 'opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                      >
                        <div className="px-4 pb-4 md:px-6 md:pb-6">
                          {submitSuccess ? (
                            <div className="flex flex-col items-center justify-center gap-4 py-8 text-center animate-in fade-in zoom-in duration-500">
                              <div className="w-16 h-16 rounded-full bg-brand-teal/20 flex items-center justify-center mb-2">
                                <svg className="w-8 h-8 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <h3 className="text-xl font-medium text-white">Vielen Dank!</h3>
                              <p className="text-white/70 text-sm max-w-xs">Ihre Nachricht wurde erfolgreich gesendet. Ich werde mich in Kürze bei Ihnen melden.</p>
                              <button 
                                onClick={() => setSubmitSuccess(false)}
                                className="mt-4 text-brand-teal text-sm font-medium hover:underline"
                              >
                                Weitere Nachricht senden
                              </button>
                            </div>
                          ) : (
                            <form 
                              action="https://api.web3forms.com/submit"
                              method="POST"
                              className="flex flex-col gap-3 md:gap-3 w-full bg-white/5 p-4 md:p-5 rounded-2xl border border-white/10" 
                              onSubmit={handleSubmit}
                            >
                              <input type="hidden" name="access_key" value="1ebce7a4-5cb3-49d8-b826-2be2c6447608" />
                              <input type="hidden" name="from_name" value="Portfolio Kontakt" />
                              <input type="hidden" name="subject" value="Neue Nachricht vom Portfolio" />
                              <p className="hidden">
                                <label>
                                  Don’t fill this out if you're human: <input name="bot-field" />
                                </label>
                              </p>
                              
                              {submitError && (
                                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm mb-2">
                                  Es gab einen Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.
                                </div>
                              )}
                              
                              <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full">
                                <div className="flex flex-col gap-1 md:gap-1.5 flex-1">
                                  <label htmlFor="name" className="text-white font-medium text-[13px] md:text-[14px]">Name</label>
                                  <input 
                                    type="text" 
                                    id="name" 
                                    name="name"
                                    placeholder="Ihr Name" 
                                    required
                                    className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 md:px-3 md:py-2 text-[13px] md:text-[15px] text-white placeholder:text-white/20 focus:outline-none focus:border-brand-teal/50 focus:bg-white/10 transition-all"
                                  />
                                </div>
                                <div className="flex flex-col gap-1 md:gap-1.5 flex-1">
                                  <label htmlFor="email" className="text-white font-medium text-[13px] md:text-[14px]">E-Mail</label>
                                  <input 
                                    type="email" 
                                    id="email" 
                                    name="email"
                                    placeholder="ihre@email.de" 
                                    required
                                    className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 md:px-3 md:py-2 text-[13px] md:text-[15px] text-white placeholder:text-white/20 focus:outline-none focus:border-brand-teal/50 focus:bg-white/10 transition-all"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col gap-1 md:gap-1.5">
                                <label htmlFor="message" className="text-white font-medium text-[13px] md:text-[14px]">Nachricht</label>
                                <textarea 
                                  id="message" 
                                  name="message"
                                  placeholder="Ihre Nachricht" 
                                  required
                                  rows={3}
                                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 md:px-3 md:py-2 text-[13px] md:text-[15px] text-white placeholder:text-white/20 focus:outline-none focus:border-brand-teal/50 focus:bg-white/10 transition-all resize-none"
                                />
                              </div>
                              <div className="flex items-start gap-3 mt-1">
                                <input 
                                  type="checkbox" 
                                  id="privacy" 
                                  name="privacy"
                                  checked={privacyAccepted}
                                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                                  className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-brand-teal focus:ring-brand-teal focus:ring-offset-0 cursor-pointer"
                                  required
                                />
                                <label htmlFor="privacy" className="text-[12px] md:text-[13px] text-white/60 leading-relaxed cursor-pointer">
                                  Ich stimme der Verarbeitung meiner Daten gemäß der <button type="button" onClick={() => setIsDatenschutzOpen(true)} className="text-brand-teal hover:underline">Datenschutzerklärung</button> zu.
                                </label>
                              </div>
                              <button 
                                type="submit" 
                                disabled={!privacyAccepted || isSubmitting}
                                className={`mt-1 text-white text-[14px] md:text-base font-bold py-2.5 px-6 md:py-2.5 md:px-8 rounded-xl transition-all ${privacyAccepted && !isSubmitting ? 'bg-gradient-to-r from-brand-violet to-brand-teal hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(124,58,237,0.3)]' : 'bg-white/10 text-white/40 cursor-not-allowed'}`}
                              >
                                {isSubmitting ? 'Wird gesendet...' : 'Absenden'}
                              </button>
                            </form>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
        </main>

        {/* Footer */}
        <footer className={`w-full border-t border-white/5 bg-black/35 backdrop-blur-xl py-3 px-6 md:px-[120px] mt-auto relative z-10 shrink-0 ${isMobileMenuOpen ? 'hidden lg:block' : ''}`}>
          <div className="max-w-7xl mx-auto flex flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setCurrentPage('Start')}>
              <img 
                src="https://lh3.googleusercontent.com/d/16rnCFNENaFv43lqZvgd7hPXDyKyMi2Zq" 
                alt="Logo" 
                className="h-[28px] w-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(5,184,194,0.6)]"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                loading="lazy"
              />
              <span className="text-white text-[11px] hidden sm:block group-hover:text-brand-teal transition-colors">Robert Erbach</span>
            </div>
            
            <div className="flex flex-row justify-end gap-4 md:gap-6 text-[11px]">
              <button onClick={() => setIsImpressumOpen(true)} className="text-white hover:text-brand-teal transition-colors">Impressum</button>
              <button onClick={() => setIsDatenschutzOpen(true)} className="text-white hover:text-brand-teal transition-colors">Datenschutz</button>
            </div>
          </div>
        </footer>

        {/* Impressum Modal */}
        {isImpressumOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsImpressumOpen(false)} />
            <div className="relative w-full max-w-2xl max-h-[85vh] bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
                <h2 className="text-2xl font-medium text-white">Impressum</h2>
                <button 
                  onClick={() => setIsImpressumOpen(false)}
                  className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto text-white/70 text-sm leading-relaxed space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Angaben gemäß § 5 TMG</h3>
                  <p>
                    Robert Erbach<br />
                    Am Stadtpark 43<br />
                    04895 Falkenberg/Elster
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Kontakt</h3>
                  <p>
                    Telefon: 0152-04041124<br />
                    E-Mail: roberterbach@web.de
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
                  <p>
                    Robert Erbach<br />
                    Am Stadtpark 43<br />
                    04895 Falkenberg/Elster
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Datenschutz Modal */}
        {isDatenschutzOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDatenschutzOpen(false)} />
            <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
                <h2 className="text-2xl font-medium text-white">Datenschutzerklärung</h2>
                <button 
                  onClick={() => setIsDatenschutzOpen(false)}
                  className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto text-white/70 text-sm leading-relaxed space-y-8">
                
                <section>
                  <h3 className="text-lg font-medium text-white mb-3">1. Datenschutz auf einen Blick</h3>
                  <h4 className="text-base font-medium text-white/90 mb-2">Allgemeine Hinweise</h4>
                  <p className="mb-4">
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                  </p>
                  <h4 className="text-base font-medium text-white/90 mb-2">Datenerfassung auf dieser Website</h4>
                  <p className="mb-2"><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
                  <p className="mb-4">Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>
                  <p className="mb-2"><strong>Wie erfasse ich Ihre Daten?</strong></p>
                  <p className="mb-4">Ihre Daten werden zum einen dadurch erhoben, dass Sie mir diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch meine IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).</p>
                  <p className="mb-2"><strong>Wofür nutze ich Ihre Daten?</strong></p>
                  <p className="mb-4">Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.</p>
                  <p className="mb-2"><strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong></p>
                  <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</p>
                </section>

                <section>
                  <h3 className="text-lg font-medium text-white mb-3">2. Hosting</h3>
                  <p className="mb-2">Ich hoste die Inhalte meiner Website bei folgendem Anbieter:</p>
                  <h4 className="text-base font-medium text-white/90 mb-2">Cloudflare</h4>
                  <p className="mb-4">Anbieter ist die Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA (nachfolgend „Cloudflare“).</p>
                  <p className="mb-4">Wenn Sie meine Website besuchen, erfasst Cloudflare verschiedene Logfiles inklusive Ihrer IP-Adressen. Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie in der Datenschutzerklärung von Cloudflare: <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline">https://www.cloudflare.com/privacypolicy/</a>.</p>
                  <p>Die Verwendung von Cloudflare erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Ich habe ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung meiner Website.</p>
                </section>

                <section>
                  <h3 className="text-lg font-medium text-white mb-3">3. Allgemeine Hinweise und Pflichtinformationen</h3>
                  <h4 className="text-base font-medium text-white/90 mb-2">Datenschutz</h4>
                  <p className="mb-4">Ich nehme den Schutz Ihrer persönlichen Daten sehr ernst. Ich behandle Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
                  <h4 className="text-base font-medium text-white/90 mb-2">Hinweis zur verantwortlichen Stelle</h4>
                  <p className="mb-4">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                  <p className="mb-4">
                    Robert Erbach<br />
                    Am Stadtpark 43<br />
                    04895 Falkenberg/Elster<br />
                    Telefon: 0152-04041124<br />
                    E-Mail: roberterbach@web.de
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-medium text-white mb-3">4. Datenerfassung auf dieser Website</h3>
                  <h4 className="text-base font-medium text-white/90 mb-2">Kontaktformular (Web3Forms)</h4>
                  <p className="mb-4">Wenn Sie mir per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei mir gespeichert. Diese Daten gebe ich nicht ohne Ihre Einwilligung weiter.</p>
                  <p className="mb-4">Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt zur Abwicklung Ihrer Anfrage. Ich nutze für die Bereitstellung des Formulars den Dienst "Web3Forms" des Anbieters Web3Forms. Die von Ihnen eingegebenen Daten werden auf den Servern von Web3Forms verarbeitet.</p>
                  <p className="mb-4">Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf meinem berechtigten Interesse an der effektiven Bearbeitung der an mich gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.</p>
                  <p className="mb-6">Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei mir, bis Sie mich zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.</p>

                  <h4 className="text-base font-medium text-white/90 mb-2">Bereitstellung von Downloads (Zertifikate)</h4>
                  <p className="mb-6">Ich biete auf meiner Website Zertifikate zum Download an. Beim Herunterladen dieser Dateien werden standardmäßig technische Daten (wie Ihre IP-Adresse, Zeitpunkt des Downloads, Dateiname) durch meinen Hoster Cloudflare erfasst. Dies ist technisch notwendig, um den Download zur Verfügung zu stellen (Art. 6 Abs. 1 lit. f DSGVO). Es erfolgt keine darüber hinausgehende Auswertung Ihres Download-Verhaltens zu Marketingzwecken.</p>
                </section>

                <section>
                  <h3 className="text-lg font-medium text-white mb-3">5. Externe Ressourcen und CDN</h3>
                  <h4 className="text-base font-medium text-white/90 mb-2">Bunny Fonts, Imgur & Google Photos</h4>
                  <p className="mb-4">Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten und Medien externe Ressourcen. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Dateien direkt von den Servern der jeweiligen Anbieter (Bunny.net, Imgur) in Ihren Browsercache. Hierbei wird technisch bedingt Ihre IP-Adresse an diese Anbieter übertragen. Bunny Fonts ist eine datenschutzfreundliche Alternative zu Google Fonts und wird auf Servern innerhalb der EU bereitgestellt.</p>
                </section>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
