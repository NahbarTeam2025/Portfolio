import React from 'react';

export const UberMichSection = React.memo(() => {
  return (
    <div className="flex flex-col items-start gap-4 md:gap-8 w-full h-full overflow-hidden animate-in fade-in duration-500">
      <h1 className="heading-gradient text-[28px] md:text-[40px] lg:text-[56px] font-medium leading-[1.2] tracking-tight shrink-0">
        Über mich
      </h1>
      <div className="w-full h-[1px] bg-white/10 shrink-0" />
      <div className="flex flex-col gap-5 md:gap-8 text-white/80 text-[16px] md:text-[18px] lg:text-[22px] font-normal max-w-[1000px] leading-relaxed pt-4 md:pt-8 overflow-y-auto md:overflow-visible">
        <p>
          Digitale Lösungen entstehen für mich aus dem Zusammenspiel von Content, Design und Technologie. Ich arbeite strukturiert, praxisnah und mit dem Ziel, Ideen in funktionierende Ergebnisse zu übersetzen.
        </p>
        <p className="text-brand-teal font-medium tracking-wider text-[13px] md:text-[15px] lg:text-[18px] uppercase leading-relaxed">
          Strukturiert • Praxisnah • Lösungsorientiert • Umsetzungsstark
        </p>
        <p>
          Mein Schwerpunkt liegt auf der Entwicklung von Websites, Content-Strukturen und KI-gestützten Workflows – von der ersten Idee bis zur Umsetzung. Dabei verbinde ich kreative Ansätze mit klaren Prozessen.
        </p>
        <p className="text-white font-medium mt-2 md:mt-6 text-[18px] md:text-[22px] lg:text-[28px] leading-snug">
          Mein Antrieb: aus Ideen echte Ergebnisse machen.
        </p>
        <div className="mt-4 md:mt-10">
          <img 
            src="https://ik.imagekit.io/roberterbach/site-signature.png?tr=w-400" 
            alt="Unterschrift Robert Erbach" 
            className="h-14 md:h-24 w-auto object-contain invert mix-blend-screen opacity-90"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
});

