"use client";
import React from "react";

export default function SpinningCube({
  label,
  color,
  size = 58,
  dark = true,
}: {
  label: string;
  color: string;
  size?: number;
  dark?: boolean;
}) {
  const half = size / 2;
  const bg   = dark ? "rgba(15,15,15,0.82)" : "rgba(255,255,255,0.88)";
  const txt  = color;

  const face = (transform: string, content?: string): React.CSSProperties => ({
    position:       "absolute",
    width:          size,
    height:         size,
    background:     bg,
    border:         `1.5px solid ${color}`,
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    fontSize:       Math.round(size * 0.22),
    fontWeight:     900,
    color:          txt,
    letterSpacing:  "0.06em",
    transform,
    backfaceVisibility: "hidden",
  });

  return (
    <div style={{ width: size, height: size, perspective: size * 7 }}>
      <div
        className="cube-spin"
        style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" }}
      >
        <div style={face(`translateZ(${half}px)`)}>{label}</div>
        <div style={face(`rotateY(180deg) translateZ(${half}px)`)}>{label}</div>
        <div style={face(`rotateY(90deg) translateZ(${half}px)`)}>{label}</div>
        <div style={face(`rotateY(-90deg) translateZ(${half}px)`)}>{label}</div>
        <div style={face(`rotateX(90deg) translateZ(${half}px)`)} />
        <div style={face(`rotateX(-90deg) translateZ(${half}px)`)} />
      </div>
    </div>
  );
}
