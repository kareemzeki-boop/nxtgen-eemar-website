"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials, testimonialsHeader } from "@/lib/content";

// All testimonial data lives in lib/content.ts — edit there.

export default function Testimonials() {
  return (
    <section className="section-light py-16 md:py-24 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <span className="tag-pill bg-indigo-50 text-indigo-600 border border-indigo-100 mb-4">
              Client Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-zinc-900 max-w-2xl leading-tight mt-4">
              What our clients say.
            </h2>
          </div>
          {/* Rating summary — stacks below heading on mobile */}
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-zinc-900">{testimonialsHeader.avgRating}</div>
              <div className="text-zinc-400 text-xs sm:text-sm mt-1">Avg rating</div>
            </div>
            <div className="w-px h-10 bg-zinc-200" />
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-zinc-900">{testimonialsHeader.reviewCount}</div>
              <div className="text-zinc-400 text-xs sm:text-sm mt-1">Reviews</div>
            </div>
          </div>
        </motion.div>

        {/* Cards — 1 col mobile, 2 col sm, 3 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              className="card-light rounded-2xl p-5 sm:p-7 flex flex-col gap-4 sm:gap-5"
            >
              <div className="flex gap-0.5 sm:gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={13} fill="#f59e0b" className="text-amber-400" />
                ))}
              </div>
              <p className="text-zinc-700 text-xs sm:text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-3 sm:pt-2 border-t border-zinc-100">
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-zinc-900">{t.name}</div>
                  <div className="text-xs text-zinc-400 leading-tight">{t.role} &middot; {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
