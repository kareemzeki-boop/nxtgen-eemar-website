"use client";

const WORDS_A = ["GFRC", "GFRP", "UHPC", "LTGRC", "GFRG", "GFRC", "GFRP", "UHPC", "LTGRC", "GFRG"];
const WORDS_B = ["FACADES", "CLADDING", "PANELS", "ELEMENTS", "CANOPIES", "FACADES", "CLADDING", "PANELS", "ELEMENTS", "CANOPIES"];

export default function MaterialsBridge() {
  return (
    <section
      aria-hidden="true"
      style={{
        background: "var(--c-section)",
        paddingTop: "clamp(48px, 8vw, 96px)",
        paddingBottom: "clamp(48px, 8vw, 96px)",
        overflow: "hidden",
        borderTop: "1px solid var(--c-border)",
      }}
    >
      {/* Row 1 — material codes, large ghost text scrolling left */}
      <div style={{ overflow: "hidden", marginBottom: "clamp(8px, 1.5vw, 20px)" }}>
        <div className="marquee-track">
          {WORDS_A.map((w, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                fontSize: "clamp(56px, 11vw, 140px)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: i % 2 === 0 ? "rgba(201,168,108,0.07)" : "var(--c-border-sm)",
                marginRight: "clamp(24px, 4vw, 72px)",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* Centre strip — accent line + tagline */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(12px, 2vw, 32px)",
          padding: "0 clamp(20px, 5vw, 80px)",
          marginBottom: "clamp(8px, 1.5vw, 20px)",
        }}
      >
        <div style={{ flex: 1, height: 1, background: "var(--c-border)" }} />
        <p
          style={{
            fontSize: "clamp(9px, 1vw, 12px)",
            fontWeight: 700,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--c-22)",
            whiteSpace: "nowrap",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <span style={{ color: "#C9A86C" }}>●</span>
          &nbsp; Precision Manufactured &nbsp;·&nbsp; Sharjah, UAE &nbsp;·&nbsp; GCC Standard &nbsp;
          <span style={{ color: "#C9A86C" }}>●</span>
        </p>
        <div style={{ flex: 1, height: 1, background: "var(--c-border)" }} />
      </div>

      {/* Row 2 — facade words, smaller ghost text scrolling right */}
      <div style={{ overflow: "hidden" }}>
        <div className="marquee-track-reverse">
          {WORDS_B.map((w, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                fontSize: "clamp(28px, 5vw, 64px)",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: i % 2 === 0 ? "var(--c-border-sm)" : "rgba(201,168,108,0.06)",
                marginRight: "clamp(20px, 3.5vw, 56px)",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
