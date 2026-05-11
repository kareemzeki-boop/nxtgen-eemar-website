"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { services } from "@/lib/content";

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="section-light py-16 md:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 md:mb-14"
        >
          <span className="tag-pill bg-indigo-50 text-indigo-600 border border-indigo-100 mb-4">
            Our Materials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-zinc-900 max-w-3xl leading-tight mt-4">
            Five systems. One engineered standard.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-500 max-w-2xl leading-relaxed">
            Every material system we produce is engineered for the GCC&apos;s climate extremes — UV, salinity, seismic loads, and the relentless demand for aesthetic precision.
          </p>
        </motion.div>

        {/* ── Expanding accordion cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="flex flex-col md:flex-row gap-2"
          style={{ height: "clamp(480px, 54vh, 580px)" }}
          onMouseLeave={() => setHovered(null)}
        >
          {services.map((svc, i) => {
            const active = hovered === i;
            const dimmed = hovered !== null && !active;

            return (
              <div
                key={svc.id}
                onMouseEnter={() => setHovered(i)}
                style={{
                  flex:         active ? 4 : dimmed ? 0.45 : 1,
                  transition:   "flex 0.5s cubic-bezier(0.4,0,0.2,1)",
                  border:       `1px solid ${active ? svc.accentColor : svc.accentColor + "35"}`,
                  background:   "#ffffff",
                  borderRadius: "12px",
                  overflow:     "hidden",
                  cursor:       "pointer",
                  position:     "relative",
                  minWidth:     0,
                }}
              >
                {/* Top accent bar */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: svc.accentColor,
                  opacity: active ? 1 : 0.35,
                  transition: "opacity 0.5s",
                }} />

                {/* Background image watermark — visible when expanded */}
                <img
                  src={svc.image}
                  alt=""
                  aria-hidden="true"
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    opacity: active ? 0.06 : 0,
                    transition: "opacity 0.5s",
                    pointerEvents: "none",
                  }}
                />

                {/* ── COLLAPSED — rotated label ── */}
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: active ? 0 : 1,
                  transition: "opacity 0.25s",
                  pointerEvents: active ? "none" : "auto",
                }}>
                  {/* Desktop/tablet: title only, rotated */}
                  <div
                    className="hidden md:flex"
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      transform: "rotate(-90deg)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span style={{
                      fontSize: 17, fontWeight: 900, letterSpacing: "-0.01em",
                      color: "#18181b",
                    }}>
                      {svc.title}
                    </span>
                  </div>

                  {/* Mobile: horizontal, all elements */}
                  <div
                    className="flex md:hidden"
                    style={{
                      flexDirection: "column",
                      alignItems: "center", gap: 12,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span style={{
                      fontSize: 10, fontWeight: 800, letterSpacing: "0.2em",
                      color: "rgba(0,0,0,0.2)", textTransform: "uppercase",
                    }}>
                      {svc.number}
                    </span>
                    <span style={{
                      fontSize: 15, fontWeight: 900, letterSpacing: "-0.01em",
                      color: "#18181b",
                    }}>
                      {svc.title}
                    </span>
                    <span style={{
                      fontSize: 9, fontWeight: 700, letterSpacing: "0.12em",
                      textTransform: "uppercase", color: svc.accentColor,
                      padding: "3px 8px", background: `${svc.accentColor}15`,
                      borderRadius: 999, border: `1px solid ${svc.accentColor}30`,
                    }}>
                      {svc.full.split(" ").slice(0, 3).join(" ")}
                    </span>
                  </div>
                </div>

                {/* ── EXPANDED — full content ── */}
                <div style={{
                  position: "absolute", inset: 0,
                  padding: "24px 24px",
                  display: "flex", flexDirection: "column",
                  opacity: active ? 1 : 0,
                  transition: active ? "opacity 0.3s 0.2s" : "opacity 0.15s",
                  pointerEvents: active ? "auto" : "none",
                  overflowY: "auto",
                }}>

                  {/* Number + title */}
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: "rgba(0,0,0,0.2)", letterSpacing: "0.2em" }}>
                        {svc.number}
                      </span>
                      <span style={{
                        fontSize: 9, fontWeight: 700, letterSpacing: "0.12em",
                        textTransform: "uppercase", color: svc.accentColor,
                        padding: "3px 8px", borderRadius: 999,
                        background: `${svc.accentColor}15`,
                        border: `1px solid ${svc.accentColor}30`,
                      }}>
                        {svc.title}
                      </span>
                    </div>
                    <h3 style={{ fontSize: "clamp(16px,1.8vw,22px)", fontWeight: 900, color: "#18181b", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                      {svc.full}
                    </h3>
                    <p style={{ fontSize: 11, color: "#71717a", fontWeight: 600, marginTop: 4 }}>
                      {svc.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: 12, color: "#52525b", lineHeight: 1.65, marginBottom: 14, flexShrink: 0 }}>
                    {svc.description}
                  </p>

                  {/* Features */}
                  <ul style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14, flexShrink: 0 }}>
                    {svc.features.slice(0, 4).map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 11, color: "#3f3f46" }}>
                        <CheckCircle2 size={12} style={{ color: svc.accentColor, marginTop: 1, flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div style={{ flex: 1 }} />

                  {/* Quote snippet */}
                  {svc.quote && (
                    <p style={{ fontSize: 11, color: "#a1a1aa", fontStyle: "italic", marginBottom: 14, borderLeft: `2px solid ${svc.accentColor}40`, paddingLeft: 10, lineHeight: 1.5 }}>
                      &ldquo;{svc.quote.slice(0, 90)}&hellip;&rdquo;
                    </p>
                  )}

                  {/* CTA */}
                  <a
                    href="#contact"
                    style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      gap: 6, padding: "10px 18px", borderRadius: 9999,
                      background: svc.accentColor, color: "#fff",
                      fontSize: 11, fontWeight: 700, textDecoration: "none",
                      letterSpacing: "0.04em", transition: "opacity 0.2s",
                      flexShrink: 0,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    Request a Quote <ArrowUpRight size={12} />
                  </a>

                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Mobile hint */}
        <p className="mt-5 text-center text-zinc-300 text-xs font-medium tracking-widest uppercase md:hidden">
          Tap a panel to explore
        </p>

      </div>
    </section>
  );
}
