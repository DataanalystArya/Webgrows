"use client";

import { useState, useEffect } from "react";

export function useMobilePerformance() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // 768px is the standard md breakpoint
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Setup listener
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return {
    isMobile,
    // Cap DPR at 1 for mobile to save processing power on high-density mobile screens
    // Use [1, 2] on desktop to allow high-res rendering
    dpr: isMobile ? ([1, 1] as [number, number]) : ([1, 2] as [number, number]),
    // Disable active shadows on mobile to instantly reduce GPU overhead
    shadows: !isMobile,
  };
}
