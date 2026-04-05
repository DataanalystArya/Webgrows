"use client";

import { useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import Script from "next/script";
import { useMobilePerformance } from "@/hooks/useMobilePerformance";
import { Skeleton } from "@/components/ui/Skeleton";

const SplineAbout = dynamic(() => import("@/components/3d/SplineAbout"), { 
  ssr: false,
  loading: () => <Skeleton className="w-[120%] h-[120%] rounded-full opacity-40 mx-auto mt-20" />
});

export default function AboutSection() {
  const { isMobile, isTouch } = useMobilePerformance();
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { margin: isMobile ? "0px" : "200px" });
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const modelOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const modelScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const textX = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 0, 1]);

  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "none";
  }, []);

  const requestRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouch) return;
    
    // Throttle layout reflows with rAF to prevent stalling the main thread during WebGL draws
    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
    }
    
    requestRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation (-4 to 4 degrees for a subtle luxurious effect)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
  }, [isTouch]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "transform 0.5s ease-out";
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);
  
  return (
    <section id="about" ref={containerRef} className="relative min-h-screen py-24 flex items-center bg-[#0a0a0a]/80 overflow-visible">
      <Script 
        src="https://unpkg.com/@splinetool/viewer@1.12.73/build/spline-viewer.js" 
        type="module"
        strategy="afterInteractive"
      />
      <div className="section-container grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24 items-center perspective-1000">
        
        {/* Left Side — Wide-Angle Expanded 3D Gallery */}
        {!isMobile && (
          <motion.div 
            style={{ opacity: modelOpacity, scale: modelScale }}
            className="relative h-[500px] md:h-[700px] lg:h-[850px] w-full flex items-center justify-center order-2 lg:order-1 overflow-visible pointer-events-auto"
          >
            {isInView && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] lg:w-[140%] lg:h-[120%]">
                <SplineAbout />
              </div>
            )}
          </motion.div>
        )}

        {/* Right Side Content */}
        <motion.div
          style={{ x: textX, opacity: textOpacity }}
          className="flex flex-col justify-center text-center lg:text-left order-1 lg:order-2 preserve-3d"
        >
          <div 
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="glow-border rounded-3xl preserve-3d group shadow-2xl hover:shadow-[0_20px_50px_rgba(139,92,246,0.15)] will-change-transform"
          >
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md relative overflow-hidden preserve-3d">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div style={{ transform: "translateZ(40px)" }} className="relative z-10 pointer-events-none">
                <motion.h2 
                  className="text-fluid-h2 font-bold text-white mb-8 drop-shadow-xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  About Us
                </motion.h2>
                
                <motion.p 
                  className="text-neutral-300 text-fluid-p mb-6 font-medium"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  WebGrows is a digital technology agency focused on building modern websites, powerful web applications and intelligent AI systems for businesses.
                </motion.p>
                <motion.p 
                  className="text-neutral-400 text-fluid-p"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  We specialize in scalable digital solutions including business websites, portfolio platforms, automation systems, AI chat integrations and AI voice assistants.
                </motion.p>

                {/* Stats row */}
                <div 
                  className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/10 preserve-3d"
                  style={{ transform: "translateZ(20px)" }}
                >
                  {[
                    { value: "50+", label: "Projects" },
                    { value: "30+", label: "Clients" },
                    { value: "3+", label: "Years" },
                  ].map((stat, i) => (
                    <motion.div 
                      key={stat.label} 
                      className="text-center group/stat"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                    >
                      <div className="text-2xl md:text-4xl font-black text-gradient-animated drop-shadow-lg group-hover/stat:scale-110 transition-transform duration-300">
                        {stat.value}
                      </div>
                      <div className="text-neutral-400 font-medium text-xs md:text-sm mt-2 uppercase tracking-widest">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
