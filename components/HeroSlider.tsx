"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  category: string;
  title: string;
  location: string;
}

const slides: Slide[] = [
  {
    image: "/nxtgen-eemar-website/images/hero-facade.png",
    category: "GFRC FACADES",
    title: "Living Facades\nFor The Middle East",
    location: "Sharjah, UAE",
  },
  {
    image: "/nxtgen-eemar-website/images/service-gfrc.png",
    category: "ARCHITECTURAL CLADDING",
    title: "Cultural\nExpressions",
    location: "Abu Dhabi, UAE",
  },
  {
    image: "/nxtgen-eemar-website/images/project-islamic-arch.jpg",
    category: "GRG ORNAMENTAL",
    title: "Grand Mosque\nCultural Wing",
    location: "Muscat, Oman",
  },
  {
    image: "/nxtgen-eemar-website/images/service-uhpc.jpg",
    category: "UHPC PANELS",
    title: "Structural\nArtistry",
    location: "Dubai, UAE",
  },
];

const TOTAL = slides.length;
const AUTO_ADVANCE_MS = 5000;

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const goTo = useCallback((index: number, dir: 1 | -1) => {
    setDirection(dir);
    setActive(index);
  }, []);

  const next = useCallback(() => {
    goTo((active + 1) % TOTAL, 1);
  }, [active, goTo]);

  const prev = useCallback(() => {
    goTo((active - 1 + TOTAL) % TOTAL, -1);
  }, [active, goTo]);

  // Auto-advance every 5 s
  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1);
      setActive((a) => (a + 1) % TOTAL);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [active]); // reset timer on manual change

  const slide = slides[active];

  // Pad slide number to 2 digits
  const pad = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <section
      id="home"
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "#0C0C0B",
      }}
    >
      {/* ── Background image with AnimatePresence ── */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={slide.image}
          initial={{ x: `${direction * 5}%`, scale: 1.06, opacity: 0 }}
          animate={{ x: "0%", scale: 1, opacity: 1 }}
          exit={{ x: `${direction * -3}%`, scale: 1.02, opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            willChange: "transform, opacity",
          }}
          aria-hidden="true"
        >
          <img
            src={slide.image}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
            fetchPriority={active === 0 ? "high" : "auto"}
          />
          {/* Dark gradient overlay: heavy left → transparent right */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.40) 55%, rgba(0,0,0,0.10) 100%)",
            }}
          />
          {/* Bottom fade so footer transition is smooth */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 40%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Left side vertical label ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 24,
          top: "50%",
          transform: "translateY(-50%) rotate(-90deg)",
          transformOrigin: "center center",
          zIndex: 20,
          whiteSpace: "nowrap",
        }}
      >
        <span
          className="mono"
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.28em",
            color: "#C9A86C",
            textTransform: "uppercase",
          }}
        >
          ELM EMAAR FACADES
        </span>
      </div>

      {/* ── Bottom-left content ── */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`content-${active}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{
            position: "absolute",
            bottom: "clamp(60px, 10vh, 100px)",
            left: "clamp(40px, 6vw, 120px)",
            zIndex: 20,
            maxWidth: "clamp(300px, 50vw, 680px)",
          }}
        >
          {/* Category tag */}
          <div
            className="mono"
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "#C9A86C",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            {slide.category}
          </div>

          {/* Large heading — Cormorant Garamond */}
          <h1
            className="display"
            style={{
              fontSize: "clamp(48px, 7vw, 110px)",
              fontWeight: 900,
              color: "#F0EDE6",
              lineHeight: 0.92,
              margin: 0,
              letterSpacing: "-0.02em",
              whiteSpace: "pre-line",
            }}
          >
            {slide.title}
          </h1>

          {/* Location */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 20,
            }}
          >
            <MapPin size={12} style={{ color: "#C9A86C", flexShrink: 0 }} />
            <span
              className="mono"
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#C9A86C",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {slide.location}
            </span>
          </div>

          {/* See Project CTA */}
          <a
            href="#projects"
            className="group"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 24,
              color: "rgba(240,237,230,0.85)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#C9A86C";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "rgba(240,237,230,0.85)";
            }}
          >
            <span
              style={{
                borderBottom: "1px solid rgba(240,237,230,0.35)",
                paddingBottom: 2,
                lineHeight: 1,
              }}
            >
              See Project
            </span>
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom-right: counter + nav arrows ── */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(60px, 10vh, 100px)",
          right: "clamp(24px, 4vw, 80px)",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 20,
        }}
      >
        {/* Slide counter */}
        <div
          className="mono"
          style={{
            fontSize: "clamp(13px, 1.4vw, 18px)",
            fontWeight: 700,
            letterSpacing: "0.08em",
            display: "flex",
            alignItems: "baseline",
            gap: 4,
          }}
        >
          <span style={{ color: "#C9A86C" }}>{pad(active)}</span>
          <span style={{ color: "rgba(240,237,230,0.30)", fontSize: "0.75em" }}>
            {" "}/ {pad(TOTAL - 1)}
          </span>
        </div>

        {/* Prev / Next arrows */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={prev}
            aria-label="Previous slide"
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              border: "1px solid rgba(240,237,230,0.30)",
              background: "rgba(0,0,0,0.25)",
              color: "#F0EDE6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "border-color 0.2s, background 0.2s",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = "#C9A86C";
              el.style.background = "rgba(201,168,108,0.15)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = "rgba(240,237,230,0.30)";
              el.style.background = "rgba(0,0,0,0.25)";
            }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              border: "1px solid rgba(240,237,230,0.30)",
              background: "rgba(0,0,0,0.25)",
              color: "#F0EDE6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "border-color 0.2s, background 0.2s",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = "#C9A86C";
              el.style.background = "rgba(201,168,108,0.15)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = "rgba(240,237,230,0.30)";
              el.style.background = "rgba(0,0,0,0.25)";
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ── Right side vertical pagination dots ── */}
      <div
        style={{
          position: "absolute",
          right: 24,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
        role="tablist"
        aria-label="Slide navigation"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === active}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i, i > active ? 1 : -1)}
            style={{
              width: i === active ? 8 : 6,
              height: i === active ? 8 : 6,
              borderRadius: "50%",
              border: i === active ? "none" : "1.5px solid rgba(240,237,230,0.45)",
              background: i === active ? "#C9A86C" : "transparent",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
              boxShadow: i === active ? "0 0 8px rgba(201,168,108,0.6)" : "none",
            }}
          />
        ))}
      </div>
    </section>
  );
}
