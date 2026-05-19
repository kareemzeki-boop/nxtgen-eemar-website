"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export default function Loader({ onComplete }: { onComplete?: () => void }) {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const logoRef     = useRef<HTMLDivElement>(null);
  const barFillRef  = useRef<HTMLDivElement>(null);
  const taglineRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete?.();
      return;
    }

    CustomEase.create("luxury", "M0,0 C0.16,0.08 0.04,0.96 1,1");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => onComplete?.() });

      tl.fromTo(
        logoRef.current,
        { opacity: 0, letterSpacing: "0.6em" },
        { opacity: 1, letterSpacing: "0.22em", duration: 0.75, ease: "luxury" }
      )
        .fromTo(
          barFillRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.6, ease: "luxury" },
          "-=0.25"
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.35, ease: "easeOut" },
          "-=0.1"
        )
        .to(overlayRef.current, {
          yPercent: -100,
          duration: 0.72,
          ease: "luxury",
          delay: 0.3,
        });
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#0C0C0B",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 22,
        willChange: "transform",
      }}
    >
      <div
        ref={logoRef}
        style={{
          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
          fontSize: "clamp(52px, 9vw, 108px)",
          fontWeight: 700,
          color: "#F0EDE6",
          letterSpacing: "0.22em",
          lineHeight: 1,
          opacity: 0,
        }}
      >
        ELM
      </div>

      <div
        style={{
          width: "clamp(80px, 14vw, 160px)",
          height: 1,
          background: "rgba(240,237,230,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          ref={barFillRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, #C9A86C, #e5be64)",
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />
      </div>

      <div
        ref={taglineRef}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(9px, 1vw, 11px)",
          fontWeight: 700,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(240,237,230,0.25)",
          opacity: 0,
        }}
      >
        Emaar Al Madina · Sharjah, UAE
      </div>
    </div>
  );
}
