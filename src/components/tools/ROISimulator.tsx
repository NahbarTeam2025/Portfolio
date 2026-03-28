import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, DollarSign, MousePointer2, Percent, ShoppingCart, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const ROISimulator: React.FC = () => {
  const { t } = useLanguage();
  const [budget, setBudget] = useState(1000);
  const [cpc, setCpc] = useState(0.5);
  const [convRate, setConvRate] = useState(2);
  const [orderValue, setOrderValue] = useState(50);

  const stats = useMemo(() => {
    const clicks = budget / cpc;
    const conversions = clicks * (convRate / 100);
    const revenue = conversions * orderValue;
    const roas = budget > 0 ? (revenue / budget) * 100 : 0;
    const profit = revenue - budget;

    return { clicks, conversions, revenue, roas, profit };
  }, [budget, cpc, convRate, orderValue]);

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'roi_calculated', {
        event_category: 'tool_interaction',
        event_label: 'ROI Simulator',
        budget,
        cpc,
        convRate,
        orderValue,
        roas: stats.roas
      });
    }
  }, [budget, cpc, convRate, orderValue, stats.roas]);

  const isProfitable = stats.profit > 0;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="mb-2 shrink-0">
        <h2 className="text-lg font-bold text-white mb-0.5">{t.tools.roiSimulator.title}</h2>
        <p className="text-[10px] text-white/60">{t.tools.roiSimulator.desc}</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar">
        {/* Controls */}
        <div className="space-y-4 bg-white/5 border border-white/10 p-4 rounded-2xl shrink-0">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/60 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5" /> {t.tools.roiSimulator.budget}
              </span>
              <span className="text-white font-mono">{budget}€</span>
            </div>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/60 flex items-center gap-1.5">
                <MousePointer2 className="w-3.5 h-3.5" /> {t.tools.roiSimulator.cpc}
              </span>
              <span className="text-white font-mono">{cpc.toFixed(2)}€</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="5"
              step="0.01"
              value={cpc}
              onChange={(e) => setCpc(Number(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/60 flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5" /> {t.tools.roiSimulator.convRate}
              </span>
              <span className="text-white font-mono">{convRate}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="20"
              step="0.1"
              value={convRate}
              onChange={(e) => setConvRate(Number(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/60 flex items-center gap-1.5">
                <ShoppingCart className="w-3.5 h-3.5" /> {t.tools.roiSimulator.orderValue}
              </span>
              <span className="text-white font-mono">{orderValue}€</span>
            </div>
            <input
              type="range"
              min="1"
              max="500"
              step="1"
              value={orderValue}
              onChange={(e) => setOrderValue(Number(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
              <p className="text-[9px] uppercase tracking-wider text-white/60 mb-0.5">Clicks</p>
              <p className="text-base font-bold text-white">{Math.floor(stats.clicks)}</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
              <p className="text-[9px] uppercase tracking-wider text-white/60 mb-0.5">Conversions</p>
              <p className="text-base font-bold text-white">{Math.floor(stats.conversions)}</p>
            </div>
          </div>

          <div className="flex-1 min-h-0 bg-black/40 border border-white/10 p-4 rounded-2xl flex flex-col justify-between relative overflow-hidden">
             {/* Background Glow */}
            <div className={`absolute -right-20 -top-20 w-48 h-48 rounded-full blur-[80px] opacity-20 transition-colors duration-500 ${isProfitable ? 'bg-green-500' : 'bg-red-500'}`} />

            <div className="space-y-3 relative z-10">
              <div>
                <p className="text-[11px] text-white/60 mb-0.5">{t.tools.roiSimulator.roas}</p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-bold ${isProfitable ? 'text-green-400' : 'text-red-400'}`}>
                    {stats.roas.toFixed(0)}%
                  </span>
                  <TrendingUp className={`w-5 h-5 ${isProfitable ? 'text-green-400' : 'text-red-400 rotate-180'}`} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-white/60">
                  <span>{t.tools.roiSimulator.profit}</span>
                  <span className={isProfitable ? 'text-green-400' : 'text-red-400'}>
                    {isProfitable ? '+' : ''}{stats.profit.toFixed(2)}€
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.max(0, (stats.roas / 500) * 100))}%` }}
                    className={`h-full rounded-full ${isProfitable ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 relative z-10">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-white/60 mb-0.5">Revenue</p>
                <p className="text-lg font-bold text-white">{stats.revenue.toFixed(2)}€</p>
              </div>
              <div className="flex items-end justify-end">
                <div className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${isProfitable ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                  {isProfitable ? 'Profitable' : 'Loss'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
