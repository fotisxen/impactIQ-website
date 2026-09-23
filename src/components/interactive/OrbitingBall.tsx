"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { buildSkin } from "./basketballSkin";

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
