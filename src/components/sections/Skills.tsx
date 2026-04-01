"use client";

import dynamic from "next/dynamic";
import { Suspense, useRef } from "react";
import { useInView } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { useMobilePerformance } from "@/hooks/useMobilePerformance";

// Dynamically import the scene to avoid SSR issues with Three.js/Rapier
const SkillBallsScene = dynamic(
  () => import("@/components/3d/SkillBalls"),
  { ssr: false }
);

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-neutral-500 text-sm animate-pulse">Loading 3D Skills...</div>
    </div>
  );
}

export default function SkillsSection() {
  const { dpr, shadows, isTouch, isMobile } = useMobilePerformance();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "100px" });

  return (
    <section id="skills" ref={sectionRef} className="relative h-screen bg-[#050505] overflow-hidden flex items-center justify-center">
      
      {/* Text Overlay — Floating on top of 3D Scene */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-fluid-h2 font-bold text-white mb-4 mix-blend-difference">
          Interactive Skills
        </h2>
        <p className="text-neutral-300 text-fluid-p max-w-xl mix-blend-difference">
          Move your cursor to interact with our floating skill matrix.
        </p>
      </div>

      {/* 3D Physics Canvas */}
      <div className="absolute inset-0 w-full h-full cursor-none">
        <Suspense fallback={<LoadingFallback />}>
          {isInView && (
            <Canvas
              camera={{ position: [0, 0, 20], fov: 35 }}
              dpr={dpr}
              shadows={shadows}
              gl={{ 
                alpha: true, 
                antialias: !isTouch, // Disable antialias on mobile for massive perf gain
                powerPreference: "high-performance", // Prioritize GPU
                precision: isMobile ? "lowp" : "highp" // Stability hint
              }}
              style={{ background: "#050505" }}
            >
              <color attach="background" args={["#050505"]} />
              <SkillBallsScene />
              <EffectComposer>
                <N8AO
                  distanceFalloff={1}
                  aoRadius={1}
                  intensity={isMobile ? 2 : 4}
                />
              </EffectComposer>
            </Canvas>
          )}
        </Suspense>
      </div>
      
    </section>
  );
}
