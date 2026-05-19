"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/content";
import KineticText from "./KineticText";

gsap.registerPlugin(ScrollTrigger);

const MATERIAL_COLORS: Record<string, string> = {
  GFRC:  "#5DC39B",
  GFRP:  "#8b5cf6",
  UHPC:  "#06b6d4",
  GRG:   "#8b5cf6",
  LTGRC: "#f59e0b",
  GFRG:  "#10b981",
};

const ALL_FILTERS = ["All", "GFRC", "GFRP", "UHPC", "GRG", "LTGRC"];

export default function HorizontalProjects() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = filter === "All"
    ? projects
    : projects.filter(p => p.material === filter);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track   = trackRef.current;
    if (!wrapper || !track) return;

    // Small screens: no horizontal scroll, use vertical layout
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const getScroll = () => track.scrollWidth - window.innerWidth;

      const tl = gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${getScroll() * 1.08}`,
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return tl;
    });

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <section className="section-dark py-16 md:py-0" id="projects">

      {/* ── Section header (always visible above the pin) ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 pb-10 md:pt-20 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="tag-pill bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
            Portfolio
          </span>
          <KineticText
            text="Our Projects"
            delay={0.1}
            stagger={0.025}
            as="h2"
            style={{
              display: "block",
              fontSize: "clamp(40px, 5.5vw, 88px)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 0.92,
              color: "var(--c-text)",
              marginTop: 12,
              marginBottom: 24,
            }}
          />
        </motion.div>

        {/* Filter pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {ALL_FILTERS.map(f => (
            <motion.button
              key={f}
              onClick={() => setFilter(f)}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: "7px 18px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
                border: "1px solid",
                transition: "all 0.2s ease",
                background: filter === f ? "#C9A86C" : "var(--c-panel)",
                color: filter === f ? "#0C0C0B" : "var(--c-45)",
                borderColor: filter === f ? "#C9A86C" : "var(--c-border)",
              }}
            >
              {f}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Horizontal scroll container (desktop only) ── */}
      <div ref={wrapperRef} className="hidden md:block" style={{ overflow: "hidden" }}>
        <div
          ref={trackRef}
          className="h-scroll-track"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "stretch",
            paddingLeft: "clamp(20px, 5vw, 80px)",
            paddingRight: "clamp(20px, 5vw, 80px)",
            paddingTop: 8,
            paddingBottom: "clamp(40px, 6vh, 64px)",
            gap: "clamp(16px, 2vw, 24px)",
            willChange: "transform",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const color = MATERIAL_COLORS[project.material] ?? "#C9A86C";
              const isHovered = hovered === project.id;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: "relative",
                    flex: "0 0 clamp(280px, 38vw, 580px)",
                    height: "clamp(380px, 68vh, 680px)",
                    borderRadius: "clamp(16px, 2vw, 28px)",
                    overflow: "hidden",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                  onHoverStart={() => setHovered(project.id)}
                  onHoverEnd={() => setHovered(null)}
                >
                  {/* Background image */}
                  <motion.div
                    style={{
                      position: "absolute", inset: 0,
                      transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
                      transform: isHovered ? "scale(1.07)" : "scale(1.0)",
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                      loading="lazy"
                    />
                  </motion.div>

                  {/* Gradient overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.82) 100%)",
                    transition: "opacity 0.4s ease",
                    opacity: isHovered ? 0.9 : 1,
                  }} />

                  {/* Color accent top line */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 3,
                    background: `linear-gradient(90deg, ${color}, ${color}44)`,
                  }} />

                  {/* Top row: material badge + year */}
                  <div style={{
                    position: "absolute", top: 20, left: 20, right: 20,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <span style={{
                      padding: "4px 12px",
                      borderRadius: 999,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color,
                      background: `${color}18`,
                      border: `1px solid ${color}35`,
                    }}>
                      {project.material}
                    </span>
                    <span className="mono" style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.45)",
                      fontWeight: 600,
                    }}>
                      {project.year}
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "clamp(16px, 2.5vw, 28px)",
                  }}>
                    {/* Location */}
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                      <MapPin size={10} style={{ color }} />
                      <span className="mono" style={{
                        fontSize: 10, fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color,
                      }}>
                        {project.location}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "clamp(22px, 2.5vw, 38px)",
                      fontWeight: 900,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.05,
                      color: "#fff",
                      marginBottom: 8,
                    }}>
                      {project.title}
                    </h3>

                    {/* Area */}
                    <div className="mono" style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.4)",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      marginBottom: isHovered ? 12 : 0,
                      transition: "margin 0.3s ease",
                    }}>
                      {project.area}
                    </div>

                    {/* Description — visible on hover */}
                    <motion.div
                      initial={false}
                      animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.6)",
                        lineHeight: 1.65,
                        marginBottom: 14,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}>
                        {project.description}
                      </p>
                      <a
                        href="#contact"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          fontSize: 12, fontWeight: 700,
                          color: "#C9A86C",
                          textDecoration: "none",
                          letterSpacing: "0.04em",
                        }}
                      >
                        Enquire about this project
                        <ArrowRight size={12} />
                      </a>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* End card — CTA */}
          <div style={{
            flex: "0 0 clamp(240px, 28vw, 380px)",
            height: "clamp(380px, 68vh, 680px)",
            borderRadius: "clamp(16px, 2vw, 28px)",
            border: "1px dashed rgba(201,168,108,0.25)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            padding: 40,
            flexShrink: 0,
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "rgba(201,168,108,0.08)",
              border: "1px solid rgba(201,168,108,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ArrowRight size={24} style={{ color: "#C9A86C" }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(20px, 2.2vw, 32px)",
                fontWeight: 700,
                color: "var(--c-text)",
                marginBottom: 8,
              }}>
                Start Your Project
              </div>
              <p style={{ fontSize: 13, color: "var(--c-40)", lineHeight: 1.6, maxWidth: 220 }}>
                Let&apos;s create something iconic together.
              </p>
            </div>
            <a href="#contact" className="btn-primary" style={{ padding: "12px 28px", fontSize: 13 }}>
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* ── Mobile: vertical fallback ── */}
      <div className="md:hidden px-5 sm:px-6 pb-16 space-y-4 mt-2">
        {filtered.map((project) => {
          const color = MATERIAL_COLORS[project.material] ?? "#C9A86C";
          return (
            <motion.div
              key={`mob-${project.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "relative",
                height: 260,
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="lazy"
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.82) 100%)",
              }} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: color }} />
              <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {project.material} · {project.location}
                </span>
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 22, fontWeight: 900,
                  color: "#fff", letterSpacing: "-0.02em",
                  lineHeight: 1.1, marginTop: 4,
                }}>
                  {project.title}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stats strip */}
      <div
        className="max-w-7xl mx-auto px-5 sm:px-6"
        style={{ paddingBottom: "clamp(48px, 8vh, 80px)" }}
      >
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "clamp(24px, 4vw, 48px)",
          borderTop: "1px solid var(--c-border)",
          paddingTop: 28,
        }}>
          {[
            { num: "80+", label: "Projects Delivered" },
            { num: "6",   label: "GCC Countries" },
            { num: "100K+", label: "m² Installed" },
            { num: "15+", label: "Years Experience" },
          ].map(stat => (
            <div key={stat.label} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span
                className="mono"
                style={{ fontSize: "clamp(22px, 2.5vw, 36px)", fontWeight: 700, color: "#C9A86C" }}
              >
                {stat.num}
              </span>
              <span style={{ fontSize: 12, color: "var(--c-38)", fontWeight: 600, letterSpacing: "0.04em" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
