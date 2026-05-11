"use client";
import { useRef, useState } from "react";
import { motion, useAnimationFrame, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { services } from "@/lib/content";
import { ctaClick } from "@/lib/cta";

const SIZE = 200;
const HALF = SIZE / 2;

// Cube-container rotation to bring each face front-facing
const FACE_ROT = [
  { x: 0,   y: 0,   z: 0 }, // front  → GFRC
  { x: 0,   y: -90, z: 0 }, // right  → GFRP
  { x: 0,   y: 180, z: 0 }, // back   → UHPC
  { x: 0,   y: 90,  z: 0 }, // left   → LTGRC
  { x: 90,  y: 0,   z: 0 }, // bottom → GFRG
  { x: -90, y: 0,   z: 0 }, // top    → brand
];

const FACE_POS = [
  `translateZ(${HALF}px)`,
  `rotateY(90deg) translateZ(${HALF}px)`,
  `rotateY(180deg) translateZ(${HALF}px)`,
  `rotateY(-90deg) translateZ(${HALF}px)`,
  `rotateX(-90deg) translateZ(${HALF}px)`,
  `rotateX(90deg) translateZ(${HALF}px)`,
];

const norm = (a: number) => ((a % 360) + 360) % 360;
const angDist = (a: number, b: number) => Math.min(Math.abs(norm(a) - norm(b)), 360 - Math.abs(norm(a) - norm(b)));

const nearestFace = (rx: number, ry: number): number => {
  let best = 0, bestDist = Infinity;
  FACE_ROT.slice(0, 5).forEach(({ x, y }, i) => {
    const dist = Math.sqrt(angDist(rx, x) ** 2 + angDist(ry, y) ** 2);
    if (dist < bestDist) { bestDist = dist; best = i; }
  });
  return best;
};

export default function Services() {
  const [selected, setSelected] = useState<number | null>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [rotZ, setRotZ] = useState(0);
  const [idle, setIdle] = useState(true);
  const [dragging, setDragging] = useState(false);

  const dragRef = useRef<{
    startX: number; startY: number;
    startRotX: number; startRotY: number;
  } | null>(null);

  // Idle: rotate on all 3 axes like the reference card
  useAnimationFrame((_, delta) => {
    if (idle && !dragging) {
      const s = delta * 0.022;
      setRotX(v => v + s);
      setRotY(v => v + s);
      setRotZ(v => v + s);
    }
  });

  const goTo = (i: number) => {
    setIdle(false);
    setDragging(false);
    setSelected(i);
    setRotX(FACE_ROT[i].x);
    setRotY(FACE_ROT[i].y);
    setRotZ(0);
  };

  const prev = () => goTo(selected === null ? 0 : (selected + services.length - 1) % services.length);
  const next = () => goTo(selected === null ? 0 : (selected + 1) % services.length);

  const deselect = () => {
    setSelected(null);
    setRotX(0); setRotY(0); setRotZ(0);
    setIdle(true);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, startRotX: rotX, startRotY: rotY };
    setIdle(false);
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    setRotY(dragRef.current.startRotY + (e.clientX - dragRef.current.startX) * 0.6);
    setRotX(dragRef.current.startRotX - (e.clientY - dragRef.current.startY) * 0.35);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const finalRotX = dragRef.current.startRotX - (e.clientY - dragRef.current.startY) * 0.35;
    const finalRotY = dragRef.current.startRotY + (e.clientX - dragRef.current.startX) * 0.6;
    dragRef.current = null;
    goTo(nearestFace(finalRotX, finalRotY));
  };

  const svc = selected !== null ? services[selected] : null;

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

        {/* Cube + Detail */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16"
        >

          {/* ── Cube ── */}
          <div className="flex flex-col items-center gap-5 flex-shrink-0">
            <div
              style={{
                width: SIZE, height: SIZE,
                perspective: 800,
                margin: "50px auto",
                cursor: dragging ? "grabbing" : "grab",
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%", height: "100%",
                  transformStyle: "preserve-3d",
                  transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
                  transition: dragging || idle ? "none" : "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
                  userSelect: "none",
                }}
              >
                {faces.map((item, i) => {
                  if (!item) {
                    return (
                      <div key="brand" style={{
                        position: "absolute",
                        width: SIZE, height: SIZE,
                        transform: FACE_POS[i],
                        background: "rgba(0,0,0,0.8)",
                        border: "2px solid",
                        borderImage: "linear-gradient(135deg, #444, #888, #444) 1",
                        color: "#555",
                        fontSize: 13,
                        fontWeight: 900,
                        textAlign: "center",
                        lineHeight: `${SIZE}px`,
                        letterSpacing: "0.18em",
                      }}>
                        ELM
                      </div>
                    );
                  }

                  const { svc: s, idx } = item;
                  const isActive = selected === idx;

                  return (
                    <div key={s.id} style={{
                      position: "absolute",
                      width: SIZE, height: SIZE,
                      transform: FACE_POS[i],
                      background: isActive ? `rgba(0,0,0,0.92)` : "rgba(0,0,0,0.80)",
                      border: "2px solid",
                      borderImage: `linear-gradient(135deg, ${s.accentColor}, #ffffff55, ${s.accentColor}) 1`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      cursor: "pointer",
                    }}>
                      <span style={{
                        fontSize: 9, fontWeight: 800,
                        color: s.accentColor, letterSpacing: "0.25em",
                      }}>
                        {s.number}
                      </span>

                      <span style={{
                        fontSize: 32, fontWeight: 900,
                        color: "#ffffff",
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                        textAlign: "center",
                        padding: "0 12px",
                      }}>
                        {s.title}
                      </span>

                      <span style={{
                        fontSize: 8, fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#0a0a0a",
                        padding: "3px 10px",
                        background: s.accentColor,
                        borderRadius: 999,
                      }}>
                        {s.full.split(" ").slice(0, 3).join(" ")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <p style={{ fontSize: 11, color: "#aaa", letterSpacing: "0.05em", textAlign: "center" }}>
              {dragging ? "Release to snap" : idle ? "Drag to rotate the cube" : "Drag to explore more faces"}
            </p>
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
                    border: `1px solid ${svc.accentColor}35`,
                    borderRadius: 16,
                    padding: "28px 28px 24px",
                    position: "relative",
                    boxShadow: `0 4px 40px ${svc.accentColor}12`,
                  }}
                >
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 3,
                    background: svc.accentColor, borderRadius: "16px 16px 0 0",
                  }} />

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", color: "rgba(0,0,0,0.22)" }}>
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
                      <button onClick={prev} style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#71717a" }}>
                        <ChevronLeft size={13} />
                      </button>
                      <button onClick={next} style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#71717a" }}>
                        <ChevronRight size={13} />
                      </button>
                      <button onClick={deselect} style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#71717a" }}>
                        <X size={13} />
                      </button>
                    </div>
                  </div>

                  <h3 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, color: "#18181b", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 6 }}>
                    {svc.full}
                  </h3>
                  <p style={{ fontSize: 12, color: "#71717a", fontWeight: 600, marginBottom: 16 }}>
                    {svc.tagline}
                  </p>
                  <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.7, marginBottom: 18 }}>
                    {svc.description}
                  </p>

                  <ul style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 18 }}>
                    {svc.features.slice(0, 4).map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#3f3f46" }}>
                        <CheckCircle2 size={13} style={{ color: svc.accentColor, marginTop: 1, flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {svc.quote && (
                    <p style={{ fontSize: 11, color: "#a1a1aa", fontStyle: "italic", marginBottom: 20, borderLeft: `2px solid ${svc.accentColor}45`, paddingLeft: 10, lineHeight: 1.6 }}>
                      &ldquo;{svc.quote.slice(0, 90)}&hellip;&rdquo;
                    </p>
                  )}

                  <a
                    href="#contact"
                    onClick={ctaClick}
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 9999, background: svc.accentColor, color: "#fff", fontSize: 12, fontWeight: 700, textDecoration: "none", letterSpacing: "0.04em", transition: "opacity 0.2s" }}
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
                  style={{ height: 380, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 48, marginBottom: 14, opacity: 0.12 }}>◈</div>
                    <p style={{ fontSize: 14, color: "#a1a1aa", fontWeight: 500, maxWidth: 240, margin: "0 auto", lineHeight: 1.6 }}>
                      Rotate the cube to explore each material system
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
