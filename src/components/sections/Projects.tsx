"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ImageSkeleton } from "@/components/ui/Skeleton";
import { useMobilePerformance } from "@/hooks/useMobilePerformance";

const PROJECTS = [
  {
    id: "nayra",
    name: "Nayra Jewels",
    category: "eCommerce Platform",
    tech: "Next.js, Stripe, Tailwind CSS",
    link: "https://tinyurl.com/Nayra-jewels",
  },
  {
    id: "velmora",
    name: "Velmora Advisory",
    category: "Corporate Consulting",
    tech: "React, Node.js, GSAP",
    link: "https://tinyurl.com/Velmora-advisory",
  },
  {
    id: "vornexa",
    name: "Vornexa BuildCo",
    category: "B2B Construction",
    tech: "Next.js, Three.js, Framer Motion",
    link: "https://tinyurl.com/vornexa-buildco",
  },
  {
    id: "veloria",
    name: "Veloria Fashion",
    category: "Modern Boutique",
    tech: "React, Shopify API, Tailwind",
    link: "https://tinyurl.com/VeloriaFashion",
  },
  {
    id: "stepstyle",
    name: "Step Style Shoes",
    category: "Footwear Store",
    tech: "Next.js, Prisma, Stripe",
    link: "https://tinyurl.com/StepStyleShoes",
  },
  {
    id: "aroma",
    name: "Aroma Alley",
    category: "Fragrance Brand",
    tech: "Vue.js, Nuxt, Tailwind CSS",
    link: "https://tinyurl.com/AromaAlley",
  },
];

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const { isTouch } = useMobilePerformance();
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
    
    // Smooth 3D tilt calculation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "transform 0.5s ease-out";
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.1, 0, 1] }}
      className="group block perspective-1000 preserve-3d"
    >
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative bg-[#050505] p-3 md:p-4 rounded-[2rem] border border-white/5 shadow-2xl mb-6 hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)] hover:border-purple-500/20 preserve-3d will-change-transform"
      >
        {/* Animated glow border */}
        <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none display-none z-0">
          <div className="absolute inset-[-1px] rounded-[2rem] bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-pink-500/10 blur-md" />
        </div>

        {/* 3D Inner Browser Window */}
        <div 
          className="relative rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/10 preserve-3d shadow-inner mb-6 group-hover:border-white/20 transition-colors"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Browser Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#111111]/90 backdrop-blur-md border-b border-white/5 relative z-10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">
                Live
              </span>
            </div>
          </div>

          {/* Browser Image Content */}
          <div className="relative aspect-[16/10] overflow-hidden bg-black z-0">
            <ImageSkeleton
              wrapperClassName="absolute inset-0 w-full h-full"
              src={`/projects/${project.id}.png`}
              alt={`${project.name} Website Screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              onError={(e) => {
                e.currentTarget.src = "/project_mockup.png";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
          </div>
        </div>

        {/* Text Description Block */}
        <div 
          className="flex flex-col gap-2 px-4 pb-2 text-center md:text-left preserve-3d"
          style={{ transform: "translateZ(40px)" }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-purple-100 transition-colors drop-shadow-md">
            {project.name}
          </h3>
          <p className="text-purple-400 font-semibold text-sm md:text-base tracking-wide drop-shadow-sm">
            {project.category}
          </p>
          <p className="text-neutral-500 text-sm md:text-base font-medium">
            {project.tech}
          </p>
        </div>
      </div>
    </motion.a>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 bg-[#050505]/80 border-t border-white/5 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-24">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-fluid-h2 font-bold text-white mb-6">
            Selected <span className="text-gradient-animated">Work</span>
          </h2>
          <p className="text-neutral-400 text-fluid-p max-w-2xl mx-auto">
            A curated selection of our digital products, web applications, and AI integrations designed for global brands.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
