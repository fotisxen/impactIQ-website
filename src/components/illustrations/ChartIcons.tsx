export function RadarChartIcon() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      {[0.25, 0.5, 0.75, 1].map((r) => (
        <polygon
          key={r}
          points={pentagonPoints(50, 50, 38 * r)}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.18}
          strokeWidth={1}
        />
      ))}
      <polygon
        points={pentagonPoints(50, 50, 38, [0.9, 0.55, 0.75, 0.95, 0.62])}
        fill="var(--accent-amber)"
        fillOpacity={0.25}
        stroke="var(--accent-amber)"
        strokeWidth={2}
      />
    </svg>
  );
}

function pentagonPoints(cx: number, cy: number, r: number, scale = [1, 1, 1, 1, 1]) {
  const points = [];
  for (let i = 0; i < 5; i++) {
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    const radius = r * scale[i];
    points.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`);
  }
  return points.join(" ");
}

export function ShotChartIcon() {
  const makes = [
    [30, 22],
    [50, 14],
    [70, 22],
    [18, 44],
    [82, 44],
    [50, 60],
  ];
  const misses = [
    [40, 30],
    [62, 32],
    [26, 58],
    [74, 58],
  ];
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <path
        d="M 10 88 L 10 20 A 40 40 0 0 1 90 20 L 90 88"
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.25}
        strokeWidth={1.5}
      />
      <line x1={10} y1={88} x2={90} y2={88} stroke="currentColor" strokeOpacity={0.25} strokeWidth={1.5} />
      <rect x={38} y={68} width={24} height={20} fill="none" stroke="currentColor" strokeOpacity={0.2} strokeWidth={1.5} />
      {makes.map(([x, y], i) => (
        <circle key={`m${i}`} cx={x} cy={y} r={3.5} fill="var(--accent-amber)" />
      ))}
      {misses.map(([x, y], i) => (
        <circle
          key={`x${i}`}
          cx={x}
          cy={y}
          r={3.5}
          fill="none"
          stroke="var(--accent-cyan)"
          strokeWidth={1.5}
        />
      ))}
    </svg>
  );
}

export function WinProbabilityIcon() {
  const path =
    "M 8 50 L 16 46 L 24 54 L 32 40 L 40 44 L 48 26 L 56 34 L 64 20 L 72 28 L 80 16 L 92 14";
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <line x1={8} y1={50} x2={92} y2={50} stroke="currentColor" strokeOpacity={0.25} strokeDasharray="3 3" strokeWidth={1.2} />
      <path d={`${path} L 92 50 L 8 50 Z`} fill="var(--accent-amber)" fillOpacity={0.15} stroke="none" />
      <path d={path} fill="none" stroke="var(--accent-amber)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RidgeplotIcon() {
  const ridge = (baseline: number, amp: number) =>
    `M 6 ${baseline} C 20 ${baseline}, 26 ${baseline - amp}, 38 ${baseline - amp * 1.3} S 58 ${baseline}, 68 ${baseline - amp * 0.6} S 88 ${baseline - amp}, 94 ${baseline} L 94 ${baseline + 4} L 6 ${baseline + 4} Z`;
  const rows = [
    { y: 34, amp: 16, color: "var(--accent-cyan)" },
    { y: 54, amp: 20, color: "var(--accent-amber)" },
    { y: 74, amp: 14, color: "currentColor" },
  ];
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      {rows.map((row, i) => (
        <path
          key={i}
          d={ridge(row.y, row.amp)}
          fill={row.color}
          fillOpacity={row.color === "currentColor" ? 0.15 : 0.35}
          stroke={row.color}
          strokeOpacity={row.color === "currentColor" ? 0.4 : 1}
          strokeWidth={1.5}
        />
      ))}
    </svg>
  );
}

export function BumpChartIcon() {
  const lanes = [
    { color: "var(--accent-amber)", points: [12, 30, 55] },
    { color: "var(--accent-cyan)", points: [30, 12, 30] },
    { color: "currentColor", points: [55, 65, 12] },
    { color: "currentColor", points: [65, 55, 65] },
  ];
  const xs = [14, 50, 86];
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      {lanes.map((lane, i) => (
        <g key={i}>
          <polyline
            points={lane.points.map((y, j) => `${xs[j]},${y}`).join(" ")}
            fill="none"
            stroke={lane.color}
            strokeOpacity={lane.color === "currentColor" ? 0.35 : 1}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {lane.points.map((y, j) => (
            <circle key={j} cx={xs[j]} cy={y} r={3} fill={lane.color} fillOpacity={lane.color === "currentColor" ? 0.35 : 1} />
          ))}
        </g>
      ))}
    </svg>
  );
}

export function GravityMapIcon() {
  const blobs = [
    { cx: 34, cy: 40, r: 20, color: "var(--accent-amber)" },
    { cx: 68, cy: 62, r: 16, color: "var(--accent-cyan)" },
  ];
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <rect x={8} y={8} width={84} height={84} fill="none" stroke="currentColor" strokeOpacity={0.15} strokeWidth={1.5} />
      {blobs.map((b, i) => (
        <g key={i}>
          {[1, 0.65, 0.35].map((s) => (
            <circle key={s} cx={b.cx} cy={b.cy} r={b.r * s} fill={b.color} fillOpacity={0.12} />
          ))}
        </g>
      ))}
      <path
        d="M 30 78 Q 50 60 66 66"
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.5}
        strokeWidth={1.5}
        markerEnd="url(#arrow)"
      />
      <defs>
        <marker id="arrow" markerWidth={6} markerHeight={6} refX={4} refY={3} orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" fillOpacity={0.5} />
        </marker>
      </defs>
    </svg>
  );
}
