"use client";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight, Layers } from "lucide-react";
import { projects } from "@/lib/content";

const MATERIAL_COLORS: Record<string, string> = {
  GFRC: "#5DC39B",
  GFRP: "#06b6d4",
  UHPC: "#f59e0b",
  GRG:  "#8b5cf6",
  LTGRC:"#ec4899",
};

function ProjectCard({
  project,
  index,
  large = false,
}: {
  project: typeof projects[0];
  index: number;
  large?: boolean;
}) {
  const color = MATERIAL_COLORS[project.material] ?? project.color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group relative rounded-2xl overflow-hidden ${large ? "md:row-span-2" : ""}`}
      style={{ minHeight: large ? 520 : 300 }}
    >
      {/* Background image */}
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.45) 50%, rgba(10,10,10,0.15) 100%)",
        }}
      />

      {/* Accent color top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-80"
        style={{ background: color }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
        {/* Top row — material badge + year */}
        <div className="flex items-center justify-between">
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
            style={{ background: `${color}22`, color, border: `1px solid ${color}40` }}
          >
            {project.material}
          </span>
          <span className="text-white/40 text-xs font-medium">{project.year}</span>
        </div>

        {/* Bottom — title + meta */}
        <div>
          {large && (
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-3 max-w-xs">
              {project.description}
            </p>
          )}

          <h3
            className={`font-black text-white tracking-tight leading-tight mb-2 ${
              large ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
            }`}
          >
            {project.title}
          </h3>

          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-white/50 text-xs">
                <MapPin size={11} />
                {project.location}
              </div>
              <div className="flex items-center gap-1.5 text-white/50 text-xs">
                <Layers size={11} />
                {project.area}
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
  // Split: featured cards (large) and regular
  const featured = projects.filter((p) => p.featured);
  const regular  = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-dark py-16 md:py-24 lg:py-28 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 50%, rgba(93,195,155,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <span className="tag-pill bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
              Featured Projects
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-white leading-tight mt-4">
              Built to last.
              <br />
              <span className="text-white/25">Across the GCC.</span>
            </h2>
          </div>
          <div className="flex items-center gap-5 shrink-0">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-white">80+</div>
              <div className="text-white/40 text-xs sm:text-sm mt-1">Projects</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-white">6</div>
              <div className="text-white/40 text-xs sm:text-sm mt-1">Countries</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-white">100K+</div>
              <div className="text-white/40 text-xs sm:text-sm mt-1">m² installed</div>
            </div>
          </div>
        </motion.div>

        {/* Grid — featured large left col, 4 regular right col */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

          {/* Featured 1 — spans 2 rows on lg */}
          <div className="lg:row-span-2 lg:col-span-1">
            <ProjectCard project={featured[0]} index={0} large />
          </div>

          {/* Regular cards */}
          {regular.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i + 1} />
          ))}

          {/* Featured 2 — spans 2 cols on lg */}
          <div className="lg:col-span-2">
            <ProjectCard project={featured[1]} index={5} large />
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 sm:mt-12 flex justify-center"
        >
          <a
            href="#contact"
            className="btn-primary flex items-center gap-2 px-8 py-4 text-sm sm:text-base"
          >
            Start Your Project <ArrowUpRight size={15} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
