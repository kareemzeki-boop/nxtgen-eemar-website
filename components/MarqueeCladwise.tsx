"use client";

const TEXT = "Estidama Pearl System Compliance * GFRC Tensile Strength * ADCD Fire Rated Assemblies * Rockwool Insulation Core * Thermal Transmittance (U-Value) * Cladwise.ae * GCC Climate Verified * ";

export default function MarqueeCladwise() {
  const repeated = TEXT.repeat(3);

  return (
    <div style={{
      background: "var(--c-lime)",
      overflow: "hidden",
      padding: "16px 0",
      borderTop: "1px solid rgba(0,0,0,0.1)",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
    }}>
      <div className="marquee-track">
        {[repeated, repeated].map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(12px,1.2vw,14px)",
              color: "#000",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              paddingRight: 40,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
