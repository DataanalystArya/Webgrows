"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const modelX = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);
  const modelY = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);
  const modelOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  
  return (
    <section id="about" ref={containerRef} className="relative min-h-screen py-24 flex items-center bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Side 3D Canvas with Scroll Animation */}
        <motion.div 
          style={{ x: modelX, y: modelY, opacity: modelOpacity }}
          className="relative h-[350px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center pointer-events-none order-2 lg:order-1"
        >
          <div className="w-full h-full pointer-events-auto">
            <Canvas camera={{ position: [0, 1.5, 4], fov: 40 }}>
              <Environment preset="city" />
              <mesh position={[0, -1, 0]}>
                <cylinderGeometry args={[0.5, 0.6, 1.5, 32]} />
                <meshPhysicalMaterial color="#111" roughness={0.1} metalness={0.9} clearcoat={1} />
              </mesh>
              <mesh position={[0, 0.2, 0]}>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshPhysicalMaterial color="#050505" roughness={0} metalness={1} clearcoat={1} />
              </mesh>
              <mesh position={[0, 0.25, 0.35]}>
                <boxGeometry args={[0.5, 0.1, 0.1]} />
                <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={2} />
              </mesh>
            </Canvas>
          </div>
        </motion.div>

        {/* Right Side Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center text-center lg:text-left order-1 lg:order-2"
        >
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden group">
            {/* Subtle shiny overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <h2 className="text-fluid-h2 font-bold text-white mb-8">
              About Us
            </h2>
            
            <p className="text-neutral-300 text-fluid-p mb-6">
              WebGrows is a digital technology agency focused on building modern websites, powerful web applications and intelligent AI systems for businesses.
            </p>
            <p className="text-neutral-400 text-fluid-p">
              We specialize in scalable digital solutions including business websites, portfolio platforms, automation systems, AI chat integrations and AI voice assistants.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
