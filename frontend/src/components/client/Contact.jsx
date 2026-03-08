import React, { useState } from "react";
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
} from "react-icons/fi";
import axiosInstance from "../../lib/axios";
import { contactSchema } from "../../validators/contactValidation";

/* ── contact items ────────────────────────────────────────────── */
const contactItems = [
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
  {
    icon: FiMapPin,
    label: "Location",
    value: "Nicosia, Cyprus",
    href: "#",
  },
];

/* ── input classes ────────────────────────────────────────────── */
const inputCls = (isFocused, hasError) =>
  [
    "w-full bg-background border rounded-2xl px-5 py-3.5 text-sm text-foreground",
    "placeholder:text-muted-foreground/50 outline-none transition-all duration-200",
    hasError
      ? "border-red-500/60 shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
      : isFocused
        ? "border-[var(--brand)] shadow-[0_0_0_3px_var(--brand-muted)]"
        : "border-border hover:border-[var(--brand-border)]",
  ].join(" ");

/* ── Field wrapper ────────────────────────────────────────────── */
const Field = ({ label, error, children }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
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
          className="flex items-center gap-1.5 text-red-500 text-[11px] font-medium ml-1"
        >
          <FiAlertCircle className="size-3 shrink-0" />
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

/* ── animation variants ───────────────────────────────────────── */
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

/* ══ Contact Component ══════════════════════════════════════════ */
const Contact = () => {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [globalError, setGlobalError] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  /* ── focus helpers ────────────────────────────────────────────── */
  const focusProps = (name) => ({
    onFocus: () => setFocusedField(name),
    onBlur: () => setFocusedField(null),
  });

  /* ── submit ───────────────────────────────────────────────────── */
  const onSubmit = async (data) => {
    setStatus("loading");
    setGlobalError("");

    try {
      const res = await axiosInstance.post("/api/contact", data);

      if (res.data.success) {
        setStatus("success");
        reset();
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (err) {
      const resData = err.response?.data;
      const httpStatus = err.response?.status;

      if (httpStatus === 422 && resData?.errors?.length) {
        // Map server Zod errors back into RHF fields
        resData.errors.forEach(({ field, message }) => {
          setError(field, { type: "server", message });
        });
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

  return (
    <section
      id="contact"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* ── Ambient Glows ─────────────────────────────────────── */}
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
          {/* ══ Header ══════════════════════════════════════════ */}
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
            {/* ══ LEFT — Form ═════════════════════════════════ */}
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

              <form
                className="relative space-y-6"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                {/* ── Row 1: Name + Email ── */}
                <div className="grid md:grid-cols-2 gap-5">
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

                {/* ── Row 2: Phone + Subject ── */}
                <div className="grid md:grid-cols-2 gap-5">
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

                {/* ── Message ── */}
                <Field label="Message" error={errors.message?.message}>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project..."
                    className={`${inputCls(focusedField === "message", !!errors.message)} resize-none`}
                    {...register("message")}
                    {...focusProps("message")}
                  />
                </Field>

                {/* ── Global Error Banner ── */}
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
                      <p className="text-sm text-red-500">{globalError}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Submit Button ── */}
                <motion.button
                  type="submit"
                  disabled={isLoading || isSent}
                  whileHover={
                    !isSent && !isLoading ? { scale: 1.02, y: -1 } : {}
                  }
                  whileTap={!isSent && !isLoading ? { scale: 0.98 } : {}}
                  className="group relative flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-sm tracking-wide overflow-hidden transition-all duration-300 disabled:cursor-not-allowed"
                  style={{
                    background: isSent ? "#10b981" : "var(--brand)",
                    color: "var(--brand-foreground, #fff)",
                    boxShadow: isSent
                      ? "0 8px 24px rgba(16,185,129,0.3)"
                      : "0 8px 24px var(--brand-glow)",
                  }}
                >
                  <AnimatePresence mode="wait">
                    {isSent ? (
                      <motion.span
                        key="done"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        <FiCheck size={16} />
                        Message Sent!
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
                          size={15}
                          className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </motion.div>

            {/* ══ RIGHT — Info ════════════════════════════════ */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-5 lg:pl-4"
            >
              {/* intro */}
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
                    <p className="font-semibold text-sm text-foreground mt-0.5 group-hover:text-[var(--brand)] transition-colors">
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
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/10 blur-[40px] pointer-events-none" />
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
                    href="https://www.linkedin.com/in/shohag-miah-a484a93b2/"
                    target="_blank"
                    rel="noreferrer"
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
