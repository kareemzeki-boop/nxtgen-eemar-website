"use client";
import { motion } from "framer-motion";

const SERVICES = [
  { num: "01", label: "Facade Engineering & Shop Drawings" },
  { num: "02", label: "GFRC & UHPC Manufacturing Consultation" },
  { num: "03", label: "Estidama & ADCD Compliance Verification" },
  { num: "04", label: "Thermal Transmittance (U-Value) Modeling" },
  { num: "05", label: "Cladding Information Modeling (CIM)" },
  { num: "06", label: "Web Application Development for AEC" },
  { num: "07", label: "3D Architectural Detail Visualization" },
  { num: "08", label: "Supply Chain Material Comparison" },
];

export default function ServicesMatrix() {
  return (
    <section
      id="services"
      style={{
        background: "var(--c-bg)",
        padding: "clamp(80px,10vw,120px) clamp(24px,5vw,80px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: "clamp(40px,6vw,72px)" }}
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
          What We Offer
        </span>
        <h2 className="section-title">OUR<span className="lime">*</span>SERVICES</h2>
      </motion.div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "0",
      }}>
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "clamp(20px,2.5vw,28px) 0",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              cursor: "default",
            }}
            whileHover={{ x: 8 }}
          >
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 13,
              color: "var(--c-lime)",
              letterSpacing: "0.06em",
              flexShrink: 0,
              minWidth: 32,
            }}>
              {s.num}
            </span>
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(15px,1.4vw,18px)",
              color: "#fff",
              lineHeight: 1.3,
            }}>
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
