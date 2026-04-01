"use client";

import { useState, useEffect } from "react";

export function useMobilePerformance() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return {
    isMobile,
    isTouch,
    // Aggressive performance: 1.0 for mobile/tablet (native resolution), 1.25 for desktop (crisp but fast)
    dpr: isMobile || isTouch ? (1.0 as number) : (1.25 as number),
    shadows: !isMobile && !isTouch,
    // Fewer particles = less CPU/GPU strain
    particleCount: isMobile ? 12 : isTouch ? 24 : 45,
    // Disable heavy effects like connections and bloom on mobile
    lowPower: isMobile || isTouch,
    // Faster animations on desktop, simpler on mobile
    quality: isMobile || isTouch ? "low" : "high",
  };
}
