import React from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform } from 'motion/react';
import { ArrowRight, ZoomIn } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/analytics';
import { MagneticButton, IconShift } from './MagneticButton';

export const BentoCard: React.FC<{ project: any, index: number, onDetailsClick?: (project: any) => void, onImageClick?: (url: string) => void }> = ({ project, index, onDetailsClick, onImageClick }) => {
  const { t, language } = useLanguage();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 150, damping: 20 });

  const spotlightX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const spotlightY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = event.clientX - rect.left - width / 2;
    const mouseYFromCenter = event.clientY - rect.top - height / 2;

    mouseX.set(mouseXFromCenter / width);
    mouseY.set(mouseYFromCenter / height);

    spotlightX.set(event.clientX - rect.left);
    spotlightY.set(event.clientY - rect.top);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      600px circle at ${spotlightX}px ${spotlightY}px,
      rgba(59, 130, 246, 0.05),
      transparent 80%
    )
  `;

  // Bento grid classes based on index
  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group parallax-element overflow-hidden flex flex-col h-full min-h-[320px] md:min-h-[380px] lg:min-h-[400px] transition-all duration-500 wow-card shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] text-black dark:text-white`}
    >
      <div className="card-top-flare opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="wow-card-border pointer-events-none" />
      
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 transition duration-300 opacity-0 group-hover:opacity-100"
        style={{ background: spotlightBackground }}
      />
      
      <div className="relative z-10 p-5 md:p-8 flex flex-col h-full items-center text-center">
        <div className="flex flex-col gap-3 md:gap-4 items-center w-full flex-grow">
          <div className="flex flex-col gap-1.5 md:gap-2 items-center">
            <h3 className="text-base md:text-xl font-bold !text-black dark:!text-white leading-tight tracking-tight group-hover:text-glow-blue transition-all duration-300">
              {project.title}
            </h3>
            <div className="w-8 h-[1px] bg-gray-600/40 dark:bg-gray-400/40 group-hover:w-20 transition-all duration-500" />
          </div>
          
          <p className="!text-black/70 dark:!text-white/70 text-[12px] md:text-[14px] leading-relaxed max-w-[280px]">
            {project.desc}
          </p>
          
          <div className="flex flex-wrap justify-center gap-1 pt-0.5">
            {project.features?.map((feature: string) => (
              <span key={feature} className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 !text-black/70 dark:!text-white/70 text-[8px] font-medium uppercase tracking-wider">
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 md:mt-6 w-full flex flex-col gap-3 items-center">
          {project.image && (
            <div 
              className="w-fit rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-sm mb-2 cursor-zoom-in group/img relative z-[100] block p-0"
              style={{ pointerEvents: 'auto' }}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full max-w-[280px] h-auto object-cover transition-transform duration-500 pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors duration-300 pointer-events-none flex items-center justify-center">
                <div className="opacity-0 group-hover/img:opacity-100 transition-all duration-300 bg-white/40 backdrop-blur-md p-3 rounded-full shadow-lg border border-white/20">
                  <ZoomIn className="w-6 h-6 text-white drop-shadow-md" />
                </div>
              </div>
              {/* Invisible click overlay to ensure detection */}
              <div 
                className="absolute inset-0 z-[110] cursor-zoom-in" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onImageClick) {
                    onImageClick(project.image!);
                  }
                }}
              />
            </div>
          )}
          {project.link ? (
            <MagneticButton
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('click', 'project_live', 'projects', { project_title: project.title });
              }}
              className="w-full max-w-[220px] py-3.5 rounded-xl bg-green-500/15 border border-green-500/50 !text-green-600 font-bold text-[12px] uppercase tracking-widest hover:bg-green-500/25 hover:border-green-400 transition-all group/btn2 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2 mr-2">
                {index === 0 && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                )}
                {project.buttonText || t.projects.live}
              </span>
              <IconShift>
                {project.buttonText?.includes('PDF') ? (
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </IconShift>
            </MagneticButton>
          ) : project.details ? (
            <MagneticButton
              onClick={() => {
                trackEvent('click', 'project_details', 'projects', { project_title: project.title });
                onDetailsClick?.(project);
              }}
              className="w-full max-w-[220px] py-3.5 rounded-xl bg-green-500/15 border border-green-500/50 !text-green-600 font-bold text-[12px] uppercase tracking-widest hover:bg-green-500/25 hover:border-green-400 transition-all group/btn2 cursor-pointer"
            >
              <span className="relative z-10 mr-2">{project.buttonText || t.projects.details}</span>
              <IconShift>
                {project.buttonText?.includes('PDF') ? (
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </IconShift>
            </MagneticButton>
          ) : (
            <div
              className="flex items-center justify-center gap-2 w-full max-w-[220px] py-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 !text-black/60 dark:!text-white/60 font-bold text-[12px] uppercase tracking-widest cursor-default"
            >
              <span className="relative z-10">{t.projects.comingSoon}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
