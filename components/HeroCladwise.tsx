"use client";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export default function HeroCladwise() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "clamp(80px,10vw,140px) clamp(24px,5vw,80px) clamp(48px,6vw,80px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{
          position: "absolute", top: "clamp(80px,10vw,100px)", left: "clamp(24px,5vw,80px)",
          display: "flex", alignItems: "center", gap: 10,
        }}
      >
        <span style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "var(--c-lime)",
          display: "inline-block",
          boxShadow: "0 0 12px var(--c-lime)",
        }} />
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11, fontWeight: 600,
          color: "rgba(255,255,255,0.55)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}>
          Facade Engineering · GCC
        </span>
      </motion.div>

      {/* Main heading */}
      <div style={{ position: "relative" }}>
        {[
          { text: "FACADE*", delay: 0.1 },
          { text: "ENGINEERING", delay: 0.2 },
          { text: "& DIGITAL*", delay: 0.3 },
          { text: "SOLUTIONS", delay: 0.4, lime: true },
        ].map(({ text, delay, lime }) => (
          <div key={text} style={{ overflow: "hidden" }}>
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="section-title"
                style={{
                  display: "block",
                  color: lime ? "var(--c-lime)" : "#fff",
                }}
              >
                {text}
              </span>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Bottom strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 24,
          marginTop: 48,
          paddingTop: 32,
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(13px,1.1vw,15px)",
          color: "rgba(255,255,255,0.45)",
          maxWidth: 420,
          lineHeight: 1.7,
        }}>
          Advanced cladding manufacturing in GFRC, UHPC & GFRP — paired with digital tools that streamline facade specification across the GCC.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <a href="#projects" className="btn-lime" style={{ fontSize: 13 }}>
            View Projects <ArrowDownRight size={14} />
          </a>
          <a href="#about" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 28px",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 999,
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 13,
            color: "#fff",
            textDecoration: "none",
            transition: "border-color 0.2s ease",
          }}>
            Learn More
          </a>
        </div>
      </motion.div>

      {/* Corner scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        style={{
          position: "absolute", bottom: "clamp(40px,5vw,64px)", right: "clamp(24px,5vw,80px)",
          fontFamily: "'Inter', sans-serif",
          fontSize: 10,
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          writingMode: "vertical-rl",
        }}
      >
        Scroll to explore
      </motion.div>
    </section>
  );
}
