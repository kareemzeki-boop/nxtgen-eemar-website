"use client";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Specification Support",
    price: "Free",
    per: "",
    badge: "",
    description: "For architects and consultants in early design stages who need material guidance and outline specifications.",
    features: [
      "Material suitability consultation (1 hr)",
      "Preliminary facade specification",
      "Indicative budget schedule",
      "Sample panel dispatch",
      "Outline engineering commentary",
    ],
    cta: "Start Consultation",
    ctaHref: "#contact",
    highlight: false,
    color: "#6366f1",
  },
  {
    name: "Design & Supply",
    price: "Project-based",
    per: "Fixed-price contract",
    badge: "Most Popular",
    description: "Full engineering, production, and supply of your cladding system â€” from mock-up approval through certified delivery.",
    features: [
      "Full shop drawing & engineering package",
      "CNC mould fabrication",
      "Quality-certified panel production",
      "Factory acceptance testing",
      "Logistics & delivery to site",
      "5-year material warranty",
    ],
    cta: "Request a Proposal",
    ctaHref: "#contact",
    highlight: true,
    color: "#6366f1",
  },
  {
    name: "Full Facade Partnership",
    price: "Custom",
    per: "EPC & Design-Build",
    badge: "",
    description: "Turnkey facade solution â€” design, supply, and certified installation by NXTGEN teams. Single-point accountability.",
    features: [
      "Everything in Design & Supply",
      "NXTGEN installation crew",
      "On-site QC supervision",
      "As-built survey & handover",
      "10-year product warranty",
      "Dedicated project manager",
    ],
    cta: "Enquire Now",
    ctaHref: "#contact",
    highlight: false,
    color: "#6366f1",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section-dark py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(99,102,241,0.1) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <span className="tag-pill bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
            Pricing & Engagement
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white max-w-3xl mx-auto leading-tight mt-4">
            The right engagement
            <br />
            <span className="text-white/30">for every project stage.</span>
          </h2>
          <p className="mt-5 text-white/50 max-w-xl mx-auto text-base leading-relaxed">
            Whether you&apos;re specifying materials at RIBA Stage 1 or need a turnkey installation partner, we have a model that fits.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className={`relative rounded-2xl p-8 flex flex-col gap-6 ${
                plan.highlight
                  ? "bg-indigo-600 border border-indigo-500"
                  : "card-dark"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-8">
                  <span className="px-4 py-1 rounded-full text-xs font-bold bg-white text-indigo-600">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <div className={`text-xs font-bold tracking-widest uppercase mb-3 ${plan.highlight ? "text-indigo-200" : "text-indigo-400"}`}>
                  {plan.name}
                </div>
                <div className={`text-4xl font-black tracking-tight ${plan.highlight ? "text-white" : "text-white"}`}>
                  {plan.price}
                </div>
                {plan.per && (
                  <div className={`text-sm mt-1 ${plan.highlight ? "text-indigo-200" : "text-white/40"}`}>
                    {plan.per}
                  </div>
                )}
                <p className={`text-sm mt-4 leading-relaxed ${plan.highlight ? "text-indigo-100" : "text-white/50"}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <CheckCircle2
                      size={16}
                      className={`mt-0.5 shrink-0 ${plan.highlight ? "text-indigo-200" : "text-indigo-400"}`}
                    />
                    <span className={plan.highlight ? "text-indigo-50" : "text-white/70"}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaHref}
                className={`flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                  plan.highlight
                    ? "bg-white text-indigo-600 hover:bg-indigo-50"
                    : "btn-outline-dark"
                }`}
              >
                {plan.cta} <ArrowRight size={15} />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-white/30 text-sm mt-10"
        >
          All projects are subject to site assessment and material specification review Â· Prices vary by scope, material, and geography
        </motion.p>
      </div>
    </section>
  );
}

