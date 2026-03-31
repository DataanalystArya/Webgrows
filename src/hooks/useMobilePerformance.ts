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
    // Cap DPR for mobile
    dpr: isMobile ? ([1, 1] as [number, number]) : ([1, 2] as [number, number]),
    shadows: !isMobile,
    // Optimization for particles - fewer on mobile
    particleCount: isMobile ? 30 : 80,
    // Disable heavy effects like connections and bloom on mobile
    lowPower: isMobile || isTouch,
  };
}
