import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X } from 'lucide-react';

export default function CommandTerminal({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<{text: string, isCommand: boolean}[]>([
    { text: 'RobertOS v1.0.0', isCommand: false },
    { text: 'Type "help" to see available commands.', isCommand: false }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K (Mac) or Ctrl+K (Windows)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newOutput = [...output, { text: `> ${cmd}`, isCommand: true }];
    
    switch (cmd) {
      case 'help':
        newOutput.push({ text: 'Available commands: start, about, skills, projects, contact, clear, exit', isCommand: false });
        break;
      case 'start':
        onNavigate('Start');
        newOutput.push({ text: 'Navigating to Start...', isCommand: false });
        setTimeout(() => setIsOpen(false), 500);
        break;
      case 'about':
        onNavigate('Über mich');
        newOutput.push({ text: 'Navigating to Über mich...', isCommand: false });
        setTimeout(() => setIsOpen(false), 500);
        break;
      case 'skills':
        onNavigate('Skills');
        newOutput.push({ text: 'Navigating to Skills...', isCommand: false });
        setTimeout(() => setIsOpen(false), 500);
        break;
      case 'projects':
        onNavigate('Projekte');
        newOutput.push({ text: 'Navigating to Projekte...', isCommand: false });
        setTimeout(() => setIsOpen(false), 500);
        break;
      case 'contact':
        onNavigate('Kontakt');
        newOutput.push({ text: 'Navigating to Kontakt...', isCommand: false });
        setTimeout(() => setIsOpen(false), 500);
        break;
      case 'clear':
        setOutput([]);
        setInput('');
        return;
      case 'exit':
        setIsOpen(false);
        break;
      default:
        newOutput.push({ text: `Command not found: ${cmd}. Type "help" for a list of commands.`, isCommand: false });
    }
    
    setOutput(newOutput);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div 
            initial={{ scale: 0.95, y: 20 }} 
            animate={{ scale: 1, y: 0 }} 
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-2xl bg-[#0d1b2a]/95 border border-blue-500/30 rounded-xl shadow-[0_0_50px_rgba(59,130,246,0.2)] overflow-hidden font-mono text-sm flex flex-col h-[400px]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-blue-500/20 bg-blue-500/5">
              <div className="flex items-center gap-2 text-blue-400/80">
                <Terminal size={14} />
                <span>Terminal (Cmd+K)</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-blue-400/50 hover:text-blue-400 focus-ring rounded"><X size={14} /></button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-1 text-blue-300/80">
              {output.map((line, i) => (
                <div key={i} className={line.isCommand ? 'text-white/80 mt-2' : ''}>{line.text}</div>
              ))}
            </div>
            <form onSubmit={handleCommand} className="flex items-center px-4 py-3 border-t border-blue-500/20 bg-blue-500/5">
              <span className="text-blue-400 mr-2">{'>'}</span>
              <input 
                ref={inputRef}
                type="text" 
                value={input} 
                onChange={e => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white placeholder-blue-300/30"
                placeholder="Type a command..."
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
