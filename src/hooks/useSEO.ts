import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  noindex?: boolean;
}

const SEO_DATA: Record<string, SEOProps> = {
  '/': {
    title: 'Robert Erbach - Design & KI',
    description: 'Digital Specialist für Design und KI. Robert Erbach denkt Zusammenhänge weiter, arbeitet strukturiert und entwickelt klare digitale Lösungen.',
  },
  '/ueber-mich': {
    title: 'Über mich | Robert Erbach - Design & KI',
    description: 'Erfahren Sie mehr über Robert Erbach: Strukturiert, durchdacht und konsequent in der Umsetzung von Design- und KI-Projekten.',
  },
  '/skills': {
    title: 'Skills & Kompetenzen | Robert Erbach - Design & KI',
    description: 'Fachkenntnisse in Design, KI-Workflows, SEO, Web Analytics und Prompt Engineering.',
  },
  '/projekte': {
    title: 'Projekte & Referenzen | Robert Erbach - Design & KI',
    description: 'Ausgewählte Arbeiten in den Bereichen Design, KI-Integration und digitale Strategie.',
  },
  '/qualifikation': {
    title: 'Berufliche Qualifikation | Robert Erbach - Design & KI',
    description: 'Beruflicher Werdegang und Qualifikationen von Robert Erbach.',
  },
  '/zertifikate': {
    title: 'Zertifikate | Robert Erbach - Design & KI',
    description: 'Zertifikate und Weiterbildungen in den Bereichen Design, Marketing und KI.',
  },
  '/kontakt': {
    title: 'Kontakt | Robert Erbach - Design & KI',
    description: 'Nehmen Sie Kontakt mit Robert Erbach auf für Anfragen zu Design- und KI-Projekten.',
  },
  '/impressum': {
    title: 'Impressum | Robert Erbach - Design & KI',
    description: 'Impressum und rechtliche Angaben für Robert Erbach.',
    noindex: true
  },
  '/datenschutz': {
    title: 'Datenschutz | Robert Erbach - Design & KI',
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
    const url = `https://roberterbach.de${currentPath === '/' ? '/' : currentPath}`;

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

  }, [location.pathname]);
};
