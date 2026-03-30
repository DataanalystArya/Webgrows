"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 bg-[#050505] border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 md:px-24">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-fluid-h2 font-bold text-white mb-6">
            Selected Work
          </h2>
          <p className="text-neutral-400 text-fluid-p max-w-2xl mx-auto">
            A curated selection of our digital products, web applications, and AI integrations designed for global brands.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {PROJECTS.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group block"
            >
              {/* macOS Window Card */}
              <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 mb-6">
                
                {/* Browser Header Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#111111] border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">
                      Live
                    </span>
                  </div>
                </div>

                {/* Browser Image Content */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <Image
                    src={`/projects/${project.id}.png`}
                    alt={`${project.name} Website Screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    // Fallback to the generated mockup if the real screenshot isn't ready
                    onError={(e) => {
                      e.currentTarget.src = "/project_mockup.png";
                    }}
                  />
                  {/* Subtle gradient overlay to keep it feeling premium */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-50" />
                </div>
              </div>

              {/* Text Description Block */}
              <div className="flex flex-col gap-2 px-2 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-neutral-200 transition-colors">
                  {project.name}
                </h3>
                <p className="text-[#e83e8c] font-semibold text-sm md:text-base tracking-wide">
                  {project.category}
                </p>
                <p className="text-neutral-500 text-sm md:text-base font-medium">
                  {project.tech}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
