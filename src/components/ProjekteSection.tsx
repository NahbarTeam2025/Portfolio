import React, { useState, startTransition } from 'react';
import { BentoCard } from './BentoCard';
import { ProjectDetailsModal } from './ProjectDetailsModal';
import { AnimatePresence } from 'framer-motion';

export const ProjekteSection = React.memo(({ setIsInitialEntrance }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  const projects = [
    {
      title: 'SEO- & KI-Landingpage',
      category: 'Digital Marketing & Web',
      desc: 'Konzeption und Umsetzung einer Landingpage für ein SEO-System mit integrierten KI-Workflows.',
      features: ['SEO-Optimierung', 'KI-Integration', 'Responsive Design', 'Lead-Generierung'],
      link: 'https://visibilitylab.roberterbach.de',
      buttonText: 'Live ansehen'
    },
    {
      title: 'GA4-Tracking-Implementierung',
      category: 'Web Analytics',
      desc: 'Konzeption eines vollständigen GA4-Tracking-Plans für einen fiktiven Outdoor-Onlineshop – von der Event-Strategie bis zum fertigen Implementierungsdokument.',
      features: ['Web Analytics', 'GA4', 'E-Commerce', 'Tracking', 'Measurement Plan'],
      buttonText: 'Details ansehen',
      details: {
        subtitle: 'Nuraghi Outdoor Experience',
        meta: 'Kursarbeit | Web Analytics | März 2026',
        images: [
          'https://meine-assets.pages.dev/projekt2excel.png',
          'https://meine-assets.pages.dev/projekt2trackingevents.png'
        ],
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
  ];

  return (
    <div className="flex flex-col items-start gap-4 md:gap-8 w-full animate-in fade-in duration-500">
      <h1 className="heading-gradient text-[28px] md:text-[40px] lg:text-[56px] font-medium leading-[1.28] tracking-tight shrink-0">
        Projekte
      </h1>
      <div className="w-full h-[1px] bg-white/10 shrink-0" />
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-[1400px] pb-6`}>
        {projects.map((project, i) => (
          <div key={i} className={`${!isExpanded && i > 0 ? 'hidden md:block' : 'block'}`}>
            <BentoCard 
              project={project}
              index={i}
              onDetailsClick={(p) => startTransition(() => setSelectedProject(p))}
            />
          </div>
        ))}
      </div>
      {projects.length > 1 && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden text-white/60 hover:text-brand-teal transition-colors text-sm font-medium"
        >
          {isExpanded ? 'Weniger anzeigen' : 'Alle Projekte anzeigen'}
        </button>
      )}

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal 
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
});
