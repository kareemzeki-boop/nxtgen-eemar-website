"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import KineticText from "./KineticText";
import {
  statsNumbers,
  statsBarData,
  statsCallout,
  statsBackgroundImage,
} from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

// Fraction of ring to fill per stat (matches PROGRESS array in Stats.tsx)
const RING_PROGRESS = [0.8, 0.75, 0.6, 1.0, 0.98, 0.98];

const RING_SIZE = 160;
const STROKE_WIDTH = 8;
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function CountUpSpan({ target, suffix }: { target: number; suffix: string }) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      duration: 1.8,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
      onUpdate() {
        if (spanRef.current) spanRef.current.textContent = `${Math.round(obj.val)}${suffix}`;
      },
    });
    return () => { tween.kill(); };
  }, [target, suffix]);

  return (
    <span ref={spanRef} style={{ fontVariantNumeric: "tabular-nums" }}>
      0{suffix}
    </span>
  );
}

function StatRing({
  value,
  suffix,
  label,
  sub,
  progress,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  sub: string;
  progress: number;
  delay: number;
}) {
  const motionPathLength = useMotionValue(0);
  const springPathLength = useSpring(motionPathLength, { stiffness: 80, damping: 22 });

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      onViewportEnter={() => {
        motionPathLength.set(progress);
      }}
    >
      {/* Ring SVG */}
      <div className="relative" style={{ width: RING_SIZE, height: RING_SIZE }}>
        <svg
          width={RING_SIZE}
          height={RING_SIZE}
          viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Track ring */}
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="var(--c-border)"
            strokeWidth={STROKE_WIDTH}
          />
          {/* Animated gold ring */}
          <motion.circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="#C9A86C"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            style={{
              strokeDashoffset: useSpring(
                useMotionValue(CIRCUMFERENCE),
                { stiffness: 80, damping: 22 }
              ),
            }}
            pathLength={springPathLength}
          />
        </svg>
        {/* Center content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: 1 }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 28,
              fontWeight: 700,
              lineHeight: 1,
              color: "var(--c-text)",
            }}
          >
            <CountUpSpan target={value} suffix={suffix} />
          </div>
        </div>
      </div>
      {/* Label below ring */}
      <div className="text-center">
        <div
          className="text-sm font-bold"
          style={{ color: "var(--c-text)" }}
        >
          {label}
        </div>
        <div
          className="text-xs mt-1 leading-tight"
          style={{ color: "var(--c-38)" }}
        >
          {sub}
        </div>
      </div>
    </motion.div>
  );
}

export default function StatsV2() {
  const barRef = useRef<HTMLDivElement>(null);

  return (
    <section className="section-dark py-20 md:py-28 relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src={statsBackgroundImage}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.05 }}
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,108,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 md:mb-20"
        >
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
            By The Numbers
          </span>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(36px, 5.5vw, 72px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginTop: 12,
            }}
          >
            <KineticText
              text="Results that speak"
              as="h2"
              delay={0.04}
              stagger={0.018}
              style={{ display: "block", color: "var(--c-text)" }}
            />
            <KineticText
              text="louder than specs."
              as="span"
              delay={0.32}
              stagger={0.018}
              style={{ display: "block", color: "var(--c-28)" }}
            />
          </div>
        </motion.div>

        {/* Main layout: 3 rings | divider | 3 rings */}
        <div
          className="hidden lg:grid gap-0 mb-16 md:mb-20"
          style={{
            gridTemplateColumns: "1fr 1px 1fr",
            alignItems: "start",
          }}
        >
          {/* Left 3 rings */}
          <div className="grid grid-cols-3 gap-6 pr-10">
            {statsNumbers.slice(0, 3).map((stat, i) => (
              <StatRing
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                sub={stat.sub}
                progress={RING_PROGRESS[i] ?? 0.75}
                delay={i * 0.1}
              />
            ))}
          </div>

          {/* Vertical divider + callout */}
          <div className="relative flex flex-col items-center self-stretch">
            <div
              className="absolute inset-y-0 left-0"
              style={{ width: 1, background: "var(--c-border-md)" }}
            />
          </div>

          {/* Right 3 rings */}
          <div className="grid grid-cols-3 gap-6 pl-10">
            {statsNumbers.slice(3, 6).map((stat, i) => (
              <StatRing
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                sub={stat.sub}
                progress={RING_PROGRESS[i + 3] ?? 0.75}
                delay={(i + 3) * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Mobile / tablet ring grid */}
        <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-8 mb-14">
          {statsNumbers.map((stat, i) => (
            <StatRing
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              sub={stat.sub}
              progress={RING_PROGRESS[i] ?? 0.75}
              delay={i * 0.08}
            />
          ))}
        </div>

        {/* Callout card (centered, below rings on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mb-16 md:mb-20"
        >
          <div
            className="rounded-2xl p-8 sm:p-10 md:p-12 max-w-3xl mx-auto text-center"
            style={{
              background: "var(--c-surface)",
              border: "1px solid var(--c-border)",
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 700,
                lineHeight: 1,
                color: "#C9A86C",
                marginBottom: 12,
              }}
            >
              {statsCallout.headline}
            </div>
            <div
              className="mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(20px, 2.5vw, 26px)",
                fontWeight: 700,
                color: "var(--c-text)",
                lineHeight: 1.2,
              }}
            >
              {statsCallout.subheadline}
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-lg mx-auto" style={{ color: "var(--c-45)" }}>
              {statsCallout.body}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {statsCallout.countries.map((country) => (
                <span
                  key={country}
                  className="px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{
                    color: "#C9A86C",
                    background: "rgba(201,168,108,0.10)",
                    border: "1px solid rgba(201,168,108,0.22)",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {country}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bar chart section */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-10"
          ref={barRef}
        >
          {/* Horizontal bar chart */}
          <div>
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-6"
              style={{
                color: "var(--c-40)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              m² Produced (Indexed) · 2020–2024
            </div>
            <div className="flex flex-col gap-3">
              {statsBarData.map((bar, i) => (
                <div key={bar.label} className="flex items-center gap-4">
                  <div
                    className="shrink-0 text-xs font-bold"
                    style={{
                      width: 36,
                      color: "var(--c-38)",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {bar.label}
                  </div>
                  <div
                    className="flex-1 rounded-full overflow-hidden"
                    style={{ height: 8, background: "var(--c-border)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: bar.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.value}%` }}
                      viewport={{ once: true, margin: "-5%" }}
                      transition={{
                        delay: i * 0.1,
                        duration: 1.0,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    />
                  </div>
                  <div
                    className="shrink-0 text-xs font-bold"
                    style={{
                      width: 28,
                      textAlign: "right",
                      color: "var(--c-38)",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {bar.value}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-5 leading-relaxed" style={{ color: "var(--c-25)" }}>
              Production capacity has grown nearly 3× since 2020 following our Sharjah D17 expansion.
            </p>
          </div>

          {/* Bottom note */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-4"
            style={{
              background: "var(--c-surface)",
              border: "1px solid var(--c-border)",
            }}
          >
            <div
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{
                color: "#C9A86C",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Performance Note
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--c-45)" }}>
              All projects subject to site assessment. Figures represent verified project data from 2020–2024. On-time delivery rates and client ratings compiled from direct client feedback forms submitted at project handover.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Verified Data", "Third-Party Audited", "ISO 9001 Tracked"].map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{
                    color: "var(--c-55)",
                    background: "var(--c-panel)",
                    border: "1px solid var(--c-border)",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
