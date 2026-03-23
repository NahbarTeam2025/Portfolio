import React, { startTransition } from 'react';
import { X } from 'lucide-react';

export const ImpressumModal = ({ setIsImpressumOpen }: { setIsImpressumOpen: (open: boolean) => void }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => startTransition(() => setIsImpressumOpen(false))} />
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300" tabIndex={-1}>
        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
          <h2 id="modal-title" className="text-2xl font-medium text-white">Impressum</h2>
          <button 
            onClick={() => startTransition(() => setIsImpressumOpen(false))}
            className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto text-white/70 text-sm leading-relaxed space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Angaben gemäß § 5 TMG</h3>
            <p>
              Robert Erbach<br />
              Am Stadtpark 43<br />
              04895 Falkenberg/Elster
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Kontakt</h3>
            <p>
              Telefon: 0152-04041124<br />
              E-Mail: roberterbach@web.de
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
            <p>
              Robert Erbach<br />
              Am Stadtpark 43<br />
              04895 Falkenberg/Elster
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
