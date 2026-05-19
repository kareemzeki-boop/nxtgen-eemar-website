"use client";
import { motion } from "framer-motion";

const ITEMS = [
  {
    num: "01",
    title: "Innovative Facade Solutions, Timeless Engineering",
    body: "Focusing on advanced cladding manufacturing, technical engineering, and installation across the UAE.",
  },
  {
    num: "02",
    title: "Material Expertise, Compliance Driven",
    body: "Deep specialization in high-performance materials including GFRC, UHPC, GFRP, and ACM.",
  },
  {
    num: "03",
    title: "Digital Cladding Information Models",
    body: "Bridging the gap between architecture and fabrication by building intuitive, data-driven web applications for the facade industry.",
  },
  {
    num: "04",
    title: "Uncompromising Standards",
    body: "Engineered strictly to satisfy rigorous UAE construction frameworks, including ADCD life safety codes and Estidama Pearl Building Rating System requirements.",
  },
];

export default function AboutCladwise() {
  return (
    <section
      id="about"
      style={{
        background: "var(--c-bg)",
        padding: "clamp(80px,12vw,160px) clamp(24px,5vw,80px)",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: "clamp(48px,8vw,96px)" }}
      >
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11, fontWeight: 600,
          color: "var(--c-lime)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          display: "block",
          marginBottom: 20,
        }}>
          Who We Are
        </span>
        <h2 className="section-title">ABOUT<span className="lime">*</span>US</h2>
      </motion.div>

      {/* Items */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "clamp(32px, 4vw, 48px)",
      }}>
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.num}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              paddingTop: 32,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(56px,6vw,80px)",
              color: "rgba(255,255,255,0.04)",
              lineHeight: 1,
              marginBottom: 16,
              letterSpacing: "-0.04em",
            }}>
              {item.num}
            </div>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(16px,1.4vw,20px)",
              color: "#fff",
              lineHeight: 1.3,
              marginBottom: 16,
            }}>
              {item.title}
            </div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(13px,1vw,14px)",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.75,
            }}>
              {item.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
