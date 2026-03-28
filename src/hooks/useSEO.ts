import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  noindex?: boolean;
}

const SEO_DATA: Record<string, SEOProps> = {
  '/': {
    title: 'Robert Erbach – Portfolio',
    description: 'Ich entwickle KI-Workflows, baue damit funktionierende Webprojekte und gestalte alles so, dass es auch wirklich gut aussieht.',
  },
  '/ueber-mich': {
    title: 'Über mich | Robert Erbach – Portfolio',
    description: 'Erfahren Sie mehr über Robert Erbach: „Halbfertig ist keine Option.“ KI-Workflows, Webprojekte und durchdachtes Design.',
  },
  '/skills': {
    title: 'Skills & Kompetenzen | Robert Erbach – Portfolio',
    description: 'Fachkenntnisse in KI-Entwicklung, Prompt Engineering, kreativem Design, SEO und Web Analytics.',
  },
  '/projekte': {
    title: 'Projekte & Referenzen | Robert Erbach – Portfolio',
    description: 'Ausgewählte Arbeiten in den Bereichen KI-Integration, Web-Entwicklung und digitale Strategie.',
  },
  '/zertifikate': {
    title: 'Zertifikate | Robert Erbach – Portfolio',
    description: 'Zertifikate und Weiterbildungen in den Bereichen Digital Marketing, Web Analytics und KI.',
  },
  '/kontakt': {
    title: 'Kontakt | Robert Erbach – Portfolio',
    description: 'Nehmen Sie Kontakt mit Robert Erbach auf für Anfragen zu Websites, Apps und KI-Workflows.',
  },
  '/impressum': {
    title: 'Impressum | Robert Erbach – Portfolio',
    description: 'Impressum und rechtliche Angaben für Robert Erbach.',
    noindex: true
  },
  '/datenschutz': {
    title: 'Datenschutz | Robert Erbach – Portfolio',
    description: 'Datenschutzerklärung für die Website von Robert Erbach.',
    noindex: true
  }
};

export const useSEO = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const seo = SEO_DATA[currentPath] || SEO_DATA['/'];
    // Ensure canonical URL is consistent (with trailing slash for root)
    const url = `${window.location.origin}${currentPath === '/' ? '/' : currentPath}`;

    // Update Title
    document.title = seo.title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seo.description);

    // Update Robots (Noindex)
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', seo.noindex ? 'noindex, nofollow' : 'index, follow');

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Update Open Graph Tags
    const updateMeta = (property: string, content: string, attr: string = 'property') => {
      let el = document.querySelector(`meta[${attr}="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('og:title', seo.title);
    updateMeta('og:description', seo.description);
    updateMeta('og:url', url);
    updateMeta('twitter:title', seo.title, 'name');
    updateMeta('twitter:description', seo.description, 'name');
    updateMeta('twitter:url', url, 'name');

    // Send Google Analytics Pageview
    if ((window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: seo.title,
        page_location: url,
        page_path: currentPath,
        debug_mode: true
      });
    }

  }, [location.pathname]);
};
