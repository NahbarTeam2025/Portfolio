import React from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const BentoCard: React.FC<{ project: any, index: number, onDetailsClick?: (project: any) => void }> = ({ project, index, onDetailsClick }) => {
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
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group parallax-element overflow-hidden flex flex-col h-full min-h-[380px] lg:min-h-[400px] transition-all duration-500 wow-card`}
    >
      <div className="card-top-flare opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="wow-card-border" />
      
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 transition duration-300 opacity-0 group-hover:opacity-100"
        style={{ background: spotlightBackground }}
      />
      
      <div className="relative z-10 p-6 md:p-8 flex flex-col h-full items-center text-center" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        <div className="flex flex-col gap-4 items-center w-full flex-grow">
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-lg md:text-xl font-bold text-white leading-tight tracking-tight group-hover:text-glow-blue transition-all duration-300">
              {project.title}
            </h3>
            <div className="w-10 h-[1px] bg-gray-400/40 group-hover:w-20 transition-all duration-500" />
          </div>
          
          <p className="text-white/70 text-[13px] md:text-[14px] leading-relaxed max-w-[280px]">
            {project.desc}
          </p>
          
          <div className="flex flex-wrap justify-center gap-1.5 pt-1">
            {project.features?.map((feature: string) => (
              <span key={feature} className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-[9px] font-medium uppercase tracking-wider">
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 w-full flex flex-col gap-2 items-center">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'project_live_click', {
                    'event_category': 'engagement',
                    'event_label': project.title
                  });
                }
              }}
              className="flex items-center justify-center gap-2 w-full max-w-[220px] py-3.5 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-100 font-bold text-[12px] uppercase tracking-widest hover:bg-blue-600/20 hover:border-blue-400 transition-all group/btn2 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                {index === 0 && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                )}
                {project.buttonText || t.projects.live}
              </span>
              <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover/btn2:translate-x-1" />
            </a>
          ) : project.details ? (
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'project_details_click', {
                    'event_category': 'engagement',
                    'event_label': project.title
                  });
                }
                onDetailsClick?.(project);
              }}
              className="flex items-center justify-center gap-2 w-full max-w-[220px] py-3.5 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-100 font-bold text-[12px] uppercase tracking-widest hover:bg-blue-600/20 hover:border-blue-400 transition-all group/btn2 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] cursor-pointer"
            >
              <span className="relative z-10">{project.buttonText || t.projects.details}</span>
              <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover/btn2:translate-x-1" />
            </button>
          ) : (
            <div
              className="flex items-center justify-center gap-2 w-full max-w-[220px] py-3.5 rounded-xl bg-white/5 border border-white/10 text-white/40 font-bold text-[12px] uppercase tracking-widest cursor-default"
            >
              <span className="relative z-10">{t.projects.comingSoon}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
