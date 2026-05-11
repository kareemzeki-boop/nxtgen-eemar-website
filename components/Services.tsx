"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, CheckCircle2 } from "lucide-react";

const services = [
  {
    id: "gfrc",
    number: "01",
    title: "GFRC",
    full: "Glass Fibre Reinforced Concrete",
    tagline: "Lightweight concrete cladding with infinite form freedom",
    description:
      "GFRC delivers the aesthetic gravitas of concrete at a fraction of the weight, enabling complex curves, textures, and large-format panels impossible with traditional precast. Ideal for decorative facades, column covers, and architectural feature elements.",
    features: [
      "Custom mix designs for GCC climates",
      "Panel sizes up to 8m x 3m",
      "Weight: 16-22 kg/m2 (vs 400+ kg for precast)",
      "Integral color or painted finishes",
      "ASTM C1658 / EN 14649 compliant",
    ],
    quote: "NXTGEN's GFRC panels transformed our tower facade — the texture consistency across 4,200 units was flawless.",
    quoteBy: "Lead Architect, Dubai Iconic Tower Project",
    accentColor: "#6366f1",
  },
  {
    id: "gfrp",
    number: "02",
    title: "GFRP",
    full: "Glass Fibre Reinforced Polymer",
    tagline: "Corrosion-free cladding engineered for coastal environments",
    description:
      "Where salt-laden air and extreme humidity demand zero-compromise durability, GFRP delivers structural cladding panels with no corrosion risk, negligible maintenance cycles, and exceptional strength-to-weight ratios.",
    features: [
      "Saltwater & UV resistant by design",
      "Tensile strength >250 MPa",
      "Gel-coat or painted surface systems",
      "Fire rated options available (Class A)",
      "Ideal for marine, coastal & industrial facades",
    ],
    quote: "Six years on a waterfront development in Abu Dhabi — zero degradation, zero maintenance calls.",
    quoteBy: "Project Manager, Abu Dhabi Waterfront Development",
    accentColor: "#8b5cf6",
  },
  {
    id: "uhpc",
    number: "03",
    title: "UHPC",
    full: "Ultra High Performance Concrete",
    tagline: "Structural-grade cladding with ultra-thin profiles",
    description:
      "UHPC pushes the boundaries of what concrete can be. With compressive strength exceeding 150 MPa, panels as thin as 15mm carry structural loads, span wide bays, and project the refined precision architects demand for landmark projects.",
    features: [
      "Compressive strength: 150-200 MPa",
      "Panel thickness: 15-30 mm",
      "Self-compacting, self-curing mixes",
      "Smooth, architectural-grade surface",
      "Structural facade engineering support included",
    ],
    quote: "We specified UHPC for the cantilevered brise-soleil blades — NXTGEN delivered tolerances we didn't think possible in the region.",
    quoteBy: "Structural Engineer, Riyadh Cultural Centre",
    accentColor: "#06b6d4",
  },
  {
    id: "ltgrc",
    number: "04",
    title: "Veloce LTGRC",
    full: "Light-Transmitting Glass Reinforced Concrete",
    tagline: "Where concrete becomes a luminous canvas",
    description:
      "Veloce LTGRC is our proprietary innovation: a translucent concrete system embedding optical-grade fibres that carry natural or artificial light through solid panels. Perfect for statement facades, lobby walls, and illuminated signage elements.",
    features: [
      "Up to 4% light transmittance",
      "Optical fibre density: 3-15 fibres/cm2",
      "Backlit or front-lit configurations",
      "Available in 6 base aggregates",
      "Proprietary Veloce fibre-lay process",
    ],
    quote: "The Veloce LTGRC entrance wall is the most photographed element in our entire campus — it glows at dusk like nothing else.",
    quoteBy: "Design Director, Sharjah Innovation Hub",
    accentColor: "#f59e0b",
  },
  {
    id: "gfrg",
    number: "05",
    title: "GFRG",
    full: "Glass Fibre Reinforced Gypsum",
    tagline: "Precision interior architectural elements at scale",
    description:
      "GFRG is the material of choice for intricate interior cladding, ornamental detailing, column casings, and domed ceilings where fire resistance, crisp detail, and fast installation are paramount.",
    features: [
      "Fire resistance: Class A non-combustible",
      "Dimensional accuracy +/-1mm",
      "Complex profiles & ornamental detail possible",
      "Light: 8-14 kg/m2",
      "Fast-track installation systems available",
    ],
    quote: "1,200 GFRG column casings across our hotel — all installed in 14 days. Extraordinary.",
    quoteBy: "Interior Fit-Out Manager, Luxury Hotel, Qatar",
    accentColor: "#10b981",
  },
];

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
            Every material system we produce is engineered for the GCC's climate extremes — UV, salinity, seismic loads, and the relentless demand for aesthetic precision.
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
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    {/* Mobile: no left indent. Tablet+: indent to align with title */}
                    <div className="pb-8 sm:pb-10 pl-0 sm:pl-10 md:pl-14 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

                      {/* Left: description + features */}
                      <div>
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

                      {/* Right: testimonial */}
                      <div
                        className="rounded-2xl p-5 sm:p-6 flex flex-col justify-between"
                        style={{ background: `${svc.accentColor}0d`, border: `1px solid ${svc.accentColor}20` }}
                      >
                        <div
                          className="text-3xl font-black mb-3 leading-none"
                          style={{ color: svc.accentColor }}
                        >
                          &ldquo;
                        </div>
                        <p className="text-zinc-700 leading-relaxed italic text-sm flex-1">
                          {svc.quote}
                        </p>
                        <div className="mt-5 flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                            style={{ background: svc.accentColor }}
                          >
                            {svc.quoteBy[0]}
                          </div>
                          <span className="text-xs text-zinc-500 font-medium">{svc.quoteBy}</span>
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
