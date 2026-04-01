"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useCallback } from "react";
import Script from "next/script";
import { useMobilePerformance } from "@/hooks/useMobilePerformance";

export default function EducationSection() {
  const { isTouch } = useMobilePerformance();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "200px" });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "none";
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouch) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-5 to 5 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, [isTouch]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "transform 0.5s ease-out";
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  return (
    <section id="education" ref={sectionRef} className="relative py-24 bg-transparent border-t border-white/5 overflow-hidden z-10">
      {/* Spline Background */}
      {isInView && (
        <div 
          className="absolute inset-0 z-0 w-full h-full pointer-events-none opacity-60 mix-blend-screen"
          style={{ clipPath: "inset(0 0 50px 0)" }}
        >
          <div 
            className="w-full h-full"
            dangerouslySetInnerHTML={{ __html: `<spline-viewer url="https://prod.spline.design/ailandingpagewebdesign3danimation-3O7QCYofBePoW7i6owf1xa4i/" class="w-full h-full" loading="lazy"></spline-viewer>` }} 
          />
        </div>
      )}

      {/* Floating geometric shapes */}
      <div className="absolute top-20 right-20 w-8 h-8 border border-purple-500/20 rotate-45 float-slow hidden lg:block z-10 pointer-events-none" />
      <div className="absolute bottom-32 left-16 w-6 h-6 border border-indigo-500/20 rounded-full float-medium hidden lg:block z-10 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-purple-500/10 rotate-12 float-fast hidden lg:block z-10 pointer-events-none" />
      <div className="absolute bottom-20 right-32 w-10 h-10 border border-white/5 rounded-lg rotate-[30deg] float-slow hidden lg:block z-10 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-24 relative z-10 pointer-events-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <h2 className="text-fluid-h2 font-bold text-white mb-16">
            Professional Background
          </h2>
        </motion.div>

        <div className="flex gap-8 lg:gap-12 items-stretch">
          {/* Timeline connector line */}
          <motion.div 
            className="hidden lg:flex flex-col items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
            />
            <motion.div 
              className="w-0.5 flex-1 timeline-line"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, type: "spring" }}
            />
          </motion.div>

          {/* Education card */}
          <motion.div 
            className="flex-1 perspective-1000 preserve-3d"
            initial={{ opacity: 0, rotateX: 10, y: 40 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0, 1] }}
          >
            <div 
              ref={cardRef}
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="glow-border rounded-3xl preserve-3d shadow-xl hover:shadow-[0_20px_60px_-15px_rgba(139,92,246,0.2)] will-change-transform"
            >
              <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-16 hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden group preserve-3d hover:border-purple-500/30">
                {/* Animated glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/[0.03] rounded-full blur-[80px] group-hover:bg-purple-500/[0.06] transition-colors duration-700 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/[0.02] rounded-full blur-[60px] group-hover:bg-indigo-500/[0.05] transition-colors duration-700 pointer-events-none" />
                
                {/* Inner Content Wrapper for depth */}
                <div style={{ transform: "translateZ(30px)" }} className="relative z-10 pointer-events-none">
                  {/* Year badge */}
                  <motion.div 
                    className="inline-block px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-6 shadow-inner"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    2022 — Graduated
                  </motion.div>

                  <motion.h3 
                    className="text-xl md:text-2xl font-semibold text-white leading-snug mb-4 drop-shadow-md"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    Bachelor's degree in <span className="text-gradient-animated">Computer Science Engineering (CSE)</span>
                  </motion.h3>
                  
                  <motion.p 
                    className="text-neutral-400 text-fluid-p mb-8 border-l-2 border-purple-500/30 pl-4 font-medium lg:mx-0 mx-auto"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    Indira Gandhi Delhi Technical University for Women (IGDTUW)
                  </motion.p>
                  
                  <motion.p 
                    className="text-neutral-400 text-fluid-p relative z-10"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                  >
                    During the academic journey strong foundations were built in software development, web technologies, algorithms and modern computing systems which support expertise in building scalable digital products and AI-powered solutions.
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
