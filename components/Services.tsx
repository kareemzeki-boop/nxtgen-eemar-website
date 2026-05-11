"use client";
import { useState } from "react";
import { motion, useAnimationFrame, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { services } from "@/lib/content";

const SIZE = 210;
const HALF = SIZE / 2;

// Cube-container rotation (degrees) to bring each face front-facing
const FACE_ROT = [
  { x: 0,   y: 0   }, // front  → service[0] GFRC
  { x: 0,   y: -90 }, // right  → service[1] GFRP
  { x: 0,   y: 180 }, // back   → service[2] UHPC
  { x: 0,   y: 90  }, // left   → service[3] LTGRC
  { x: 90,  y: 0   }, // bottom → service[4] GFRG
  { x: -90, y: 0   }, // top    → brand
];

// CSS transform that positions each face in 3D space
const FACE_POS = [
  `translateZ(${HALF}px)`,
  `rotateY(90deg) translateZ(${HALF}px)`,
  `rotateY(180deg) translateZ(${HALF}px)`,
  `rotateY(-90deg) translateZ(${HALF}px)`,
  `rotateX(-90deg) translateZ(${HALF}px)`,
  `rotateX(90deg) translateZ(${HALF}px)`,
];

export default function Services() {
  const [selected, setSelected] = useState<number | null>(null);
  const [rotX, setRotX] = useState(-18);
  const [rotY, setRotY] = useState(0);
  const [idle, setIdle] = useState(true);

  useAnimationFrame((_, delta) => {
    if (idle) setRotY(y => y - delta * 0.022);
  });

  const goTo = (i: number) => {
    setIdle(false);
    setSelected(i);
    setRotX(FACE_ROT[i].x);
    setRotY(FACE_ROT[i].y);
  };

  const prev = () => goTo(selected === null ? 0 : (selected + services.length - 1) % services.length);
  const next = () => goTo(selected === null ? 0 : (selected + 1) % services.length);

  const deselect = () => {
    setSelected(null);
    setRotX(-18);
    setIdle(true);
  };

  const svc = selected !== null ? services[selected] : null;

  // 5 material faces + 1 brand face
  const faces: Array<{ svc: typeof services[0]; idx: number } | null> = [
    ...services.map((s, i) => ({ svc: s, idx: i })),
    null,
  ];

  return (
    <section id="services" className="section-light py-16 md:py-24 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 md:mb-16"
        >
          <span className="tag-pill bg-indigo-50 text-indigo-600 border border-indigo-100 mb-4">
            Our Materials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-zinc-900 max-w-3xl leading-tight mt-4">
            Five systems.<br />One engineered standard.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-500 max-w-2xl leading-relaxed">
            Every material system we produce is engineered for the GCC&apos;s climate extremes — UV, salinity, seismic loads, and the relentless demand for aesthetic precision.
          </p>
        </motion.div>

        {/* Cube + Detail panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16"
        >

          {/* ── Cube column ── */}
          <div className="flex flex-col items-center gap-6 flex-shrink-0">

            {/* 3D Cube */}
            <div
              style={{ width: SIZE, height: SIZE, perspective: SIZE * 5 }}
              onClick={() => { if (idle) goTo(0); }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                  transition: idle ? "none" : "transform 0.8s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                {faces.map((item, i) => {
                  if (!item) {
                    return (
                      <div
                        key="brand"
                        style={{
                          position: "absolute", width: SIZE, height: SIZE,
                          transform: FACE_POS[i],
                          background: "rgba(246,246,246,0.97)",
                          border: "2px solid #e4e4e7",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        <span style={{ fontSize: 14, fontWeight: 900, color: "#d4d4d8", letterSpacing: "0.18em" }}>
                          ELM
                        </span>
                      </div>
                    );
                  }

                  const { svc: s, idx } = item;
                  const isActive = selected === idx;

                  return (
                    <div
                      key={s.id}
                      onClick={(e) => { e.stopPropagation(); goTo(idx); }}
                      style={{
                        position: "absolute", width: SIZE, height: SIZE,
                        transform: FACE_POS[i],
                        background: isActive ? `${s.accentColor}14` : "rgba(255,255,255,0.97)",
                        border: `2px solid ${isActive ? s.accentColor : s.accentColor + "50"}`,
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                        gap: 10, cursor: "pointer",
                        transition: "background 0.3s, border-color 0.3s",
                      }}
                    >
                      {/* Top accent bar */}
                      <div style={{
                        position: "absolute", top: 0, left: 0, right: 0, height: 3,
                        background: s.accentColor,
                        opacity: isActive ? 1 : 0.4,
                        transition: "opacity 0.3s",
                      }} />

                      <span style={{
                        fontSize: 9, fontWeight: 800, color: s.accentColor,
                        letterSpacing: "0.25em", opacity: 0.75,
                      }}>
                        {s.number}
                      </span>

                      <span style={{
                        fontSize: 28, fontWeight: 900, color: "#18181b",
                        letterSpacing: "-0.03em", textAlign: "center",
                        padding: "0 14px", lineHeight: 1,
                      }}>
                        {s.title}
                      </span>

                      <span style={{
                        fontSize: 8, fontWeight: 700, letterSpacing: "0.1em",
                        textTransform: "uppercase", color: "#fff",
                        padding: "3px 10px", background: s.accentColor,
                        borderRadius: 999, opacity: isActive ? 1 : 0.8,
                      }}>
                        {s.full.split(" ").slice(0, 3).join(" ")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Material dots */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {services.map((s, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  title={s.title}
                  style={{
                    width: selected === i ? 26 : 9,
                    height: 9,
                    borderRadius: 9999,
                    background: selected === i ? s.accentColor : `${s.accentColor}40`,
                    border: "none", cursor: "pointer",
                    transition: "all 0.35s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            {idle && (
              <p style={{ fontSize: 11, color: "#a1a1aa", letterSpacing: "0.05em", textAlign: "center" }}>
                Tap a dot or the cube to explore
              </p>
            )}
          </div>

          {/* ── Detail panel ── */}
          <div style={{ flex: 1, minHeight: 380 }}>
            <AnimatePresence mode="wait">
              {svc ? (
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    background: "#fff",
                    border: `1px solid ${svc.accentColor}30`,
                    borderRadius: 16,
                    padding: "28px 28px 24px",
                    position: "relative",
                    boxShadow: `0 4px 40px ${svc.accentColor}10`,
                  }}
                >
                  {/* Top accent bar */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 3,
                    background: svc.accentColor, borderRadius: "16px 16px 0 0",
                  }} />

                  {/* Header row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 800, letterSpacing: "0.2em",
                        color: "rgba(0,0,0,0.22)",
                      }}>
                        {svc.number}
                      </span>
                      <span style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                        textTransform: "uppercase", color: svc.accentColor,
                        padding: "3px 10px", background: `${svc.accentColor}14`,
                        borderRadius: 999, border: `1px solid ${svc.accentColor}30`,
                      }}>
                        {svc.title}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 5 }}>
                      {[
                        { icon: <ChevronLeft size={13} />, action: prev },
                        { icon: <ChevronRight size={13} />, action: next },
                        { icon: <X size={13} />, action: deselect },
                      ].map(({ icon, action }, i) => (
                        <button
                          key={i}
                          onClick={action}
                          style={{
                            width: 28, height: 28, borderRadius: "50%",
                            background: "rgba(0,0,0,0.04)",
                            border: "1px solid rgba(0,0,0,0.08)",
                            cursor: "pointer", display: "flex",
                            alignItems: "center", justifyContent: "center",
                            color: "#71717a",
                          }}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Title + tagline */}
                  <h3 style={{
                    fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, color: "#18181b",
                    letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 6,
                  }}>
                    {svc.full}
                  </h3>
                  <p style={{ fontSize: 12, color: "#71717a", fontWeight: 600, marginBottom: 16 }}>
                    {svc.tagline}
                  </p>

                  {/* Description */}
                  <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.7, marginBottom: 18 }}>
                    {svc.description}
                  </p>

                  {/* Features */}
                  <ul style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 18 }}>
                    {svc.features.slice(0, 4).map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#3f3f46" }}>
                        <CheckCircle2 size={13} style={{ color: svc.accentColor, marginTop: 1, flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Quote */}
                  {svc.quote && (
                    <p style={{
                      fontSize: 11, color: "#a1a1aa", fontStyle: "italic",
                      marginBottom: 20, borderLeft: `2px solid ${svc.accentColor}45`,
                      paddingLeft: 10, lineHeight: 1.6,
                    }}>
                      &ldquo;{svc.quote.slice(0, 90)}&hellip;&rdquo;
                    </p>
                  )}

                  {/* CTA */}
                  <a
                    href="#contact"
                    style={{
                      display: "inline-flex", alignItems: "center",
                      gap: 6, padding: "10px 20px", borderRadius: 9999,
                      background: svc.accentColor, color: "#fff",
                      fontSize: 12, fontWeight: 700, textDecoration: "none",
                      letterSpacing: "0.04em", transition: "opacity 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    Request a Quote <ArrowUpRight size={13} />
                  </a>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    height: 380, display: "flex",
                    alignItems: "center", justifyContent: "center",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 48, marginBottom: 14, opacity: 0.15 }}>◈</div>
                    <p style={{ fontSize: 14, color: "#a1a1aa", fontWeight: 500, maxWidth: 260, margin: "0 auto", lineHeight: 1.6 }}>
                      Select any face of the cube to explore each material system
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>

        {/* Mobile hint */}
        <p className="mt-6 text-center text-zinc-300 text-xs font-medium tracking-widest uppercase md:hidden">
          Tap a face to explore
        </p>

      </div>
    </section>
  );
}
