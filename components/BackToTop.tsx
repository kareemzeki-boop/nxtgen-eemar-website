"use client";
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      setVisible(scrolled > 500);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (progress / 100) * circumference;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 998,
        width: 52, height: 52,
        background: "#2DD4BF",
        borderRadius: "50%",
        border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#0C0C0B",
        boxShadow: "0 4px 24px rgba(45,212,191,0.35)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(45,212,191,0.5)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 24px rgba(45,212,191,0.35)";
      }}
    >
      {/* Circular progress ring */}
      <svg
        width="52" height="52"
        style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}
      >
        <circle cx="26" cy="26" r={radius} fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="2.5" />
        <circle
          cx="26" cy="26" r={radius}
          fill="none"
          stroke="rgba(0,0,0,0.45)"
          strokeWidth="2.5"
          strokeDasharray={`${strokeDash} ${circumference}`}
          strokeLinecap="round"
        />
      </svg>
      <ChevronUp size={18} strokeWidth={2.5} style={{ position: "relative", zIndex: 1 }} />
    </button>
  );
}
