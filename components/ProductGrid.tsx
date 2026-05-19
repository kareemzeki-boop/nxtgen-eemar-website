"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PRODUCTS = [
  {
    id: "marketplace",
    num: "01",
    title: "Cladwise Marketplace",
    body: "Regional architectural cladding supplier data engines for the GCC.",
    cta: "Explore Live App",
  },
  {
    id: "thermal",
    num: "02",
    title: "Thermal Performance Module",
    body: "Automated U-value checking arrays evaluating dome configurations using GFRC outer skins and Rockwool insulation.",
    cta: "View Tech Docs",
  },
  {
    id: "spec",
    num: "03",
    title: "Specification Generator",
    body: "PDF documentation engines outputting GCC suitability reports for facade systems.",
    cta: "Try Generator",
  },
  {
    id: "viz",
    num: "04",
    title: "3D Detail Visualizer",
    body: "Clean interface showcases for CAD/BIM facade models and assembly details.",
    cta: "View Models",
  },
];

export default function ProductGrid() {
  return (
    <section
      id="projects"
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
          Digital Platform
        </span>
        <h2 className="section-title">OUR<span className="lime">*</span>MODULES</h2>
      </motion.div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "clamp(16px,2vw,24px)",
      }}>
        {PRODUCTS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="card-hover-root"
            style={{
              position: "relative",
              background: "var(--c-panel)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              padding: "clamp(24px,3vw,36px)",
              overflow: "hidden",
              minHeight: 260,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              cursor: "pointer",
            }}
          >
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 48,
              color: "rgba(255,255,255,0.06)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}>
              {p.num}
            </div>
            <h3 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(17px,1.5vw,22px)",
              color: "#fff",
              lineHeight: 1.25,
              flex: 1,
            }}>
              {p.title}
            </h3>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.65,
            }}>
              {p.body}
            </p>

            {/* Lime hover overlay */}
            <div className="card-hover-overlay">
              <a
                href="#contact"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 16,
                  color: "#000",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                }}
              >
                {p.cta} <ArrowUpRight size={18} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
