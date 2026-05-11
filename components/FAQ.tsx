"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const categories = ["General", "Materials", "Process", "Delivery"];

const faqs: Record<string, { q: string; a: string }[]> = {
  General: [
    {
      q: "What makes NXTGEN different from other cladding manufacturers in the region?",
      a: "We are one of very few regional manufacturers that design, engineer, and produce all five major advanced cladding systems (GFRC, GFRP, UHPC, LTGRC, GFRG) under one roof. Our in-house engineering team, CNC mould shop, and 12,000 m2 Sharjah factory allow us to control quality at every stage.",
    },
    {
      q: "Do you work with international architects and consultants?",
      a: "Absolutely. A large portion of our projects are specified by international practices including firms based in the UK, US, Europe, and Southeast Asia. We are comfortable working within international standards (ASTM, EN, BS) and submitting documentation in formats required by global QA processes.",
    },
    {
      q: "What project scale is your minimum threshold?",
      a: "We work on projects from small bespoke feature elements (50-200 m2) right through to large-scale tower cladding exceeding 20,000 m2. Our modular production lines give us the flexibility to prioritise and parallel-schedule orders of varying sizes without compromising lead times.",
    },
  ],
  Materials: [
    {
      q: "Which material system is best suited for coastal UAE environments?",
      a: "For highly corrosive coastal exposures, GFRP is our primary recommendation - it contains zero metallic reinforcement and is inherently immune to chloride-induced corrosion. GFRC with a marine-grade admixture package is also viable for decorative applications where weight is not a concern.",
    },
    {
      q: "Can GFRC panels achieve fire rating compliance for UAE civil defense?",
      a: "Yes. Our standard GFRC formulations achieve a Class A2-s1-d0 fire classification under EN 13501, and can be tested to UAE FM Global standards where required. We provide third-party fire test certificates for each product formulation.",
    },
    {
      q: "What is the lifespan of your cladding systems in GCC climates?",
      a: "Properly specified and installed, our GFRC, UHPC, and GFRP systems carry a 30+ year design life in GCC climatic conditions. Our standard product warranty is 5 years (Design & Supply) or 10 years (Full Facade Partnership).",
    },
    {
      q: "Can you match an existing texture or aggregate specification?",
      a: "Yes - we maintain a library of over 200 surface matrix types and can reverse-engineer existing finishes from approved samples. We always recommend a full-size mock-up panel be approved before committing to full production.",
    },
  ],
  Process: [
    {
      q: "Do you produce shop drawings, or does that rest with the consultant team?",
      a: "Our in-house engineering team produces complete panel shop drawings, fixing/connection details, and relevant structural calculations as part of our standard Design & Supply scope. All drawing packages are submitted for consultant review and approval before moulds are committed.",
    },
    {
      q: "How are parametric or algorithmically-generated facades handled?",
      a: "We work directly with Rhino/Grasshopper geometry files. Our CNC mould shop translates parametric surface data into milled EPS or timber moulds. Complex geometries that previously required expensive GRP or aluminium tooling can often be delivered in CNC foam at a fraction of the cost.",
    },
    {
      q: "Do you offer factory visits during production?",
      a: "Yes - client and consultant factory visits are actively encouraged, particularly at mock-up approval stage and during batch acceptance testing. Our Sharjah D17 facility is accessible with advance booking. We can also arrange live video factory inspections for international clients.",
    },
  ],
  Delivery: [
    {
      q: "What are your standard lead times for production?",
      a: "Lead times depend on material type, panel complexity, and current production loading. Indicative ranges: GFRC 4-10 weeks, GFRP 6-12 weeks, UHPC 8-14 weeks, GFRG 3-8 weeks. We provide a binding production schedule as part of our contract documentation.",
    },
    {
      q: "Can you deliver outside the UAE?",
      a: "Yes. We regularly deliver to Saudi Arabia, Qatar, Bahrain, Kuwait, and Oman, and have shipped to Egypt and Jordan. We manage all export documentation, material certification, and freight logistics as part of our delivery scope.",
    },
    {
      q: "What happens if panels are damaged in transit or on site?",
      a: "All shipments are covered by marine cargo insurance. In the rare event of transit damage, we prioritise replacement production in our scheduling. Panels damaged on site due to installation errors may be reproduced at cost - this is why we recommend our Full Facade Partnership scope for complex projects.",
    },
  ],
};

export default function FAQ() {
  const [category, setCategory] = useState("General");
  const [open, setOpen] = useState<number | null>(null);
  const items = faqs[category] ?? [];

  return (
    <section id="faq" className="section-light py-16 md:py-24 lg:py-28">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">

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
        <div className="flex gap-2 mb-8 sm:mb-10 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap sm:justify-center scrollbar-hide">
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
                        transition={{ duration: 0.32, ease: "easeOut" }}
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
