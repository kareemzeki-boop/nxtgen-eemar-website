"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    material: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-dark py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(99,102,241,0.1) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
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
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight mt-4">
              Let&apos;s engineer
              <br />
              <span className="text-white/30">your next facade.</span>
            </h2>
            <p className="mt-6 text-white/50 text-base leading-relaxed max-w-md">
              Tell us about your project â€” material system, scale, programme, and any constraints. Our engineering team will respond within one business day with a preliminary assessment.
            </p>

            <div className="mt-10 flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-indigo-400" />
                </div>
                <div>
                  <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">Email</div>
                  <a href="mailto:kareem@cladwise.ae" className="text-white font-semibold hover:text-indigo-400 transition-colors">
                    kareem@cladwise.ae
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-indigo-400" />
                </div>
                <div>
                  <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">Factory & HQ</div>
                  <div className="text-white font-semibold">Sharjah Industrial District 17</div>
                  <div className="text-white/50 text-sm mt-0.5">United Arab Emirates</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-indigo-400" />
                </div>
                <div>
                  <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">Phone</div>
                  <div className="text-white font-semibold">+971 6 XXX XXXX</div>
                  <div className="text-white/50 text-sm mt-0.5">Sunâ€“Thu, 8amâ€“6pm GST</div>
                </div>
              </div>
            </div>

            {/* Trust signals */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              {[
                { label: "ISO 9001", sub: "Certified" },
                { label: "10-Year", sub: "Warranty" },
                { label: "24hr", sub: "Response" },
              ].map((item) => (
                <div key={item.label} className="card-dark rounded-xl p-4 text-center">
                  <div className="text-xl font-black text-white">{item.label}</div>
                  <div className="text-xs text-white/40 mt-1">{item.sub}</div>
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
              <div className="card-dark rounded-2xl p-12 text-center flex flex-col items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <Send size={28} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Message Received</h3>
                  <p className="text-white/50 leading-relaxed">
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
              <form onSubmit={handleSubmit} className="card-dark rounded-2xl p-8 flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-white/50 text-xs font-semibold uppercase tracking-wider block mb-2">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ahmed Al-Mansouri"
                      className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs font-semibold uppercase tracking-wider block mb-2">
                      Company *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Dar Al-Handasah"
                      className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/50 text-xs font-semibold uppercase tracking-wider block mb-2">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
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
                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    <option value="" className="bg-zinc-900">Select a material...</option>
                    <option value="gfrc" className="bg-zinc-900">GFRC â€“ Glass Fibre Reinforced Concrete</option>
                    <option value="gfrp" className="bg-zinc-900">GFRP â€“ Glass Fibre Reinforced Polymer</option>
                    <option value="uhpc" className="bg-zinc-900">UHPC â€“ Ultra High Performance Concrete</option>
                    <option value="ltgrc" className="bg-zinc-900">Veloce LTGRC â€“ Light-Transmitting GRC</option>
                    <option value="gfrg" className="bg-zinc-900">GFRG â€“ Glass Fibre Reinforced Gypsum</option>
                    <option value="unsure" className="bg-zinc-900">Not sure â€“ need guidance</option>
                  </select>
                </div>

                <div>
                  <label className="text-white/50 text-xs font-semibold uppercase tracking-wider block mb-2">
                    Project Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your project: location, approximate mÂ² required, programme, and any specific challenges or constraints..."
                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary py-4 text-sm flex items-center justify-center gap-2 w-full"
                >
                  Send Project Enquiry <Send size={15} />
                </button>

                <p className="text-white/20 text-xs text-center">
                  We respond within 1 business day Â· All enquiries are treated in strict confidence
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

