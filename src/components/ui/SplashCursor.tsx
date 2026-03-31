"use client";

import { useEffect, useRef } from "react";

export default function SplashCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas dimensions
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking
    const mouse = { x: width / 2, y: height / 2, vx: 0, vy: 0 };
    let isMoving = false;
    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.vx = e.clientX - mouse.x;
      mouse.vy = e.clientY - mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isMoving = true;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        isMoving = false;
        mouse.vx = 0;
        mouse.vy = 0;
      }, 50);

      // Create splash particles on fast movement
      const speed = Math.sqrt(mouse.vx ** 2 + mouse.vy ** 2);
      if (speed > 5) {
        const amount = Math.min(Math.floor(speed / 2), 10);
        for (let i = 0; i < amount; i++) {
          particles.push(new Particle(mouse.x, mouse.y, mouse.vx, mouse.vy));
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Particle system
    const particles: Particle[] = [];
    const colors = ["#8b5cf6", "#6366f1", "#ec4899", "#a855f7"];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
      color: string;

      constructor(x: number, y: number, mx: number, my: number) {
        this.x = x;
        this.y = y;
        
        // Inherit mouse velocity + spread
        const angle = Math.atan2(my, mx) + (Math.random() - 0.5) * 1.5;
        const speed = Math.random() * 8 + 2;
        
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        this.size = Math.random() * 20 + 5;
        this.maxLife = Math.random() * 40 + 20;
        this.life = this.maxLife;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Add gravity and friction
        this.vy += 0.2;
        this.vx *= 0.95;
        this.vy *= 0.95;
        
        this.size *= 0.92;
        this.life--;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const alpha = Math.max(0, this.life / this.maxLife);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        
        ctx.fillStyle = this.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        
        // Reset composite operations
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }
    }

    // Main animation loop
    let animId: number;
    const animate = () => {
      // Clear with fading trail
      ctx.fillStyle = "rgba(5, 5, 5, 0.2)";
      ctx.fillRect(0, 0, width, height);

      // Add a consistent cursor dot
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#8b5cf6";
      ctx.fill();
      ctx.shadowBlur = 0;

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0 || p.size < 0.5) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
