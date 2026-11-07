export function OfficeIllustration() {
  return (
    <div className="office-illus-box" role="region" aria-label="Grafische Darstellung von Büro- und Digitalprozessen">
      <div className="illus-glow" aria-hidden="true" />
      <div className="glass illus-card main-win rv">
        <div className="win-bar">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
          <span className="win-title">prozess_management.xlsx</span>
        </div>
        <div className="win-content">
          <div className="tbl-row head">
            <span>Modul / Bereich</span>
            <span>Status</span>
            <span>Dokumentation</span>
          </div>
          <div className="tbl-row">
            <span>Büro &amp; Verwaltung</span>
            <span className="badge-ok">Aktiv</span>
            <span className="dim">Strukturiert</span>
          </div>
          <div className="tbl-row">
            <span>Marketing &amp; Content</span>
            <span className="badge-ok">Optimiert</span>
            <span className="dim">SEO &amp; GA4</span>
          </div>
          <div className="tbl-row">
            <span>Digitale Werkzeuge</span>
            <span className="badge-ok">Geprüft</span>
            <span className="dim">MS Office / n8n</span>
          </div>
        </div>
      </div>
    </div>
  );
}
