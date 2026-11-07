/**
 * Analytics utility for standardized GA4 event tracking.
 * Follows the naming convention: [action]_[element]_[location]
 */

export const trackEvent = (action: string, element: string, location: string, additionalParams: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    const eventName = `${action}_${element}_${location}`.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    (window as any).gtag('event', eventName, {
      ...additionalParams,
      event_location: location,
      event_element: element,
      timestamp: new Date().toISOString(),
    });
  }
};

export const trackPageView = (path: string, title: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'G-90T4169WJP', {
      page_path: path,
      page_location: window.location.href,
      page_title: title,
      send_page_view: true,
    });
  }
};
