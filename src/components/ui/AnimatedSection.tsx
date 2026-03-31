"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type RevealVariant = "fade-up" | "fade-left" | "fade-right" | "tilt-3d" | "scale-in" | "blur-in";

interface AnimatedSectionProps {
  children: ReactNode;
  variant?: RevealVariant;
  className?: string;
  delay?: number;
}

export default function AnimatedSection({
  children,
  variant = "fade-up",
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax: content slides at 80% of scroll speed for subtle depth
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const variants: Record<RevealVariant, {
    initial: Record<string, number | string>;
    animate: Record<string, number | string>;
  }> = {
    "fade-up": {
      initial: { opacity: 0, y: 60 },
      animate: { opacity: 1, y: 0 },
    },
    "fade-left": {
      initial: { opacity: 0, x: -80 },
      animate: { opacity: 1, x: 0 },
    },
    "fade-right": {
      initial: { opacity: 0, x: 80 },
      animate: { opacity: 1, x: 0 },
    },
    "tilt-3d": {
      initial: { opacity: 0, rotateX: "15deg", y: 60 },
      animate: { opacity: 1, rotateX: "0deg", y: 0 },
    },
    "scale-in": {
      initial: { opacity: 0, scale: 0.85 },
      animate: { opacity: 1, scale: 1 },
    },
    "blur-in": {
      initial: { opacity: 0, filter: "blur(10px)", y: 30 },
      animate: { opacity: 1, filter: "blur(0px)", y: 0 },
    },
  };

  const v = variants[variant];

  return (
    <motion.div
      ref={ref}
      initial={v.initial}
      whileInView={v.animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.25, 0.1, 0, 1],
      }}
      className={className}
      style={{
        perspective: variant === "tilt-3d" ? 1200 : undefined,
        y: variant === "fade-up" || variant === "tilt-3d" ? y : undefined,
      }}
    >
      {children}
    </motion.div>
  );
}
