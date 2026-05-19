"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle2, Loader2 } from "lucide-react";
import { company } from "@/lib/content";

function FloatField({
  id, label, type = "text", required = false, value, onChange, placeholder = " ",
}: {
  id: string; label: string; type?: string; required?: boolean;
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="float-input-wrap">
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="float-input"
      />
      <label htmlFor={id} className="float-label">{label}{required ? " *" : ""}</label>
      <div className="float-underline" />
    </div>
  );
}

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", material: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-dark py-16 md:py-24 lg:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(201,168,108,0.07) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="tag-pill bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-tight mt-4 display" style={{ color: "#F0EDE6" }}>
              Let&apos;s engineer
              <br />
              <span style={{ color: "rgba(240,237,230,0.25)" }}>your next facade.</span>
            </h2>
            <p className="mt-5 text-sm sm:text-base leading-relaxed max-w-md" style={{ color: "rgba(240,237,230,0.48)" }}>
              Tell us about your project — material system, scale, programme, and any constraints. Our engineering team responds within one business day.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col gap-4 sm:gap-5">
              {[
                { icon: Mail,   label: "Email",       value: company.email,   href: `mailto:${company.email}`, isLink: true  },
                { icon: MapPin, label: "Factory & HQ", value: company.address,                                  isLink: false },
                { icon: Phone,  label: "Phone",        value: company.phone,  sub: company.phoneHours,          isLink: false },
              ].map(({ icon: Icon, label, value, href, sub, isLink }) => (
                <div key={label} className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(201,168,108,0.12)" }}>
                    <Icon size={16} style={{ color: "#C9A86C" }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "rgba(240,237,230,0.35)" }}>{label}</div>
                    {isLink ? (
                      <a href={href} className="text-sm font-semibold transition-colors" style={{ color: "#F0EDE6" }}
                        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#C9A86C")}
                        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#F0EDE6")}
                      >{value}</a>
                    ) : (
                      <div className="text-sm font-semibold" style={{ color: "#F0EDE6" }}>{value}</div>
                    )}
                    {sub && <div className="text-xs mt-0.5" style={{ color: "rgba(240,237,230,0.35)" }}>{sub}</div>}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust signals */}
            <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-3">
              {[
                { label: "ISO 9001", sub: "Certified" },
                { label: "10-Year",  sub: "Warranty"  },
                { label: "24hr",     sub: "Response"  },
              ].map((item) => (
                <div key={item.label} className="card-dark rounded-xl p-3 sm:p-4 text-center">
                  <div className="mono text-base sm:text-xl font-bold" style={{ color: "#F0EDE6" }}>{item.label}</div>
                  <div className="text-xs mt-0.5 sm:mt-1" style={{ color: "rgba(240,237,230,0.35)" }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="card-dark rounded-2xl p-10 sm:p-12 text-center flex flex-col items-center gap-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(201,168,108,0.15)" }}
                  >
                    <CheckCircle2 size={30} style={{ color: "#C9A86C" }} />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 display" style={{ color: "#F0EDE6" }}>Message Received</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(240,237,230,0.48)" }}>
                      Thank you for reaching out. Our engineering team will review your project details and respond within one business day.
                    </p>
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", company: "", email: "", material: "", message: "" }); }}
                    className="btn-outline-dark px-6 py-2.5 text-sm"
                  >
                    Send Another Enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="card-dark rounded-2xl p-5 sm:p-8 flex flex-col gap-4 sm:gap-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <FloatField id="name"    label="Full Name"   required value={form.name}    onChange={v => setForm({ ...form, name: v })}    />
                    <FloatField id="company" label="Company"             value={form.company} onChange={v => setForm({ ...form, company: v })} />
                  </div>

                  <FloatField id="email" label="Email Address" type="email" required value={form.email} onChange={v => setForm({ ...form, email: v })} />

                  {/* Material select */}
                  <div className="float-input-wrap">
                    <select
                      value={form.material}
                      onChange={e => setForm({ ...form, material: e.target.value })}
                      className="float-input appearance-none"
                      style={{ paddingTop: 14, paddingBottom: 14 }}
                    >
                      <option value="" className="bg-zinc-900">Select a material...</option>
                      {[
                        ["gfrc",  "GFRC – Glass Fibre Reinforced Concrete"],
                        ["gfrp",  "GFRP – Glass Fibre Reinforced Polymer"],
                        ["uhpc",  "UHPC – Ultra High Performance Concrete"],
                        ["ltgrc", "Veloce LTGRC – Light-Transmitting GRC"],
                        ["gfrg",  "GFRG – Glass Fibre Reinforced Gypsum"],
                        ["unsure","Not sure – need guidance"],
                      ].map(([v, l]) => <option key={v} value={v} className="bg-zinc-900">{l}</option>)}
                    </select>
                    <label className="float-label" style={form.material ? { top: 10, transform: "none", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#C9A86C" } : {}}>
                      Material System
                    </label>
                  </div>

                  {/* Textarea */}
                  <div className="float-input-wrap">
                    <textarea
                      required rows={4}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder=" "
                      className="float-input resize-none"
                      style={{ paddingTop: 22 }}
                    />
                    <label htmlFor="message" className="float-label">Project Details *</label>
                    <div className="float-underline" />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary py-4 text-sm flex items-center justify-center gap-2 w-full"
                    style={{ opacity: submitting ? 0.8 : 1 }}
                  >
                    <AnimatePresence mode="wait">
                      {submitting ? (
                        <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                          <Loader2 size={15} className="animate-spin" />
                          <span>Sending…</span>
                        </motion.span>
                      ) : (
                        <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                          <span>Send Project Enquiry</span>
                          <Send size={14} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>

                  <p className="text-xs text-center" style={{ color: "rgba(240,237,230,0.22)" }}>
                    We respond within 1 business day &middot; All enquiries treated in strict confidence
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
