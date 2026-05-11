"use client";
import { motion } from "framer-motion";
import { Cpu, Layers3, Leaf, Atom } from "lucide-react";
import { innovations as innovationsData } from "@/lib/content";

// Icons stay here; text/metrics live in lib/content.ts — edit there.
const ICONS = [Cpu, Layers3, Leaf, Atom];
const innovations = innovationsData.map((item, i) => ({ ...item, icon: ICONS[i] }));

export default function Innovations() {
  return (
    <section id="innovations" className="section-dark py-16 md:py-24 lg:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(93,195,155,0.08) 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
      />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(93,195,155,0.05) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8"
        >
          <div>
            <span className="tag-pill bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
              R&D Innovations
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-white max-w-2xl leading-tight mt-4">
              Beyond the brief.
              <br />
              <span className="text-white/30">Beyond the material.</span>
            </h2>
          </div>
          <p className="text-white/50 md:max-w-sm lg:max-w-md text-sm sm:text-base leading-relaxed">
            Our in-house R&D team continuously pushes what architectural cladding can do — combining material science, digital fabrication, and building technology.
          </p>
        </motion.div>

        {/* Cards — 1 col mobile, 2 col sm+  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {innovations.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                className="card-dark rounded-2xl p-6 sm:p-8 flex flex-col gap-5 sm:gap-6 group hover:border-white/20 transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}
                  >
                    <Icon size={20} style={{ color: item.color }} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-black text-white leading-none">{item.metric}</div>
                    <div className="text-xs text-white/40 font-medium tracking-wide mt-1">{item.metricLabel}</div>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: item.color }}>
                    {item.tag}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-2 tracking-tight">{item.title}</h3>
                  <p className="text-white/40 text-xs sm:text-sm mt-1 font-medium">{item.subtitle}</p>
                  <p className="text-white/60 text-xs sm:text-sm mt-3 sm:mt-4 leading-relaxed">{item.description}</p>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 mt-auto"
                  style={{ color: item.color }}
                >
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
