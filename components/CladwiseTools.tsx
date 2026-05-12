"use client";
import { useState } from "react";

const TOOLS = [
  {
    id: "uvalue",
    badge: "Thermal Analysis",
    title: "U-Value Calculator",
    desc: "Calculate thermal transmittance for your façade system and verify compliance with UAE energy codes.",
    url: "https://cladwise.ae/u-value-calculator.html",
    accent: "#5DC39B",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
      </svg>
    ),
  },
  {
    id: "ai",
    badge: "AI-Powered",
    title: "Material Advisor",
    desc: "Answer 5 quick questions and get instant ranked material recommendations with UAE compliance context — no login needed.",
    url: "https://cladwise.ae/#wizard",
    accent: "#818cf8",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
        <circle cx="8.5" cy="14.5" r="1.5" fill="currentColor" stroke="none"/>
        <circle cx="15.5" cy="14.5" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
];

export default function CladwiseTools() {
  const [active, setActive] = useState<string | null>(null);
  const tool = TOOLS.find(t => t.id === active);

  return (
    <>
      <section
        id="tools"
        style={{
          background: "linear-gradient(180deg,#0a0a0a 0%,#0d1117 100%)",
          padding: "96px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* grid bg */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>

          {/* header */}
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(93,195,155,0.08)", border: "1px solid rgba(93,195,155,0.18)",
              borderRadius: 999, padding: "6px 16px", marginBottom: 20,
            }}>
              <img
                src="https://www.google.com/s2/favicons?domain=cladwise.ae&sz=16"
                alt=""
                width={14} height={14}
                style={{ borderRadius: 2, opacity: 0.8 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#5DC39B", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Powered by CladWise
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, color: "#fff", marginBottom: 14, lineHeight: 1.1 }}>
              Façade Design Tools
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", maxWidth: 480, margin: "0 auto" }}>
              Specify smarter — free tools to verify thermal performance and select the right material for your project.
            </p>
          </div>

          {/* cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
            {TOOLS.map(t => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1.5px solid rgba(255,255,255,0.07)`,
                  borderRadius: 16,
                  padding: "32px 28px",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.background = `rgba(255,255,255,0.06)`;
                  el.style.borderColor = `${t.accent}55`;
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.background = "rgba(255,255,255,0.03)";
                  el.style.borderColor = "rgba(255,255,255,0.07)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* glow */}
                <div style={{
                  position: "absolute", top: -40, right: -40,
                  width: 180, height: 180,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${t.accent}18 0%, transparent 70%)`,
                  pointerEvents: "none",
                }} />

                <div style={{ color: t.accent, marginBottom: 20 }}>{t.icon}</div>

                <div style={{
                  display: "inline-block",
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: t.accent, background: `${t.accent}15`,
                  padding: "3px 10px", borderRadius: 999, marginBottom: 12,
                }}>
                  {t.badge}
                </div>

                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 10 }}>{t.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 24 }}>{t.desc}</p>

                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 13, fontWeight: 700, color: t.accent,
                }}>
                  Open Tool
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* powered by */}
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <a
              href="https://cladwise.ae"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textDecoration: "none" }}
            >
              Tools provided by cladwise.ae ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      {active && tool && (
        <div
          onClick={() => setActive(null)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(6px)",
            zIndex: 9000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "fadeIn 0.2s ease",
          }}
        >
          <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>

          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%", maxWidth: 960,
              height: "min(85vh, 800px)",
              background: "#0d1117",
              borderRadius: 16,
              border: `1.5px solid ${tool.accent}33`,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${tool.accent}22`,
              animation: "slideUp 0.25s ease",
            }}
          >
            <style>{`@keyframes slideUp{from{transform:translateY(24px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>

            {/* modal header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "14px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.03)",
              flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: tool.accent }}>{tool.icon}</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{tool.title}</span>
                <span style={{
                  fontSize: 10, fontWeight: 700, color: tool.accent,
                  background: `${tool.accent}18`, padding: "2px 8px", borderRadius: 999,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  {tool.badge}
                </span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 12, color: "rgba(255,255,255,0.4)",
                    textDecoration: "none", padding: "6px 12px",
                    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 7,
                  }}
                >
                  Open in new tab ↗
                </a>
                <button
                  onClick={() => setActive(null)}
                  style={{
                    background: "rgba(255,255,255,0.07)", border: "none",
                    color: "rgba(255,255,255,0.6)", borderRadius: 7,
                    width: 32, height: 32, cursor: "pointer", fontSize: 16,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* iframe */}
            <iframe
              src={tool.url}
              style={{ flex: 1, border: "none", width: "100%", background: "#fff" }}
              title={tool.title}
              allow="clipboard-write"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>
      )}
    </>
  );
}
