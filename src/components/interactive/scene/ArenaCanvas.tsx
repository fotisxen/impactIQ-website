"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const AMBER = "#f2934a";
const CYAN = "#3ecfcf";
const WOOD = "#a9672f";
const PAINT = "#0f2c40";
const LINE = "#f5f1e8";
const DARK = "#0c0d11";
const SEAT_A = "#2a2d33";
const SEAT_B = "#3a3e46";

// --- Court geometry, all derived from a few anchor constants so the
// baseline / key / free-throw line / hoop / three-point arc stay mutually
// consistent instead of being eyeballed independently.
const BASELINE_Z = -49;
const HALFCOURT_Z = 0;
const SIDELINE_X = 9.5;
const KEY_WIDTH = 8;
const KEY_LENGTH = 16;
const FT_LINE_Z = BASELINE_Z + KEY_LENGTH; // -33, far edge of the key
const KEY_CENTER_Z = BASELINE_Z + KEY_LENGTH / 2; // -41
const FT_CIRCLE_RADIUS = 4;
const BACKBOARD_Z = BASELINE_Z + 3.8; // backboard stands ~4 units off the baseline
const RIM_Z = BACKBOARD_Z + 1.5; // rim projects out in front of the backboard
const RIM_Y = 10;
const BACKBOARD_Y = 11;
const SUPPORT_POLE_Z = BASELINE_Z - 1.8; // behind the baseline, clear of the key

// Three-point line = an arc around the rim for the middle portion, then two
// straight "corner" segments running parallel to the sidelines down to the
// baseline — same two-piece shape a real court uses. The arc radius is
// picked so its apex clears the free-throw circle by a real margin (real
// courts never have the arc brushing the top of the key), and the sweep
// angle is solved so the arc's ends land just inside the sidelines rather
// than crossing them.
const THREE_PT_RADIUS = 21.5;
const THREE_PT_CORNER_X = SIDELINE_X - 0.3;
const THREE_PT_SWEEP = Math.asin(THREE_PT_CORNER_X / THREE_PT_RADIUS);

type Keyframe = {
  p: number;
  pos: [number, number, number];
  look: [number, number, number];
};

const KEYFRAMES: Keyframe[] = [
  { p: 0, pos: [0, 9, 46], look: [0, 5, 10] },
  { p: 0.35, pos: [0, 4, 14], look: [0, 3, -10] },
  { p: 0.7, pos: [11, 6, -8], look: [0, 9, -34] },
  { p: 1, pos: [0, 11, -50], look: [0, 11, -38] },
];

function cameraFrameAt(p: number) {
  const clamped = Math.min(1, Math.max(0, p));
  let i = 0;
  while (i < KEYFRAMES.length - 2 && clamped > KEYFRAMES[i + 1].p) i++;
  const a = KEYFRAMES[i];
  const b = KEYFRAMES[i + 1];
  const t = (clamped - a.p) / (b.p - a.p || 1);
  const pos = new THREE.Vector3(...a.pos).lerp(new THREE.Vector3(...b.pos), t);
  const look = new THREE.Vector3(...a.look).lerp(new THREE.Vector3(...b.look), t);
  return { pos, look };
}

function CameraRig({ progressRef }: { progressRef: React.RefObject<number> }) {
  const currentLook = useRef(new THREE.Vector3(...KEYFRAMES[0].look));

  useFrame(({ camera }) => {
    const { pos, look } = cameraFrameAt(progressRef.current ?? 0);
    camera.position.lerp(pos, 0.12);
    currentLook.current.lerp(look, 0.12);
    camera.lookAt(currentLook.current);
  });

  return null;
}

function Lighting() {
  return (
    <>
      <hemisphereLight args={["#8fa3c0", "#08090c", 1.1]} />
      <directionalLight
        position={[16, 32, 14]}
        intensity={2.4}
        color="#fff4e0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-24}
        shadow-camera-right={24}
        shadow-camera-top={26}
        shadow-camera-bottom={-56}
        shadow-camera-near={1}
        shadow-camera-far={90}
        shadow-bias={-0.0015}
      />
      <pointLight position={[0, 14, KEY_CENTER_Z]} color={AMBER} intensity={280} distance={50} decay={2} />
      <pointLight position={[0, 19, -19]} color={CYAN} intensity={150} distance={30} decay={2} />
      <pointLight position={[0, 8, 36]} color={AMBER} intensity={190} distance={35} decay={2} />
    </>
  );
}

// Deterministic PRNG (mulberry32) so texture generation stays a pure,
// side-effect-free function of its seed instead of calling Math.random().
function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createWoodTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const rand = seededRandom(1337);

  ctx.fillStyle = WOOD;
  ctx.fillRect(0, 0, size, size);

  const plankHeight = size / 14;
  ctx.strokeStyle = "rgba(20,10,0,0.25)";
  ctx.lineWidth = 2;
  for (let i = 0; i <= 14; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * plankHeight);
    ctx.lineTo(size, i * plankHeight);
    ctx.stroke();
  }

  for (let i = 0; i < 400; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const len = 20 + rand() * 70;
    const dark = rand() > 0.5;
    ctx.strokeStyle = dark
      ? `rgba(40,20,5,${0.05 + rand() * 0.08})`
      : `rgba(255,235,205,${0.05 + rand() * 0.08})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + len, y + (rand() - 0.5) * 3);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 11);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Points for the three-point arc, swept around the rim and clamped so it
// never crosses the sidelines — computed once, not re-derived per frame.
function threePointArcPoints() {
  const segments = 28;
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = -THREE_PT_SWEEP + (2 * THREE_PT_SWEEP * i) / segments;
    const x = THREE_PT_RADIUS * Math.sin(t);
    const z = RIM_Z + THREE_PT_RADIUS * Math.cos(t);
    points.push(new THREE.Vector3(x, 0.05, z));
  }
  return points;
}

// Where the arc hands off to the straight corner segments.
const THREE_PT_ARC_END_Z = RIM_Z + THREE_PT_RADIUS * Math.cos(THREE_PT_SWEEP);

// Module scope: created once when this client-only chunk loads, not during render.
const woodTexture = createWoodTexture();
const threePointCurve = new THREE.CatmullRomCurve3(threePointArcPoints());

function Tunnel() {
  return (
    <group>
      <mesh position={[-9.3, 7, 20]} receiveShadow>
        <boxGeometry args={[0.6, 14, 42]} />
        <meshStandardMaterial color={DARK} roughness={0.9} />
      </mesh>
      <mesh position={[9.3, 7, 20]} receiveShadow>
        <boxGeometry args={[0.6, 14, 42]} />
        <meshStandardMaterial color={DARK} roughness={0.9} />
      </mesh>
      <mesh position={[0, 14.2, 20]}>
        <boxGeometry args={[19, 0.6, 42]} />
        <meshStandardMaterial color={DARK} roughness={0.9} />
      </mesh>
    </group>
  );
}

function Court() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -10]} receiveShadow>
        <planeGeometry args={[26, 100]} />
        <meshStandardMaterial map={woodTexture ?? undefined} color={woodTexture ? "#ffffff" : WOOD} roughness={0.6} metalness={0.05} />
      </mesh>

      {/* court boundary: two sidelines running baseline -> just past halfcourt */}
      {[-SIDELINE_X, SIDELINE_X].map((x) => (
        <mesh key={x} position={[x, 0.03, (BASELINE_Z + HALFCOURT_Z + 1) / 2]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.06, HALFCOURT_Z + 1 - BASELINE_Z]} />
          <meshStandardMaterial color={LINE} roughness={0.5} />
        </mesh>
      ))}
      <mesh position={[0, 0.03, HALFCOURT_Z]} castShadow receiveShadow>
        <boxGeometry args={[SIDELINE_X * 2, 0.06, 0.3]} />
        <meshStandardMaterial color={LINE} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.03, BASELINE_Z]} castShadow receiveShadow>
        <boxGeometry args={[SIDELINE_X * 2, 0.06, 0.3]} />
        <meshStandardMaterial color={LINE} roughness={0.5} />
      </mesh>

      {/* key / paint — anchored to the baseline, extending to the free-throw line */}
      <mesh position={[0, 0.02, KEY_CENTER_Z]} receiveShadow>
        <boxGeometry args={[KEY_WIDTH, 0.05, KEY_LENGTH]} />
        <meshStandardMaterial color={PAINT} roughness={0.65} />
      </mesh>
      <mesh position={[0, 0.05, KEY_CENTER_Z]} castShadow receiveShadow>
        <boxGeometry args={[KEY_WIDTH + 0.3, 0.03, KEY_LENGTH + 0.3]} />
        <meshStandardMaterial color={LINE} roughness={0.5} wireframe />
      </mesh>

      {/* free-throw circle, centered on the free-throw line at the key's far edge */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, FT_LINE_Z]} castShadow receiveShadow>
        <torusGeometry args={[FT_CIRCLE_RADIUS, 0.13, 8, 40]} />
        <meshStandardMaterial color={LINE} roughness={0.5} />
      </mesh>

      {/* three-point arc, centered on the rim, apex well clear of the free-throw circle */}
      <mesh castShadow receiveShadow>
        <tubeGeometry args={[threePointCurve, 32, 0.13, 8, false]} />
        <meshStandardMaterial color={LINE} roughness={0.5} />
      </mesh>

      {/* straight corner segments carrying the three-point line down to the baseline */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * THREE_PT_CORNER_X, 0.03, (THREE_PT_ARC_END_Z + BASELINE_Z) / 2]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.26, 0.06, Math.abs(THREE_PT_ARC_END_Z - BASELINE_Z)]} />
          <meshStandardMaterial color={LINE} roughness={0.5} />
        </mesh>
      ))}

      {/* center circle at halfcourt */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, HALFCOURT_Z]} castShadow receiveShadow>
        <torusGeometry args={[6, 0.12, 8, 36]} />
        <meshStandardMaterial color={LINE} roughness={0.5} />
      </mesh>
    </group>
  );
}

function Hoop() {
  const armZ = (SUPPORT_POLE_Z + BACKBOARD_Z) / 2;
  const armLength = Math.abs(SUPPORT_POLE_Z - BACKBOARD_Z);

  return (
    <group>
      {/* support stanchion stands behind the baseline, clear of the key */}
      <mesh position={[0, 6.5, SUPPORT_POLE_Z]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 13, 12]} />
        <meshStandardMaterial color={DARK} metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, 12.5, armZ]} castShadow>
        <boxGeometry args={[0.5, 0.5, armLength]} />
        <meshStandardMaterial color={DARK} metalness={0.6} roughness={0.35} />
      </mesh>

      <mesh position={[0, BACKBOARD_Y, BACKBOARD_Z]} castShadow receiveShadow>
        <boxGeometry args={[6, 3.5, 0.15]} />
        <meshPhysicalMaterial
          color={LINE}
          transparent
          opacity={0.82}
          roughness={0.08}
          metalness={0}
          clearcoat={0.7}
          clearcoatRoughness={0.15}
        />
      </mesh>
      <mesh position={[0, RIM_Y, RIM_Z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.95, 0.09, 10, 28]} />
        <meshStandardMaterial color={AMBER} metalness={0.7} roughness={0.25} />
      </mesh>
    </group>
  );
}

function Scoreboard() {
  return (
    <group position={[0, 20, -19]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[10, 5, 5]} />
        <meshStandardMaterial color={DARK} roughness={0.55} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0, 2.55]}>
        <boxGeometry args={[8, 3, 0.15]} />
        <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, -2.55]}>
        <boxGeometry args={[8, 3, 0.15]} />
        <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={1.2} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Stands() {
  const tiers = [
    { y: 4, dx: 16, color: SEAT_A },
    { y: 10.5, dx: 18.5, color: SEAT_B },
    { y: 17, dx: 21, color: SEAT_A },
  ];
  return (
    <>
      {[-1, 1].map((side) =>
        tiers.map((tier, i) => (
          <mesh key={`${side}-${i}`} position={[side * tier.dx, tier.y, -22]} receiveShadow>
            <boxGeometry args={[5, 6, 62]} />
            <meshStandardMaterial color={tier.color} roughness={0.85} />
          </mesh>
        ))
      )}
    </>
  );
}

function Arena() {
  return (
    <group>
      <color attach="background" args={[DARK]} />
      <fog attach="fog" args={[DARK, 25, 100]} />
      <Lighting />
      <Tunnel />
      <Court />
      <Hoop />
      <Scoreboard />
      <Stands />
    </group>
  );
}

export function ArenaCanvas({ progressRef }: { progressRef: React.RefObject<number> }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      camera={{ fov: 50, near: 0.1, far: 200, position: KEYFRAMES[0].pos }}
    >
      <CameraRig progressRef={progressRef} />
      <Arena />
    </Canvas>
  );
}
