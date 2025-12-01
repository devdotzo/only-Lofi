import React, { useEffect, useRef } from "react";
import { Environment } from "../data/environments";

interface BackgroundCanvasProps {
  environment: Environment;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({
  environment,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const createParticle = (): Particle => {
      const isOcean = environment.id === "ocean";

      return {
        x: Math.random() * canvas.width,
        y: isOcean ? canvas.height + 10 : Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: isOcean ? -Math.random() * 1 - 0.2 : (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        alpha: 0,
        life: 0,
        maxLife: Math.random() * 200 + 100,
      };
    };

    const initParticles = () => {
      particlesRef.current = Array.from({ length: 50 }, createParticle);
    };

    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((p, i) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // Fade in/out
        if (p.life < 50) p.alpha = p.life / 50;
        else if (p.life > p.maxLife - 50) p.alpha = (p.maxLife - p.life) / 50;
        else p.alpha = 1;

        // Reset if dead
        if (p.life >= p.maxLife) {
          particlesRef.current[i] = createParticle();
        }

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        let color = "255, 255, 255";
        if (environment.id === "cafe") color = "212, 165, 116"; // Gold/Brown
        if (environment.id === "library") color = "232, 234, 246"; // Blueish White
        if (environment.id === "ocean") color = "178, 235, 242"; // Cyan

        ctx.fillStyle = `rgba(${color}, ${p.alpha * 0.3})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [environment.id]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
