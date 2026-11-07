import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sword, Lock, Unlock, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const STRENGTH_LEVELS = [
  { color: 'bg-red-500', label: 'veryWeak' },
  { color: 'bg-orange-500', label: 'weak' },
  { color: 'bg-yellow-500', label: 'medium' },
  { color: 'bg-green-500', label: 'strong' },
  { color: 'bg-blue-500', label: 'veryStrong' },
];

export const PasswordGuardian: React.FC = () => {
  const { t } = useLanguage();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);

  const calculateStrength = (pwd: string) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (pwd.length >= 14) score++;
    return Math.min(score, 4);
  };

  useEffect(() => {
    const newStrength = calculateStrength(password);
    if (newStrength > strength) {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'tool_interaction', {
          tool_name: 'PasswordGuardian',
          action: 'level_up',
          level: newStrength
        });
      }
    }
    setStrength(newStrength);
  }, [password]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 p-2 w-full h-full max-w-5xl mx-auto overflow-y-auto lg:overflow-hidden">
      {/* Guardian Character */}
      <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_30px_rgba(59,130,246,0.2)]">
          {/* Cape */}
          <AnimatePresence>
            {strength >= 1 && (
              <motion.path
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                d="M60 80 L40 180 L160 180 L140 80 Z"
                fill="#1e40af"
                className="origin-top"
              />
            )}
          </AnimatePresence>

          {/* Base Character (Body) */}
          <circle cx="100" cy="70" r="35" fill="#93c5fd" stroke="#60a5fa" strokeWidth="2" />
          <path d="M65 105 Q100 95 135 105 L145 185 H55 Z" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="2" />
          
          {/* Level 1: Helmet */}
          <AnimatePresence>
            {strength >= 1 && (
              <motion.g
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <path d="M65 70 A35 35 0 0 1 135 70 L135 85 L115 85 L100 100 L85 85 L65 85 Z" fill="#60a5fa" stroke="#93c5fd" />
                <rect x="98" y="40" width="4" height="15" fill="#dbeafe" />
                <path d="M90 40 L110 40 L100 20 Z" fill="#3b82f6" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Level 2: Armor Plates */}
          <AnimatePresence>
            {strength >= 2 && (
              <motion.g
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <path d="M70 110 L130 110 L135 150 L100 175 L65 150 Z" fill="#93c5fd" stroke="#60a5fa" strokeWidth="2" />
                <path d="M80 120 L120 120 L125 145 L100 165 L75 145 Z" fill="#bfdbfe" stroke="#93c5fd" />
                {/* Shoulder Pads */}
                <path d="M55 105 Q65 90 80 105 Z" fill="#60a5fa" stroke="#93c5fd" />
                <path d="M145 105 Q135 90 120 105 Z" fill="#60a5fa" stroke="#93c5fd" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Level 3: Shield */}
          <AnimatePresence>
            {strength >= 3 && (
              <motion.g
                initial={{ x: -30, opacity: 0, rotate: -10 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
              >
                <path d="M25 100 Q25 160 60 175 Q95 160 95 100 Z" fill="#93c5fd" stroke="#60a5fa" strokeWidth="3" />
                <path d="M35 110 Q35 155 60 165 Q85 155 85 110 Z" fill="#bfdbfe" stroke="#93c5fd" />
                <Shield className="w-8 h-8 text-blue-600/70" x="44" y="115" />
                {/* Glowing Trim */}
                <path d="M25 100 Q25 160 60 175 Q95 160 95 100 Z" fill="none" stroke="#3b82f6" strokeWidth="1" className="animate-pulse" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Level 4: Glowing Sword */}
          <AnimatePresence>
            {strength >= 4 && (
              <motion.g
                initial={{ x: 30, opacity: 0, rotate: 45 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
              >
                {/* Sword Blade */}
                <path d="M145 145 L185 45 L195 55 L155 155 Z" fill="#fff" />
                <path d="M145 145 L185 45 L195 55 L155 155 Z" fill="none" stroke="#22c55e" strokeWidth="2" className="animate-pulse" />
                {/* Hilt */}
                <rect x="135" y="145" width="30" height="8" fill="#666" rx="2" transform="rotate(-45 150 150)" />
                <rect x="145" y="150" width="10" height="25" fill="#555" rx="2" transform="rotate(-45 150 150)" />
                {/* Glow Effect */}
                <circle cx="170" cy="70" r="20" fill="url(#swordGlow)" opacity="0.3" />
                <defs>
                  <radialGradient id="swordGlow">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Eyes */}
          <motion.g animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            <circle 
              cx="88" 
              cy="75" 
              r="4" 
              fill="#ffffff" 
              className={`guardian-eye ${strength >= 4 ? "drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" : ""}`} 
              style={{ fill: '#ffffff' }}
            />
            <circle 
              cx="112" 
              cy="75" 
              r="4" 
              fill="#ffffff" 
              className={`guardian-eye ${strength >= 4 ? "drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" : ""}`} 
              style={{ fill: '#ffffff' }}
            />
          </motion.g>
        </svg>
      </div>

      {/* Input Area */}
      <motion.div
        animate={strength < 3 && password.length > 0 ? { x: [-5, 5, -5, 5, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md space-y-4"
      >
        <div className="text-center lg:text-left space-y-1">
          <h2 className="text-xl md:text-2xl font-bold heading-gradient">
            {t.tools.passwordGuardian.title}
          </h2>
          <p className="text-black/60 text-[10px] md:text-xs">
            {t.tools.passwordGuardian.desc}
          </p>
        </div>

        <div className="space-y-3 bg-black/5 p-4 rounded-2xl border border-black/10 backdrop-blur-sm">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.tools.passwordGuardian.placeholder}
              autoComplete="new-password"
              className="w-full bg-white/40 border border-black/10 rounded-xl px-12 py-3 text-black focus:outline-none focus:border-blue-500/50 transition-all font-mono"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              {strength >= 3 ? <Lock className="w-5 h-5 text-blue-400" /> : <Unlock className="w-5 h-5 text-black/20" />}
            </div>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <p className="text-[8px] text-black/60 text-center uppercase tracking-widest">
            {t.tools.noDataStored}
          </p>

          {/* Strength Meter */}
          <div className="space-y-3">
            <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-black/60 font-mono">
              <span className={strength > 0 ? "text-blue-400" : ""}>
                {t.tools.passwordGuardian.strength[STRENGTH_LEVELS[strength].label as keyof typeof t.tools.passwordGuardian.strength]}
              </span>
              <span>{strength * 25}%</span>
            </div>
            <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex-grow h-full bg-black/5 relative">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: strength > i ? 1 : 0 }}
                    className={`absolute inset-0 origin-left ${STRENGTH_LEVELS[strength].color}`}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Requirements Checklist */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {[
              { label: '8+ Chars', met: password.length >= 8 },
              { label: 'A-Z', met: /[A-Z]/.test(password) && /[a-z]/.test(password) },
              { label: '0-9', met: /[0-9]/.test(password) },
              { label: 'Special', met: /[^A-Za-z0-9]/.test(password) },
            ].map((req) => (
              <div key={req.label} className="flex items-center gap-2">
                <div className={`w-1 h-1 rounded-full ${req.met ? 'bg-blue-400 shadow-[0_0_5px_#3b82f6]' : 'bg-black/10'}`} />
                <span className={`text-[9px] uppercase tracking-wider ${req.met ? 'text-black/80' : 'text-black/30'}`}>{req.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

