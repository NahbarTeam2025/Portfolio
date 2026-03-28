import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Search, Monitor, Globe, Clock, Cpu, Layout } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface FingerprintData {
  label: string;
  value: string;
  icon: React.ElementType;
}

export const FingerprintDetector: React.FC = () => {
  const { t } = useLanguage();
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<FingerprintData[]>([]);
  const [scanProgress, setScanProgress] = useState(0);

  const startScan = () => {
    setIsScanning(true);
    setResults([]);
    setScanProgress(0);

    // Simulate scan progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Collect data
    const data: FingerprintData[] = [
      { label: 'Browser Engine', value: navigator.userAgent.split(' ')[0], icon: Layout },
      { label: 'Operating System', value: navigator.platform, icon: Monitor },
      { label: 'Screen Resolution', value: `${window.screen.width}x${window.screen.height}`, icon: Layout },
      { label: 'Timezone', value: Intl.DateTimeFormat().resolvedOptions().timeZone, icon: Clock },
      { label: 'Language', value: navigator.language, icon: Globe },
      { label: 'CPU Cores', value: navigator.hardwareConcurrency?.toString() || 'Unknown', icon: Cpu },
      { label: 'Cookies Enabled', value: navigator.cookieEnabled ? 'Yes' : 'No', icon: Shield },
    ];

    // Reveal results one by one
    setTimeout(() => {
      setIsScanning(false);
      data.forEach((item, index) => {
        setTimeout(() => {
          setResults((prev) => [...prev, item]);
          // Track GA4 event on first result or completion
          if (index === data.length - 1) {
             if (typeof window.gtag === 'function') {
                window.gtag('event', 'fingerprint_scanned', {
                  event_category: 'tool_interaction',
                  event_label: 'Fingerprint Detector'
                });
              }
          }
        }, index * 400);
      });
    }, 2500);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="mb-2 shrink-0">
        <h2 className="text-lg font-bold text-white mb-0.5">{t.tools.fingerprintDetector.title}</h2>
        <p className="text-[10px] text-white/60">{t.tools.fingerprintDetector.desc}</p>
      </div>

      <div className="flex-1 min-h-0 flex flex-col items-center justify-center bg-black/40 rounded-2xl border border-white/10 p-4 relative overflow-hidden">
        <p className="absolute top-2 text-[8px] text-white/60 text-center uppercase tracking-widest z-10">
          {t.tools.noDataStored}
        </p>
        {results.length > 0 && !isScanning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 w-16 h-16 opacity-20"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full text-blue-500">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
          </motion.div>
        )}
        {!isScanning && results.length === 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startScan}
            className="flex flex-col items-center gap-4 group"
          >
            <div className="w-20 h-20 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
              <Search className="w-10 h-10 text-blue-400" />
            </div>
            <span className="text-lg font-medium text-white">{t.tools.fingerprintDetector.scan}</span>
          </motion.button>
        )}

        {isScanning && (
          <div className="w-full max-w-xs flex flex-col items-center gap-4">
            <div className="relative w-24 h-24">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-3 border-blue-500/20 border-t-blue-500 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-mono text-blue-400">{scanProgress}%</span>
              </div>
            </div>
            <p className="text-[10px] text-blue-400 font-mono animate-pulse uppercase tracking-widest">{t.tools.fingerprintDetector.scanning}</p>
          </div>
        )}

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence>
            {results.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/60">{item.label}</p>
                  <p className="text-sm font-medium text-white truncate max-w-[150px]">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {results.length > 0 && !isScanning && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={startScan}
            className="mt-6 text-xs text-white/60 hover:text-white transition-colors underline"
          >
            {t.tools.fingerprintDetector.scan}
          </motion.button>
        )}
      </div>
    </div>
  );
};
