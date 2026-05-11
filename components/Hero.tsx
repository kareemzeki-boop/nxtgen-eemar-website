"use client";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Award, Zap } from "lucide-react";

const MATERIALS = ["GFRC", "GFRP", "UHPC", "LTGRC", "GFRG"];

function FadeUp({ delay = 0, children, className }: { delay?: number; children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="section-dark relative min-h-screen flex flex-col overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%)",
        }}
      />
      <div className="absolute top-1/4 right-12 w-64 h-64 opacity-10 float-anim" style={{ animationDelay: "0s" }}>
        <svg viewBox="0 0 200 200" fill="none">
          <polygon points="100,10 190,55 190,145 100,190 10,145 10,55" stroke="#6366f1" strokeWidth="1" />
          <polygon points="100,40 160,70 160,130 100,160 40,130 40,70" stroke="#6366f1" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute bottom-1/3 left-8 w-40 h-40 opacity-10 float-anim" style={{ animationDelay: "2s" }}>
        <svg viewBox="0 0 200 200" fill="none">
          <rect x="20" y="20" width="160" height="160" stroke="#a5b4fc" strokeWidth="1" transform="rotate(15 100 100)" />
          <rect x="50" y="50" width="100" height="100" stroke="#a5b4fc" strokeWidth="0.5" transform="rotate(30 100 100)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-24 flex flex-col flex-1">
        <FadeUp delay={0} className="mb-10">
          <span className="tag-pill bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Award size={12} />
            Trusted across the GCC &middot; 80+ Projects Delivered
          </span>
        </FadeUp>

        <FadeUp delay={0.12}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] max-w-5xl">
            <span className="gradient-text">We Engineer</span>
            <br />
            <span className="text-white">Living Facades</span>
            <br />
            <span className="text-white/40">For The Middle East</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.24} className="mt-8">
          <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
            Precision-manufactured architectural cladding systems built for extreme climates,
            iconic structures, and generational durability. From Sharjah to the entire GCC.
          </p>
        </FadeUp>

        <FadeUp delay={0.36} className="mt-8 flex flex-wrap gap-2">
          {MATERIALS.map((m) => (
            <span
              key={m}
              className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-white/80 border border-white/10 bg-white/5"
            >
              {m}
            </span>
          ))}
        </FadeUp>

        <FadeUp delay={0.48} className="mt-10 flex flex-wrap gap-4">
          <a href="#contact" className="btn-primary px-7 py-3.5 text-base flex items-center gap-2">
            Start Your Project <ArrowRight size={16} />
          </a>
          <a href="#services" className="btn-outline-dark px-7 py-3.5 text-base">
            Explore Materials
          </a>
        </FadeUp>

        <FadeUp delay={0.60} className="mt-14 flex items-center gap-2 text-white/40 text-sm">
          <MapPin size={14} className="text-indigo-400" />
          Sharjah Industrial District 17, UAE &nbsp;&middot;&nbsp;
          <Zap size={12} className="text-indigo-400" />
          ISO 9001 Certified Manufacturing
        </FadeUp>

        <FadeUp delay={0.72} className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-white/[0.06] rounded-2xl overflow-hidden">
            {[
              { num: "80+", label: "Projects Delivered" },
              { num: "15+", label: "Years Experience" },
              { num: "6", label: "GCC Countries" },
              { num: "100%", label: "Custom Engineered" },
            ].map((s) => (
              <div key={s.label} className="bg-white/[0.025] px-6 py-5 flex flex-col gap-1">
                <div className="text-3xl font-black text-white tracking-tight">{s.num}</div>
                <div className="text-xs text-white/40 font-medium tracking-wide uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #080808)" }}
      />
    </section>
  );
}
