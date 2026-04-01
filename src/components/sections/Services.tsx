"use client";

import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import Script from "next/script";
import { useMobilePerformance } from "@/hooks/useMobilePerformance";

const SplineWorkspace = dynamic(() => import("@/components/3d/SplineWorkspace"), { ssr: false });

const SERVICES = [
  { name: "Business Website Development", desc: "Modern, fast, and SEO-optimized websites" },
  { name: "Portfolio & Personal Websites", desc: "Stunning showcases for your brand" },
  { name: "E-commerce Websites", desc: "Scalable online stores with payment integration" },
  { name: "Custom Web Applications", desc: "Full-stack apps built for your workflow" },
  { name: "AI Chatbot Integration", desc: "24/7 intelligent customer interactions" },
  { name: "AI Customer Voice Calling", desc: "Automated voice systems for outreach" },
];

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const { isTouch } = useMobilePerformance();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "none";
  }, []);

  const frameRef = useRef<number>(0);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouch) return;
    
    // Cancel previous frame to avoid stacking
    cancelAnimationFrame(frameRef.current);
    
    frameRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      cardRef.current!.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
  }, [isTouch]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cancelAnimationFrame(frameRef.current);
    cardRef.current.style.transition = "transform 0.5s ease-out";
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0, 1] }}
      className="preserve-3d"
    >
      <div 
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl cursor-pointer group relative overflow-hidden hover:border-purple-500/30 hover:bg-white/[0.04] shadow-xl hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.2)] will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Animated shimmer on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
        
        {/* Number indicator with 3D Pop */}
        <div 
          className="text-6xl font-black absolute top-2 right-4 select-none opacity-20 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/0 group-hover:from-purple-400 group-hover:to-indigo-500/10 transition-colors duration-500"
          style={{ transform: "translateZ(30px)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Inner Content Wrapper for 3D Pop */}
        <div style={{ transform: "translateZ(40px)" }} className="relative z-10 pointer-events-none">
          {/* Glow dot */}
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 mb-5 shadow-[0_0_15px_rgba(99,102,241,0.6)] group-hover:bg-purple-400 group-hover:shadow-[0_0_25px_rgba(168,85,247,1)] transition-all duration-300" />

          <h3 className="font-bold text-xl leading-snug text-white mb-3 group-hover:text-purple-100 transition-colors">
            {service.name}
          </h3>
          <p className="text-neutral-400 text-sm font-medium leading-relaxed group-hover:text-neutral-300 transition-colors max-w-[85%]">
            {service.desc}
          </p>
        </div>
        
        {/* Glow behind the card on hover */}
        <div className="absolute inset-0 bg-purple-500/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full scale-150 pointer-events-none" style={{ transform: "translateZ(-10px)" }} />
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const { dpr, shadows, isTouch } = useMobilePerformance();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "100px" });
  return (
    <section id="services" ref={sectionRef} className="relative min-h-screen py-24 bg-transparent overflow-hidden flex items-center border-t border-white/5 z-10">
      <Script 
        src="https://unpkg.com/@splinetool/viewer@1.12.73/build/spline-viewer.js" 
        type="module"
        strategy="afterInteractive"
      />
      <div className="max-w-[1440px] mx-auto px-6 md:px-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Static Content */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center lg:text-left"
          >
            <h2 className="text-fluid-h2 font-bold mb-4 text-white">
              What We <span className="text-gradient-animated">Do</span>
            </h2>
            <p className="text-neutral-400 text-fluid-p max-w-lg mx-auto lg:mx-0">
              We deliver end-to-end digital solutions that help your business scale efficiently and connect with customers effectively.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 perspective-1000">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.name} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* Right Column: 3D Scene */}
        <div className="h-[400px] md:h-[500px] lg:h-[700px] w-full relative perspective-1000 -mx-4 md:mx-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full h-full absolute inset-0 md:-right-24"
          >
            {isInView && (
              <div className="w-full h-full outline-none pointer-events-auto">
                <SplineWorkspace />
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
