"use client";
import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, MapPin, Award, Zap } from "lucide-react";
import { hero, company } from "@/lib/content";
import { ctaClick } from "@/lib/cta";

const r = (prog: number, a: number, b: number) =>
  Math.max(0, Math.min(1, (prog - a) / (b - a)));

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.065, duration: 0.55, ease: "easeOut" },
  }),
};

function WordReveal({ text, offset = 0, style }: { text: string; offset?: number; style?: React.CSSProperties }) {
  return (
    <span style={style}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          custom={offset + i}
          initial="hidden"
          animate="visible"
          variants={wordVariants}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const ytRef      = useRef<HTMLDivElement>(null);
  const [prog, setProg]       = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const videoId   = hero.backgroundVideo;
    const container = ytRef.current;
    if (!videoId || !container) return;

    const PLAYER_ID = "yt-hero-bg";
    const playerDiv = document.createElement("div");
    playerDiv.id = PLAYER_ID;
    container.appendChild(playerDiv);

    const iframeStyle = [
      "position:absolute;border:none;pointer-events:none;",
      "top:50%;left:50%;",
      "width:calc(100% + 480px);",
      "height:calc(100% + 360px);",
      "transform:translate(-50%,-50%);",
    ].join("");

    const playerDivStyle = [
      "position:absolute;top:50%;left:50%;",
      "width:calc(100% + 480px);height:calc(100% + 360px);",
      "transform:translate(-50%,-50%);pointer-events:none;",
    ].join("");

    const initPlayer = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const YT = (window as any).YT;
      new YT.Player(PLAYER_ID, {
        videoId,
        playerVars: {
          autoplay: 1, mute: 1, loop: 1, playlist: videoId,
          controls: 0, disablekb: 1, modestbranding: 1,
          playsinline: 1, rel: 0, iv_load_policy: 3, fs: 0,
          start: 4, cc_load_policy: 0, showinfo: 0,
          origin: typeof window !== "undefined" ? window.location.origin : "",
        },
        events: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onReady: (e: any) => {
            e.target.setVolume(0);
            e.target.playVideo();
            const iframe: HTMLIFrameElement | null = playerDiv.querySelector("iframe");
            if (iframe) iframe.style.cssText = iframeStyle;
            playerDiv.style.cssText = playerDivStyle;
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onStateChange: (e: any) => {
            if (e.data === 2) e.target.playVideo(); // resume if paused
          },
        },
      });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).YT?.Player) {
      initPlayer();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).onYouTubeIframeAPIReady = initPlayer;
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const s = document.createElement("script");
        s.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(s);
      }
    }

    return () => {
      if (container.contains(playerDiv)) container.removeChild(playerDiv);
    };
  }, []);

  const paraOp  = r(prog, 0.10, 0.25);
  const paraY   = (1 - paraOp) * 30;
  const matOp   = r(prog, 0.25, 0.40);
  const matY    = (1 - matOp) * 24;
  const ctaOp   = r(prog, 0.40, 0.55);
  const ctaY    = (1 - ctaOp) * 24;
  const locOp   = r(prog, 0.50, 0.63);
  const statsIn    = r(prog, 0.60, 0.72);
  const statsScale = 1 + r(prog, 0.68, 0.87) * (isMobile ? 0.35 : 1.8);
  const statsOut   = 1 - r(prog, 0.84, 1.00);
  const statsOp    = statsIn * statsOut;
  const statsY     = (1 - statsIn) * 32;
  const exitProg   = r(prog, 0.82, 1.00);
  const heroExitY  = exitProg * -100;
  const heroExitOp = 1 - exitProg * 0.6;

  const words1 = hero.headlinePart1.split(" ");
  const words2 = hero.headlinePart2.split(" ");
  const scrollIndicatorOp = 1 - r(prog, 0, 0.12);

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

        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={hero.backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            aria-hidden="true"
            fetchPriority="high"
          />
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
          {/* Light uniform tint so video reads through everywhere */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: 2,
              background: "rgba(12,12,11,0.38)",
            }}
          />
          {/* Bottom-up dark fade for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: 3,
              background: "linear-gradient(to top, rgba(12,12,11,0.75) 0%, rgba(12,12,11,0.30) 45%, transparent 100%)",
            }}
          />
        </div>

        {/* Gold glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 4, background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(45,212,191,0.10) 0%, transparent 70%)" }}
        />

        {/* Content */}
        <div
          className="relative max-w-7xl mx-auto px-5 sm:px-6 pt-24 sm:pt-32 md:pt-36 pb-10 flex flex-col h-full"
          style={{ zIndex: 10 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 sm:mb-8"
          >
            <span className="tag-pill bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs">
              <Award size={11} />
              {hero.badge}
            </span>
          </motion.div>

          {/* Headline — word-by-word reveal */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.93] max-w-5xl display" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.85), 0 1px 6px rgba(0,0,0,0.6)" }}>
            <WordReveal text={hero.headlinePart1} offset={0} style={{ display: "block" }} />
            <WordReveal
              text={hero.headlinePart2}
              offset={words1.length}
              style={{ display: "block", color: "#F0EDE6" }}
            />
            <WordReveal
              text={hero.headlinePart3}
              offset={words1.length + words2.length}
              style={{ display: "block", color: "var(--c-28)" }}
            />
          </h1>

          {/* Paragraph — scroll stage 1 */}
          <div
            style={{
              opacity: paraOp,
              transform: `translateY(${paraY}px)`,
              transition: "opacity 0.05s linear, transform 0.05s linear",
              marginTop: "clamp(20px, 3vw, 48px)",
            }}
          >
            <p className="text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed"
              style={{ color: "var(--c-55)" }}>
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
                className="mono px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold tracking-widest border"
                style={{ color: "var(--c-55)", borderColor: "var(--c-border-sm)", background: "var(--c-panel)" }}
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
              <span>{hero.ctaPrimary.label}</span>
              <ArrowRight size={16} />
            </a>
            <a href={hero.ctaSecondary.href} className="btn-outline-dark px-6 sm:px-7 py-3.5 text-sm sm:text-base text-center">
              {hero.ctaSecondary.label}
            </a>
          </div>

          {/* Location + ISO — scroll stage 3 */}
          <div
            style={{
              opacity: locOp,
              transition: "opacity 0.05s linear",
              marginTop: "clamp(14px, 2vw, 24px)",
              display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8,
              color: "var(--c-35)",
              fontSize: "0.8rem",
            }}
          >
            <MapPin size={13} style={{ color: "#2DD4BF" }} />
            <span>{company.address}</span>
            <span className="hidden sm:inline">&nbsp;·&nbsp;</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Zap size={12} style={{ color: "#2DD4BF" }} />
              {company.certification}
            </span>
          </div>

          {/* Stats pills — scroll stage 4 */}
          <div
            style={{
              position: "absolute",
              bottom: "clamp(48px, 8vh, 88px)",
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
                  background: "var(--c-panel)",
                  border: "1px solid var(--c-border-md)",
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
                <span className="mono" style={{ fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700, color: "#F0EDE6", lineHeight: 1 }}>
                  {s.num}
                </span>
                <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(240,237,230,0.38)", letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "clamp(20px, 3vh, 28px)",
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
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", color: "rgba(45,212,191,0.4)", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
              Scroll
            </span>
            <div className="scroll-caret" />
          </div>

        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ zIndex: 11, background: "linear-gradient(to bottom, transparent, var(--c-bg))" }}
        />
      </div>
    </section>
  );
}
