"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const SOCIAL_LINKS = [
  { icon: GithubIcon, href: "https://github.com/DataanalystArya", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/arya-verma-b32736316/", label: "LinkedIn" },
  { icon: InstagramIcon, href: "https://www.instagram.com/webgrows.agency", label: "Instagram" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] pt-16 pb-8 relative z-[1]">
      <motion.div 
        className="max-w-[1440px] mx-auto px-12 md:px-24 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold tracking-tight text-white mb-4">
            WebGrows
          </h3>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
            We design fast, responsive and visually stunning digital experiences combined with intelligent integrations.
          </p>
        </motion.div>
        
        <motion.div className="flex flex-col gap-3" variants={itemVariants}>
          <h4 className="text-white font-semibold mb-2">Navigation</h4>
          {["Home", "About", "Services", "Projects", "Skills", "Contact"].map((item, idx) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.05 }}
            >
              <Link 
                href={`#${item.toLowerCase()}`}
                className="text-neutral-400 hover:text-purple-400 transition-colors text-sm w-fit block"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="flex flex-col gap-4" variants={itemVariants}>
          <h4 className="text-white font-semibold mb-2">Social</h4>
          <div className="flex gap-4">
            {SOCIAL_LINKS.map((social) => (
              <motion.div
                key={social.label}
                whileHover={{ scale: 1.15, rotateY: 180 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="preserve-3d"
              >
                <Link 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-neutral-400 hover:text-purple-400 transition-colors block"
                  aria-label={social.label}
                >
                  <social.icon />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="max-w-[1440px] mx-auto px-12 md:px-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p>© {new Date().getFullYear()} WebGrows Agency. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed & Built with Next.js</p>
      </motion.div>
    </footer>
  );
}
