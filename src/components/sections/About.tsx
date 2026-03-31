"use client";

import { useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { useMobilePerformance } from "@/hooks/useMobilePerformance";

/* ─── Orbiting Ring System ─── */
function OrbitingRings() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5;
      ring1Ref.current.rotation.z = t * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 0.3 + 1;
      ring2Ref.current.rotation.y = t * 0.4;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.6;
      ring3Ref.current.rotation.z = t * 0.25 + 2;
    }
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05);
    }
  });

  return (
    <group ref={groupRef} scale={0.85}>
      <Environment preset="city" />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#8b5cf6" distance={8} />
      
      {/* Glowing Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color="#8b5cf6" 
          emissive="#8b5cf6" 
          emissiveIntensity={3} 
          toneMapped={false}
        />
      </mesh>

      {/* Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.2, 0.02, 16, 100]} />
        <meshPhysicalMaterial 
          color="#6366f1" 
          emissive="#6366f1" 
          emissiveIntensity={1.5} 
          metalness={0.9} 
          roughness={0.1}
          toneMapped={false}
        />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.6, 0.015, 16, 100]} />
        <meshPhysicalMaterial 
          color="#a855f7" 
          emissive="#a855f7" 
          emissiveIntensity={1} 
          metalness={0.9} 
          roughness={0.1}
          toneMapped={false}
        />
      </mesh>

      {/* Ring 3 */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        <torusGeometry args={[2.0, 0.01, 16, 100]} />
        <meshPhysicalMaterial 
          color="#ec4899" 
          emissive="#ec4899" 
          emissiveIntensity={0.8} 
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.7}
          toneMapped={false}
        />
      </mesh>

      {/* Orbiting particles */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 1.4, Math.sin(angle) * 1.4, 0]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial 
              color="#6366f1" 
              emissive="#6366f1" 
              emissiveIntensity={3}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function AboutSection() {
  const { dpr, shadows } = useMobilePerformance();
  const containerRef = useRef<HTMLElement>(null);
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

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
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
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "transform 0.5s ease-out";
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);
  
  return (
    <section id="about" ref={containerRef} className="relative min-h-screen py-24 flex items-center bg-[#0a0a0a]/80 overflow-visible">
      <div className="max-w-[1440px] mx-auto px-6 md:px-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center perspective-1000">
        
        {/* Left Side — 3D Orbiting Rings */}
        <motion.div 
          style={{ opacity: modelOpacity, scale: modelScale }}
          className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center order-2 lg:order-1 overflow-visible"
        >
          <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} className="overflow-visible" dpr={dpr} shadows={shadows}>
            <OrbitingRings />
          </Canvas>
        </motion.div>

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
