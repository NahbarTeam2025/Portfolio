import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Wifi, Clock, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface NetworkProfile {
  id: string;
  name: string;
  delay: number;
  icon: React.ElementType;
}

const NETWORK_PROFILES: NetworkProfile[] = [
  { id: '4g', name: '4G (Fast)', delay: 500, icon: Wifi },
  { id: '3g', name: '3G (Slow)', delay: 2500, icon: Wifi },
  { id: 'edge', name: 'Edge (Very Slow)', delay: 6000, icon: Wifi },
];

export const LighthouseSim: React.FC = () => {
  const { t } = useLanguage();
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORK_PROFILES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [lcpTime, setLcpTime] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [optimization, setOptimization] = useState(false);

  const startSimulation = () => {
    setIsLoading(true);
    setShowContent(false);
    setLcpTime(0);

    const startTime = Date.now();
    const delay = optimization ? selectedNetwork.delay * 0.4 : selectedNetwork.delay;

    setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
      setLcpTime(Date.now() - startTime);

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'lighthouse_simulated', {
          event_category: 'tool_interaction',
          event_label: 'Lighthouse Sim',
          network: selectedNetwork.id,
          optimization_active: optimization,
          lcp_time: Date.now() - startTime
        });
      }
    }, delay);
  };

  const getLcpStatus = (time: number) => {
    if (time < 2500) return { color: 'text-green-400', label: 'Good', icon: CheckCircle2 };
    if (time < 4000) return { color: 'text-yellow-400', label: 'Needs Improvement', icon: Info };
    return { color: 'text-red-400', label: 'Poor', icon: AlertTriangle };
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="mb-2 shrink-0">
        <h2 className="text-lg font-bold text-white mb-0.5">{t.tools.lighthouseSim.title}</h2>
        <p className="text-[10px] text-white/60">{t.tools.lighthouseSim.desc}</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar">
        {/* Simulation Controls */}
        <div className="space-y-4 bg-white/5 border border-white/10 p-4 rounded-2xl shrink-0">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/40 block">{t.tools.lighthouseSim.network}</label>
            <div className="grid grid-cols-3 gap-1.5">
              {NETWORK_PROFILES.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => setSelectedNetwork(profile)}
                  className={`p-2 rounded-lg border transition-all flex flex-col items-center gap-1 ${
                    selectedNetwork.id === profile.id
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                  }`}
                >
                  <profile.icon className="w-4 h-4" />
                  <span className="text-[8px] font-bold uppercase tracking-wider">{profile.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/60 block">Optimierungen</label>
            <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center gap-2">
                <Zap className={`w-4 h-4 ${optimization ? 'text-yellow-400' : 'text-white/20'}`} />
                <div>
                  <p className="text-xs font-medium text-white">WebP & Caching</p>
                  <p className="text-[9px] text-white/60">~60% schneller</p>
                </div>
              </div>
              <button
                onClick={() => setOptimization(!optimization)}
                className={`w-10 h-5 rounded-full relative transition-colors ${optimization ? 'bg-blue-500' : 'bg-white/10'}`}
              >
                <motion.div
                  animate={{ x: optimization ? 22 : 2 }}
                  className="absolute top-0.5 left-0 w-4 h-4 bg-white rounded-full shadow-lg"
                />
              </button>
            </div>
          </div>

          <button
            onClick={startSimulation}
            disabled={isLoading}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <Zap className="w-4 h-4" />
            )}
            Simulation starten
          </button>
        </div>

        {/* Simulation Viewport */}
        <div className="bg-black/40 border border-white/10 rounded-2xl flex flex-col overflow-hidden">
          <div className="bg-white/5 border-b border-white/10 p-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            <div className="flex-1 bg-white/5 rounded-md h-5 flex items-center px-2">
              <span className="text-[10px] text-white/20 font-mono">https://my-awesome-app.com</span>
            </div>
          </div>

          <div className="flex-1 relative p-4 flex flex-col items-center justify-center min-h-[200px]">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full border-4 border-white/5 border-t-blue-500 animate-spin" />
                  <p className="text-[10px] text-white/60 font-mono tracking-widest uppercase">Loading Assets...</p>
                </motion.div>
              ) : showContent ? (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full space-y-3"
                >
                  <div className="h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-white/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-white/80 tracking-tighter">HERO IMAGE</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-3 bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-white/10 rounded w-1/2" />
                    <div className="h-3 bg-white/10 rounded w-2/3" />
                  </div>
                </motion.div>
              ) : (
                <div className="text-center space-y-2">
                  <Clock className="w-10 h-10 text-white/10 mx-auto" />
                  <p className="text-[10px] text-white/60 uppercase tracking-widest">Ready to simulate</p>
                </div>
              )}
            </AnimatePresence>

            {/* LCP Overlay */}
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center justify-between"
              >
                <div>
                  <p className="text-[8px] uppercase tracking-wider text-white/60 mb-0.5">{t.tools.lighthouseSim.lcp}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${getLcpStatus(lcpTime).color}`}>
                      {(lcpTime / 1000).toFixed(1)}s
                    </span>
                    <span className={`text-[8px] font-bold uppercase ${getLcpStatus(lcpTime).color}`}>
                      {getLcpStatus(lcpTime).label}
                    </span>
                  </div>
                </div>
                {React.createElement(getLcpStatus(lcpTime).icon, {
                  className: `w-6 h-6 ${getLcpStatus(lcpTime).color}`
                })}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
