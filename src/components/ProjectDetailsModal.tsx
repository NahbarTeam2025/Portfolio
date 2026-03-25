import React, { startTransition } from 'react';
import { X, Calendar, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface ProjectDetails {
  subtitle: string;
  meta: string;
  images?: string[];
  sections: {
    title: string;
    content: string;
  }[];
}

interface Project {
  title: string;
  category: string;
  desc: string;
  features: string[];
  details?: ProjectDetails;
}

export const ProjectDetailsModal = ({ 
  project, 
  onClose 
}: { 
  project: Project; 
  onClose: () => void 
}) => {
  const { language } = useLanguage();
  if (!project.details) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
        onClick={() => startTransition(() => onClose())} 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="relative shrink-0 p-6 md:p-8 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                <Tag size={12} />
                <span>{project.category}</span>
              </div>
              <h2 id="modal-title" className="text-2xl md:text-3xl font-bold text-white leading-tight">
                {project.title}
              </h2>
              <div className="text-white/60 text-sm md:text-base font-medium">
                {project.details.subtitle}
              </div>
              <div className="flex items-center gap-2 text-white/40 text-[11px] md:text-xs mt-1">
                <Calendar size={12} />
                <span>{project.details.meta}</span>
              </div>
            </div>
            <button 
              onClick={() => startTransition(() => onClose())}
              className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
              aria-label={language === 'de' ? 'Schließen' : 'Close'}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto glass-scrollbar custom-content-scroll">
          <div className="space-y-8 md:space-y-10">
            {project.details.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em] opacity-80">
                  {section.title}
                </h3>
                <div className="text-white/80 text-[14px] md:text-[16px] leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}

            {project.details.images && project.details.images.length > 0 && (
              <div className="space-y-6 pt-4">
                <h3 className="text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em] opacity-80">
                  {language === 'de' ? 'Visualisierungen' : 'Visualizations'}
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {project.details.images.map((img, idx) => (
                    <div key={idx} className="relative group rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                      <img 
                        src={img} 
                        alt={language === 'de' ? `Projekt Visualisierung ${idx + 1}` : `Project Visualization ${idx + 1}`} 
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tags Footer */}
          <div className="mt-12 pt-8 border-t border-white/5">
            <div className="flex flex-wrap gap-2">
              {project.features.map((feature) => (
                <span key={feature} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] md:text-[11px] font-medium">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
