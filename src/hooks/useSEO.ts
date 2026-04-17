import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

interface SEOProps {
  title: string;
  description: string;
  noindex?: boolean;
}

const SEO_DATA: Record<string, SEOProps> = {
  '/': {
    title: 'Robert Erbach',
    description: 'Digitale Lösungen, KI-Workflows & Webdesign von Robert Erbach.',
  },
  '/ueber-mich': {
    title: 'Über mich | Robert Erbach',
    description: 'Erfahren Sie mehr über Robert Erbach: KI-Workflows, Webprojekte und durchdachtes Design.',
  },
  '/skills': {
    title: 'Skills & Kompetenzen | Robert Erbach',
    description: 'Fachkenntnisse in KI-Entwicklung, Prompt Engineering, kreativem Design, SEO und Web Analytics.',
  },
  '/projekte': {
    title: 'Projekte & Referenzen | Robert Erbach',
    description: 'Ausgewählte Arbeiten in den Bereichen KI-Integration, Web-Entwicklung und digitale Strategie.',
  },
  '/zertifikate': {
    title: 'Zertifikate | Robert Erbach',
    description: 'Zertifikate und Weiterbildungen in den Bereichen Digital Marketing, Web Analytics und KI.',
  },
  '/tools': {
    title: 'KI-Tools | Robert Erbach',
    description: 'Nützliche KI-Tools und Ressourcen für effizientes Arbeiten zusammengestellt von Robert Erbach.',
  },
  '/kontakt': {
    title: 'Kontakt | Robert Erbach',
    description: 'Nehmen Sie Kontakt mit Robert Erbach auf für Anfragen zu Websites, Apps und KI-Workflows.',
  },
  '/impressum': {
    title: 'Impressum | Robert Erbach',
    description: 'Impressum und rechtliche Angaben für Robert Erbach.',
    noindex: true
  },
  '/datenschutz': {
    title: 'Datenschutz | Robert Erbach',
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
    trackPageView(currentPath, seo.title);
  }, [location.pathname]);
};
