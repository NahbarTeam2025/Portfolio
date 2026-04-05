export type Language = 'de' | 'en';

export const translations = {
  de: {
    nav: {
      start: 'Start',
      about: 'Über mich',
      skills: 'Skills',
      projects: 'Projekte',
      certificates: 'Zertifikate',
      tools: 'Tools',
      contact: 'Kontakt',
    },
    tools: {
      title: 'Gamified Tools',
      subtitle: 'Interaktive Experimente',
      tabs: {
        security: 'Sicherheit',
        accessibility: 'Barrierefreiheit',
        marketing: 'Marketing',
        privacy: 'Privacy',
        roi: 'ROI',
        performance: 'Performance',
        utm: 'UTM Builder',
      },
      passwordGuardian: {
        title: 'Password Guardian',
        placeholder: 'Passwort testen...',
        strength: {
          veryWeak: 'Sehr schwach',
          weak: 'Schwach',
          medium: 'Mittel',
          strong: 'Stark',
          veryStrong: 'Legendär',
        },
        desc: 'Teste die Stärke deines Passworts und sieh zu, wie dein Wächter auflevelt.',
      },
      accessibilityHealer: {
        title: 'Accessibility Healer',
        desc: 'Heile die "defekten" UI-Elemente, um die Barrierefreiheit zu verbessern.',
        progress: 'Heilungsprozess',
        elements: {
          image: 'Bild ohne Alt-Text',
          button: 'Kontrast zu gering',
          input: 'Fehlendes Label',
          heading: 'Fehlende Überschrift',
        },
        solutions: {
          altText: 'Alt-Text hinzufügen',
          contrast: 'Kontrast erhöhen',
          label: 'Label verknüpfen',
          heading: 'Überschriftenstruktur hinzufügen',
          tabIndex: 'Tab-Reihenfolge korrigieren',
          aria: 'ARIA-Label hinzufügen',
        },
        success: 'Geheilt!',
        availableFixes: 'Verfügbare Lösungen',
        brokenElements: 'Fehlerhafte UI-Elemente',
        submitForm: 'Formular senden',
        fullName: 'Vollständiger Name',
      },
      funnelTycoon: {
        title: 'Funnel Tycoon',
        desc: 'Optimiere deinen Marketing-Funnel und schließe die Conversion-Lecks.',
        budget: 'Budget',
        stats: {
          visitors: 'Besucher',
          leads: 'Leads',
          customers: 'Kunden',
        },
        upgrades: {
          abTesting: 'A/B-Testing',
          pageSpeed: 'Page Speed Fix',
          copywriting: 'Copywriting Pro',
        },
        messages: {
          insufficientBudget: 'Nicht genug Budget!',
          accountFlagged: 'Werbekonto gesperrt! Conversion gesunken.',
          upgradeSuccess: 'Upgrade erfolgreich!',
          ready: 'Bereit',
        },
        strategies: 'Wachstumsstrategien',
        cost: 'Kosten',
        liveAnalytics: 'Live-Analysen',
        totalConversion: 'Gesamt-Conversion',
        roiGrowth: 'ROI-Wachstum',
      },
      performanceOptimizer: {
        title: 'Performance Optimizer',
        desc: 'Aktiviere Optimierungen, um den PageSpeed Score zu verbessern.',
        availableOpts: 'Verfügbare Optimierungen',
        liveScore: 'Live PageSpeed Score',
        lcp: 'LCP (Largest Contentful Paint)',
        lcpDesc: 'Ladezeit des Hauptinhalts',
        fcp: 'FCP (First Contentful Paint)',
        fcpDesc: 'Erste sichtbare Elemente',
        score: 'Score',
        feedback: {
          good: 'Hervorragend! Deine Website ist optimal konfiguriert und lädt blitzschnell.',
          average: 'Gut, aber es gibt noch Verbesserungspotenzial. Aktiviere weitere Optimierungen.',
          poor: 'Kritisch! Die Ladezeiten sind zu lang. Besucher könnten abspringen.'
        },
        opts: {
          webp: {
            title: 'Bilder optimieren (WebP)',
            desc: 'Konvertiert große Bilder in moderne, kleinere Formate.'
          },
          minify: {
            title: 'CSS/JS Minifizierung',
            desc: 'Entfernt unnötige Zeichen aus dem Code für schnellere Downloads.'
          },
          lazyload: {
            title: 'Lazy Loading',
            desc: 'Lädt Bilder erst, wenn sie im sichtbaren Bereich sind.'
          },
          cdn: {
            title: 'Content Delivery Network (CDN)',
            desc: 'Verteilt Inhalte weltweit für kürzere Server-Antwortzeiten.'
          }
        }
      },
      fingerprintDetector: {
        title: 'Fingerprint Detector',
        desc: 'Sieh dir an, welche Daten dein Browser über dich preisgibt.',
        scan: 'System-Scan starten',
        scanning: 'Scanne System...',
        results: 'Gefundene Daten',
      },
      roiSimulator: {
        title: 'ROI Simulator',
        desc: 'Berechne den Erfolg deiner Marketing-Kampagnen in Echtzeit.',
        budget: 'Budget',
        cpc: 'CPC (Kosten pro Klick)',
        convRate: 'Conversion Rate',
        orderValue: 'Durchschn. Warenkorb',
        roas: 'ROAS',
        profit: 'Gewinn / Verlust',
      },
      lighthouseSim: {
        title: 'Lighthouse Sim',
        desc: 'Erlebe, wie sich Ladezeiten auf die Nutzererfahrung auswirken.',
        network: 'Netzwerkgeschwindigkeit',
        lcp: 'LCP (Largest Contentful Paint)',
        optimization: 'Optimierungstipp',
      },
      utmBuilder: {
        title: 'UTM Link Builder',
        desc: 'Erstelle professionelle Tracking-Links für deine Kampagnen.',
        websiteUrl: 'Website-URL',
        source: 'Kampagnenquelle (utm_source)',
        medium: 'Kampagnenmedium (utm_medium)',
        campaign: 'Kampagnenname (utm_campaign)',
        content: 'Kampagneninhalt (utm_content)',
        term: 'Kampagnenbegriff (utm_term)',
        placeholderUrl: 'https://deine-website.de',
        placeholderSource: 'google, newsletter, social',
        placeholderMedium: 'cpc, email, banner',
        placeholderCampaign: 'sommersale_2025',
        placeholderContent: 'banner_a, sidebar',
        placeholderTerm: 'laufschuhe, marketing',
        copy: 'Link kopieren',
        copied: 'Kopiert!',
        error: 'URL und Quelle sind erforderlich.',
        hint: 'UTM-Parameter helfen dir, den Erfolg deiner Kampagnen in Google Analytics präzise zu messen.'
      }
    },
    hero: {
      title: 'Robert Erbach',
      subtitlePart1: 'Ich denke weiter, als du fragst.',
      subtitlePart2: 'KI-gestützte Frontends & durchdachte Systeme',
      desc: 'Ich entwickle KI-Workflows, baue damit funktionierende Webprojekte und gestalte alles so, dass es auch wirklich gut aussieht.',
      design: 'KI\nEntwicklung',
      structure: 'Prompt Engineering',
      ki: 'Kreatives Design',
      cta: 'Meine Projekte ansehen',
    },
    about: {
      title: 'Wer ist ... ?',
      subtitle: 'Wer ich bin',
      boldText: '„Halbfertig ist keine Option."',
      text1: 'Getreu diesem Grundsatz arbeite ich, egal ob es um eine Website, einen KI-Workflow oder ein Prompt-System geht, das mehrere Aufgaben auf einmal abdeckt.',
      text2: 'Ich fordere mich selbst. Ich nehme mir die Zeit, Dinge wirklich zu durchdenken, bevor ich anfange. Dann ziehe ich durch – ohne Abkürzungen.',
      text3: 'Was ich konkret mache: Ich baue mit KI-Tools Websites und Apps, entwickle komplexe Prompt-Systeme die echte Arbeit abnehmen, und gestalte das alles so, dass es nicht nur funktioniert, sondern auch gut aussieht.',
      motto: 'Ich bin ruhig, bis ich brenne. Und wenn ich brenne, merkst du es.',
      mottoBlue: 'Direkt. Tiefgründig. Konsequent umsetzungsstark.',
      cta: {
        text: 'Ich freue mich darauf, dich persönlich kennenzulernen.',
        button: 'Unverbindlich kennenlernen'
      }
    },
    skills: {
      title: 'Skills',
      subtitle: 'Meine Werkzeuge',
      categories: {
        digital: 'DIGITALE KOMPETENZEN',
        tech: 'TECHNOLOGIE & KI',
        working: 'ARBEITSWEISE & STÄRKEN',
        languages: 'Sprachen'
      },
      items: {
        design: 'Design & Gestaltung',
        data: 'Daten & Tools',
        workflows: 'KI-Workflows',
        structured: 'Strukturierte Arbeitsweise',
        communication: 'Kommunikationsstärke',
        problemSolving: 'Problemlösung',
        timeManagement: 'Zeitmanagement',
        german: 'Deutsch',
        english: 'Englisch',
        contentCreation: 'Content Creation',
        seo: 'SEO',
        webLandingpages: 'Web & Landingpages',
        webAnalytics: 'Web Analytics',
        promptEngineering: 'Prompt Engineering',
      },
      tooltips: {
        contentCreation: 'Canva, Adobe Creative Cloud',
        seo: 'Seobility, Google Search Console',
        webLandingpages: 'WordPress (Elementor)',
        design: 'Figma, Adobe Illustrator',
        webAnalytics: 'Google Analytics 4',
        data: 'Looker Studio, Microsoft Excel',
        promptEngineering: 'Gemini (Google), Claude (Anthropic)',
        workflows: 'N8N, Make.com',
        structured: 'Notion, Trello',
        communication: 'Slack, Microsoft Teams',
        problemSolving: 'Miro (Mindmapping), GitHub (für technisches Troubleshooting)',
        timeManagement: 'Google Calendar',
      },
      cta: {
        text: 'Passt dieses Profil zu deinen aktuellen Herausforderungen?',
        button: 'Unverbindlich kennenlernen'
      }
    },
    projects: {
      title: 'Projekte',
      subtitle: 'Ausgewählte Arbeiten',
      projectLabel: 'Projekt',
      details: 'Details',
      live: 'Live Demo',
      comingSoon: 'Demnächst',
      showAll: 'Alle Projekte ansehen',
      cta: {
        text: 'Das sind Einblicke in meine Arbeitsweise – bereit für den Praxiseinsatz in deinem Team.',
        button: 'Unverbindlich kennenlernen'
      },
      items: [
        {
          title: 'Live Demo',
          category: 'Digital Marketing & Web',
          desc: 'Konzeption und Umsetzung einer Landingpage für ein SEO-System mit integrierten KI-Workflows.',
          features: ['SEO-Optimierung', 'KI-Integration', 'Responsive Design', 'Lead-Generierung', 'Google Ai Studio', 'GitHub', 'Cloudflare', 'Web3Forms', 'Gemini'],
          buttonText: 'Live ansehen',
          link: 'https://visibilitylab.roberterbach.de/',
          image: 'https://meine-assets.pages.dev/robert_erbach_visibility_hero.webp'
        },
        {
          title: 'Vier-KI-Workflow',
          category: 'Analytics & Data',
          desc: 'Ein vollständiger, automatisierbarer Workflow der vier KI-Systeme mit klar definierten Rollen kombiniert – für konsistent faktengeprüfte, optimierte und validierte Antworten.',
          features: ['GEMINI', 'PERPLEXITY', 'CLAUDE', 'GROK', 'MAKE.COM', 'PROMPT ENGINEERING'],
          buttonText: 'PDF ansehen',
          link: 'https://meine-assets.pages.dev/pdf/robert_erbach_4_ki_workflow.pdf',
          image: 'https://meine-assets.pages.dev/robert_erbach_4_ki_workflow.webp'
        },
        {
          title: 'GA4-Tracking-Implementierung',
          category: 'Web Analytics',
          desc: 'Konzeption eines umfassenden Tracking-Frameworks am Beispiel E-Commerce – von der Event-Strategie bis zum fertigen Implementierungsdokument.',
          features: ['Web Analytics', 'GA4', 'E-Commerce', 'Tracking', 'Measurement Plan'],
          buttonText: 'Details ansehen',
          image: 'https://meine-assets.pages.dev/nuraghi.webp',
          details: {
            subtitle: 'Nuraghi Outdoor Experience',
            meta: 'Kursarbeit | Web Analytics | März 2026',
            sections: [
              {
                title: 'Kontext',
                content: 'Im Rahmen der Weiterbildung zum Digital Marketing Manager wurde anhand eines fiktiven Outdoor-Onlineshops ein vollständiger GA4-Tracking-Implementierungsplan entwickelt. Ziel war nicht die technische Umsetzung, sondern das konzeptionelle Handwerk: Welche Events braucht ein Shop wirklich – und warum?'
              },
              {
                title: 'Aufgabe',
                content: 'Zwei Geschäftsziele standen im Mittelpunkt: Steigerung der Produktverkäufe und Steigerung der Blog-Interaktionen. Daraus wurden sieben konkrete Tracking-Events abgeleitet, priorisiert und vollständig dokumentiert.'
              },
              {
                title: 'Vorgehen',
                content: 'Zunächst wurde die Customer Journey des Shops analysiert – vom Produktlisting bis zum Kauf. Darauf aufbauend wurden fünf GA4-Standard-E-Commerce-Events implementiert:\nview_item_list → view_item → add_to_cart → begin_checkout → purchase\nErgänzt durch zwei benutzerdefinierte Events: apply_promotion_code zur Kampagnenmessung und blog_interaction für Content-Engagement.\nFür jedes Event wurde ein vollständiger gtag()-Trackingcode erstellt, Trigger definiert, die Implementierungsmethode festgelegt und die Priorisierung begründet. Die Validierung würde über GA4 DebugView und den Measurement Protocol Validation Server erfolgen.'
              },
              {
                title: 'Deliverable',
                content: 'Vollständiger Implementierungsplan als Excel-Dokument mit Event-Namen, Triggern, Trackingcodes, Entwicklerdoku-Links, Implementierungsmethoden und Priorisierung.'
              },
              {
                title: 'Erkenntnis',
                content: 'Tracking-Konzepte scheitern meist nicht an der Technik, sondern daran, dass Events ohne Geschäftsziel-Bezug implementiert werden. Die Priorisierung – Purchase und Add-to-Cart als kritisch, Blog-Interaktion als mittel – zwingt zur strategischen Entscheidung bevor eine einzige Zeile Code geschrieben wird.'
              }
            ],
            images: [
              'https://meine-assets.pages.dev/projekt2trackingevents.webp',
              'https://meine-assets.pages.dev/projekt2excel.webp'
            ]
          }
        }
      ]
    },
    contact: {
      title: 'Kontakt',
      subtitle: 'Ich bin offen für neue Möglichkeiten.',
      desc: 'Ob Jobanfrage, Projektidee oder fachlicher Austausch – schreib mir einfach.\nAntwort innerhalb von 48 Stunden.',
      name: 'Name',
      email: 'E-Mail',
      message: 'Nachricht',
      send: 'Absenden',
      sending: 'Wird gesendet...',
      privacy: 'Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu.',
      privacyLink: 'Datenschutzerklärung',
      successTitle: 'Nachricht gesendet!',
      successDesc: 'Vielen Dank für Ihre Nachricht. Ich werde mich in Kürze bei Ihnen melden.',
      error: 'Es gab ein Problem beim Senden. Bitte versuchen Sie es später erneut.',
      formOpen: 'Kontaktformular öffnen',
      formClose: 'Kontaktformular schließen',
      formTitle: 'Kontaktformular',
      placeholderName: 'z. B. Max Mustermann',
      placeholderEmail: 'name@beispiel.de',
      placeholderMessage: 'Ich habe eine Frage zu …',
      responseTime: 'Antwort meist innerhalb 24 Stunden',
      location: 'Standort',
      locationValue: 'Falkenberg/Elster',
      locationSub: '(bereit für Remote oder Umzug)',
      downloadCV: 'Meinen Lebenslauf als PDF herunterladen',
      downloadButton: 'PDF herunterladen',
      unlockPrompt: 'PDF herunterladen',
      passwordPrompt: 'Passwort eingeben...',
      cvProtectedTitle: 'Lebenslauf geschützt',
      cvProtectedDesc: 'Bitte gib das Passwort ein, um den Lebenslauf herunterzuladen.',
    },
    qualifications: {
      title: 'Stationen',
      ctaText: 'Ein Werdegang mit Fokus auf Struktur und Fortschritt – bereit für den nächsten Schritt bei euch.',
      ctaButton: 'Unverbindlich kennenlernen',
      items: [
        {
          date: '07/2025 – 04/2026',
          title: 'Weiterbildung: Digital Marketing Manager',
          company: 'GFN GmbH / WPI',
          desc: '**Online-Vollzeit-Weiterbildung** · Abschluss: 5 Zertifikate von Webmasters Europe e.V. mit abschließendem Diplom\n\nGesamtausbildung im digitalen Marketing: Online-Marketing & Neuromarketing, Social Media Management, Content Marketing, SEO/SEA & Web Analytics sowie E-Commerce.\n\n**Online-Marketing & Verkaufspsychologie · 4 Wochen**\n\nGrundlagen digitales Marketing, Zielgruppenanalyse, Neuromarketing und Kaufpsychologie, KI-Tools im Marketing. Abschluss: Certified Digital Marketing Assistant\n\n**Social Media Management · 2 Monate**\n\nPlattformstrategie (Facebook, Instagram, LinkedIn, YouTube), Social Ads, virales Marketing, Facebook Advertising. Abschluss: Certified Social Media Manager:in\n\n**Content Marketing · 2 Monate**\n\nContent-Strategie, E-Mail-Marketing, WordPress, Blogging und SEO-Content. Abschluss: Certified Content Marketing Manager\n\n**SEO, SEA & Web Analytics · 2 Monate**\n\nSuchmaschinenoptimierung, Google Ads, Kampagnenmanagement, Google Analytics, Google Tag Manager. Abschluss: Certified Search Engine Marketing Manager & Web Analyst\n\n**E-Commerce · 2 Monate**\n\nOnline-Shop-Strategie, WooCommerce, Google Analytics, Social Ads, Projektarbeit mit eigenem Shop-Konzept. Abschluss: GFN-Zertifikat E-Commerce Manager\n\n*Alle Kurse über GFN GmbH / WPI, online, gefördert. Zertifikate von Webmasters Europe e.V. sind anerkannte Branchenzertifizierungen.*'
        },
        {
          date: '06/2024 – 05/2025',
          title: 'Büro & digitale Kompetenzen',
          company: 'Vollzeit-Weiterbildungsreihe · FAW Akademie Cottbus',
          desc: 'Praxisorientierte Qualifizierung in Bürokommunikation, MS-Office-Anwendungen, Datenschutz, IT-Sicherheit und digitaler Arbeitswelt.\n\n**Büroverwaltung & Kommunikation · 180 Std.**\n\nKommunikationsformen, Selbst- und Zeitmanagement, Projektdokumentation\n\n**MS Word – Grundlagen · 90 Std.**\n\nDokumentenerstellung, Formatierung, Seriendruck, Vorlagen\n\n**MS Excel – Grundlagen & Aufbaukurs · je 90 Std.**\n\nTabellen, Formeln, PIVOT, Diagramme, Datenbankfunktionen\n\n**Layout mit MS Office · 90 Std.**\n\nTypografie, Corporate Design, Geschäftsdokumente, Formulare, Drucksachen\n\n**Datenbanken mit MS Access · 90 Std.**\n\nDatenbankstruktur, Abfragen, Formulare, Berichte\n\n**Bildbearbeitung mit GIMP · 90 Std.**\n\nBildretusche, Freistellung, Filter, Pixel- und Vektorgrafiken\n\n**Kaufmännischer Schriftverkehr · 45 Std.**\n\nGeschäftsdokumente, Rechnungsrecht §14 UStG, Datensicherheit\n\n**Datenschutz – BDSG & DSGVO · 45 Std.**\n\nGesetzliche Grundlagen, betrieblicher Datenschutz, technisch-organisatorische Maßnahmen\n\n**IT-Sicherheit · 45 Std.**\n\nNetzwerksicherheit, Malware, Datensicherung, Zugangskontrolle\n\n**Digitalisierte Arbeitswelt 4.0 · begleitend**\n\nVernetztes Arbeiten, agile Methoden, virtuelle Teams (IBB AG / VIONA)'
        }
      ]
    },
    certificates: {
      title: 'Zertifikate',
      protectedTitle: 'Geschützter Bereich',
      protectedDesc: 'Bitte gib das Passwort ein, um die Zertifikate einzusehen.',
      passwordPlaceholder: 'Passwort',
      unlockButton: 'Entsperren',
      invalidPassword: 'Ungültiges Passwort',
      verified: 'Verifiziert',
      issuerLabel: 'Aussteller:',
      view: 'PDF herunterladen',
      preview: 'Vorschau des Zertifikats. Klicken Sie zum Vergrößern.',
      showAll: 'Alle Zertifikate anzeigen',
      ctaText: 'Theoretisch fundiert, praktisch motiviert – bereit für den Einsatz in deinem Team.',
      ctaButton: 'Unverbindlich kennenlernen',
      items: [
        { id: 1, title: 'Digital Marketing Manager', issuer: 'GFN GmbH', date: 'laufend' },
        { id: 5, title: 'Social Media Marketing', issuer: 'GFN GmbH / WPI', date: '19.01.2026', info: 'Note: 94% (ausgezeichnet)', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_social_media_manager.pdf' },
        { id: 6, title: 'SEO Manager', issuer: 'GFN GmbH / WPI', date: '19.02.2026', info: 'Note: 89% (sehr gut)', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_seo_manager.pdf' },
        { id: 7, title: 'PPC Manager', issuer: 'GFN GmbH / WPI', date: '12.03.2026', info: 'Note: 93% (ausgezeichnet)', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_ppc_manager.pdf' },
        { id: 9, title: 'Webanalyse', issuer: 'GFN GmbH / WPI', date: '24.03.2026', info: 'Note: 96% (ausgezeichnet)', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_webanalyse.pdf' },
        { id: 22, title: 'KI Führerschein', issuer: 'GFN GmbH', date: '03.04.2026', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_ki_f%C3%BChrerschein.pdf', category: 'KI' },
        { id: 27, title: 'Arbeiten mit Copilot', issuer: 'GFN GmbH', date: '05.04.2026', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_arbeiten_mit_copilot.pdf', category: 'KI' },
        { id: 3, title: 'E-Commerce Manager', issuer: 'GFN GmbH', date: '19.09.2025', info: 'Projektabschluss: 80%', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_e_commerce.pdf' },
        { id: 4, title: 'E-Marketing Manager', issuer: 'GFN GmbH', date: '28.07.2025', info: 'Teilnahmebescheinigung', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_neuromarketing.pdf' },
        { id: 2, title: 'Content Marketing Manager', issuer: 'GFN GmbH', date: '14.11.2025', info: 'Teilnahmebescheinigung', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_e_marketing.pdf' },
        { id: 23, title: 'Datenschutzschulung', issuer: 'GFN GmbH', date: '05.04.2026', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_datenschutzschulung.pdf' },
        { id: 24, title: 'Arbeitsschutzschulung', issuer: 'GFN GmbH', date: '05.04.2026', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_arbeitsschutzschulung.pdf' },
        { id: 25, title: 'AGG-Schulung', issuer: 'GFN GmbH', date: '05.04.2026', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_agg_schulung.pdf' },
        { id: 26, title: 'IT-Sicherheitsschulung', issuer: 'GFN GmbH', date: '05.04.2026', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_it_sicherheitsschulung.pdf' },
        { id: 21, title: 'MS Word', issuer: 'FAW', date: '05.07.2024', info: '90 Stunden', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_ms_word.pdf' },
        { id: 11, title: 'Bildbearbeitung mit GIMP', issuer: 'FAW', date: '19.07.2024', info: '90 Stunden', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_bildberabeitung_mit_gimp.pdf' },
        { id: 17, title: 'Kaufmännischer Schriftverkehr', issuer: 'FAW', date: '02.08.2024', info: '45 Stunden', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_kaufm%C3%A4nnischer_schriftverkehr.pdf' },
        { id: 18, title: 'Layout mit MS Office', issuer: 'FAW', date: '16.08.2024', info: '90 Stunden', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_layout_mit_ms_office.pdf' },
        { id: 12, title: 'Büroverwaltung & Kommunikation', issuer: 'FAW', date: '27.09.2024', info: '180 Stunden', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_b%C3%BCroverwaltung_und_kommunikation.pdf' },
        { id: 19, title: 'MS Excel Grundlagen', issuer: 'FAW', date: '25.10.2024', info: '90 Stunden', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_ms_excel_grundlagen.pdf' },
        { id: 20, title: 'MS Excel Aufbaukurs', issuer: 'FAW', date: '08.11.2024', info: '90 Stunden', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_ms_excel_aufbaukurs.pdf' },
        { id: 13, title: 'Datenbanken mit MS Access', issuer: 'FAW', date: '22.11.2024', info: '90 Stunden', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_datenbanken_mit_ms_access.pdf' },
        { id: 14, title: 'Datenschutz', issuer: 'FAW', date: '29.11.2024', info: '45 Stunden', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_datenschutz.pdf' },
        { id: 16, title: 'IT-Sicherheit', issuer: 'FAW', date: '06.12.2024', info: '45 Stunden', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_it_sicherheit.pdf' },
        { id: 15, title: 'Digitalisierte Arbeitswelt', issuer: 'FAW', date: '10.12.2024', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_digitalisierte_arbeitswelt.pdf' },
        { id: 10, title: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', date: 'Certificate of Completion', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_anthropic_framework_foundation.pdf', category: 'KI' }
      ]
    },
    footer: {
      rights: 'Alle Rechte vorbehalten.',
      impressum: 'Impressum',
      privacy: 'Datenschutz',
    },
    impressum: {
      title: "Impressum",
      close: "Schließen",
      section1Title: "Angaben gemäß § 5 TMG",
      section2Title: "Kontakt",
      section3Title: "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV",
      name: "Robert Erbach",
      address: "Am Stadtpark 43",
      city: "04895 Falkenberg/Elster",
      phone: "Telefon: 0152-04041124",
      email: "E-Mail: roberterbach@web.de"
    },
    privacy: {
      title: "Datenschutzerklärung",
      close: "Schließen",
      content: `**Datenschutzerklärung**

---

**1. Datenschutz auf einen Blick**

**Allgemeine Hinweise**
Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.

**Datenerfassung auf dieser Website**

*Wer ist verantwortlich für die Datenerfassung auf dieser Website?*
Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.

*Wie erfasse ich Ihre Daten?*
Ihre Daten werden zum einen dadurch erhoben, dass Sie mir diese mitteilen, z. B. wenn Sie mich per E-Mail kontaktieren. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch meine IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).

*Wofür nutze ich Ihre Daten?*
Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können nach Ihrer Einwilligung zur Analyse Ihres Nutzerverhaltens verwendet werden.

*Welche Rechte haben Sie bezüglich Ihrer Daten?*
Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.

---

**2. Hosting**

**Cloudflare**
Anbieter ist die Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA (nachfolgend „Cloudflare").

Wenn Sie meine Website besuchen, erfasst Cloudflare verschiedene Logfiles inklusive Ihrer IP-Adressen. Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie in der Datenschutzerklärung von Cloudflare: https://www.cloudflare.com/privacypolicy/

Die Verwendung von Cloudflare erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Ich habe ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung meiner Website.

---

**3. Allgemeine Hinweise und Pflichtinformationen**

**Datenschutz**
Ich nehme den Schutz Ihrer persönlichen Daten sehr ernst. Ich behandle Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.

**Hinweis zur verantwortlichen Stelle**
Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:

Robert Erbach, Am Stadtpark 43, 04895 Falkenberg/Elster
Telefon: 0152-04041124
E-Mail: roberterbach@web.de

---

**4. Datenerfassung auf dieser Website**

**Bereitstellung von Downloads (Zertifikate & Lebenslauf)**
Ich biete auf meiner Website Zertifikate sowie meinen Lebenslauf zum Download an. Beim Herunterladen dieser Dateien werden standardmäßig technische Daten (wie Ihre IP-Adresse, Zeitpunkt des Downloads, Dateiname) durch meinen Hoster Cloudflare erfasst. Dies ist technisch notwendig, um den Download zur Verfügung zu stellen (Art. 6 Abs. 1 lit. f DSGVO). Es erfolgt keine darüber hinausgehende Auswertung Ihres Download-Verhaltens zu Marketingzwecken.

---

**5. Externe Ressourcen und CDN**

**Bunny Fonts**
Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten externe Ressourcen. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Webfonts direkt von den Servern des Anbieters (Bunny.net) in Ihren Browsercache. Hierbei wird technisch bedingt Ihre IP-Adresse an diesen Anbieter übertragen. Bunny Fonts ist eine datenschutzfreundliche Alternative zu Google Fonts und wird auf Servern innerhalb der EU bereitgestellt.

**Content Delivery Network – Cloudflare**
Ich nutze für die Bereitstellung von Medieninhalten das Content Delivery Network (CDN) von Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA.

Zweck der Nutzung ist die Optimierung der Ladezeiten und die stabile Bereitstellung meiner Assets. Durch die Nutzung dieses Dienstes werden Medieninhalte direkt von den Servern von Cloudflare geladen. Dabei verarbeitet Cloudflare technisch bedingt die IP-Adresse Ihres Endgeräts sowie weitere Log-Daten.

Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie unter: https://www.cloudflare.com/privacypolicy/

Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.

**Cloudflare Web Analytics**
Diese Website nutzt Cloudflare Web Analytics, einen datenschutzfreundlichen Analysedienst der Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA.

Cloudflare Web Analytics setzt keine Cookies und speichert keine personenbezogenen Daten auf Ihrem Endgerät. Es werden ausschließlich aggregierte, nicht personenbezogene Nutzungsdaten erfasst (z. B. Seitenaufrufe, Verweildauer, verwendeter Browser). Eine Identifizierung einzelner Personen ist nicht möglich.

Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Ich habe ein berechtigtes Interesse an einer anonymen Analyse der Websitenutzung zur technischen Verbesserung meines Angebots.

Details: https://www.cloudflare.com/privacypolicy/

---

**6. Analyse-Tools (Google Analytics)**

Diese Website nutzt Google Analytics, einen Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland („Google").

Google Analytics wird auf dieser Website ausschließlich nach Ihrer ausdrücklichen Einwilligung aktiviert. Ohne Ihre Zustimmung werden keine Daten an Google übertragen. Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO. Ihre Einwilligung ist jederzeit mit Wirkung für die Zukunft widerrufbar.

Im Fall Ihrer Einwilligung verwendet Google Analytics sog. „Cookies", die eine Analyse der Benutzung der Website ermöglichen. Die erzeugten Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt.

Sie können die Erfassung durch Google Analytics außerdem verhindern, indem Sie das Browser-Plugin unter folgendem Link herunterladen und installieren: https://tools.google.com/dlpage/gaoptout?hl=de`
    },
    common: {
      loading: 'Wird geladen...',
      success: 'Erfolgreich',
      back: 'Zurück',
      letsTalk: 'Lass uns reden',
      backToTitle: 'Zurück zu Robert Erbach',
      darkModeOn: 'Dark Mode aktivieren',
      darkModeOff: 'Light Mode aktivieren',
      loadingExperience: 'Erlebnis wird geladen',
      cookieBanner: {
        text: 'Ich verwende ausschließlich analytische Cookies zur Seiten-Interaktion. Keine personenbezogenen Daten, keine Marketing-Cookies. Details findest du in der',
        privacyLink: 'Datenschutzerklärung',
        accept: 'Akzeptieren',
        decline: 'Ablehnen'
      }
    }
  },
  en: {
    nav: {
      start: 'Home',
      about: 'About Me',
      skills: 'Skills',
      projects: 'Projects',
      certificates: 'Certificates',
      tools: 'Tools',
      contact: 'Contact',
    },
    tools: {
      title: 'Gamified Tools',
      subtitle: 'Interactive Experiments',
      tabs: {
        security: 'Security',
        accessibility: 'Accessibility',
        marketing: 'Marketing',
        privacy: 'Privacy',
        roi: 'ROI',
        performance: 'Performance',
        utm: 'UTM Builder',
      },
      passwordGuardian: {
        title: 'Password Guardian',
        placeholder: 'Test password...',
        strength: {
          veryWeak: 'Very weak',
          weak: 'Weak',
          medium: 'Medium',
          strong: 'Strong',
          veryStrong: 'Legendary',
        },
        desc: 'Test your password strength and watch your guardian level up.',
      },
      accessibilityHealer: {
        title: 'Accessibility Healer',
        desc: 'Heal the "broken" UI elements to improve accessibility.',
        progress: 'Healing Progress',
        elements: {
          image: 'Image without Alt-Text',
          button: 'Contrast too low',
          input: 'Missing Label',
          heading: 'Missing Heading',
        },
        solutions: {
          altText: 'Add Alt-Text',
          contrast: 'Increase Contrast',
          label: 'Link Label',
          heading: 'Add Heading Structure',
          tabIndex: 'Fix Tab Order',
          aria: 'Add ARIA Label',
        },
        success: 'Healed!',
        availableFixes: 'Available Fixes',
        brokenElements: 'Broken UI Elements',
        submitForm: 'Submit Form',
        fullName: 'Full Name',
      },
      funnelTycoon: {
        title: 'Funnel Tycoon',
        desc: 'Optimize your marketing funnel and close conversion leaks.',
        budget: 'Budget',
        stats: {
          visitors: 'Visitors',
          leads: 'Leads',
          customers: 'Customers',
        },
        upgrades: {
          abTesting: 'A/B Testing',
          pageSpeed: 'Page Speed Fix',
          copywriting: 'Copywriting Pro',
        },
        messages: {
          insufficientBudget: 'Not enough budget!',
          accountFlagged: 'Ad account flagged! Conversion dropped.',
          upgradeSuccess: 'Upgrade successful!',
          ready: 'Ready',
        },
        strategies: 'Growth Strategies',
        cost: 'Cost',
        liveAnalytics: 'Live Analytics',
        totalConversion: 'Total Conversion',
        roiGrowth: 'ROI Growth',
      },
      performanceOptimizer: {
        title: 'Performance Optimizer',
        desc: 'Enable optimizations to improve the PageSpeed Score.',
        availableOpts: 'Available Optimizations',
        liveScore: 'Live PageSpeed Score',
        lcp: 'LCP (Largest Contentful Paint)',
        lcpDesc: 'Loading time of main content',
        fcp: 'FCP (First Contentful Paint)',
        fcpDesc: 'First visible elements',
        score: 'Score',
        feedback: {
          good: 'Excellent! Your website is optimally configured and loads lightning fast.',
          average: 'Good, but there is still room for improvement. Enable more optimizations.',
          poor: 'Critical! Loading times are too long. Visitors might bounce.'
        },
        opts: {
          webp: {
            title: 'Optimize Images (WebP)',
            desc: 'Converts large images into modern, smaller formats.'
          },
          minify: {
            title: 'CSS/JS Minification',
            desc: 'Removes unnecessary characters from code for faster downloads.'
          },
          lazyload: {
            title: 'Lazy Loading',
            desc: 'Loads images only when they enter the visible area.'
          },
          cdn: {
            title: 'Content Delivery Network (CDN)',
            desc: 'Distributes content globally for faster server response times.'
          }
        }
      },
      fingerprintDetector: {
        title: 'Fingerprint Detector',
        desc: 'See what data your browser reveals about you.',
        scan: 'Start System Scan',
        scanning: 'Scanning System...',
        results: 'Detected Data',
      },
      roiSimulator: {
        title: 'ROI Simulator',
        desc: 'Calculate the success of your marketing campaigns in real-time.',
        budget: 'Budget',
        cpc: 'CPC (Cost per Click)',
        convRate: 'Conversion Rate',
        orderValue: 'Avg. Order Value',
        roas: 'ROAS',
        profit: 'Profit / Loss',
      },
      lighthouseSim: {
        title: 'Lighthouse Sim',
        desc: 'Experience how loading times impact user experience.',
        network: 'Network Speed',
        lcp: 'LCP (Largest Contentful Paint)',
        optimization: 'Optimization Tip',
      },
      utmBuilder: {
        title: 'UTM Link Builder',
        desc: 'Create professional tracking links for your campaigns.',
        websiteUrl: 'Website URL',
        source: 'Campaign Source (utm_source)',
        medium: 'Campaign Medium (utm_medium)',
        campaign: 'Campaign Name (utm_campaign)',
        content: 'Campaign Content (utm_content)',
        term: 'Campaign Term (utm_term)',
        placeholderUrl: 'https://your-website.com',
        placeholderSource: 'google, newsletter, social',
        placeholderMedium: 'cpc, email, banner',
        placeholderCampaign: 'summersale_2025',
        placeholderContent: 'banner_a, sidebar',
        placeholderTerm: 'runningshoes, marketing',
        copy: 'Copy Link',
        copied: 'Copied!',
        error: 'URL and Source are required.',
        hint: 'UTM parameters help you precisely measure the success of your campaigns in Google Analytics.'
      }
    },
    hero: {
      title: 'Robert Erbach',
      subtitlePart1: 'I think beyond your questions.',
      subtitlePart2: 'AI-powered frontends & well-thought-out systems',
      desc: 'I develop AI workflows, build functioning web projects with them, and design everything so that it actually looks really good.',
      design: 'AI\nDevelopment',
      structure: 'Prompt Engineering',
      ki: 'Creative Design',
      cta: 'View My Projects',
    },
    about: {
      title: 'Who is ... ?',
      subtitle: 'Who I am',
      boldText: '"Half-finished is not an option."',
      text1: 'I work according to this principle, whether it\'s a website, an AI workflow, or a prompt system that covers several tasks at once.',
      text2: 'I challenge myself. I take the time to really think things through before I start. Then I follow through – without shortcuts.',
      text3: 'What I specifically do: I build websites and apps with AI tools, develop complex prompt systems that take over real work, and design it all so that it not only works but also looks good.',
      motto: 'I am calm until I burn. And when I burn, you notice it.',
      mottoBlue: 'Direct. Profound. Consistently strong in implementation.',
      cta: {
        text: 'I look forward to getting to know you personally.',
        button: 'Get to know each other non-bindingly'
      }
    },
    skills: {
      title: 'Skills',
      subtitle: 'My Tools',
      categories: {
        digital: 'DIGITAL COMPETENCIES',
        tech: 'TECHNOLOGY & AI',
        working: 'WORKING STYLE & STRENGTHS',
        languages: 'Languages'
      },
      items: {
        design: 'Design & Creation',
        data: 'Data & Tools',
        workflows: 'AI Workflows',
        structured: 'Structured Working Style',
        communication: 'Communication Skills',
        problemSolving: 'Problem Solving',
        timeManagement: 'Time Management',
        german: 'German',
        english: 'English',
        contentCreation: 'Content Creation',
        seo: 'SEO',
        webLandingpages: 'Web & Landingpages',
        webAnalytics: 'Web Analytics',
        promptEngineering: 'Prompt Engineering',
      },
      tooltips: {
        contentCreation: 'Canva, Adobe Creative Cloud',
        seo: 'Seobility, Google Search Console',
        webLandingpages: 'WordPress (Elementor)',
        design: 'Figma, Adobe Illustrator',
        webAnalytics: 'Google Analytics 4',
        data: 'Looker Studio, Microsoft Excel',
        promptEngineering: 'Gemini (Google), Claude (Anthropic)',
        workflows: 'N8N, Make.com',
        structured: 'Notion, Trello',
        communication: 'Slack, Microsoft Teams',
        problemSolving: 'Miro (Mindmapping), GitHub (for technical troubleshooting)',
        timeManagement: 'Google Calendar',
      },
      cta: {
        text: 'Does this profile fit your current challenges?',
        button: 'Get to know each other non-bindingly'
      }
    },
    projects: {
      title: 'Projects',
      subtitle: 'Selected Works',
      projectLabel: 'Project',
      details: 'Details',
      live: 'Live Demo',
      comingSoon: 'Coming Soon',
      showAll: 'View All Projects',
      cta: {
        text: 'These are insights into my way of working – ready for practical use in your team.',
        button: 'Get to know each other non-bindingly'
      },
      items: [
        {
          title: 'Live Demo',
          category: 'Digital Marketing & Web',
          desc: 'Conception and implementation of a landing page for an SEO system with integrated AI workflows.',
          features: ['SEO Optimization', 'AI Integration', 'Responsive Design', 'Lead Generation', 'Google Ai Studio', 'GitHub', 'Cloudflare', 'Web3Forms', 'Gemini'],
          buttonText: 'View Live Now',
          link: 'https://seo-ki-landingpage.pages.dev/',
          image: 'https://meine-assets.pages.dev/robert_erbach_visibility_hero.webp'
        },
        {
          title: 'Four-AI-Workflow',
          category: 'Analytics & Data',
          desc: 'A complete, automatable workflow combining four AI systems with clearly defined roles – for consistently fact-checked, optimized, and validated answers.',
          features: ['GEMINI', 'PERPLEXITY', 'CLAUDE', 'GROK', 'MAKE.COM', 'PROMPT ENGINEERING'],
          buttonText: 'View PDF',
          link: 'https://meine-assets.pages.dev/pdf/robert_erbach_4_ki_workflow.pdf',
          image: 'https://meine-assets.pages.dev/robert_erbach_4_ki_workflow.webp'
        },
        {
          title: 'GA4 Tracking Implementation',
          category: 'Web Analytics',
          desc: 'Conception of a complete GA4 tracking plan for a fictional outdoor online shop – from event strategy to the finished implementation document.',
          features: ['Web Analytics', 'GA4', 'E-Commerce', 'Tracking', 'Measurement Plan'],
          buttonText: 'View Details',
          image: 'https://meine-assets.pages.dev/nuraghi.webp',
          details: {
            subtitle: 'Nuraghi Outdoor Experience',
            meta: 'Coursework | Web Analytics | March 2026',
            sections: [
              {
                title: 'Context',
                content: 'As part of the Digital Marketing Manager training, a complete GA4 tracking implementation plan was developed using a fictional outdoor online shop. The goal was not technical implementation, but conceptual craftsmanship: Which events does a shop really need – and why?'
              },
              {
                title: 'Task',
                content: 'Two business goals were at the center: increasing product sales and increasing blog interactions. From these, seven specific tracking events were derived, prioritized and fully documented.'
              },
              {
                title: 'Approach',
                content: 'First, the customer journey of the shop was analyzed – from product listing to purchase. Based on this, five GA4 standard e-commerce events were implemented:\nview_item_list → view_item → add_to_cart → begin_checkout → purchase\nSupplemented by two custom events: apply_promotion_code for campaign measurement and blog_interaction for content engagement.\nA complete gtag() tracking code was created for each event, triggers defined, the implementation method established and the prioritization justified. Validation would take place via GA4 DebugView and the Measurement Protocol Validation Server.'
              },
              {
                title: 'Deliverable',
                content: 'Complete implementation plan as an Excel document with event names, triggers, tracking codes, developer documentation links, implementation methods and prioritization.'
              },
              {
                title: 'Insight',
                content: 'Tracking concepts usually fail not because of technology, but because events are implemented without reference to business goals. Prioritization – Purchase and Add-to-Cart as critical, Blog interaction as medium – forces a strategic decision before a single line of code is written.'
              }
            ],
            images: [
              'https://meine-assets.pages.dev/projekt2trackingevents.webp',
              'https://meine-assets.pages.dev/projekt2excel.webp'
            ]
          }
        }
      ]
    },
    contact: {
      title: 'Contact',
      subtitle: 'I am open to new opportunities.',
      desc: 'Whether it\'s a job inquiry, project idea or professional exchange – just write to me.\nResponse within 48 hours.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Submit',
      sending: 'Sending...',
      privacy: 'I agree to the processing of my data according to the privacy policy.',
      privacyLink: 'Privacy Policy',
      successTitle: 'Message sent!',
      successDesc: 'Thank you for your message. I will get back to you shortly.',
      error: 'There was a problem sending. Please try again later.',
      formOpen: 'Open contact form',
      formClose: 'Close contact form',
      formTitle: 'Contact Form',
      placeholderName: 'e.g. John Doe',
      placeholderEmail: 'name@example.com',
      placeholderMessage: 'I have a question about …',
      responseTime: 'Response usually within 24 hours',
      location: 'Location',
      locationValue: 'Falkenberg/Elster',
      locationSub: '(ready for remote or relocation)',
      downloadCV: 'Download my CV as PDF',
      downloadButton: 'Download PDF',
      unlockPrompt: 'Download PDF',
      passwordPrompt: 'Enter password...',
      cvProtectedTitle: 'CV Protected',
      cvProtectedDesc: 'Please enter the password to download the CV.',
    },
    qualifications: {
      title: 'Stations',
      ctaText: 'A career path with a focus on structure and progress – ready for the next step with you.',
      ctaButton: 'Let\'s get to know each other',
      items: [
        {
          date: '07/2025 – 04/2026',
          title: 'Digital Marketing Manager (Further Training)',
          company: 'GFN GmbH / WPI',
          desc: '**Online Full-time Further Training** · Completion: 5 Certificates from Webmasters Europe e.V.\n\nComprehensive training in digital marketing: Online Marketing & Neuromarketing, Social Media Management, Content Marketing, SEO/SEA & Web Analytics as well as E-Commerce.\n\n**Online Marketing & Sales Psychology · 4 weeks**\n\nBasics of digital marketing, target group analysis, neuromarketing and buying psychology, AI tools in marketing. Completion: Certified Digital Marketing Assistant\n\n**Social Media Management · 2 months**\n\nPlatform strategy (Facebook, Instagram, LinkedIn, YouTube), Social Ads, viral marketing, Facebook Advertising. Completion: Certified Social Media Manager\n\n**Content Marketing · 2 months**\n\nContent strategy, email marketing, WordPress, blogging and SEO content. Completion: Certified Content Marketing Manager\n\n**SEO, SEA & Web Analytics · 2 months**\n\nSearch engine optimization, Google Ads, campaign management, Google Analytics, Google Tag Manager. Completion: Certified Search Engine Marketing Manager & Web Analyst\n\n**E-Commerce · 2 months**\n\nOnline shop strategy, WooCommerce, Google Analytics, Social Ads, project work with own shop concept. Completion: GFN Certificate E-Commerce Manager\n\n*All courses via GFN GmbH / WPI, online, funded. Certificates from Webmasters Europe e.V. are recognized industry certifications.*'
        },
        {
          date: '06/2024 – 05/2025',
          title: 'Commercial Further Training',
          company: 'Fortbildungsakademie der Wirtschaft (IBB)',
          desc: '**Office & Digital Competencies** · Full-time training series · FAW Akademie Cottbus\n\nPractice-oriented qualification in office communication, MS Office applications, data protection, IT security, and the digital working world.\n\n**Office Administration & Communication · 180 hrs.**\n\nForms of communication, self- and time management, project documentation\n\n**MS Word – Basics · 90 hrs.**\n\nDocument creation, formatting, mail merge, templates\n\n**MS Excel – Basics & Advanced · 90 hrs. each**\n\nTables, formulas, PIVOT, diagrams, database functions\n\n**Layout with MS Office · 90 hrs.**\n\nTypography, corporate design, business documents, forms, printed matter\n\n**Databases with MS Access · 90 hrs.**\n\nDatabase structure, queries, forms, reports\n\n**Image Editing with GIMP · 90 hrs.**\n\nImage retouching, cropping, filters, pixel and vector graphics\n\n**Commercial Correspondence · 45 hrs.**\n\nBusiness documents, accounting law §14 UStG, data security\n\n**Data Protection – BDSG & GDPR · 45 hrs.**\n\nLegal foundations, operational data protection, technical-organizational measures\n\n**IT Security · 45 hrs.**\n\nNetwork security, malware, data backup, access control\n\n**Digitalized Working World 4.0 · accompanying**\n\nNetworked working, agile methods, virtual teams (IBB AG / VIONA)'
        }
      ]
    },
    certificates: {
      title: 'Certificates',
      protectedTitle: 'Protected Area',
      protectedDesc: 'Please enter the password to view the certificates.',
      passwordPlaceholder: 'Password',
      unlockButton: 'Unlock',
      invalidPassword: 'Invalid Password',
      verified: 'Verified',
      issuerLabel: 'Issuer:',
      view: 'Download PDF',
      preview: 'Preview of the certificate. Click to enlarge.',
      showAll: 'Show all certificates',
      ctaText: 'Theoretically sound, practically motivated – ready for use in your team.',
      ctaButton: 'Get to know each other non-bindingly',
      items: [
        { id: 1, title: 'Digital Marketing Manager', issuer: 'GFN GmbH', date: 'ongoing' },
        { id: 5, title: 'Social Media Marketing', issuer: 'GFN GmbH / WPI', date: '19.01.2026', info: 'Grade: 94% (excellent)', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_social_media_manager.pdf' },
        { id: 6, title: 'SEO Manager', issuer: 'GFN GmbH / WPI', date: '19.02.2026', info: 'Grade: 89% (very good)', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_seo_manager.pdf' },
        { id: 7, title: 'PPC Manager', issuer: 'GFN GmbH / WPI', date: '12.03.2026', info: 'Grade: 93% (excellent)', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_ppc_manager.pdf' },
        { id: 9, title: 'Web Analysis', issuer: 'GFN GmbH / WPI', date: '24.03.2026', info: 'Grade: 96% (excellent)', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_webanalyse.pdf' },
        { id: 22, title: 'AI Driver\'s License', issuer: 'GFN GmbH', date: '03.04.2026', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_ki_f%C3%BChrerschein.pdf', category: 'KI' },
        { id: 27, title: 'Working with Copilot', issuer: 'GFN GmbH', date: '05.04.2026', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_arbeiten_mit_copilot.pdf', category: 'KI' },
        { id: 3, title: 'E-Commerce Manager', issuer: 'GFN GmbH', date: '19.09.2025', info: 'Project completion: 80%', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_e_commerce.pdf' },
        { id: 4, title: 'E-Marketing Manager', issuer: 'GFN GmbH', date: '28.07.2025', info: 'Certificate of participation', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_neuromarketing.pdf' },
        { id: 2, title: 'Content Marketing Manager', issuer: 'GFN GmbH', date: '14.11.2025', info: 'Certificate of participation', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_e_marketing.pdf' },
        { id: 23, title: 'Data Protection Training', issuer: 'GFN GmbH', date: '05.04.2026', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_datenschutzschulung.pdf' },
        { id: 24, title: 'Occupational Safety Training', issuer: 'GFN GmbH', date: '05.04.2026', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_arbeitsschutzschulung.pdf' },
        { id: 25, title: 'AGG Training', issuer: 'GFN GmbH', date: '05.04.2026', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_agg_schulung.pdf' },
        { id: 26, title: 'IT Security Training', issuer: 'GFN GmbH', date: '05.04.2026', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_it_sicherheitsschulung.pdf' },
        { id: 21, title: 'MS Word', issuer: 'FAW', date: '05.07.2024', info: '90 hours', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_ms_word.pdf' },
        { id: 11, title: 'Image Editing with GIMP', issuer: 'FAW', date: '19.07.2024', info: '90 hours', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_bildberabeitung_mit_gimp.pdf' },
        { id: 17, title: 'Commercial Correspondence', issuer: 'FAW', date: '02.08.2024', info: '45 hours', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_kaufm%C3%A4nnischer_schriftverkehr.pdf' },
        { id: 18, title: 'Layout with MS Office', issuer: 'FAW', date: '16.08.2024', info: '90 hours', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_layout_mit_ms_office.pdf' },
        { id: 12, title: 'Office Administration and Communication', issuer: 'FAW', date: '27.09.2024', info: '180 hours', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_b%C3%BCroverwaltung_und_kommunikation.pdf' },
        { id: 19, title: 'MS Excel Basics', issuer: 'FAW', date: '25.10.2024', info: '90 hours', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_ms_excel_grundlagen.pdf' },
        { id: 20, title: 'MS Excel Advanced Course', issuer: 'FAW', date: '08.11.2024', info: '90 hours', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_ms_excel_aufbaukurs.pdf' },
        { id: 13, title: 'Databases with MS Access', issuer: 'FAW', date: '22.11.2024', info: '90 hours', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_datenbanken_mit_ms_access.pdf' },
        { id: 14, title: 'Data Protection', issuer: 'FAW', date: '29.11.2024', info: '45 hours', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_datenschutz.pdf' },
        { id: 16, title: 'IT Security', issuer: 'FAW', date: '06.12.2024', info: '45 hours', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_it_sicherheit.pdf' },
        { id: 15, title: 'Digitalized Working World', issuer: 'FAW', date: '10.12.2024', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_digitalisierte_arbeitswelt.pdf' },
        { id: 10, title: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', date: 'Certificate of Completion', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_anthropic_framework_foundation.pdf', category: 'KI' }
      ]
    },
    footer: {
      rights: 'All rights reserved.',
      impressum: 'Legal Notice',
      privacy: 'Privacy Policy',
    },
    impressum: {
      title: "Legal Notice",
      close: "Close",
      section1Title: "Information according to § 5 TMG",
      section2Title: "Contact",
      section3Title: "Responsible for content according to § 55 Abs. 2 RStV",
      name: "Robert Erbach",
      address: "Am Stadtpark 43",
      city: "04895 Falkenberg/Elster",
      phone: "Phone: 0152-04041124",
      email: "Email: roberterbach@web.de"
    },
    privacy: {
      title: "Privacy Policy",
      close: "Close",
      content: `**Privacy Policy**

---

**1. Privacy at a glance**

**General Information**
The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data with which you can be personally identified.

**Data collection on this website**

*Who is responsible for data collection on this website?*
Data processing on this website is carried out by the website operator. You can find their contact details in the legal notice of this website.

*How do I collect your data?*
Your data is collected on the one hand by you communicating it to me, e.g., when you contact me by email. Other data is collected automatically or after your consent when you visit the website by my IT systems. These are mainly technical data (e.g., internet browser, operating system, or time of page view).

*What do I use your data for?*
Part of the data is collected to ensure error-free provision of the website. Other data can be used to analyze your user behavior after your consent.

*What rights do you have regarding your data?*
You have the right at any time to receive information free of charge about the origin, recipient, and purpose of your stored personal data. You also have a right to request the correction or deletion of this data. If you have given your consent to data processing, you can revoke this consent at any time for the future. You also have the right, under certain circumstances, to request the restriction of the processing of your personal data.

---

**2. Hosting**

**Cloudflare**
Provider is Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA (hereinafter “Cloudflare”).

When you visit my website, Cloudflare collects various log files including your IP addresses. Data transfer to the USA is based on the standard contractual clauses of the EU Commission. Details can be found in Cloudflare's privacy policy: https://www.cloudflare.com/privacypolicy/

The use of Cloudflare is based on Art. 6 Para. 1 lit. f GDPR. I have a legitimate interest in the most reliable presentation of my website.

---

**3. General information and mandatory information**

**Data protection**
I take the protection of your personal data very seriously. I treat your personal data confidentially and in accordance with the statutory data protection regulations and this privacy policy.

**Note on the responsible body**
The responsible body for data processing on this website is:

Robert Erbach, Am Stadtpark 43, 04895 Falkenberg/Elster
Phone: 0152-04041124
Email: roberterbach@web.de

---

**4. Data collection on this website**

**Provision of downloads (certificates & CV)**
I offer certificates and my CV for download on my website. When downloading these files, technical data (such as your IP address, time of download, file name) are collected by my host Cloudflare by default. This is technically necessary to provide the download (Art. 6 Para. 1 lit. f GDPR). There is no further evaluation of your download behavior for marketing purposes.

---

**5. External resources and CDN**

**Bunny Fonts**
This site uses external resources for the uniform presentation of fonts. When you call up a page, your browser loads the required web fonts directly from the provider's servers (Bunny.net) into your browser cache. For technical reasons, your IP address is transmitted to this provider. Bunny Fonts is a privacy-friendly alternative to Google Fonts and is provided on servers within the EU.

**Content Delivery Network – Cloudflare**
I use the Content Delivery Network (CDN) from Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA to provide media content.

The purpose of use is to optimize loading times and the stable provision of my assets. By using this service, media content is loaded directly from Cloudflare's servers. In order to deliver this content, Cloudflare processes the IP address of your end device and other log data for technical reasons.

Data transfer to the USA is based on the standard contractual clauses of the EU Commission. Details can be found at: https://www.cloudflare.com/privacypolicy/

Legal basis: Art. 6 Para. 1 lit. f GDPR.

**Cloudflare Web Analytics**
This website uses Cloudflare Web Analytics, a privacy-friendly analysis service from Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA.

Cloudflare Web Analytics does not set cookies and does not store any personal data on your end device. Only aggregated, non-personal usage data is collected (e.g., page views, duration of stay, browser used). Identification of individual persons is not possible.

Legal basis: Art. 6 Para. 1 lit. f GDPR. I have a legitimate interest in an anonymous analysis of website usage for the technical improvement of my offer.

Details: https://www.cloudflare.com/privacypolicy/

---

**6. Analytics Tools (Google Analytics)**

This website uses Google Analytics, a web analytics service provided by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland (“Google”).

Google Analytics is only activated on this website after your express consent. Without your consent, no data will be transmitted to Google. The use is based on Art. 6 Para. 1 lit. a GDPR. Your consent can be revoked at any time with effect for the future.

In the event of your consent, Google Analytics uses so-called “cookies”, which enable an analysis of the use of the website. The generated information is usually transmitted to a Google server in the USA and stored there. Data transfer to the USA is based on the standard contractual clauses of the EU Commission.

You can also prevent collection by Google Analytics by downloading and installing the browser plug-in available at the following link: https://tools.google.com/dlpage/gaoptout?hl=en`
    },
    common: {
      loading: 'Loading...',
      success: 'Success',
      back: 'Back',
      letsTalk: "Let's talk",
      backToTitle: 'Back to Robert Erbach',
      darkModeOn: 'Enable Dark Mode',
      darkModeOff: 'Enable Light Mode',
      loadingExperience: 'Loading Experience',
      cookieBanner: {
        text: 'I only use analytical cookies for site interaction. No personal data, no marketing cookies. You can find details in the',
        privacyLink: 'Privacy Policy',
        accept: 'Accept',
        decline: 'Decline'
      }
    }
  }
};
