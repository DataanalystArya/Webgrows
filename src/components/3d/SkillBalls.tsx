"use client";

import { useRef, useMemo, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Physics,
  RigidBody,
  BallCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

/* ─── Config ─── */
const BALL_COUNT = 48;
const POINTER_SIZE = 2;
const CENTER_PULL_XZ = -50;
const CENTER_PULL_Y = -150;

const TECH_ITEMS: { label: string; bg: string; fg: string }[] = [
  { label: "React",      bg: "#20232a", fg: "#61dafb" },
  { label: "Next.js",    bg: "#000000", fg: "#ffffff" },
  { label: "Node.js",    bg: "#333333", fg: "#68a063" },
  { label: "Express",    bg: "#1a1a1a", fg: "#ffffff" },
  { label: "MongoDB",    bg: "#1a2a1a", fg: "#4db33d" },
  { label: "MySQL",      bg: "#00546b", fg: "#ffffff" },
  { label: "TypeScript", bg: "#3178c6", fg: "#ffffff" },
  { label: "JavaScript", bg: "#f7df1e", fg: "#323330" },
  { label: "HTML",       bg: "#e34c26", fg: "#ffffff" },
  { label: "CSS",        bg: "#264de4", fg: "#ffffff" },
  { label: "Tailwind",   bg: "#0f172a", fg: "#38bdf8" },
  { label: "Three.js",   bg: "#000000", fg: "#ffffff" },
  { label: "GSAP",       bg: "#88ce02", fg: "#0e100f" },
  { label: "Firebase",   bg: "#1a1a2e", fg: "#ffca28" },
  { label: "Git",        bg: "#f05032", fg: "#ffffff" },
  { label: "Vercel",     bg: "#000000", fg: "#ffffff" },
  { label: "OpenAI",     bg: "#000000", fg: "#10a37f" },
  { label: "WebGL",      bg: "#990000", fg: "#ffffff" },
  { label: "WordPress",  bg: "#21759b", fg: "#ffffff" },
  { label: "GitHub",     bg: "#181717", fg: "#ffffff" },
  { label: "Framer",     bg: "#0055ff", fg: "#ffffff" },
  { label: "Figma",      bg: "#1e1e1e", fg: "#a259ff" },
  { label: "Python",     bg: "#306998", fg: "#ffd43b" },
  { label: "Docker",     bg: "#0db7ed", fg: "#ffffff" },
];

/* ─── Generate a canvas texture for a tech label ─── */
function createLabelTexture(label: string, bg: string, fg: string): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Circular background
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();

  // Border ring
  ctx.strokeStyle = fg;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 6, 0, Math.PI * 2);
  ctx.stroke();

  // Inner glow ring
  ctx.strokeStyle = fg + "40";
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 24, 0, Math.PI * 2);
  ctx.stroke();

  // Label text
  const fontSize = label.length > 6 ? 56 : 72;
  ctx.fillStyle = fg;
  ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, size / 2, size / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/* ─── Invisible Pointer Collider ─── */
function Pointer() {
  const ref = useRef<RapierRigidBody>(null);
  const { viewport } = useThree();
  const targetVec = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ pointer }) => {
    if (!ref.current) return;
    targetVec.set(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0
    );
    ref.current.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody type="kinematicPosition" ref={ref} colliders={false}>
      <BallCollider args={[POINTER_SIZE]} />
    </RigidBody>
  );
}

/* ─── Individual Skill Sphere ─── */
function Sphere({
  position,
  tech,
}: {
  position: [number, number, number];
  tech: { label: string; bg: string; fg: string };
}) {
  const api = useRef<RapierRigidBody>(null);
  const scale = useMemo(() => 0.6 + Math.random() * 0.5, []);

  // Memoize the texture so it's created once
  const texture = useMemo(
    () => createLabelTexture(tech.label, tech.bg, tech.fg),
    [tech]
  );

  // Magnetic center pull — every frame, push ball toward origin
  useFrame((_, delta) => {
    if (!api.current) return;
    const t = api.current.translation();
    const len = Math.sqrt(t.x * t.x + t.y * t.y + t.z * t.z);
    if (len < 0.01) return;

    // Normalized direction * force strength
    const impulse = {
      x: (t.x / len) * CENTER_PULL_XZ * delta * scale,
      y: (t.y / len) * CENTER_PULL_Y * delta * scale,
      z: (t.z / len) * CENTER_PULL_XZ * delta * scale,
    };
    api.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      ref={api}
      colliders={false}
      position={position}
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      mass={scale}
    >
      <BallCollider args={[scale * 0.9]} />
      <mesh scale={scale} castShadow>
        <sphereGeometry args={[1, 48, 48]} />
        <meshPhysicalMaterial
          map={texture}
          roughness={0.15}
          metalness={0.6}
          clearcoat={1}
          clearcoatRoughness={0.08}
          emissive={tech.fg}
          emissiveIntensity={0.08}
          envMapIntensity={1.5}
        />
      </mesh>
    </RigidBody>
  );
}

/* ─── Main Scene Export ─── */
export default function SkillBallsScene() {
  // Generate deterministic initial positions spread around center
  const spheres = useMemo(() => {
    const result = [];
    for (let i = 0; i < BALL_COUNT; i++) {
      const tech = TECH_ITEMS[i % TECH_ITEMS.length];
      const angle = (i / BALL_COUNT) * Math.PI * 2;
      const radius = 3 + Math.random() * 5;
      const position: [number, number, number] = [
        Math.cos(angle) * radius + (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
      ];
      result.push({ id: i, tech, position });
    }
    return result;
  }, []);

  return (
    <Physics gravity={[0, 0, 0]}>
      <Environment preset="city" />
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-10, -5, 5]} intensity={0.3} color="#60a5fa" />
      <pointLight position={[0, 0, 10]} intensity={0.5} color="#00ffcc" distance={30} />

      <Pointer />

      {spheres.map((s) => (
        <Sphere key={s.id} position={s.position} tech={s.tech} />
      ))}
    </Physics>
  );
}
