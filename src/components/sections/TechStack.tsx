"use client";

import { motion } from "framer-motion";

const TECHNOLOGIES_ROW_1 = [
  "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js",
  "WordPress", "Node.js", "Express.js", "MongoDB", "Firebase", "Three.js",
  "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js",
  "WordPress", "Node.js", "Express.js", "MongoDB", "Firebase", "Three.js",
];

const TECHNOLOGIES_ROW_2 = [
  "WebGL", "GSAP", "OpenAI API", "Git", "Vercel",
  "Tailwind CSS", "Framer Motion", "Figma", "Python", "Docker", "Prisma",
  "WebGL", "GSAP", "OpenAI API", "Git", "Vercel",
  "Tailwind CSS", "Framer Motion", "Figma", "Python", "Docker", "Prisma",
];

function MarqueeItem({ tech }: { tech: string }) {
  return (
    <div className="flex-shrink-0 px-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/[0.08] hover:border-purple-500/20 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all duration-300 cursor-default group">
      <span className="text-white/80 font-medium text-sm md:text-base whitespace-nowrap group-hover:text-white transition-colors">
        {tech}
      </span>
    </div>
  );
}

export default function TechStackSection() {
  return (
    <section id="tech-stack" className="py-24 bg-[#050505]/80 border-t border-white/5 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-fluid-h2 font-bold text-white mb-6">
            Tech <span className="text-gradient-animated">Stack</span>
          </h2>
          <p className="text-neutral-400 text-fluid-p max-w-2xl mx-auto">
            We use modern, scalable technologies to build high-performance digital products.
          </p>
        </motion.div>
      </div>

      {/* Marquee Row 1 — scrolls left */}
      <motion.div 
        className="relative mb-4 will-change-transform"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-4 marquee-left" style={{ width: "max-content" }}>
          {TECHNOLOGIES_ROW_1.map((tech, i) => (
            <MarqueeItem key={`r1-${i}`} tech={tech} />
          ))}
        </div>
      </motion.div>

      {/* Marquee Row 2 — scrolls right */}
      <motion.div 
        className="relative will-change-transform"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-4 marquee-right" style={{ width: "max-content" }}>
          {TECHNOLOGIES_ROW_2.map((tech, i) => (
            <MarqueeItem key={`r2-${i}`} tech={tech} />
          ))}
        </div>
      </motion.div>

    </section>
  );
}
