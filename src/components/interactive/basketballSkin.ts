import * as THREE from "three";

type V3 = [number, number, number];

function rand(seed: number) {
  // Small deterministic PRNG so the pebbling looks identical on every load.
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// A real basketball: two great circles that cross at a right angle (the
// "cross", running edge to edge), plus one smooth round loop around each
// side pole. Each loop is elongated along the line between the front and
// back crosses, so it comes close to the cross at BOTH the front and the
// back (about 16 degrees away), and it bows out toward the ball's edge in
// between. From the front or the back you see the same "( )" pair beside
// the cross; from the side you see an arch above and below the horizontal
// line. That makes eight panels of nearly equal size. The proportions were
// fitted to photographs of a real ball. Seams are true 3D curves rasterised
// into the texture.

// Angular reach of a side loop measured from its pole: toward the front and
// back crosses (a), and toward the top and bottom (b).
const LOOP_TOWARD_CROSS = (74 * Math.PI) / 180; // leaves 16 degrees to the cross
const LOOP_TOWARD_EDGE = (44 * Math.PI) / 180;

function greatCircleXZ(t: number): V3 {
  return [Math.cos(t), 0, Math.sin(t)];
}

function greatCircleYZ(t: number): V3 {
  return [0, Math.cos(t), Math.sin(t)];
}

// side = +1 for the right-hand loop, -1 for the left-hand one.
function sideLoop(side: number): (t: number) => V3 {
  const a = LOOP_TOWARD_CROSS;
  const b = LOOP_TOWARD_EDGE;
  return (t) => {
    // Distance from the pole at angle t: an ellipse in polar form.
    const r = (a * b) / Math.sqrt(b * b * Math.cos(t) ** 2 + a * a * Math.sin(t) ** 2);
    return [side * Math.cos(r), Math.sin(r) * Math.sin(t), Math.sin(r) * Math.cos(t)];
  };
}

// Rotates the whole seam network so the texture's poles (where an
// equirectangular map pinches) sit in the middle of a panel, not on a seam.
function orient(p: V3, ax: number, ay: number): V3 {
  const [x, y, z] = p;
  const cy = Math.cos(ay);
  const sy = Math.sin(ay);
  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;
  const cx = Math.cos(ax);
  const sx = Math.sin(ax);
  return [x1, y * cx - z1 * sx, y * sx + z1 * cx];
}

export type SeamLayout = { ax: number; ay: number };

// Chosen numerically: every seam stays at least ~22 degrees from the
// texture's poles, where an equirectangular map pinches lines to nothing.
export const DEFAULT_LAYOUT: SeamLayout = { ax: 0.4, ay: 4.72 };

export function buildSkin(dark: boolean, layout: SeamLayout = DEFAULT_LAYOUT) {
  const W = 2048;
  const H = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const rnd = rand(dark ? 7 : 42);

  if (dark) {
    ctx.fillStyle = "#b0b0b0";
    ctx.fillRect(0, 0, W, H);
  } else {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#d4701e");
    g.addColorStop(0.5, "#ec8630");
    g.addColorStop(1, "#cc6619");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  // Leather pebbling.
  for (let i = 0; i < 90000; i++) {
    const x = rnd() * W;
    const y = rnd() * H;
    const r = 1.2 + rnd() * 1.8;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    if (dark) {
      ctx.fillStyle = `rgba(20,20,20,${0.25 + rnd() * 0.35})`;
    } else {
      ctx.fillStyle = rnd() > 0.5 ? `rgba(90,35,5,${0.1 + rnd() * 0.12})` : `rgba(255,190,120,${0.06 + rnd() * 0.08})`;
    }
    ctx.fill();
  }

  ctx.strokeStyle = dark ? "#000000" : "#170d07";
  ctx.lineWidth = dark ? 17 : 12;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // `span` is how far t runs (a full turn: all four seams are closed loops).
  const drawCurve = (fn: (t: number) => V3, steps: number, span: number) => {
    // Unwrap longitude so the polyline is continuous, then stamp it at every
    // horizontal offset that can land on the canvas. That keeps a seam from
    // breaking where the texture's left and right edges meet.
    const xs: number[] = [];
    const ys: number[] = [];
    let prev = 0;
    let turns = 0;
    for (let i = 0; i <= steps; i++) {
      const p = orient(fn((i / steps) * span), layout.ax, layout.ay);
      const len = Math.hypot(p[0], p[1], p[2]);
      const theta = Math.acos(Math.max(-1, Math.min(1, p[1] / len)));
      let phi = Math.atan2(p[2] / len, -p[0] / len);
      if (phi < 0) phi += Math.PI * 2;
      if (i > 0) {
        if (phi - prev > Math.PI) turns -= 1;
        else if (prev - phi > Math.PI) turns += 1;
      }
      prev = phi;
      xs.push(((phi + turns * Math.PI * 2) / (Math.PI * 2)) * W);
      ys.push((theta / Math.PI) * H);
    }
    for (let k = -2; k <= 2; k++) {
      ctx.beginPath();
      for (let i = 0; i < xs.length; i++) {
        if (i === 0) ctx.moveTo(xs[i] + k * W, ys[i]);
        else ctx.lineTo(xs[i] + k * W, ys[i]);
      }
      ctx.stroke();
    }
  };

  drawCurve(greatCircleXZ, 720, Math.PI * 2);
  drawCurve(greatCircleYZ, 720, Math.PI * 2);
  drawCurve(sideLoop(1), 1440, Math.PI * 2);
  drawCurve(sideLoop(-1), 1440, Math.PI * 2);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = dark ? THREE.NoColorSpace : THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}
