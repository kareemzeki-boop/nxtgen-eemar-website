"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import KineticText from "./KineticText";
import { process as phases } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const PHASE_COLORS = ["#5DC39B", "#8b5cf6", "#06b6d4", "#10b981"];

// SVG node y-positions for 4 phases along the 600px path
const NODE_Y = [75, 225, 375, 525];
const SVG_HEIGHT = 600;
const SVG_WIDTH = 40;
const LINE_X = 20;

export default function ProcessV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPolylineElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const section = sectionRef.current;
    if (!path || !section) return;

    const pathLength = path.getTotalLength();
    gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          end: "bottom 35%",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="section-dark py-20 md:py-28" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mb-16 md:mb-22 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span
              className="tag-pill mb-5 inline-flex"
              style={{
                background: "rgba(201,168,108,0.10)",
                color: "#C9A86C",
                border: "1px solid rgba(201,168,108,0.22)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Delivery Timeline
            </span>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(40px, 6vw, 80px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "var(--c-text)",
                marginTop: 12,
              }}
            >
              <KineticText text="Our Process" as="h2" delay={0.05} stagger={0.018} />
            </div>
          </div>
          <p
            className="md:max-w-sm text-sm sm:text-base leading-relaxed"
            style={{ color: "var(--c-45)" }}
          >
            A structured, collaborative delivery model refined over 15 years of GCC facade projects —
            designed to eliminate surprises on site.
          </p>
        </motion.div>

        {/* Timeline body */}
        <div className="relative">

          {/* SVG vertical timeline — desktop only */}
          <div
            className="hidden md:block absolute"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              top: 0,
              width: SVG_WIDTH,
              height: SVG_HEIGHT,
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <svg
              width={SVG_WIDTH}
              height={SVG_HEIGHT}
              viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
              fill="none"
              overflow="visible"
            >
              {/* Track (static) */}
              <polyline
                points={`${LINE_X},0 ${LINE_X},${SVG_HEIGHT}`}
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Animated fill */}
              <polyline
                ref={pathRef}
                points={`${LINE_X},0 ${LINE_X},${SVG_HEIGHT}`}
                stroke="#C9A86C"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.7"
              />
              {/* Node circles */}
              {NODE_Y.map((y, i) => (
                <g key={i}>
                  <circle
                    cx={LINE_X}
                    cy={y}
                    r={10}
                    fill={PHASE_COLORS[i]}
                    opacity={0.18}
                  />
                  <circle
                    cx={LINE_X}
                    cy={y}
                    r={5}
                    fill={PHASE_COLORS[i]}
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* Phase cards */}
          <div className="flex flex-col gap-16 md:gap-0">
            {phases.map((phase, i) => {
              const color = PHASE_COLORS[i] ?? phase.color;
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={phase.number}
                  className="relative md:grid md:grid-cols-2 md:gap-0"
                  style={{ minHeight: 150 }}
                >
                  {/* Left slot */}
                  <div className={`md:pr-16 ${isLeft ? "block" : "hidden md:block"}`}>
                    {isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{
                          delay: i * 0.1,
                          duration: 0.6,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      >
                        <PhaseCard phase={phase} color={color} index={i} />
                      </motion.div>
                    )}
                  </div>

                  {/* Right slot */}
                  <div className={`md:pl-16 ${!isLeft ? "block" : "hidden md:block"}`}>
                    {!isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{
                          delay: i * 0.1,
                          duration: 0.6,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      >
                        <PhaseCard phase={phase} color={color} index={i} />
                      </motion.div>
                    )}
                  </div>

                  {/* Mobile card (always visible, no alternating) */}
                  <div className="md:hidden col-span-2">
                    <motion.div
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-8%" }}
                      transition={{
                        delay: i * 0.08,
                        duration: 0.55,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      <PhaseCard phase={phase} color={color} index={i} />
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

type PhaseData = (typeof phases)[number];

function PhaseCard({
  phase,
  color,
  index,
}: {
  phase: PhaseData;
  color: string;
  index: number;
}) {
  return (
    <div
      className="rounded-2xl p-6 sm:p-8 md:p-10"
      style={{
        background: "var(--c-surface)",
        border: "1px solid var(--c-border)",
      }}
    >
      {/* Phase number + duration row */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(48px, 6vw, 72px)",
            fontWeight: 700,
            lineHeight: 1,
            color: "#C9A86C",
            opacity: 0.9,
          }}
        >
          {phase.number}
        </div>
        <span
          className="tag-pill text-xs shrink-0 mt-1"
          style={{
            background: `${color}18`,
            color: color,
            border: `1px solid ${color}30`,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {phase.duration}
        </span>
      </div>

      {/* Title + subtitle */}
      <div
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(26px, 3vw, 34px)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          color: "var(--c-text)",
          marginBottom: 6,
        }}
      >
        {phase.title}
      </div>
      <div
        className="text-sm font-medium mb-5"
        style={{ color: color, letterSpacing: "0.01em" }}
      >
        {phase.subtitle}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--c-45)" }}>
        {phase.description}
      </p>

      {/* Deliverables */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {phase.deliverables.map((deliverable, di) => (
          <motion.div
            key={deliverable}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.08 + di * 0.06 + 0.25,
              duration: 0.4,
              ease: "easeOut",
            }}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium"
            style={{
              background: `${color}0a`,
              border: `1px solid ${color}1a`,
              color: "var(--c-55)",
            }}
          >
            <div
              className="shrink-0 rounded-full"
              style={{ width: 6, height: 6, background: color }}
            />
            {deliverable}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
