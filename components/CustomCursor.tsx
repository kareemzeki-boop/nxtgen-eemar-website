"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const outerRef  = useRef<HTMLDivElement>(null);
  const innerRef  = useRef<HTMLDivElement>(null);
  const dotRef    = useRef<HTMLDivElement>(null);
  const pos       = useRef({ x: -200, y: -200 });
  const lerped    = useRef({ x: -200, y: -200 });
  const rafId     = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      lerped.current.x = lerp(lerped.current.x, pos.current.x, 0.1);
      lerped.current.y = lerp(lerped.current.y, pos.current.y, 0.1);
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${lerped.current.x - 20}px, ${lerped.current.y - 20}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    const onEnter = () => { if (innerRef.current) innerRef.current.style.transform = "scale(1.8)"; };
    const onLeave = () => { if (innerRef.current) innerRef.current.style.transform = "scale(1)"; };

    const bindTargets = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    bindTargets();

    const observer = new MutationObserver(bindTargets);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener("mousemove", onMove);
      document.documentElement.style.cursor = "";
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={outerRef} aria-hidden="true" style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 999999, willChange: "transform" }}>
        <div
          ref={innerRef}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1.5px solid rgba(201,168,108,0.55)",
            transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#C9A86C",
          pointerEvents: "none",
          zIndex: 999999,
          willChange: "transform",
        }}
      />
    </>
  );
}
