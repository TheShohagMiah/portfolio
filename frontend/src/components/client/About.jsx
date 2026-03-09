import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiAward,
  FiBookOpen,
  FiUser,
  FiZap,
  FiMapPin,
  FiClock,
  FiBriefcase,
  FiCode,
} from "react-icons/fi";
import axiosInstance from "../../lib/axios";

// ═══════════════════════════════════════════════════════════════
//  ICON MAP
// ═══════════════════════════════════════════════════════════════
const ICON_MAP = {
  FiBookOpen,
  FiAward,
  FiMapPin,
  FiClock,
  FiBriefcase,
  FiZap,
  FiUser,
};

// ═══════════════════════════════════════════════════════════════
//  VARIANTS
// ═══════════════════════════════════════════════════════════════
const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.22 } },
};
const timelineItem = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// ═══════════════════════════════════════════════════════════════
//  SKELETON
// ═══════════════════════════════════════════════════════════════
const AboutSkeleton = () => (
  <section className="py-28 bg-background overflow-hidden relative">
    <div className="container mx-auto px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 space-y-4">
          <div className="w-32 h-3 bg-muted rounded-full animate-pulse" />
          <div className="w-80 h-10 bg-muted rounded-2xl animate-pulse" />
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left */}
          <div className="lg:col-span-7 space-y-8">
            <div className="w-28 h-8 bg-muted rounded-full animate-pulse" />
            <div className="space-y-3 w-full max-w-md">
              <div className="h-8 bg-muted rounded-xl animate-pulse w-3/4" />
              <div className="h-8 bg-muted rounded-xl animate-pulse w-5/6" />
            </div>
            <div className="space-y-3">
              {[1, 0.9, 0.7].map((w, i) => (
                <div
                  key={i}
                  className="h-4 bg-muted rounded-full animate-pulse"
                  style={{ width: `${w * 100}%` }}
                />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-28 rounded-2xl bg-muted animate-pulse"
                />
              ))}
            </div>
          </div>
          {/* Right */}
          <div className="lg:col-span-5 space-y-8">
            <div className="w-44 h-8 bg-muted rounded-full animate-pulse" />
            <div className="pl-8 space-y-10">
              {[0, 1].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="w-28 h-3 bg-muted rounded-full animate-pulse" />
                  <div className="w-48 h-6 bg-muted rounded-xl animate-pulse" />
                  <div className="w-full h-20 bg-muted rounded-2xl animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ═══════════════════════════════════════════════════════════════
//  STAT CARD
// ═══════════════════════════════════════════════════════════════
const StatCard = ({ label, value, unit, icon: Icon }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="group relative flex flex-col gap-3 p-5 rounded-2xl border transition-all duration-300 cursor-default overflow-hidden"
    style={{ background: "var(--card)", borderColor: "var(--border)" }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "var(--brand-border)";
      e.currentTarget.style.background = "var(--brand-muted)";
      e.currentTarget.style.boxShadow = "0 8px 24px var(--brand-glow)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "var(--border)";
      e.currentTarget.style.background = "var(--card)";
      e.currentTarget.style.boxShadow = "";
    }}
  >
    {/* Top accent */}
    <div
      className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{
        background:
          "linear-gradient(90deg, transparent, var(--brand), transparent)",
      }}
    />

    <div
      className="w-8 h-8 rounded-xl flex items-center justify-center"
      style={{ background: "var(--brand-muted)", color: "var(--brand)" }}
    >
      <Icon size={14} />
    </div>

    <div>
      <p className="text-xl font-black capitalize text-foreground tracking-tight leading-none">
        {value}
      </p>
      {unit && (
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">
          {unit}
        </p>
      )}
    </div>

    <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground/50 font-black font-mono">
      {label}
    </p>
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════════
const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/api/about", {
          signal: controller.signal,
        });
        if (res.data?.success) setAboutData(res.data.data);
      } catch (err) {
        if (!axiosInstance.isCancel?.(err))
          console.error("Failed to load about data");
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  if (loading) return <AboutSkeleton />;
  if (!aboutData) return null;

  const { bio, experienceYears, location, freelanceStatus, education } =
    aboutData;

  const STATS = [
    {
      label: "Experience",
      value: `${experienceYears}+`,
      unit: "Years",
      icon: FiClock,
    },
    { label: "Location", value: location, unit: "", icon: FiMapPin },
    { label: "Freelance", value: freelanceStatus, unit: "", icon: FiBriefcase },
  ];

  // ════════════════════════════════════════════════════════════
  return (
    <section
      id="about"
      className="py-28 bg-background overflow-hidden relative"
    >
      {/* ── Ambient glows ──────────────────────────────────── */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full blur-[120px] opacity-[0.06] pointer-events-none"
        style={{ background: "var(--brand)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full blur-[100px] opacity-[0.04] pointer-events-none"
        style={{ background: "var(--brand)" }}
      />

      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* ══ Header ════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-5">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="block h-[2px] w-10 origin-left"
                style={{ background: "var(--brand)" }}
              />
              <span
                className="text-[11px] font-black uppercase tracking-[0.3em] font-mono"
                style={{ color: "var(--brand)" }}
              >
                Background
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Design. Code.{" "}
              <span className="text-muted-foreground italic font-serif font-normal">
                Iterate.
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-16">
            {/* ══ LEFT ══════════════════════════════════════════ */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-7 space-y-10"
            >
              {/* My Story badge */}
              <motion.div
                whileHover={{ scale: 1.04, x: 4 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-sm font-bold w-fit"
                style={{
                  background: "var(--brand-muted)",
                  borderColor: "var(--brand-border)",
                  color: "var(--brand-soft, var(--brand))",
                }}
              >
                <FiUser size={14} />
                <span>My Story</span>
              </motion.div>

              {/* Sub-heading */}
              <h3 className="text-3xl font-bold leading-tight text-foreground">
                Bridging the gap between{" "}
                <span style={{ color: "var(--brand)" }}>complex logic</span> and
                user experience.
              </h3>

              {/* Bio */}
              <div
                className="relative pl-5 border-l-2 space-y-4"
                style={{ borderColor: "var(--brand-border)" }}
              >
                {/* Brand dot on border */}
                <div
                  className="absolute -left-[5px] top-0 w-2 h-2 rounded-full"
                  style={{ background: "var(--brand)" }}
                />
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {bio}
                </p>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {STATS.map((stat, i) => (
                  <StatCard key={i} {...stat} />
                ))}
              </div>
            </motion.div>

            {/* ══ RIGHT — Timeline ══════════════════════════════ */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-24 space-y-8">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-sm font-bold"
                  style={{
                    background: "var(--brand-muted)",
                    borderColor: "var(--brand-border)",
                    color: "var(--brand-soft, var(--brand))",
                  }}
                >
                  <FiZap size={14} />
                  <span>Academic Excellence</span>
                </motion.div>

                {/* Timeline */}
                <div className="relative pl-8 space-y-12">
                  {/* Vertical line */}
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: "easeInOut" }}
                    className="absolute left-0 top-0 w-[2px] rounded-full"
                    style={{
                      background:
                        "linear-gradient(to bottom, var(--brand), var(--border), transparent)",
                    }}
                  />

                  <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-12"
                  >
                    {education?.map((edu, i) => {
                      const IconComponent = ICON_MAP[edu.icon] || FiAward;

                      return (
                        <motion.div
                          key={i}
                          variants={timelineItem}
                          className="relative group"
                        >
                          {/* Timeline dot */}
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              delay: 0.4 + i * 0.2,
                              type: "spring",
                              stiffness: 300,
                            }}
                            className="absolute -left-[41px] top-1 z-10 w-5 h-5 rounded-full border-4 border-background"
                            style={{ background: "var(--brand)" }}
                          />

                          {/* Pulse for ongoing */}
                          {edu.status === "ongoing" && (
                            <motion.div
                              animate={{
                                scale: [1, 1.8, 1],
                                opacity: [0.5, 0, 0.5],
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute -left-[41px] top-1 w-5 h-5 rounded-full"
                              style={{ background: "var(--brand)" }}
                            />
                          )}

                          <div className="space-y-3">
                            {/* Duration + Status */}
                            <div className="flex items-center gap-3">
                              <span
                                className="text-[10px] font-black font-mono uppercase tracking-wider"
                                style={{ color: "var(--brand)" }}
                              >
                                {edu.duration.from} – {edu.duration.to}
                              </span>
                              {edu.status === "ongoing" && (
                                <span
                                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider font-mono"
                                  style={{
                                    background: "var(--brand-muted)",
                                    color: "var(--brand)",
                                    border: "1px solid var(--brand-border)",
                                  }}
                                >
                                  <motion.span
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{
                                      duration: 1.5,
                                      repeat: Infinity,
                                    }}
                                    className="w-1 h-1 rounded-full"
                                    style={{ background: "var(--brand)" }}
                                  />
                                  Active
                                </span>
                              )}
                            </div>

                            {/* Title */}
                            <div>
                              <h4 className="text-xl font-bold italic font-serif text-foreground group-hover:text-[var(--brand)] transition-colors duration-200">
                                {edu.courseTitle}
                              </h4>
                              <p className="text-sm font-semibold text-foreground/60 mt-0.5">
                                {edu.subject}
                              </p>
                            </div>

                            {/* Institution card */}
                            <motion.div
                              whileHover={{ x: 6 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                              }}
                              className="p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden"
                              style={{
                                background: "var(--card)",
                                borderColor: "var(--border)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor =
                                  "var(--brand-border)";
                                e.currentTarget.style.boxShadow =
                                  "0 4px 20px var(--brand-glow)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor =
                                  "var(--border)";
                                e.currentTarget.style.boxShadow = "";
                              }}
                            >
                              {/* Inner top accent */}
                              <div
                                className="absolute top-0 left-0 right-0 h-[1px]"
                                style={{
                                  background:
                                    "linear-gradient(90deg, transparent, var(--brand-border), transparent)",
                                }}
                              />
                              <div className="flex items-start gap-3">
                                <div
                                  className="mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                                  style={{
                                    background: "var(--brand-muted)",
                                    color: "var(--brand)",
                                  }}
                                >
                                  <IconComponent size={14} />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-foreground">
                                    {edu.institution}
                                  </p>
                                  <p className="text-xs text-muted-foreground/70 leading-relaxed mt-1">
                                    {edu.description}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
