import React, { useState, useEffect } from 'react';

export const GlitchWord = ({ word, colorClass }: { word: string; colorClass: string }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [displayText, setDisplayText] = useState(word);
  const [hasGlitched, setHasGlitched] = useState(false);
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    let interval: any;
    if (isGlitching) {
      interval = setInterval(() => {
        let glitched = "";
        for (let i = 0; i < word.length; i++) {
          glitched += chars[Math.floor(Math.random() * chars.length)];
        }
        setDisplayText(glitched);
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
        setDisplayText(word);
        setIsGlitching(false);
        setHasGlitched(true);
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isGlitching, word]);

  return (
    <span
      onMouseEnter={() => setIsGlitching(true)}
      className={`transition-all duration-500 cursor-default inline-block ${hasGlitched ? colorClass : 'text-white/80'}`}
    >
      {displayText}
    </span>
  );
};
