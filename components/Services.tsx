"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { services } from "@/lib/content";
import { ctaClick } from "@/lib/cta";

const SIZE = 260;
const HALF = SIZE / 2;

const FACE_ROT = [
  { x: 0,   y: 0,   z: 0 },
  { x: 0,   y: -90, z: 0 },
  { x: 0,   y: 180, z: 0 },
  { x: 0,   y: 90,  z: 0 },
  { x: 90,  y: 0,   z: 0 },
  { x: -90, y: 0,   z: 0 },
];

const FACE_POS = [
  `translateZ(${HALF}px)`,
  `rotateY(90deg) translateZ(${HALF}px)`,
  `rotateY(180deg) translateZ(${HALF}px)`,
  `rotateY(-90deg) translateZ(${HALF}px)`,
  `rotateX(-90deg) translateZ(${HALF}px)`,
  `rotateX(90deg) translateZ(${HALF}px)`,
];

const norm     = (a: number) => ((a % 360) + 360) % 360;
const angDist  = (a: number, b: number) => Math.min(Math.abs(norm(a) - norm(b)), 360 - Math.abs(norm(a) - norm(b)));
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
  const [isMobile, setIsMobile] = useState(false);
  const [rotX, setRotX] = useState(-15);
  const [rotY, setRotY] = useState(20);
  const [rotZ, setRotZ] = useState(0);
  const [idle, setIdle] = useState(true);
  const [dragging, setDragging] = useState(false);

  const dragRef = useRef<{
    startX: number; startY: number;
    startRotX: number; startRotY: number;
  } | null>(null);

  useAnimationFrame((_, delta) => {
    if (idle && !dragging) {
      const s = delta * 0.018;
      setRotX(v => v + s * 0.7);
      setRotY(v => v + s);
      setRotZ(v => v + s * 0.4);
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
    setRotX(-15); setRotY(20); setRotZ(0);
    setIdle(true);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
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
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    const finalRotX = dragRef.current.startRotX - dy * 0.35;
    const finalRotY = dragRef.current.startRotY + dx * 0.6;
    dragRef.current = null;
    setDragging(false);
    goTo(nearestFace(finalRotX, finalRotY));
  };

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const svc = selected !== null ? services[selected] : null;

  const faces: Array<{ svc: typeof services[0]; idx: number } | null> = [
    ...services.map((s, i) => ({ svc: s, idx: i })),
    null,
  ];

  return (
    <section
      id="services"
      className="relative overflow-hidden"
      style={{ background: "#080808", paddingTop: "clamp(64px,8vw,120px)", paddingBottom: "clamp(64px,8vw,120px)" }}
    >
      {/* ambient glow behind cube */}
      <div
        aria-hidden
        style={{
          position: "absolute", top: "30%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 700, height: 700,
          background: "radial-gradient(circle, rgba(93,195,155,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14 md:mb-20"
        >
          <span
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 10, fontWeight: 800, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "#5DC39B",
              border: "1px solid rgba(93,195,155,0.25)",
              borderRadius: 999, padding: "5px 14px",
              background: "rgba(93,195,155,0.07)",
              marginBottom: 20,
            }}
          >
            Our Materials
          </span>
          <h2
            style={{
              fontSize: "clamp(32px,5vw,64px)",
              fontWeight: 900, letterSpacing: "-0.035em",
              color: "#fff", lineHeight: 1.05,
              marginBottom: 16,
            }}
          >
            Five systems.<br />
            <span style={{ color: "rgba(255,255,255,0.35)" }}>One engineered standard.</span>
          </h2>
          <p style={{ fontSize: "clamp(14px,1.5vw,17px)", color: "rgba(255,255,255,0.45)", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            Every material we produce is engineered for GCC climate extremes — UV, salinity, seismic loads, and the relentless demand for architectural precision.
          </p>
        </motion.div>

        {/* ── Main stage ── */}
        <div
          style={{
            display: "flex",
            flexDirection: selected !== null && !isMobile ? "row" : "column",
            alignItems: selected !== null && !isMobile ? "flex-start" : "center",
            gap: selected !== null ? "clamp(24px,3vw,56px)" : 0,
            transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >

          {/* ── Cube column ── */}
          <motion.div
            layout
            style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              flexShrink: 0,
            }}
          >
            {/* Cube pop entrance */}
            <motion.div
              initial={{ scale: 0.45, opacity: 0, y: 60, rotateX: -25 }}
              whileInView={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 160, damping: 18, delay: 0.18 }}
              style={{ position: "relative" }}
            >
              {/* glow ring */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: "50%", left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: SIZE * 1.7, height: SIZE * 1.7,
                  borderRadius: "50%",
                  background: svc
                    ? `radial-gradient(circle, ${svc.accentColor}18 0%, transparent 70%)`
                    : "radial-gradient(circle, rgba(93,195,155,0.10) 0%, transparent 70%)",
                  transition: "background 0.6s ease",
                  pointerEvents: "none",
                }}
              />

              {/* drag container */}
              <div
                style={{
                  width: SIZE, height: SIZE,
                  perspective: 900,
                  margin: "clamp(40px,5vw,60px) auto",
                  cursor: dragging ? "grabbing" : "grab",
                  touchAction: "none",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  position: "relative", zIndex: 1,
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
              >
                <div
                  style={{
                    position: "relative", width: "100%", height: "100%",
                    transformStyle: "preserve-3d",
                    transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
                    transition: dragging || idle ? "none" : "transform 0.65s cubic-bezier(0.34,1.56,0.64,1)",
                    userSelect: "none",
                  }}
                >
                  {faces.map((item, i) => {
                    if (!item) {
                      return (
                        <div key="brand" style={{
                          position: "absolute", width: SIZE, height: SIZE,
                          transform: FACE_POS[i],
                          background: "rgba(8,8,8,0.9)",
                          border: "1.5px solid rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.15)",
                          fontSize: 11, fontWeight: 900,
                          textAlign: "center", lineHeight: `${SIZE}px`,
                          letterSpacing: "0.22em",
                        }}>
                          ELM
                        </div>
                      );
                    }

                    const { svc: s, idx } = item;
                    const isActive = selected === idx;

                    return (
                      <div
                        key={s.id}
                        onClick={() => goTo(idx)}
                        style={{
                          position: "absolute", width: SIZE, height: SIZE,
                          transform: FACE_POS[i],
                          background: isActive
                            ? `linear-gradient(135deg, rgba(8,8,8,0.98), rgba(20,20,20,0.95))`
                            : "rgba(12,12,12,0.88)",
                          border: `1.5px solid ${isActive ? s.accentColor + "60" : "rgba(255,255,255,0.08)"}`,
                          boxShadow: isActive ? `inset 0 0 40px ${s.accentColor}12` : "none",
                          display: "flex", flexDirection: "column",
                          alignItems: "center", justifyContent: "center",
                          gap: 12, cursor: "pointer",
                          transition: "border-color 0.3s, box-shadow 0.3s",
                        }}
                      >
                        <span style={{
                          fontSize: 9, fontWeight: 800, color: s.accentColor,
                          letterSpacing: "0.28em", opacity: 0.9,
                        }}>
                          {s.number}
                        </span>
                        <span style={{
                          fontSize: 36, fontWeight: 900, color: "#fff",
                          letterSpacing: "-0.04em", lineHeight: 1,
                          textAlign: "center", padding: "0 14px",
                        }}>
                          {s.title}
                        </span>
                        <span style={{
                          fontSize: 8, fontWeight: 700, letterSpacing: "0.1em",
                          textTransform: "uppercase", color: "#000",
                          padding: "4px 12px", background: s.accentColor,
                          borderRadius: 999,
                        }}>
                          {s.full.split(" ").slice(0, 3).join(" ")}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* hint text */}
            <p style={{
              fontSize: 11, color: "rgba(255,255,255,0.28)",
              letterSpacing: "0.06em", textAlign: "center",
              marginTop: 4,
            }}>
              {dragging ? "Release to snap" : idle ? "Drag · tap a face to explore" : "Drag to explore · tap again to select"}
            </p>

            {/* material pill nav */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.5 }}
              style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginTop: 20 }}
            >
              {services.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 999,
                    fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
                    cursor: "pointer", border: "none",
                    transition: "all 0.25s",
                    background: selected === i ? s.accentColor : "rgba(255,255,255,0.06)",
                    color: selected === i ? "#000" : "rgba(255,255,255,0.45)",
                    outline: selected === i ? "none" : "1px solid rgba(255,255,255,0.10)",
                    transform: selected === i ? "scale(1.06)" : "scale(1)",
                  }}
                >
                  {s.title}
                </button>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Detail panel ── */}
          <AnimatePresence mode="wait">
            {svc ? (
              <motion.div
                key={selected}
                layout
                initial={{ opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 24 : 0, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: isMobile ? 0 : -20, y: isMobile ? -12 : 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  flex: 1,
                  width: "100%",
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid rgba(255,255,255,0.08)`,
                  borderRadius: 20,
                  padding: "clamp(20px,3vw,36px)",
                  position: "relative",
                  overflow: "hidden",
                  backdropFilter: "blur(12px)",
                  marginTop: isMobile ? 16 : 0,
                }}
              >
                {/* accent top bar */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, ${svc.accentColor}, ${svc.accentColor}50)`,
                  borderRadius: "20px 20px 0 0",
                }} />

                {/* ambient glow inside card */}
                <div aria-hidden style={{
                  position: "absolute", top: -60, right: -60,
                  width: 200, height: 200, borderRadius: "50%",
                  background: `radial-gradient(circle, ${svc.accentColor}14 0%, transparent 70%)`,
                  pointerEvents: "none",
                }} />

                {/* header row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 800, letterSpacing: "0.2em",
                      color: "rgba(255,255,255,0.2)",
                    }}>
                      {svc.number}
                    </span>
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                      textTransform: "uppercase", color: svc.accentColor,
                      padding: "4px 12px", background: `${svc.accentColor}18`,
                      borderRadius: 999, border: `1px solid ${svc.accentColor}30`,
                    }}>
                      {svc.title}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[{ icon: <ChevronLeft size={13} />, fn: prev }, { icon: <ChevronRight size={13} />, fn: next }, { icon: <X size={13} />, fn: deselect }]
                      .map(({ icon, fn }, k) => (
                        <button key={k} onClick={fn} style={{
                          width: 30, height: 30, borderRadius: "50%",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.10)",
                          cursor: "pointer", display: "flex",
                          alignItems: "center", justifyContent: "center",
                          color: "rgba(255,255,255,0.5)",
                        }}>
                          {icon}
                        </button>
                      ))}
                  </div>
                </div>

                <h3 style={{
                  fontSize: "clamp(20px,2.4vw,30px)", fontWeight: 900,
                  color: "#fff", letterSpacing: "-0.03em",
                  lineHeight: 1.1, marginBottom: 8,
                }}>
                  {svc.full}
                </h3>
                <p style={{ fontSize: 13, color: svc.accentColor, fontWeight: 600, marginBottom: 18, opacity: 0.9 }}>
                  {svc.tagline}
                </p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: 20 }}>
                  {svc.description}
                </p>

                <ul style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 22 }}>
                  {svc.features.slice(0, 4).map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                      <CheckCircle2 size={13} style={{ color: svc.accentColor, marginTop: 1, flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {svc.quote && (
                  <p style={{
                    fontSize: 11, color: "rgba(255,255,255,0.35)",
                    fontStyle: "italic", marginBottom: 22,
                    borderLeft: `2px solid ${svc.accentColor}40`,
                    paddingLeft: 12, lineHeight: 1.7,
                  }}>
                    &ldquo;{svc.quote.slice(0, 90)}&hellip;&rdquo;
                  </p>
                )}

                <a
                  href="#contact"
                  onClick={ctaClick}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    padding: "11px 22px", borderRadius: 9999,
                    background: svc.accentColor, color: "#000",
                    fontSize: 12, fontWeight: 800,
                    textDecoration: "none", letterSpacing: "0.04em",
                    transition: "opacity 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1.03)"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
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
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}
              >
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.22)", textAlign: "center", maxWidth: 220, lineHeight: 1.6 }}>
                  Tap a face or select a material below to explore the system
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
