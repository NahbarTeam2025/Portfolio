import React, { startTransition } from 'react';
import { BentoCard } from './BentoCard';

export const ProjekteSection = React.memo(({ expandedProject, setExpandedProject, setIsInitialEntrance }: any) => {
  const projects = [
    {
      title: 'SEO- & KI-Landingpage',
      category: 'Digital Marketing & Web',
      desc: 'Konzeption und Umsetzung einer Landingpage für ein SEO-System mit integrierten KI-Workflows.',
      features: ['SEO-Optimierung', 'KI-Integration', 'Responsive Design', 'Lead-Generierung']
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
      <div className={`grid grid-cols-1 ${expandedProject === null ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4 md:gap-6 w-full max-w-[1400px] pb-12`}>
        {projects.map((project, i) => (
          <BentoCard 
            key={i}
            project={project}
            index={i}
            isExpanded={expandedProject === i}
            onToggle={() => {
              startTransition(() => {
                setExpandedProject(expandedProject === i ? null : i);
                setIsInitialEntrance(false);
              });
            }}
          />
        ))}
      </div>
    </div>
  );
});
