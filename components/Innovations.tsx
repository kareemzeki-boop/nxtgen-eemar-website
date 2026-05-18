"use client";
import { useEffect, useRef, useState } from "react";
import { Cpu, Layers3, Leaf, Atom, ArrowRight } from "lucide-react";
import { innovations as innovationsData, innovationsBackgroundImage } from "@/lib/content";
import { ctaClick } from "@/lib/cta";

const ICONS = [Cpu, Layers3, Leaf, Atom] as const;
const cards = innovationsData.map((item, i) => ({ ...item, Icon: ICONS[i] }));

/** clamp progress to 0-1 within sub-range */
const r = (v: number, a: number, b: number) =>
  Math.max(0, Math.min(1, (v - a) / (b - a)));

// Each card's enter window as fraction of total section scroll progress
const WINDOWS: [number, number][] = [
  [0.02, 0.18],
  [0.24, 0.40],
  [0.46, 0.61],
  [0.65, 0.80],
];

export default function Innovations() {
  const sectionRef = useRef<HTMLElement>(null);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      setProg(total > 0 ? Math.min(1, scrolled / total) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="innovations"
      className="section-dark relative"
      style={{ height: "600vh" }}
    >
      {/* ── Sticky viewport ── */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Header — visible before first card enters */}
        <div
          className="absolute inset-0 flex items-center"
          style={{
            opacity: 1 - r(prog, 0.0, 0.12),
            transition: "opacity 0.05s linear",
            zIndex: 0,
          }}
        >
          {/* Background texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${innovationsBackgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.06,
            }}
          />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 w-full">
            <span className="tag-pill bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs">
              R&amp;D Innovations
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-2xl leading-tight mt-6">
              Beyond the brief.
              <br />
              <span className="text-white/30">Beyond the material.</span>
            </h2>
            <p className="text-white/40 text-sm mt-5 font-medium tracking-wide">
              Scroll to explore our four core breakthroughs ↓
            </p>
          </div>
        </div>

        {/* ── Cards — each slides up and stacks ── */}
        {cards.map((item, i) => {
          const { Icon } = item;
          const [a, b] = WINDOWS[i];
          const enter = r(prog, a, b);
          const ty = (1 - enter) * 100; // 100% → 0%

          return (
            <div
              key={item.title}
              style={{
                position: "absolute",
                inset: 0,
                transform: `translateY(${ty}%)`,
                transition: "transform 0.04s linear",
                zIndex: i + 1,
              }}
            >
              {/* Card background */}
              <div className="absolute inset-0" style={{ background: "#0f0f0f" }} />
              <div
                className="absolute inset-0"
                style={{ background: `${item.color}09` }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url(${innovationsBackgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.035,
                }}
              />

              {/* Top accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, ${item.color}, ${item.color}44)`,
                }}
              />

              {/* Large ghost metric — background decoration */}
              <div
                className="absolute right-0 bottom-0 pointer-events-none select-none hidden md:block"
                style={{
                  fontSize: "clamp(160px, 20vw, 260px)",
                  fontWeight: 900,
                  color: item.color,
                  opacity: 0.04,
                  lineHeight: 1,
                  letterSpacing: "-0.05em",
                  transform: "translate(8%, 18%)",
                }}
              >
                {item.metric}
              </div>

              {/* Content */}
              <div
                className="relative h-full flex flex-col justify-center max-w-7xl mx-auto px-5 sm:px-8"
                style={{ paddingTop: 64, paddingBottom: 40 }}
              >
                {/* Progress track */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 36 }}>
                  {cards.map((_, j) => (
                    <div
                      key={j}
                      style={{
                        height: 3,
                        width: j === i ? 28 : 14,
                        borderRadius: 999,
                        background: j <= i ? item.color : "rgba(255,255,255,0.1)",
                        transition: "width 0.3s, background 0.3s",
                      }}
                    />
                  ))}
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.25)",
                      marginLeft: 8,
                      letterSpacing: "0.1em",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(cards.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Two-column on desktop */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-16">

                  {/* Left — main content */}
                  <div className="flex-1 min-w-0">
                    {/* Icon + tag */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                      <div
                        style={{
                          width: 42, height: 42, borderRadius: 10,
                          background: `${item.color}18`,
                          border: `1px solid ${item.color}35`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={18} style={{ color: item.color }} />
                      </div>
                      <span
                        style={{
                          fontSize: 10, fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: item.color,
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: "clamp(28px, 4.5vw, 56px)",
                        fontWeight: 900,
                        color: "#fff",
                        letterSpacing: "-0.03em",
                        lineHeight: 1.08,
                        marginBottom: 14,
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.38)",
                        fontWeight: 600,
                        marginBottom: 18,
                        letterSpacing: "0.01em",
                      }}
                    >
                      {item.subtitle}
                    </p>

                    <p
                      style={{
                        fontSize: "clamp(14px, 1.1vw, 16px)",
                        color: "rgba(255,255,255,0.58)",
                        lineHeight: 1.72,
                        maxWidth: 500,
                        marginBottom: 36,
                      }}
                    >
                      {item.description}
                    </p>

                    <a
                      href="#contact"
                      onClick={ctaClick}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "13px 28px",
                        borderRadius: 9999,
                        background: item.color,
                        color: "#0a0a0a",
                        fontSize: 13,
                        fontWeight: 700,
                        textDecoration: "none",
                        letterSpacing: "0.04em",
                      }}
                    >
                      Start a Project <ArrowRight size={14} />
                    </a>
                  </div>

                  {/* Right — metric (desktop) */}
                  <div
                    className="hidden md:flex"
                    style={{
                      flexDirection: "column",
                      alignItems: "flex-end",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "clamp(64px, 9vw, 110px)",
                        fontWeight: 900,
                        color: item.color,
                        lineHeight: 1,
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {item.metric}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.28)",
                        fontWeight: 600,
                        marginTop: 8,
                        textAlign: "right",
                        maxWidth: 180,
                        lineHeight: 1.4,
                      }}
                    >
                      {item.metricLabel}
                    </div>
                  </div>

                </div>

                {/* Mobile metric */}
                <div className="flex md:hidden items-baseline gap-3" style={{ marginTop: 28 }}>
                  <span
                    style={{
                      fontSize: 42,
                      fontWeight: 900,
                      color: item.color,
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {item.metric}
                  </span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>
                    {item.metricLabel}
                  </span>
                </div>

              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}
