import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const ImpressumPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start gap-8 w-full max-w-3xl mx-auto py-12 px-6 animate-in fade-in duration-500">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-black/60 hover:text-blue-400 transition-colors mb-4"
      >
        <ArrowLeft size={20} />
        Zurück
      </button>
      <h1 className="heading-gradient fluid-h2 font-medium text-black">Impressum</h1>
      <div className="text-black/70 text-base leading-relaxed space-y-8">
        <div>
          <h3 className="text-xl font-medium text-black mb-3">Angaben gemäß § 5 TMG</h3>
          <p>
            Robert Erbach<br />
            Am Stadtpark 43<br />
            04895 Falkenberg/Elster
          </p>
        </div>
        <div>
          <h3 className="text-xl font-medium text-black mb-3">Kontakt</h3>
          <p>
            Telefon: 0152-04041124<br />
            E-Mail: roberterbach@web.de
          </p>
        </div>
        <div>
          <h3 className="text-xl font-medium text-black mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
          <p>
            Robert Erbach<br />
            Am Stadtpark 43<br />
            04895 Falkenberg/Elster
          </p>
        </div>
      </div>
      <div className="pt-12 border-t border-black/10 flex justify-end w-full">
        <button
          onClick={() => navigate(-1)}
          className="px-8 py-3 bg-black/10 hover:bg-black/20 text-black rounded-xl transition-all font-medium hover:scale-[1.02] active:scale-[0.98]"
        >
          Schließen
        </button>
      </div>
    </div>
  );
};
