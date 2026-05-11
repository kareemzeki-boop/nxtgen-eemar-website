"use client";
import { motion } from "framer-motion";
import { process as phases } from "@/lib/content";

// All phase data lives in lib/content.ts — edit there.

export default function Process() {
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
            <span className="tag-pill bg-indigo-50 text-indigo-600 border border-indigo-100 mb-4">
              Our Process
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-zinc-900 max-w-2xl leading-tight mt-4">
              From brief to building.
              <br />
              <span className="text-zinc-300">Four phases.</span>
            </h2>
          </div>
          <p className="text-zinc-500 md:max-w-sm lg:max-w-md text-sm sm:text-base leading-relaxed">
            A structured, collaborative delivery model refined over 15 years of GCC facade projects
            designed to eliminate surprises on site.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connector — only visible on md+ where grid layout applies */}
          <div className="absolute left-[2.25rem] top-8 bottom-8 w-px bg-zinc-100 hidden md:block" />

          <div className="flex flex-col gap-10 sm:gap-12 md:gap-16">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              >
                {/* Mobile: horizontal pill header + card below
                    md+:  2-col grid with bubble column */}
                <div className="md:grid md:grid-cols-[5rem_1fr] md:gap-8">

                  {/* Bubble column — centered on mobile header row, left col on md+ */}
                  <div className="flex items-center gap-4 mb-4 md:mb-0 md:flex-col md:items-center">
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl font-black shrink-0 z-10 relative"
                      style={{ background: phase.color }}
                    >
                      {i + 1}
                    </div>
                    {/* Phase label on mobile (inline); duration on md+ (below bubble) */}
                    <div className="md:hidden">
                      <div className="text-xs font-bold tracking-widest uppercase" style={{ color: phase.color }}>
                        Phase {phase.number}
                      </div>
                      <div className="text-xs text-zinc-400 font-medium mt-0.5">{phase.duration}</div>
                    </div>
                    <div
                      className="text-xs font-bold tracking-widest mt-2 text-center hidden md:block"
                      style={{ color: phase.color }}
                    >
                      {phase.duration}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="card-light rounded-2xl p-5 sm:p-6 md:p-8">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div
                          className="text-xs font-bold tracking-widest uppercase mb-1.5 hidden md:block"
                          style={{ color: phase.color }}
                        >
                          Phase {phase.number}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">{phase.title}</h3>
                        <p className="text-zinc-500 text-xs sm:text-sm mt-1 font-medium">{phase.subtitle}</p>
                      </div>
                      <span
                        className="tag-pill text-xs shrink-0 hidden sm:inline-flex"
                        style={{ background: `${phase.color}15`, color: phase.color, border: `1px solid ${phase.color}25` }}
                      >
                        {phase.duration}
                      </span>
                    </div>

                    <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mt-4">{phase.description}</p>

                    <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {phase.deliverables.map((d) => (
                        <div
                          key={d}
                          className="flex items-center gap-2 text-xs text-zinc-600 font-medium px-3 py-2 rounded-lg"
                          style={{ background: `${phase.color}08`, border: `1px solid ${phase.color}15` }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: phase.color }} />
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
