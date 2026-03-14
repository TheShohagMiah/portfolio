import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiMessageSquare,
  FiCheck,
  FiAlertCircle,
  FiClock,
  FiArrowUpRight,
} from "react-icons/fi";
import axiosInstance from "../../lib/axios";
import { contactSchema } from "../../validators/contactValidation";

// ═══════════════════════════════════════════════════════════════
//  STATIC CONTACT ITEMS — override from API if available
// ═══════════════════════════════════════════════════════════��═══
const FALLBACK_ITEMS = [
  {
    icon: FiMail,
    label: "Email",
    value: "shohagmiah7474@gmail.com",
    href: "mailto:shohagmiah7474@gmail.com",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+357 94 566 173",
    href: "tel:+35794566173",
  },
  { icon: FiMapPin, label: "Location", value: "Nicosia, Cyprus", href: "#" },
];

// ═══════════════════════════════════════════════════════════════
//  INPUT CLASS HELPER
// ═══════════════════════════════════════════════════════════════
const inputCls = (isFocused, hasError) =>
  [
    "w-full bg-secondary/40 border rounded-2xl px-5 py-3.5 text-sm text-foreground font-medium",
    "placeholder:text-muted-foreground/40 outline-none transition-all duration-200",
    hasError
      ? "border-red-500/60 shadow-[0_0_0_3px_rgba(239,68,68,0.08)]"
      : isFocused
        ? "border-[var(--brand)] shadow-[0_0_0_3px_var(--brand-muted)] bg-background"
        : "border-border hover:border-[var(--brand-border)]",
  ].join(" ");

// ═══════════════════════════════════════════════════════════════
//  FIELD WRAPPER
// ═══════════════════════════════════════════════════════════════
const Field = ({ label, error, children }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1 font-mono">
      {label}
    </label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p
          key="error"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5 text-red-500 text-[11px] font-bold ml-1"
        >
          <FiAlertCircle className="size-3 shrink-0" />
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

// ═══════════════════════════════════════════════════════════════
//  CONTACT CARD
// ═══════════════════════════════════════════════════════════════
const ContactCard = ({ item, index }) => (
  <motion.a
    href={item.href}
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{
      delay: index * 0.1,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    }}
    whileHover={{ x: 6 }}
    className="flex items-center gap-4 p-5 rounded-2xl border bg-card transition-all duration-200 group"
    style={{ borderColor: "var(--border)" }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "var(--brand-border)";
      e.currentTarget.style.background = "var(--brand-muted)";
      e.currentTarget.style.boxShadow = "0 4px 20px var(--brand-glow)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "var(--border)";
      e.currentTarget.style.background = "var(--card)";
      e.currentTarget.style.boxShadow = "";
    }}
  >
    {/* Icon */}
    <div
      className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-300 group-hover:scale-110"
      style={{
        background: "var(--brand-muted)",
        borderColor: "var(--brand-border)",
        color: "var(--brand)",
      }}
    >
      <item.icon size={15} />
    </div>

    {/* Text */}
    <div className="flex-1 min-w-0">
      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/50 font-mono">
        {item.label}
      </p>
      <p className="font-bold text-sm text-foreground mt-0.5 truncate group-hover:text-[var(--brand)] transition-colors duration-200">
        {item.value}
      </p>
    </div>

    <FiArrowUpRight
      size={14}
      className="text-muted-foreground/20 group-hover:text-[var(--brand)] transition-all duration-200 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    />
  </motion.a>
);

// ═══════════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════════
const Contact = () => {
  const [status, setStatus] = useState("idle");
  const [globalError, setGlobalError] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [contactInfo, setContactInfo] = useState(FALLBACK_ITEMS);

  // ── Fetch contact info from about API ────────────────────────
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await axiosInstance.get("/api/about", {
          signal: controller.signal,
        });
        if (res.data?.success) {
          const about = res.data.data;
          const items = [];
          if (about?.email)
            items.push({
              icon: FiMail,
              label: "Email",
              value: about.email,
              href: `mailto:${about.email}`,
            });
          if (about?.phone)
            items.push({
              icon: FiPhone,
              label: "Phone",
              value: about.phone,
              href: `tel:${about.phone}`,
            });
          if (about?.location)
            items.push({
              icon: FiMapPin,
              label: "Location",
              value: about.location,
              href: "#",
            });
          if (items.length) setContactInfo(items);
        }
      } catch {
        /* keep fallback */
      }
    })();
    return () => controller.abort();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  const focusProps = (name) => ({
    onFocus: () => setFocusedField(name),
    onBlur: () => setFocusedField(null),
  });

  const onSubmit = async (data) => {
    setStatus("loading");
    setGlobalError("");
    try {
      const res = await axiosInstance.post("/api/contact", data);
      if (res.data.success) {
        setStatus("success");
        reset();
        setTimeout(() => setStatus("idle"), 4500);
      }
    } catch (err) {
      const resData = err.response?.data;
      const httpStatus = err.response?.status;
      if (httpStatus === 422 && resData?.errors?.length) {
        resData.errors.forEach(({ field, message }) =>
          setError(field, { type: "server", message }),
        );
        setStatus("idle");
      } else {
        setGlobalError(
          resData?.message || "Something went wrong. Please try again.",
        );
        setStatus("error");
      }
    }
  };

  const isLoading = status === "loading";
  const isSent = status === "success";

  // ════════════════════════════════════════════════════════════
  return (
    <section
      id="contact"
      className="py-10 md:py-20 max-w-6xl mx-auto bg-background relative overflow-hidden"
    >
      {/* ── Ambient glows ──────────────────────────────────── */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.11, 0.06] }}
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
          {/* ══ Header ════════════════════════════════════════ */}
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
                className="text-[11px] font-black uppercase tracking-[0.3em] font-mono"
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
            {/* ══ LEFT — Form ═══════════════════════════════════ */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 relative bg-card border border-border rounded-3xl p-8 md:p-10 overflow-hidden"
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "var(--brand-border)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
            >
              {/* Top gradient line */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                  background:
                    "linear-gradient(to right, transparent, var(--brand), transparent)",
                }}
              />
              {/* Inner glow */}
              <div
                className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[80px] opacity-[0.07] pointer-events-none"
                style={{ background: "var(--brand)" }}
              />

              {/* ── Form header ─────────────────────────────── */}
              <div className="relative flex items-center gap-3 mb-8">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "var(--brand-muted)",
                    color: "var(--brand)",
                    border: "1px solid var(--brand-border)",
                  }}
                >
                  <FiSend size={14} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    Send a Message
                  </p>
                  <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">
                    I'll reply within 24 hours
                  </p>
                </div>
                {/* Response time badge */}
                <div className="ml-auto hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-secondary/50">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--chart-2)" }}
                  />
                  <span className="text-[9px] font-black uppercase tracking-widest font-mono text-muted-foreground/50">
                    Online
                  </span>
                </div>
              </div>

              <form
                className="relative space-y-5"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                {/* Row 1 */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Your Name" error={errors.name?.message}>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className={inputCls(
                        focusedField === "name",
                        !!errors.name,
                      )}
                      {...register("name")}
                      {...focusProps("name")}
                    />
                  </Field>
                  <Field label="Email Address" error={errors.email?.message}>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className={inputCls(
                        focusedField === "email",
                        !!errors.email,
                      )}
                      {...register("email")}
                      {...focusProps("email")}
                    />
                  </Field>
                </div>

                {/* Row 2 */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Field
                    label={
                      <>
                        Phone{" "}
                        <span className="normal-case tracking-normal opacity-40 font-normal">
                          (optional)
                        </span>
                      </>
                    }
                    error={errors.phone?.message}
                  >
                    <input
                      type="tel"
                      placeholder="+357 94 566 173"
                      className={inputCls(
                        focusedField === "phone",
                        !!errors.phone,
                      )}
                      {...register("phone")}
                      {...focusProps("phone")}
                    />
                  </Field>
                  <Field label="Subject" error={errors.subject?.message}>
                    <input
                      type="text"
                      placeholder="Project Inquiry"
                      className={inputCls(
                        focusedField === "subject",
                        !!errors.subject,
                      )}
                      {...register("subject")}
                      {...focusProps("subject")}
                    />
                  </Field>
                </div>

                {/* Message */}
                <Field label="Message" error={errors.message?.message}>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project..."
                    className={`${inputCls(focusedField === "message", !!errors.message)} resize-none`}
                    {...register("message")}
                    {...focusProps("message")}
                  />
                </Field>

                {/* Global error */}
                <AnimatePresence>
                  {status === "error" && globalError && (
                    <motion.div
                      key="global-error"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center gap-3 bg-red-500/5 border border-red-500/20 rounded-2xl px-5 py-3"
                    >
                      <FiAlertCircle className="text-red-500 shrink-0 size-4" />
                      <p className="text-sm text-red-500 font-medium">
                        {globalError}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <div className="flex items-center justify-between pt-1">
                  <p className="text-[10px] font-mono text-muted-foreground/30 uppercase tracking-widest hidden sm:block">
                    * All fields required except phone
                  </p>

                  <motion.button
                    type="submit"
                    disabled={isLoading || isSent}
                    whileHover={
                      !isSent && !isLoading ? { scale: 1.02, y: -1 } : {}
                    }
                    whileTap={!isSent && !isLoading ? { scale: 0.98 } : {}}
                    className="relative flex items-center gap-3 px-8 py-3.5 rounded-2xl font-black text-[11px] tracking-widest font-mono overflow-hidden transition-all duration-300 disabled:cursor-not-allowed uppercase"
                    style={{
                      background: isSent ? "#10b981" : "var(--brand)",
                      color: "var(--brand-foreground, #fff)",
                      boxShadow: isSent
                        ? "0 8px 24px rgba(16,185,129,0.3)"
                        : "0 8px 24px var(--brand-glow)",
                    }}
                  >
                    {/* Shimmer */}
                    {!isSent && !isLoading && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full"
                        animate={{ translateX: ["-100%", "200%"] }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      />
                    )}

                    <AnimatePresence mode="wait">
                      {isSent ? (
                        <motion.span
                          key="done"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                        >
                          <FiCheck size={15} /> Message Sent!
                        </motion.span>
                      ) : isLoading ? (
                        <motion.span
                          key="sending"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
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
                          exit={{ opacity: 0, y: -8 }}
                        >
                          Send Message
                          <FiSend
                            size={13}
                            className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                          />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* ══ RIGHT — Info ══════════════════════════════════ */}
            <div className="lg:col-span-5 space-y-4 lg:pl-2">
              {/* Intro */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Contact Information
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Have a specific inquiry or just want to say hi? Fill out the
                  form or reach out via the channels below.
                </p>
              </motion.div>

              {/* Contact cards */}
              {contactInfo.map((item, i) => (
                <ContactCard key={i} item={item} index={i} />
              ))}

              {/* Availability card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.55 }}
                className="flex items-center gap-4 p-5 rounded-2xl border bg-card"
                style={{ borderColor: "var(--border)" }}
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border"
                  style={{
                    background: "var(--brand-muted)",
                    borderColor: "var(--brand-border)",
                    color: "var(--brand)",
                  }}
                >
                  <FiClock size={15} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/50 font-mono">
                    Response Time
                  </p>
                  <p className="font-bold text-sm text-foreground mt-0.5">
                    Within 24 hours
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full"
                    style={{ background: "var(--chart-2)" }}
                  />
                  <span className="text-[9px] font-black uppercase tracking-widest font-mono text-muted-foreground/40">
                    Active
                  </span>
                </div>
              </motion.div>

              {/* LinkedIn gradient card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.55 }}
                className="relative p-7 rounded-3xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand) 0%, oklch(0.38 0.22 293) 100%)",
                }}
              >
                {/* Decoratives */}
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/10 blur-[40px] pointer-events-none" />
                <FiMessageSquare
                  size={90}
                  className="absolute -bottom-3 -right-3 text-white opacity-[0.08]"
                />
                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1px]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                      <FiMessageSquare size={14} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Instant Connect
                      </h4>
                      <p className="text-[9px] text-white/50 font-mono uppercase tracking-widest">
                        LinkedIn · Usually active
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-white/60 leading-relaxed mb-5 italic">
                    "Prefer a quicker chat? I'm usually active on LinkedIn
                    during business hours."
                  </p>

                  <motion.a
                    href="https://www.linkedin.com/in/shohag-miah-a484a93b2/"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest font-mono transition-all duration-200"
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
                    <FiArrowUpRight size={13} />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
