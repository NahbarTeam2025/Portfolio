import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Accessibility, TrendingUp, Fingerprint, Calculator, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { PasswordGuardian } from '../components/tools/PasswordGuardian';
import { AccessibilityHealer } from '../components/tools/AccessibilityHealer';
import { FunnelTycoon } from '../components/tools/FunnelTycoon';
import { FingerprintDetector } from '../components/tools/FingerprintDetector';
import { ROISimulator } from '../components/tools/ROISimulator';
import { LighthouseSim } from '../components/tools/LighthouseSim';

type ToolTab = 'security' | 'accessibility' | 'marketing' | 'privacy' | 'roi' | 'performance';

export const ToolsPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<ToolTab>('security');

  const tabs = [
    { id: 'security' as ToolTab, label: t.tools.tabs.security, icon: Shield },
    { id: 'privacy' as ToolTab, label: t.tools.tabs.privacy, icon: Fingerprint },
    { id: 'performance' as ToolTab, label: t.tools.tabs.performance, icon: Zap },
    { id: 'accessibility' as ToolTab, label: t.tools.tabs.accessibility, icon: Accessibility },
    { id: 'marketing' as ToolTab, label: t.tools.tabs.marketing, icon: TrendingUp },
    { id: 'roi' as ToolTab, label: t.tools.tabs.roi, icon: Calculator },
  ];

  return (
    <div className="flex flex-col w-full h-full overflow-hidden pb-2">
      {/* Header - Very Compact */}
      <div className="flex flex-col gap-0 mb-2 md:mb-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-4 h-[1px] bg-blue-500/50" />
          <span className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-blue-400 font-mono">
            {t.tools.subtitle}
          </span>
        </div>
        <h1 className="heading-gradient fluid-h2 font-medium leading-tight tracking-tight">
          {t.tools.title}
        </h1>
      </div>

      {/* Tab Navigation - Ultra Compact for Mobile */}
      <div className="w-full pb-1.5 mb-2 md:mb-3 shrink-0">
        {/* Mobile Dropdown */}
        <div className="md:hidden">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as ToolTab)}
            className="w-full p-2 bg-white/80 border border-blue-500/50 rounded-lg text-[10px] uppercase tracking-widest text-black focus:outline-none focus:border-blue-500/50"
          >
            {tabs.map((tab) => (
              <option 
                key={tab.id} 
                value={tab.id} 
                className={`bg-white ${activeTab === tab.id ? 'text-blue-400 font-bold' : 'text-black'}`}
              >
                {tab.label}
              </option>
            ))}
          </select>
        </div>
        {/* Desktop Tab Bar */}
        <div className="hidden md:flex items-center gap-1 p-0.5 bg-black/5 border border-black/10 rounded-lg self-start backdrop-blur-md min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-1 px-3 py-1 rounded-md text-[9px] font-bold tracking-widest uppercase transition-all duration-300 focus-ring whitespace-nowrap ${
                activeTab === tab.id ? 'text-black' : 'text-black/40 hover:text-black/70'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tool-tab"
                  className="absolute inset-0 bg-blue-500/20 border border-blue-500/30 rounded-md shadow-[0_0_10px_rgba(59,130,246,0.1)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <tab.icon className={`w-3 h-3 relative z-10 ${activeTab === tab.id ? 'text-blue-400' : 'text-black/40'}`} />
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tool Content - Scrollable if needed but flex-1 to fill space */}
      <div className="flex-1 relative w-full overflow-hidden min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="w-full h-full overflow-y-auto lg:overflow-hidden glass-scrollbar"
          >
            <div className="h-full w-full">
              {activeTab === 'security' && <PasswordGuardian />}
              {activeTab === 'accessibility' && <AccessibilityHealer />}
              {activeTab === 'marketing' && <FunnelTycoon />}
              {activeTab === 'privacy' && <FingerprintDetector />}
              {activeTab === 'roi' && <ROISimulator />}
              {activeTab === 'performance' && <LighthouseSim />}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
