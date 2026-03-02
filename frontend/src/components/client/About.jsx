import React from "react";
import { motion } from "framer-motion";
import {
  FiAward,
  FiBookOpen,
  FiUser,
  FiZap,
  FiMapPin,
  FiClock,
  FiBriefcase,
} from "react-icons/fi";

/* ── data ── */
const academicTimeline = [
  {
    year: "2025 — Present",
    title: "Bachelor's Degree",
    subtitle: "Computing & Information Technology",
    institution: "Philips University, Cyprus",
    description:
      "Specializing in software architecture and distributed systems.",
    icon: FiBookOpen,
    status: "ongoing",
  },
  {
    year: "2016 — 2020",
    title: "Diploma in Engineering",
    subtitle: "Electronics Technology",
    institution: "Shariatpur Polytechnic Institute",
    description:
      "Foundation in hardware-software integration and logic design.",
    icon: FiAward,
    status: "completed",
  },
];

const STATS = [
  { label: "Experience", value: "3.5+", unit: "Years", icon: FiClock },
  { label: "Location", value: "CY", unit: "Cyprus", icon: FiMapPin },
  { label: "Freelance", value: "Open", unit: "Available", icon: FiBriefcase },
];

/* ── variants ── */
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
  visible: { opacity: 1, transition: { staggerChildren: 0.25 } },
};
const timelineItem = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const About = () => (
  <section id="about" className="py-28 bg-background overflow-hidden relative">
    {/* ambient top-right glow */}
    <div
      className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full blur-[120px] opacity-[0.06] pointer-events-none"
      style={{ background: "var(--brand)" }}
    />

    <div className="container mx-auto px-6">
      <div className="max-w-7xl mx-auto">
        {/* ══ Section Header ══ */}
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
              className="text-[11px] font-bold uppercase tracking-[0.3em]"
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
          {/* ══ LEFT — Biography ══ */}
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
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-sm font-medium w-fit transition-colors duration-200"
              style={{
                background: "var(--brand-muted)",
                borderColor: "var(--brand-border)",
                color: "var(--brand-soft, var(--brand))",
              }}
            >
              <FiUser size={14} />
              <span>My Story</span>
            </motion.div>

            {/* Subheading */}
            <h3 className="text-3xl font-bold leading-tight text-foreground">
              Bridging the gap between <br />
              <span style={{ color: "var(--brand)" }}>complex logic</span> and
              user experience.
            </h3>

            {/* Bio paragraphs */}
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                I am a full-stack developer with{" "}
                <strong className="text-foreground font-semibold">
                  3.5 years of industry experience
                </strong>
                , currently refining my expertise at{" "}
                <strong
                  className="font-semibold"
                  style={{ color: "var(--brand-soft, var(--brand))" }}
                >
                  Philips University, Cyprus
                </strong>
                . My approach is simple: build digital products that are as
                robust under the hood as they are intuitive on the surface.
              </p>
              <p>
                What started as a fascination with electronics technology has
                evolved into a career dedicated to the web ecosystem. I don't
                just write code; I solve problems through{" "}
                <strong className="text-foreground font-semibold">
                  scalable architecture
                </strong>{" "}
                and{" "}
                <strong className="text-foreground font-semibold">
                  clean design
                </strong>
                .
              </p>
            </div>

            {/* ── Stats Grid ── */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {STATS.map(({ label, value, unit, icon: Icon }, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative flex flex-col gap-3 p-5 rounded-2xl border transition-all duration-300 overflow-hidden cursor-default"
                  style={{
                    background: "var(--card)",
                    borderColor: "var(--border)",
                  }}
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
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{
                      background: "var(--brand-muted)",
                      color: "var(--brand)",
                    }}
                  >
                    <Icon size={14} />
                  </div>
                  <div>
                    <p className="text-xl font-black text-foreground tracking-tight">
                      {value}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">
                      {unit}
                    </p>
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 font-bold">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ══ RIGHT — Academic Timeline ══ */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24 space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-sm font-medium"
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
                {/* Animated vertical line */}
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
                  {academicTimeline.map((edu, i) => (
                    <motion.div
                      key={i}
                      variants={timelineItem}
                      className="relative group"
                    >
                      {/* Dot */}
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

                      {/* Pulsing ring for ongoing */}
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
                        {/* Year + status */}
                        <div className="flex items-center gap-3">
                          <span
                            className="text-[10px] font-mono font-bold uppercase tracking-wider"
                            style={{ color: "var(--brand)" }}
                          >
                            {edu.year}
                          </span>
                          {edu.status === "ongoing" && (
                            <span
                              className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                              style={{
                                background: "var(--brand-muted)",
                                color: "var(--brand)",
                                border: "1px solid var(--brand-border)",
                              }}
                            >
                              Active
                            </span>
                          )}
                        </div>

                        {/* Titles */}
                        <div>
                          <h4 className="text-xl font-bold italic font-serif text-foreground group-hover:text-[var(--brand)] transition-colors duration-200">
                            {edu.title}
                          </h4>
                          <p className="text-sm font-semibold text-foreground/70 mt-0.5">
                            {edu.subtitle}
                          </p>
                        </div>

                        {/* Card */}
                        <motion.div
                          whileHover={{ x: 8 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                          }}
                          className="p-5 rounded-2xl border transition-all duration-300 shadow-sm"
                          style={{
                            background: "var(--card)",
                            borderColor: "var(--border)",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.borderColor =
                              "var(--brand-border)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.borderColor =
                              "var(--border)")
                          }
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                              style={{
                                background: "var(--brand-muted)",
                                color: "var(--brand)",
                              }}
                            >
                              <edu.icon size={13} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-foreground">
                                {edu.institution}
                              </p>
                              <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                                {edu.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
