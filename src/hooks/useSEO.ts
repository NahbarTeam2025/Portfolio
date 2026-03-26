import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
}

const SEO_DATA: Record<string, SEOProps> = {
  '/': {
    title: 'Robert Erbach - Design & KI',
    description: 'Digital Specialist für Marketing, Content und KI. Fokus auf Websites, Content-Strukturen und automatisierte Workflows.'
  },
  '/ueber-mich': {
    title: 'Über mich | Robert Erbach - Design & KI',
    description: 'Erfahren Sie mehr über Robert Erbach, Digital Marketing Manager mit Fokus auf SEO, Content und KI-Workflows.'
  },
  '/skills': {
    title: 'Skills & Kompetenzen | Robert Erbach - Design & KI',
    description: 'Fachkenntnisse in Digital Marketing, SEO, Social Media, Web Analytics und Prompt Engineering.'
  },
  '/projekte': {
    title: 'Projekte & Referenzen | Robert Erbach - Design & KI',
    description: 'Erfolgreiche Projekte in den Bereichen Social Media Kampagnen, KI-Workflows und SEO-Landingpages.'
  },
  '/qualifikation': {
    title: 'Berufliche Qualifikation | Robert Erbach - Design & KI',
    description: 'Beruflicher Werdegang und Qualifikationen von Robert Erbach im Bereich Digital Marketing.'
  },
  '/zertifikate': {
    title: 'Zertifikate | Robert Erbach - Design & KI',
    description: 'Zertifikate und Weiterbildungen in SEO, Web Analytics, Social Media und KI im Marketing.'
  },
  '/kontakt': {
    title: 'Kontakt | Robert Erbach - Design & KI',
    description: 'Nehmen Sie Kontakt mit Robert Erbach auf für Anfragen zu Digital Marketing und KI-Consulting.'
  },
  '/impressum': {
    title: 'Impressum | Robert Erbach - Design & KI',
    description: 'Impressum und rechtliche Angaben für Robert Erbach.'
  },
  '/datenschutz': {
    title: 'Datenschutz | Robert Erbach - Design & KI',
    description: 'Datenschutzerklärung für die Website von Robert Erbach.'
  }
};

export const useSEO = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const seo = SEO_DATA[currentPath] || SEO_DATA['/'];
    const url = `https://roberterbach.de${currentPath === '/' ? '' : currentPath}`;

    // Update Title
    document.title = seo.title;

    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seo.description);
    }

    // Update Canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    }

    // Update Open Graph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', seo.description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', url);

    // Update Twitter Tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', seo.title);

    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', seo.description);

    const twitterUrl = document.querySelector('meta[property="twitter:url"]');
    if (twitterUrl) twitterUrl.setAttribute('content', url);

  }, [location.pathname]);
};
