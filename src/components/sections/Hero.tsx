"use client";

import { useEffect, useRef } from "react";
import NextImage from "next/image";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import HeroModel from "@/components/3d/HeroModel";

export default function HeroSection() {
  const mousePointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#050505] pt-24 lg:pt-0">
      {/* 1440px Centered Grid */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-24 w-full flex flex-col lg:flex-row items-center justify-between relative z-10 py-12 lg:py-0">
        
        {/* Left Side Content */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center text-center lg:text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
          >
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
              <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 overflow-hidden rounded-2xl border-2 border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <NextImage 
                  src="/logo.png" 
                  alt="WebGrows Icon" 
                  fill
                  className="object-cover scale-[1.2]" 
                />
              </div>
              <h1 className="text-fluid-h1 font-bold text-white">
                WebGrows
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl text-neutral-200 font-medium tracking-tight mb-8 max-w-2xl leading-tight mx-auto lg:mx-0">
              Websites, Apps & AI Automation for Business Growth
            </h2>
            <p className="text-neutral-400 text-fluid-p mb-12 max-w-xl mx-auto lg:mx-0">
              We design and develop modern business websites, powerful web applications and intelligent AI integrations. From stunning UI experiences to automated customer interactions through AI chatbots and AI voice calling systems, WebGrows helps businesses grow faster in the digital world.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-12 lg:mb-0">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 md:px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-all text-lg shadow-lg shadow-white/10"
              >
                Start a Project
              </motion.a>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neutral-600 to-neutral-400 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-8 md:px-10 py-4 bg-black border border-white/20 text-white font-bold rounded-full hover:bg-neutral-900 transition-all flex items-center justify-center text-lg"
                >
                  View Projects
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side 3D Robot Model */}
        <div 
          className="pointer-events-none lg:pointer-events-auto w-full h-[350px] md:h-[500px] lg:h-[650px] lg:w-[45%] relative flex items-center justify-center mt-8 lg:mt-0"
        >
          <Canvas camera={{ position: [0, 1.5, 5], fov: 40 }} gl={{ alpha: true }}>
            <HeroModel mousePointer={mousePointer} />
          </Canvas>
        </div>
        
      </div>

      {/* Background elements */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
    </section>
  );
}
