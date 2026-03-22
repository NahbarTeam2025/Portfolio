import React from 'react';

export const UberMichSection = React.memo(({ handleNavigate }: { handleNavigate: (page: string) => void }) => {
  return (
    <div className="flex flex-col items-start gap-2.5 md:gap-4 lg:gap-6 w-full h-full overflow-hidden animate-in fade-in duration-500">
      <h1 className="heading-gradient text-[24px] md:text-[36px] lg:text-[46px] font-medium leading-[1.1] tracking-tight shrink-0">
        Über mich
      </h1>
      <div className="w-full h-[1px] bg-white/10 shrink-0" />
      <div className="flex flex-col gap-2 md:gap-3 text-white/80 text-[13px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-normal max-w-[1000px] leading-snug md:leading-relaxed pt-1 md:pt-2 overflow-hidden">
        <p className="font-bold text-white text-[15px] sm:text-[17px] md:text-[18px]">
          Ich fordere mich selbst. Jeden Tag.
        </p>
        <p>
          Nicht aus Pflichtgefühl – sondern weil halbfertig für mich keine Option ist. Ich nehme mir die Zeit, Dinge wirklich zu durchdenken. Ich höre nicht auf jeden. Aber wenn ich jemanden frage, dann meine ich es ernst – und setze es um.
        </p>
        <p>
          Ich denke strategisch, manchmal zu weit voraus. Ich will zeigen, was möglich ist – nicht was gerade bequem ist. Websites, Content-Strukturen, KI-Workflows: Ich baue Dinge, die tatsächlich funktionieren. Vom ersten Gedanken bis zum letzten Detail, ohne Abkürzungen.
        </p>
        <p>
          Ich bin ruhig, bis ich brenne. Und wenn ich brenne, merkst du es.
          Wenn du jemanden suchst, der liefert – nicht nur plant, sondern wirklich durchzieht – dann bist du hier richtig.
        </p>
        <p className="text-brand-teal font-medium tracking-wider text-[11px] sm:text-[13px] md:text-[14px] lg:text-[15px] uppercase leading-relaxed">
          Direkt. Tiefgründig. Konsequent umsetzungsstark.
        </p>
        <div className="mt-1 md:mt-2 shrink-0">
          <img 
            src="https://meine-assets.pages.dev/signature.png" 
            alt="Unterschrift Robert Erbach" 
            width="250"
            height="64"
            className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto object-contain invert mix-blend-screen opacity-90"
            loading="lazy"
            decoding="async"
          />
        </div>
        
        {/* CTA Button */}
        <div className="mt-3 md:mt-4 lg:mt-6 w-full flex justify-start">
          <button 
            onClick={() => handleNavigate('Kontakt')}
            className="flex items-center justify-center gap-2 rounded-full px-6 py-2.5 md:px-[36px] md:py-[10px] bg-gradient-to-r from-brand-violet/10 to-brand-teal/10 border border-white/5 text-white text-[14px] md:text-[15px] font-semibold tracking-wide shadow-[0_0_15px_rgba(124,58,237,0.1)] hover:from-brand-violet/30 hover:to-brand-teal/30 transition-colors duration-300 cursor-pointer"
          >
            <span className="relative z-10">Schreib mir jetzt</span>
            <span className="relative z-10">→</span>
          </button>
        </div>
      </div>
    </div>
  );
});

