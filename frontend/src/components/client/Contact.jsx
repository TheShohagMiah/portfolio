import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiMessageSquare,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";

/* ── contact items ── */
const contactItems = [
  {
    icon: FiMail,
    label: "Email",
    value: "your.email@example.com",
    href: "mailto:your.email@example.com",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+357 00 000 000",
    href: "tel:+35700000000",
  },
  { icon: FiMapPin, label: "Location", value: "Nicosia, Cyprus", href: "#" },
];

/* ── shared input classes ── */
const inputCls = (focused) =>
  `w-full bg-background border rounded-2xl px-5 py-3.5 text-sm text-foreground
   placeholder:text-muted-foreground/50 outline-none transition-all duration-200
   ${
     focused
       ? "border-[var(--brand)] shadow-[0_0_0_3px_var(--brand-muted)]"
       : "border-border hover:border-[var(--brand-border)]"
   }`;

/* ── Field wrapper ── */
const Field = ({ label, children }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
      {label}
    </label>
    {children}
  </div>
);

/* ── variants ── */
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const slideUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ══ Component ══ */
const Contact = () => {
  const [focused, setFocused] = useState(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1600);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      id="contact"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* ambient glows */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full blur-[110px] pointer-events-none -z-10"
        style={{ background: "var(--brand)" }}
      />
      <div
        className="absolute bottom-0 -left-20 w-[350px] h-[350px] rounded-full blur-[100px] opacity-[0.04] pointer-events-none -z-10"
        style={{ background: "var(--brand)" }}
      />

      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* ══ Header ══ */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-5">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="block h-[2px] w-10 origin-left"
                style={{ background: "var(--brand)" }}
              />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.3em]"
                style={{ color: "var(--brand)" }}
              >
                Get In Touch
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Let's start a{" "}
              <span className="text-muted-foreground italic font-serif font-normal">
                conversation.
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* ══ LEFT — Contact Form ══ */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 relative bg-card border border-border rounded-[2.5rem] p-8 md:p-12 shadow-sm overflow-hidden"
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "var(--brand-border)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
            >
              {/* top gradient line */}
              <div
                className="absolute top-0 left-0 w-full h-px opacity-50"
                style={{
                  background:
                    "linear-gradient(to right, transparent, var(--brand), transparent)",
                }}
              />
              {/* inner glow */}
              <div
                className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[80px] opacity-[0.07] pointer-events-none"
                style={{ background: "var(--brand)" }}
              />

              <form className="relative space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Your Name">
                    <input
                      type="text"
                      placeholder="John Doe"
                      className={inputCls(focused === "name")}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                    />
                  </Field>
                  <Field label="Email Address">
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className={inputCls(focused === "email")}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                    />
                  </Field>
                </div>

                <Field label="Subject">
                  <input
                    type="text"
                    placeholder="Project Inquiry"
                    className={inputCls(focused === "subject")}
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused(null)}
                  />
                </Field>

                <Field label="Message">
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project..."
                    className={`${inputCls(focused === "message")} resize-none`}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                  />
                </Field>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={sending || sent}
                  whileHover={!sent && !sending ? { scale: 1.02, y: -1 } : {}}
                  whileTap={!sent && !sending ? { scale: 0.98 } : {}}
                  className="group relative flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-sm tracking-wide shadow-brand overflow-hidden transition-opacity duration-200 disabled:cursor-not-allowed"
                  style={{
                    background: sent ? "#10b981" : "var(--brand)",
                    color: "var(--brand-foreground, #fff)",
                  }}
                >
                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.span
                        key="done"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <FiCheck size={16} /> Message Sent!
                      </motion.span>
                    ) : sending ? (
                      <motion.span
                        key="sending"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        Send Message
                        <FiSend
                          size={15}
                          className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </motion.div>

            {/* ══ RIGHT — Info ══ */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-5 lg:pl-4"
            >
              {/* intro text */}
              <motion.div variants={slideUp} className="space-y-3 mb-8">
                <h3 className="text-2xl font-bold text-foreground">
                  Contact Information
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Have a specific inquiry or just want to say hi? Fill out the
                  form or reach out via the channels below.
                </p>
              </motion.div>

              {/* contact cards */}
              {contactItems.map((item, i) => (
                <motion.a
                  key={i}
                  variants={slideUp}
                  href={item.href}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="flex items-center gap-5 p-5 rounded-2xl border bg-card transition-all duration-200 group"
                  style={{ borderColor: "var(--border)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--brand-border)";
                    e.currentTarget.style.background = "var(--brand-muted)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = "var(--card)";
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "var(--brand-muted)",
                      borderColor: "var(--brand-border)",
                      color: "var(--brand)",
                    }}
                  >
                    <item.icon size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-muted-foreground/60">
                      {item.label}
                    </p>
                    <p className="font-semibold text-sm text-foreground mt-0.5">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}

              {/* LinkedIn card */}
              <motion.div
                variants={slideUp}
                className="relative mt-4 p-7 rounded-3xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand) 0%, oklch(0.38 0.22 293) 100%)",
                }}
              >
                {/* glow blob */}
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/10 blur-[40px] pointer-events-none" />
                {/* watermark */}
                <FiMessageSquare
                  size={90}
                  className="absolute -bottom-3 -right-3 text-white opacity-[0.08]"
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                      <FiMessageSquare size={14} className="text-white" />
                    </div>
                    <h4 className="font-bold text-white">Instant Connect</h4>
                  </div>
                  <p className="text-sm text-white/65 leading-relaxed mb-5 italic">
                    "Prefer a quicker chat? I'm usually active on LinkedIn
                    during business hours."
                  </p>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="block text-center py-3 rounded-2xl font-bold text-sm transition-colors duration-200"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.25)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.15)")
                    }
                  >
                    Message on LinkedIn
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
