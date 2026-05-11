"use client";
import { motion } from "framer-motion";

const phases = [
  {
    number: "01",
    title: "Diagnose",
    subtitle: "Project assessment & specification",
    duration: "1-2 Weeks",
    description:
      "We embed with your design and engineering team to understand structural loads, facade geometry, substrate conditions, and program constraints. Our engineers produce a Material Suitability Report mapping the optimal cladding system to your project's exact requirements.",
    deliverables: [
      "Material Suitability Report",
      "Facade load analysis",
      "Climate & exposure classification",
      "Preliminary budget schedule",
    ],
    color: "#6366f1",
  },
  {
    number: "02",
    title: "Design",
    subtitle: "Engineering drawings & mock-up approval",
    duration: "3-6 Weeks",
    description:
      "Our parametric design team co-creates panel shop drawings, connection details, and thermal/structural calculations. Full-scale mock-ups are produced at our Sharjah facility for architect and client sign-off before production commences.",
    deliverables: [
      "Panel shop drawings (IFC)",
      "Connection & fixing details",
      "Structural & thermal calcs",
      "Full-scale approved mock-up",
    ],
    color: "#8b5cf6",
  },
  {
    number: "03",
    title: "Manufacture",
    subtitle: "Precision production at Sharjah D17",
    duration: "4-16 Weeks",
    description:
      "Our 12,000 m2 factory operates six parallel production lines with CNC-milled moulds, automated spray systems, and inline quality control. Every panel is tagged, inspected, and documented with traceability records before leaving our facility.",
    deliverables: [
      "QC-certified panel batch records",
      "Panel marking & logistics plan",
      "Factory acceptance test report",
      "Packing & shipping schedule",
    ],
    color: "#06b6d4",
  },
  {
    number: "04",
    title: "Install",
    subtitle: "Site installation & commissioning",
    duration: "Project-specific",
    description:
      "Our certified installation crews work directly with your main contractor, following a pre-agreed sequence plan to minimise critical-path impact. All installations are surveyed on completion and supported by a comprehensive 10-year product warranty.",
    deliverables: [
      "Installation method statement",
      "Site survey & as-built record",
      "Snagging & defect resolution",
      "10-year product warranty",
    ],
    color: "#10b981",
  },
];

export default function Process() {
  return (
    <section id="process" className="section-light py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <span className="tag-pill bg-indigo-50 text-indigo-600 border border-indigo-100 mb-4">
              Our Process
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 max-w-2xl leading-tight mt-4">
              From brief to building.
              <br />
              <span className="text-zinc-300">Four phases.</span>
            </h2>
          </div>
          <p className="text-zinc-500 max-w-md text-base leading-relaxed">
            A structured, collaborative delivery model refined over 15 years of GCC facade projects
            designed to eliminate surprises on site.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[calc(2rem+1px)] top-0 bottom-0 w-px bg-zinc-100 hidden md:block" />

          <div className="flex flex-col gap-16">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                className="md:grid md:grid-cols-[5rem_1fr] gap-8"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-black shrink-0 z-10 relative"
                    style={{ background: phase.color }}
                  >
                    {i + 1}
                  </div>
                  <div
                    className="text-xs font-bold tracking-widest mt-2 text-center hidden md:block"
                    style={{ color: phase.color }}
                  >
                    {phase.duration}
                  </div>
                </div>

                <div className="card-light rounded-2xl p-8">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div
                        className="text-xs font-bold tracking-widest uppercase mb-2"
                        style={{ color: phase.color }}
                      >
                        Phase {phase.number}
                      </div>
                      <h3 className="text-2xl font-black text-zinc-900 tracking-tight">{phase.title}</h3>
                      <p className="text-zinc-500 text-sm mt-1 font-medium">{phase.subtitle}</p>
                    </div>
                    <span
                      className="tag-pill text-xs shrink-0"
                      style={{ background: `${phase.color}15`, color: phase.color, border: `1px solid ${phase.color}25` }}
                    >
                      {phase.duration}
                    </span>
                  </div>

                  <p className="text-zinc-600 text-sm leading-relaxed mt-5">{phase.description}</p>

                  <div className="mt-6 grid sm:grid-cols-2 gap-2">
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
