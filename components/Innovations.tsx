"use client";
import { motion } from "framer-motion";
import { Cpu, Layers3, Leaf, Atom } from "lucide-react";

const innovations = [
  {
    icon: Cpu,
    title: "IoT Smart Panels",
    subtitle: "Facades that sense and respond",
    description:
      "Embedded sensor arrays within GFRC panels monitor structural stress, thermal expansion, moisture ingress, and surface temperature in real time. Live dashboards alert facility managers before defects become costly.",
    tag: "Structural Intelligence",
    color: "#6366f1",
    metric: "24/7",
    metricLabel: "Live Monitoring",
  },
  {
    icon: Layers3,
    title: "3D Parametric Elements",
    subtitle: "Computational form, manufactured precision",
    description:
      "We take architect-authored parametric geometries directly from Rhino / Grasshopper and translate them into production-ready moulds. Complex undulating surfaces and algorithmic patterns delivered at 1mm tolerances.",
    tag: "Digital Fabrication",
    color: "#8b5cf6",
    metric: "Â±1mm",
    metricLabel: "Tolerance Achieved",
  },
  {
    icon: Leaf,
    title: "Bio-Hybrid Cladding",
    subtitle: "Panels that support living ecosystems",
    description:
      "Textured GFRC surfaces engineered with micro-retention pockets and embedded nutrient matrices support moss, lichen, and climbing plant systems. LEED credits, reduced heat-island effect, and iconic aesthetics in one system.",
    tag: "Biophilic Design",
    color: "#10b981",
    metric: "LEED",
    metricLabel: "Credit Eligible",
  },
  {
    icon: Atom,
    title: "Nano-Reinforced GFRC",
    subtitle: "Material science at the molecular level",
    description:
      "Carbon nanotube and graphene-oxide admixtures increase tensile strength by up to 60% and dramatically improve crack resistance â€” enabling thinner, lighter, and longer-spanning GFRC panels than any standard formulation on the market.",
    tag: "Next-Gen Materials",
    color: "#f59e0b",
    metric: "+60%",
    metricLabel: "Tensile Strength",
  },
];

export default function Innovations() {
  return (
    <section id="innovations" className="section-dark py-28 relative overflow-hidden">
      {/* Accent blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
      />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <span className="tag-pill bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
              R&D Innovations
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white max-w-2xl leading-tight mt-4">
              Beyond the brief.
              <br />
              <span className="text-white/30">Beyond the material.</span>
            </h2>
          </div>
          <p className="text-white/50 max-w-md text-base leading-relaxed">
            Our in-house R&D team continuously pushes what architectural cladding can do â€” combining material science, digital fabrication, and building technology.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {innovations.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                className="card-dark rounded-2xl p-8 flex flex-col gap-6 group hover:border-white/20 transition-all duration-300"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}
                  >
                    <Icon size={22} style={{ color: item.color }} />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-white leading-none">{item.metric}</div>
                    <div className="text-xs text-white/40 font-medium tracking-wide mt-1">{item.metricLabel}</div>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: item.color }}
                  >
                    {item.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2 tracking-tight">{item.title}</h3>
                  <p className="text-white/40 text-sm mt-1 font-medium">{item.subtitle}</p>
                  <p className="text-white/60 text-sm mt-4 leading-relaxed">{item.description}</p>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200"
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

