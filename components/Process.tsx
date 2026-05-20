"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { process as phases } from "@/lib/content";

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.8", "end 0.2"] });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="section-light py-16 md:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8"
        >
          <div>
            <span className="tag-pill mb-4" style={{ background: "rgba(45,212,191,0.10)", color: "#14B8A6", border: "1px solid rgba(45,212,191,0.20)" }}>
              Our Process
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-tight mt-4 max-w-2xl display" style={{ color: "#1C1C18" }}>
              From brief to building.
              <br />
              <span style={{ color: "rgba(28,28,24,0.25)" }}>Four phases.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed md:max-w-sm lg:max-w-md" style={{ color: "rgba(28,28,24,0.55)" }}>
            A structured, collaborative delivery model refined over 15 years of GCC facade projects —
            designed to eliminate surprises on site.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative" ref={sectionRef}>
          {/* Animated SVG line — desktop only */}
          <div className="absolute left-[2.25rem] top-8 bottom-8 w-px hidden md:block overflow-hidden" style={{ zIndex: 0 }}>
            <svg width="2" height="100%" style={{ position: "absolute", inset: 0 }}>
              {/* Track */}
              <line x1="1" y1="0%" x2="1" y2="100%" stroke="rgba(28,28,24,0.08)" strokeWidth="1.5" />
              {/* Animated fill */}
              <motion.line
                x1="1" y1="0%" x2="1" y2="100%"
                stroke="rgba(45,212,191,0.45)"
                strokeWidth="1.5"
                style={{ pathLength }}
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="flex flex-col gap-10 sm:gap-12 md:gap-16">
            {phases.map((phase, i) => (
              <div key={phase.number} className="md:grid md:grid-cols-[5rem_1fr] md:gap-8">

                {/* Phase node */}
                <div className="flex items-center gap-4 mb-4 md:mb-0 md:flex-col md:items-center" style={{ zIndex: 1 }}>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.5, type: "spring", stiffness: 220, damping: 18 }}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl font-bold shrink-0 relative"
                    style={{ background: phase.color, boxShadow: `0 0 0 0 ${phase.color}40` }}
                  >
                    {i + 1}
                  </motion.div>
                  <div className="md:hidden">
                    <div className="text-xs font-bold tracking-widest uppercase" style={{ color: phase.color }}>
                      Phase {phase.number}
                    </div>
                    <div className="text-xs mt-0.5 font-medium" style={{ color: "rgba(28,28,24,0.4)" }}>{phase.duration}</div>
                  </div>
                  <div
                    className="text-xs font-bold tracking-widest mt-2 text-center hidden md:block"
                    style={{ color: phase.color }}
                  >
                    {phase.duration}
                  </div>
                </div>

                {/* Card — alternating slide-in */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -28 : 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.15, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="card-light rounded-2xl p-5 sm:p-6 md:p-8">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="text-xs font-bold tracking-widest uppercase mb-1.5 hidden md:block" style={{ color: phase.color }}>
                          Phase {phase.number}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight display" style={{ color: "#1C1C18" }}>{phase.title}</h3>
                        <p className="text-xs sm:text-sm mt-1 font-medium" style={{ color: "rgba(28,28,24,0.5)" }}>{phase.subtitle}</p>
                      </div>
                      <span
                        className="tag-pill text-xs shrink-0 hidden sm:inline-flex"
                        style={{ background: `${phase.color}12`, color: phase.color, border: `1px solid ${phase.color}22` }}
                      >
                        {phase.duration}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed mt-4" style={{ color: "rgba(28,28,24,0.58)" }}>
                      {phase.description}
                    </p>

                    <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {phase.deliverables.map((d, di) => (
                        <motion.div
                          key={d}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + di * 0.07 + 0.3, duration: 0.4 }}
                          className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg"
                          style={{ background: `${phase.color}07`, border: `1px solid ${phase.color}14`, color: "rgba(28,28,24,0.65)" }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: phase.color }} />
                          {d}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
