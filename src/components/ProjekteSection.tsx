import React, { useState, startTransition } from 'react';
import { BentoCard } from './BentoCard';

export const ProjekteSection = React.memo(({ setIsInitialEntrance }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const projects = [
    {
      title: 'SEO- & KI-Landingpage',
      category: 'Digital Marketing & Web',
      desc: 'Konzeption und Umsetzung einer Landingpage für ein SEO-System mit integrierten KI-Workflows.',
      features: ['SEO-Optimierung', 'KI-Integration', 'Responsive Design', 'Lead-Generierung'],
      link: 'https://visibilitylab.roberterbach.de'
    },
    {
      title: 'Content-Automatisierung',
      category: 'KI-Workflows',
      desc: 'Entwicklung eines Workflows zur automatisierten Erstellung von Social Media Content mittels KI.',
      features: ['Prompt Engineering', 'Automatisierung', 'Content Strategie', 'Multi-Channel']
    },
    {
      title: 'Marketing Dashboard',
      category: 'Analytics & Data',
      desc: 'Entwicklung von Dashboards zur Echtzeit-Überwachung von Marketing-KPIs.',
      features: ['Data Studio', 'API Integration', 'Custom Dashboards', 'Automatisierung']
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
    </div>
  );
});
