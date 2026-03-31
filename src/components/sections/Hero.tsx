"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import HeroModel from "@/components/3d/HeroModel";
import { useMobilePerformance } from "@/hooks/useMobilePerformance";

const FLOATING_BADGES = [
  { label: "Next.js", x: "10%", y: "20%", delay: 0 },
  { label: "AI", x: "85%", y: "15%", delay: 0.5 },
  { label: "Three.js", x: "5%", y: "75%", delay: 1.0 },
  { label: "React", x: "75%", y: "80%", delay: 1.5 },
  { label: "Node.js", x: "90%", y: "50%", delay: 2.0 },
];

export default function HeroSection() {
  const { dpr, shadows } = useMobilePerformance();
  const mousePointer = useRef({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax constraints
  const textX = useTransform(mouseX, [-1000, 1000], [-20, 20]);
  const textY = useTransform(mouseY, [-1000, 1000], [-20, 20]);

  // Subtle 3D tilt for the badge layer
  const badgeRotateX = useTransform(mouseY, [-500, 500], [5, -5]);
  const badgeRotateY = useTransform(mouseX, [-500, 500], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 3D Model Coordinates (-1 to 1)
      mousePointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;

      // Parallax Coordinates (pixels from center)
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="home" className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#050505]/80 pt-24 lg:pt-0 perspective-1000">
      {/* Scan-line overlay */}
      <div className="scanline-overlay pointer-events-none" />

      {/* Floating tech badges with 3D Parallax */}
      <motion.div 
        className="absolute inset-0 pointer-events-none preserve-3d"
        style={{ rotateX: badgeRotateX, rotateY: badgeRotateY }}
      >
        {FLOATING_BADGES.map((badge) => (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 + badge.delay, duration: 0.6, type: "spring" }}
            className="absolute hidden lg:flex items-center gap-2 px-4 py-2 bg-white/[0.04] border border-white/10 rounded-full backdrop-blur-md text-xs text-neutral-400 font-medium z-[5] shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            style={{ left: badge.x, top: badge.y, transform: "translateZ(30px)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
            {badge.label}
          </motion.div>
        ))}
      </motion.div>

      {/* 1440px Centered Grid */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-24 w-full flex flex-col lg:flex-row items-center justify-between relative z-10 py-12 lg:py-0">
        
        {/* Left Side Content - Parallax Applied */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center text-center lg:text-left z-10 perspective-1000">
          <motion.div
            style={{ x: textX, y: textY }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.2, 0, 0, 1] }}
            className="preserve-3d"
          >
            <motion.h1 
              className="text-fluid-h1 font-bold text-white mb-2 text-center lg:text-left drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0, 0, 1] }}
            >
              <span className="text-gradient-animated">WebGrows</span>
            </motion.h1>

            <motion.h2 
              className="text-2xl md:text-3xl font-medium tracking-tight mb-8 max-w-2xl leading-tight mx-auto lg:mx-0 drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{ transform: "translateZ(20px)" }}
            >
              <span className="text-gradient-animated">Websites, Apps & AI Automation</span>{" "}
              <span className="text-neutral-200">for Business Growth</span>
            </motion.h2>

            <motion.p 
              className="text-neutral-400 text-fluid-p mb-12 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              We design and develop modern business websites, powerful web applications and intelligent AI integrations. From stunning UI experiences to automated customer interactions through AI chatbots and AI voice calling systems, WebGrows helps businesses grow faster in the digital world.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-12 lg:mb-0 preserve-3d"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -5, rotateX: 5 }}
                whileTap={{ scale: 0.95 }}
                className="shimmer-btn px-8 md:px-10 py-4 text-black font-bold rounded-full text-lg shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] transition-shadow"
                style={{ transform: "translateZ(30px)" }}
              >
                Start a Project
              </motion.a>
              <div className="relative group perspective-1000 preserve-3d">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-400 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-500" />
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05, y: -5, rotateX: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-8 md:px-10 py-4 bg-black border border-white/20 text-white font-bold rounded-full hover:bg-[#0a0a0a] transition-all flex items-center justify-center text-lg hover:border-purple-500/50"
                  style={{ transform: "translateZ(20px)" }}
                >
                  View Projects
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side 3D Robot Model */}
        <motion.div 
          className="pointer-events-none lg:pointer-events-auto w-full h-[350px] md:h-[500px] lg:h-[650px] lg:w-[45%] relative flex items-center justify-center mt-8 lg:mt-0"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.2, 0, 0, 1] }}
        >
          <Canvas camera={{ position: [0, 1.5, 5], fov: 40 }} gl={{ alpha: true }} dpr={dpr} shadows={shadows}>
            <HeroModel mousePointer={mousePointer} />
          </Canvas>
        </motion.div>
        
      </div>

      {/* Background glow elements */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-purple-500/[0.03] rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-indigo-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
