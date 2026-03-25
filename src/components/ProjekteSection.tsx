import React, { useState, startTransition } from 'react';
import { BentoCard } from './BentoCard';
import { ProjectDetailsModal } from './ProjectDetailsModal';
import { AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { TiltWrapper } from './TiltWrapper';

export const ProjekteSection = React.memo(({ setIsInitialEntrance, handleNavigate }: any) => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  
  const projects = t.projects.items;

  return (
    <div className="flex flex-col items-start gap-4 md:gap-6 w-full flex-grow animate-in fade-in duration-500">
      <h1 className="heading-gradient fluid-h2 font-medium tracking-tight shrink-0">
        {t.projects.title}
      </h1>
      <div className="w-full h-[1px] bg-white/10 shrink-0" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-[1400px] pb-0 md:pb-4">
        {projects.map((project: any, i: number) => (
          <div key={i} className={`block ${!showAllProjects && i > 0 ? 'hidden md:block' : ''}`}>
            <TiltWrapper className="h-full">
              <BentoCard 
                project={project}
                index={i}
                onDetailsClick={(p) => startTransition(() => setSelectedProject(p))}
              />
            </TiltWrapper>
          </div>
        ))}
      </div>

      {!showAllProjects && projects.length > 1 && (
        <div className="w-full flex justify-center md:hidden mt-1 mb-1">
          <button
            onClick={() => setShowAllProjects(true)}
            className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            {t.projects.showAll}
          </button>
        </div>
      )}

      {/* CTA Button */}
      <div className="w-full flex flex-col items-center justify-center pb-32 md:pb-4 pt-0 md:pt-4 gap-3 mt-auto shrink-0">
        <p className="text-white/80 text-sm md:text-base text-center">
          {t.projects.cta.text}
        </p>
        <button 
          onClick={() => handleNavigate(t.nav.contact)}
          className="w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3 bg-black/40 border border-blue-500/60 text-blue-50 text-[14px] md:text-[15px] font-semibold tracking-wide shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 cursor-pointer focus-ring"
        >
          <span className="relative z-10">{t.projects.cta.button}</span>
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
