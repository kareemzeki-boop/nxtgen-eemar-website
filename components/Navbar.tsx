"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks as links, company } from "@/lib/content";

function scrollTo(href: string) {
  const lenis = (window as unknown as Record<string, unknown>).__lenis as { scrollTo: (t: string, o: object) => void } | undefined;
  if (lenis) {
    lenis.scrollTo(href, { duration: 0.9, offset: -68 });
  } else {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [open, setOpen]                 = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Active-section detection via IntersectionObserver
  useEffect(() => {
    const ids = links.map(l => l.href.replace("#", ""));
    const observers = ids.map(id => {
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

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? "border-b"
            : "bg-transparent"
        }`}
        style={scrolled ? {
          background: "var(--c-nav-bg)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "var(--c-nav-border)",
        } : {}}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between" style={{ height: 68 }}>

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center pulse-glow shrink-0" style={{ background: "#2DD4BF" }}>
              <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
                <path d="M9 1L17 5V13L9 17L1 13V5L9 1Z" stroke="white" strokeWidth="1.5" fill="none" />
                <path d="M9 5L13 7V11L9 13L5 11V7L9 5Z" fill="white" fillOpacity="0.9" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base tracking-tight leading-none" style={{ color: "var(--c-text)" }}>{company.name}</div>
              <div className="text-[10px] sm:text-xs tracking-wider leading-none mt-0.5" style={{ color: "var(--c-40)" }}>{company.taglineBy}</div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {links.map((l) => {
              const isActive = activeSection === l.href.replace("#", "");
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className="relative text-sm font-medium transition-colors duration-200 py-1"
                  style={{ color: isActive ? "#2DD4BF" : "var(--c-45)" }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-text)"; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-45)"; }}
                  onClick={e => { e.preventDefault(); scrollTo(l.href); }}
                >
                  {l.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 2, background: "#2DD4BF", borderRadius: 1 }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <a
              href={`mailto:${company.email}`}
              className="text-xs lg:text-sm font-medium transition-colors hidden lg:block"
              style={{ color: "var(--c-45)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--c-text)")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--c-45)")}
            >
              {company.email}
            </a>
            <a href="#contact" className="btn-primary px-4 lg:px-5 py-2.5 text-sm">
              <span>Get a Quote</span>
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-1.5 rounded-lg transition-colors"
            style={{ color: "var(--c-text)" }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "var(--c-panel)")}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu — slides in from right */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: "var(--c-nav-bg)", backdropFilter: "blur(24px)" }}
          >
            <div className="flex items-center justify-between px-5 sm:px-6" style={{ height: 68 }}>
              <a href="#" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#2DD4BF" }}>
                  <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
                    <path d="M9 1L17 5V13L9 17L1 13V5L9 1Z" stroke="white" strokeWidth="1.5" fill="none" />
                    <path d="M9 5L13 7V11L9 13L5 11V7L9 5Z" fill="white" fillOpacity="0.9" />
                  </svg>
                </div>
                <div className="font-bold text-sm tracking-tight" style={{ color: "#F0EDE6" }}>{company.name}</div>
              </a>
              <button
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: "#F0EDE6" }}
                onClick={() => setOpen(false)}
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-start justify-center px-8 sm:px-12 gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.05 }}
                  className="text-4xl sm:text-5xl font-bold tracking-tight py-2 transition-colors display"
                  style={{ color: activeSection === l.href.replace("#","") ? "#2DD4BF" : "var(--c-55)" }}
                  onClick={e => { e.preventDefault(); setOpen(false); setTimeout(() => scrollTo(l.href), 350); }}
                >
                  {l.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
                className="mt-8 flex flex-col sm:flex-row gap-3 w-full"
              >
                <a href="#contact" className="btn-primary px-8 py-3.5 text-base text-center" onClick={() => setOpen(false)}>
                  <span>Get a Quote</span>
                </a>
                <a href={`mailto:${company.email}`} className="btn-outline-dark px-8 py-3.5 text-base text-center" onClick={() => setOpen(false)}>
                  {company.email}
                </a>
              </motion.div>
            </div>

            <div className="px-8 sm:px-12 pb-8 text-xs" style={{ color: "var(--c-20)" }}>
              {company.address} &middot; {company.certification}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
