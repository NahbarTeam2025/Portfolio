export function OfficeIllustration() {
  return (
    <div className="hero-visual" role="region" aria-label="Kompetenz-Netz">
      <div className="illus-glow" aria-hidden="true" />
      <div className="hero-visual-card">
        <svg viewBox="0 0 480 280" role="img" aria-labelledby="heroTitle heroDesc">
          <title id="heroTitle">Kompetenz-Netz</title>
          <desc id="heroDesc">
            Drei verbundene Felder: Büro und Verwaltung, Marketing und Social Media, Digitalisierung und KI.
          </desc>
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6e8bff" />
              <stop offset="50%" stopColor="#5b8cff" />
              <stop offset="100%" stopColor="#8a93a6" />
            </linearGradient>
            <filter id="soft">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>
          <circle cx="240" cy="125" r="90" className="ring" />
          <circle cx="240" cy="125" r="64" className="ring" opacity=".55" />
          <path className="line l1" d="M110 105 C180 65 265 62 360 75" />
          <path className="line l2" d="M360 75 C395 120 370 170 300 195" />
          <path className="line l3" d="M300 195 C220 212 145 170 110 105" />
          <circle className="halo h1" cx="110" cy="105" r="26" fill="#6e8bff" opacity=".18" filter="url(#soft)" />
          <circle className="halo h2" cx="360" cy="75" r="26" fill="#8a93a6" opacity=".18" filter="url(#soft)" />
          <circle className="halo h3" cx="300" cy="195" r="26" fill="#6e8bff" opacity=".16" filter="url(#soft)" />
          <circle className="node n1" cx="110" cy="105" r="7" fill="#6e8bff" />
          <circle className="node n2" cx="360" cy="75" r="7" fill="#8a93a6" />
          <circle className="node n3" cx="300" cy="195" r="7" fill="#6e8bff" />
          <text className="label" x="110" y="46" textAnchor="middle">Büro &amp; Verwaltung</text>
          <text className="sub-label" x="110" y="62" textAnchor="middle">Struktur · Office · Dokumente</text>
          <text className="label" x="460" y="24" textAnchor="end">Marketing &amp; Social Media</text>
          <text className="sub-label" x="460" y="40" textAnchor="end">Content · SEO · Analytics</text>
          <text className="label" x="300" y="242" textAnchor="middle">Digitalisierung &amp; KI</text>
          <text className="sub-label" x="300" y="258" textAnchor="middle">Workflows · Automatisierung</text>
        </svg>
      </div>
    </div>
  );
}
