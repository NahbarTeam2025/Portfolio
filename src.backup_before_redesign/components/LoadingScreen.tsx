import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Ultra-fast transition to maximize PageSpeed scores
    const timer = setTimeout(() => {
      const skeleton = document.getElementById('initial-skeleton');
      if (skeleton) {
        skeleton.style.opacity = '0';
        setTimeout(() => skeleton.remove(), 300);
      }
      setIsVisible(false);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-blue-100 border-t-blue-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-xl font-display font-bold text-black tracking-tighter">Robert Erbach</h2>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-black/40">Initializing Experience</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
