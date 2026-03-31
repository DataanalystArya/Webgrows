"use client";

import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useCallback } from "react";
import * as THREE from "three";
import { useMobilePerformance } from "@/hooks/useMobilePerformance";

/* ─── Animated Wireframe Globe ─── */
function WireframeGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1;
      meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.08;
      wireRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={1} color="#8b5cf6" distance={10} />
      
      {/* Outer wireframe sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 24, 24]} />
        <meshBasicMaterial 
          color="#6366f1" 
          wireframe 
          transparent 
          opacity={0.08}
        />
      </mesh>
      
      {/* Inner wireframe torus */}
      <mesh ref={wireRef}>
        <torusGeometry args={[1.8, 0.02, 16, 64]} />
        <meshBasicMaterial 
          color="#8b5cf6" 
          transparent 
          opacity={0.15}
        />
      </mesh>

      {/* Core glow */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

export default function ContactSection() {
  const { dpr, shadows, isTouch } = useMobilePerformance();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "100px" });
  const formRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const subject = `New Inquiry from ${data.name}`;
    const body = `Name: ${data.name}%0D%0AEmail: ${data.email}%0D%0APhone: ${data.phone}%0D%0A%0D%0A${data.message}`;
    const emails = "contact.webgrows@gmail.com,anshu.dainsights3@gmail.com";
    
    window.location.href = `mailto:${emails}?subject=${subject}&body=${body}`;
  };

  const handleMouseEnter = useCallback(() => {
    if (!formRef.current) return;
    formRef.current.style.transition = "none";
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!formRef.current || isTouch) return;
    const rect = formRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;

    formRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!formRef.current) return;
    formRef.current.style.transition = "transform 0.5s ease-out";
    formRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-[#050505]/80 border-t border-white/5 relative flex items-center min-h-screen lg:min-h-0 overflow-hidden">
      
      {/* 3D Wireframe Globe Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        {isInView && (
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={dpr} shadows={shadows}>
            <WireframeGlobe />
          </Canvas>
        )}
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10 perspective-1000">
        
        {/* Left Side: Info */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0, 1] }}
          className="text-center lg:text-left preserve-3d"
        >
          <h2 className="text-fluid-h2 font-bold text-white mb-6 drop-shadow-lg">
            Let's build something{" "}
            <span className="text-gradient-animated">extraordinary.</span>
          </h2>
          <p className="text-neutral-400 text-fluid-p mb-12 max-w-lg mx-auto lg:mx-0">
            Ready to start your next project with us? Fill out the form or reach out directly on WhatsApp.
          </p>

          <div className="space-y-8 preserve-3d">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              style={{ transform: "translateZ(20px)" }}
            >
              <h4 className="text-white font-medium mb-4">Reach us directly via WhatsApp</h4>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <a 
                  href="https://wa.me/919351469466" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366]/10 text-[#25D366] rounded-full border border-[#25D366]/20 hover:bg-[#25D366]/20 hover:scale-105 hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all font-medium text-sm transform-gpu preserve-3d hover:-translate-y-1"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.472-1.761-1.643-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
                  </svg>
                  +91 9351469466
                </a>
                <a 
                  href="https://wa.me/919818903709" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366]/10 text-[#25D366] rounded-full border border-[#25D366]/20 hover:bg-[#25D366]/20 hover:scale-105 hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all font-medium text-sm transform-gpu preserve-3d hover:-translate-y-1"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.472-1.761-1.643-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
                  </svg>
                  +91 9818903709
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              className="pt-8 border-t border-white/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <h4 className="text-white font-medium mb-4">Email us</h4>
              <div className="flex flex-col gap-3">
                <a href="mailto:contact.webgrows@gmail.com" className="text-neutral-400 hover:text-purple-400 transition-colors text-fluid-p inline-block hover:-translate-y-0.5 hover:scale-105 transform-gpu">contact.webgrows@gmail.com</a>
                <a href="mailto:anshu.dainsights3@gmail.com" className="text-neutral-400 hover:text-purple-400 transition-colors text-fluid-p inline-block hover:-translate-y-0.5 hover:scale-105 transform-gpu">anshu.dainsights3@gmail.com</a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0, 1] }}
          className="preserve-3d"
        >
          <div 
            className="glow-border rounded-3xl preserve-3d shadow-2xl hover:shadow-[0_20px_60px_rgba(168,85,247,0.15)] group/form will-change-transform"
            ref={formRef}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="bg-[#0a0a0a]/90 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-xl relative overflow-hidden preserve-3d">
              {/* Subtle inner glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/[0.04] blur-[60px] rounded-full pointer-events-none group-hover/form:bg-purple-500/[0.08] transition-colors duration-700" />
              
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-6 relative z-10 preserve-3d">
                
                <div className="group/input transition-transform duration-300 hover:translate-z-10" style={{ transform: "translateZ(10px)" }}>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-400 mb-2 font-geist-mono uppercase tracking-wider group-hover/input:text-purple-400 transition-colors">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all placeholder:text-neutral-600 hover:bg-white/[0.07] hover:border-white/20 shadow-inner"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 preserve-3d">
                  <div className="group/input transition-transform duration-300 hover:translate-z-10" style={{ transform: "translateZ(10px)" }}>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-2 font-geist-mono uppercase tracking-wider group-hover/input:text-purple-400 transition-colors">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all placeholder:text-neutral-600 hover:bg-white/[0.07] hover:border-white/20 shadow-inner"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="group/input transition-transform duration-300 hover:translate-z-10" style={{ transform: "translateZ(10px)" }}>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-400 mb-2 font-geist-mono uppercase tracking-wider group-hover/input:text-purple-400 transition-colors">Phone</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all placeholder:text-neutral-600 hover:bg-white/[0.07] hover:border-white/20 shadow-inner"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="group/input transition-transform duration-300 hover:translate-z-10" style={{ transform: "translateZ(10px)" }}>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-400 mb-2 font-geist-mono uppercase tracking-wider group-hover/input:text-purple-400 transition-colors">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all resize-none placeholder:text-neutral-600 hover:bg-white/[0.07] hover:border-white/20 shadow-inner"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ transform: "translateZ(20px)" }}
                  className="w-full py-5 mt-2 shimmer-btn text-black font-bold rounded-xl shadow-[0_10px_30px_rgba(255,255,255,0.1)] active:scale-[0.98] text-lg hover:shadow-[0_15px_30px_rgba(255,255,255,0.2)] transition-shadow"
                >
                  Send Message
                </motion.button>

              </form>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
