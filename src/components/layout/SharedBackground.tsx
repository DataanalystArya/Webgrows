"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useInView } from "framer-motion";
import { useMobilePerformance } from "@/hooks/useMobilePerformance";

const Spline = dynamic(() => import("@splinetool/react-spline"), { 
  ssr: false,
});

export default function SharedBackground() {
  const { isMobile } = useMobilePerformance();
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isMobile) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-0 opacity-50 mix-blend-screen pointer-events-none overflow-hidden"
      style={{ 
        maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)"
      }}
    >
      {isInView && (
        <div className="absolute inset-0" style={{ transform: "scale(1.1)", transformOrigin: "center center" }}>
          <Spline 
            scene="https://prod.spline.design/6HevwINfzWCvmYi1/scene.splinecode"
            className="w-full h-full bg-transparent"
          />
        </div>
      )}
    </div>
  );
}
