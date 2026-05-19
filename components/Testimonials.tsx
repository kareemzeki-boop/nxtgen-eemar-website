"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials, testimonialsHeader } from "@/lib/content";
import KineticText from "./KineticText";

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scrollTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(testimonials.length - 1, idx));
    setActiveIdx(clamped);
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[clamped] as HTMLElement;
    if (card) {
      track.scrollTo({ left: card.offsetLeft - 24, behavior: "smooth" });
    }
  };

  return (
    <section
      className="section-dark py-20 md:py-28 overflow-hidden"
      style={{ borderTop: "1px solid var(--c-border)" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <span className="tag-pill bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-5">
              Client Testimonials
            </span>
            <KineticText
              text="What our clients say."
              delay={0.1}
              stagger={0.022}
              as="h2"
              style={{
                display: "block",
                fontSize: "clamp(32px, 4.5vw, 72px)",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 900,
                letterSpacing: "-0.035em",
                lineHeight: 0.95,
                color: "var(--c-text)",
                marginTop: 8,
              }}
            />
          </div>

          {/* Rating summary */}
          <div style={{ display: "flex", alignItems: "center", gap: 24, flexShrink: 0 }}>
            <div style={{ textAlign: "center" }}>
              <div className="mono" style={{
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 700,
                color: "#C9A86C",
                lineHeight: 1,
              }}>{testimonialsHeader.avgRating}</div>
              <div style={{ color: "var(--c-38)", fontSize: 11, marginTop: 4, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>Avg rating</div>
            </div>
            <div style={{ width: 1, height: 40, background: "var(--c-border-md)" }} />
            <div style={{ textAlign: "center" }}>
              <div className="mono" style={{
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 700,
                color: "var(--c-text)",
                lineHeight: 1,
              }}>{testimonialsHeader.reviewCount}</div>
              <div style={{ color: "var(--c-38)", fontSize: 11, marginTop: 4, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>Reviews</div>
            </div>

            {/* Nav arrows */}
            <div style={{ display: "flex", gap: 8, marginLeft: 8 }}>
              {[
                { fn: () => scrollTo(activeIdx - 1), icon: <ChevronLeft size={16} /> },
                { fn: () => scrollTo(activeIdx + 1), icon: <ChevronRight size={16} /> },
              ].map(({ fn, icon }, i) => (
                <button
                  key={i}
                  onClick={fn}
                  style={{
                    width: 40, height: 40, borderRadius: "50%",
                    border: "1px solid var(--c-border-md)",
                    background: "var(--c-panel)",
                    color: "var(--c-45)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "#C9A86C";
                    (e.currentTarget as HTMLButtonElement).style.color = "#0C0C0B";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#C9A86C";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--c-panel)";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--c-45)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-border-md)";
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Horizontal scroll track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "clamp(14px, 1.8vw, 20px)",
            overflowX: "auto",
            paddingBottom: 12,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: "grab",
          }}
          className="scrollbar-hide"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActiveIdx(i)}
              style={{
                flex: "0 0 clamp(280px, 32vw, 420px)",
                background: "var(--c-surface)",
                border: `1px solid ${activeIdx === i ? "rgba(201,168,108,0.3)" : "var(--c-border)"}`,
                borderRadius: 20,
                padding: "clamp(20px, 2.5vw, 32px)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                cursor: "pointer",
                transition: "border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
                transform: activeIdx === i ? "translateY(-4px)" : "translateY(0)",
                boxShadow: activeIdx === i ? "0 20px 60px rgba(0,0,0,0.4)" : "none",
              }}
            >
              {/* Quote icon */}
              <Quote size={24} style={{ color: "#C9A86C", opacity: 0.6 }} />

              {/* Stars */}
              <div style={{ display: "flex", gap: 3 }}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={12} fill="#f59e0b" style={{ color: "#f59e0b" }} />
                ))}
              </div>

              {/* Quote text */}
              <p style={{
                color: "var(--c-55)",
                fontSize: "clamp(13px, 1.1vw, 15px)",
                lineHeight: 1.72,
                flex: 1,
                fontStyle: "italic",
              }}>
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Attribution */}
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                paddingTop: 14,
                borderTop: "1px solid var(--c-border)",
              }}>
                <div
                  style={{
                    width: 38, height: 38, borderRadius: 12,
                    background: t.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 11, fontWeight: 700, flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--c-text)" }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: "var(--c-38)", lineHeight: 1.4 }}>
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              style={{
                width: i === activeIdx ? 24 : 8,
                height: 8,
                borderRadius: 999,
                background: i === activeIdx ? "#C9A86C" : "var(--c-border-md)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
