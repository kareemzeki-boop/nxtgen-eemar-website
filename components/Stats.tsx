"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { statsNumbers as stats, statsBarData as BAR_DATA, statsCallout, statsBackgroundImage } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const PROGRESS = [80, 75, 60, 100, 98, 98];

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      duration: 1.8,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate() { setDisplay(Math.round(obj.val)); },
    });
    return () => { tween.kill(); };
  }, [target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function Stats() {
  const barRef = useRef(null);
  const barsInView = useInView(barRef, { once: true });

  return (
    <section className="section-dark py-16 md:py-24 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={statsBackgroundImage}
          alt=""
          className="w-full h-full object-cover opacity-[0.055]"
          aria-hidden="true"
          loading="lazy"
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(45,212,191,0.08) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <span className="tag-pill bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
            By The Numbers
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-tight mt-4 display" style={{ color: "var(--c-text)" }}>
            Results that speak
            <br />
            <span style={{ color: "var(--c-22)" }}>louder than specs.</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden mb-12 md:mb-16"
          style={{ background: "var(--c-panel)" }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="px-5 sm:px-6 md:px-8 py-6 sm:py-7 md:py-8 group transition-colors duration-300"
              style={{ background: "var(--c-surface)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = "rgba(45,212,191,0.05)")}
              onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = "var(--c-surface)")}
            >
              <div className="mono text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-1.5" style={{ color: "var(--c-text)" }}>
                {typeof s.value === "number" ? (
                  <CountUp target={s.value} suffix={s.suffix} />
                ) : `${s.value}${s.suffix}`}
              </div>
              <div className="text-xs sm:text-sm font-bold mb-0.5" style={{ color: "var(--c-55)" }}>{s.label}</div>
              <div className="text-xs leading-tight" style={{ color: "var(--c-28)" }}>{s.sub}</div>

              {/* Progress bar */}
              <div className="stat-bar-track mt-3">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: (PROGRESS[i] ?? 75) / 100 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.5, duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, rgba(45,212,191,0.6), #2DD4BF)",
                    borderRadius: 1,
                    transformOrigin: "left",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bar chart + callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">

          <div ref={barRef}>
            <div className="text-xs font-semibold uppercase tracking-widest mb-5 sm:mb-6 mono" style={{ color: "var(--c-40)" }}>
              m² Produced (Indexed) &middot; 2020–2024
            </div>
            <div className="flex items-end gap-2 sm:gap-3 h-36 sm:h-44 md:h-52 lg:h-60">
              {BAR_DATA.map((bar, i) => (
                <div key={bar.label} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    className="w-full rounded-t-lg"
                    style={{ background: bar.color, height: 0 }}
                    animate={barsInView ? { height: `${bar.value * 1.5}px` } : {}}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                  />
                  <span className="mono text-xs font-medium" style={{ color: "var(--c-28)" }}>{bar.label}</span>
                </div>
              ))}
            </div>
            <p className="text-xs mt-4 leading-relaxed" style={{ color: "var(--c-25)" }}>
              Production capacity has grown nearly 3× since 2020 following our Sharjah D17 expansion.
            </p>
          </div>

          {/* Callout card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="card-dark rounded-2xl p-6 sm:p-8"
          >
            <div className="mono text-4xl sm:text-5xl font-bold mb-2" style={{ color: "#2DD4BF" }}>
              {statsCallout.headline}
            </div>
            <div className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 leading-tight display" style={{ color: "var(--c-text)" }}>
              {statsCallout.subheadline}
            </div>
            <p className="text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6" style={{ color: "var(--c-45)" }}>
              {statsCallout.body}
            </p>
            <div className="flex flex-wrap gap-2">
              {statsCallout.countries.map((c) => (
                <span
                  key={c}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold"
                  style={{ color: "#2DD4BF", background: "rgba(45,212,191,0.10)", border: "1px solid rgba(45,212,191,0.22)" }}
                >
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
