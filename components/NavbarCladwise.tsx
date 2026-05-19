"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",     href: "#home" },
  { label: "About",    href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];

export default function NavbarCladwise() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [capsule, setCapsule] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    const observers = NAV_LINKS.map(({ href }) => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-20% 0px -60% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  // Move capsule to active link
  useEffect(() => {
    const linkEl = linkRefs.current[activeSection];
    const navEl = navRef.current;
    if (!linkEl || !navEl) return;
    const navRect = navEl.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();
    setCapsule({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
      opacity: 1,
    });
  }, [activeSection]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          transition: "background 0.3s ease, border-color 0.3s ease",
          background: scrolled ? "rgba(0,0,0,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "0 24px",
          height: 68, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <a href="#home" style={{ display: "flex", alignItems: "baseline", gap: 8, textDecoration: "none" }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", letterSpacing: "-0.02em" }}>
              Cladwise
            </span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "var(--c-lime)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              by ELM Emaar
            </span>
          </a>

          {/* Desktop Nav */}
          <div ref={navRef} className="hidden md:flex" style={{ position: "relative", alignItems: "center", gap: 4 }}>
            {/* Gliding capsule */}
            <span style={{
              position: "absolute",
              top: "50%", transform: "translateY(-50%)",
              left: capsule.left,
              width: capsule.width,
              height: 34,
              background: "var(--c-lime)",
              borderRadius: 999,
              opacity: capsule.opacity,
              transition: "left 0.35s cubic-bezier(0.22,1,0.36,1), width 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease",
              pointerEvents: "none",
              zIndex: 0,
            }} />
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={href}
                  href={href}
                  ref={(el: HTMLAnchorElement | null) => { linkRefs.current[id] = el; }}
                  style={{
                    position: "relative", zIndex: 1,
                    padding: "8px 16px",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    letterSpacing: "0.01em",
                    color: isActive ? "#000" : "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    borderRadius: 999,
                    transition: "color 0.25s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: 12 }}>
            <a href="#contact" className="btn-lime" style={{ fontSize: 13, padding: "10px 22px" }}>
              Launch App
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 4 }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 49,
              background: "#000",
              display: "flex", flexDirection: "column",
              alignItems: "flex-start", justifyContent: "center",
              paddingLeft: "clamp(32px,8vw,80px)",
              gap: 8,
            }}
          >
            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.a
                key={href}
                href={href}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 + 0.05 }}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(36px,8vw,64px)",
                  color: activeSection === href.replace("#","") ? "var(--c-lime)" : "#fff",
                  textDecoration: "none",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  padding: "4px 0",
                }}
              >
                {label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => setOpen(false)}
              className="btn-lime"
              style={{ marginTop: 32, fontSize: 14, padding: "14px 32px" }}
            >
              Launch App
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
