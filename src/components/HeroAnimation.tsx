import { useEffect, useRef, useState } from 'react';

type SkillMode = 'all' | 'web' | 'marketing';

interface Node3D {
  baseX: number;
  baseY: number;
  baseZ: number;
  radius: number;
  color: string;
  category: 'core' | 'web' | 'marketing' | 'workflow';
  pulsePhase: number;
  label?: string;
}

interface Edge {
  from: number;
  to: number;
}

interface Signal {
  from: number;
  to: number;
  progress: number;
  speed: number;
  color: string;
  size: number;
}

const PORTFOLIO_MESSAGES = [
  'Web-Dev: React, TypeScript & High-Speed DOM',
  'Marketing: SEO, Google Ads & Web Analytics (GA4)',
  'UI/UX Design: Figma, Clean Systems & A11y',
  'Automatisierung: Prompt Engineering & KI-Workflows',
  'Performance First: 100% Responsive & Schnell',
  'Qualität: 5x Webmasters Europe e.V. zertifiziert'
];

export function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<SkillMode>('all');
  const [streamIndex, setStreamIndex] = useState(0);

  // Smooth telemetry ticker with fixed layout
  useEffect(() => {
    const interval = setInterval(() => {
      setStreamIndex((prev) => (prev + 1) % PORTFOLIO_MESSAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Main Canvas Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // High-DPI sizing via ResizeObserver without layout loops
    const updateSize = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      const newWidth = Math.floor(rect.width);
      const newHeight = Math.floor(rect.height);
      if (newWidth === 0 || newHeight === 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (width !== newWidth || height !== newHeight) {
        width = newWidth;
        height = newHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    // Build 3D nodes reflecting Robert Erbach's portfolio spectrum
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    const rawVertices: [number, number, number, string, 'core' | 'web' | 'marketing' | 'workflow', string?][] = [
      [-1, phi, 0, '#38bdf8', 'web', 'WEB DEV'],
      [1, phi, 0, '#60a5fa', 'web', 'UI / UX'],
      [-1, -phi, 0, '#4ade80', 'marketing', 'SEO & GA4'],
      [1, -phi, 0, '#a855f7', 'marketing', 'MARKETING'],
      [0, -1, phi, '#38bdf8', 'web', 'CODE'],
      [0, 1, phi, '#c084fc', 'workflow', 'KI-WORKFLOW'],
      [0, -1, -phi, '#fbbf24', 'marketing', 'E-COMMERCE'],
      [0, 1, -phi, '#22d3ee', 'web', 'SPEED'],
      [phi, 0, -1, '#818cf8', 'workflow', 'WORKFLOWS'],
      [phi, 0, 1, '#f472b6', 'marketing', 'CONTENT'],
      [-phi, 0, -1, '#34d399', 'web', 'FRONTEND'],
      [-phi, 0, 1, '#a78bfa', 'workflow', 'PROMPTS'],
      // Core Portfolio Center Node
      [0, 0, 0, '#38bdf8', 'core', 'PORTFOLIO'],
      // Inner supporting nodes
      [0.55, 0.55, 0.55, '#60a5fa', 'web'],
      [-0.55, -0.55, 0.55, '#4ade80', 'marketing'],
      [0.55, -0.55, -0.55, '#c084fc', 'workflow'],
      [-0.55, 0.55, -0.55, '#38bdf8', 'web'],
    ];

    const nodes: Node3D[] = rawVertices.map(([x, y, z, color, category, label]) => {
      return {
        baseX: x,
        baseY: y,
        baseZ: z,
        radius: label === 'PORTFOLIO' ? 5 : label ? 3.8 : 2.2,
        color,
        category,
        pulsePhase: Math.random() * Math.PI * 2,
        label,
      };
    });

    // Build edges
    const edges: Edge[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].baseX - nodes[j].baseX;
        const dy = nodes[i].baseY - nodes[j].baseY;
        const dz = nodes[i].baseZ - nodes[j].baseZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (i === 12 || j === 12) {
          if (dist < 2.1) edges.push({ from: i, to: j });
        } else if (dist < 2.05) {
          edges.push({ from: i, to: j });
        }
      }
    }

    // Signals traveling along edges
    const signals: Signal[] = [];
    for (let s = 0; s < 10; s++) {
      const edge = edges[Math.floor(Math.random() * edges.length)];
      signals.push({
        from: edge.from,
        to: edge.to,
        progress: Math.random(),
        speed: 0.007 + Math.random() * 0.01,
        color: Math.random() > 0.5 ? '#38bdf8' : '#a855f7',
        size: 2.0 + Math.random() * 1.6,
      });
    }

    // Ambient floating particles
    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * 2.2,
      y: (Math.random() - 0.5) * 2.2,
      z: (Math.random() - 0.5) * 1.4,
      size: 1 + Math.random() * 1.4,
      alpha: 0.2 + Math.random() * 0.4,
      speedX: (Math.random() - 0.5) * 0.002,
      speedY: (Math.random() - 0.5) * 0.002,
    }));

    // ROCK-SOLID CONTINUOUS ROTATION (Never resets or jumps)
    let continuousAngleY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    const autoSpeedY = 0.004;

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    const onMouseMove = (e: MouseEvent) => {
      if (!isFinePointer || !container) return;
      const rect = container.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltY = normX * 0.45;
      targetTiltX = -normY * 0.35;
    };

    const onMouseLeave = () => {
      targetTiltX = 0;
      targetTiltY = 0;
    };

    if (isFinePointer) {
      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseleave', onMouseLeave);
    }

    let time = 0;

    // Render loop
    const render = () => {
      time += 0.016;

      if (width === 0 || height === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      const minDim = Math.min(width, height);
      const isMobile = minDim < 400;
      const modelScale = isMobile ? minDim * 0.17 : minDim * 0.22;
      const fov = minDim * 0.95;
      const cameraZ = modelScale * 3.8;

      continuousAngleY += autoSpeedY;
      currentTiltX += (targetTiltX - currentTiltX) * 0.05;
      currentTiltY += (targetTiltY - currentTiltY) * 0.05;

      const rotY = continuousAngleY + currentTiltY;
      const rotX = 0.12 + Math.sin(time * 0.5) * 0.06 + currentTiltX;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Central soft radial glow (colored based on mode filter)
      let glowColor = 'rgba(56, 189, 248, 0.22)';
      if (mode === 'web') glowColor = 'rgba(56, 189, 248, 0.28)';
      if (mode === 'marketing') glowColor = 'rgba(74, 222, 128, 0.28)';

      const centralGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        8,
        centerX,
        centerY,
        modelScale * 1.9
      );
      centralGlow.addColorStop(0, glowColor);
      centralGlow.addColorStop(0.4, 'rgba(139, 92, 246, 0.1)');
      centralGlow.addColorStop(0.85, 'rgba(91, 140, 255, 0.02)');
      centralGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = centralGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, modelScale * 1.9, 0, Math.PI * 2);
      ctx.fill();

      // Orbital rings
      ctx.strokeStyle = mode === 'web' ? 'rgba(56, 189, 248, 0.3)' : mode === 'marketing' ? 'rgba(74, 222, 128, 0.3)' : 'rgba(56, 189, 248, 0.18)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, modelScale * 1.45, time * 0.25, time * 0.25 + Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
      ctx.setLineDash([8, 12]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, modelScale * 1.75, -time * 0.18, -time * 0.18 + Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Transform 3D nodes to 2D projected coordinates with active filter highlighting
      const projected = nodes.map((n) => {
        let isHighlighted = true;
        if (mode === 'web') {
          isHighlighted = n.category === 'web' || n.category === 'workflow' || n.category === 'core';
        } else if (mode === 'marketing') {
          isHighlighted = n.category === 'marketing' || n.category === 'workflow' || n.category === 'core';
        }

        const scaleMultiplier = isHighlighted ? 1.1 : 0.9;
        const bx = n.baseX * modelScale * scaleMultiplier;
        const by = n.baseY * modelScale * scaleMultiplier;
        const bz = n.baseZ * modelScale * scaleMultiplier;

        const x1 = bx * cosY + bz * sinY;
        const z1 = -bx * sinY + bz * cosY;
        const y2 = by * cosX - z1 * sinX;
        const z2 = by * sinX + z1 * cosX;

        const depth = cameraZ + z2;
        const pScale = fov / Math.max(depth, 30);

        let nodeAlpha = Math.min(Math.max((z2 + modelScale * 1.5) / (modelScale * 3), 0.3), 1);
        if (!isHighlighted) {
          nodeAlpha *= 0.22; // Dim non-matching nodes heavily so the filter effect is immediately obvious
        }

        return {
          px: centerX + x1 * pScale,
          py: centerY + y2 * pScale,
          pz: z2,
          pScale,
          alpha: nodeAlpha,
          isHighlighted,
          rawNode: n,
        };
      });

      // Ambient particle cloud
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < -1.1) p.x = 1.1;
        if (p.x > 1.1) p.x = -1.1;
        if (p.y < -1.1) p.y = 1.1;
        if (p.y > 1.1) p.y = -1.1;

        const bx = p.x * modelScale;
        const by = p.y * modelScale;
        const bz = p.z * modelScale;

        const x1 = bx * cosY + bz * sinY;
        const z1 = -bx * sinY + bz * cosY;
        const y2 = by * cosX - z1 * sinX;
        const z2 = by * sinX + z1 * cosX;

        const pScale = fov / Math.max(cameraZ + z2, 30);
        const px = centerX + x1 * pScale;
        const py = centerY + y2 * pScale;

        ctx.fillStyle = `rgba(147, 197, 253, ${p.alpha * 0.45})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size * pScale * 0.65, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Edges
      edges.forEach((edge) => {
        const p1 = projected[edge.from];
        const p2 = projected[edge.to];
        if (!p1 || !p2) return;

        let edgeAlpha = (p1.alpha + p2.alpha) * 0.4;
        if (!p1.isHighlighted || !p2.isHighlighted) {
          edgeAlpha *= 0.15;
        }

        const edgeGrad = ctx.createLinearGradient(p1.px, p1.py, p2.px, p2.py);
        edgeGrad.addColorStop(0, `rgba(56, 189, 248, ${edgeAlpha})`);
        edgeGrad.addColorStop(1, `rgba(168, 85, 247, ${edgeAlpha * 0.8})`);

        ctx.strokeStyle = edgeGrad;
        ctx.lineWidth = Math.max(0.75, 1.1 * ((p1.pScale + p2.pScale) * 0.5));
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();
      });

      // Signals
      signals.forEach((sig) => {
        sig.progress += sig.speed;
        if (sig.progress >= 1) {
          sig.progress = 0;
          const newEdge = edges[Math.floor(Math.random() * edges.length)];
          sig.from = newEdge.from;
          sig.to = newEdge.to;
        }

        const p1 = projected[sig.from];
        const p2 = projected[sig.to];
        if (!p1 || !p2) return;

        if (!p1.isHighlighted && !p2.isHighlighted) return;

        const sx = p1.px + (p2.px - p1.px) * sig.progress;
        const sy = p1.py + (p2.py - p1.py) * sig.progress;
        const sScale = (p1.pScale + p2.pScale) * 0.5;

        const halo = ctx.createRadialGradient(sx, sy, 0, sx, sy, sig.size * 3 * sScale);
        halo.addColorStop(0, sig.color);
        halo.addColorStop(1, 'transparent');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(sx, sy, sig.size * 3 * sScale, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(sx, sy, sig.size * 0.65 * sScale, 0, Math.PI * 2);
        ctx.fill();
      });

      // Sort back-to-front
      const sortedProjected = [...projected].sort((a, b) => a.pz - b.pz);

      // Draw Nodes & Labels
      sortedProjected.forEach((p) => {
        const { rawNode, px, py, pScale, alpha, isHighlighted } = p;
        const pulse = 1 + Math.sin(time * 3 + rawNode.pulsePhase) * (isHighlighted ? 0.22 : 0.05);
        const radius = rawNode.radius * pScale * pulse;

        // Outer glow (brighter for active filter)
        const glowRadius = isHighlighted ? radius * 3.2 : radius * 1.5;
        const glow = ctx.createRadialGradient(px, py, 1, px, py, glowRadius);
        glow.addColorStop(0, isHighlighted ? rawNode.color : 'rgba(100,100,100,0.2)');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Node circle
        ctx.fillStyle = isHighlighted ? '#ffffff' : 'rgba(200,200,200,0.5)';
        ctx.beginPath();
        ctx.arc(px, py, radius * (isHighlighted ? 0.7 : 0.5), 0, Math.PI * 2);
        ctx.fill();

        // Safe label drawing (dimmed if not highlighted)
        if (rawNode.label) {
          const fontSize = isMobile ? 8.5 : Math.max(9, Math.floor(10 * pScale));
          ctx.font = `600 ${fontSize}px 'JetBrains Mono', monospace`;
          ctx.fillStyle = isHighlighted ? `rgba(240, 246, 255, ${Math.min(alpha * 1.3, 0.98)})` : `rgba(150, 160, 180, ${Math.max(alpha * 0.4, 0.15)})`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';

          const textMetrics = ctx.measureText(rawNode.label);
          const halfTextWidth = textMetrics.width / 2;
          const safeX = Math.max(halfTextWidth + 6, Math.min(width - halfTextWidth - 6, px));

          ctx.fillText(rawNode.label, safeX, py - radius * 1.5);
        }
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      if (isFinePointer) {
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, [mode]);

  return (
    <div
      ref={containerRef}
      className="hero-anim-box"
      role="region"
      aria-label="Interaktive Portfolio-Skill-Matrix"
    >
      {/* Freely floating canvas */}
      <canvas ref={canvasRef} className="hero-anim-canvas" />

      {/* Floating HUD Top Capsule */}
      <div className="hud-top-capsule">
        <div className="hud-status">
          <span className="hud-dot" aria-hidden="true" />
          <span className="hud-tag font-mono">PORTFOLIO</span>
        </div>

        {/* Compact Mode Filter Pills */}
        <div className="hud-modes" role="tablist" aria-label="Skill-Filter">
          <button
            type="button"
            className={`hud-mode-btn ${mode === 'all' ? 'active' : ''}`}
            onClick={() => setMode('all')}
            title="Alle Kompetenzen anzeigen"
          >
            Alle
          </button>
          <button
            type="button"
            className={`hud-mode-btn ${mode === 'web' ? 'active' : ''}`}
            onClick={() => setMode('web')}
            title="Frontend, Web-Dev &amp; UI/UX"
          >
            Web
          </button>
          <button
            type="button"
            className={`hud-mode-btn ${mode === 'marketing' ? 'active' : ''}`}
            onClick={() => setMode('marketing')}
            title="Online Marketing, SEO &amp; Analytics"
          >
            Marketing
          </button>
        </div>
      </div>

      {/* Floating HUD Bottom Capsule */}
      <div className="hud-bottom-capsule">
        <span className="hud-prompt-sym font-mono">&gt;</span>
        <div className="hud-stream-marquee">
          <span className="hud-stream-text font-mono">
            {PORTFOLIO_MESSAGES[streamIndex]}
          </span>
        </div>
      </div>
    </div>
  );
}
