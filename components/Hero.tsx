"use client";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, MapPin, Award, Zap } from "lucide-react";
import { hero, company } from "@/lib/content";
import { ctaClick } from "@/lib/cta";

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.065, duration: 0.6, ease: "easeOut" },
  }),
};

function WordReveal({ text, offset = 0, className }: { text: string; offset?: number; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          custom={offset + i}
          initial="hidden"
          animate="visible"
          variants={wordVariants}
          style={{ display: "inline-block", marginRight: "0.3em" }}
          className={className}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

function FadeUp({ delay = 0, children, className }: { delay?: number; children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const words1 = hero.headlinePart1.split(" ");
  const words2 = hero.headlinePart2.split(" ");

  return (
    <section className="section-dark relative min-h-screen flex flex-col overflow-hidden">

      {/* Background image with Ken Burns */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={hero.backgroundImage}
          alt=""
          className="w-full h-full object-cover object-center ken-burns"
          aria-hidden="true"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(110deg, rgba(12,12,11,0.97) 0%, rgba(12,12,11,0.90) 42%, rgba(12,12,11,0.65) 100%)" }}
        />
      </div>

      {/* Radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(201,168,108,0.10) 0%, transparent 70%)" }}
      />

      {/* Subtle geometric accents — desktop only */}
      <div className="absolute top-1/4 right-12 w-48 h-48 sm:w-64 sm:h-64 opacity-[0.07] float-anim hidden sm:block" style={{ animationDelay: "0s" }}>
        <svg viewBox="0 0 200 200" fill="none">
          <polygon points="100,10 190,55 190,145 100,190 10,145 10,55" stroke="#C9A86C" strokeWidth="1" />
          <polygon points="100,40 160,70 160,130 100,160 40,130 40,70" stroke="#C9A86C" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute bottom-1/3 left-4 sm:left-8 w-32 h-32 sm:w-40 sm:h-40 opacity-[0.05] float-anim hidden sm:block" style={{ animationDelay: "2s" }}>
        <svg viewBox="0 0 200 200" fill="none">
          <rect x="20" y="20" width="160" height="160" stroke="#8A9BAE" strokeWidth="1" transform="rotate(15 100 100)" />
          <rect x="50" y="50" width="100" height="100" stroke="#8A9BAE" strokeWidth="0.5" transform="rotate(30 100 100)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 md:pb-24 flex flex-col flex-1">

        {/* Badge */}
        <FadeUp delay={0} className="mb-7 sm:mb-10">
          <span className="tag-pill bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs">
            <Award size={11} />
            {hero.badge}
          </span>
        </FadeUp>

        {/* Headline — word-by-word reveal */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.93] max-w-5xl display">
          <span className="gradient-text block">
            <WordReveal text={hero.headlinePart1} offset={0} />
          </span>
          <span className="block" style={{ color: "#F0EDE6" }}>
            <WordReveal text={hero.headlinePart2} offset={words1.length} />
          </span>
          <span className="block" style={{ color: "rgba(240,237,230,0.28)" }}>
            <WordReveal text={hero.headlinePart3} offset={words1.length + words2.length} />
          </span>
        </h1>

        {/* Subheadline */}
        <FadeUp delay={0.55} className="mt-6 sm:mt-8">
          <p className="text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: "rgba(240,237,230,0.52)" }}>
            {hero.subheadline}
          </p>
        </FadeUp>

        {/* Material pills */}
        <FadeUp delay={0.68} className="mt-6 sm:mt-8 flex flex-wrap gap-2">
          {hero.materials.map((m) => (
            <span
              key={m}
              className="mono px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold tracking-widest border"
              style={{ color: "rgba(240,237,230,0.65)", borderColor: "rgba(240,237,230,0.09)", background: "rgba(240,237,230,0.04)" }}
            >
              {m}
            </span>
          ))}
        </FadeUp>

        {/* CTAs */}
        <FadeUp delay={0.80} className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
          <a
            href={hero.ctaPrimary.href}
            onClick={ctaClick}
            className="btn-primary px-6 sm:px-7 py-3.5 text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2"
          >
            <span>{hero.ctaPrimary.label}</span>
            <ArrowRight size={16} />
          </a>
          <a href={hero.ctaSecondary.href} className="btn-outline-dark px-6 sm:px-7 py-3.5 text-sm sm:text-base text-center">
            {hero.ctaSecondary.label}
          </a>
        </FadeUp>

        {/* Location + cert */}
        <FadeUp delay={0.90} className="mt-10 sm:mt-14 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <MapPin size={13} style={{ color: "#C9A86C" }} />
          <span style={{ color: "rgba(240,237,230,0.35)" }}>{company.address}</span>
          <span className="hidden sm:inline" style={{ color: "rgba(240,237,230,0.2)" }}>&nbsp;·&nbsp;</span>
          <span className="flex items-center gap-1" style={{ color: "rgba(240,237,230,0.35)" }}>
            <Zap size={12} style={{ color: "#C9A86C" }} />
            {company.certification}
          </span>
        </FadeUp>

        {/* Stats strip */}
        <FadeUp delay={1.0} className="mt-12 sm:mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {hero.stats.map((s) => (
              <div
                key={s.label}
                className="px-4 sm:px-6 py-4 sm:py-5 flex flex-col gap-1"
                style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}
              >
                <div className="mono text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "#F0EDE6" }}>{s.num}</div>
                <div className="text-[10px] sm:text-xs font-medium tracking-wide uppercase leading-tight" style={{ color: "rgba(240,237,230,0.35)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", color: "rgba(201,168,108,0.4)", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
          Scroll
        </span>
        <div className="scroll-caret" />
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0C0C0B)" }}
      />
    </section>
  );
}
