"use client";

import { motion } from "framer-motion";

export default function EducationSection() {
  return (
    <section id="education" className="relative py-24 bg-[#050505] border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 md:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <h2 className="text-fluid-h2 font-bold text-white mb-16">
            Education
          </h2>
          
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-16 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
            {/* Soft glow behind the text */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-[80px] group-hover:bg-white/[0.04] transition-colors duration-700 pointer-events-none" />
            
            <h3 className="text-xl md:text-2xl font-semibold text-white leading-snug mb-4">
              Bachelor’s degree in <span className="text-neutral-300">Computer Science Engineering (CSE)</span>
            </h3>
            
            <p className="text-neutral-400 text-fluid-p mb-8 border-l-2 border-white/20 pl-4 font-medium lg:mx-0 mx-auto">
              Indira Gandhi Delhi Technical University for Women (IGDTUW)
            </p>
            
            <p className="text-neutral-400 text-fluid-p">
              During the academic journey strong foundations were built in software development, web technologies, algorithms and modern computing systems which support expertise in building scalable digital products and AI-powered solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
