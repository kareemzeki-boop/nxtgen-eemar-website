"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Expose so Navbar can call lenis.scrollTo() instead of native anchor jump
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const rafFn = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(rafFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      (window as unknown as Record<string, unknown>).__lenis = undefined;
      gsap.ticker.remove(rafFn);
    };
  }, []);

  return <>{children}</>;
}
