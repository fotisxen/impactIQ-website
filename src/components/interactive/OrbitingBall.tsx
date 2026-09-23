"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function rand(seed: number) {
  // Small deterministic PRNG so the pebbling looks identical on every load.
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Equirectangular basketball skin: the panel seams are drawn as longitude
// lines plus an equator; `dark` swaps in a bump-map palette (grooves + pebbles).
function buildSkin(dark: boolean) {
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
    g.addColorStop(0, "#cf6a1a");
    g.addColorStop(0.5, "#e7802a");
    g.addColorStop(1, "#c96317");
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

  // Seams.
  ctx.strokeStyle = dark ? "#000000" : "#1b0f08";
  ctx.lineWidth = dark ? 16 : 11;
  ctx.lineCap = "round";

  const line = (points: Array<[number, number]>) => {
    ctx.beginPath();
    points.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.stroke();
  };

  // Equator.
  line([[0, H / 2], [W, H / 2]]);
  // Meridian great circle (front and back of the ball).
  for (const u of [0, 0.5, 1]) line([[u * W, 0], [u * W, H]]);
  // The four curved "parenthesis" seams.
  for (const [u, dir] of [[0.125, -1], [0.375, 1], [0.625, -1], [0.875, 1]] as const) {
    const pts: Array<[number, number]> = [];
    for (let i = 0; i <= 64; i++) {
      const v = i / 64;
      pts.push([(u + dir * 0.06 * Math.sin(Math.PI * v)) * W, v * H]);
    }
    line(pts);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = dark ? THREE.NoColorSpace : THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

export function OrbitingBall({
  centerRef,
  size = 104,
}: {
  centerRef: React.RefObject<HTMLElement | null>;
  size?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const center = centerRef.current;
    if (!canvas || !center) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(size, size, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 20);
    camera.position.set(0, 0, 4.3);

    const colorMap = buildSkin(false);
    const bumpMap = buildSkin(true);
    const ball = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 48),
      new THREE.MeshStandardMaterial({
        map: colorMap,
        bumpMap,
        bumpScale: 2.2,
        roughness: 0.72,
        metalness: 0.02,
      })
    );
    ball.rotation.z = 0.35;
    scene.add(ball);

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const key = new THREE.DirectionalLight(0xfff1dd, 2.4);
    key.position.set(-3, 3, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x8fb2ff, 0.9);
    rim.position.set(3, -1, -3);
    scene.add(rim);

    let raf = 0;
    let visible = true;
    const t0 = performance.now();

    const place = (t: number) => {
      const panel = center.getBoundingClientRect();
      const host = canvas.parentElement!.getBoundingClientRect();
      const vw = document.documentElement.clientWidth;
      const cx = panel.left + panel.width / 2 - host.left;
      const cy = panel.top + panel.height / 2 - host.top;

      const wantRx = panel.width / 2 + size * 0.55;
      const maxRx = Math.min(panel.left + panel.width / 2, vw - (panel.left + panel.width / 2)) - size * 0.6;
      const rx = Math.max(size * 0.5, Math.min(wantRx, maxRx));
      const ry = panel.height * 0.24 + size * 0.5;

      // One orbit every 16s; the ellipse is tilted like a planetary orbit.
      const theta = reduceMotion ? 0.9 : (t / 16000) * Math.PI * 2;
      const tilt = -0.2;
      const ex = Math.cos(theta) * rx;
      const ey = Math.sin(theta) * ry;
      const x = cx + ex * Math.cos(tilt) - ey * Math.sin(tilt);
      const y = cy + ex * Math.sin(tilt) + ey * Math.cos(tilt);
      const depth = Math.sin(theta); // >0: passing in front of the panel

      const scale = 1 + depth * 0.2;
      canvas.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px) scale(${scale})`;
      canvas.style.zIndex = depth > 0 ? "30" : "0";
      canvas.style.opacity = String(0.82 + 0.18 * (depth * 0.5 + 0.5));
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = now - t0;
      ball.rotation.y = t * 0.0022;
      place(t);
      renderer.render(scene, camera);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(center);

    if (reduceMotion) {
      ball.rotation.y = 0.6;
      place(0);
      renderer.render(scene, camera);
      const onResize = () => {
        place(0);
        renderer.render(scene, camera);
      };
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        io.disconnect();
        colorMap.dispose();
        bumpMap.dispose();
        renderer.dispose();
      };
    }

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      colorMap.dispose();
      bumpMap.dispose();
      ball.geometry.dispose();
      (ball.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, [centerRef, size]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 will-change-transform"
      style={{ width: size, height: size }}
    />
  );
}
