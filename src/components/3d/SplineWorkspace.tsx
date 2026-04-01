"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

export default function SplineWorkspace() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full relative group preserve-3d overflow-hidden rounded-3xl">
      {/* Container for the spline viewer with some glow effects */}
      <div className="absolute inset-0 bg-purple-500/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-[2]" />
      
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
        <div className="absolute inset-0 bottom-[-50px]">
        <div 
          className="w-full h-full"
          dangerouslySetInnerHTML={{ __html: `<spline-viewer url="https://prod.spline.design/vVsO7-0RRvAv7sWb/scene.splinecode" class="w-full h-full" loading="lazy"></spline-viewer>` }} 
        />
      </div>
      </div>
      
      {/* Overlay to catch mouse events if needed, but Spline handles its own */}
      <div className="absolute inset-0 pointer-events-none z-[3]" />
    </div>
  );
}
