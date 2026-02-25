import { useEffect, useRef } from "react";

const NetworkGrid = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const nodes = [
    { x: 100, y: 60 }, { x: 250, y: 40 }, { x: 400, y: 80 }, { x: 550, y: 50 }, { x: 700, y: 90 },
    { x: 80, y: 180 }, { x: 220, y: 160 }, { x: 370, y: 200 }, { x: 520, y: 170 }, { x: 680, y: 210 },
    { x: 150, y: 300 }, { x: 300, y: 280 }, { x: 450, y: 320 }, { x: 600, y: 290 }, { x: 720, y: 330 },
    { x: 120, y: 400 }, { x: 280, y: 380 }, { x: 430, y: 420 }, { x: 580, y: 390 }, { x: 700, y: 430 },
  ];

  const edges = [
    [0,1],[1,2],[2,3],[3,4],[0,5],[1,6],[2,7],[3,8],[4,9],
    [5,6],[6,7],[7,8],[8,9],[5,10],[6,11],[7,12],[8,13],[9,14],
    [10,11],[11,12],[12,13],[13,14],[10,15],[11,16],[12,17],[13,18],[14,19],
    [15,16],[16,17],[17,18],[18,19],[0,6],[2,8],[6,12],[8,14],[11,17],[13,19],
  ];

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const lines = svg.querySelectorAll(".edge-line");
    const pulses = svg.querySelectorAll(".node-pulse");

    // Stagger edge animations
    lines.forEach((line, i) => {
      const el = line as SVGLineElement;
      el.style.animationDelay = `${i * 0.15}s`;
    });

    pulses.forEach((p, i) => {
      const el = p as SVGCircleElement;
      el.style.animationDelay = `${i * 0.3}s`;
    });
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 800 480" className="w-full max-w-5xl" fill="none">
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(263 80% 70%)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(263 80% 70%)" stopOpacity="0" />
        </radialGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {edges.map(([a, b], i) => (
        <line
          key={`e${i}`}
          className="edge-line"
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="hsl(263 60% 55%)"
          strokeWidth="1"
          strokeOpacity="0.25"
          style={{ animation: `pulse-edge 4s ease-in-out infinite`, animationDelay: `${i * 0.12}s` }}
        />
      ))}

      {nodes.map((n, i) => (
        <g key={`n${i}`}>
          {/* Glow ring */}
          <circle
            className="node-pulse"
            cx={n.x} cy={n.y} r="12"
            fill="url(#nodeGlow)"
            style={{ animation: `float-particle 4s ease-in-out infinite`, animationDelay: `${i * 0.25}s` }}
          />
          {/* Core */}
          <circle cx={n.x} cy={n.y} r="3" fill="hsl(263 80% 70%)" opacity="0.9" />
        </g>
      ))}

      <style>{`
        @keyframes pulse-edge {
          0%, 100% { stroke-opacity: 0.15; }
          50% { stroke-opacity: 0.45; }
        }
      `}</style>
    </svg>
  );
};

export default NetworkGrid;
