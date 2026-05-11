"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { company } from "@/lib/content";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", material: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section id="contact" className="section-dark py-16 md:py-24 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(93,195,155,0.08) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="tag-pill bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-white leading-tight mt-4">
              Let&apos;s engineer
              <br />
              <span className="text-white/30">your next facade.</span>
            </h2>
            <p className="mt-5 text-white/50 text-sm sm:text-base leading-relaxed max-w-md">
              Tell us about your project — material system, scale, programme, and any constraints. Our engineering team responds within one business day.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col gap-4 sm:gap-5">
              {[
                { icon: Mail,  label: "Email",       value: company.email,     href: `mailto:${company.email}`, isLink: true  },
                { icon: MapPin, label: "Factory & HQ", value: company.address,   isLink: false },
                { icon: Phone, label: "Phone",       value: company.phone,     sub: company.phoneHours, isLink: false },
              ].map(({ icon: Icon, label, value, href, sub, isLink }) => (
                <div key={label} className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">{label}</div>
                    {isLink ? (
                      <a href={href} className="text-white text-sm font-semibold hover:text-indigo-400 transition-colors">
                        {value}
                      </a>
                    ) : (
                      <div className="text-white text-sm font-semibold">{value}</div>
                    )}
                    {sub && <div className="text-white/50 text-xs mt-0.5">{sub}</div>}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust signals — 3 cols always */}
            <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-3">
              {[
                { label: "ISO 9001", sub: "Certified" },
                { label: "10-Year", sub: "Warranty" },
                { label: "24hr", sub: "Response" },
              ].map((item) => (
                <div key={item.label} className="card-dark rounded-xl p-3 sm:p-4 text-center">
                  <div className="text-base sm:text-xl font-black text-white">{item.label}</div>
                  <div className="text-xs text-white/40 mt-0.5 sm:mt-1">{item.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {submitted ? (
              <div className="card-dark rounded-2xl p-10 sm:p-12 text-center flex flex-col items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <Send size={28} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Message Received</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Thank you for reaching out. Our engineering team will review your project details and respond within one business day.
                  </p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", company: "", email: "", material: "", message: "" }); }}
                  className="btn-outline-dark px-6 py-2.5 text-sm"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-dark rounded-2xl p-5 sm:p-8 flex flex-col gap-4 sm:gap-5">

                {/* Name + Company — stacked on mobile, side-by-side on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {[
                    { key: "name", label: "Full Name", placeholder: "Ahmed Al-Mansouri", type: "text" },
                    { key: "company", label: "Company", placeholder: "Dar Al-Handasah", type: "text" },
                  ].map(({ key, label, placeholder, type }) => (
                    <div key={key}>
                      <label className="text-white/50 text-xs font-semibold uppercase tracking-wider block mb-2">
                        {label} *
                      </label>
                      <input
                        required type={type}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        placeholder={placeholder}
                        className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="text-white/50 text-xs font-semibold uppercase tracking-wider block mb-2">
                    Email Address *
                  </label>
                  <input
                    required type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ahmed@firm.com"
                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-white/50 text-xs font-semibold uppercase tracking-wider block mb-2">
                    Material System
                  </label>
                  <select
                    value={form.material}
                    onChange={(e) => setForm({ ...form, material: e.target.value })}
                    className="w-full border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    <option value="" className="bg-zinc-900">Select a material...</option>
                    <option value="gfrc" className="bg-zinc-900">GFRC – Glass Fibre Reinforced Concrete</option>
                    <option value="gfrp" className="bg-zinc-900">GFRP – Glass Fibre Reinforced Polymer</option>
                    <option value="uhpc" className="bg-zinc-900">UHPC – Ultra High Performance Concrete</option>
                    <option value="ltgrc" className="bg-zinc-900">Veloce LTGRC – Light-Transmitting GRC</option>
                    <option value="gfrg" className="bg-zinc-900">GFRG – Glass Fibre Reinforced Gypsum</option>
                    <option value="unsure" className="bg-zinc-900">Not sure – need guidance</option>
                  </select>
                </div>

                <div>
                  <label className="text-white/50 text-xs font-semibold uppercase tracking-wider block mb-2">
                    Project Details *
                  </label>
                  <textarea
                    required rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your project: location, approximate m2 required, programme, and any specific challenges..."
                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary py-4 text-sm flex items-center justify-center gap-2 w-full">
                  Send Project Enquiry <Send size={14} />
                </button>

                <p className="text-white/20 text-xs text-center">
                  We respond within 1 business day &middot; All enquiries treated in strict confidence
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
