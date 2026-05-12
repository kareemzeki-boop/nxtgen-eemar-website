"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Layers3, Leaf, Atom } from "lucide-react";
import { innovations as innovationsData, innovationsBackgroundImage } from "@/lib/content";
import { ctaClick } from "@/lib/cta";

const ICONS = [Cpu, Layers3, Leaf, Atom] as const;
const innovations = innovationsData.map((item, i) => ({ ...item, icon: ICONS[i] }));

export default function Innovations() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="innovations" className="section-dark py-16 md:py-24 lg:py-28 relative overflow-hidden">
      {/* Technical drawing wallpaper */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${innovationsBackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.06,
        }}
      />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(93,195,155,0.07) 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(93,195,155,0.04) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="tag-pill bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
              R&amp;D Innovations
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-white max-w-2xl leading-tight mt-4">
              Beyond the brief.
              <br />
              <span className="text-white/30">Beyond the material.</span>
            </h2>
          </div>
          <p className="text-white/40 md:max-w-xs text-sm leading-relaxed hidden md:block">
            Hover each panel to explore our four core breakthroughs in facade engineering.
          </p>
        </motion.div>

        {/* ── Expanding accordion cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="flex flex-col md:flex-row gap-2"
          style={{ height: "clamp(460px, 52vh, 560px)" }}
          onMouseLeave={() => setHovered(null)}
        >
          {innovations.map((item, i) => {
            const Icon    = item.icon;
            const active  = hovered === i;
            const dimmed  = hovered !== null && !active;

            return (
              <div
                key={item.title}
                onMouseEnter={() => setHovered(i)}
                style={{
                  flex:       active ? 4 : dimmed ? 0.55 : 1,
                  transition: "flex 0.5s cubic-bezier(0.4,0,0.2,1)",
                  border:     `1px solid ${active ? item.color : item.color + "40"}`,
                  background: active ? "#1c1c1c" : "#181818",
                  borderRadius: "12px",
                  overflow:   "hidden",
                  cursor:     "pointer",
                  position:   "relative",
                  minWidth:   0,
                }}
              >
                {/* Top accent line */}
                <div
                  style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 2,
                    background: item.color,
                    opacity: active ? 1 : 0.3,
                    transition: "opacity 0.5s",
                  }}
                />

                {/* ── COLLAPSED view — rotated label ── */}
                <div
                  style={{
                    position:   "absolute",
                    inset:      0,
                    display:    "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity:    active ? 0 : 1,
                    transition: "opacity 0.25s",
                    pointerEvents: active ? "none" : "auto",
                  }}
                >
                  {/* Desktop/tablet: bold rotated title */}
                  <div
                    className="hidden md:flex"
                    style={{ flexDirection: "column", alignItems: "center", transform: "rotate(-90deg)", whiteSpace: "nowrap" }}
                  >
                    <span style={{
                      fontSize: 16, fontWeight: 900, color: "rgba(255,255,255,0.88)",
                      letterSpacing: "-0.01em",
                    }}>
                      {item.title}
                    </span>
                  </div>

                  {/* Mobile: horizontal, all elements */}
                  <div
                    className="flex md:hidden"
                    style={{
                      flexDirection: "column",
                      alignItems:    "center",
                      gap:           14,
                      whiteSpace:    "nowrap",
                    }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: 6,
                      background: `${item.color}18`,
                      border: `1px solid ${item.color}35`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={13} style={{ color: item.color }} />
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 700, letterSpacing: "0.13em",
                      textTransform: "uppercase", color: item.color,
                    }}>
                      {item.tag}
                    </span>
                    <span style={{
                      fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.75)",
                      letterSpacing: "0.02em",
                    }}>
                      {item.title}
                    </span>
                  </div>
                </div>

                {/* ── EXPANDED view — full content ── */}
                <div
                  style={{
                    position:   "absolute",
                    inset:      0,
                    padding:    "28px 28px",
                    display:    "flex",
                    flexDirection: "column",
                    opacity:    active ? 1 : 0,
                    transition: active ? "opacity 0.3s 0.2s" : "opacity 0.15s",
                    pointerEvents: active ? "auto" : "none",
                    overflowY:  "auto",
                  }}
                >
                  {/* Tag + metric */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 36, height: 36, borderRadius: 8,
                          background: `${item.color}18`,
                          border: `1px solid ${item.color}30`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={16} style={{ color: item.color }} />
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: item.color }}>
                        {item.tag}
                      </span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 26, fontWeight: 900, color: "#fff", lineHeight: 1 }}>
                        {item.metric}
                      </div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 3, fontWeight: 500 }}>
                        {item.metricLabel}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: "clamp(18px,2vw,26px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 10 }}>
                    {item.title}
                  </h3>

                  {/* Subtitle */}
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 600, marginBottom: 12 }}>
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, marginBottom: 20, flexShrink: 0 }}>
                    {item.description}
                  </p>

                  {/* Spacer */}
                  <div style={{ flex: 1 }} />

                  {/* CTA */}
                  <a
                    href="#contact"
                    onClick={ctaClick}
                    style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      gap: 6, padding: "10px 20px", borderRadius: 9999,
                      background: item.color, color: "#0a0a0a",
                      fontSize: 12, fontWeight: 700, textDecoration: "none",
                      letterSpacing: "0.04em", transition: "opacity 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    Start a Project
                  </a>
                </div>

              </div>
            );
          })}
        </motion.div>

        {/* Mobile hint */}
        <p className="mt-5 text-center text-white/25 text-xs font-medium tracking-widest uppercase md:hidden">
          Tap a panel to explore
        </p>

      </div>
    </section>
  );
}
