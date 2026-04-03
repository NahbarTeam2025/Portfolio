import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Bot, MessageSquareCode, LayoutTemplate, Palette } from 'lucide-react';

export const SkillsSection = React.memo(({ handleNavigate }: any) => {
  const { t } = useLanguage();
  
  const highlights = [
    {
      icon: <Bot className="w-5 h-5 text-blue-400" />,
      title: "KI-Workflows",
      description: "Automatisierte Prozesse mit KI-Tools gebaut und produktiv eingesetzt."
    },
    {
      icon: <MessageSquareCode className="w-5 h-5 text-blue-400" />,
      title: "Prompt Engineering",
      description: "Komplexe Mehrstufen-Prompts entwickelt die echte Arbeit abnehmen."
    },
    {
      icon: <LayoutTemplate className="w-5 h-5 text-blue-400" />,
      title: "Web & Landingpages",
      description: "Websites und Apps mit KI von der Idee bis zur fertigen Umsetzung."
    },
    {
      icon: <Palette className="w-5 h-5 text-blue-400" />,
      title: "Design & Gestaltung",
      description: "Visuelle Konzepte mit Fokus auf Typografie, Layout und Wirkung."
    }
  ];

  const skillGroups = [
    {
      category: t.skills.categories.digital,
      skills: [
        { name: t.skills.items.contentCreation, tooltip: "Tools: ChatGPT, Claude, Canva" },
        { name: t.skills.items.seo, tooltip: "Tools: SEObility, Google Search Console" },
        { name: t.skills.items.webLandingpages, tooltip: "Tools: AI Studio, WordPress, Elementor" },
        { name: t.skills.items.design, tooltip: "Tools: Canva, GIMP, MS Office" },
        { name: "SEA", tooltip: "Tools: Google Ads" }
      ]
    },
    {
      category: t.skills.categories.tech,
      skills: [
        { name: t.skills.items.webAnalytics, tooltip: "Tools: Google Analytics 4, Google Tag Manager" },
        { name: t.skills.items.data, tooltip: "Tools: MS Excel, MS Access, Google Sheets" },
        { name: t.skills.items.promptEngineering, tooltip: "Tools: Claude, Gemini, AI Studio" },
        { name: t.skills.items.workflows, tooltip: "Tools: n8n, Make.com, Telegram Bot API" }
      ]
    },
    {
      category: t.skills.categories.working,
      skills: [
        { name: t.skills.items.structured },
        { name: t.skills.items.communication },
        { name: t.skills.items.problemSolving },
        { name: t.skills.items.timeManagement }
      ]
    },
    {
      category: t.skills.categories.languages,
      skills: [
        { name: `${t.skills.items.german} C2` },
        { name: `${t.skills.items.english} B1` }
      ]
    }
  ];

  return (
    <div className="flex flex-col items-start gap-1 md:gap-2 w-full flex-grow animate-in fade-in duration-500">
      <h1 className="heading-gradient fluid-h2 font-medium tracking-tight shrink-0">
        {t.skills.title}
      </h1>
      <p className="text-black/60 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium">
        Selbsteinschätzung nach Weiterbildung & eigenen Projekten.
      </p>
      <div className="w-full h-[1px] bg-black/10 shrink-0" />
      
      {/* HIGHLIGHT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 w-full max-w-[1400px] py-1 md:py-2 mx-auto">
        {highlights.map((item, idx) => (
          <div key={idx} className="bg-gray-900/95 backdrop-blur-xl rounded-2xl p-4 flex flex-col gap-2 border border-white/10 shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="p-2 bg-white/5 rounded-xl w-fit border border-white/10 shadow-inner">
              {item.icon}
            </div>
            <h3 className="text-white font-semibold text-[14px] tracking-tight mt-0.5">{item.title}</h3>
            <p className="text-white/70 text-[12px] leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      {/* CATEGORY BLOCKS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 lg:gap-x-6 gap-y-2 md:gap-y-3 w-full max-w-[1400px] mx-auto">
        {skillGroups.map((group) => (
          <div key={group.category} className="h-full">
            <div className="wow-card flex flex-col gap-3 p-4 md:p-4 h-full">
              <div className="wow-card-border" />
              <h2 className="text-gray-700 text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-bold opacity-90 relative z-10">
                {group.category}
              </h2>
              <div className="flex flex-wrap gap-1.5 relative z-10">
                {group.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="relative group/pill">
                    <span 
                      className="px-3 py-1 bg-black/5 border border-black/10 rounded-full text-black/80 text-[12px] md:text-[13px] font-medium hover:bg-black/10 hover:border-black/20 transition-colors cursor-help"
                    >
                      {skill.name}
                    </span>
                    {skill.tooltip && (
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 tooltip-content !text-white text-[11px] md:text-[12px] rounded-lg opacity-0 group-hover/pill:opacity-100 transition-all duration-300 pointer-events-none z-50 whitespace-nowrap shadow-xl translate-y-1 group-hover/pill:translate-y-0 border border-white/10">
                        <span className="tooltip-text !text-white">{skill.tooltip}</span>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-r border-b border-white/10"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="w-fit max-w-full mx-auto flex flex-col items-center justify-center pb-1 md:pb-2 pt-2 md:pt-3 gap-1 md:gap-1 mt-auto mb-7 md:mb-9 shrink-0">
        <p className="text-black/80 text-[12px] md:text-[13px] text-center whitespace-normal md:whitespace-nowrap">
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
          className="w-full flex items-center justify-center gap-2 rounded-full px-6 py-2.5 bg-blue-500/10 border border-blue-500/50 text-black text-[13px] md:text-[14px] font-medium tracking-wide shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:bg-blue-600/20 hover:border-blue-400 transition-all duration-300 cursor-pointer focus-ring"
        >
          <span className="relative z-10">{t.skills.cta.button}</span>
        </button>
      </div>
    </div>
  );
});
