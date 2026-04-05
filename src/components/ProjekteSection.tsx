import React, { useState, startTransition } from 'react';
import { BentoCard } from './BentoCard';
import { ProjectDetailsModal } from './ProjectDetailsModal';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { createPortal } from 'react-dom';
import { MagneticButton, IconShift } from './MagneticButton';

export const ProjekteSection = ({ setIsInitialEntrance, handleNavigate }: any) => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  
  const projects = t.projects.items;

  return (
    <div className="flex flex-col items-start gap-1.5 md:gap-3 w-full flex-grow animate-in fade-in duration-500 text-black ProjekteSection-container">
      <h1 className="heading-gradient fluid-h2 font-medium tracking-tight shrink-0">
        {t.projects.title}
      </h1>
      <div className="w-full h-[1px] bg-black/10 shrink-0 mb-1 md:mb-0" />
      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
        }}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5 md:gap-3 w-full max-w-[1400px] pb-0 md:pb-0.5"
      >
        {projects.map((project: any, i: number) => (
          <motion.div 
            key={i} 
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            className={`block h-full ${!showAllProjects && i > 0 ? 'hidden md:block' : ''} ${i === 1 ? 'lg:col-span-2' : 'lg:col-span-1'}`}
          >
            <BentoCard 
              project={project}
              index={i}
              onDetailsClick={(p: any) => startTransition(() => setSelectedProject(p))}
              onImageClick={(url: string) => {
                if (typeof (window as any).setFullscreenImage === 'function') {
                  (window as any).setFullscreenImage(url);
                }
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {!showAllProjects && projects.length > 1 && (
        <div className="w-full flex justify-center md:hidden mt-0.5 mb-6">
          <button
            onClick={() => setShowAllProjects(true)}
            className="px-6 py-1.5 rounded-full bg-black/5 border border-black/10 text-black/80 text-xs font-medium hover:bg-black/10 transition-colors"
          >
            {t.projects.showAll}
          </button>
        </div>
      )}

      {/* CTA Button */}
      <div className="w-fit max-w-full mx-auto flex flex-col items-center justify-center pb-1 md:pb-2 pt-0 md:pt-1 gap-1 md:gap-1 mt-auto mb-7 md:mb-11 shrink-0">
        <p className="text-black/80 text-[12px] md:text-[13px] text-center whitespace-normal md:whitespace-nowrap">
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
          className="w-full rounded-full px-8 py-3 bg-gradient-to-r from-blue-500/20 via-white to-blue-500/20 border border-blue-500/50 text-black text-[13px] md:text-[14px] font-medium tracking-wide shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:bg-gradient-to-r hover:from-blue-600/30 hover:via-white hover:to-blue-600/30 hover:border-blue-400 transition-all duration-300 flex items-center justify-center"
        >
          <span className="relative z-10 mr-2">{t.projects.cta.button}</span>
          <svg className="w-3 h-3 md:w-4 md:h-4 relative z-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal 
            key="project-details"
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
