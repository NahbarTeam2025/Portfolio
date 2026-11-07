export function OfficeIllustration() {
  return (
    <div className="office-illus-box" role="region" aria-label="Illustration Kompetenzübersicht">
      <div className="illus-glow" aria-hidden="true" />
      <div className="glass illus-card main-win rv" style={{ padding: '24px 28px', borderRadius: '18px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--ink)' }}>Büro &amp; Verwaltung</div>
          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--ink)' }}>Marketing &amp; Social Media</div>
          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--ink)' }}>Digitalisierung &amp; KI</div>
        </div>
      </div>
    </div>
  );
}
