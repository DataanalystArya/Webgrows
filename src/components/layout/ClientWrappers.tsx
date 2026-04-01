"use client";

import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("@/components/3d/ParticleField"), { ssr: false });
const SplashCursor = dynamic(() => import("@/components/ui/SplashCursor"), { ssr: false });
const AIChatBot = dynamic(() => import("@/components/ui/AIChatBot"), { ssr: false });

export default function ClientWrappers() {
  return (
    <>
      <ParticleField />
      <SplashCursor />
      <AIChatBot />
    </>
  );
}
