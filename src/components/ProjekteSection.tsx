import React, { useState, startTransition } from 'react';
import { BentoCard } from './BentoCard';
import { ProjectDetailsModal } from './ProjectDetailsModal';
import { AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export const ProjekteSection = React.memo(({ setIsInitialEntrance, handleNavigate }: any) => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  
  const projects = t.projects.items;

  return (
    <div className="flex flex-col items-start gap-1.5 md:gap-3 w-full flex-grow animate-in fade-in duration-500 h-full">
      <h1 className="heading-gradient fluid-h2 font-medium tracking-tight shrink-0">
        {t.projects.title}
      </h1>
      <div className="w-full h-[1px] bg-white/10 shrink-0 mb-1 md:mb-0" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 w-full max-w-[1400px] pb-0 md:pb-1">
        {projects.map((project: any, i: number) => (
          <div key={i} className={`block h-full ${!showAllProjects && i > 0 ? 'hidden md:block' : ''} ${i === 1 ? 'lg:col-span-2' : 'lg:col-span-1'}`}>
            <BentoCard 
              project={project}
              index={i}
              onDetailsClick={(p) => startTransition(() => setSelectedProject(p))}
            />
          </div>
        ))}
      </div>

      {!showAllProjects && projects.length > 1 && (
        <div className="w-full flex justify-center md:hidden mt-0.5 mb-2">
          <button
            onClick={() => setShowAllProjects(true)}
            className="px-6 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-medium hover:bg-white/10 transition-colors"
          >
            {t.projects.showAll}
          </button>
        </div>
      )}

      {/* CTA Button */}
      <div className="w-fit max-w-full mx-auto flex flex-col items-center justify-center pb-1 md:pb-4 pt-0 md:pt-2 gap-1 md:gap-1.5 mt-auto mb-2 md:mb-12 shrink-0">
        <p className="text-white/80 text-[10px] md:text-xs text-center whitespace-normal md:whitespace-nowrap">
          {t.projects.cta.text}
        </p>
        <button 
          onClick={() => {
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'cta_contact_click', {
                'event_category': 'engagement',
                'event_label': 'Projects Section CTA'
              });
            }
            handleNavigate('contact');
          }}
          className="w-full flex items-center justify-center gap-2 rounded-full px-8 py-3 bg-black/20 border border-blue-500/50 text-white text-[13px] md:text-[14px] font-medium tracking-wide shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:bg-blue-600/20 hover:border-blue-400 transition-all duration-300 cursor-pointer focus-ring"
        >
          <span className="relative z-10">{t.projects.cta.button}</span>
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
