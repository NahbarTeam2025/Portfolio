import React, { useState, startTransition } from 'react';
import { BentoCard } from './BentoCard';
import { ProjectDetailsModal } from './ProjectDetailsModal';
import { AnimatePresence } from 'framer-motion';

export const ProjekteSection = React.memo(({ setIsInitialEntrance, handleNavigate }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  
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
    <div className="flex flex-col items-start gap-4 md:gap-6 w-full flex-grow animate-in fade-in duration-500">
      <h1 className="heading-gradient text-[24px] md:text-[32px] lg:text-[40px] font-medium leading-[1.28] tracking-tight shrink-0">
        Projekte
      </h1>
      <div className="w-full h-[1px] bg-white/10 shrink-0" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-[1400px] pb-0 md:pb-4">
        {projects.map((project, i) => (
          <div key={i} className={`block ${!showAllProjects && i > 0 ? 'hidden md:block' : ''}`}>
            <BentoCard 
              project={project}
              index={i}
              onDetailsClick={(p) => startTransition(() => setSelectedProject(p))}
            />
          </div>
        ))}
      </div>

      {!showAllProjects && projects.length > 1 && (
        <div className="w-full flex justify-center md:hidden mt-1 mb-1">
          <button
            onClick={() => setShowAllProjects(true)}
            className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Alle Projekte ansehen
          </button>
        </div>
      )}

      {/* CTA Button */}
      <div className="w-full flex flex-col items-center justify-center pb-32 md:pb-4 pt-0 md:pt-4 gap-3 mt-auto shrink-0">
        <p className="text-white/80 text-sm md:text-base text-center">
          Das waren ein paar Beispiele meiner Arbeit – gerne mehr dazu.
        </p>
        <button 
          onClick={() => handleNavigate('Kontakt')}
          className="w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3 bg-black/40 border border-blue-500/60 text-blue-50 text-[14px] md:text-[15px] font-semibold tracking-wide shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 cursor-pointer"
        >
          <span className="relative z-10">Lust auf ein Gespräch?</span>
          <span className="relative z-10">→</span>
        </button>
      </div>

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
