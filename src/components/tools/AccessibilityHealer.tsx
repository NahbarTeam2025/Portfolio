import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Image as ImageIcon, Type, Palette, MousePointer2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface BrokenElement {
  id: string;
  type: 'image' | 'button' | 'input';
  label: string;
  solution: string;
  isHealed: boolean;
}

export const AccessibilityHealer: React.FC = () => {
  const { t } = useLanguage();
  const [selectedSolution, setSelectedSolution] = useState<string | null>(null);
  const [wrongElementId, setWrongElementId] = useState<string | null>(null);
  const [elements, setElements] = useState<BrokenElement[]>([
    { id: '1', type: 'image', label: t.tools.accessibilityHealer.elements.image, solution: 'altText', isHealed: false },
    { id: '2', type: 'button', label: t.tools.accessibilityHealer.elements.button, solution: 'contrast', isHealed: false },
    { id: '3', type: 'input', label: t.tools.accessibilityHealer.elements.input, solution: 'label', isHealed: false },
    { id: '4', type: 'image', label: t.tools.accessibilityHealer.elements.heading, solution: 'heading', isHealed: false },
  ]);

  const solutions = [
    { id: 'contrast', label: t.tools.accessibilityHealer.solutions.contrast, icon: Palette },
    { id: 'label', label: t.tools.accessibilityHealer.solutions.label, icon: Type },
    { id: 'altText', label: t.tools.accessibilityHealer.solutions.altText, icon: ImageIcon },
    { id: 'heading', label: t.tools.accessibilityHealer.solutions.heading, icon: Type },
    { id: 'tabIndex', label: t.tools.accessibilityHealer.solutions.tabIndex, icon: MousePointer2 },
    { id: 'aria', label: t.tools.accessibilityHealer.solutions.aria, icon: AlertCircle },
  ].sort(() => Math.random() - 0.5);

  const handleHeal = (elementId: string) => {
    if (!selectedSolution) return;

    const element = elements.find(e => e.id === elementId);
    if (!element || element.isHealed) return;

    if (element.solution === selectedSolution) {
      setElements(prev => prev.map(e => e.id === elementId ? { ...e, isHealed: true } : e));
      setSelectedSolution(null);
      setWrongElementId(null);

      if ((window as any).gtag) {
        (window as any).gtag('event', 'tool_interaction', {
          tool_name: 'AccessibilityHealer',
          action: 'fix_element',
          element_type: element.type
        });
      }
    } else {
      // Wrong solution
      setWrongElementId(elementId);
      setTimeout(() => setWrongElementId(null), 500);
      
      if ((window as any).gtag) {
        (window as any).gtag('event', 'tool_interaction', {
          tool_name: 'AccessibilityHealer',
          action: 'wrong_solution',
          element_type: element.type,
          solution_id: selectedSolution
        });
      }
    }
  };

  const healedCount = elements.filter(e => e.isHealed).length;
  const progress = (healedCount / elements.length) * 100;

  return (
    <div className="flex flex-col items-center gap-2 md:gap-4 p-2 w-full h-full max-w-4xl mx-auto overflow-y-auto glass-scrollbar">
      <div className="text-center space-y-0.5 shrink-0">
        <h2 className="text-lg md:text-2xl font-bold heading-gradient">
          {t.tools.accessibilityHealer.title}
        </h2>
        <p className="text-white/60 text-[9px] md:text-xs">
          {t.tools.accessibilityHealer.desc}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md space-y-1 bg-white/5 p-2 rounded-xl border border-white/10 shrink-0">
        <div className="flex justify-between text-[9px] uppercase tracking-widest text-white/60 font-mono">
          <span>{t.tools.accessibilityHealer.progress}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6 w-full flex-1 min-h-0 overflow-y-auto glass-scrollbar pr-2">
        {/* Solutions Panel */}
        <div className="space-y-1.5">
          <h3 className="text-[8px] uppercase tracking-[0.2em] text-white/60 font-mono mb-1">
            {t.tools.accessibilityHealer.availableFixes}
          </h3>
          <div className="grid grid-cols-1 gap-1.5">
            {solutions.map((sol) => (
              <button
                key={sol.id}
                onClick={() => setSelectedSolution(sol.id)}
                className={`flex items-center gap-2 p-2 rounded-lg border transition-all duration-300 text-left relative overflow-hidden ${
                  selectedSolution === sol.id
                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.1)]'
                    : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:text-white'
                }`}
              >
                <sol.icon className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">{sol.label}</span>
                {selectedSolution === sol.id && (
                  <motion.div
                    layoutId="active-solution-glow"
                    className="absolute inset-0 bg-blue-500/5 pointer-events-none"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Game Board */}
        <div className="space-y-1.5">
          <h3 className="text-[8px] uppercase tracking-[0.2em] text-white/60 font-mono mb-1">
            {t.tools.accessibilityHealer.brokenElements}
          </h3>
          <div className="grid grid-cols-1 gap-1.5">
            {elements.map((el) => (
              <motion.div
                key={el.id}
                layout
                onClick={() => handleHeal(el.id)}
                animate={wrongElementId === el.id ? { x: [-5, 5, -5, 5, 0], borderColor: ['#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ffffff1a'] } : {}}
                className={`relative group p-3 rounded-xl border transition-all duration-500 cursor-pointer overflow-hidden ${
                  el.isHealed
                    ? 'bg-green-500/10 border-green-500/30 text-green-400'
                    : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between relative z-10 mb-2">
                  <div className="flex items-center gap-2">
                    {el.isHealed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                      <AlertCircle className={`w-3.5 h-3.5 ${wrongElementId === el.id ? 'text-red-500' : 'text-red-500/60'} animate-pulse`} />
                    )}
                    <span className={`text-[9px] font-bold uppercase tracking-wider ${el.isHealed ? 'text-green-400' : 'text-white/90'}`}>
                      {el.isHealed ? t.tools.accessibilityHealer.success : el.label}
                    </span>
                  </div>
                  {!el.isHealed && selectedSolution && (
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }}>
                      <MousePointer2 className="w-2.5 h-2.5 text-blue-400" />
                    </motion.div>
                  )}
                </div>

                {/* Visual Representation */}
                <div className={`p-2 rounded-lg border transition-colors duration-500 ${el.isHealed ? 'bg-green-500/5 border-green-500/20' : 'bg-black/40 border-white/5'}`}>
                  {el.type === 'image' && (
                    <div className="flex flex-col gap-1">
                      <div className={`w-full h-10 rounded flex items-center justify-center gap-3 ${el.isHealed ? 'bg-green-500/10' : 'bg-white/5'}`}>
                        <ImageIcon className={`w-4 h-4 ${el.isHealed ? 'text-green-500/40' : 'opacity-20'}`} />
                      </div>
                      <AnimatePresence>
                        {el.isHealed && (
                          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[8px] font-mono text-green-400/60 bg-green-500/5 p-0.5 rounded">
                            &lt;img alt="Robert Erbach Portfolio" /&gt;
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                  {el.type === 'button' && (
                    <div className="flex justify-center">
                      <div className={`px-3 py-1 rounded-lg text-[8px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
                        el.isHealed 
                          ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                          : 'bg-white/5 text-white/10'
                      }`}>
                        {t.tools.accessibilityHealer.submitForm}
                      </div>
                    </div>
                  )}
                  {el.type === 'input' && (
                    <div className="space-y-1">
                      <AnimatePresence>
                        {el.isHealed && (
                          <motion.label initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-[8px] uppercase tracking-widest text-blue-400 font-bold">
                            {t.tools.accessibilityHealer.fullName}
                          </motion.label>
                        )}
                      </AnimatePresence>
                      <div className={`w-full h-6 rounded border transition-colors duration-500 ${el.isHealed ? 'bg-green-500/5 border-green-500/20' : 'bg-white/5 border-white/10'}`} />
                    </div>
                  )}
                </div>

                {el.isHealed && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-green-500/20 rounded-full"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

