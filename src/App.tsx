import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HeroAnimation } from './components/HeroAnimation';

export default function App() {
  // Navigation & Scroll states
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('start');

  // Preloader state
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Lightbox state
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string } | null>(null);

  // Terminal (RobertOS, Cmd/Ctrl + K)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<Array<{ text: string; type: 'cmd' | 'out' | 'hl' }>>([
    { text: 'RobertOS v2.0.0', type: 'out' },
    { text: 'Type "help" to see available commands.', type: 'out' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalInputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Ich habe eine Frage zu …');
  const [contactMessage, setContactMessage] = useState('');
  const [contactConsent, setContactConsent] = useState(false);
  const [formResponse, setFormResponse] = useState<{ text: string; isError: boolean } | null>(null);

  // Preloader timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloaderDone(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Sticky nav scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active navigation and reveal animations
  useEffect(() => {
    // Reveal elements animation
    const reveals = document.querySelectorAll('.rv');
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('on');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
      );
      reveals.forEach((el) => revealObserver.observe(el));

      // Active section observer
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
        revealObserver.disconnect();
        navObserver.disconnect();
      };
    } else {
      reveals.forEach((el) => el.classList.add('on'));
    }
  }, []);

  // Keyboard shortcut for RobertOS Terminal (Cmd/Ctrl + K and Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsTerminalOpen((prev) => {
          const next = !prev;
          if (next) {
            setTimeout(() => terminalInputRef.current?.focus(), 60);
          }
          return next;
        });
      }
      if (e.key === 'Escape') {
        setIsTerminalOpen(false);
        setLightboxImg(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-scroll terminal body
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    setTerminalHistory((prev) => [...prev, { text: `> ${cmd}`, type: 'cmd' }]);
    setTerminalInput('');

    const routes: Record<string, string> = {
      start: 'start',
      about: 'ueber-mich',
      uebermich: 'ueber-mich',
      skills: 'skills',
      projekte: 'projekte',
      projects: 'projekte',
      zertifikate: 'zertifikate',
      certificates: 'zertifikate',
      kontakt: 'kontakt',
      contact: 'kontakt',
      impressum: 'impressum',
      datenschutz: 'datenschutz'
    };

    if (cmd === 'help') {
      setTerminalHistory((prev) => [
        ...prev,
        { text: 'Befehle: start, about, skills, projekte, zertifikate, kontakt, impressum, datenschutz, clear, exit', type: 'out' }
      ]);
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
    } else if (cmd === 'exit') {
      setIsTerminalOpen(false);
    } else if (routes[cmd]) {
      const targetId = routes[cmd];
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setTerminalHistory((prev) => [...prev, { text: `Navigating to ${targetId} …`, type: 'hl' }]);
        setIsTerminalOpen(false);
      }
    } else {
      setTerminalHistory((prev) => [
        ...prev,
        { text: `Command not found: "${cmd}" (type "help" for available commands)`, type: 'out' }
      ]);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = contactName.trim();
    const email = contactEmail.trim();
    const message = contactMessage.trim();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    if (name.length < 2 || !isValidEmail || message.length < 4 || !contactConsent) {
      setFormResponse({
        text: 'Bitte Name, gültige E-Mail, Nachricht und Zustimmung ausfüllen.',
        isError: true
      });
      return;
    }

    const body = `${message}\n\n—\nVon: ${name} <${email}>`;
    const subject = contactSubject === 'Ich habe eine Frage zu …' ? 'Anfrage über roberterbach.de' : contactSubject;
    window.location.href = `mailto:roberterbach@web.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setFormResponse({
      text: 'Dein E-Mail-Programm wurde geöffnet – bitte dort noch auf „Senden“ klicken.',
      isError: false
    });
  };

  const openLightbox = useCallback((src: string, alt: string) => {
    setLightboxImg({ src, alt });
  }, []);

  return (
    <>
      {/* ============ PRELOADER ============ */}
      <div id="pre" className={preloaderDone ? 'done' : ''} role="status" aria-live="polite" aria-label="Seite wird geladen">
        <div className="ring" aria-hidden="true" />
        <p className="nm">Robert Erbach</p>
        <p className="st">
          <span className="dot" aria-hidden="true" />
          Erlebnis wird geladen · Status: Available
        </p>
        <p className="st" style={{ letterSpacing: '.24em' }}>
          Initializing Experience
        </p>
      </div>

      <a className="skip" href="#start">
        Zum Inhalt springen
      </a>

      {/* ============ NAVIGATION ============ */}
      <header className={`nav ${isScrolled ? 'scrolled' : ''} ${isMobileOpen ? 'mobile-open' : ''}`} id="top">
        <div className="wrap nav-in">
          <a className="logo" href="#start" aria-label="Zur Startseite" onClick={() => setIsMobileOpen(false)}>
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
            <ul id="navlinks">
              <li>
                <a className={`nl ${activeSection === 'start' ? 'active' : ''}`} href="#start" onClick={() => setIsMobileOpen(false)}>
                  Start
                </a>
              </li>
              <li>
                <a className={`nl ${activeSection === 'ueber-mich' ? 'active' : ''}`} href="#ueber-mich" onClick={() => setIsMobileOpen(false)}>
                  Über mich
                </a>
              </li>
              <li>
                <a className={`nl ${activeSection === 'skills' ? 'active' : ''}`} href="#skills" onClick={() => setIsMobileOpen(false)}>
                  Skills
                </a>
              </li>
              <li>
                <a className={`nl ${activeSection === 'projekte' ? 'active' : ''}`} href="#projekte" onClick={() => setIsMobileOpen(false)}>
                  Projekte
                </a>
              </li>
              <li>
                <a className={`nl ${activeSection === 'zertifikate' ? 'active' : ''}`} href="#zertifikate" onClick={() => setIsMobileOpen(false)}>
                  Zertifikate
                </a>
              </li>
              <li>
                <a className={`nl ${activeSection === 'kontakt' ? 'active' : ''}`} href="#kontakt" onClick={() => setIsMobileOpen(false)}>
                  Kontakt
                </a>
              </li>
              <li className="nav-cta">
                <a className="btn btn-primary btn-sm" href="#kontakt" onClick={() => setIsMobileOpen(false)}>
                  Unverbindlich kennenlernen
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
            onClick={() => setIsMobileOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* ============ MAIN CONTENT ============ */}
      <main id="inhalt">
        {/* ======================= START / HERO ======================= */}
        <section className="hero" id="start" aria-label="Start">
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow rv">
                <span className="dot" aria-hidden="true" />
                Status: Verfügbar
              </p>
              <h1 className="rv d1">Robert Erbach</h1>
              <p className="tag grad rv d2">Ich denke weiter, als du fragst.</p>
              <p className="sub rv d2">KI-gestützte Frontends &amp; durchdachte Systeme</p>
              <p className="desc rv d3">
                Ich entwickle KI-Workflows, baue damit funktionierende Webprojekte und gestalte alles so, dass es auch wirklich gut aussieht.
              </p>
              <div className="hero-svc rv d3" role="list">
                <div className="svc" role="listitem">
                  <span className="i">01</span>
                  <span className="t">KI Entwicklung</span>
                </div>
                <div className="svc" role="listitem">
                  <span className="i">02</span>
                  <span className="t">Prompt Engineering</span>
                </div>
                <div className="svc" role="listitem">
                  <span className="i">03</span>
                  <span className="t">Kreatives Design</span>
                </div>
              </div>
              <div className="hero-cta rv d4">
                <a className="btn btn-primary" href="#projekte">
                  Meine Projekte ansehen <span aria-hidden="true">→</span>
                </a>
                <a className="btn btn-ghost" href="#kontakt">
                  Unverbindlich kennenlernen
                </a>
              </div>
            </div>
            <div className="hero-photo hero-freestanding rv d2">
              <div className="glow" aria-hidden="true" />
              <HeroAnimation />
            </div>
          </div>
        </section>

        {/* ======================= ÜBER MICH ======================= */}
        <section className="sec" id="ueber-mich" aria-labelledby="h-ueber">
          <div className="wrap">
            <div className="sec-head rv">
              <p className="num">01 · Über mich</p>
              <h2 id="h-ueber">
                Wer ist&nbsp;…&nbsp;<span className="grad">Robert Erbach?</span>
              </h2>
              <p className="lead">Wer ich bin – in seinen eigenen Worten.</p>
            </div>
            <div className="about-grid">
              <div className="glass quote-card rv">
                <blockquote>„Halbfertig ist keine Option.“</blockquote>
                <p>
                  Getreu diesem Grundsatz arbeite ich, egal ob es um eine Website, einen KI-Workflow oder ein Prompt-System geht, das mehrere Aufgaben auf einmal abdeckt.
                </p>
                <p>
                  Ich fordere mich selbst. Ich nehme mir die Zeit, Dinge wirklich zu durchdenken, bevor ich anfange. Dann ziehe ich durch – ohne Abkürzungen.
                </p>
                <p>
                  Was ich konkret mache: Ich baue mit KI-Tools Websites und Apps, entwickle komplexe Prompt-Systeme die echte Arbeit abnehmen, und gestalte das alles so, dass es nicht nur funktioniert, sondern auch gut aussieht.
                </p>
                <div className="motto">
                  <p className="m1">Ich bin ruhig, bis ich brenne. Und wenn ich brenne, merkst du es.</p>
                  <p className="m2">Direkt. Tiefgründig. Konsequent umsetzungsstark.</p>
                </div>
              </div>
              <div className="glass side-card rv d1">
                <h3 style={{ fontSize: '.8rem', fontFamily: 'var(--mono)', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--cyan)' }}>
                  Steckbrief
                </h3>
                <div className="row">
                  <span className="k">Rolle</span>
                  <span className="v">
                    Digital Marketing Manager
                    <br />
                    &amp; Web Designer
                  </span>
                </div>
                <div className="row">
                  <span className="k">Schwerpunkt</span>
                  <span className="v">
                    KI-Workflows · Frontends
                    <br />
                    Analytics · Design
                  </span>
                </div>
                <div className="row">
                  <span className="k">Standort</span>
                  <span className="v">
                    Falkenberg/Elster
                    <br />
                    <span style={{ fontWeight: 400, color: 'var(--ink-dim)', fontSize: '.82rem' }}>
                      (bereit für Remote oder Umzug)
                    </span>
                  </span>
                </div>
                <div className="row">
                  <span className="k">Status</span>
                  <span className="v" style={{ color: 'var(--green)' }}>
                    Offen für neue Möglichkeiten
                  </span>
                </div>
                <div className="row">
                  <span className="k">Sprachen</span>
                  <span className="v">Deutsch · Englisch</span>
                </div>
              </div>
            </div>

            <div className="about-cta rv">
              <p className="q">Ich freue mich darauf, dich persönlich kennenzulernen.</p>
              <a className="btn btn-primary" href="#kontakt">
                Unverbindlich kennenlernen
              </a>
            </div>

            {/* Stationen */}
            <div className="stationen">
              <div className="rv">
                <h3>Stationen</h3>
                <p className="hint">
                  Ein Werdegang mit Fokus auf Struktur und Fortschritt – bereit für den nächsten Schritt bei euch.
                </p>
              </div>
              <div className="tl">
                <details className="glass rv">
                  <summary>
                    <span className="date">07/2025 – 04/2026</span>
                    <span className="t">Weiterbildung: Digital Marketing Manager</span>
                    <span className="plus" aria-hidden="true">+</span>
                    <span className="c">GFN GmbH / WPI</span>
                  </summary>
                  <div className="exp">
                    <p>
                      <strong>Online-Vollzeit-Weiterbildung</strong> · Abschluss: 5 Zertifikate von Webmasters Europe e.V. mit abschließendem Diplom
                    </p>
                    <p>
                      Gesamtausbildung im digitalen Marketing: Online-Marketing &amp; Neuromarketing, Social Media Management, Content Marketing, SEO/SEA &amp; Web Analytics sowie E-Commerce.
                    </p>
                    <p>
                      <strong>Online-Marketing &amp; Verkaufspsychologie · 4 Wochen</strong>
                      <br />
                      Grundlagen digitales Marketing, Zielgruppenanalyse, Neuromarketing und Kaufpsychologie, KI-Tools im Marketing. Abschluss: Certified Digital Marketing Assistant
                    </p>
                    <p>
                      <strong>Social Media Management · 2 Monate</strong>
                      <br />
                      Plattformstrategie (Facebook, Instagram, LinkedIn, YouTube), Social Ads, virales Marketing, Facebook Advertising. Abschluss: Certified Social Media Manager:in
                    </p>
                    <p>
                      <strong>Content Marketing · 2 Monate</strong>
                      <br />
                      Content-Strategie, E-Mail-Marketing, WordPress, Blogging und SEO-Content. Abschluss: Certified Content Marketing Manager
                    </p>
                    <p>
                      <strong>SEO, SEA &amp; Web Analytics · 2 Monate</strong>
                      <br />
                      Suchmaschinenoptimierung, Google Ads, Kampagnenmanagement, Google Analytics, Google Tag Manager. Abschluss: Certified Search Engine Marketing Manager &amp; Web Analyst
                    </p>
                    <p>
                      <strong>E-Commerce · 2 Monate</strong>
                      <br />
                      Online-Shop-Strategie, WooCommerce, Google Analytics, Social Ads, Projektarbeit mit eigenem Shop-Konzept. Abschluss: GFN-Zertifikat E-Commerce Manager
                    </p>
                    <p>
                      <em>Alle Kurse über GFN GmbH / WPI, online, gefördert. Zertifikate von Webmasters Europe e.V. sind anerkannte Branchenzertifizierungen.</em>
                    </p>
                  </div>
                </details>
                <details className="glass rv d1">
                  <summary>
                    <span className="date">06/2024 – 05/2025</span>
                    <span className="t">Büro &amp; digitale Kompetenzen</span>
                    <span className="plus" aria-hidden="true">+</span>
                    <span className="c">Vollzeit-Weiterbildungsreihe · FAW Akademie Cottbus</span>
                  </summary>
                  <div className="exp">
                    <p>
                      Praxisorientierte Qualifizierung in Bürokommunikation, MS-Office-Anwendungen, Datenschutz, IT-Sicherheit und digitaler Arbeitswelt.
                    </p>
                    <p>
                      <strong>Büroverwaltung &amp; Kommunikation · 180 Std.</strong>
                      <br />
                      Kommunikationsformen, Selbst- und Zeitmanagement, Projektdokumentation
                    </p>
                    <p>
                      <strong>MS Word – Grundlagen · 90 Std.</strong>
                      <br />
                      Dokumentenerstellung, Formatierung, Seriendruck, Vorlagen
                    </p>
                    <p>
                      <strong>MS Excel – Grundlagen &amp; Aufbaukurs · je 90 Std.</strong>
                      <br />
                      Tabellen, Formeln, PIVOT, Diagramme, Datenbankfunktionen
                    </p>
                    <p>
                      <strong>Layout mit MS Office · 90 Std.</strong>
                      <br />
                      Typografie, Corporate Design, Geschäftsdokumente, Formulare, Drucksachen
                    </p>
                    <p>
                      <strong>Datenbanken mit MS Access · 90 Std.</strong>
                      <br />
                      Datenbankstruktur, Abfragen, Formulare, Berichte
                    </p>
                    <p>
                      <strong>Bildbearbeitung mit GIMP · 90 Std.</strong>
                      <br />
                      Bildretusche, Freistellung, Filter, Pixel- und Vektorgrafiken
                    </p>
                    <p>
                      <strong>Kaufmännischer Schriftverkehr · 45 Std.</strong>
                      <br />
                      Geschäftsdokumente, Rechnungsrecht §14 UStG, Datensicherheit
                    </p>
                    <p>
                      <strong>Datenschutz – BDSG &amp; DSGVO · 45 Std.</strong>
                      <br />
                      Gesetzliche Grundlagen, betrieblicher Datenschutz, technisch-organisatorische Maßnahmen
                    </p>
                    <p>
                      <strong>IT-Sicherheit · 45 Std.</strong>
                      <br />
                      Netzwerksicherheit, Malware, Datensicherung, Zugangskontrolle
                    </p>
                    <p>
                      <strong>Digitalisierte Arbeitswelt 4.0 · begleitend</strong>
                      <br />
                      Vernetztes Arbeiten, agile Methoden, virtuelle Teams (IBB AG / VIONA)
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= SKILLS ======================= */}
        <section className="sec" id="skills" aria-labelledby="h-skills">
          <div className="wrap">
            <div className="sec-head rv">
              <p className="num">02 · Skills</p>
              <h2 id="h-skills">Meine Werkzeuge</h2>
              <p className="lead">
                Digitale Kompetenzen, Technologie &amp; KI, Arbeitsweise &amp; Stärken – mit den Tools, die ich täglich einsetze.
              </p>
            </div>
            <div className="skill-grid">
              <div className="glass skill-card rv">
                <h3>Digitale Kompetenzen</h3>
                <div className="skill-item">
                  <div className="n">Design &amp; Gestaltung</div>
                  <div className="tools">Figma, Adobe Illustrator</div>
                </div>
                <div className="skill-item">
                  <div className="n">Content Creation</div>
                  <div className="tools">Canva, Adobe Creative Cloud</div>
                </div>
                <div className="skill-item">
                  <div className="n">SEO</div>
                  <div className="tools">Seobility, Google Search Console</div>
                </div>
                <div className="skill-item">
                  <div className="n">Web &amp; Landingpages</div>
                  <div className="tools">WordPress (Elementor)</div>
                </div>
                <div className="skill-item">
                  <div className="n">Web Analytics</div>
                  <div className="tools">Google Analytics 4</div>
                </div>
                <div className="skill-item">
                  <div className="n">Daten &amp; Tools</div>
                  <div className="tools">Looker Studio, Microsoft Excel</div>
                </div>
              </div>
              <div className="glass skill-card rv d1">
                <h3>Technologie &amp; KI</h3>
                <div className="skill-item">
                  <div className="n">Prompt Engineering</div>
                  <div className="tools">Gemini (Google), Claude (Anthropic)</div>
                </div>
                <div className="skill-item">
                  <div className="n">KI-Workflows</div>
                  <div className="tools">N8N, Make.com</div>
                </div>
              </div>
              <div className="glass skill-card rv d2">
                <h3>Arbeitsweise &amp; Stärken</h3>
                <div className="skill-item">
                  <div className="n">Strukturierte Arbeitsweise</div>
                  <div className="tools">Notion, Trello</div>
                </div>
                <div className="skill-item">
                  <div className="n">Kommunikationsstärke</div>
                  <div className="tools">Slack, Microsoft Teams</div>
                </div>
                <div className="skill-item">
                  <div className="n">Problemlösung</div>
                  <div className="tools">Miro (Mindmapping), GitHub (für technisches Troubleshooting)</div>
                </div>
                <div className="skill-item">
                  <div className="n">Zeitmanagement</div>
                  <div className="tools">Google Calendar</div>
                </div>
              </div>
              <div className="glass skill-card rv d3">
                <h3>Sprachen</h3>
                <div className="skill-item">
                  <div className="n">Deutsch</div>
                </div>
                <div className="skill-item">
                  <div className="n">Englisch</div>
                </div>
              </div>
            </div>
            <div className="about-cta rv">
              <p className="q">Passt dieses Profil zu deinen aktuellen Herausforderungen?</p>
              <a className="btn btn-ghost" href="#kontakt">
                Unverbindlich kennenlernen
              </a>
            </div>
          </div>
        </section>

        {/* ======================= PROJEKTE ======================= */}
        <section className="sec" id="projekte" aria-labelledby="h-projekte">
          <div className="wrap">
            <div className="sec-head rv">
              <p className="num">03 · Projekte</p>
              <h2 id="h-projekte">Ausgewählte Arbeiten</h2>
              <p className="lead">Konzeption, Umsetzung und KI-Integration – drei Einblicke in meine Arbeitsweise.</p>
            </div>
            <div className="proj-grid">
              {/* Projekt 1 */}
              <article className="glass proj rv">
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
                  <span className="cat">SEO &amp; KI-System · Projekt 01</span>
                  <h3>Visibility Lab</h3>
                  <p>
                    Konzeption und Umsetzung einer Landingpage für ein SEO-System mit integrierten KI-Workflows – vom Design über die Seitenstruktur bis zur finalen Bereitstellung.
                  </p>
                  <div className="tags">
                    <span className="chip">SEO</span>
                    <span className="chip">KI-Workflows</span>
                    <span className="chip">Landingpage</span>
                    <span className="chip">WordPress</span>
                    <span className="chip">Prompt Engineering</span>
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
              <article className="glass proj rv d1">
                <div
                  className="thumb"
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
                  <span className="cat">Automatisierung · Projekt 02</span>
                  <h3>Vier-KI-Workflow</h3>
                  <p>
                    Ein vollständiger, automatisierbarer Workflow, der vier KI-Systeme mit klar definierten Rollen kombiniert: Recherche, Strategie, Content-Erstellung und Qualitätsprüfung.
                  </p>
                  <div className="tags">
                    <span className="chip">ChatGPT</span>
                    <span className="chip">Claude</span>
                    <span className="chip">Grok</span>
                    <span className="chip">Make.com</span>
                    <span className="chip">Prompt Engineering</span>
                  </div>
                  <div className="foot">
                    <span className="chip" style={{ borderStyle: 'dashed' }}>
                      Details
                    </span>
                    <a className="go" href="https://meine-assets.pages.dev/pdf/robert_erbach_4_ki_workflow.pdf" target="_blank" rel="noopener noreferrer">
                      PDF ansehen <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>

              {/* Projekt 3 */}
              <article className="glass proj rv d2">
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
                  <span className="cat">Web Analytics · Projekt 03</span>
                  <h3>GA4-Tracking-Implementierung</h3>
                  <p>
                    Konzeption eines umfassenden Tracking-Frameworks am Beispiel E-Commerce – von der Event-Strategie bis zum fertigen Implementierungsdokument.
                  </p>
                  <div className="tags">
                    <span className="chip">Web Analytics</span>
                    <span className="chip">GA4</span>
                    <span className="chip">E-Commerce</span>
                    <span className="chip">Tracking</span>
                    <span className="chip">Measurement Plan</span>
                  </div>
                </div>
                <details>
                  <summary>
                    <span className="arr" aria-hidden="true">
                      ▸
                    </span>{' '}
                    Details ansehen
                  </summary>
                  <div className="case">
                    <h4 style={{ marginTop: '.2em' }}>Nuraghi Outdoor Experience</h4>
                    <p className="meta">Kursarbeit · Web Analytics · März 2026</p>
                    <h4>Kontext</h4>
                    <p>
                      Im Rahmen der Weiterbildung zum Digital Marketing Manager wurde anhand eines fiktiven Outdoor-Onlineshops ein vollständiger GA4-Tracking-Implementierungsplan entwickelt. Ziel war nicht die technische Umsetzung, sondern das konzeptionelle Handwerk: Welche Events braucht ein Shop wirklich – und warum?
                    </p>
                    <h4>Aufgabe</h4>
                    <p>
                      Zwei Geschäftsziele standen im Mittelpunkt: Steigerung der Produktverkäufe und Steigerung der Blog-Interaktionen. Daraus wurden sieben konkrete Tracking-Events abgeleitet, priorisiert und vollständig dokumentiert.
                    </p>
                    <h4>Vorgehen</h4>
                    <p>
                      Zunächst wurde die Customer Journey des Shops analysiert – vom Produktlisting bis zum Kauf. Darauf aufbauend wurden fünf GA4-Standard-E-Commerce-Events implementiert:
                    </p>
                    <span className="mono">view_item_list → view_item → add_to_cart → begin_checkout → purchase</span>
                    <p>
                      Ergänzt durch zwei benutzerdefinierte Events: <strong>apply_promotion_code</strong> zur Kampagnenmessung und <strong>blog_interaction</strong> für Content-Engagement. Für jedes Event wurde ein vollständiger gtag()-Trackingcode erstellt, Trigger definiert, die Implementierungsmethode festgelegt und die Priorisierung begründet. Die Validierung würde über GA4 DebugView und den Measurement Protocol Validation Server erfolgen.
                    </p>
                    <h4>Deliverable</h4>
                    <p>
                      Vollständiger Implementierungsplan als Excel-Dokument mit Event-Namen, Triggern, Trackingcodes, Entwicklerdoku-Links, Implementierungsmethoden und Priorisierung.
                    </p>
                    <h4>Erkenntnis</h4>
                    <p>
                      Tracking-Konzepte scheitern meist nicht an der Technik, sondern daran, dass Events ohne Geschäftsziel-Bezug implementiert werden. Die Priorisierung – Purchase und Add-to-Cart als kritisch, Blog-Interaktion als mittel – zwingt zur strategischen Entscheidung bevor eine einzige Zeile Code geschrieben wird.
                    </p>
                    <div className="imgs">
                      <img
                        src="/assets/images/case-tracking-events.webp"
                        alt="Übersicht der sieben Tracking-Events"
                        loading="lazy"
                        onClick={() => openLightbox('/assets/images/case-tracking-events.webp', 'Übersicht der sieben Tracking-Events')}
                      />
                      <img
                        src="/assets/images/case-excel-plan.webp"
                        alt="Ausschnitt des Excel-Implementierungsplans"
                        loading="lazy"
                        onClick={() => openLightbox('/assets/images/case-excel-plan.webp', 'Ausschnitt des Excel-Implementierungsplans')}
                      />
                    </div>
                  </div>
                </details>
              </article>

              {/* Projekt 4 (Demnächst) */}
              <article className="glass proj soon rv d3">
                <div className="soon-body">
                  <span className="cat">In Arbeit · Projekt 04</span>
                  <h3>Demnächst</h3>
                  <p>Weitere Arbeiten im Bereich KI-Workflows und Frontend-Entwicklung folgen in Kürze.</p>
                  <span className="chip" style={{ borderStyle: 'dashed' }}>
                    In Konzeption
                  </span>
                </div>
              </article>
            </div>

            <div className="proj-cta rv">
              <p className="q">Du planst ein ähnliches Projekt oder möchtest KI in deine Workflows einbinden?</p>
              <a className="btn btn-ghost" href="#kontakt">
                Unverbindlich kennenlernen
              </a>
            </div>
          </div>
        </section>

        {/* ======================= ZERTIFIKATE ======================= */}
        <section className="sec" id="zertifikate" aria-labelledby="h-zert">
          <div className="wrap">
            <div className="sec-head rv">
              <p className="num">04 · Zertifikate</p>
              <h2 id="h-zert">Zertifikate &amp; Nachweise</h2>
              <p className="lead">Belegte Qualifikationen aus Weiterbildung und Praxis – jeweils als PDF beim Aussteller.</p>
            </div>

            {/* Gruppe 1: Digital Marketing */}
            <div className="cert-group rv">
              <h3>Digital Marketing · GFN / Webmasters Europe e.V.</h3>
              <div className="cert-grid">
                <div className="glass cert">
                  <div className="t">Digital Marketing Manager</div>
                  <div className="m">
                    <span>GFN / Webmasters Europe e.V.</span> · <span>21.04.2026</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_digital_marketing_manager.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">Social Media Marketing</div>
                  <div className="m">
                    <span>GFN GmbH / WPI</span> · <span>19.01.2026</span> · <span className="badge">Note: 94% (ausgezeichnet)</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_social_media_manager.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">SEO Manager</div>
                  <div className="m">
                    <span>GFN GmbH / WPI</span> · <span>19.02.2026</span> · <span className="badge">Note: 89% (sehr gut)</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_seo_manager.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">PPC Manager</div>
                  <div className="m">
                    <span>GFN GmbH / WPI</span> · <span>12.03.2026</span> · <span className="badge">Note: 93% (ausgezeichnet)</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_ppc_manager.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">Webanalyse</div>
                  <div className="m">
                    <span>GFN GmbH / WPI</span> · <span>24.03.2026</span> · <span className="badge">Note: 96% (ausgezeichnet)</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_webanalyse.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">E-Commerce Manager</div>
                  <div className="m">
                    <span>GFN GmbH</span> · <span>19.09.2025</span> · <span className="badge">Projektabschluss: 80%</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_e_commerce.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">E-Marketing Manager</div>
                  <div className="m">
                    <span>GFN GmbH</span> · <span>28.07.2025</span> · <span className="badge gray">Teilnahmebescheinigung</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_neuromarketing.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">Content Marketing Manager</div>
                  <div className="m">
                    <span>GFN GmbH</span> · <span>14.11.2025</span> · <span className="badge gray">Teilnahmebescheinigung</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_e_marketing.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Gruppe 2: KI Zertifikate */}
            <div className="cert-group rv">
              <h3>KI · Zertifikate</h3>
              <div className="cert-grid">
                <div className="glass cert">
                  <div className="t">KI Führerschein</div>
                  <div className="m">
                    <span>GFN GmbH</span> · <span>03.04.2026</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_ki_führerschein.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">Arbeiten mit Copilot</div>
                  <div className="m">
                    <span>GFN GmbH</span> · <span>05.04.2026</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_arbeiten_mit_copilot.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">AI Fluency: Framework &amp; Foundations</div>
                  <div className="m">
                    <span>Anthropic</span> · <span className="badge">Certificate of Completion</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_anthropic_framework_foundation.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Gruppe 3: Schulungen GFN */}
            <div className="cert-group rv">
              <h3>Schulungen · GFN</h3>
              <div className="cert-grid">
                <div className="glass cert">
                  <div className="t">Datenschutzschulung</div>
                  <div className="m">
                    <span>GFN GmbH</span> · <span>05.04.2026</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_datenschutzschulung.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">Arbeitsschutzschulung</div>
                  <div className="m">
                    <span>GFN GmbH</span> · <span>05.04.2026</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_arbeitsschutzschulung.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">AGG-Schulung</div>
                  <div className="m">
                    <span>GFN GmbH</span> · <span>05.04.2026</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_agg_schulung.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">IT-Sicherheitsschulung</div>
                  <div className="m">
                    <span>GFN GmbH</span> · <span>05.04.2026</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_it_sicherheitsschulung.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Gruppe 4: FAW Akademie Cottbus */}
            <div className="cert-group rv">
              <h3>Büro &amp; digitale Kompetenzen · FAW Akademie Cottbus</h3>
              <div className="cert-grid">
                <div className="glass cert">
                  <div className="t">Büroverwaltung &amp; Kommunikation</div>
                  <div className="m">
                    <span>FAW</span> · <span>27.09.2024</span> · <span className="badge gray">180 Stunden</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_büroverwaltung_und_kommunikation.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">MS Word</div>
                  <div className="m">
                    <span>FAW</span> · <span>05.07.2024</span> · <span className="badge gray">90 Stunden</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_ms_word.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">MS Excel Grundlagen</div>
                  <div className="m">
                    <span>FAW</span> · <span>25.10.2024</span> · <span className="badge gray">90 Stunden</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_ms_excel_grundlagen.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">MS Excel Aufbaukurs</div>
                  <div className="m">
                    <span>FAW</span> · <span>08.11.2024</span> · <span className="badge gray">90 Stunden</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_ms_excel_aufbaukurs.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">Layout mit MS Office</div>
                  <div className="m">
                    <span>FAW</span> · <span>16.08.2024</span> · <span className="badge gray">90 Stunden</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_layout_mit_ms_office.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">Datenbanken mit MS Access</div>
                  <div className="m">
                    <span>FAW</span> · <span>22.11.2024</span> · <span className="badge gray">90 Stunden</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_datenbanken_mit_ms_access.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">Bildbearbeitung mit GIMP</div>
                  <div className="m">
                    <span>FAW</span> · <span>19.07.2024</span> · <span className="badge gray">90 Stunden</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_bildberabeitung_mit_gimp.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">Kaufmännischer Schriftverkehr</div>
                  <div className="m">
                    <span>FAW</span> · <span>02.08.2024</span> · <span className="badge gray">45 Stunden</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_kaufmännischer_schriftverkehr.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">Datenschutz</div>
                  <div className="m">
                    <span>FAW</span> · <span>29.11.2024</span> · <span className="badge gray">45 Stunden</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_datenschutz.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">IT-Sicherheit</div>
                  <div className="m">
                    <span>FAW</span> · <span>06.12.2024</span> · <span className="badge gray">45 Stunden</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_it_sicherheit.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
                <div className="glass cert">
                  <div className="t">Digitalisierte Arbeitswelt</div>
                  <div className="m">
                    <span>FAW</span> · <span>10.12.2024</span>
                  </div>
                  <a className="lnk" href="https://meine-assets.pages.dev/pdf/robert_erbach_digitalisierte_arbeitswelt.pdf" target="_blank" rel="noopener noreferrer">
                    PDF herunterladen ↗
                  </a>
                </div>
              </div>
            </div>

            <div className="cert-foot rv">
              <p className="q" style={{ color: 'var(--ink-dim)' }}>
                Theoretisch fundiert, praktisch motiviert – bereit für den Einsatz in deinem Team.
              </p>
              <a className="btn btn-ghost" href="#kontakt">
                Unverbindlich kennenlernen
              </a>
            </div>
            <p className="cert-note rv">
              Hinweis: Alle Zertifikate und Nachweise sind als authentische Original-Dokumente direkt verlinkt.
            </p>
          </div>
        </section>

        {/* ======================= KONTAKT ======================= */}
        <section className="sec" id="kontakt" aria-labelledby="h-kontakt">
          <div className="wrap">
            <div className="sec-head rv">
              <p className="num">05 · Kontakt</p>
              <h2 id="h-kontakt">Ich bin offen für neue Möglichkeiten.</h2>
              <p className="lead">
                Ob Jobanfrage, Projektidee oder fachlicher Austausch – schreib mir einfach. Antwort innerhalb von 48 Stunden.
              </p>
            </div>
            <div className="contact-grid">
              <div className="glass c-card rv">
                <span className="status-pill">
                  <span className="dot" aria-hidden="true" />
                  Antwort meist innerhalb 24 Stunden
                </span>
                <div className="c-row">
                  <div className="ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </div>
                  <div>
                    <div className="k">E-Mail</div>
                    <div className="v">
                      <a href="mailto:roberterbach@web.de">roberterbach@web.de</a>
                    </div>
                  </div>
                </div>
                <div className="c-row">
                  <div className="ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                    </svg>
                  </div>
                  <div>
                    <div className="k">Telefon</div>
                    <div className="v">
                      <a href="tel:+4915204041124">+49 152 04041124</a>
                    </div>
                  </div>
                </div>
                <div className="c-row">
                  <div className="ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z" />
                      <circle cx="12" cy="10" r="2.6" />
                    </svg>
                  </div>
                  <div>
                    <div className="k">Standort</div>
                    <div className="v">Falkenberg/Elster</div>
                    <div className="s">(bereit für Remote oder Umzug)</div>
                  </div>
                </div>
                <div className="c-row">
                  <div className="ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                      <path d="M8 11v5M8 7.5v.1M12 16v-3a2 2 0 0 1 4 0v3" />
                    </svg>
                  </div>
                  <div>
                    <div className="k">LinkedIn</div>
                    <div className="v">
                      <a href="https://www.linkedin.com/in/robert-erbach-a173b2371" target="_blank" rel="noopener noreferrer">
                        Profil ansehen ↗
                      </a>
                    </div>
                  </div>
                </div>
                <div className="c-row">
                  <div className="ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
                      <path d="M4 19h16" />
                    </svg>
                  </div>
                  <div>
                    <div className="k">Lebenslauf</div>
                    <div className="v">
                      <a href="https://meine-assets.pages.dev/pdf/robert_erbach_lebenslauf.pdf" target="_blank" rel="noopener noreferrer">
                        Meinen Lebenslauf als PDF herunterladen ↗
                      </a>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: '.78rem', color: 'var(--ink-faint)', marginTop: '.4em' }}>
                  „Lass uns reden“ – am schnellsten per E-Mail oder Anruf.
                </p>
              </div>

              <div className="glass form-card rv d1">
                <h3>Kontaktformular</h3>
                <p className="fdesc">
                  Deine Eingaben werden <strong>nicht</strong> über Server oder Dritte übertragen: Das Formular öffnet einfach eine vorbereitete Nachricht in deinem E-Mail-Programm.
                </p>
                <form id="kform" noValidate onSubmit={handleContactSubmit}>
                  <div className="frow">
                    <label className="f">
                      <span className="cap">Name</span>
                      <input
                        className="fld"
                        type="text"
                        id="f-name"
                        name="name"
                        placeholder="z. B. Max Mustermann"
                        autoComplete="name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        required
                      />
                    </label>
                    <label className="f">
                      <span className="cap">E-Mail</span>
                      <input
                        className="fld"
                        type="email"
                        id="f-mail"
                        name="email"
                        placeholder="name@beispiel.de"
                        autoComplete="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        required
                      />
                    </label>
                  </div>
                  <label className="f">
                    <span className="cap">Betreff</span>
                    <select
                      className="fld"
                      id="f-subject"
                      name="subject"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                    >
                      <option value="Ich habe eine Frage zu …">Ich habe eine Frage zu …</option>
                      <option value="Jobanfrage">Jobanfrage</option>
                      <option value="Projektanfrage (Website / KI-Workflow)">Projektanfrage (Website / KI-Workflow)</option>
                      <option value="Fachlicher Austausch">Fachlicher Austausch</option>
                    </select>
                  </label>
                  <label className="f">
                    <span className="cap">Nachricht</span>
                    <textarea
                      className="fld"
                      id="f-msg"
                      name="message"
                      placeholder="Ich habe eine Frage zu …"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      required
                    />
                  </label>
                  <div className="consent">
                    <input
                      type="checkbox"
                      id="f-consent"
                      checked={contactConsent}
                      onChange={(e) => setContactConsent(e.target.checked)}
                      required
                    />
                    <label htmlFor="f-consent">
                      Ich stimme zu, dass meine Angaben zur Bearbeitung der Anfrage verarbeitet werden. Hinweise:{' '}
                      <a href="#datenschutz">Datenschutzerklärung</a>.
                    </label>
                  </div>
                  <div className="form-actions">
                    <button className="btn btn-primary" type="submit">
                      Nachricht verfassen <span aria-hidden="true">→</span>
                    </button>
                    <span className="form-hint">Öffnet dein Mailprogramm · kein Tracking · keine Cookies</span>
                  </div>
                  {formResponse && (
                    <p className={`form-msg ${formResponse.isError ? 'err' : ''}`} role="status" aria-live="polite">
                      {formResponse.text}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= RECHTLICHE TEXTE ======================= */}
        <div className="sec" style={{ paddingTop: 'clamp(30px, 5vh, 60px)' }}>
          <div className="wrap legal-grid">
            <section className="glass legal rv" id="impressum" aria-labelledby="h-imp">
              <h2 id="h-imp">Impressum</h2>
              <h3>
                <span className="sec-num">§ 1</span>Angaben gemäß § 5 DDG
              </h3>
              <p>
                Robert Erbach
                <br />
                Am Stadtpark 43
                <br />
                04895 Falkenberg/Elster
                <br />
                Deutschland
              </p>
              <h3>
                <span className="sec-num">§ 2</span>Kontakt
              </h3>
              <p>
                Telefon: +49 152 04041124
                <br />
                E-Mail: roberterbach@web.de
              </p>
              <h3>
                <span className="sec-num">§ 3</span>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h3>
              <p>
                Robert Erbach
                <br />
                Am Stadtpark 43
                <br />
                04895 Falkenberg/Elster
              </p>
              <h3>
                <span className="sec-num">§ 4</span>Umsatzsteuer-Identifikationsnummer
              </h3>
              <p>
                <span className="ph">Kleinunternehmerstatus / auf Anfrage</span>
              </p>
              <h3>
                <span className="sec-num">§ 5</span>Haftung für Inhalte und Links
              </h3>
              <p>
                Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Inhalte umgehend entfernen.
              </p>
              <p>
                Diese Seite verlinkt auf externe Inhalte (PDF-Nachweise, Projekt-Live-Demos, LinkedIn). Für die dort angebotenen Inhalte sind die jeweiligen Anbieter verantwortlich.
              </p>
              <h3>
                <span className="sec-num">§ 6</span>Urheberrecht
              </h3>
              <p>
                Die durch mich erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Eine Verwendung ohne vorherige Zustimmung ist nicht gestattet.
              </p>
              <h3>
                <span className="sec-num">§ 7</span>Streitbeilegung
              </h3>
              <p>
                Hinweis gemäß § 36 VSBG: Ich bin nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section className="glass legal rv d1" id="datenschutz" aria-labelledby="h-dsg">
              <h2 id="h-dsg">Datenschutzerklärung</h2>
              <h3>
                <span className="sec-num">1.</span>Datenschutz auf einen Blick
              </h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
              <p>
                Diese Website setzt <strong>keine Tracking- oder Analyse-Cookies</strong>, bindet <strong>keine externen Werbe-Skripte</strong> ein und überträgt keine Daten an Drittanbieter zu Marketingzwecken. Alle Bilder und Gestaltungselemente sind direkt bereitgestellt. Ein Cookie-Banner ist daher nicht erforderlich.
              </p>
              <h3>
                <span className="sec-num">2.</span>Datenerfassung auf dieser Website
              </h3>
              <p>
                <strong>Wie erfasse ich Ihre Daten?</strong> Ihre Daten werden zum einen dadurch erhoben, dass Sie mir diese mitteilen (z. B. per E-Mail oder über das Kontaktformular). Andere Daten werden beim Besuch der Website automatisch durch meine IT-Systeme bzw. die meines Hosting-Anbieters erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
              </p>
              <p>
                <strong>Wofür nutze ich Ihre Daten?</strong> Ein Teil der Daten wird erhoben, um eine fehlerfreie und sichere Bereitstellung der Website zu gewährleisten. Daten aus dem Kontaktbereich nutze ich ausschließlich zur Bearbeitung Ihrer Anfrage.
              </p>
              <h3>
                <span className="sec-num">3.</span>Hosting über Cloudflare Pages
              </h3>
              <p>
                Diese Website wird über Cloudflare Pages bereitgestellt. Anbieter ist die Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA. Cloudflare verarbeitet Logdaten (u. a. IP-Adresse, Zeitpunkt, aufgerufene Ressource), um die Sicherheit und Stabilität der Website zu gewährleisten. Diese Daten werden nicht mit anderen Datenquellen zusammengeführt und nicht zu Werbezwecken genutzt.
              </p>
              <p>
                Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO – berechtigtes Interesse an einer sicheren und effizienten Bereitstellung. Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt.
              </p>
              <h3>
                <span className="sec-num">4.</span>Kontakt per E-Mail und Kontaktformular
              </h3>
              <p>
                Wenn Sie mir per E-Mail oder über das Kontaktformular Anfragen richten, werden Ihre Angaben zur Bearbeitung der Anfrage verarbeitet. Das Kontaktformular dieser Seite sendet keine Daten an einen Server und nutzt keinen externen Formular-Dienst: Es erzeugt lediglich eine vorbereitete E-Mail-Nachricht in Ihrem eigenen E-Mail-Programm. Es gilt Art. 6 Abs. 1 lit. b (vorvertragliche Maßnahmen) bzw. lit. f DSGVO.
              </p>
              <h3>
                <span className="sec-num">5.</span>Downloads (Lebenslauf &amp; Zertifikate)
              </h3>
              <p>
                Die PDF-Nachweise werden vom Hosting bereitgestellt. Dabei werden technische Zugriffsdaten (z. B. IP-Adresse, Zeitpunkt, Dateiname) durch den Hosting-Anbieter verarbeitet. Dies ist erforderlich, um die Inhalte bereitzustellen (Art. 6 Abs. 1 lit. f DSGVO). Eine Auswertung zu Marketingzwecken erfolgt nicht.
              </p>
              <h3>
                <span className="sec-num">6.</span>Externe Links
              </h3>
              <p>
                Diese Seite enthält Links zu LinkedIn (Profil) sowie zu eigenen Projekt-Deployment-URLs. Beim Anklicken solcher Links wird eine Verbindung zu den Servern des jeweiligen Anbieters hergestellt; dabei kann Ihre IP-Adresse verarbeitet werden.
              </p>
              <h3>
                <span className="sec-num">7.</span>Ihre Rechte
              </h3>
              <p>
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten. Sie haben außerdem ein Recht auf Berichtigung oder Löschung dieser Daten.
              </p>
              <h3>
                <span className="sec-num">8.</span>Verantwortliche Stelle
              </h3>
              <p>
                Robert Erbach · Am Stadtpark 43 · 04895 Falkenberg/Elster · Telefon: +49 152 04041124 · E-Mail: roberterbach@web.de
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* ======================= FOOTER ======================= */}
      <footer className="f">
        <div className="wrap f-in">
          <p className="cr">© {new Date().getFullYear()} Robert Erbach. Alle Rechte vorbehalten.</p>
          <div className="l">
            <a href="#impressum">Impressum</a>
            <a href="#datenschutz">Datenschutz</a>
            <a href="#top">Nach oben ↑</a>
          </div>
          <p className="cr" style={{ width: '100%', fontSize: '.74rem' }}>
            Diese Seite verwendet keine Cookies und kein Tracking. · <span className="kbd">⌘/Strg + K</span> = RobertOS-Terminal
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
          if (e.target === e.currentTarget) setLightboxImg(null);
        }}
      >
        <button className="x" id="lb-x" aria-label="Schließen" onClick={() => setLightboxImg(null)}>
          ✕
        </button>
        {lightboxImg && (
          <img src={lightboxImg.src} alt={lightboxImg.alt} id="lb-img" />
        )}
      </div>

      {/* ============ ROBERTOS TERMINAL (Cmd/Ctrl + K) ============ */}
      <div
        id="term"
        className={isTerminalOpen ? 'open' : ''}
        role="dialog"
        aria-modal="true"
        aria-label="RobertOS Terminal"
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsTerminalOpen(false);
        }}
      >
        <div className="term-win">
          <div className="term-bar">
            <span>RobertOS v2.0 – Terminal (⌘/Strg + K)</span>
            <button id="term-close" aria-label="Terminal schließen" onClick={() => setIsTerminalOpen(false)}>
              ✕
            </button>
          </div>
          <div className="term-body" id="term-out" ref={terminalBodyRef}>
            {terminalHistory.map((item, index) => (
              <div key={index} className={item.type}>
                {item.text}
              </div>
            ))}
          </div>
          <form className="term-form" id="term-form" onSubmit={handleTerminalSubmit}>
            <span aria-hidden="true">&gt;</span>
            <input
              id="term-input"
              type="text"
              autoComplete="off"
              spellCheck="false"
              aria-label="Terminal-Befehl"
              ref={terminalInputRef}
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="z. B. skills, projekte, help..."
            />
          </form>
        </div>
      </div>
    </>
  );
}
