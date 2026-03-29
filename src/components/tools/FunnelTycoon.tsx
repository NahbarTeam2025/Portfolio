import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Users, Target, ShoppingBag, Zap, Activity, MousePointer2, Code } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Upgrade {
  id: string;
  label: string;
  icon: any;
  impact: number;
  isActive: boolean;
}

export const FunnelTycoon: React.FC = () => {
  const { t } = useLanguage();
  const [budget, setBudget] = useState(1000);
  const [stats, setStats] = useState({
    visitors: 1000,
    leads: 50,
    customers: 5,
  });
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    { id: 'abTesting', label: t.tools.funnelTycoon.upgrades.abTesting, icon: MousePointer2, impact: 1.5, isActive: false },
    { id: 'pageSpeed', label: t.tools.funnelTycoon.upgrades.pageSpeed, icon: Zap, impact: 1.3, isActive: false },
    { id: 'copywriting', label: t.tools.funnelTycoon.upgrades.copywriting, icon: Code, impact: 1.8, isActive: false },
  ]);

  const toggleUpgrade = (id: string) => {
    const upgrade = upgrades.find(u => u.id === id);
    if (!upgrade) return;

    const cost = 200;
    if (!upgrade.isActive && budget < cost) {
      setMessage({ text: t.tools.funnelTycoon.messages.insufficientBudget, type: 'error' });
      setTimeout(() => setMessage(null), 2000);
      return;
    }

    setUpgrades(prev => prev.map(up => {
      if (up.id === id) {
        const newState = !up.isActive;
        if (newState) {
          setBudget(b => b - cost);
          // 20% chance of "Risk" backfiring for copywriting
          if (id === 'copywriting' && Math.random() < 0.2) {
            setMessage({ text: t.tools.funnelTycoon.messages.accountFlagged, type: 'error' });
            setTimeout(() => setMessage(null), 3000);
            // We'll handle the negative impact in the effect
          } else {
            setMessage({ text: t.tools.funnelTycoon.messages.upgradeSuccess, type: 'success' });
            setTimeout(() => setMessage(null), 2000);
          }
        } else {
          setBudget(b => b + cost * 0.5); // Partial refund
        }
        
        if (newState && (window as any).gtag) {
          (window as any).gtag('event', 'tool_interaction', {
            tool_name: 'FunnelTycoon',
            action: 'activate_upgrade',
            upgrade_id: id
          });
        }
        
        return { ...up, isActive: newState };
      }
      return up;
    }));
  };

  useEffect(() => {
    let leadMultiplier = 1;
    let customerMultiplier = 1;
    let visitorMultiplier = 1;

    upgrades.forEach(up => {
      if (up.isActive) {
        if (up.id === 'copywriting' && message?.text === t.tools.funnelTycoon.messages.accountFlagged) {
          customerMultiplier *= 0.5; // Penalty
        } else {
          leadMultiplier *= (1 + (up.impact - 1) * 0.5);
          customerMultiplier *= up.impact;
        }
        if (up.id === 'pageSpeed') visitorMultiplier *= 1.2;
      }
    });

    setStats({
      visitors: Math.round(1000 * visitorMultiplier),
      leads: Math.round(50 * leadMultiplier * visitorMultiplier),
      customers: Math.round(5 * customerMultiplier * visitorMultiplier),
    });
  }, [upgrades, message]);

  const leadRate = ((stats.leads / stats.visitors) * 100).toFixed(1);
  const customerRate = ((stats.customers / stats.leads) * 100).toFixed(1);

  return (
    <div className="flex flex-col items-center gap-2 md:gap-4 p-2 w-full h-full max-w-5xl mx-auto overflow-y-auto lg:overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-2 md:gap-4 shrink-0">
        <div className="text-center md:text-left space-y-0.5">
          <h2 className="text-lg md:text-xl font-bold heading-gradient">
            {t.tools.funnelTycoon.title}
          </h2>
          <p className="text-white/40 text-[9px]">
            {t.tools.funnelTycoon.desc}
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
          <div className="flex flex-col">
            <span className="text-[7px] uppercase tracking-widest text-white/40 font-mono">Budget</span>
            <span className={`text-sm font-bold font-mono ${budget < 200 ? 'text-red-400' : 'text-green-400'}`}>${budget}</span>
          </div>
          <div className="w-[1px] h-4 bg-white/10" />
          <AnimatePresence mode="wait">
            {message ? (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className={`text-[8px] font-bold uppercase tracking-wider ${message.type === 'error' ? 'text-red-400' : 'text-blue-400'}`}
              >
                {message.text}
              </motion.div>
            ) : (
              <div className="text-[8px] font-bold uppercase tracking-wider text-white/20">{t.tools.funnelTycoon.messages.ready}</div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 w-full items-start flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
        {/* Funnel Visualization */}
        <div className="relative flex flex-col items-center gap-0.5 pt-2 md:pt-4">
          {/* Visitors Layer */}
          <motion.div 
            layout
            className="w-full max-w-[320px] h-24 bg-blue-500/5 border border-blue-500/20 rounded-t-[20px] flex flex-col items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-400/60" />
              <span className="text-xl font-bold text-white/90">{stats.visitors}</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-mono">{t.tools.funnelTycoon.stats.visitors}</span>
            
            {!upgrades.find(u => u.id === 'pageSpeed')?.isActive && (
              <motion.div animate={{ y: [0, 10], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute right-4 top-1/2 w-0.5 h-3 bg-red-500/30 rounded-full" />
            )}
          </motion.div>

          {/* Leads Layer */}
          <motion.div 
            layout
            className="w-[85%] max-w-[280px] h-24 bg-blue-500/10 border border-blue-500/30 flex flex-col items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
            <div className="flex items-center gap-1.5">
              <Target className="w-4 h-4 text-blue-400/70" />
              <span className="text-xl font-bold text-white/90">{stats.leads}</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-mono">{t.tools.funnelTycoon.stats.leads}</span>
            <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] font-bold text-blue-400 bg-black px-2 py-0.5 rounded-full border border-blue-500/20">
              {leadRate}% CR
            </div>

            {!upgrades.find(u => u.id === 'abTesting')?.isActive && (
              <motion.div animate={{ y: [0, 10], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }} className="absolute left-4 top-1/2 w-0.5 h-3 bg-red-500/30 rounded-full" />
            )}
          </motion.div>

          {/* Customers Layer */}
          <motion.div 
            layout
            className="w-[70%] max-w-[240px] h-24 bg-blue-500/20 border border-blue-500/40 rounded-b-[20px] flex flex-col items-center justify-center relative overflow-hidden shadow-[0_5px_20px_rgba(59,130,246,0.1)]"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-blue-400/80" />
              <span className="text-xl font-bold text-white/90">{stats.customers}</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-mono">{t.tools.funnelTycoon.stats.customers}</span>
            <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] font-bold text-blue-400 bg-black px-2 py-0.5 rounded-full border border-blue-500/20">
              {customerRate}% CR
            </div>

            {(!upgrades.find(u => u.id === 'copywriting')?.isActive || message?.text === t.tools.funnelTycoon.messages.accountFlagged) && (
              <motion.div animate={{ y: [0, 10], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.8, delay: 0.6 }} className="absolute right-4 top-1/2 w-0.5 h-3 bg-red-500/30 rounded-full" />
            )}
          </motion.div>

          {/* Particle Flow */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -20, x: Math.random() * 200 - 100, opacity: 0 }}
                animate={{ y: 200, opacity: [0, 1, 1, 0] }}
                transition={{ repeat: Infinity, duration: 2 + Math.random(), delay: Math.random() * 2 }}
                className="absolute top-0 left-1/2 w-1 h-1 bg-blue-400/20 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Upgrades Panel */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/80">{t.tools.funnelTycoon.strategies}</h3>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {upgrades.map((up) => (
              <button
                key={up.id}
                onClick={() => toggleUpgrade(up.id)}
                className={`group relative flex items-center justify-between p-3 rounded-xl border transition-all duration-500 ${
                  up.isActive
                    ? 'bg-blue-500/10 border-blue-500/40 text-blue-400'
                    : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-colors ${up.isActive ? 'bg-blue-500/20' : 'bg-white/5'}`}>
                    <up.icon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5">{up.label}</div>
                    <div className="text-[8px] font-mono opacity-50">{t.tools.funnelTycoon.cost}: 200 €</div>
                  </div>
                </div>
                
                <div className={`w-8 h-4 rounded-full relative transition-colors duration-500 ${up.isActive ? 'bg-blue-500' : 'bg-white/10'}`}>
                  <motion.div 
                    animate={{ x: up.isActive ? 18 : 2 }}
                    className="absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-lg"
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Performance Metrics */}
          <div className="mt-4 p-4 bg-black/40 rounded-xl border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-3 h-3 text-blue-400/60" />
              <span className="text-[8px] uppercase tracking-widest text-white/30 font-mono">{t.tools.funnelTycoon.liveAnalytics}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-0.5">
                <div className="text-lg font-bold text-white/90">{((stats.customers / stats.visitors) * 100).toFixed(2)}%</div>
                <div className="text-[8px] uppercase tracking-widest text-white/30 font-mono">{t.tools.funnelTycoon.totalConversion}</div>
              </div>
              <div className="space-y-0.5">
                <div className={`text-lg font-bold ${stats.customers > 5 ? 'text-green-400' : 'text-white/40'}`}>
                  {stats.customers > 5 ? `+${Math.round(((stats.customers / 5) - 1) * 100)}%` : '0%'}
                </div>
                <div className="text-[8px] uppercase tracking-widest text-white/30 font-mono">{t.tools.funnelTycoon.roiGrowth}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

