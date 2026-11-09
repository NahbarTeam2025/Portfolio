import React, { useState, useEffect, useCallback } from 'react';
import { OfficeIllustration } from './components/OfficeIllustration';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeSection, setActiveSection] = useState('start');
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string } | null>(null);

  // Detection for mobile view (matching CSS breakpoint)
  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth <= 920);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const closeMobileMenu = useCallback(() => {
    if (!isMobileOpen) return;
    // SCHLIESSEN: ZUERST Fokus auf #burger, DANN erst Schließen/Inert
    document.getElementById('burger')?.focus();
    setIsMobileOpen(false);
  }, [isMobileOpen]);

  const openMobileMenu = useCallback(() => {
    if (isMobileOpen) return;
    // ÖFFNEN: ZUERST state auf true (entfernt inert), DANN Fokus auf ersten Punkt
    setIsMobileOpen(true);
    requestAnimationFrame(() => {
      const firstLink = document.querySelector('#navlinks a') as HTMLElement;
      firstLink?.focus();
    });
  }, [isMobileOpen]);

  // Sticky nav scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen && isMobileView) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen, isMobileView]);

  // IntersectionObserver for active navigation
  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const sections = document.querySelectorAll('section[id], div[id="impressum"], div[id="datenschutz"]');
      const navObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { rootMargin: '-40% 0px -50% 0px' }
      );
      sections.forEach((s) => navObserver.observe(s));

      return () => {
        navObserver.disconnect();
      };
    }
  }, []);



  const lastTriggerRef = React.useRef<HTMLElement | null>(null);

  // Deep-link hash scroll handling on mount and hashchange
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = decodeURIComponent(hash.replace('#', ''));
        const target = document.getElementById(id);
        if (target) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              target.scrollIntoView({ behavior: 'auto', block: 'start' });
            });
          });
        }
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, []);

  // Global key listener for Escape & focus trapping
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImg) {
          setLightboxImg(null);
        } else if (isMobileOpen) {
          closeMobileMenu();
        }
      } else if (lightboxImg && e.key === 'Tab') {
        const lbEl = document.getElementById('lb');
        if (lbEl) {
          const focusables = lbEl.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          if (focusables.length > 0) {
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImg, isMobileOpen, closeMobileMenu]);

  // Lightbox focus trap, inert management & focus restoration
  useEffect(() => {
    if (!lightboxImg) return;
    const prev = document.activeElement as HTMLElement | null;
    const main = document.querySelector('main#inhalt') as HTMLElement | null;
    document.getElementById('lb-x')?.focus();
    if (main) main.inert = true;

    return () => {
      if (main) main.inert = false;
      prev?.focus?.();
    };
  }, [lightboxImg]);

  const openLightbox = useCallback((src: string, alt: string) => {
    setLightboxImg({ src, alt });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImg(null);
  }, []);

  return (
    <>
      <a className="skip" href="#start">
        Zum Inhalt springen
      </a>

      {/* ======================= NAVIGATION ======================= */}
      <header className={`nav ${isScrolled ? 'scrolled' : ''} ${isMobileOpen ? 'mobile-open' : ''}`} id="top">
        <div className="wrap nav-in">
          <a className="logo" href="#start" aria-label="Zur Startseite" onClick={closeMobileMenu}>
            <img
              src="/favicon.png"
              alt="Logo Robert Erbach"
              width="38"
              height="28"
              className="h-[30px] md:h-[34px] w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
            <span>Robert Erbach</span>
          </a>
          <nav className="nav" aria-label="Hauptnavigation">
            <ul 
              id="navlinks"
              inert={isMobileView && !isMobileOpen ? true : undefined}
              aria-hidden={isMobileView && !isMobileOpen ? 'true' : undefined}
            >
              <li>
                <a 
                  className={`nl ${activeSection === 'profil' ? 'active' : ''}`} 
                  href="#profil" 
                  onClick={closeMobileMenu}
                  tabIndex={isMobileView && !isMobileOpen ? -1 : undefined}
                >
                  Profil
                </a>
              </li>
              <li>
                <a 
                  className={`nl ${activeSection === 'kompetenzen' ? 'active' : ''}`} 
                  href="#kompetenzen" 
                  onClick={closeMobileMenu}
                  tabIndex={isMobileView && !isMobileOpen ? -1 : undefined}
                >
                  Kompetenzen
                </a>
              </li>
              <li>
                <a 
                  className={`nl ${activeSection === 'arbeitsproben' ? 'active' : ''}`} 
                  href="#arbeitsproben" 
                  onClick={closeMobileMenu}
                  tabIndex={isMobileView && !isMobileOpen ? -1 : undefined}
                >
                  Arbeitsproben
                </a>
              </li>
              <li>
                <a 
                  className={`nl ${activeSection === 'zertifikate' ? 'active' : ''}`} 
                  href="#zertifikate" 
                  onClick={closeMobileMenu}
                  tabIndex={isMobileView && !isMobileOpen ? -1 : undefined}
                >
                  Zertifikate
                </a>
              </li>
              <li>
                <a 
                  className={`nl ${activeSection === 'kontakt' ? 'active' : ''}`} 
                  href="#kontakt" 
                  onClick={closeMobileMenu}
                  tabIndex={isMobileView && !isMobileOpen ? -1 : undefined}
                >
                  Kontakt
                </a>
              </li>
              <li className="nav-cta">
                <a 
                  className="btn btn-primary btn-sm" 
                  href="https://meine-assets.pages.dev/pdf/robert_erbach_lebenslauf.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  download 
                  onClick={closeMobileMenu}
                  tabIndex={isMobileView && !isMobileOpen ? -1 : undefined}
                >
                  Lebenslauf als PDF
                </a>
              </li>
            </ul>
          </nav>
          <button
            className="burger"
            id="burger"
            aria-expanded={isMobileOpen}
            aria-controls="navlinks"
            aria-label={isMobileOpen ? 'Menü schließen' : 'Menü öffnen'}
            onClick={isMobileOpen ? closeMobileMenu : openMobileMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* ======================= MAIN CONTENT ======================= */}
      <main id="inhalt" inert={isMobileOpen ? true : undefined} aria-hidden={isMobileOpen || Boolean(lightboxImg) ? 'true' : 'false'}>
        {/* ======================= START / HERO ======================= */}
        <section className="hero" id="start" aria-label="Start">
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow">
                <span className="dot" aria-hidden="true" />
                Offen für neue Aufgaben · Falkenberg/Elster
              </p>
              <h1>Robert Erbach</h1>
              <p style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.6rem)', fontWeight: 500, letterSpacing: '-.028em', lineHeight: 1.18, color: 'var(--ink)' }}>Büro, Marketing &amp; digitale Prozesse</p>
              <p className="sub" style={{ color: 'var(--ink-2)' }}>Weiterbildungen, Zertifikate und dokumentierte Eigenprojekte.</p>
              <div className="hero-cta">
                <a className="btn btn-primary" href="https://meine-assets.pages.dev/pdf/robert_erbach_lebenslauf.pdf" target="_blank" rel="noopener noreferrer" download>
                  Lebenslauf als PDF
                </a>
                <a className="btn btn-ghost" href="#zertifikate">
                  Zertifikate ansehen
                </a>
                <a className="hero-cta-link" href="#arbeitsproben">
                  Arbeitsproben ansehen <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="hero-photo">
              <OfficeIllustration />
            </div>
          </div>
        </section>

        {/* ======================= DREI GLEICHWERTIGE EINSATZFELDER ======================= */}
        <section className="sec" id="einsatzfelder" aria-labelledby="h-einsatz">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="h-einsatz">Schwerpunkte &amp; Einsatzfelder</h2>
              <p className="lead">Drei gleichwertige Bereiche für strukturierte Verwaltung, Kommunikation und digitale Prozesse.</p>
            </div>
            <div className="fields-grid">
              <div className="card field-card" id="buero">
                <h3>Büro &amp; Verwaltung</h3>
                <p>
                  Büroverwaltung und Kommunikation, kaufmännischer Schriftverkehr, MS Word, Excel, Access, Layout mit MS Office, Datenschutz, IT-Sicherheit.
                </p>
              </div>
              <div className="card field-card" id="marketing">
                <h3>Marketing &amp; Social Media</h3>
                <p>
                  Social Media Marketing, Content Marketing, SEO/SEA, Web Analytics/GA4, Canva, WordPress/Elementor, E-Commerce-Grundlagen.
                </p>
              </div>
              <div className="card field-card" id="digital">
                <h3>Digitalisierung &amp; KI</h3>
                <p>
                  Seit rund zwei Jahren intensive private Beschäftigung mit KI-Tools, Prompt Engineering, Microsoft Copilot, n8n/Make.com und dokumentierten Eigenprojekten als Werkzeug für saubere Abläufe.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= PROFIL & AUSBILDUNG ======================= */}
        <section className="sec" id="profil" aria-labelledby="h-profil">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="h-profil">Profil &amp; Aus- und Weiterbildung</h2>
              <p className="lead">Strukturiert, dokumentiert, zielgerichtet.</p>
            </div>
            <div className="about-grid">
              <div className="material quote-card">
                <h3>Profil</h3>
                <p>
                  Ich arbeite strukturiert, dokumentiere sauber und setze digitale Werkzeuge gezielt ein. Meine Weiterbildungen, Prüfungszeugnisse und Eigenprojekte zeigen, wie ich Büroprozesse, Content, Auswertungen und Automatisierungen angehe. KI nutze ich seit rund zwei Jahren privat intensiv als Werkzeug – nicht als Ersatz für verlässliche Abläufe.
                </p>
                <div style={{ marginTop: '1.2em' }}>
                  <a className="btn btn-primary" href="https://meine-assets.pages.dev/pdf/robert_erbach_lebenslauf.pdf" target="_blank" rel="noopener noreferrer" download>
                    Lebenslauf als PDF
                  </a>
                </div>
              </div>
              <div className="card side-card">
                <h3>Überblick</h3>
                <div className="row">
                  <span className="k">Schwerpunkte</span>
                  <span className="v">Büro &amp; Verwaltung<br />Marketing &amp; Social Media<br />Digitale Prozesse</span>
                </div>
                <div className="row">
                  <span className="k">Standort</span>
                  <span className="v">Falkenberg/Elster<br /><span style={{ fontWeight: 400, color: 'var(--ink-dim)', fontSize: '.82rem' }}>(remote oder vor Ort nach Absprache)</span></span>
                </div>
                <div className="row">
                  <span className="k">Verfügbarkeit</span>
                  <span className="v" style={{ color: 'var(--green)' }}>Offen für neue Aufgaben</span>
                </div>
                <div className="row">
                  <span className="k">Sprachen</span>
                  <span className="v">Deutsch · Englisch</span>
                </div>
              </div>
            </div>

            {/* Aus- und Weiterbildung */}
            <div className="stationen" style={{ marginTop: '3.5rem' }}>
              <div>
                <h3>Aus- und Weiterbildung</h3>
                <p className="hint">
                  Nachgewiesene Qualifikationen und strukturierte Weiterbildungen im kaufmännischen und digitalen Bereich.
                </p>
              </div>
              <div className="tl">
                <details className="glass">
                  <summary>
                    <span className="date">07/2025 – 04/2026</span>
                    <span className="t">Diploma in Digital Marketing</span>
                    <span className="plus" aria-hidden="true">+</span>
                    <span className="c">GFN GmbH / WPI</span>
                  </summary>
                  <div className="exp">
                    <p>
                      <strong>Online-Vollzeit-Weiterbildung</strong> · Abschluss: Vier WPI-Modulprüfungen plus Diploma (Webmasters Europe e.V.)
                    </p>
                    <p>
                      Inhalte: Online-Marketing &amp; Neuromarketing, Social Media Management, Content Marketing, SEO/SEA &amp; Web Analytics sowie E-Commerce.
                    </p>
                  </div>
                </details>
                <details className="glass">
                  <summary>
                    <span className="date">06/2024 – 05/2025</span>
                    <span className="t">Büro &amp; digitale Kompetenzen</span>
                    <span className="plus" aria-hidden="true">+</span>
                    <span className="c">FAW Akademie Cottbus</span>
                  </summary>
                  <div className="exp">
                    <p>
                      Strukturierte Qualifizierung in Bürokommunikation, MS-Office-Anwendungen, Datenschutz, IT-Sicherheit und digitaler Arbeitswelt.
                    </p>
                    <p>
                      Umfasst u. a. Büroverwaltung &amp; Kommunikation (180 Std.), MS Word (90 Std.), MS Excel Grundlagen &amp; Aufbaukurs (je 90 Std.), Layout mit MS Office (90 Std.), MS Access (90 Std.), Bildbearbeitung mit GIMP (90 Std.), kaufmännischer Schriftverkehr (45 Std.), Datenschutz BDSG/DSGVO (45 Std.) sowie IT-Sicherheit (45 Std.).
                    </p>
                  </div>
                </details>
                <details className="glass">
                  <summary>
                    <span className="date">2002 – 2006</span>
                    <span className="t">Schulabschluss</span>
                    <span className="plus" aria-hidden="true">+</span>
                    <span className="c">Oberschule Falkenberg/Elster</span>
                  </summary>
                  <div className="exp">
                    <p>Oberschule Falkenberg/Elster · Fachoberschulreife (FOR)</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= KOMPETENZEN ======================= */}
        <section className="sec" id="kompetenzen" aria-labelledby="h-komp">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="h-komp">Kompetenzen &amp; Werkzeuge</h2>
              <p className="lead">Übersicht der eingesetzten Software, Tools und methodischen Kenntnisse.</p>
            </div>
            <div className="skill-grid">
              <div className="card skill-card" id="buero-skills">
                <h3>Büro &amp; Verwaltung</h3>
                <div className="skill-item"><div className="n">Textverarbeitung</div><div className="tools">Microsoft Word, Dokumentenvorlagen</div></div>
                <div className="skill-item"><div className="n">Tabellenkalkulation</div><div className="tools">Microsoft Excel (Grundlagen &amp; Aufbau)</div></div>
                <div className="skill-item"><div className="n">Datenbanken</div><div className="tools">Microsoft Access, Datenstrukturierung</div></div>
                <div className="skill-item"><div className="n">Bürokommunikation</div><div className="tools">Schriftverkehr, Dokumentation, Organisation</div></div>
                <div className="skill-item"><div className="n">Sicherheit &amp; Recht</div><div className="tools">Datenschutz (BDSG/DSGVO), IT-Sicherheit</div></div>
              </div>
              <div className="card skill-card" id="marketing-skills">
                <h3>Marketing &amp; Social Media</h3>
                <div className="skill-item"><div className="n">Design &amp; Layout</div><div className="tools">Canva, GIMP, Adobe Illustrator</div></div>
                <div className="skill-item"><div className="n">Web &amp; Landingpages</div><div className="tools">WordPress (Elementor), HTML &amp; CSS</div></div>
                <div className="skill-item"><div className="n">Web Analytics</div><div className="tools">Google Analytics 4, Google Search Console</div></div>
                <div className="skill-item"><div className="n">SEO / SEA</div><div className="tools">Suchmaschinenoptimierung, Kampagnen</div></div>
                <div className="skill-item"><div className="n">Content &amp; E-Commerce</div><div className="tools">Social Media, WooCommerce Grundlagen</div></div>
              </div>
              <div className="card skill-card" id="digital-skills">
                <h3>Digitalisierung &amp; KI</h3>
                <div className="skill-item"><div className="n">Prompt Engineering</div><div className="tools">Gemini, Claude, Microsoft Copilot</div></div>
                <div className="skill-item"><div className="n">Automatisierung</div><div className="tools">n8n, Make.com</div></div>
                <div className="skill-item"><div className="n">Entwicklung</div><div className="tools">React &amp; TypeScript, moderne Web-Tools</div></div>
                <div className="skill-item"><div className="n">Organisation</div><div className="tools">Notion, Trello, Google Calendar</div></div>
              </div>
              <div className="card skill-card">
                <h3>Sprachen</h3>
                <div className="skill-item"><div className="n">Deutsch</div></div>
                <div className="skill-item"><div className="n">Englisch</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= ARBEITSPROBEN ======================= */}
        <section className="sec" id="arbeitsproben" aria-labelledby="h-arb">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="h-arb">Arbeitsproben &amp; dokumentierte Projekte</h2>
              <p className="lead">Drei dokumentierte Kurs- und Eigenprojekte.</p>
            </div>
            <div className="proj-grid">
              {/* Projekt 1 */}
              <article className="card proj">
                <div
                  className="thumb"
                  tabIndex={0}
                  role="button"
                  aria-label="Projektansicht vergrößern"
                  onClick={() => openLightbox('/assets/images/proj-visibility-lab.webp', 'Visibility Lab – Screenshot')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox('/assets/images/proj-visibility-lab.webp', 'Visibility Lab – Screenshot');
                    }
                  }}
                >
                  <img
                    src="/assets/images/proj-visibility-lab.webp"
                    alt="Landingpage Visibility Lab – Screenshot"
                    loading="lazy"
                    width="900"
                    height="506"
                  />
                </div>
                <div className="body">
                  <span className="cat">Eigenprojekt · Live-Demo</span>
                  <h3>Visibility Lab</h3>
                  <p>
                    Konzeption und Umsetzung einer Landingpage für ein SEO-System mit integrierten KI-Workflows – vom Design über die Seitenstruktur bis zur finalen Bereitstellung.
                  </p>
                  <div className="tags">
                    <span className="chip">SEO</span>
                    <span className="chip">KI-Workflows</span>
                    <span className="chip">Landingpage</span>
                    <span className="chip">WordPress</span>
                  </div>
                  <div className="foot">
                    <span className="chip">Status: Live</span>
                    <a className="go" href="https://visibilitylab.roberterbach.de/" target="_blank" rel="noopener noreferrer">
                      Projekt ansehen <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>

              {/* Projekt 2 */}
              <article className="card proj">
                <div
                  className="thumb case-shot workflow-shot"
                  tabIndex={0}
                  role="button"
                  aria-label="Projektansicht vergrößern"
                  onClick={() => openLightbox('/assets/images/proj-4ki-workflow.webp', 'Vier-KI-Workflow – Übersicht')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox('/assets/images/proj-4ki-workflow.webp', 'Vier-KI-Workflow – Übersicht');
                    }
                  }}
                >
                  <img
                    src="/assets/images/proj-4ki-workflow.webp"
                    alt="Vier-KI-Workflow – Schematische Übersicht"
                    loading="lazy"
                    width="900"
                    height="506"
                  />
                </div>
                <div className="body">
                  <span className="cat">Eigenprojekt · private KI-Projektpraxis</span>
                  <h3>Vier-KI-Workflow</h3>
                  <p>
                    Ein vollständiger, automatisierbarer Workflow, der vier KI-Systeme mit klar definierten Rollen kombiniert: Recherche, Strategie, Content-Erstellung und Qualitätsprüfung.
                  </p>
                  <div className="tags">
                    <span className="chip">ChatGPT</span>
                    <span className="chip">Claude</span>
                    <span className="chip">Grok</span>
                    <span className="chip">Make.com</span>
                  </div>
                  <div className="foot">
                    <span className="chip" style={{ borderStyle: 'dashed' }}>
                      Dokumentation
                    </span>
                    <a className="go" href="https://meine-assets.pages.dev/pdf/robert_erbach_4_ki_workflow.pdf" target="_blank" rel="noopener noreferrer" download>
                      PDF herunterladen <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>

              {/* Projekt 3 */}
              <article className="card proj">
                <div
                  className="thumb"
                  tabIndex={0}
                  role="button"
                  aria-label="Projektansicht vergrößern"
                  onClick={() => openLightbox('/assets/images/proj-nuraghi-shop.webp', 'Nuraghi Outdoor Experience – Mockup')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox('/assets/images/proj-nuraghi-shop.webp', 'Nuraghi Outdoor Experience – Mockup');
                    }
                  }}
                >
                  <img
                    src="/assets/images/proj-nuraghi-shop.webp"
                    alt="Nuraghi Outdoor Experience – Onlineshop-Mockup"
                    loading="lazy"
                    width="900"
                    height="475"
                  />
                </div>
                <div className="body">
                  <span className="cat">Kursarbeit · Web Analytics · März 2026</span>
                  <h3>GA4-Tracking-Implementierung</h3>
                  <p>
                    Konzeption eines umfassenden Tracking-Frameworks am Beispiel E-Commerce – von der Event-Strategie bis zum fertigen Implementierungsdokument.
                  </p>
                  <div className="tags">
                    <span className="chip">Web Analytics</span>
                    <span className="chip">GA4</span>
                    <span className="chip">E-Commerce</span>
                    <span className="chip">Tracking</span>
                  </div>
                </div>
                <details>
                  <summary>
                    <span className="arr" aria-hidden="true">▸</span> Details ansehen
                  </summary>
                  <div className="case">
                    <h4 style={{ marginTop: '.2em' }}>Nuraghi Outdoor Experience</h4>
                    <p className="meta">Kursarbeit · Web Analytics · März 2026</p>
                    <h4>Kontext</h4>
                    <p>
                      Im Rahmen der Weiterbildung zum Digital Marketing Manager wurde anhand eines beispielhaften Outdoor-Onlineshops ein vollständiger GA4-Tracking-Implementierungsplan entwickelt.
                    </p>
                    <h4>Aufgabe</h4>
                    <p>
                      Zwei Geschäftsziele standen im Mittelpunkt: Steigerung der Produktverkäufe und Steigerung der Blog-Interaktionen. Daraus wurden sieben konkrete Tracking-Events abgeleitet und dokumentiert.
                    </p>
                    <div className="imgs">
                      <div className="case-shot">
                        <img
                          src="/assets/images/case-tracking-events.webp"
                          alt="Übersicht der sieben Tracking-Events"
                          loading="lazy"
                          width="1100"
                          height="842"
                          onClick={() => openLightbox('/assets/images/case-tracking-events.webp', 'Übersicht der sieben Tracking-Events')}
                        />
                      </div>
                      <div className="case-shot">
                        <img
                          src="/assets/images/case-excel-plan.webp"
                          alt="Ausschnitt des Excel-Implementierungsplans"
                          loading="lazy"
                          width="1100"
                          height="841"
                          onClick={() => openLightbox('/assets/images/case-excel-plan.webp', 'Ausschnitt des Excel-Implementierungsplans')}
                        />
                      </div>
                    </div>
                  </div>
                </details>
              </article>
            </div>
          </div>
        </section>

        {/* ======================= ZERTIFIKATE ======================= */}
        <section className="sec" id="zertifikate" aria-labelledby="h-zert">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="h-zert">Zertifikate &amp; Nachweise</h2>
              <p className="lead">Nachweise aus Aus- und Weiterbildung – als PDF-Kopien bereitgestellt.</p>
              <p style={{ fontSize: '.85rem', color: 'var(--ink-dim)', marginTop: '.4em' }}>
                Prüfungszeugnisse wurden über WPI/GFN bzw. Webmasters Europe e.V. ausgestellt; Teilnahmebescheinigungen sind als solche gekennzeichnet.
              </p>
            </div>

            {/* Top 6 ausgewogene Nachweise */}
            <div className="cert-group">
              <h3>Ausgewählte Nachweise</h3>
              <div className="cert-grid">
                <div className="card cert">
                  <div className="t">Diploma in Digital Marketing</div>
                  <div className="m">
                    <span>Webmasters Europe e.V.</span> · <span>21.04.2026</span> · <span className="badge">WE-ID 011435537</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_digital_marketing_manager.pdf" target="_blank" rel="noopener noreferrer" download>
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="card cert">
                  <div className="t">Social Media Marketing</div>
                  <div className="m">
                    <span>GFN GmbH / WPI</span> · <span>19.01.2026</span> · <span className="badge">Note: 94%</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_social_media_manager.pdf" target="_blank" rel="noopener noreferrer" download>
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="card cert">
                  <div className="t">Büroverwaltung &amp; Kommunikation</div>
                  <div className="m">
                    <span>FAW Akademie</span> · <span>27.09.2024</span> · <span className="badge gray">180 Std.</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_büroverwaltung_und_kommunikation.pdf" target="_blank" rel="noopener noreferrer" download>
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="card cert">
                  <div className="t">MS Excel Aufbaukurs</div>
                  <div className="m">
                    <span>FAW Akademie</span> · <span>08.11.2024</span> · <span className="badge gray">90 Std.</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_ms_excel_aufbaukurs.pdf" target="_blank" rel="noopener noreferrer" download>
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="card cert">
                  <div className="t">Kaufmännischer Schriftverkehr</div>
                  <div className="m">
                    <span>FAW Akademie</span> · <span>02.08.2024</span> · <span className="badge gray">45 Std.</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_kaufmännischer_schriftverkehr.pdf" target="_blank" rel="noopener noreferrer" download>
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="card cert">
                  <div className="t">Datenschutz – BDSG &amp; DSGVO</div>
                  <div className="m">
                    <span>FAW Akademie</span> · <span>29.11.2024</span> · <span className="badge gray">45 Std.</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_datenschutz.pdf" target="_blank" rel="noopener noreferrer" download>
                    PDF herunterladen ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Akkordeon für alle weiteren Nachweise inklusive KI-Zertifikate */}
            <details className="card cert-accordion" style={{ marginTop: '1.5rem', padding: '1rem 1.4rem', borderRadius: '16px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--cyan)' }}>
                Alle Nachweise anzeigen (Marketing, SEO, Office, Schulungen &amp; KI)
              </summary>
              <div style={{ marginTop: '1.2rem' }}>
                <div className="cert-group">
                  <h3>KI-Nachweise &amp; Frameworks</h3>
                  <div className="cert-grid">
                    <div className="card cert">
                      <div className="t">KI-Führerschein</div>
                      <div className="m"><span>GFN GmbH</span> · <span>03.04.2026</span></div>
                      <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_ki_führerschein.pdf" target="_blank" rel="noopener noreferrer" download>PDF herunterladen ↗</a>
                    </div>
                    <div className="card cert">
                      <div className="t">Arbeiten mit Copilot</div>
                      <div className="m"><span>GFN GmbH</span> · <span>05.04.2026</span></div>
                      <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_arbeiten_mit_copilot.pdf" target="_blank" rel="noopener noreferrer" download>PDF herunterladen ↗</a>
                    </div>
                    <div className="card cert">
                      <div className="t">AI Fluency: Framework &amp; Foundations</div>
                      <div className="m"><span>Anthropic</span> · <span className="badge">Certificate of Completion</span></div>
                      <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_anthropic_framework_foundation.pdf" target="_blank" rel="noopener noreferrer" download>PDF herunterladen ↗</a>
                    </div>
                  </div>
                </div>

                <div className="cert-group" style={{ marginTop: '1.5rem' }}>
                  <h3>Digital Marketing &amp; E-Commerce</h3>
                  <div className="cert-grid">
                    <div className="card cert">
                      <div className="t">SEO Manager</div>
                      <div className="m"><span>GFN GmbH / WPI</span> · <span>19.02.2026</span> · <span className="badge">Note: 89%</span></div>
                      <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_seo_manager.pdf" target="_blank" rel="noopener noreferrer" download>PDF herunterladen ↗</a>
                    </div>
                    <div className="card cert">
                      <div className="t">PPC Manager</div>
                      <div className="m"><span>GFN GmbH / WPI</span> · <span>12.03.2026</span> · <span className="badge">Note: 93%</span></div>
                      <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_ppc_manager.pdf" target="_blank" rel="noopener noreferrer" download>PDF herunterladen ↗</a>
                    </div>
                    <div className="card cert">
                      <div className="t">Webanalyse</div>
                      <div className="m"><span>GFN GmbH / WPI</span> · <span>24.03.2026</span> · <span className="badge">Note: 96%</span></div>
                      <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_webanalyse.pdf" target="_blank" rel="noopener noreferrer" download>PDF herunterladen ↗</a>
                    </div>
                    <div className="card cert">
                      <div className="t">E-Commerce-Manager:in/-Assistenz</div>
                      <div className="m"><span>GFN GmbH</span> · <span>19.09.2025</span> · <span className="badge">Projektabschluss 80 %</span></div>
                      <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_e_commerce.pdf" target="_blank" rel="noopener noreferrer" download>PDF herunterladen ↗</a>
                    </div>
                    <div className="card cert">
                      <div className="t">Neuromarketing</div>
                      <div className="m"><span>GFN GmbH</span> · <span>28.07.2025</span> · <span className="badge gray">Teilnahmebescheinigung</span></div>
                      <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_neuromarketing.pdf" target="_blank" rel="noopener noreferrer" download>PDF herunterladen ↗</a>
                    </div>
                    <div className="card cert">
                      <div className="t">E- &amp; Content Marketing</div>
                      <div className="m"><span>GFN GmbH</span> · <span>14.11.2025</span> · <span className="badge gray">Teilnahmebescheinigung</span></div>
                      <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_e_marketing.pdf" target="_blank" rel="noopener noreferrer" download>PDF herunterladen ↗</a>
                    </div>
                  </div>
                </div>

                <div className="cert-group" style={{ marginTop: '1.5rem' }}>
                  <h3>Schulungen · Amadeus Fire Academy</h3>
                  <div className="cert-grid">
                    <div className="card cert">
                      <div className="t">Datenschutzschulung</div>
                      <div className="m"><span>Amadeus Fire Academy</span> · <span>05.04.2026</span></div>
                      <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_datenschutzschulung.pdf" target="_blank" rel="noopener noreferrer" download>PDF herunterladen ↗</a>
                    </div>
                    <div className="card cert">
                      <div className="t">Arbeitsschutzschulung</div>
                      <div className="m"><span>Amadeus Fire Academy</span> · <span>05.04.2026</span></div>
                      <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_arbeitsschutzschulung.pdf" target="_blank" rel="noopener noreferrer" download>PDF herunterladen ↗</a>
                    </div>
                    <div className="card cert">
                      <div className="t">AGG-Schulung</div>
                      <div className="m"><span>Amadeus Fire Academy</span> · <span>05.04.2026</span></div>
                      <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_agg_schulung.pdf" target="_blank" rel="noopener noreferrer" download>PDF herunterladen ↗</a>
                    </div>
                    <div className="card cert">
                      <div className="t">IT-Sicherheitsschulung</div>
                      <div className="m"><span>Amadeus Fire Academy</span> · <span>05.04.2026</span></div>
                      <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_it_sicherheitsschulung.pdf" target="_blank" rel="noopener noreferrer" download>PDF herunterladen ↗</a>
                    </div>
                  </div>
                </div>

                <div className="cert-group" style={{ marginTop: '1.5rem' }}>
                  <h3>Büro &amp; Office (FAW Akademie)</h3>
                  <div className="cert-grid">
                    <div className="card cert">
                      <div className="t">MS Word</div>
                      <div className="m"><span>FAW Akademie</span> · <span>05.07.2024</span> · <span className="badge gray">90 Std.</span></div>
                      <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_ms_word.pdf" target="_blank" rel="noopener noreferrer" download>PDF herunterladen ↗</a>
                    </div>
                    <div className="card cert">
                      <div className="t">MS Excel Grundlagen</div>
                      <div className="m"><span>FAW Akademie</span> · <span>25.10.2024</span> · <span className="badge gray">90 Std.</span></div>
                      <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_ms_excel_grundlagen.pdf" target="_blank" rel="noopener noreferrer" download>PDF herunterladen ↗</a>
                    </div>
                    <div className="card cert">
                      <div className="t">Layout mit MS Office</div>
                      <div className="m"><span>FAW Akademie</span> · <span>16.08.2024</span> · <span className="badge gray">90 Std.</span></div>
                      <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_layout_mit_ms_office.pdf" target="_blank" rel="noopener noreferrer" download>PDF herunterladen ↗</a>
                    </div>
                    <div className="card cert">
                      <div className="t">Datenbanken mit MS Access</div>
                      <div className="m"><span>FAW Akademie</span> · <span>22.11.2024</span> · <span className="badge gray">90 Std.</span></div>
                      <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_datenbanken_mit_ms_access.pdf" target="_blank" rel="noopener noreferrer" download>PDF herunterladen ↗</a>
                    </div>
                    <div className="card cert">
                      <div className="t">Bildbearbeitung mit GIMP</div>
                      <div className="m"><span>FAW Akademie</span> · <span>19.07.2024</span> · <span className="badge gray">90 Std.</span></div>
                      <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_bildberabeitung_mit_gimp.pdf" target="_blank" rel="noopener noreferrer" download>PDF herunterladen ↗</a>
                    </div>
                    <div className="card cert">
                      <div className="t">Datenschutz</div>
                      <div className="m"><span>FAW Akademie</span> · <span>29.11.2024</span> · <span className="badge gray">45 Std.</span></div>
                      <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_datenschutz.pdf" target="_blank" rel="noopener noreferrer" download>PDF herunterladen ↗</a>
                    </div>
                    <div className="card cert">
                      <div className="t">IT-Sicherheit</div>
                      <div className="m"><span>FAW Akademie</span> · <span>06.12.2024</span> · <span className="badge gray">45 Std.</span></div>
                      <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_it_sicherheit.pdf" target="_blank" rel="noopener noreferrer" download>PDF herunterladen ↗</a>
                    </div>
                    <div className="card cert">
                      <div className="t">Digitalisierte Arbeitswelt</div>
                      <div className="m"><span>FAW Akademie</span> · <span>10.12.2024</span></div>
                      <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_digitalisierte_arbeitswelt.pdf" target="_blank" rel="noopener noreferrer" download>PDF herunterladen ↗</a>
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </section>

        {/* ======================= KONTAKT ======================= */}
        <section className="sec" id="kontakt" aria-labelledby="h-kontakt">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="h-kontakt">Kontakt</h2>
              <p className="lead">
                Ob Büro, Verwaltung, Marketing oder digitale Prozesse – ich freue mich auf Ihre Nachricht.
              </p>
            </div>
            <div className="contact-grid">
              <div className="card c-card">
                <span className="status-pill">
                  <span className="dot" aria-hidden="true" />
                  Ich melde mich zeitnah.
                </span>
                <div className="c-row">
                  <div className="ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                  </div>
                  <div>
                    <div className="k">E-Mail</div>
                    <div className="v"><a href="mailto:roberterbach@web.de">roberterbach@web.de</a></div>
                  </div>
                </div>
                <div className="c-row">
                  <div className="ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
                  </div>
                  <div>
                    <div className="k">Telefon</div>
                    <div className="v"><a href="tel:+4915204041124">+49 152 04041124</a></div>
                  </div>
                </div>
                <div className="c-row">
                  <div className="ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z" /><circle cx="12" cy="10" r="2.6" /></svg>
                  </div>
                  <div>
                    <div className="k">Standort</div>
                    <div className="v">Falkenberg/Elster</div>
                    <div className="s">(remote oder vor Ort nach Absprache)</div>
                  </div>
                </div>
                <div className="c-row">
                  <div className="ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 11v5M8 7.5v.1M12 16v-3a2 2 0 0 1 4 0v3" /></svg>
                  </div>
                  <div>
                    <div className="k">LinkedIn</div>
                    <div className="v"><a href="https://www.linkedin.com/in/robert-erbach-a173b2371" target="_blank" rel="noopener noreferrer">Profil ansehen ↗</a></div>
                  </div>
                </div>
                <div className="c-row">
                  <div className="ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M12 3v12m0 0 4-4m-4 4-4-4" /><path d="M4 19h16" /></svg>
                  </div>
                  <div>
                    <div className="k">Lebenslauf</div>
                    <div className="v"><a href="https://meine-assets.pages.dev/pdf/robert_erbach_lebenslauf.pdf" target="_blank" rel="noopener noreferrer" download>Lebenslauf als PDF</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= RECHTLICHE TEXTE ======================= */}
        <section className="legal wrap" id="rechtliches" aria-label="Rechtliche Hinweise">
          <div id="impressum">
            <h2 id="h-imp">Impressum</h2>
            <h3><span className="sec-num">§ 1</span> Angaben gemäß § 5 DDG</h3>
            <p>
              Robert Erbach<br />
              Am Stadtpark 43<br />
              04895 Falkenberg/Elster<br />
              Deutschland
            </p>
            <h3><span className="sec-num">§ 2</span> Kontakt</h3>
            <p>
              Telefon: +49 152 04041124<br />
              E-Mail: roberterbach@web.de
            </p>
            <h3><span className="sec-num">§ 3</span> Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h3>
            <p>
              Robert Erbach<br />
              Am Stadtpark 43<br />
              04895 Falkenberg/Elster
            </p>
            <h3><span className="sec-num">§ 4</span> Haftung für Inhalte</h3>
            <p>
              Für Inhalte verlinkter externer Seiten sind die jeweiligen Anbieter verantwortlich. Bei Bekanntwerden von Rechtsverletzungen entferne ich entsprechende Links.
            </p>
          </div>

          <div id="datenschutz">
            <h2 id="h-dsg">Datenschutzerklärung</h2>
            <h3><span className="sec-num">1.</span> Datenschutz auf einen Blick</h3>
            <p>
              Diese Website setzt keine eigenen Tracking- oder Analyse-Cookies. Die cookiefreie Reichweitenmessung erfolgt über Cloudflare Web Analytics.
            </p>
            <h3><span className="sec-num">2.</span> Verantwortliche Stelle</h3>
            <p>
              Robert Erbach<br />
              Am Stadtpark 43<br />
              04895 Falkenberg/Elster<br />
              Deutschland<br />
              E-Mail: roberterbach@web.de<br />
              Telefon: +49 152 04041124
            </p>
            <h3><span className="sec-num">3.</span> Hosting über Cloudflare Pages</h3>
            <p>
              Diese Website wird über Cloudflare Pages gehostet. Anbieter ist Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA). Beim Aufruf der Seiten werden technisch notwendige Logdaten (u. a. IP-Adresse, Zeitpunkt des Zugriffs) verarbeitet, um den sicheren Betrieb der Website zu gewährleisten (Art. 6 Abs. 1 lit. f DSGVO). Die Datenübermittlung in die USA ist auf EU-Standardvertragsklauseln bzw. das Data Privacy Framework gestützt.
            </p>
            <h3><span className="sec-num">4.</span> Cookiefreie Reichweitenmessung</h3>
            <p>
              Zur statistischen Auswertung und Optimierung wird Cloudflare Web Analytics genutzt. Dieser Dienst arbeitet ohne eigene Cookies, speichert keine personenbezogenen Daten im Browser und liest keine Endgeräte-Informationen aus (Art. 6 Abs. 1 lit. f DSGVO). Nutzerprofile werden nicht erstellt.
            </p>
            <h3><span className="sec-num">5.</span> E-Mail-Kontakt</h3>
            <p>
              Bei der Kontaktaufnahme per E-Mail werden die übermittelten Angaben ausschließlich zur Bearbeitung der Anfrage verarbeitet (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
            <h3><span className="sec-num">6.</span> Externe Links und Downloads</h3>
            <p>
              Diese Website enthält Verweise auf externe Webseiten und bereitgestellte PDF-Dokumente. Beim Aufrufen externer Links verlassen Sie diese Website; für die Datenverarbeitung auf den Zielseiten sind die jeweiligen Betreiber verantwortlich.
            </p>
            <h3><span className="sec-num">7.</span> Ihre Rechte als betroffene Person</h3>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch gegen die Verarbeitung sowie das Recht auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde.
            </p>
          </div>
        </section>
      </main>

      {/* ======================= FOOTER ======================= */}
      <footer className="f">
        <div className="wrap f-in">
          <p className="cr">© {new Date().getFullYear()} Robert Erbach. Alle Rechte vorbehalten.</p>
          <div className="l">
            <a href="#impressum">Impressum</a>
            <a href="#datenschutz">Datenschutz</a>
            <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Nach oben ↑</a>
          </div>
          <p className="cr" style={{ width: '100%', fontSize: '.74rem' }}>
            Keine eigenen Cookies · cookiefreie Reichweitenmessung durch Cloudflare.
          </p>
        </div>
      </footer>

      {/* ============ LIGHTBOX ============ */}
      <div
        id="lb"
        className={lightboxImg ? 'open' : ''}
        role="dialog"
        aria-modal="true"
        aria-label="Bildvorschau"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeLightbox();
        }}
      >
        <button className="x" id="lb-x" aria-label="Schließen" onClick={closeLightbox}>
          ✕
        </button>
        {lightboxImg && (
          <img src={lightboxImg.src} alt={lightboxImg.alt} id="lb-img" />
        )}
      </div>
    </>
  );
}
