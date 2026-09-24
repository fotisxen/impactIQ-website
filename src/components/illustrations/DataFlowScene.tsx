const NODES = [500, 1000, 1500, 2000, 2500];

function CameraIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x - 30}, ${y - 24})`} stroke="currentColor" strokeWidth={3} fill="none">
      <rect x={0} y={10} width={60} height={38} rx={6} />
      <rect x={18} y={0} width={24} height={12} rx={3} />
      <circle cx={30} cy={30} r={13} />
    </g>
  );
}

function ChipIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x - 26}, ${y - 26})`} stroke="currentColor" strokeWidth={3} fill="none">
      <rect x={8} y={8} width={36} height={36} rx={4} />
      {[14, 24, 34].map((p) => (
        <g key={p}>
          <line x1={0} y1={p} x2={8} y2={p} />
          <line x1={44} y1={p} x2={52} y2={p} />
          <line x1={p - 6} y1={0} x2={p - 6} y2={8} />
          <line x1={p - 6} y1={44} x2={p - 6} y2={52} />
        </g>
      ))}
    </g>
  );
}

function GaugeIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y + 10})`} stroke="currentColor" strokeWidth={3.5} fill="none" strokeLinecap="round">
      <path d="M -28 4 A 28 28 0 0 1 28 4" />
      <line x1={0} y1={4} x2={14} y2={-16} />
      <circle cx={0} cy={4} r={3} fill="currentColor" />
    </g>
  );
}

function DocIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x - 22}, ${y - 28})`} stroke="currentColor" strokeWidth={3} fill="none">
      <rect x={0} y={0} width={44} height={56} rx={4} />
      {[14, 24, 34, 44].map((ly) => (
        <line key={ly} x1={8} y1={ly} x2={36} y2={ly} strokeWidth={2.5} />
      ))}
    </g>
  );
}

function ChartIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`} stroke="currentColor" strokeWidth={2.5} fill="none">
      {[0, 72, 144, 216, 288].map((deg, i) => {
        const rad = (deg * Math.PI) / 180 - Math.PI / 2;
        const r = 22 - (i % 2) * 6;
        return <line key={deg} x1={0} y1={0} x2={r * Math.cos(rad)} y2={r * Math.sin(rad)} />;
      })}
      <circle cx={0} cy={0} r={26} strokeOpacity={0.4} />
    </g>
  );
}

const ICONS = [CameraIcon, ChipIcon, GaugeIcon, DocIcon, ChartIcon];
const COLORS = ["var(--accent-amber)", "var(--accent-cyan)", "var(--accent-amber)", "var(--accent-cyan)", "var(--accent-amber)"];

export function DataFlowScene() {
  return (
    <svg viewBox="0 0 3000 700" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <line x1={150} y1={350} x2={2850} y2={350} stroke="currentColor" strokeOpacity={0.15} strokeWidth={2} />
      {Array.from({ length: 54 }, (_, i) => 150 + i * 50).map((x) => (
        <line key={x} x1={x} y1={344} x2={x + 24} y2={344} stroke="currentColor" strokeOpacity={0.12} strokeWidth={2} />
      ))}

      {NODES.map((x, i) => {
        const Icon = ICONS[i];
        return (
          <g key={x}>
            <circle cx={x} cy={350} r={70} fill="none" stroke={COLORS[i]} strokeOpacity={0.5} strokeWidth={3} />
            <circle cx={x} cy={350} r={70} fill={COLORS[i]} fillOpacity={0.06} />
            <g color={COLORS[i]}>
              <Icon x={x} y={350} />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
