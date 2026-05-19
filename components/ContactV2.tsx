"use client";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Shield,
  Clock,
  Award,
  Loader2,
} from "lucide-react";
import KineticText from "./KineticText";
import MagneticEl from "./MagneticEl";
import { hero, company } from "@/lib/content";

const TRUST_BADGES = [
  { icon: Award,  label: "ISO 9001 Certified",  color: "#C9A86C" },
  { icon: Shield, label: "10-Year Warranty",     color: "#5DC39B" },
  { icon: Clock,  label: "24hr Response",        color: "#8b5cf6" },
];

const MATERIAL_OPTIONS = [
  { value: "",      label: "Select a material system..." },
  { value: "gfrc",  label: "GFRC – Glass Fibre Reinforced Concrete" },
  { value: "gfrp",  label: "GFRP – Glass Fibre Reinforced Polymer" },
  { value: "uhpc",  label: "UHPC – Ultra High Performance Concrete" },
  { value: "ltgrc", label: "Veloce LTGRC – Light-Transmitting GRC" },
  { value: "gfrg",  label: "GFRG – Glass Fibre Reinforced Gypsum" },
];

function FloatField({
  id,
  label,
  type = "text",
  required = false,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="float-input-wrap">
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="float-input"
      />
      <label htmlFor={id} className="float-label">
        {label}
        {required ? " *" : ""}
      </label>
      <div className="float-underline" />
    </div>
  );
}

export default function ContactV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    material: "",
    message: "",
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: -9999, y: -9999 });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({ name: "", company: "", email: "", material: "", message: "" });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--c-bg)",
        paddingTop: "clamp(64px, 8vw, 112px)",
        paddingBottom: "clamp(64px, 8vw, 112px)",
      }}
    >
      {/* Background image with blur */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <img
          src={hero.backgroundImage}
          alt=""
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(60px)",
            transform: "scale(1.15)",
            opacity: 0.15,
          }}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10,10,9,0.88)",
          }}
        />
      </div>

      {/* Mouse-tracking glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: `radial-gradient(500px at ${mousePos.x}px ${mousePos.y}px, rgba(201,168,108,0.07), transparent 70%)`,
          transition: "background 0.05s linear",
        }}
      />

      {/* Subtle radial ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(201,168,108,0.05) 0%, transparent 70%)",
        }}
      />

      <div
        className="max-w-7xl mx-auto px-5 sm:px-6"
        style={{ position: "relative", zIndex: 2 }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}
        >
          <span
            className="tag-pill inline-flex mb-5"
            style={{
              background: "rgba(201,168,108,0.10)",
              color: "#C9A86C",
              border: "1px solid rgba(201,168,108,0.22)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Get In Touch
          </span>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(36px, 5.5vw, 72px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--c-text)",
              marginTop: 12,
            }}
          >
            <KineticText
              text="Let's build something iconic."
              as="h2"
              delay={0.05}
              stagger={0.016}
            />
          </div>
        </motion.div>

        {/* Two-column layout */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
        >
          {/* LEFT: Company info + trust badges */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p
              className="text-sm sm:text-base leading-relaxed mb-10"
              style={{ color: "var(--c-45)", maxWidth: 420 }}
            >
              Tell us about your project — material system, scale, programme,
              and constraints. Our engineering team responds within one business
              day.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-5 mb-10">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: company.email,
                  href: `mailto:${company.email}`,
                  isLink: true,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: company.phone,
                  sub: company.phoneHours,
                  isLink: false,
                },
                {
                  icon: MapPin,
                  label: "Factory & HQ",
                  value: company.address,
                  isLink: false,
                },
              ].map(({ icon: Icon, label, value, href, sub, isLink }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className="shrink-0 flex items-center justify-center rounded-xl"
                    style={{
                      width: 42,
                      height: 42,
                      background: "rgba(201,168,108,0.10)",
                      border: "1px solid rgba(201,168,108,0.16)",
                    }}
                  >
                    <Icon size={16} style={{ color: "#C9A86C" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs font-bold uppercase tracking-wider mb-1"
                      style={{ color: "var(--c-35)" }}
                    >
                      {label}
                    </div>
                    {isLink ? (
                      <a
                        href={href}
                        className="text-sm font-semibold transition-colors"
                        style={{ color: "var(--c-text)" }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLAnchorElement).style.color =
                            "#C9A86C")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLAnchorElement).style.color =
                            "var(--c-text)")
                        }
                      >
                        {value}
                      </a>
                    ) : (
                      <div
                        className="text-sm font-semibold"
                        style={{ color: "var(--c-text)" }}
                      >
                        {value}
                      </div>
                    )}
                    {sub && (
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "var(--c-35)" }}
                      >
                        {sub}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {TRUST_BADGES.map(({ icon: Icon, label, color }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl p-4 text-center"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <Icon size={18} style={{ color }} />
                  <div
                    className="text-xs font-bold leading-tight"
                    style={{ color: "var(--c-55)" }}
                  >
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Address small */}
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--c-28)" }}
            >
              {company.address}
              <br />
              {company.certification}
            </p>
          </motion.div>

          {/* RIGHT: Glass contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                /* Success state */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center text-center gap-6"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(28px)",
                    WebkitBackdropFilter: "blur(28px)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 24,
                    padding: "clamp(40px, 6vw, 64px)",
                    minHeight: 480,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 14,
                      delay: 0.15,
                    }}
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: "rgba(201,168,108,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckCircle2 size={34} style={{ color: "#C9A86C" }} />
                  </motion.div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: 32,
                        fontWeight: 700,
                        color: "var(--c-text)",
                        marginBottom: 12,
                      }}
                    >
                      Thank you.
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--c-45)", maxWidth: 340 }}
                    >
                      Your enquiry has been received. Our engineering team will
                      review your project details and respond within one
                      business day.
                    </p>
                  </div>
                  <button
                    onClick={resetForm}
                    className="btn-outline-dark px-6 py-2.5 text-sm"
                  >
                    Send Another Enquiry
                  </button>
                </motion.div>
              ) : (
                /* Contact form */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(28px)",
                    WebkitBackdropFilter: "blur(28px)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 24,
                    padding: "clamp(28px, 4vw, 48px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                  }}
                >
                  {/* Name + Company row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <FloatField
                      id="v2-name"
                      label="Full Name"
                      required
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                    />
                    <FloatField
                      id="v2-company"
                      label="Company"
                      value={form.company}
                      onChange={(v) => setForm({ ...form, company: v })}
                    />
                  </div>

                  {/* Email */}
                  <FloatField
                    id="v2-email"
                    label="Email Address"
                    type="email"
                    required
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                  />

                  {/* Material select */}
                  <div className="float-input-wrap">
                    <select
                      value={form.material}
                      onChange={(e) =>
                        setForm({ ...form, material: e.target.value })
                      }
                      className="float-input appearance-none"
                      style={{ paddingTop: 14, paddingBottom: 14 }}
                    >
                      {MATERIAL_OPTIONS.map(({ value, label }) => (
                        <option
                          key={value}
                          value={value}
                          className="bg-zinc-900"
                        >
                          {label}
                        </option>
                      ))}
                    </select>
                    <label
                      className="float-label"
                      style={
                        form.material
                          ? {
                              top: 10,
                              transform: "none",
                              fontSize: 10,
                              fontWeight: 700,
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              color: "#C9A86C",
                            }
                          : {}
                      }
                    >
                      Material System
                    </label>
                    <div className="float-underline" />
                  </div>

                  {/* Project description textarea */}
                  <div className="float-input-wrap">
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder=" "
                      className="float-input resize-none"
                      style={{ paddingTop: 22 }}
                    />
                    <label htmlFor="v2-message" className="float-label">
                      Project Description *
                    </label>
                    <div className="float-underline" />
                  </div>

                  {/* Submit button with MagneticEl */}
                  <MagneticEl strength={0.25}>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary py-4 text-sm flex items-center justify-center gap-2 w-full"
                      style={{ opacity: submitting ? 0.8 : 1 }}
                    >
                      <AnimatePresence mode="wait">
                        {submitting ? (
                          <motion.span
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <Loader2 size={15} className="animate-spin" />
                            <span>Sending…</span>
                          </motion.span>
                        ) : (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <span>Send Enquiry</span>
                            <ArrowRight size={15} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </MagneticEl>

                  <p
                    className="text-xs text-center"
                    style={{ color: "var(--c-22)" }}
                  >
                    We respond within 1 business day &middot; All enquiries
                    treated in strict confidence
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
