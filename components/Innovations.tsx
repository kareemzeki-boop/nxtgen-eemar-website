"use client";
import { useEffect, useRef, useState } from "react";
import { Cpu, Layers3, Leaf, Atom, ArrowRight, Info } from "lucide-react";
import { innovations as innovationsData } from "@/lib/content";
import { ctaClick } from "@/lib/cta";

const ICONS = [Cpu, Layers3, Leaf, Atom] as const;
const cards = innovationsData.map((item, i) => ({ ...item, Icon: ICONS[i] }));

const r = (v: number, a: number, b: number) =>
  Math.max(0, Math.min(1, (v - a) / (b - a)));

const WINDOWS: [number, number][] = [
  [0.04, 0.20],
  [0.24, 0.40],
  [0.46, 0.61],
  [0.65, 0.80],
];

export default function Innovations() {
  const sectionRef = useRef<HTMLElement>(null);
  const [prog, setProg] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Header — fades out before first card enters */}
        <div
          className="absolute inset-0 flex items-center"
          style={{
            opacity: 1 - r(prog, 0.0, 0.10),
            transition: "opacity 0.05s linear",
            zIndex: 0,
            pointerEvents: prog > 0.05 ? "none" : "auto",
          }}
        >
          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 w-full">
            <span className="tag-pill bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs">
              R&amp;D Innovations
            </span>
            <h2
              className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight max-w-2xl leading-tight mt-6"
              style={{ color: "var(--c-text)" }}
            >
              Beyond the brief.
              <br />
              <span style={{ color: "var(--c-28)" }}>Beyond the material.</span>
            </h2>
            <p className="text-sm mt-5 font-medium tracking-wide" style={{ color: "var(--c-40)" }}>
              Scroll to explore our four core breakthroughs ↓
            </p>
          </div>
        </div>

        {/* Stacking cards */}
        {cards.map((item, i) => {
          const { Icon } = item;
          const [a, b] = WINDOWS[i];
          const enter = r(prog, a, b);

          // Stack compression: each card above this one pushes it further into the stack
          let stackFactor = 0;
          for (let j = i + 1; j < cards.length; j++) {
            stackFactor += r(prog, WINDOWS[j][0], WINDOWS[j][1]);
          }

          const slideInVh = (1 - enter) * 110;
          const stackY = -stackFactor * 22;
          const scale = 1 - stackFactor * 0.045;
          const stackOpacity = 1 - stackFactor * 0.14;
          const isHovered = hoveredCard === i;

          return (
            <div
              key={item.title}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "min(88vw, 480px)",
                transform: `translate(-50%, calc(-50% + ${slideInVh}vh + ${stackY}px)) scale(${scale})`,
                transition: "transform 0.04s linear",
                transformOrigin: "50% 60%",
                zIndex: i + 1,
                opacity: enter * stackOpacity,
              }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* UIverse gradient card */}
              <div
                style={{
                  background: "linear-gradient(to top right, #155e75, #0e7490, #0891b2)",
                  borderRadius: 20,
                  overflow: "hidden",
                  position: "relative",
                  color: "white",
                  boxShadow: isHovered
                    ? "0 40px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.14)"
                    : "0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
                  transition: "box-shadow 0.4s ease",
                }}
              >
                {/* Animated blob circle — moves to bottom-right on hover */}
                <div
                  style={{
                    position: "absolute",
                    width: 110,
                    height: 110,
                    borderRadius: "50%",
                    border: "8px solid rgba(255,255,255,0.45)",
                    opacity: 0.5,
                    top: isHovered ? "calc(100% - 68px)" : -28,
                    left: isHovered ? "calc(100% - 68px)" : -16,
                    transform: isHovered ? "scale(1.3)" : "scale(1)",
                    filter: isHovered ? "blur(8px)" : "blur(0px)",
                    transition: [
                      "top 0.7s cubic-bezier(0.22,1,0.36,1)",
                      "left 0.7s cubic-bezier(0.22,1,0.36,1)",
                      "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
                      "filter 0.7s cubic-bezier(0.22,1,0.36,1)",
                    ].join(", "),
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                />

                {/* Card content */}
                <div style={{ position: "relative", zIndex: 1, padding: "26px 26px 0" }}>

                  {/* Progress track */}
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 20 }}>
                    {cards.map((_, j) => (
                      <div
                        key={j}
                        style={{
                          height: 3,
                          width: j === i ? 22 : 10,
                          borderRadius: 999,
                          background: j <= i ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)",
                          transition: "width 0.3s",
                        }}
                      />
                    ))}
                    <span style={{ fontSize: 10, fontWeight: 700, opacity: 0.55, marginLeft: 8, letterSpacing: "0.1em" }}>
                      {String(i + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(cards.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Icon + tag */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <div
                      style={{
                        width: 40, height: 40, borderRadius: 10,
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={17} style={{ color: "white" }} />
                    </div>
                    <span
                      style={{
                        fontSize: 10, fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        opacity: 0.72,
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: "clamp(22px, 3.5vw, 34px)",
                      fontWeight: 900,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      marginBottom: 10,
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Subtitle */}
                  <p style={{ fontSize: 13, fontWeight: 600, opacity: 0.7, marginBottom: 14 }}>
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p style={{ fontSize: 13, lineHeight: 1.68, opacity: 0.82, marginBottom: 20 }}>
                    {item.description}
                  </p>

                  {/* Metric */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 26 }}>
                    <span
                      style={{
                        fontSize: 44,
                        fontWeight: 900,
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                      }}
                    >
                      {item.metric}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.6, maxWidth: 110, lineHeight: 1.3 }}>
                      {item.metricLabel}
                    </span>
                  </div>
                </div>

                {/* Bottom action buttons */}
                <div style={{ display: "flex", borderTop: "1px solid rgba(255,255,255,0.15)" }}>
                  <a
                    href="#contact"
                    onClick={ctaClick}
                    style={{
                      flex: 1,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                      padding: "14px 0",
                      background: "rgba(207,250,254,0.13)",
                      color: "white",
                      fontSize: 11,
                      fontWeight: 700,
                      textDecoration: "none",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      borderRight: "1px solid rgba(255,255,255,0.12)",
                      transition: "background 0.2s",
                    }}
                  >
                    <ArrowRight size={13} />
                    Start Project
                  </a>
                  <a
                    href="#services"
                    style={{
                      flex: 1,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                      padding: "14px 0",
                      background: "rgba(207,250,254,0.08)",
                      color: "white",
                      fontSize: 11,
                      fontWeight: 700,
                      textDecoration: "none",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      transition: "background 0.2s",
                    }}
                  >
                    <Info size={13} />
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}
