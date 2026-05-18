"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin, Award, Zap } from "lucide-react";
import { hero, company } from "@/lib/content";
import { ctaClick } from "@/lib/cta";

/** clamp progress to 0-1 within a sub-range */
const r = (prog: number, a: number, b: number) =>
  Math.max(0, Math.min(1, (prog - a) / (b - a)));

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const ytRef     = useRef<HTMLDivElement>(null);
  const [prog, setProg] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );

  /* ── scroll progress ─────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onScroll = () => {
      const rect  = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      setProg(total > 0 ? Math.min(1, scrolled / total) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── YouTube background ──────────────────────────────── */
  useEffect(() => {
    const videoId  = hero.backgroundVideo;
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

  /* ── animation values driven by scroll ──────────────── */
  // paragraph
  const paraOp  = r(prog, 0.10, 0.25);
  const paraY   = (1 - paraOp) * 30;
  // material pills
  const matOp   = r(prog, 0.25, 0.40);
  const matY    = (1 - matOp) * 24;
  // CTAs
  const ctaOp   = r(prog, 0.40, 0.55);
  const ctaY    = (1 - ctaOp) * 24;
  // location / ISO
  const locOp   = r(prog, 0.50, 0.63);
  // stats
  const statsIn    = r(prog, 0.60, 0.72);   // appear
  const statsScale = 1 + r(prog, 0.68, 0.87) * (isMobile ? 0.35 : 1.8);  // 1→1.35× mobile, 1→2.8× desktop
  const statsOut   = 1 - r(prog, 0.84, 1.00);         // fade
  const statsOp    = statsIn * statsOut;
  const statsY     = (1 - statsIn) * 32;

  // hero panel exit — slides up revealing next section underneath
  const exitProg   = r(prog, 0.82, 1.00);
  const heroExitY  = exitProg * -100;          // 0 → -100vh
  const heroExitOp = 1 - exitProg * 0.6;       // subtle fade as it lifts

  return (
    /* tall outer section gives scroll room */
    <section
      ref={sectionRef}
      className="section-dark"
      style={{ height: isMobile ? "300vh" : "360vh", position: "relative" }}
    >
      {/* sticky viewport-height frame — exits upward when stats finish fading */}
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        transform: `translateY(${heroExitY}vh)`,
        opacity: heroExitOp,
        willChange: "transform, opacity",
      }}>

        {/* ── Background ───────────────────────────────── */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={hero.backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            aria-hidden="true"
            fetchPriority="high"
          />
          {hero.backgroundVideo && (
            <div
              aria-hidden="true"
              style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
            >
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
          {/* pointer blocker — prevents YouTube UI from appearing */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2 }} />
          {/* dark gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: 3,
              background: "linear-gradient(110deg,rgba(10,10,10,0.97) 0%,rgba(10,10,10,0.90) 40%,rgba(10,10,10,0.72) 100%)",
            }}
          />
        </div>

        {/* radial green glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 4, background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(93,195,155,0.12) 0%, transparent 70%)" }}
        />

        {/* ── Content ──────────────────────────────────── */}
        <div
          className="relative max-w-7xl mx-auto px-5 sm:px-6 pt-24 sm:pt-32 md:pt-36 pb-10 flex flex-col h-full"
          style={{ zIndex: 10 }}
        >

          {/* Badge — always visible */}
          <div className="mb-6 sm:mb-8">
            <span className="tag-pill bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs">
              <Award size={11} />
              {hero.badge}
            </span>
          </div>

          {/* Headline — always visible */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.93] max-w-5xl">
            <span className="gradient-text">{hero.headlinePart1}</span>
            <br />
            <span className="text-white">{hero.headlinePart2}</span>
            <br />
            <span className="text-white/40">{hero.headlinePart3}</span>
          </h1>

          {/* Paragraph — scroll stage 1 */}
          <div
            style={{
              opacity: paraOp,
              transform: `translateY(${paraY}px)`,
              transition: "opacity 0.05s linear, transform 0.05s linear",
              marginTop: "clamp(20px, 3vw, 32px)",
            }}
          >
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
              {hero.subheadline}
            </p>
          </div>

          {/* Material pills — scroll stage 2 */}
          <div
            style={{
              opacity: matOp,
              transform: `translateY(${matY}px)`,
              transition: "opacity 0.05s linear, transform 0.05s linear",
              marginTop: "clamp(16px, 2vw, 24px)",
              display: "flex", flexWrap: "wrap", gap: 8,
            }}
          >
            {hero.materials.map((m) => (
              <span
                key={m}
                className="px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-white/80 border border-white/10 bg-white/5"
              >
                {m}
              </span>
            ))}
          </div>

          {/* CTAs — scroll stage 3 */}
          <div
            style={{
              opacity: ctaOp,
              transform: `translateY(${ctaY}px)`,
              transition: "opacity 0.05s linear, transform 0.05s linear",
              marginTop: "clamp(20px, 3vw, 36px)",
              display: "flex", flexWrap: "wrap", gap: 12,
            }}
          >
            <a
              href={hero.ctaPrimary.href}
              onClick={ctaClick}
              className="btn-primary px-6 sm:px-7 py-3.5 text-sm sm:text-base flex items-center gap-2"
            >
              {hero.ctaPrimary.label} <ArrowRight size={16} />
            </a>
            <a
              href={hero.ctaSecondary.href}
              className="btn-outline-dark px-6 sm:px-7 py-3.5 text-sm sm:text-base text-center"
            >
              {hero.ctaSecondary.label}
            </a>
          </div>

          {/* Location + ISO — scroll stage 3 (slightly delayed) */}
          <div
            style={{
              opacity: locOp,
              transition: "opacity 0.05s linear",
              marginTop: "clamp(14px, 2vw, 24px)",
              display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8,
            }}
            className="text-white/40 text-xs sm:text-sm"
          >
            <MapPin size={13} className="text-indigo-400" />
            <span>{company.address}</span>
            <span className="hidden sm:inline">&nbsp;·&nbsp;</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Zap size={12} className="text-indigo-400" />
              {company.certification}
            </span>
          </div>

          {/* Stats pills — scroll stage 4: scale up then fade out */}
          <div
            style={{
              position: "absolute",
              bottom: "clamp(32px, 6vh, 72px)",
              left: 0, right: 0,
              padding: "0 20px",
              opacity: statsOp,
              transform: `translateY(${statsY}px) scale(${statsScale})`,
              transformOrigin: "center bottom",
              transition: "opacity 0.04s linear, transform 0.04s linear",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
              zIndex: 5,
            }}
          >
            {hero.stats.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                  borderRadius: 999,
                  padding: "10px 28px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  minWidth: 110,
                }}
              >
                <span style={{ fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 900, color: "#fff", lineHeight: 1 }}>
                  {s.num}
                </span>
                <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

        </div>{/* /content */}

        {/* bottom fade into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ zIndex: 11, background: "linear-gradient(to bottom, transparent, #0a0a0a)" }}
        />
      </div>{/* /sticky */}
    </section>
  );
}
