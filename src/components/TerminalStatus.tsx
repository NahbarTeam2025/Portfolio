import React, { useState, useEffect } from 'react';

export const TerminalStatus = () => {
  const messages = [
    "Initializing SEO-Cluster-Analysis...",
    "Deploying AI-Content-Workflow...",
    "Optimizing Conversion-Funnel..."
  ];
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentMessage = messages[index];
    const speed = isDeleting ? 30 : 60;
    
    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentMessage) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % messages.length);
      } else {
        setDisplayText(prev => 
          isDeleting 
            ? prev.slice(0, -1) 
            : currentMessage.slice(0, prev.length + 1)
        );
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, index]);

  return (
    <div className="h-6 flex items-center justify-center w-full max-w-[400px] overflow-hidden">
      <p className="font-mono text-[10px] md:text-[12px] text-gray-700/90 tracking-wider">
        {`> ${displayText}`}<span className="animate-pulse-subtle">_</span>
      </p>
    </div>
  );
};
