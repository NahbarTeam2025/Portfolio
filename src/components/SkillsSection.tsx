import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

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
      <p className="text-black/60 text-[10px] md:text-[12px] uppercase tracking-[0.2em] font-medium">
        Selbsteinschätzung nach Weiterbildung & eigenen Projekten.
      </p>
      <div className="w-full h-[1px] bg-black/10 shrink-0" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 lg:gap-x-6 gap-y-2 md:gap-1.5 w-full max-w-[1400px] py-0.5 mx-auto">
        {skillGroups.map((group, groupIndex) => (
          <div key={group.category} className="h-full">
            <div className="wow-card flex flex-col gap-3 p-6 md:p-5 h-full">
              <div className="wow-card-border" />
              <h2 className="text-gray-700 text-[10px] md:text-[12px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-bold opacity-90 relative z-10">{group.category}</h2>
              <div className="flex flex-col gap-1 relative z-10">
                {group.skills.map((skill, skillIndex) => {
                  const globalIndex = groupIndex * 4 + skillIndex;
                  return (
                    <div key={skill.name} className="flex flex-col gap-1 w-full group/skill relative">
                      {group.category !== t.skills.categories.languages && (
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 border border-black/10 rounded-xl text-black text-[12px] md:text-[13px] w-max max-w-[280px] md:max-w-[350px] whitespace-normal text-center opacity-0 group-hover/skill:opacity-100 transition-all duration-300 pointer-events-none z-50 backdrop-blur-xl shadow-2xl translate-y-2 group-hover/skill:translate-y-0">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-gray-700 animate-pulse-subtle shrink-0" />
                            <span className="font-medium leading-snug">{skill.tooltip}</span>
                          </div>
                          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/90 border-r border-b border-black/10 rotate-45"></div>
                        </div>
                      )}
                      <div className="flex justify-between items-end w-full">
                        <span className="text-black font-medium text-[13px] md:text-[14px] lg:text-[15px] leading-none">{skill.name}</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden cursor-help">
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
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="w-fit max-w-full mx-auto flex flex-col items-center justify-center pb-2 md:pb-2 pt-0.5 md:pt-1 gap-1 md:gap-1 mt-auto mb-4 md:mb-6 shrink-0">
        <p className="text-black/80 text-xs md:text-sm text-center whitespace-normal md:whitespace-nowrap">
          {t.skills.cta.text}
        </p>
        <button 
          onClick={() => {
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'cta_contact_click', {
                'event_category': 'engagement',
                'event_label': 'Skills Section CTA'
              });
            }
            handleNavigate('contact');
          }}
          className="w-full flex items-center justify-center gap-2 rounded-full px-8 py-3 bg-blue-500/10 border border-blue-500/50 text-black text-[13px] md:text-[14px] font-medium tracking-wide shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:bg-blue-600/20 hover:border-blue-400 transition-all duration-300 cursor-pointer focus-ring"
        >
          <span className="relative z-10">{t.skills.cta.button}</span>
        </button>
      </div>
    </div>
  );
});
