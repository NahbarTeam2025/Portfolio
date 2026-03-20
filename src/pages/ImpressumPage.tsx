import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const ImpressumPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start gap-8 w-full max-w-3xl mx-auto py-12 px-6 animate-in fade-in duration-500">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white/60 hover:text-brand-teal transition-colors mb-4"
      >
        <ArrowLeft size={20} />
        Zurück
      </button>
      <h1 className="text-3xl md:text-4xl font-medium text-white">Impressum</h1>
      <div className="text-white/70 text-base leading-relaxed space-y-8">
        <div>
          <h3 className="text-xl font-medium text-white mb-3">Angaben gemäß § 5 TMG</h3>
          <p>
            Robert Erbach<br />
            Am Stadtpark 43<br />
            04895 Falkenberg/Elster
          </p>
        </div>
        <div>
          <h3 className="text-xl font-medium text-white mb-3">Kontakt</h3>
          <p>
            Telefon: 0152-04041124<br />
            E-Mail: roberterbach@web.de
          </p>
        </div>
        <div>
          <h3 className="text-xl font-medium text-white mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
          <p>
            Robert Erbach<br />
            Am Stadtpark 43<br />
            04895 Falkenberg/Elster
          </p>
        </div>
      </div>
    </div>
  );
};
