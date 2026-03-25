import { useEffect } from 'react';

export function useParallaxIntersection(dependencies: any[] = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const elements = document.querySelectorAll('.parallax-element');
    elements.forEach((el) => {
      observer.observe(el);
    });

    const handleScroll = () => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const centerOffset = (rect.top + rect.height / 2) - (windowHeight / 2);
        const parallaxValue = centerOffset * 0.05;
        
        (el as HTMLElement).style.setProperty('--parallax-y', `${parallaxValue}px`);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    handleScroll();

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, dependencies);
}
