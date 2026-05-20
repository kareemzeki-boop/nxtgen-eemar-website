"use client";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { pricing as plans } from "@/lib/content";

export default function Pricing() {
  return (
    <section id="pricing" className="section-dark py-16 md:py-24 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(45,212,191,0.06) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-16 text-center"
        >
          <span className="tag-pill bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
            Pricing & Engagement
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight max-w-3xl mx-auto leading-tight mt-4" style={{ color: "var(--c-text)" }}>
            The right engagement
            <br />
            <span style={{ color: "var(--c-28)" }}>for every project stage.</span>
          </h2>
          <p className="mt-4 sm:mt-5 max-w-xl mx-auto text-sm sm:text-base leading-relaxed" style={{ color: "var(--c-45)" }}>
            Whether you&apos;re specifying materials at RIBA Stage 1 or need a turnkey installation partner, we have a model that fits.
          </p>
        </motion.div>

        {/* Cards — stacked on mobile, 3-col on md+
            On tablet (sm-md): 1 col is cleaner for pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className={`relative rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col gap-5 sm:gap-6 ${
                plan.highlight
                  ? "bg-indigo-600 border border-indigo-500"
                  : "card-dark"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-6 sm:left-8">
                  <span className="px-3 sm:px-4 py-1 rounded-full text-xs font-bold bg-white text-indigo-600 pulse-badge inline-block">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <div className={`text-xs font-bold tracking-widest uppercase mb-3 ${plan.highlight ? "text-indigo-200" : "text-indigo-400"}`}>
                  {plan.name}
                </div>
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-white" style={{ color: "var(--c-text)" }}>
                  {plan.price}
                </div>
                {plan.per && (
                  <div
                    className={`text-sm mt-1 ${plan.highlight ? "text-indigo-200" : ""}`}
                    style={plan.highlight ? undefined : { color: "var(--c-40)" }}
                  >
                    {plan.per}
                  </div>
                )}
                <p
                  className={`text-xs sm:text-sm mt-3 sm:mt-4 leading-relaxed ${plan.highlight ? "text-indigo-100" : ""}`}
                  style={plan.highlight ? undefined : { color: "var(--c-45)" }}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="flex flex-col gap-2.5 sm:gap-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm">
                    <CheckCircle2
                      size={15}
                      className={`mt-0.5 shrink-0 ${plan.highlight ? "text-indigo-200" : "text-indigo-400"}`}
                    />
                    <span
                      className={plan.highlight ? "text-indigo-50" : ""}
                      style={plan.highlight ? undefined : { color: "var(--c-55)" }}
                    >{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaHref}
                className={`flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                  plan.highlight
                    ? "bg-white text-indigo-600 hover:bg-indigo-50"
                    : "btn-outline-dark"
                }`}
              >
                {plan.cta} <ArrowRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs sm:text-sm mt-8 sm:mt-10 px-4"
          style={{ color: "var(--c-28)" }}
        >
          All projects subject to site assessment and material specification review &middot; Prices vary by scope and geography
        </motion.p>
      </div>
    </section>
  );
}
