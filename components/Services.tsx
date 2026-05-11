"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, CheckCircle2 } from "lucide-react";
import { services } from "@/lib/content";

// All material data lives in lib/content.ts — edit there.

export default function Services() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="services" className="section-light py-16 md:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <span className="tag-pill bg-indigo-50 text-indigo-600 border border-indigo-100 mb-4">
            Our Materials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-zinc-900 max-w-3xl leading-tight mt-4">
            Five systems. One engineered standard.
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-zinc-500 max-w-2xl leading-relaxed">
            Every material system we produce is engineered for the GCC&apos;s climate extremes — UV, salinity, seismic loads, and the relentless demand for aesthetic precision.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col divide-y divide-zinc-100">
          {services.map((svc, i) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <button
                className="w-full text-left py-6 sm:py-8 flex items-start gap-4 sm:gap-6 group"
                onClick={() => setOpen(open === svc.id ? null : svc.id)}
              >
                <span className="text-xs font-bold text-zinc-300 mt-1 w-6 sm:w-8 shrink-0 tracking-widest">
                  {svc.number}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start sm:items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">
                          {svc.title}
                        </h3>
                        <span className="text-xs sm:text-sm text-zinc-400 font-medium hidden sm:inline truncate">
                          — {svc.full}
                        </span>
                      </div>
                      <p className="text-zinc-500 text-xs sm:text-sm mt-1 font-medium">{svc.tagline}</p>
                    </div>
                    <div
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-200"
                      style={{
                        background: open === svc.id ? svc.accentColor : "#f4f4f5",
                        color: open === svc.id ? "#fff" : "#71717a",
                      }}
                    >
                      {open === svc.id ? <Minus size={15} /> : <Plus size={15} />}
                    </div>
                  </div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {open === svc.id && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 sm:pb-10 pl-0 sm:pl-10 md:pl-14 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

                      {/* Left: description + features + CTA */}
                      <div className="order-2 md:order-1">
                        <p className="text-zinc-600 text-sm leading-relaxed mb-5">{svc.description}</p>
                        <ul className="flex flex-col gap-2.5">
                          {svc.features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-700">
                              <CheckCircle2
                                size={15}
                                className="mt-0.5 shrink-0"
                                style={{ color: svc.accentColor }}
                              />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <a
                          href="#contact"
                          className="btn-primary inline-flex items-center gap-2 px-5 sm:px-6 py-3 text-sm mt-6 sm:mt-8"
                          style={{ background: svc.accentColor }}
                        >
                          Request a Quote
                        </a>
                      </div>

                      {/* Right: facade photo with testimonial overlay */}
                      <div className="order-1 md:order-2 relative rounded-2xl overflow-hidden h-[220px] sm:h-[280px] md:h-auto md:min-h-[300px]">
                        <img
                          src={svc.image}
                          alt={svc.imageAlt}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 45%, transparent 100%)" }}
                        />
                        <div
                          className="absolute bottom-0 left-0 right-0 h-1 opacity-70"
                          style={{ background: svc.accentColor }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                          <div className="text-lg font-black leading-none mb-2 opacity-80" style={{ color: svc.accentColor }}>
                            &ldquo;
                          </div>
                          <p className="text-white text-xs sm:text-sm leading-relaxed italic mb-2 line-clamp-3">
                            {svc.quote}
                          </p>
                          <span className="text-white/55 text-[10px] sm:text-xs font-medium">{svc.quoteBy}</span>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
