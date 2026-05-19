"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  r: number; alpha: number; life: number; maxLife: number;
}

interface Props {
  count?: number;
  color?: string;
  className?: string;
}

export default function ParticleField({ count = 50, color = "201,168,108", className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    let W = 0, H = 0;
    let mx = 0, my = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      W = parent ? parent.offsetWidth : window.innerWidth;
      H = parent ? parent.offsetHeight : window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      mx = W / 2;
      my = H / 2;
    };
    resize();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const onMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    window.addEventListener("mousemove", onMouseMove);

    const spawn = (): Particle => ({
      x: Math.random() * W,
      y: H + Math.random() * 20,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 0.7 + 0.15),
      r: Math.random() * 2.2 + 0.4,
      alpha: 0,
      life: 0,
      maxLife: Math.random() * 280 + 180,
    });

    const particles: Particle[] = Array.from({ length: count }, () => {
      const p = spawn();
      p.y = Math.random() * H;
      p.life = Math.random() * p.maxLife;
      return p;
    });

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.life++;
        const t = p.life / p.maxLife;
        p.alpha = t < 0.15 ? t / 0.15 : t > 0.85 ? (1 - t) / 0.15 : 1;
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (mx - p.x) * 0.000025;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${p.alpha * 0.4})`;
        ctx.fill();
        if (p.life > p.maxLife || p.y < -10) Object.assign(p, spawn());
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [count, color]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
