import React from 'react';

export const UberMichSection = React.memo(() => {
  return (
    <div className="flex flex-col items-start gap-2 md:gap-8 w-full h-full overflow-hidden animate-in fade-in duration-500">
      <h1 className="heading-gradient text-[26px] md:text-[40px] lg:text-[56px] font-medium leading-[1.1] tracking-tight shrink-0">
        Über mich
      </h1>
      <div className="w-full h-[1px] bg-white/10 shrink-0" />
      <div className="flex flex-col gap-2 md:gap-4 text-white/80 text-[15px] md:text-[17px] lg:text-[18px] font-normal max-w-[1000px] leading-snug md:leading-relaxed pt-1 md:pt-4 overflow-y-auto">
        <p className="font-bold text-white">
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
          Wenn du jemanden suchst, der liefert – nicht nur plant, nicht nur präsentiert, sondern wirklich durchzieht – dann bist du hier richtig.
        </p>
        <p className="text-brand-teal font-medium tracking-wider text-[12px] md:text-[15px] lg:text-[16px] uppercase leading-relaxed">
          Direkt. Tiefgründig. Konsequent umsetzungsstark.
        </p>
        <div className="mt-0 md:mt-4">
          <img 
            src="https://meine-assets.pages.dev/signature.png" 
            alt="Unterschrift Robert Erbach" 
            width="250"
            height="64"
            className="h-6 md:h-16 w-auto object-contain invert mix-blend-screen opacity-90"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
});

