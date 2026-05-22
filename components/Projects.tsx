"use client";
import { useRef, useState, useEffect } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { ctaClick } from "@/lib/cta";

const MATERIAL_COLORS: Record<string, string> = {
  GFRC:  "#5DC39B",
  GFRP:  "#8b5cf6",
  UHPC:  "#06b6d4",
  GRG:   "#8b5cf6",
  LTGRC: "#f59e0b",
};

const FILTERS = ["All", "GFRC", "GFRP", "UHPC", "GRG", "LTGRC"];

function fillTo(items: typeof projects, n: number): typeof projects {
  if (!items.length) return [];
  const out = [...items];
  while (out.length < n) out.push(...items);
  return out.slice(0, n);
}

type ColProps = { items: typeof projects; y: MotionValue<number>; topOffset: string };

function Column({ items, y, topOffset }: ColProps) {
  return (
    <motion.div
      className="relative flex w-1/4 min-w-[180px] flex-col gap-[1.5vw]"
      style={{ y, top: topOffset }}
    >
      {items.map((p, i) => {
        const color = MATERIAL_COLORS[p.material] ?? "#2DD4BF";
        return (
          <div
            key={`${p.title}-${i}`}
            className="group relative overflow-hidden rounded-2xl flex-shrink-0"
            style={{ height: "clamp(200px, 30vh, 420px)" }}
          >
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
            />
            {/* Always-on bottom gradient */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(10,10,10,0.90) 0%, rgba(10,10,10,0.15) 55%, transparent 100%)" }}
            />
            {/* Hover color tint */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `${color}18` }}
            />
            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
              style={{ background: `linear-gradient(90deg, ${color}, ${color}55)` }}
            />
            {/* Card content */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
              <span
                className="self-start px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase"
                style={{ background: `${color}28`, color, border: `1px solid ${color}45` }}
              >
                {p.material}
              </span>
              <div className="translate-y-1.5 group-hover:translate-y-0 opacity-70 group-hover:opacity-100 transition-all duration-400">
                <h3 className="text-sm font-bold leading-tight text-white mb-1 line-clamp-2">{p.title}</h3>
                <div className="flex items-center gap-1 text-[10px]" style={{ color: "rgba(255,255,255,0.50)" }}>
                  <MapPin size={9} /> {p.location}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [vh, setVh] = useState(800);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, vh * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, vh * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, vh * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, vh * 3]);

  const filtered = filter === "All" ? projects : projects.filter(p => p.material === filter);
  const filled   = fillTo(filtered.length ? filtered : projects, 12);
  const [c1, c2, c3, c4] = [
    filled.slice(0, 3),
    filled.slice(3, 6),
    filled.slice(6, 9),
    filled.slice(9, 12),
  ];

  return (
    <section id="projects" className="section-dark py-16 md:py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 20% 50%, rgba(45,212,191,0.05) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <span className="tag-pill bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
              Featured Projects
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-tight mt-4 display" style={{ color: "var(--c-text)" }}>
              Built to last.
              <br />
              <span style={{ color: "var(--c-22)" }}>Across the GCC.</span>
            </h2>
          </div>
          <div className="flex items-center gap-5 shrink-0">
            {[{ n: "80+", l: "Projects" }, { n: "6", l: "Countries" }, { n: "100K+", l: "m² Installed" }]
              .map((s, i) => (
                <div key={i} className="text-center">
                  <div className="mono text-3xl sm:text-4xl font-bold" style={{ color: "var(--c-text)" }}>{s.n}</div>
                  <div className="text-xs sm:text-sm mt-1" style={{ color: "var(--c-35)" }}>{s.l}</div>
                </div>
              ))
              .reduce((acc: React.ReactNode[], el, i) =>
                i === 0 ? [el] : [...acc, <div key={`d${i}`} style={{ width: 1, height: 40, background: "var(--c-border)" }} />, el],
              [])}
          </div>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8 md:mb-10"
        >
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "6px 16px", borderRadius: 9999,
                background: filter === f ? "#2DD4BF" : "var(--c-panel)",
                color: filter === f ? "#0C0C0B" : "var(--c-55)",
                border: `1px solid ${filter === f ? "#2DD4BF" : "var(--c-border)"}`,
                fontSize: 12, fontWeight: 700, letterSpacing: "0.05em",
                cursor: "pointer", transition: "all 0.2s ease",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Parallax gallery — full width */}
      <div
        ref={galleryRef}
        className="relative box-border flex overflow-hidden"
        style={{ height: "175vh", gap: "1.5vw", padding: "1.5vw" }}
      >
        <Column items={c1} y={y1} topOffset="-45%" />
        <Column items={c2} y={y2} topOffset="-95%" />
        <Column items={c3} y={y3} topOffset="-45%" />
        <Column items={c4} y={y4} topOffset="-75%" />
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <a href="#contact" onClick={ctaClick} className="btn-primary flex items-center gap-2 px-8 py-4 text-sm sm:text-base">
            <span>Start Your Project</span>
            <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
