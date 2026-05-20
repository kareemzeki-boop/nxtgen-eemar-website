"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowUpRight, Layers } from "lucide-react";
import { projects } from "@/lib/content";

const MATERIAL_COLORS: Record<string, string> = {
  GFRC:  "#5DC39B",
  GFRP:  "#8b5cf6",
  UHPC:  "#06b6d4",
  GRG:   "#8b5cf6",
  LTGRC: "#f59e0b",
};

const FILTERS = ["All", "GFRC", "GFRP", "UHPC", "GRG", "LTGRC"];

function ProjectCard({ project, index, large = false }: { project: typeof projects[0]; index: number; large?: boolean }) {
  const color = MATERIAL_COLORS[project.material] ?? project.color;
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -5, y: x * 5 });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group relative rounded-2xl overflow-hidden ${large ? "md:row-span-2" : ""}`}
      style={{
        minHeight: large ? "clamp(300px, 40vw, 520px)" : "clamp(220px, 28vw, 300px)",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.25s ease",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        loading="lazy"
      />
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ background: "linear-gradient(to top, rgba(12,12,11,0.94) 0%, rgba(12,12,11,0.45) 50%, rgba(12,12,11,0.12) 100%)" }}
      />
      {/* Diagonal slash on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${color}08 0%, transparent 50%, ${color}05 100%)` }}
      />
      {/* Accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 opacity-80" style={{ background: color }} />

      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
            style={{ background: `${color}22`, color, border: `1px solid ${color}40` }}
          >
            {project.material}
          </span>
          <span className="mono text-xs font-medium" style={{ color: "var(--c-35)" }}>{project.year}</span>
        </div>

        <div>
          {large && (
            <p className="text-xs sm:text-sm leading-relaxed mb-3 max-w-xs" style={{ color: "var(--c-55)" }}>
              {project.description}
            </p>
          )}
          <h3 className={`font-bold tracking-tight leading-tight mb-2 display ${large ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"}`}
            style={{ color: "var(--c-text)" }}>
            {project.title}
          </h3>
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--c-45)" }}>
                <MapPin size={11} /> {project.location}
              </div>
              <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--c-45)" }}>
                <Layers size={11} /> {project.area}
              </div>
            </div>
            <a
              href="#contact"
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
              style={{ background: color }}
            >
              <ArrowUpRight size={14} className="text-black" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const allFiltered = filter === "All" ? projects : projects.filter(p => p.material === filter);
  const featured = allFiltered.filter(p => p.featured);
  const regular  = allFiltered.filter(p => !p.featured);

  return (
    <section id="projects" className="section-dark py-16 md:py-24 lg:py-28 relative overflow-hidden">
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
            {[{ n: "80+", l: "Projects" }, { n: "6", l: "Countries" }, { n: "100K+", l: "m² Installed" }].map((s, i) => (
              <div key={i} className="text-center">
                <div className="mono text-3xl sm:text-4xl font-bold" style={{ color: "var(--c-text)" }}>{s.n}</div>
                <div className="text-xs sm:text-sm mt-1" style={{ color: "var(--c-35)" }}>{s.l}</div>
                {i < 2 && <div className="hidden" />}
              </div>
            )).reduce((acc, el, i) => i === 0 ? [el] : [...acc, <div key={`d${i}`} style={{ width: 1, height: 40, background: "var(--c-border)" }} />, el], [] as React.ReactNode[])}
          </div>
        </motion.div>

        {/* Filter bar */}
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

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {featured[0] && (
              <motion.div key={featured[0].title + "-feat0"} layout className="lg:row-span-2 lg:col-span-1">
                <ProjectCard project={featured[0]} index={0} large />
              </motion.div>
            )}
            {regular.map((p, i) => (
              <motion.div key={p.title} layout>
                <ProjectCard project={p} index={i + 1} />
              </motion.div>
            ))}
            {featured[1] && (
              <motion.div key={featured[1].title + "-feat1"} layout className="lg:col-span-2">
                <ProjectCard project={featured[1]} index={regular.length + 1} large />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 sm:mt-12 flex justify-center"
        >
          <a href="#contact" className="btn-primary flex items-center gap-2 px-8 py-4 text-sm sm:text-base">
            <span>Start Your Project</span>
            <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
