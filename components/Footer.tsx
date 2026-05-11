"use client";
import { motion } from "framer-motion";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Innovations", href: "#innovations" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const materials = ["GFRC", "GFRP", "UHPC", "Veloce LTGRC", "GFRG"];
const innovations = ["IoT Smart Panels", "3D Parametric", "Bio-Hybrid Cladding", "Nano-Reinforced GFRC"];

export default function Footer() {
  return (
    <footer className="section-dark border-t border-white/[0.06]">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center pulse-glow" style={{ background: "#6366f1" }}>
                <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1L17 5V13L9 17L1 13V5L9 1Z" stroke="white" strokeWidth="1.5" fill="none" />
                  <path d="M9 5L13 7V11L9 13L5 11V7L9 5Z" fill="white" fillOpacity="0.9" />
                </svg>
              </div>
              <div>
                <div className="text-white font-black text-base tracking-tight leading-none">NXTGEN</div>
                <div className="text-white/40 text-xs mt-0.5">by Eemar Al Madina</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Engineering living facades for the Middle East. Precision-manufactured architectural cladding systems from our Sharjah factory.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:kareem@cladwise.ae"
                className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
              >
                <Mail size={14} className="text-indigo-400" />
                kareem@cladwise.ae
              </a>
              <div className="flex items-start gap-2 text-sm text-white/50">
                <MapPin size={14} className="text-indigo-400 mt-0.5 shrink-0" />
                Sharjah Industrial District 17, UAE
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-white/30 text-xs font-bold uppercase tracking-widest mb-5">Navigation</div>
            <ul className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/50 hover:text-white text-sm transition-colors font-medium">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Materials */}
          <div>
            <div className="text-white/30 text-xs font-bold uppercase tracking-widest mb-5">Materials</div>
            <ul className="flex flex-col gap-3">
              {materials.map((m) => (
                <li key={m}>
                  <a href="#services" className="text-white/50 hover:text-white text-sm transition-colors font-medium">
                    {m}
                  </a>
                </li>
              ))}
            </ul>
            <div className="text-white/30 text-xs font-bold uppercase tracking-widest mb-5 mt-8">Innovations</div>
            <ul className="flex flex-col gap-3">
              {innovations.map((inn) => (
                <li key={inn}>
                  <a href="#innovations" className="text-white/50 hover:text-white text-sm transition-colors font-medium">
                    {inn}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA box */}
          <div>
            <div className="rounded-2xl p-6 flex flex-col gap-4" style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)" }}>
              <div className="text-xl font-black text-white leading-tight">
                Ready to specify your facade?
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Our engineering team responds to all enquiries within one business day.
              </p>
              <a
                href="#contact"
                className="btn-primary py-3 text-sm flex items-center justify-center gap-2"
              >
                Start a Project <ArrowUpRight size={15} />
              </a>
              <a
                href="mailto:kareem@cladwise.ae"
                className="btn-outline-dark py-3 text-sm flex items-center justify-center gap-2"
              >
                Email Directly <Mail size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white/20 text-xs">
            © 2025 Eemar Al Madina LLC. All rights reserved. · Sharjah, UAE
          </div>
          <div className="flex items-center gap-6 text-white/20 text-xs">
            <a href="#" className="hover:text-white/50 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/50 transition-colors">Terms of Service</a>
            <span className="text-white/10">·</span>
            <span>ISO 9001 Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
