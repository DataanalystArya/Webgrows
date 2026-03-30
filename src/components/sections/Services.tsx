"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import WorkspaceModel from "@/components/3d/HighFidelityWorkspace";

const SERVICES = [
  "Business Website Development",
  "Portfolio & Personal Websites",
  "E-commerce Websites",
  "Custom Web Applications",
  "AI Chatbot Integration",
  "AI Customer Voice Calling Systems",
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative min-h-screen py-24 bg-[#0a0a0a] overflow-hidden flex items-center">
      <div className="max-w-[1440px] mx-auto px-6 md:px-24 w-full what-we-do-section">
        
        {/* Left Column (Container A): Static Content */}
        <div className="static-content-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-fluid-h2 font-bold mb-4">
              What We Do
            </h2>
            <p className="text-fluid-p mb-12 max-w-lg mx-auto lg:mx-0">
              We deliver end-to-end digital solutions that help your business scale efficiently and connect with customers effectively.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl transition-colors cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <h3 className="font-medium text-lg leading-snug">
                  {service}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column (Container B): 3D Scene */}
        <div className="three-d-scene-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full h-full"
          >
            <Canvas camera={{ position: [5, 2, 0.5], fov: 38 }} shadows>
              <WorkspaceModel />
            </Canvas>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
