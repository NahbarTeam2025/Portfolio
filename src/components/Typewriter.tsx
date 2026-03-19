import React, { useState, useEffect } from 'react';

export const Typewriter = ({ text, delay = 20, onComplete }: { text: string, delay?: number, onComplete?: () => void }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
  
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  return (
    <span>
      {currentText}
      {currentIndex < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-brand-teal ml-1 animate-pulse align-middle" />
      )}
    </span>
  );
};
