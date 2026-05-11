"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks as links, company } from "@/lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#1e1e1e]/95 backdrop-blur-md border-b border-white/[0.07]" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between" style={{ height: 68 }}>

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <img
              src="/nxtgen-eemar-website/logo.jpg"
              alt={company.name}
              className="w-10 h-10 rounded-lg object-cover shrink-0"
            />
            <div>
              <div className="text-white font-bold text-sm sm:text-base tracking-tight leading-none">{company.name}</div>
              <div className="text-white/50 text-[10px] sm:text-xs tracking-wider leading-none mt-0.5">{company.taglineBy}</div>
            </div>
          </a>

          {/* Desktop links — hidden below md */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <a href={`mailto:${company.email}`}
              className="text-white/60 hover:text-white text-xs lg:text-sm font-medium transition-colors hidden lg:block"
            >
              {company.email}
            </a>
            <a href="#contact" className="btn-primary px-4 lg:px-5 py-2.5 text-sm">
              Get a Quote
            </a>
          </div>

          {/* Mobile / tablet hamburger */}
          <button
            className="md:hidden text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile / tablet full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#1e1e1e]/98 backdrop-blur-xl flex flex-col"
          >
            {/* Close button area matches navbar height */}
            <div className="flex items-center justify-between px-5 sm:px-6" style={{ height: 68 }}>
              <a href="#" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
                <img
                  src="/nxtgen-eemar-website/logo.jpg"
                  alt={company.name}
                  className="w-9 h-9 rounded-lg object-cover shrink-0"
                />
                <div className="text-white font-bold text-sm tracking-tight">{company.name}</div>
              </a>
              <button
                className="text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setOpen(false)}
              >
                <X size={22} />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col items-start justify-center px-8 sm:px-12 gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                  className="text-white/80 hover:text-white text-4xl sm:text-5xl font-black tracking-tight py-2 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-8 flex flex-col sm:flex-row gap-3 w-full"
              >
                <a
                  href="#contact"
                  className="btn-primary px-8 py-3.5 text-base text-center"
                  onClick={() => setOpen(false)}
                >
                  Get a Quote
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="btn-outline-dark px-8 py-3.5 text-base text-center"
                  onClick={() => setOpen(false)}
                >
                  {company.email}
                </a>
              </motion.div>
            </div>

            {/* Bottom info */}
            <div className="px-8 sm:px-12 pb-8 text-white/25 text-xs">
              Sharjah Industrial District 17, UAE &middot; ISO 9001 Certified
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
