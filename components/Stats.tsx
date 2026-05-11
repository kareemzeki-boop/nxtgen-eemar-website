"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { statsNumbers as stats, statsBarData as BAR_DATA, statsCallout, statsBackgroundImage } from "@/lib/content";

// All stats data lives in lib/content.ts — edit there.

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  const barRef = useRef(null);
  const barsInView = useInView(barRef, { once: true });

  return (
    <section className="section-dark py-16 md:py-24 lg:py-28 relative overflow-hidden">
      {/* Subtle concrete texture background */}
      <div className="absolute inset-0">
        <img
          src={statsBackgroundImage}
          alt=""
          className="w-full h-full object-cover opacity-[0.07]"
          aria-hidden="true"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(99,102,241,0.12) 0%, transparent 70%)" }}
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
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-white max-w-3xl leading-tight mt-4">
            Results that speak
            <br />
            <span className="text-white/30">louder than specs.</span>
          </h2>
        </motion.div>

        {/* Stats grid — 2 cols mobile, 3 cols sm+, 3 cols md */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/[0.05] rounded-2xl overflow-hidden mb-12 md:mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-[#080808] px-5 sm:px-6 md:px-8 py-6 sm:py-7 md:py-8 group hover:bg-indigo-500/5 transition-colors duration-300"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-1.5">
                {typeof s.value === "number" ? (
                  <CountUp target={s.value} suffix={s.suffix} />
                ) : `${s.value}${s.suffix}`}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white/80 mb-1">{s.label}</div>
              <div className="text-xs text-white/30 leading-tight">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Bar chart + callout — stacked on mobile, side-by-side on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">

          {/* Bar chart */}
          <div ref={barRef}>
            <div className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-5 sm:mb-6">
              m2 Produced (Indexed) &middot; 2020-2024
            </div>
            <div className="flex items-end gap-2 sm:gap-3 h-36 sm:h-44 md:h-48">
              {BAR_DATA.map((bar, i) => (
                <div key={bar.label} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    className="w-full rounded-t-lg"
                    style={{ background: bar.color, height: 0 }}
                    animate={barsInView ? { height: `${bar.value * 1.5}px` } : {}}
                    transition={{ delay: i * 0.1, duration: 0.7, ease: "easeOut" }}
                  />
                  <span className="text-xs text-white/30 font-medium">{bar.label}</span>
                </div>
              ))}
            </div>
            <p className="text-white/30 text-xs mt-4 leading-relaxed">
              Production capacity has grown nearly 3x since 2020 following our Sharjah D17 expansion.
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
            <div className="text-4xl sm:text-5xl font-black mb-2" style={{ color: "#6366f1" }}>
              {statsCallout.headline}
            </div>
            <div className="text-white text-xl sm:text-2xl font-bold mb-3 sm:mb-4 leading-tight">
              {statsCallout.subheadline}
            </div>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
              {statsCallout.body}
            </p>
            <div className="flex flex-wrap gap-2">
              {statsCallout.countries.map((c) => (
                <span key={c} className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20">
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
