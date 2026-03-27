import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { TiltWrapper } from './TiltWrapper';

export const SkillsSection = React.memo(({ handleNavigate }: any) => {
  const { t, language } = useLanguage();
  const skillGroups = [
    {
      category: t.skills.categories.digital,
      skills: [
        { name: t.skills.items.contentCreation, value: 90, tooltip: t.skills.tooltips.contentCreation },
        { name: t.skills.items.seo, value: 85, tooltip: t.skills.tooltips.seo },
        { name: t.skills.items.webLandingpages, value: 85, tooltip: t.skills.tooltips.webLandingpages },
        { name: t.skills.items.design, value: 80, tooltip: t.skills.tooltips.design }
      ]
    },
    {
      category: t.skills.categories.tech,
      skills: [
        { name: t.skills.items.webAnalytics, value: 80, tooltip: t.skills.tooltips.webAnalytics },
        { name: t.skills.items.data, value: 85, tooltip: t.skills.tooltips.data },
        { name: t.skills.items.promptEngineering, value: 90, tooltip: t.skills.tooltips.promptEngineering },
        { name: t.skills.items.workflows, value: 85, tooltip: t.skills.tooltips.workflows }
      ]
    },
    {
      category: t.skills.categories.working,
      skills: [
        { name: t.skills.items.structured, value: 90, tooltip: t.skills.tooltips.structured },
        { name: t.skills.items.communication, value: 85, tooltip: t.skills.tooltips.communication },
        { name: t.skills.items.problemSolving, value: 85, tooltip: t.skills.tooltips.problemSolving },
        { name: t.skills.items.timeManagement, value: 85, tooltip: t.skills.tooltips.timeManagement }
      ]
    },
    {
      category: t.skills.categories.languages,
      skills: [
        { name: `${t.skills.items.german} C2`, value: 100 },
        { name: `${t.skills.items.english} B1`, value: 70 }
      ]
    }
  ];

  return (
    <div className="flex flex-col items-start gap-2 md:gap-4 w-full flex-grow animate-in fade-in duration-500">
      <h1 className="heading-gradient fluid-h2 font-medium tracking-tight shrink-0">
        {t.skills.title}
      </h1>
      <div className="w-full h-[1px] bg-white/10 shrink-0" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-3 md:gap-2 w-full max-w-[1400px] py-1 mx-auto">
        {skillGroups.map((group, groupIndex) => (
          <TiltWrapper key={group.category} className="h-full">
            <div className="wow-card parallax-element flex flex-col gap-3 p-6 md:p-5 h-full">
              <div className="wow-card-border" />
              <h2 className="text-gray-300 text-[10px] md:text-[12px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-bold opacity-90 relative z-10">{group.category}</h2>
              <div className="flex flex-col gap-1 relative z-10">
                {group.skills.map((skill, skillIndex) => {
                  const globalIndex = groupIndex * 4 + skillIndex;
                  return (
                    <div key={skill.name} className="flex flex-col gap-1 w-full group/skill relative">
                      {group.category !== t.skills.categories.languages && (
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/90 border border-white/10 rounded-xl text-white text-[12px] md:text-[13px] w-max max-w-[280px] md:max-w-[350px] whitespace-normal text-center opacity-0 group-hover/skill:opacity-100 transition-all duration-300 pointer-events-none z-50 backdrop-blur-xl shadow-2xl translate-y-2 group-hover/skill:translate-y-0">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse-subtle shrink-0" />
                            <span className="font-medium leading-snug">{skill.tooltip}</span>
                          </div>
                          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/90 border-r border-b border-white/10 rotate-45"></div>
                        </div>
                      )}
                      <div className="flex justify-between items-end w-full">
                        <span className="text-white font-medium text-[13px] md:text-[14px] lg:text-[15px] leading-none">{skill.name}</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-help">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-400 to-blue-300 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-gradient-shift animate-skill-fill" 
                          style={{ 
                            width: `${skill.value}%`,
                            animationDelay: `${globalIndex * 200}ms`,
                            animationFillMode: 'both'
                          }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TiltWrapper>
        ))}
      </div>

      {/* CTA Button */}
      <div className="w-fit max-w-full mx-auto flex flex-col items-center justify-center pb-4 md:pb-4 pt-1 md:pt-2 gap-1 md:gap-1.5 mt-auto mb-8 md:mb-12 shrink-0">
        <p className="text-white/80 text-xs md:text-sm text-center whitespace-normal md:whitespace-nowrap">
          {t.skills.cta.text}
        </p>
        <button 
          onClick={() => handleNavigate('contact')}
          className="w-full flex items-center justify-center gap-2 rounded-xl px-6 py-2 bg-black/40 border border-blue-500/60 text-blue-50 text-[13px] md:text-[14px] font-semibold tracking-wide shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 cursor-pointer focus-ring"
        >
          <span className="relative z-10">{t.skills.cta.button}</span>
        </button>
      </div>
    </div>
  );
});
