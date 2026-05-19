"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const COLS = [
  {
    heading: "Platform",
    links: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Cladwise App", href: "#contact" },
    ],
  },
  {
    heading: "Technical",
    links: [
      { label: "Estidama Docs", href: "#" },
      { label: "ADCD Codes", href: "#" },
      { label: "Material Data", href: "#" },
      { label: "U-Value Calc", href: "#" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "X (Twitter)", href: "#" },
    ],
  },
];

export default function FooterCladwise() {
  return (
    <footer
      id="contact"
      style={{ background: "#000", overflow: "hidden" }}
    >
      {/* Big CTA block */}
      <div style={{
        padding: "clamp(80px,10vw,140px) clamp(24px,5vw,80px) clamp(64px,8vw,100px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        textAlign: "center",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(32px,5vw,72px)",
            color: "#fff",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            maxWidth: 760,
            margin: "0 auto 40px",
          }}>
            Ready to streamline your facade specification?
          </h2>
          <a
            href="mailto:Emaaralmadinagrc@gmail.com"
            className="btn-lime"
            style={{ fontSize: 15, padding: "16px 40px" }}
          >
            Get Started Free <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>

      {/* Footer grid */}
      <div
        style={{
          padding: "clamp(48px,6vw,80px) clamp(24px,5vw,80px)",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "clamp(32px,4vw,64px)",
        }}
        className="footer-grid"
      >
        {/* Brand col */}
        <div>
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 24,
            color: "#fff",
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}>
            Cladwise<span style={{ color: "var(--c-lime)" }}>.</span>
          </div>
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(20px,2.5vw,32px)",
            color: "var(--c-lime)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 20,
          }}>
            LAUNCH CLADWISE ↗
          </div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: "rgba(255,255,255,0.3)",
            lineHeight: 1.7,
            maxWidth: 280,
          }}>
            Advanced facade engineering & digital cladding tools for the GCC. By ELM Emaar Facades, Sharjah, UAE.
          </p>
        </div>

        {/* Link columns */}
        {COLS.map(col => (
          <div key={col.heading}>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}>
              {col.heading}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {col.links.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      color: "rgba(255,255,255,0.5)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--c-lime)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: "20px clamp(24px,5vw,80px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
          © 2025 Emaar Al Madina LLC · ISO 9001 Certified · Sharjah, UAE
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
          GFRC · GFRP · UHPC · GRG
        </span>
      </div>
    </footer>
  );
}
