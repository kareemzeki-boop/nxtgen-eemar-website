"use client";
import { useRef, useState, useEffect, useCallback, useMemo, memo } from "react";
import { motion, MotionValue, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MapPin, ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/lib/content";
import { ctaClick } from "@/lib/cta";

type Project = typeof projects[0];

const MATERIAL_COLORS: Record<string, string> = {
  GFRC:  "#5DC39B",
  GFRP:  "#8b5cf6",
  UHPC:  "#06b6d4",
  GRG:   "#8b5cf6",
  LTGRC: "#f59e0b",
};

const FILTERS = ["All", "GFRC", "GFRP", "UHPC", "GRG", "LTGRC"];

function fillTo(items: Project[], n: number): Project[] {
  if (!items.length) return [];
  const out = [...items];
  while (out.length < n) out.push(...items);
  return out.slice(0, n);
}

// ── Project detail modal ──────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const color = MATERIAL_COLORS[project.material] ?? "#2DD4BF";
  const gallery = project.images?.length ? project.images : [project.image];
  const [imgIdx, setImgIdx] = useState(0);

  const prev = () => setImgIdx(i => (i - 1 + gallery.length) % gallery.length);
  const next = () => setImgIdx(i => (i + 1) % gallery.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Card */}
      <motion.div
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ background: "var(--c-panel)", border: "1px solid var(--c-border)" }}
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 16 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ background: "var(--c-border)", color: "var(--c-55)" }}
        >
          <X size={14} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr]">
          {/* Image section */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-tl-2xl rounded-tr-2xl md:rounded-tr-none md:rounded-bl-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIdx}
                  src={gallery[imgIdx]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  loading="lazy"
                />
              </AnimatePresence>

              {/* Gradient */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }} />

              {/* Nav arrows */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    style={{ background: "rgba(0,0,0,0.5)" }}
                  >
                    <ChevronLeft size={16} className="text-white" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    style={{ background: "rgba(0,0,0,0.5)" }}
                  >
                    <ChevronRight size={16} className="text-white" />
                  </button>
                </>
              )}

              {/* Counter */}
              {gallery.length > 1 && (
                <span
                  className="absolute bottom-3 right-3 text-xs font-mono px-2 py-1 rounded-md"
                  style={{ background: "rgba(0,0,0,0.6)", color: "rgba(255,255,255,0.7)" }}
                >
                  {imgIdx + 1} / {gallery.length}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex gap-1.5 p-3 overflow-x-auto">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className="relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden transition-all"
                    style={{
                      opacity: i === imgIdx ? 1 : 0.5,
                      outline: i === imgIdx ? `2px solid ${color}` : "2px solid transparent",
                      outlineOffset: "1px",
                    }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col gap-5">
            {/* Material badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full tracking-wider uppercase"
                style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
              >
                {project.material}
              </span>
              {project.featured && (
                <span className="text-xs font-bold px-3 py-1 rounded-full tracking-wider uppercase bg-amber-400/15 text-amber-400 border border-amber-400/30">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h2
              className="text-2xl sm:text-3xl font-bold leading-tight"
              style={{ color: "var(--c-text)", fontFamily: "'Cormorant Garamond', serif" }}
            >
              {project.title}
            </h2>

            {/* Meta */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Location", value: project.location, icon: <MapPin size={12} /> },
                { label: "Year", value: project.year },
                { label: "Area", value: project.area },
                { label: "Material", value: project.material },
              ].map(({ label, value, icon }) => (
                <div key={label}>
                  <p className="text-xs uppercase tracking-widest mb-1 font-semibold" style={{ color: "var(--c-35)" }}>
                    {label}
                  </p>
                  <p className="text-sm flex items-center gap-1" style={{ color: "var(--c-text)" }}>
                    {icon}{value}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "var(--c-border)" }} />

            {/* Description */}
            <p className="text-sm leading-relaxed" style={{ color: "var(--c-55)" }}>
              {project.description}
            </p>

            {/* CTA */}
            <div className="mt-auto pt-2">
              <a
                href="#contact"
                onClick={(e) => { ctaClick(e); onClose(); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ background: color, color: "#0C0C0B" }}
              >
                Enquire about this project <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Parallax column ───────────────────────────────────────────────

type ColProps = { items: Project[]; y: MotionValue<number>; topOffset: string; onSelect: (p: Project) => void };

const Column = memo(function Column({ items, y, topOffset, onSelect }: ColProps) {
  return (
    <motion.div
      className="relative flex w-1/4 min-w-[180px] flex-col gap-[1.5vw]"
      style={{ y, top: topOffset, willChange: "transform" }}
    >
      {items.map((p, i) => {
        const color = MATERIAL_COLORS[p.material] ?? "#2DD4BF";
        return (
          <div
            key={`${p.id ?? p.title}-${i}`}
            className="group relative overflow-hidden rounded-2xl flex-shrink-0 cursor-pointer"
            style={{ height: "clamp(200px, 30vh, 420px)" }}
            onClick={() => onSelect(p)}
          >
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              loading="lazy"
            />
            {/* Bottom gradient */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.1) 55%, transparent 100%)" }}
            />
            {/* Hover tint */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ background: `${color}14` }}
            />
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400"
              style={{ background: color }}
            />
            {/* Content */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
              <span
                className="self-start px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase"
                style={{ background: `${color}28`, color, border: `1px solid ${color}45` }}
              >
                {p.material}
              </span>
              <div className="translate-y-1.5 group-hover:translate-y-0 opacity-70 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-sm font-bold leading-tight text-white mb-1 line-clamp-2">{p.title}</h3>
                <div className="flex items-center gap-1 text-[10px]" style={{ color: "rgba(255,255,255,0.50)" }}>
                  <MapPin size={9} /> {p.location}
                </div>
              </div>
            </div>
            {/* Click hint */}
            <div
              className="absolute bottom-3 right-3 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
              style={{ background: color }}
            >
              <ArrowUpRight size={12} className="text-black" />
            </div>
          </div>
        );
      })}
    </motion.div>
  );
});

// ── Main section ──────────────────────────────────────────────────

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [vh, setVh] = useState(800);
  const [selected, setSelected] = useState<Project | null>(null);
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

  // Reduced multipliers for smooth performance (was 2x, 3.3x, 1.25x, 3x)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, vh * 0.45]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, vh * 0.75]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, vh * 0.28]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, vh * 0.65]);

  const handleClose = useCallback(() => setSelected(null), []);

  const { c1, c2, c3, c4 } = useMemo(() => {
    const filtered = filter === "All" ? projects : projects.filter(p => p.material === filter);
    const filled   = fillTo(filtered.length ? filtered : projects, 12);
    return {
      c1: filled.slice(0, 3),
      c2: filled.slice(3, 6),
      c3: filled.slice(6, 9),
      c4: filled.slice(9, 12),
    };
  }, [filter]);

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

      {/* Parallax gallery */}
      <div
        ref={galleryRef}
        className="relative box-border overflow-hidden"
        style={{ height: "140vh" }}
      >
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="flex w-full h-full"
          style={{ gap: "1.5vw", padding: "1.5vw" }}
        >
          <Column items={c1} y={y1} topOffset="-18%" onSelect={setSelected} />
          <Column items={c2} y={y2} topOffset="-38%" onSelect={setSelected} />
          <Column items={c3} y={y3} topOffset="-12%" onSelect={setSelected} />
          <Column items={c4} y={y4} topOffset="-28%" onSelect={setSelected} />
        </motion.div>
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

      {/* Project detail modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={handleClose} />
        )}
      </AnimatePresence>
    </section>
  );
}
