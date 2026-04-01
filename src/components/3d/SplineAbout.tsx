"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

export default function SplineAbout() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full relative group pointer-events-auto flex items-center justify-center">
      {/* 
        EXPANDED VIEW & SURGICAL CLIPPING:
        - scale(1.15): Fills more horizontal space.
        - mask-image: Smoothly fades edges so rigid background borders aren't visible
        - clip-path: inset(0 0 50px 0): Surgically cuts the bottom 50px to hide branding.
      */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          mixBlendMode: "screen",
          transform: "scale(1.15)",
          transformOrigin: "center center",
          clipPath: "inset(0 0 45px 0)",
          WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 80%)",
          maskImage: "radial-gradient(circle at center, black 40%, transparent 80%)",
        }}
      >
        <div 
          className="w-full h-full"
          dangerouslySetInnerHTML={{ __html: `<spline-viewer url="https://prod.spline.design/mAfb25evdOyzh4Es/scene.splinecode" class="w-full h-full" loading="lazy"></spline-viewer>` }} 
        />
      </div>
    </div>
  );
}
