import React from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const BentoCard: React.FC<{ project: any, index: number, onDetailsClick?: (project: any) => void }> = ({ project, index, onDetailsClick }) => {
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
      className={`relative group wow-card overflow-hidden flex flex-col h-full transition-all duration-500 border border-white/10 bg-black/40 card-glow-blue rounded-[24px]`}
    >
      <div className="wow-card-border" />
      <div className="card-top-flare opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 transition duration-300 opacity-0 group-hover:opacity-100"
        style={{ background: spotlightBackground }}
      />
      
      <div className="relative z-10 p-8 md:p-10 flex flex-col h-full items-center text-center">
        <div className="flex flex-col gap-6 items-center w-full flex-grow">
          {/* Top Badge */}
          <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-[10px] font-bold uppercase tracking-[0.2em]">
            Projekt {index + 1}
          </div>

          <div className="flex flex-col gap-3 items-center">
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight tracking-tight group-hover:text-glow-blue transition-all duration-300">
              {project.title}
            </h3>
            <div className="w-12 h-[1px] bg-blue-500/40 group-hover:w-24 transition-all duration-500" />
          </div>
          
          <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed max-w-[280px]">
            {project.desc}
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {project.features.map((feature: string) => (
              <span key={feature} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-[10px] font-medium uppercase tracking-wider">
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 w-full flex flex-col gap-3">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-100 font-bold text-[12px] uppercase tracking-widest hover:bg-blue-600/20 hover:border-blue-400 transition-all group/btn2 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
            >
              <span className="relative z-10">{project.buttonText || 'Live Demo'}</span>
              <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover/btn2:translate-x-1" />
            </a>
          ) : project.details ? (
            <button
              onClick={() => onDetailsClick?.(project)}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-100 font-bold text-[12px] uppercase tracking-widest hover:bg-blue-600/20 hover:border-blue-400 transition-all group/btn2 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] cursor-pointer"
            >
              <span className="relative z-10">{project.buttonText || 'Details'}</span>
              <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover/btn2:translate-x-1" />
            </button>
          ) : (
            <div
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-white/5 border border-white/10 text-white/40 font-bold text-[12px] uppercase tracking-widest cursor-default"
            >
              <span className="relative z-10">Coming Soon</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
