"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Mohammed Al Rashidi",
    role: "Lead Architect",
    company: "Dar Al-Handasah, Dubai",
    text: "NXTGEN delivered 4,200 GFRC panels for a 52-storey tower in under 14 weeks. Texture and color consistency across every single unit was extraordinary. No other regional manufacturer comes close.",
    rating: 5,
    initials: "MR",
    color: "#6366f1",
  },
  {
    name: "Sarah Thompson",
    role: "Project Director",
    company: "Arup, Abu Dhabi",
    text: "Their engineering support during the specification phase was invaluable. The thermal calculations and connection details were submitted before we even asked - and they passed our third-party review without a single comment.",
    rating: 5,
    initials: "ST",
    color: "#8b5cf6",
  },
  {
    name: "Khalid Al-Dosari",
    role: "Deputy CEO",
    company: "Gulf Contracting Co., Doha",
    text: "We have used NXTGEN on seven projects. They have never missed a delivery milestone. Their factory tracking system means our procurement team always knows exactly where each batch is in the production queue.",
    rating: 5,
    initials: "KD",
    color: "#06b6d4",
  },
  {
    name: "Priya Mehta",
    role: "Interior Design Lead",
    company: "Woods Bagot, Riyadh",
    text: "The GFRG column casings for our hospitality project were manufactured to 0.5mm tolerance. Our installation crew said it was the cleanest fit-out they had ever worked with. NXTGEN is our go-to for anything ornamental.",
    rating: 5,
    initials: "PM",
    color: "#10b981",
  },
  {
    name: "Faisal Al-Muhairi",
    role: "Head of Construction",
    company: "Emaar Properties, Dubai",
    text: "The IoT smart panel system on our flagship retail development gives us real-time facade health data we had never had before. One alert already saved us from what would have been an expensive remediation job.",
    rating: 5,
    initials: "FM",
    color: "#f59e0b",
  },
  {
    name: "Yuki Tanaka",
    role: "Associate Principal",
    company: "AECOM, Dubai",
    text: "We brought NXTGEN in on a parametric screen project that 3 other manufacturers had already declined as too complex. They solved it in 2 weeks, produced the moulds, and delivered on schedule. Genuinely impressive capability.",
    rating: 5,
    initials: "YT",
    color: "#ec4899",
  },
];

export default function Testimonials() {
  return (
    <section className="section-light py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <span className="tag-pill bg-indigo-50 text-indigo-600 border border-indigo-100 mb-4">
              Client Testimonials
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 max-w-2xl leading-tight mt-4">
              What our clients say.
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <div className="text-5xl font-black text-zinc-900">4.9</div>
              <div className="text-zinc-400 text-sm mt-1">Average rating</div>
            </div>
            <div className="w-px h-12 bg-zinc-200" />
            <div>
              <div className="text-5xl font-black text-zinc-900">120+</div>
              <div className="text-zinc-400 text-sm mt-1">Verified reviews</div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              className="card-light rounded-2xl p-7 flex flex-col gap-5"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} fill="#f59e0b" className="text-amber-400" />
                ))}
              </div>
              <p className="text-zinc-700 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-2 border-t border-zinc-100">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-zinc-900">{t.name}</div>
                  <div className="text-xs text-zinc-400">{t.role} &middot; {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
