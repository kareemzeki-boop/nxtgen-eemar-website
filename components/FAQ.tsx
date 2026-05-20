"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqCategories as categories, faq as faqs } from "@/lib/content";

// All FAQ data lives in lib/content.ts — edit there.

export default function FAQ() {
  const [category, setCategory] = useState("General");
  const [open, setOpen] = useState<number | null>(null);
  const items = faqs[category] ?? [];

  return (
    <section id="faq" className="section-light py-16 md:py-24 lg:py-28">
      <div className="max-w-4xl mx-auto px-5 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 sm:mb-12 text-center"
        >
          <span className="tag-pill bg-indigo-50 text-indigo-600 border border-indigo-100 mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-zinc-900 leading-tight mt-4">
            Questions we hear
            <br />
            <span className="text-zinc-300">every day.</span>
          </h2>
        </motion.div>

        {/* Category tabs — scrollable on mobile */}
        <div className="flex gap-2 md:gap-3 mb-8 sm:mb-10 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap sm:justify-center scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setOpen(null); }}
              className={`px-4 sm:px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0 ${
                category === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ items */}
        <div className="flex flex-col divide-y divide-zinc-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {items.map((item, i) => (
                <div key={i}>
                  <button
                    className="w-full text-left py-5 sm:py-6 flex items-start justify-between gap-4"
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    <span className="font-semibold text-zinc-900 text-sm sm:text-base leading-snug pr-4">{item.q}</span>
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                      open === i ? "bg-indigo-600 text-white" : "bg-zinc-100 text-zinc-400"
                    }`}>
                      {open === i ? <Minus size={13} /> : <Plus size={13} />}
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        key="ans"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 sm:pb-6 text-zinc-500 text-xs sm:text-sm leading-relaxed pr-10 sm:pr-12">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
