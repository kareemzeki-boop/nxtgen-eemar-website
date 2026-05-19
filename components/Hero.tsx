"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Award, Zap } from "lucide-react";
import { hero, company } from "@/lib/content";
import { ctaClick } from "@/lib/cta";
import KineticText from "./KineticText";
import MagneticEl from "./MagneticEl";
import ParticleField from "./ParticleField";

const r = (prog: number, a: number, b: number) =>
  Math.max(0, Math.min(1, (prog - a) / (b - a)));

export default function Hero() {
  const sectionRef   = useRef<HTMLElement>(null);
  const ytRef        = useRef<HTMLDivElement>(null);
  const [prog, setProg]         = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [sweepKey, setSweepKey] = useState(0);
  const sweptRef   = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onScroll = () => {
      const rect    = section.getBoundingClientRect();
      const total   = section.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      setProg(total > 0 ? Math.min(1, scrolled / total) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Trigger gold shimmer once after kinetic text finishes
  useEffect(() => {
    if (sweptRef.current) return;
    const totalChars = (hero.headlinePart1 + hero.headlinePart2 + hero.headlinePart3).length;
    const delay = totalChars * 22 + 650; // stagger * chars + duration + buffer
    const t = setTimeout(() => {
      setSweepKey(k => k + 1);
      sweptRef.current = true;
    }, delay);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const videoId   = hero.backgroundVideo;
    const container = ytRef.current;
    if (!videoId || !container) return;
    const iframe = document.createElement("iframe");
    iframe.src = [
      `https://www.youtube.com/embed/${videoId}`,
      "?autoplay=1&mute=1&loop=1",
      `&playlist=${videoId}`,
      "&controls=0&disablekb=1&modestbranding=1",
      "&playsinline=1&rel=0&iv_load_policy=3&fs=0",
      "&start=4&cc_load_policy=0",
      "&origin=https%3A%2F%2Fkareemzeki-boop.github.io",
    ].join("");
    iframe.setAttribute("allow", "autoplay; encrypted-media; fullscreen");
    iframe.setAttribute("allowfullscreen", "");
    iframe.style.cssText = [
      "position:absolute;border:none;pointer-events:none;",
      "top:50%;left:50%;",
      "width:calc(100% + 400px);",
      "height:calc(100% + 300px);",
      "transform:translate(-50%,-50%);",
    ].join("");
    container.appendChild(iframe);
    return () => { if (container.contains(iframe)) container.removeChild(iframe); };
  }, []);

  // Scroll-driven values
  const paraOp  = r(prog, 0.10, 0.26);
  const paraY   = (1 - paraOp) * 32;
  const matOp   = r(prog, 0.26, 0.40);
  const matY    = (1 - matOp) * 24;
  const ctaOp   = r(prog, 0.40, 0.54);
  const ctaY    = (1 - ctaOp) * 24;
  const locOp   = r(prog, 0.50, 0.63);
  const statsIn    = r(prog, 0.60, 0.72);
  const statsScale = 1 + r(prog, 0.68, 0.87) * (isMobile ? 0.3 : 1.6);
  const statsOut   = 1 - r(prog, 0.84, 1.00);
  const statsOp    = statsIn * statsOut;
  const statsY     = (1 - statsIn) * 30;
  const exitProg   = r(prog, 0.82, 1.00);
  const heroExitY  = exitProg * -90;
  const heroExitOp = 1 - exitProg * 0.55;
  const scrollIndicatorOp = 1 - r(prog, 0, 0.12);
  const bgParallaxY = -prog * 12; // background drifts slower than scroll

  return (
    <section
      ref={sectionRef}
      className="section-dark"
      style={{ height: isMobile ? "300vh" : "360vh", position: "relative", background: "transparent" }}
    >
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        transform: `translateY(${heroExitY}vh)`,
        opacity: heroExitOp,
        willChange: "transform, opacity",
      }}>

        {/* ── Layer 0: Background ── */}
        <div className="absolute inset-0 overflow-hidden">
          <div style={{
            position: "absolute", inset: "-8%",
            transform: `translateY(${bgParallaxY}%)`,
            transition: "transform 0.05s linear",
          }}>
            <img
              src={hero.backgroundImage}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
              aria-hidden="true"
              fetchPriority="high"
            />
          </div>

          {/* YouTube video overlay */}
          {hero.backgroundVideo && (
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
              <div
                ref={ytRef}
                style={{
                  position: "absolute", top: "50%", left: "50%",
                  width: "max(100%, 177.78vh)", height: "max(100%, 56.25vw)",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>
          )}

          {/* Dark gradient overlay — left heavier for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: 3,
              background: "linear-gradient(105deg, rgba(12,12,11,0.97) 0%, rgba(12,12,11,0.92) 45%, rgba(12,12,11,0.72) 100%)",
            }}
          />
        </div>

        {/* ── Layer 1: Gold radial glow ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 4,
            background: "radial-gradient(ellipse 70% 55% at 50% -5%, rgba(201,168,108,0.13) 0%, transparent 65%)",
          }}
        />

        {/* ── Layer 2: Particles ── */}
        <div className="absolute inset-0" style={{ zIndex: 5 }}>
          <ParticleField count={isMobile ? 30 : 55} />
        </div>

        {/* ── Layer 3: Content ── */}
        <div
          className="relative max-w-7xl mx-auto px-5 sm:px-6 flex flex-col h-full"
          style={{ zIndex: 10, paddingTop: "clamp(88px, 14vh, 140px)", paddingBottom: 40 }}
        >

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 sm:mb-7"
          >
            <span className="tag-pill bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs">
              <Award size={11} />
              {hero.badge}
            </span>
          </motion.div>

          {/* ── Kinetic headline ── */}
          <div style={{ position: "relative" }}>
            <h1
              className="display font-black tracking-tight leading-[0.9] max-w-5xl"
              style={{ fontSize: "clamp(48px, 6.8vw, 108px)" }}
            >
              <KineticText
                text={hero.headlinePart1}
                delay={0.2}
                stagger={0.018}
                style={{ display: "block", color: "var(--c-text)" }}
              />
              <KineticText
                text={hero.headlinePart2}
                delay={0.2 + hero.headlinePart1.length * 0.018 + 0.05}
                stagger={0.018}
                style={{ display: "block", color: "var(--c-text)" }}
              />
              <KineticText
                text={hero.headlinePart3}
                delay={0.2 + (hero.headlinePart1.length + hero.headlinePart2.length) * 0.018 + 0.1}
                stagger={0.018}
                style={{ display: "block" }}
                className="display-gold"
              />
            </h1>

            {/* Gold shimmer sweep across headline */}
            {sweepKey > 0 && (
              <div
                key={sweepKey}
                className="gold-sweep-line"
                aria-hidden="true"
              />
            )}
          </div>

          {/* ── Subheadline — scroll stage 1 ── */}
          <div
            style={{
              opacity: paraOp,
              transform: `translateY(${paraY}px)`,
              transition: "opacity 0.05s linear, transform 0.05s linear",
              marginTop: "clamp(20px, 3vw, 32px)",
              maxWidth: 560,
            }}
          >
            <p
              style={{
                fontSize: "clamp(14px, 1.2vw, 18px)",
                lineHeight: 1.72,
                color: "var(--c-55)",
                fontWeight: 400,
              }}
            >
              {hero.subheadline}
            </p>
          </div>

          {/* ── Material pills — scroll stage 2 ── */}
          <div
            style={{
              opacity: matOp,
              transform: `translateY(${matY}px)`,
              transition: "opacity 0.05s linear, transform 0.05s linear",
              marginTop: "clamp(14px, 2vw, 22px)",
              display: "flex", flexWrap: "wrap", gap: 8,
            }}
          >
            {hero.materials.map((m) => (
              <span
                key={m}
                className="mono rounded-full text-xs font-bold tracking-widest"
                style={{
                  padding: "6px 14px",
                  color: "var(--c-55)",
                  borderColor: "var(--c-border-sm)",
                  background: "var(--c-panel)",
                  border: "1px solid var(--c-border-sm)",
                }}
              >
                {m}
              </span>
            ))}
          </div>

          {/* ── CTAs — scroll stage 3 ── */}
          <div
            style={{
              opacity: ctaOp,
              transform: `translateY(${ctaY}px)`,
              transition: "opacity 0.05s linear, transform 0.05s linear",
              marginTop: "clamp(20px, 3vw, 36px)",
              display: "flex", flexWrap: "wrap", gap: 14,
              alignItems: "center",
            }}
          >
            <MagneticEl strength={0.25}>
              <a
                href={hero.ctaPrimary.href}
                onClick={ctaClick}
                className="btn-primary flex items-center gap-2"
                style={{ padding: "14px 28px", fontSize: "clamp(13px, 1.1vw, 15px)" }}
              >
                <span>{hero.ctaPrimary.label}</span>
                <ArrowRight size={15} />
              </a>
            </MagneticEl>
            <MagneticEl strength={0.2}>
              <a
                href={hero.ctaSecondary.href}
                className="btn-outline-dark"
                style={{ padding: "14px 28px", fontSize: "clamp(13px, 1.1vw, 15px)" }}
              >
                {hero.ctaSecondary.label}
              </a>
            </MagneticEl>
          </div>

          {/* ── Location + ISO — scroll stage 3 ── */}
          <div
            style={{
              opacity: locOp,
              transition: "opacity 0.05s linear",
              marginTop: "clamp(14px, 2vw, 24px)",
              display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10,
              color: "var(--c-35)",
              fontSize: "0.78rem",
            }}
          >
            <MapPin size={12} style={{ color: "#C9A86C", flexShrink: 0 }} />
            <span>{company.address}</span>
            <span style={{ color: "var(--c-20)" }}>·</span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Zap size={11} style={{ color: "#C9A86C" }} />
              {company.certification}
            </span>
          </div>

          {/* ── Stats pills — scroll stage 4 ── */}
          <div
            style={{
              position: "absolute",
              bottom: "clamp(60px, 10vh, 90px)",
              left: 0, right: 0,
              padding: "0 20px",
              opacity: statsOp,
              transform: `translateY(${statsY}px) scale(${statsScale})`,
              transformOrigin: "center bottom",
              transition: "opacity 0.04s linear, transform 0.04s linear",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 10,
              zIndex: 5,
            }}
          >
            {hero.stats.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "rgba(12,12,11,0.7)",
                  border: "1px solid rgba(201,168,108,0.18)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  borderRadius: 999,
                  padding: "11px 26px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  minWidth: 110,
                }}
              >
                <span
                  className="mono"
                  style={{ fontSize: "clamp(19px, 2.2vw, 26px)", fontWeight: 700, color: "#C9A86C", lineHeight: 1 }}
                >
                  {s.num}
                </span>
                <span style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: "rgba(240,237,230,0.38)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* ── Scroll indicator ── */}
          <div
            style={{
              position: "absolute",
              bottom: "clamp(18px, 3vh, 26px)",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              opacity: scrollIndicatorOp,
              transition: "opacity 0.15s linear",
            }}
          >
            <span style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: "rgba(201,168,108,0.4)",
              textTransform: "uppercase",
            }}>
              Scroll
            </span>
            <div className="scroll-caret" />
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: "clamp(60px, 10vh, 100px)", zIndex: 11, background: "linear-gradient(to bottom, transparent, var(--c-bg))" }}
        />
      </div>
    </section>
  );
}
