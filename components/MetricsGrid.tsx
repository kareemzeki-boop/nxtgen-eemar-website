"use client";
import { motion } from "framer-motion";

const METRICS = [
  { label: "GFRC & UHPC",  sub: "Core high-performance cladding materials",  lime: true },
  { label: "100% ADCD",    sub: "Civil defense life safety alignment",         lime: true },
  { label: "Estidama",     sub: "Pearl rating system compliance parameters",   lime: false },
  { label: "U-Value Calc", sub: "Automated thermal transmittance tracking",    lime: false },
  { label: "GCC Ready",    sub: "Verified for extreme Middle Eastern climates", lime: true },
  { label: "01 Platform",  sub: "Unified material selection ecosystem",        lime: false },
];

export default function MetricsGrid() {
  return (
    <section style={{
      background: "var(--c-bg)",
      padding: "0 clamp(24px,5vw,80px) clamp(80px,10vw,120px)",
    }}>
      {/* Header row */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: "clamp(40px,5vw,64px)",
        paddingTop: "clamp(40px,5vw,64px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}>
        <h2 className="section-title" style={{ fontSize: "clamp(32px,4vw,56px)" }}>
          PERFORMANCE<span className="lime">*</span>METRICS
        </h2>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11, color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.1em", textTransform: "uppercase",
        }}>
          Engineering Standards
        </span>
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 16,
        overflow: "hidden",
      }}>
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            style={{
              background: "var(--c-bg)",
              padding: "clamp(24px,3vw,40px)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(20px,2.5vw,32px)",
              color: m.lime ? "var(--c-lime)" : "#fff",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}>
              {m.label}
            </div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.6,
            }}>
              {m.sub}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
