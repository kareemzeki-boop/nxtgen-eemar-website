"use client";
import { motion } from "framer-motion";
import { Mail, MapPin, ArrowUpRight, Shield, Clock, Award } from "lucide-react";
import { company, footerNavLinks as navLinks, footerMaterials as materials, footerInnovations as innovations } from "@/lib/content";

const CERT_BADGES = [
  { icon: Award,  label: "ISO 9001",    sub: "Quality Certified"   },
  { icon: Shield, label: "10-Year",     sub: "Product Warranty"    },
  { icon: Clock,  label: "24hr",        sub: "Response Guaranteed" },
];

export default function Footer() {
  return (
    <footer className="section-dark" style={{ borderTop: "none" }}>
      {/* Animated gradient top line */}
      <div className="footer-gradient-line" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-14 sm:py-16 md:py-20">

        {/* Cert badges row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-3 mb-12 sm:mb-14"
        >
          {CERT_BADGES.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="cert-badge">
              <span className="cert-dot" />
              <Icon size={11} />
              <span>{label} · {sub}</span>
            </div>
          ))}
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center pulse-glow shrink-0" style={{ background: "#C9A86C" }}>
                <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1L17 5V13L9 17L1 13V5L9 1Z" stroke="white" strokeWidth="1.5" fill="none" />
                  <path d="M9 5L13 7V11L9 13L5 11V7L9 5Z" fill="white" fillOpacity="0.9" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-base tracking-tight leading-none" style={{ color: "var(--c-text)" }}>{company.name}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--c-35)" }}>{company.taglineBy}</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-xs" style={{ color: "var(--c-38)" }}>
              Engineering living facades for the Middle East. Precision-manufactured architectural cladding from our Sharjah factory.
            </p>
            <div className="flex flex-col gap-2.5">
              <a href={`mailto:${company.email}`}
                className="flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ color: "var(--c-45)" }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#C9A86C")}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--c-45)")}
              >
                <Mail size={13} style={{ color: "#C9A86C" }} className="shrink-0" />
                {company.email}
              </a>
              <div className="flex items-start gap-2 text-sm" style={{ color: "var(--c-45)" }}>
                <MapPin size={13} style={{ color: "#C9A86C" }} className="mt-0.5 shrink-0" />
                {company.address}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--c-25)" }}>Navigation</div>
            <ul className="flex flex-col gap-2.5 sm:gap-3">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <a
                    href={l.href}
                    className="text-sm font-medium transition-colors"
                    style={{ color: "var(--c-45)" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#C9A86C")}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--c-45)")}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Materials + Innovations */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--c-25)" }}>Materials</div>
            <ul className="flex flex-col gap-2.5 sm:gap-3 mb-7">
              {materials.map((m, i) => (
                <motion.li
                  key={m}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <a
                    href="#services"
                    className="mono text-sm font-medium transition-colors"
                    style={{ color: "var(--c-45)" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#C9A86C")}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--c-45)")}
                  >
                    {m}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--c-25)" }}>Innovations</div>
            <ul className="flex flex-col gap-2.5 sm:gap-3">
              {innovations.map((inn, i) => (
                <motion.li
                  key={inn}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 + 0.2, duration: 0.4 }}
                >
                  <a
                    href="#innovations"
                    className="text-sm font-medium transition-colors"
                    style={{ color: "var(--c-45)" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--c-text)")}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--c-45)")}
                  >
                    {inn}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CTA box */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div
              className="rounded-2xl p-5 sm:p-6 flex flex-col gap-4"
              style={{ background: "rgba(201,168,108,0.08)", border: "1px solid rgba(201,168,108,0.18)" }}
            >
              <div className="text-lg sm:text-xl font-bold leading-tight display" style={{ color: "var(--c-text)" }}>
                Ready to specify your facade?
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--c-45)" }}>
                Our engineering team responds to all enquiries within one business day.
              </p>
              <a href="#contact" className="btn-primary py-3 text-sm flex items-center justify-center gap-2">
                <span>Start a Project</span>
                <ArrowUpRight size={14} />
              </a>
              <a href={`mailto:${company.email}`} className="btn-outline-dark py-3 text-sm flex items-center justify-center gap-2">
                {company.email} <Mail size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid var(--c-border-sm)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="text-xs text-center sm:text-left" style={{ color: "var(--c-20)" }}>
            {company.copyright}
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6 text-xs" style={{ color: "var(--c-20)" }}>
            <a href="#" onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--c-55)")} onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--c-20)")} className="transition-colors">Privacy Policy</a>
            <a href="#" onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--c-55)")} onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--c-20)")} className="transition-colors">Terms of Service</a>
            <span className="hidden sm:inline" style={{ color: "var(--c-20)" }}>·</span>
            <span>ISO 9001 Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
