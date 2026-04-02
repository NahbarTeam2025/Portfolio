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
    },
    hero: {
      title: 'Robert Erbach',
      subtitlePart1: 'Ich denke weiter, als du fragst.',
      subtitlePart2: 'KI-gestützte Frontends & durchdachte Systeme',
      desc: 'Ich entwickle KI-Workflows, baue damit funktionierende Webprojekte und gestalte alles so, dass es auch wirklich gut aussieht.',
      design: 'KI\nEntwicklung',
      structure: 'Prompt Engineering',
      ki: 'Kreatives Design',
      cta: 'Projekte ansehen',
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
        button: 'Unverbindlich kennenlernen →'
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
        button: 'Unverbindlich kennenlernen →'
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
        button: 'Unverbindlich kennenlernen →'
      },
      items: [
        {
          title: 'Live Demo',
          category: 'Digital Marketing & Web',
          desc: 'Konzeption und Umsetzung einer Landingpage für ein SEO-System mit integrierten KI-Workflows.',
          features: ['SEO-Optimierung', 'KI-Integration', 'Responsive Design', 'Lead-Generierung', 'Google Ai Studio', 'GitHub', 'Cloudflare', 'Web3Forms', 'Gemini'],
          buttonText: 'Live ansehen',
          link: 'https://visibilitylab.roberterbach.de/'
        },
        {
          title: 'GA4-Tracking-Implementierung',
          category: 'Web Analytics',
          desc: 'Konzeption eines umfassenden Tracking-Frameworks am Beispiel E-Commerce – von der Event-Strategie bis zum fertigen Implementierungsdokument.',
          features: ['Web Analytics', 'GA4', 'E-Commerce', 'Tracking', 'Measurement Plan'],
          buttonText: 'Details ansehen',
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
            ]
          }
        },
        {
          title: 'Marketing Dashboard',
          category: 'Analytics & Data',
          desc: 'Entwicklung von Dashboards zur Echtzeit-Überwachung von Marketing-KPIs.',
          features: ['Data Studio', 'API Integration', 'Custom Dashboards', 'Automatisierung'],
          buttonText: 'Coming soon'
        }
      ]
    },
    contact: {
      title: 'Kontakt',
      subtitle: 'Ich bin offen für neue Möglichkeiten.',
      desc: 'Ob Jobanfrage, Projektidee oder fachlicher Austausch – schreib mir einfach.\nIch melde mich zeitnah zurück.',
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
      locationValue: 'Falkenberg/Elster (bereit für Remote oder Umzug)',
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
      ctaButton: 'Unverbindlich kennenlernen →',
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
      view: 'PDF herunterladen',
      preview: 'Vorschau des Zertifikats. Klicken Sie zum Vergrößern.',
      showAll: 'Alle Zertifikate anzeigen',
      ctaText: 'Theoretisch fundiert, praktisch motiviert – bereit für den Einsatz in deinem Team.',
      ctaButton: 'Unverbindlich kennenlernen →',
      items: [
        { id: 1, title: 'Digital Marketing Manager', issuer: 'GFN GmbH / WPI' },
        { id: 2, title: 'Content Marketing Manager', issuer: 'GFN GmbH / WPI', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_e_marketing.pdf' },
        { id: 3, title: 'E-Commerce Manager', issuer: 'GFN GmbH / WPI', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_e_commerce.pdf' },
        { id: 4, title: 'E-Marketing Manager', issuer: 'GFN GmbH / WPI', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_neuromarketing.pdf' },
        { id: 5, title: 'Social Media Marketing', issuer: 'GFN GmbH / WPI', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_social_media_manager.pdf' },
        { id: 6, title: 'SEO Manager', issuer: 'GFN GmbH / WPI', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_seo_manager.pdf' },
        { id: 7, title: 'PPC Manager', issuer: 'GFN GmbH / WPI', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_ppc_manager.pdf' },
        { id: 8, title: 'Web Analytics via GA4', issuer: 'GFN GmbH / WPI', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_web-analyst.pdf' },
        { id: 9, title: 'Web Analytics via Google Tag Manager', issuer: 'GFN GmbH / WPI' },
        { id: 11, title: 'Bildbearbeitung mit Gimp', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_bildberabeitung_mit_gimp.pdf' },
        { id: 12, title: 'Büroverwaltung und Kommunikation', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_b%C3%BCroverwaltung_und_kommunikation.pdf' },
        { id: 13, title: 'Datenbanken mit MS Access', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_datenbanken_mit_ms_access.pdf' },
        { id: 14, title: 'Datenschutz', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_datenschutz.pdf' },
        { id: 15, title: 'Digitalisierte Arbeitswelt', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_digitalisierte_arbeitswelt.pdf' },
        { id: 16, title: 'IT-Sicherheit', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_it_sicherheit.pdf' },
        { id: 17, title: 'Kaufmännischer Schriftverkehr', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_kaufm%C3%A4nnischer_schriftverkehr.pdf' },
        { id: 18, title: 'Layout mit MS Office', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_layout_mit_ms_office.pdf' },
        { id: 19, title: 'MS Excel Grundlagen', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_ms_excel_grundlagen.pdf' },
        { id: 20, title: 'MS Excel Aufbaukurs', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_ms_excel_aufbaukurs.pdf' },
        { id: 21, title: 'MS Word', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_ms_word.pdf' },
        { id: 10, title: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_anthropic_framework_foundation.pdf' }
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
      section1: {
        title: "1. Datenschutz auf einen Blick",
        subtitle1: "Allgemeine Hinweise",
        text1: "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.",
        subtitle2: "Datenerfassung auf dieser Website",
        q1: "Wer ist verantwortlich für die Datenerfassung auf dieser Website?",
        a1: "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.",
        q2: "Wie erfasse ich Ihre Daten?",
        a2: "Ihre Daten werden zum einen dadurch erhoben, dass Sie mir diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch meine IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).",
        q3: "Wofür nutze ich Ihre Daten?",
        a3: "Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.",
        q4: "Welche Rechte haben Sie bezüglich Ihrer Daten?",
        a4: "Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen."
      },
      section2: {
        title: "2. Hosting",
        text1: "Ich hoste die Inhalte meiner Website bei folgendem Anbieter:",
        subtitle1: "Cloudflare",
        text2: "Anbieter ist die Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA (nachfolgend „Cloudflare“).",
        text3: "Wenn Sie meine Website besuchen, erfasst Cloudflare verschiedene Logfiles inklusive Ihrer IP-Adressen. Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie in der Datenschutzerklärung von Cloudflare:",
        text4: "Die Verwendung von Cloudflare erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Ich habe ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung meiner Website."
      },
      section3: {
        title: "3. Allgemeine Hinweise und Pflichtinformationen",
        subtitle1: "Datenschutz",
        text1: "Ich nehme den Schutz Ihrer persönlichen Daten sehr ernst. Ich behandle Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.",
        subtitle2: "Hinweis zur verantwortlichen Stelle",
        text2: "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:",
        address: "Robert Erbach, Am Stadtpark 43, 04895 Falkenberg/Elster, Telefon: 0152-04041124, E-Mail: roberterbach@web.de"
      },
      section4: {
        title: "4. Datenerfassung auf dieser Website",
        subtitle1: "Kontaktformular (Web3Forms)",
        text1: "Wenn Sie mir per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei mir gespeichert. Diese Daten gebe ich nicht ohne Ihre Einwilligung weiter.",
        text2: "Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt zur Abwicklung Ihrer Anfrage. Ich nutze für die Bereitstellung des Formulars den Dienst \"Web3Forms\" des Anbieters Web3Forms. Die von Ihnen eingegebenen Daten werden auf den Servern von Web3Forms verarbeitet.",
        text3: "Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf meinem berechtigten Interesse an der effektiven Bearbeitung der an mich gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.",
        text4: "Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei mir, bis Sie mich zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.",
        subtitle2: "Bereitstellung von Downloads (Zertifikate & Lebenslauf)",
        text5: "Ich biete auf meiner Website Zertifikate sowie meinen Lebenslauf zum Download an. Beim Herunterladen dieser Dateien werden standardmäßig technische Daten (wie Ihre IP-Adresse, Zeitpunkt des Downloads, Dateiname) durch meinen Hoster Cloudflare erfasst. Dies ist technisch notwendig, um den Download zur Verfügung zu stellen (Art. 6 Abs. 1 lit. f DSGVO). Es erfolgt keine darüber hinausgehende Auswertung Ihres Download-Verhaltens zu Marketingzwecken."
      },
      section5: {
        title: "5. Externe Ressourcen und CDN",
        subtitle1: "Bunny Fonts",
        text1: "Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten externe Ressourcen. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Webfonts direkt von den Servern des Anbieters (Bunny.net) in Ihren Browsercache. Hierbei wird technisch bedingt Ihre IP-Adresse an diesen Anbieter übertragen. Bunny Fonts ist eine datenschutzfreundliche Alternative zu Google Fonts und wird auf Servern innerhalb der EU bereitgestellt.",
        subtitle2: "Verwendung eines Content Delivery Networks (CDN) – Cloudflare",
        text2: "Wir nutzen für die Bereitstellung von Medieninhalten (wie Videos und Bildern) das Content Delivery Network (CDN) von Cloudflare (Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA).",
        text3: "Zweck der Nutzung ist die Optimierung der Ladezeiten und die stabile, weltweite Bereitstellung unserer Assets. Durch die Nutzung dieses Dienstes werden Medieninhalte direkt von den Servern von Cloudflare geladen. Um diese Inhalte auszuliefern, verarbeitet Cloudflare technisch bedingt die IP-Adresse Ihres Endgeräts sowie weitere Log-Daten.",
        text4: "Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie in der Datenschutzerklärung von Cloudflare:",
        text5: "Die Rechtsgrundlage für diese Datenverarbeitung ist unser berechtigtes Interesse an einer performanten, technisch stabilen und nutzerfreundlichen Bereitstellung unseres Onlineangebots (Art. 6 Abs. 1 f DSGVO)."
      },
      section6: {
        title: "6. Analyse-Tools (Google Analytics)",
        text1: "Diese Website nutzt Google Analytics, einen Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland („Google“).",
        text2: "Google Analytics verwendet sog. „Cookies“, Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.",
        text3: "Die Speicherung von Google Analytics-Cookies und die Nutzung dieses Analyse-Tools erfolgen auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der Analyse des Nutzerverhaltens, um sowohl sein Webangebot als auch seine Werbung zu optimieren. Sofern eine entsprechende Einwilligung abgefragt wurde (z. B. Einwilligung zur Speicherung von Cookies), erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.",
        text4: "Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; ich weise Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich werden nutzen können. Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem Sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren: https://tools.google.com/dlpage/gaoptout?hl=de."
      }
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
    },
    hero: {
      title: 'Robert Erbach',
      subtitlePart1: 'I think beyond your questions.',
      subtitlePart2: 'AI-powered frontends & well-thought-out systems',
      desc: 'I develop AI workflows, build functioning web projects with them, and design everything so that it actually looks really good.',
      design: 'AI\nDevelopment',
      structure: 'Prompt Engineering',
      ki: 'Creative Design',
      cta: 'View Projects',
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
        button: 'Get to know each other non-bindingly →'
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
        button: 'Get to know each other non-bindingly →'
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
        button: 'Get to know each other non-bindingly →'
      },
      items: [
        {
          title: 'Live Demo',
          category: 'Digital Marketing & Web',
          desc: 'Conception and implementation of a landing page for an SEO system with integrated AI workflows.',
          features: ['SEO Optimization', 'AI Integration', 'Responsive Design', 'Lead Generation', 'Google Ai Studio', 'GitHub', 'Cloudflare', 'Web3Forms', 'Gemini'],
          buttonText: 'View Live Now',
          link: 'https://seo-ki-landingpage.pages.dev/'
        },
        {
          title: 'GA4 Tracking Implementation',
          category: 'Web Analytics',
          desc: 'Conception of a complete GA4 tracking plan for a fictional outdoor online shop – from event strategy to the finished implementation document.',
          features: ['Web Analytics', 'GA4', 'E-Commerce', 'Tracking', 'Measurement Plan'],
          buttonText: 'View Details',
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
            ]
          }
        },
        {
          title: 'Marketing Dashboard',
          category: 'Analytics & Data',
          desc: 'Development of dashboards for real-time monitoring of marketing KPIs.',
          features: ['Data Studio', 'API Integration', 'Custom Dashboards', 'Automation'],
          buttonText: 'Coming soon'
        }
      ]
    },
    contact: {
      title: 'Contact',
      subtitle: 'I am open to new opportunities.',
      desc: 'Whether it\'s a job inquiry, project idea or professional exchange – just write to me.\nI\'ll get back to you promptly.',
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
      locationValue: 'Falkenberg/Elster (ready for remote or relocation)',
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
      ctaButton: 'Let\'s get to know each other →',
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
      view: 'Download PDF',
      preview: 'Preview of the certificate. Click to enlarge.',
      showAll: 'Show all certificates',
      ctaText: 'Theoretically sound, practically motivated – ready for use in your team.',
      ctaButton: 'Get to know each other non-bindingly →',
      items: [
        { id: 1, title: 'Digital Marketing Manager', issuer: 'GFN GmbH / WPI' },
        { id: 2, title: 'Content Marketing Manager', issuer: 'GFN GmbH / WPI', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_e_marketing.pdf' },
        { id: 3, title: 'E-Commerce Manager', issuer: 'GFN GmbH / WPI', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_e_commerce.pdf' },
        { id: 4, title: 'E-Marketing Manager', issuer: 'GFN GmbH / WPI', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_neuromarketing.pdf' },
        { id: 5, title: 'Social Media Marketing', issuer: 'GFN GmbH / WPI', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_social_media_manager.pdf' },
        { id: 6, title: 'SEO Manager', issuer: 'GFN GmbH / WPI', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_seo_manager.pdf' },
        { id: 7, title: 'PPC Manager', issuer: 'GFN GmbH / WPI', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_ppc_manager.pdf' },
        { id: 8, title: 'Web Analytics via GA4', issuer: 'GFN GmbH / WPI', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_web-analyst.pdf' },
        { id: 9, title: 'Web Analytics via Google Tag Manager', issuer: 'GFN GmbH / WPI' },
        { id: 11, title: 'Image Editing with GIMP', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_bildberabeitung_mit_gimp.pdf' },
        { id: 12, title: 'Office Administration and Communication', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_b%C3%BCroverwaltung_und_kommunikation.pdf' },
        { id: 13, title: 'Databases with MS Access', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_datenbanken_mit_ms_access.pdf' },
        { id: 14, title: 'Data Protection', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_datenschutz.pdf' },
        { id: 15, title: 'Digitalized Working World', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_digitalisierte_arbeitswelt.pdf' },
        { id: 16, title: 'IT Security', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_it_sicherheit.pdf' },
        { id: 17, title: 'Commercial Correspondence', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_kaufm%C3%A4nnischer_schriftverkehr.pdf' },
        { id: 18, title: 'Layout with MS Office', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_layout_mit_ms_office.pdf' },
        { id: 19, title: 'MS Excel Basics', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_ms_excel_grundlagen.pdf' },
        { id: 20, title: 'MS Excel Advanced Course', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_ms_excel_aufbaukurs.pdf' },
        { id: 21, title: 'MS Word', issuer: 'FAW', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_ms_word.pdf' },
        { id: 10, title: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', url: 'https://meine-assets.pages.dev/pdf/robert_erbach_anthropic_framework_foundation.pdf' }
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
      section1: {
        title: "1. Privacy at a glance",
        subtitle1: "General Information",
        text1: "The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data with which you can be personally identified.",
        subtitle2: "Data collection on this website",
        q1: "Who is responsible for data collection on this website?",
        a1: "Data processing on this website is carried out by the website operator. You can find their contact details in the legal notice of this website.",
        q2: "How do I collect your data?",
        a2: "Your data is collected on the one hand by you communicating it to me. This can be, for example, data that you enter into a contact form. Other data is collected automatically or after your consent when you visit the website by my IT systems. These are mainly technical data (e.g. internet browser, operating system or time of the page view).",
        q3: "What do I use your data for?",
        a3: "Part of the data is collected to ensure error-free provision of the website. Other data can be used to analyze your user behavior.",
        q4: "What rights do you have regarding your data?",
        a4: "You have the right at any time to receive information free of charge about the origin, recipient and purpose of your stored personal data. You also have a right to request the correction or deletion of this data. If you have given your consent to data processing, you can revoke this consent at any time for the future. You also have the right, under certain circumstances, to request the restriction of the processing of your personal data."
      },
      section2: {
        title: "2. Hosting",
        text1: "I host the content of my website with the following provider:",
        subtitle1: "Cloudflare",
        text2: "Provider is Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA (hereinafter “Cloudflare”).",
        text3: "When you visit my website, Cloudflare collects various log files including your IP addresses. Data transfer to the USA is based on the standard contractual clauses of the EU Commission. Details can be found in Cloudflare's privacy policy:",
        text4: "The use of Cloudflare is based on Art. 6 Para. 1 lit. f GDPR. I have a legitimate interest in the most reliable presentation of my website."
      },
      section3: {
        title: "3. General information and mandatory information",
        subtitle1: "Data protection",
        text1: "I take the protection of your personal data very seriously. I treat your personal data confidentially and in accordance with the statutory data protection regulations and this privacy policy.",
        subtitle2: "Note on the responsible body",
        text2: "The responsible body for data processing on this website is:",
        address: "Robert Erbach, Am Stadtpark 43, 04895 Falkenberg/Elster, Phone: 0152-04041124, Email: roberterbach@web.de"
      },
      section4: {
        title: "4. Data collection on this website",
        subtitle1: "Contact form (Web3Forms)",
        text1: "If you send me inquiries via the contact form, your details from the inquiry form, including the contact details you provided there, will be stored by me for the purpose of processing the inquiry and in the event of follow-up questions. I will not pass on this data without your consent.",
        text2: "The processing of the data entered into the contact form takes place to process your inquiry. I use the service \"Web3Forms\" from the provider Web3Forms to provide the form. The data you enter will be processed on the servers of Web3Forms.",
        text3: "The processing of this data is based on Art. 6 Para. 1 lit. b GDPR, provided that your inquiry is related to the fulfillment of a contract or is necessary to carry out pre-contractual measures. In all other cases, the processing is based on my legitimate interest in the effective processing of the inquiries addressed to me (Art. 6 Para. 1 lit. f GDPR) or on your consent (Art. 6 Para. 1 lit. a GDPR) if this was requested; consent can be revoked at any time.",
        text4: "The data you enter in the contact form will remain with me until you ask me to delete it, revoke your consent to storage or the purpose for data storage no longer applies (e.g. after your inquiry has been processed). Mandatory statutory provisions – in particular retention periods – remain unaffected.",
        subtitle2: "Provision of downloads (certificates)",
        text5: "I offer certificates for download on my website. When downloading these files, technical data (such as your IP address, time of download, file name) are collected by my host Cloudflare by default. This is technically necessary to provide the download (Art. 6 Para. 1 lit. f GDPR). There is no further evaluation of your download behavior for marketing purposes."
      },
      section5: {
        title: "5. External resources and CDN",
        subtitle1: "Bunny Fonts",
        text1: "This site uses external resources for the uniform presentation of fonts. When you call up a page, your browser loads the required web fonts directly from the provider's servers (Bunny.net) into your browser cache. For technical reasons, your IP address is transmitted to this provider. Bunny Fonts is a privacy-friendly alternative to Google Fonts and is provided on servers within the EU.",
        subtitle2: "Use of a Content Delivery Network (CDN) – Cloudflare",
        text2: "We use the Content Delivery Network (CDN) from Cloudflare (Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA) to provide media content (such as videos and images).",
        text3: "The purpose of use is to optimize loading times and the stable, worldwide provision of our assets. By using this service, media content is loaded directly from Cloudflare's servers. In order to deliver this content, Cloudflare processes the IP address of your end device and other log data for technical reasons.",
        text4: "Data transfer to the USA is based on the standard contractual clauses of the EU Commission. Details can be found in Cloudflare's privacy policy:",
        text5: "The legal basis for this data processing is our legitimate interest in a high-performance, technically stable and user-friendly provision of our online offer (Art. 6 Para. 1 f GDPR)."
      },
      section6: {
        title: "6. Analytics Tools (Google Analytics)",
        text1: "This website uses Google Analytics, a web analytics service provided by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland (\"Google\").",
        text2: "Google Analytics uses \"cookies\", which are text files placed on your computer, to help the website analyze how users use the site. The information generated by the cookie about your use of the website will usually be transmitted to and stored by Google on servers in the United States.",
        text3: "The storage of Google Analytics cookies and the use of this analysis tool are based on Art. 6 Para. 1 lit. a GDPR. The website operator has a legitimate interest in analyzing user behavior in order to optimize both its website and its advertising. If consent has been requested (e.g., consent to the storage of cookies), processing takes place exclusively on the basis of Art. 6 Para. 1 lit. a GDPR; consent can be revoked at any time.",
        text4: "You may refuse the use of cookies by selecting the appropriate settings on your browser, however please note that if you do this you may not be able to use the full functionality of this website. You can also prevent Google from collecting the data generated by the cookie and relating to your use of the website (including your IP address) and from processing this data by Google by downloading and installing the browser plug-in available at the following link: https://tools.google.com/dlpage/gaoptout?hl=en."
      }
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
