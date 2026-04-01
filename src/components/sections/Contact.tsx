"use client";

import { motion } from "framer-motion";
import { useRef, useCallback } from "react";
import { useMobilePerformance } from "@/hooks/useMobilePerformance";

export default function ContactSection() {
  const { isTouch } = useMobilePerformance();
  const sectionRef = useRef<HTMLElement>(null);
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

  const requestRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!formRef.current || isTouch) return;
    if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(() => {
      if (!formRef.current) return;
      const rect = formRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      formRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
  }, [isTouch]);

  const handleMouseLeave = useCallback(() => {
    if (!formRef.current) return;
    formRef.current.style.transition = "transform 0.5s ease-out";
    formRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-[#050505]/80 border-t border-white/5 relative overflow-hidden">

      <div className="section-container relative z-10">
        
        {/* Section Header — Centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-fluid-h2 font-bold text-white mb-4 drop-shadow-lg">
            Let&apos;s build something{" "}
            <span className="text-gradient-animated">extraordinary.</span>
          </h2>
          <p className="text-neutral-400 text-fluid-p max-w-2xl mx-auto">
            Ready to bring your vision to life? Get in touch and let&apos;s start building together.
          </p>
        </motion.div>

        {/* Main Content — 2 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Column — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col gap-8 justify-center preserve-3d order-2 lg:order-1"
          >
            {/* WhatsApp Section */}
            <div>
              <h4 className="text-white font-semibold mb-5 flex items-center gap-2.5 text-lg">
                <div className="w-8 h-8 rounded-lg bg-[#25D366]/15 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.472-1.761-1.643-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
                  </svg>
                </div>
                Chat with us
              </h4>
              <div className="flex flex-col gap-3">
                <a 
                  href="https://wa.me/917011928781" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group/wa flex items-center gap-3 px-5 py-3.5 bg-white/[0.03] rounded-xl border border-white/10 hover:border-[#25D366]/30 hover:bg-[#25D366]/10 transition-all transform-gpu hover:-translate-y-0.5"
                >
                  <div className="w-9 h-9 rounded-full bg-[#25D366]/15 flex items-center justify-center shrink-0 group-hover/wa:bg-[#25D366]/25 transition-colors">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.472-1.761-1.643-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-semibold">Quick Chat</span>
                    <span className="text-neutral-500 text-xs">Instant reply on WhatsApp</span>
                  </div>
                  <svg className="w-4 h-4 ml-auto text-neutral-600 group-hover/wa:text-[#25D366] group-hover/wa:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a 
                  href="https://wa.me/919351469466" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group/wa flex items-center gap-3 px-5 py-3.5 bg-white/[0.03] rounded-xl border border-white/10 hover:border-[#25D366]/30 hover:bg-[#25D366]/10 transition-all transform-gpu hover:-translate-y-0.5"
                >
                  <div className="w-9 h-9 rounded-full bg-[#25D366]/15 flex items-center justify-center shrink-0 group-hover/wa:bg-[#25D366]/25 transition-colors">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.472-1.761-1.643-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-semibold">Support Chat</span>
                    <span className="text-neutral-500 text-xs">We respond within minutes</span>
                  </div>
                  <svg className="w-4 h-4 ml-auto text-neutral-600 group-hover/wa:text-[#25D366] group-hover/wa:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Email Section */}
            <div>
              <h4 className="text-white font-semibold mb-5 flex items-center gap-2.5 text-lg">
                <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                Email us
              </h4>
              <div className="flex flex-col gap-3">
                <a href="mailto:contact.webgrows@gmail.com" className="flex items-center gap-3 px-5 py-3.5 bg-white/[0.03] rounded-xl border border-white/10 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all transform-gpu hover:-translate-y-0.5 text-neutral-400 hover:text-purple-300 text-sm">
                  contact.webgrows@gmail.com
                </a>
                <a href="mailto:anshu.dainsights3@gmail.com" className="flex items-center gap-3 px-5 py-3.5 bg-white/[0.03] rounded-xl border border-white/10 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all transform-gpu hover:-translate-y-0.5 text-neutral-400 hover:text-purple-300 text-sm">
                  anshu.dainsights3@gmail.com
                </a>
              </div>
            </div>
          </motion.div>


          {/* Right Column — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="preserve-3d order-1 lg:order-2"
          >
            <div 
              className="glow-border rounded-3xl preserve-3d shadow-2xl hover:shadow-[0_20px_60px_rgba(168,85,247,0.15)] group/form will-change-transform"
              ref={formRef}
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="bg-[#0a0a0a]/90 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-xl relative overflow-hidden preserve-3d">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/[0.04] blur-[60px] rounded-full pointer-events-none group-hover/form:bg-purple-500/[0.08] transition-colors duration-700" />
                
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 relative z-10 preserve-3d">
                  
                  <div className="group/input" style={{ transform: "translateZ(10px)" }}>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-400 mb-2 uppercase tracking-wider group-hover/input:text-purple-400 transition-colors">Name</label>
                    <input 
                      type="text" id="name" name="name" required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all placeholder:text-neutral-600 hover:bg-white/[0.07] hover:border-white/20"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="group/input" style={{ transform: "translateZ(10px)" }}>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-2 uppercase tracking-wider group-hover/input:text-purple-400 transition-colors">Email</label>
                      <input 
                        type="email" id="email" name="email" required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all placeholder:text-neutral-600 hover:bg-white/[0.07] hover:border-white/20"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="group/input" style={{ transform: "translateZ(10px)" }}>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-400 mb-2 uppercase tracking-wider group-hover/input:text-purple-400 transition-colors">Phone</label>
                      <input 
                        type="tel" id="phone" name="phone"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all placeholder:text-neutral-600 hover:bg-white/[0.07] hover:border-white/20"
                        placeholder="+91 00000 00000"
                      />
                    </div>
                  </div>

                  <div className="group/input" style={{ transform: "translateZ(10px)" }}>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-400 mb-2 uppercase tracking-wider group-hover/input:text-purple-400 transition-colors">Message</label>
                    <textarea 
                      id="message" name="message" rows={4} required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all resize-none placeholder:text-neutral-600 hover:bg-white/[0.07] hover:border-white/20"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ transform: "translateZ(20px)" }}
                    className="w-full py-4 mt-1 shimmer-btn text-black font-bold rounded-xl shadow-[0_10px_30px_rgba(255,255,255,0.1)] text-lg hover:shadow-[0_15px_30px_rgba(255,255,255,0.2)] transition-shadow"
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

        </div>



      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/[0.03] rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
}
