import React from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const BentoCard: React.FC<{ project: any, index: number }> = ({ project, index }) => {
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
      rgba(124, 58, 237, 0.05),
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
      className={`relative group wow-card overflow-hidden flex flex-col h-full transition-all duration-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] hover:border-brand-violet/20`}
    >
      <div className="wow-card-border" />
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 transition duration-300 opacity-0 group-hover:opacity-100"
        style={{ background: spotlightBackground }}
      />
      
      <div className="relative z-10 p-6 md:p-8 flex flex-col h-full justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-brand-teal text-[10px] font-bold uppercase tracking-widest opacity-80">Projekt {index + 1}</span>
              <h3 className="text-lg md:text-2xl font-semibold text-white leading-tight group-hover:text-brand-teal transition-colors">
                {project.title}
              </h3>
            </div>
          </div>
          
          <p className="text-white/70 text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed line-clamp-4 md:line-clamp-6 transition-all duration-500">
            {project.desc}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-auto pt-4">
            {project.features.map((feature: string) => (
              <span key={feature} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-[11px] font-medium">
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 shrink-0">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-brand-violet/10 to-brand-teal/10 border border-white/10 text-white font-medium text-[13px] hover:from-brand-violet/30 hover:to-brand-teal/30 transition-all group/btn2 shadow-[0_0_15px_rgba(124,58,237,0.1)] hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]"
            >
              Details ansehen
              <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover/btn2:translate-x-2" />
            </a>
          ) : (
            <div
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-brand-violet/10 to-brand-teal/10 border border-white/10 text-white font-medium text-[13px] transition-all group/btn2 cursor-default"
            >
              Details ansehen
              <ArrowRight className="w-4 h-4 transform transition-transform duration-300" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
