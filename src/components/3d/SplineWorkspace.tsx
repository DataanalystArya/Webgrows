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
      
      {/* 
        CLIPPING HACK:
        The "Built with Spline" logo is in the bottom-right corner.
        By making the viewer 50px taller than its container and using overflow-hidden, 
        the bottom area (where the logo sits) is clipped out of view.
      */}
      <div className="absolute inset-0 bottom-[-50px]">
        <Spline 
          scene="https://prod.spline.design/vVsO7-0RRvAv7sWb/scene.splinecode"
          className="w-full h-full pointer-events-none"
        />
      </div>
      
      {/* Overlay to catch mouse events if needed, but Spline handles its own */}
      <div className="absolute inset-0 pointer-events-none z-[3]" />
    </div>
  );
}
