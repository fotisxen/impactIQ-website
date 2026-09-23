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

// A real basketball has eight panels: two orthogonal great circles plus a
// looping, tennis-ball-style curve that weaves around them. Seams are built
// as true 3D curves on the unit sphere and rasterised into the texture, so
// every crossing lands where it would on a real ball.
const A = 0.72;
const B = 1 - A;
const C = 2 * Math.sqrt(A * B);

function tennisCurve(t: number): V3 {
  return [A * Math.cos(t) + B * Math.cos(3 * t), A * Math.sin(t) - B * Math.sin(3 * t), C * Math.sin(2 * t)];
}

function greatCircleXZ(t: number): V3 {
  return [Math.cos(t), 0, Math.sin(t)];
}

function greatCircleYZ(t: number): V3 {
  return [0, Math.cos(t), Math.sin(t)];
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

export type SeamLayout = { ax: number; ay: number; axis: "x" | "y" | "z" };

export const DEFAULT_LAYOUT: SeamLayout = { ax: 0.9, ay: 0.6, axis: "y" };

function permute(p: V3, axis: "x" | "y" | "z"): V3 {
  if (axis === "z") return p;
  if (axis === "y") return [p[0], p[2], p[1]];
  return [p[2], p[1], p[0]];
}

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

  const drawCurve = (fn: (t: number) => V3, steps: number) => {
    let prevX = 0;
    let started = false;
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const p = orient(fn((i / steps) * Math.PI * 2), layout.ax, layout.ay);
      const len = Math.hypot(p[0], p[1], p[2]);
      const x = p[0] / len;
      const y = p[1] / len;
      const z = p[2] / len;
      const theta = Math.acos(Math.max(-1, Math.min(1, y)));
      let phi = Math.atan2(z, -x);
      if (phi < 0) phi += Math.PI * 2;
      const cx = (phi / (Math.PI * 2)) * W;
      const cy = (theta / Math.PI) * H;
      if (!started || Math.abs(cx - prevX) > W / 2) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
      started = true;
      prevX = cx;
    }
    ctx.stroke();
  };

  drawCurve(greatCircleXZ, 720);
  drawCurve(greatCircleYZ, 720);
  drawCurve((t) => permute(tennisCurve(t), layout.axis), 1200);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = dark ? THREE.NoColorSpace : THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}
