"use client";

import { motion } from "framer-motion";

const TECHNOLOGIES = [
  "HTML", "CSS", "JavaScript", "TypeScript",
  "React", "Next.js", "WordPress", "Node.js",
  "Express.js", "MongoDB", "Firebase", "Three.js",
  "WebGL", "GSAP", "OpenAI API", "Git", "GitHub", "Vercel"
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 200, damping: 10 } }
};

export default function TechStackSection() {
  return (
    <section id="tech-stack" className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/[0.01] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-24 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-fluid-h2 font-bold text-white mb-6">
            Tech Stack
          </h2>
          <p className="text-neutral-400 text-fluid-p max-w-2xl mx-auto mb-16">
            We use modern, scalable technologies to build high-performance digital products.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6 lg:gap-8"
        >
          {TECHNOLOGIES.map((tech) => (
            <motion.div
              key={tech}
              variants={itemVariants}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex items-center justify-center transition-colors cursor-default"
            >
              <span className="text-white/80 font-medium text-sm md:text-base text-center">
                {tech}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
