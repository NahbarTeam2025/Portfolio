import React from 'react';

export const SkillsSection = React.memo(({ handleNavigate }: any) => {
  const skillGroups = [
    {
      category: 'DIGITALE KOMPETENZEN',
      skills: [
        { name: 'Content Creation', value: 90, tooltip: 'Canva, Adobe Creative Cloud' },
        { name: 'SEO', value: 85, tooltip: 'Seobility, Google Search Console' },
        { name: 'Web & Landingpages', value: 85, tooltip: 'WordPress (Elementor)' },
        { name: 'Design & Gestaltung', value: 80, tooltip: 'Figma, Adobe Illustrator' }
      ]
    },
    {
      category: 'TECHNOLOGIE & KI',
      skills: [
        { name: 'Web Analytics', value: 80, tooltip: 'Google Analytics 4' },
        { name: 'Daten & Tools', value: 85, tooltip: 'Looker Studio, Microsoft Excel' },
        { name: 'Prompt Engineering', value: 90, tooltip: 'Gemini (Google), Claude (Anthropic)' },
        { name: 'KI-Workflows', value: 85, tooltip: 'N8N, Make.com' }
      ]
    },
    {
      category: 'ARBEITSWEISE & STÄRKEN',
      skills: [
        { name: 'Strukturierte Arbeitsweise', value: 90, tooltip: 'Notion, Trello' },
        { name: 'Kommunikationsstärke', value: 85, tooltip: 'Slack, Microsoft Teams' },
        { name: 'Problemlösung', value: 85, tooltip: 'Miro (Mindmapping), GitHub (für technisches Troubleshooting)' },
        { name: 'Zeitmanagement', value: 85, tooltip: 'Google Calendar' }
      ]
    },
    {
      category: 'Sprachen',
      skills: [
        { name: 'Deutsch', value: 100, tooltip: 'Muttersprache' },
        { name: 'Englisch', value: 70, tooltip: 'Fließend in Wort und Schrift' }
      ]
    }
  ];

  return (
    <div className="flex flex-col items-start gap-4 md:gap-6 w-full flex-grow animate-in fade-in duration-500">
      <h1 className="heading-gradient text-[24px] md:text-[32px] lg:text-[40px] font-medium leading-[1.1] tracking-tight shrink-0">
        Skills & Kompetenzen
      </h1>
      <div className="w-full h-[1px] bg-white/10 shrink-0" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-3 md:gap-y-4 w-full max-w-[1400px] py-2 mx-auto">
        {skillGroups.map((group, groupIndex) => (
          <div key={group.category} className="wow-card flex flex-col gap-1.5 p-3">
            <div className="wow-card-border" />
            <h2 className="text-brand-teal text-[10px] md:text-[12px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-bold opacity-90 relative z-10">{group.category}</h2>
            <div className="flex flex-col gap-1.5 relative z-10">
              {group.skills.map((skill, skillIndex) => {
                const globalIndex = groupIndex * 4 + skillIndex;
                return (
                  <div key={skill.name} className="flex flex-col gap-1 w-full group/skill relative">
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/90 border border-white/10 rounded-xl text-white text-[12px] md:text-[13px] w-max max-w-[280px] md:max-w-[350px] whitespace-normal text-center opacity-0 group-hover/skill:opacity-100 transition-all duration-300 pointer-events-none z-50 backdrop-blur-xl shadow-2xl translate-y-2 group-hover/skill:translate-y-0">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse shrink-0" />
                        <span className="font-medium leading-snug">{skill.tooltip}</span>
                      </div>
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/90 border-r border-b border-white/10 rotate-45"></div>
                    </div>
                    <div className="flex justify-between items-end w-full">
                      <span className="text-white font-medium text-[13px] md:text-[14px] lg:text-[15px] leading-none">{skill.name}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-help">
                      <div 
                        className="h-full bg-gradient-to-r from-violet-400 to-teal-400 rounded-full shadow-[0_0_20px_rgba(5,184,194,0.6)] animate-gradient-shift animate-skill-fill" 
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
        ))}
      </div>

      {/* CTA Button */}
      <div className="w-full flex flex-col items-center justify-center pb-32 md:pb-4 pt-4 gap-3 mt-auto shrink-0">
        <p className="text-white/80 text-sm md:text-base text-center">
          Passt das zu deinem nächsten Projekt?
        </p>
        <button 
          onClick={() => handleNavigate('Kontakt')}
          className="w-full flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-black/40 border border-purple-500/60 text-purple-50 text-[14px] md:text-[15px] font-semibold tracking-wide shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300 cursor-pointer"
        >
          <span className="relative z-10">Lass uns reden</span>
          <span className="relative z-10">→</span>
        </button>
      </div>
    </div>
  );
});
