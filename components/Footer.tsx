"use client";
import { motion } from "framer-motion";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { company, footerNavLinks as navLinks, footerMaterials as materials, footerInnovations as innovations } from "@/lib/content";

// All footer data lives in lib/content.ts — edit there.

export default function Footer() {
  return (
    <footer className="section-dark border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-14 sm:py-16 md:py-20">

        {/* Grid: 1-col mobile → 2-col sm → 4-col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">

          {/* Brand — full width on mobile, spans left col on sm */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center pulse-glow" style={{ background: "#5DC39B" }}>
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
            <p className="text-white/40 text-sm leading-relaxed mb-5 max-w-xs">
              Engineering living facades for the Middle East. Precision-manufactured architectural cladding from our Sharjah factory.
            </p>
            <div className="flex flex-col gap-2.5">
              <a href={`mailto:${company.email}`}
                className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
              >
                <Mail size={13} className="text-indigo-400 shrink-0" />
                {company.email}
              </a>
              <div className="flex items-start gap-2 text-sm text-white/50">
                <MapPin size={13} className="text-indigo-400 mt-0.5 shrink-0" />
                {company.address}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-white/30 text-xs font-bold uppercase tracking-widest mb-4">Navigation</div>
            <ul className="flex flex-col gap-2.5 sm:gap-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/50 hover:text-white text-sm transition-colors font-medium">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Materials + Innovations */}
          <div>
            <div className="text-white/30 text-xs font-bold uppercase tracking-widest mb-4">Materials</div>
            <ul className="flex flex-col gap-2.5 sm:gap-3 mb-7">
              {materials.map((m) => (
                <li key={m}>
                  <a href="#services" className="text-white/50 hover:text-white text-sm transition-colors font-medium">
                    {m}
                  </a>
                </li>
              ))}
            </ul>
            <div className="text-white/30 text-xs font-bold uppercase tracking-widest mb-4">Innovations</div>
            <ul className="flex flex-col gap-2.5 sm:gap-3">
              {innovations.map((inn) => (
                <li key={inn}>
                  <a href="#innovations" className="text-white/50 hover:text-white text-sm transition-colors font-medium">
                    {inn}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA box — spans right col on sm, own col on lg */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="rounded-2xl p-5 sm:p-6 flex flex-col gap-4"
              style={{ background: "rgba(93,195,155,0.10)", border: "1px solid rgba(93,195,155,0.22)" }}
            >
              <div className="text-lg sm:text-xl font-black text-white leading-tight">
                Ready to specify your facade?
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Our engineering team responds to all enquiries within one business day.
              </p>
              <a href="#contact" className="btn-primary py-3 text-sm flex items-center justify-center gap-2">
                Start a Project <ArrowUpRight size={14} />
              </a>
              <a href={`mailto:${company.email}`} className="btn-outline-dark py-3 text-sm flex items-center justify-center gap-2">
                {company.email} <Mail size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="text-white/20 text-xs text-center sm:text-left">
            {company.copyright}
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6 text-white/20 text-xs">
            <a href="#" className="hover:text-white/50 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/50 transition-colors">Terms of Service</a>
            <span className="hidden sm:inline text-white/10">·</span>
            <span>ISO 9001 Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
