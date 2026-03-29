import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Gauge, Image as ImageIcon, FileCode2, Zap, Globe, CheckCircle2, Info } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Optimization {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  scoreBoost: number;
  lcpReduction: number; // in seconds
  fcpReduction: number; // in seconds
}

const OPTIMIZATIONS: Optimization[] = [
  {
    id: 'webp',
    title: 'Bilder optimieren (WebP)',
    desc: 'Konvertiert große Bilder in moderne, kleinere Formate.',
    icon: ImageIcon,
    scoreBoost: 20,
    lcpReduction: 1.2,
    fcpReduction: 0.2,
  },
  {
    id: 'minify',
    title: 'CSS/JS Minifizierung',
    desc: 'Entfernt unnötige Zeichen aus dem Code für schnellere Downloads.',
    icon: FileCode2,
    scoreBoost: 15,
    lcpReduction: 0.4,
    fcpReduction: 0.8,
  },
  {
    id: 'lazyload',
    title: 'Lazy Loading',
    desc: 'Lädt Bilder erst, wenn sie im sichtbaren Bereich sind.',
    icon: Zap,
    scoreBoost: 10,
    lcpReduction: 0.6,
    fcpReduction: 0.1,
  },
  {
    id: 'cdn',
    title: 'Content Delivery Network (CDN)',
    desc: 'Verteilt Inhalte weltweit für kürzere Server-Antwortzeiten.',
    icon: Globe,
    scoreBoost: 15,
    lcpReduction: 0.8,
    fcpReduction: 0.5,
  },
];

const ScoreGauge = ({ score }: { score: number }) => {
  const color = score >= 90 ? 'text-green-500' : score >= 50 ? 'text-yellow-500' : 'text-red-500';
  const strokeColor = score >= 90 ? '#22c55e' : score >= 50 ? '#eab308' : '#ef4444';

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-white/10" />
        <motion.circle
          cx="50" cy="50" r="40" fill="none" stroke={strokeColor} strokeWidth="8"
          strokeDasharray="251.2"
          initial={{ strokeDashoffset: 251.2 }}
          animate={{ strokeDashoffset: 251.2 - (251.2 * score) / 100 }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className={`absolute text-4xl font-bold ${color}`}>{score}</div>
    </div>
  );
};

export const LighthouseSim: React.FC = () => {
  const { t } = useLanguage();
  const [activeOpts, setActiveOpts] = useState<Set<string>>(new Set());

  // Base metrics (unoptimized)
  const baseScore = 40;
  const baseLcp = 4.5;
  const baseFcp = 2.8;

  // Calculate current metrics
  const currentScore = Math.min(100, baseScore + Array.from(activeOpts).reduce((sum, id) => {
    const opt = OPTIMIZATIONS.find(o => o.id === id);
    return sum + (opt?.scoreBoost || 0);
  }, 0));

  const currentLcp = Math.max(0.8, baseLcp - Array.from(activeOpts).reduce((sum, id) => {
    const opt = OPTIMIZATIONS.find(o => o.id === id);
    return sum + (opt?.lcpReduction || 0);
  }, 0));

  const currentFcp = Math.max(0.4, baseFcp - Array.from(activeOpts).reduce((sum, id) => {
    const opt = OPTIMIZATIONS.find(o => o.id === id);
    return sum + (opt?.fcpReduction || 0);
  }, 0));

  const toggleOpt = (id: string) => {
    const next = new Set(activeOpts);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setActiveOpts(next);

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'lighthouse_optimization_toggled', {
        event_category: 'tool_interaction',
        event_label: id,
        active: next.has(id)
      });
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden p-4 bg-white/5 rounded-2xl border border-white/10">
      <div className="mb-4 shrink-0 flex items-center gap-3">
        <div className="p-2 bg-blue-500/20 rounded-xl">
          <Gauge className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Performance Optimizer</h2>
          <p className="text-xs text-white/60">Aktiviere Optimierungen, um den PageSpeed Score zu verbessern.</p>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto custom-scrollbar pr-2">
        {/* Optimizations List */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Verfügbare Optimierungen</h3>
          {OPTIMIZATIONS.map((opt) => {
            const isActive = activeOpts.has(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => toggleOpt(opt.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                  isActive 
                    ? 'bg-blue-500/10 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-3 relative z-10">
                  <div className={`p-2 rounded-lg mt-0.5 transition-colors ${isActive ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-white/60'}`}>
                    <opt.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm font-bold transition-colors ${isActive ? 'text-blue-400' : 'text-white'}`}>{opt.title}</h4>
                      {isActive && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                    </div>
                    <p className="text-[11px] text-white/60 leading-relaxed">{opt.desc}</p>
                    
                    <div className="mt-2 flex gap-2">
                      <span className="text-[9px] font-mono text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded">+{opt.scoreBoost} Score</span>
                      <span className="text-[9px] font-mono text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded">-{opt.lcpReduction}s LCP</span>
                    </div>
                  </div>
                </div>
                {isActive && (
                  <motion.div
                    layoutId={`active-opt-${opt.id}`}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Live Results Dashboard */}
        <div className="flex flex-col items-center justify-center bg-black/40 rounded-2xl p-6 border border-white/5 relative overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

          <div className="relative z-10 w-full flex flex-col items-center gap-8">
            <div className="text-center space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/60">Live PageSpeed Score</h3>
              <ScoreGauge score={currentScore} />
            </div>

            <div className="w-full grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center text-center">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">LCP (Largest Contentful Paint)</p>
                <motion.p 
                  key={currentLcp}
                  initial={{ scale: 1.2, color: '#60a5fa' }}
                  animate={{ scale: 1, color: '#ffffff' }}
                  className="text-2xl font-bold font-mono"
                >
                  {currentLcp.toFixed(1)}s
                </motion.p>
                <p className="text-[9px] text-white/40 mt-1">Ladezeit des Hauptinhalts</p>
              </div>
              
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center text-center">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">FCP (First Contentful Paint)</p>
                <motion.p 
                  key={currentFcp}
                  initial={{ scale: 1.2, color: '#60a5fa' }}
                  animate={{ scale: 1, color: '#ffffff' }}
                  className="text-2xl font-bold font-mono"
                >
                  {currentFcp.toFixed(1)}s
                </motion.p>
                <p className="text-[9px] text-white/40 mt-1">Erste sichtbare Elemente</p>
              </div>
            </div>

            <div className="w-full p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-3">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-blue-200/80 leading-relaxed">
                {currentScore >= 90 
                  ? "Hervorragend! Deine Website ist optimal konfiguriert und lädt blitzschnell." 
                  : currentScore >= 50 
                    ? "Gut, aber es gibt noch Verbesserungspotenzial. Aktiviere weitere Optimierungen." 
                    : "Kritisch! Die Ladezeiten sind zu lang. Besucher könnten abspringen."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
