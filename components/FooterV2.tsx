"use client";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import KineticText from "./KineticText";
import MagneticEl from "./MagneticEl";
import { footerNavLinks, footerMaterials, company } from "@/lib/content";

// Hex logo SVG (same as Navbar/Footer)
function HexLogo() {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 12,
        background: "#C9A86C",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: "0 0 20px rgba(201,168,108,0.35)",
      }}
    >
      <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 1L17 5V13L9 17L1 13V5L9 1Z"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
        />
        <path d="M9 5L13 7V11L9 13L5 11V7L9 5Z" fill="white" fillOpacity="0.9" />
      </svg>
    </div>
  );
}

const DISPLAY_STYLE: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontWeight: 900,
  fontSize: "clamp(80px, 11vw, 160px)",
  letterSpacing: "-0.05em",
  lineHeight: 0.85,
  display: "block",
};

export default function FooterV2() {
  return (
    <footer
      style={{
        background: "var(--c-bg)",
        paddingTop: 80,
        paddingBottom: 48,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle ambient glow top-left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "60%",
          height: "50%",
          background:
            "radial-gradient(ellipse 60% 70% at 0% 0%, rgba(201,168,108,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* ── Large display typeset ── */}
        <div style={{ marginBottom: 48 }}>
          {/* ELM */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <KineticText
              text="ELM"
              as="span"
              delay={0}
              stagger={0.015}
              wordStagger={true}
              className="display-gold"
              style={DISPLAY_STYLE}
            />
          </motion.div>

          {/* EMAAR */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          >
            <KineticText
              text="EMAAR"
              as="span"
              delay={0.4}
              stagger={0.015}
              wordStagger={true}
              style={{ ...DISPLAY_STYLE, color: "var(--c-text)" }}
            />
          </motion.div>

          {/* FACADES */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
          >
            <KineticText
              text="FACADES"
              as="span"
              delay={0.8}
              stagger={0.015}
              wordStagger={true}
              className="display-outline"
              style={{ ...DISPLAY_STYLE, color: "var(--c-28)" }}
            />
          </motion.div>
        </div>

        {/* ── Gold gradient horizontal rule ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, #C9A86C44, #C9A86C, #C9A86C44, transparent)",
            marginBottom: 56,
          }}
        />

        {/* ── Bottom info strip — 4 columns ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-14">

          {/* Col 1: Logo + company name + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <HexLogo />
              <div>
                <div
                  className="font-bold text-sm tracking-tight leading-none"
                  style={{ color: "var(--c-text)" }}
                >
                  {company.name}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: "var(--c-35)" }}
                >
                  {company.taglineBy}
                </div>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--c-38)", maxWidth: 220 }}
            >
              Engineering living facades for the Middle East. Precision-manufactured architectural cladding from our Sharjah facility.
            </p>
          </motion.div>

          {/* Col 2: Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.07 }}
          >
            <div
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{
                color: "var(--c-25)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Navigation
            </div>
            <ul className="flex flex-col gap-2.5">
              {footerNavLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    className="text-sm font-medium transition-colors"
                    style={{ color: "var(--c-45)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "#C9A86C")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "var(--c-45)")
                    }
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Materials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.14 }}
          >
            <div
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{
                color: "var(--c-25)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Materials
            </div>
            <ul className="flex flex-col gap-2.5">
              {footerMaterials.map((mat, i) => (
                <motion.li
                  key={mat}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <a
                    href="#services"
                    className="mono text-sm font-medium transition-colors"
                    style={{ color: "var(--c-45)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "#C9A86C")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "var(--c-45)")
                    }
                  >
                    {mat}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4: Contact CTA box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.21 }}
          >
            <div
              className="rounded-2xl p-5 sm:p-6 flex flex-col gap-4"
              style={{
                background: "rgba(201,168,108,0.06)",
                border: "1px solid rgba(201,168,108,0.16)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(18px, 2vw, 22px)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: "var(--c-text)",
                }}
              >
                Ready to specify your facade?
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--c-45)" }}
              >
                Our engineering team responds to all enquiries within one business day.
              </p>

              {/* Email link */}
              <a
                href={`mailto:${company.email}`}
                className="text-sm font-medium flex items-center gap-1.5 transition-colors"
                style={{ color: "#C9A86C" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.8")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
                }
              >
                <Mail size={13} />
                {company.email}
              </a>

              {/* Start a Project CTA */}
              <MagneticEl strength={0.2}>
                <a
                  href="#contact"
                  className="btn-primary py-3 text-sm flex items-center justify-center gap-2"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight size={14} />
                </a>
              </MagneticEl>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{ borderTop: "1px solid var(--c-border-sm)" }}
      >
        <div
          className="max-w-7xl mx-auto px-5 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ fontSize: 10, color: "var(--c-25)" }}
        >
          <div className="text-center sm:text-left">
            {company.copyright}
          </div>
          <div
            className="flex flex-wrap justify-center sm:justify-end items-center gap-4"
          >
            <a
              href="#"
              className="transition-colors"
              style={{ color: "var(--c-25)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--c-55)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--c-25)")
              }
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="transition-colors"
              style={{ color: "var(--c-25)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--c-55)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--c-25)")
              }
            >
              Terms of Service
            </a>
            <span
              className="hidden sm:inline"
              style={{ color: "var(--c-25)" }}
            >
              ·
            </span>
            <span>ISO 9001 Certified</span>
            <span style={{ color: "var(--c-25)" }}>·</span>
            <span>Sharjah, UAE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
