import React from 'react';
import { Typewriter } from './Typewriter';

export const UberMichSection = React.memo(({ step, setStep }: any) => {
  return (
    <div className="flex flex-col items-start gap-4 md:gap-8 w-full animate-in fade-in duration-500">
      <h1 className="heading-gradient text-[28px] md:text-[40px] lg:text-[56px] font-medium leading-[1.28] tracking-tight shrink-0">
        Über mich
      </h1>
      <div className="w-full h-[1px] bg-white/10 shrink-0" />
      <div className="flex flex-col gap-4 md:gap-6 text-white/80 text-[14px] md:text-[16px] lg:text-[20px] font-normal max-w-[1000px] leading-relaxed pt-4 md:pt-8">
        <p className="relative">
          <span className="opacity-0 select-none pointer-events-none block" aria-hidden="true">
            Digitale Lösungen entstehen für mich aus dem Zusammenspiel von Content, Design und Technologie. Ich arbeite strukturiert, praxisnah und mit dem Ziel, Ideen in funktionierende Ergebnisse zu übersetzen.
          </span>
          <span className="absolute inset-0">
            <Typewriter 
              text="Digitale Lösungen entstehen für mich aus dem Zusammenspiel von Content, Design und Technologie. Ich arbeite strukturiert, praxisnah und mit dem Ziel, Ideen in funktionierende Ergebnisse zu übersetzen." 
              onComplete={() => setStep(1)}
            />
          </span>
        </p>
        <p className="relative text-brand-teal font-medium tracking-wider text-[12px] md:text-[14px] lg:text-[16px] uppercase">
          <span className="opacity-0 select-none pointer-events-none block" aria-hidden="true">
            Strukturiert • Praxisnah • Lösungsorientiert • Umsetzungsstark
          </span>
          <span className="absolute inset-0">
            {step >= 1 && (
              <Typewriter 
                text="Strukturiert • Praxisnah • Lösungsorientiert • Umsetzungsstark" 
                delay={15}
                onComplete={() => setStep(2)}
              />
            )}
          </span>
        </p>
        <p className="relative">
          <span className="opacity-0 select-none pointer-events-none block" aria-hidden="true">
            Mein Schwerpunkt liegt auf der Entwicklung von Websites, Content-Strukturen und KI-gestützten Workflows – von der ersten Idee bis zur Umsetzung. Dabei verbinde ich kreative Ansätze mit klaren Prozessen.
          </span>
          <span className="absolute inset-0">
            {step >= 2 && (
              <Typewriter 
                text="Mein Schwerpunkt liegt auf der Entwicklung von Websites, Content-Strukturen und KI-gestützten Workflows – von der ersten Idee bis zur Umsetzung. Dabei verbinde ich kreative Ansätze mit klaren Prozessen." 
                delay={15}
                onComplete={() => setStep(3)}
              />
            )}
          </span>
        </p>
        <p className="relative text-white font-medium mt-2 md:mt-4 text-[16px] md:text-[18px] lg:text-[24px]">
          <span className="opacity-0 select-none pointer-events-none block" aria-hidden="true">
            Mein Antrieb: aus Ideen echte Ergebnisse machen.
          </span>
          <span className="absolute inset-0">
            {step >= 3 && (
              <Typewriter 
                text="Mein Antrieb: aus Ideen echte Ergebnisse machen." 
                delay={25}
                onComplete={() => setStep(4)}
              />
            )}
          </span>
        </p>
        <div className={`mt-4 md:mt-8 transition-opacity duration-1000 ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
          <img 
            src="https://ik.imagekit.io/roberterbach/site-signature.png?tr=w-400" 
            alt="Unterschrift Robert Erbach" 
            className="h-12 md:h-20 w-auto object-contain invert mix-blend-screen opacity-90"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
});
