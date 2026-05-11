"use client";
export default function CTAOverlay() {
  return (
    <div
      id="cta-overlay"
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(135deg, #5DC39B 0%, #3a9e7a 100%)",
        zIndex: 9997,
        opacity: 0,
        pointerEvents: "none",
        transition: "opacity 0.38s cubic-bezier(0.4,0,0.2,1)",
      }}
    />
  );
}
