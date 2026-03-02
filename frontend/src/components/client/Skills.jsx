import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaAward } from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiNextdotjs,
  SiRedux,
  SiFirebase,
  SiPostman,
} from "react-icons/si";
import { FiZap } from "react-icons/fi";

/* ── data ── */
const TABS = [
  {
    id: "frontend",
    label: "Frontend",
    icon: FaReact,
    skills: [
      { name: "React", level: 90, icon: FaReact, color: "#61DAFB" },
      { name: "Next.js", level: 85, icon: SiNextdotjs, color: "#ffffff" },
      { name: "JavaScript", level: 90, icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", level: 80, icon: SiTypescript, color: "#3178C6" },
      {
        name: "Tailwind CSS",
        level: 95,
        icon: SiTailwindcss,
        color: "#06B6D4",
      },
      { name: "Redux", level: 75, icon: SiRedux, color: "#764ABC" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: FaNodeJs,
    skills: [
      { name: "Node.js", level: 85, icon: FaNodeJs, color: "#339933" },
      { name: "Express.js", level: 85, icon: SiExpress, color: "#ffffff" },
      { name: "REST APIs", level: 90, icon: SiPostman, color: "#FF6C37" },
      { name: "MongoDB", level: 85, icon: SiMongodb, color: "#47A248" },
      { name: "Firebase", level: 70, icon: SiFirebase, color: "#FFCA28" },
    ],
  },
];

const SOFT_SKILLS = [
  "Problem Solving",
  "Team Collaboration",
  "System Design",
  "Time Management",
  "Critical Thinking",
  "Adaptability",
  "Leadership",
  "Attention to Detail",
];

const CERTS = [
  { title: "Full Stack Web Development", issuer: "Udemy" },
  { title: "React – The Complete Guide", issuer: "Udemy" },
  { title: "Node.js Certification", issuer: "freeCodeCamp" },
];

const STACK = [
  { Icon: SiNextdotjs, color: null },
  { Icon: FaReact, color: "#61DAFB" },
  { Icon: SiTypescript, color: "#3178C6" },
  { Icon: FaNodeJs, color: "#339933" },
  { Icon: SiMongodb, color: "#47A248" },
  { Icon: FaPython, color: "#3776AB" },
  { Icon: SiTailwindcss, color: "#06B6D4" },
  { Icon: FaGitAlt, color: "#F05032" },
];

/* ── Radial SVG progress ring ── */
const RADIUS = 28;
const CIRC = 2 * Math.PI * RADIUS;

const Ring = ({ level, color }) => {
  const dash = (level / 100) * CIRC;
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
      {/* track */}
      <circle
        cx="36"
        cy="36"
        r={RADIUS}
        fill="none"
        stroke="var(--border)"
        strokeWidth="4"
      />
      {/* fill */}
      <motion.circle
        cx="36"
        cy="36"
        r={RADIUS}
        fill="none"
        stroke={color || "var(--brand)"}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={CIRC}
        initial={{ strokeDashoffset: CIRC }}
        whileInView={{ strokeDashoffset: CIRC - dash }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "circOut", delay: 0.1 }}
      />
    </svg>
  );
};

/* ── Skill card with ring ── */
const SkillCard = ({ skill, index }) => {
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, scale: 0.95 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.06,
      }}
      whileHover={{ y: -5, scale: 1.03 }}
      className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl border bg-card transition-all duration-300 cursor-default"
      style={{ borderColor: "var(--border)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--brand-border)";
        e.currentTarget.style.background = "var(--brand-muted)";
        e.currentTarget.style.boxShadow =
          "0 8px 32px var(--brand-glow, rgba(139,92,246,0.15))";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.background = "var(--card)";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* ring + icon stacked */}
      <div className="relative flex items-center justify-center">
        <Ring level={skill.level} color={skill.color} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon size={20} style={{ color: skill.color || "var(--brand)" }} />
        </div>
      </div>

      {/* level % */}
      <span
        className="text-xs font-black font-mono tabular-nums"
        style={{ color: "var(--brand)" }}
      >
        {skill.level}%
      </span>

      {/* name */}
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground text-center group-hover:text-foreground transition-colors duration-200">
        {skill.name}
      </span>
    </motion.div>
  );
};

/* ══ Main ══ */
const Skills = () => {
  const [activeTab, setActiveTab] = useState("frontend");
  const current = TABS.find((t) => t.id === activeTab);

  return (
    <section
      id="skills"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* ambient glows */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full blur-[110px] opacity-[0.07] pointer-events-none"
        style={{ background: "var(--brand)" }}
      />
      <div
        className="absolute bottom-10 right-0 w-[300px] h-[300px] rounded-full blur-[90px] opacity-[0.04] pointer-events-none"
        style={{ background: "var(--brand)" }}
      />

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* ══ Header ══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
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
                  Expertise
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                Skills &{" "}
                <span className="text-muted-foreground italic font-serif font-normal">
                  Technologies.
                </span>
              </h2>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs md:text-right">
              Specializing in modern JavaScript ecosystems and scalable cloud
              architecture.
            </p>
          </motion.div>

          {/* ══ Tab switcher + skill grid ══ */}
          <div className="grid lg:grid-cols-[200px_1fr] gap-10">
            {/* Vertical tab buttons */}
            <div className="flex lg:flex-col gap-3">
              {TABS.map((tab) => {
                const TabIcon = tab.icon;
                const active = tab.id === activeTab;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ x: active ? 0 : 4 }}
                    className="relative flex items-center gap-3 px-5 py-4 rounded-2xl border text-left font-bold text-sm transition-all duration-200 overflow-hidden"
                    style={
                      active
                        ? {
                            background: "var(--brand)",
                            borderColor: "var(--brand)",
                            color: "#fff",
                          }
                        : {
                            background: "var(--card)",
                            borderColor: "var(--border)",
                            color: "var(--muted-foreground)",
                          }
                    }
                    onMouseEnter={(e) => {
                      if (!active)
                        e.currentTarget.style.borderColor =
                          "var(--brand-border)";
                    }}
                    onMouseLeave={(e) => {
                      if (!active)
                        e.currentTarget.style.borderColor = "var(--border)";
                    }}
                  >
                    {active && (
                      <motion.div
                        layoutId="tabBg"
                        className="absolute inset-0 rounded-2xl"
                        style={{ background: "var(--brand)" }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-3">
                      <TabIcon size={16} />
                      {tab.label}
                    </span>
                    {active && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="relative z-10 ml-auto w-1.5 h-1.5 rounded-full bg-white/60"
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* mini stat */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="hidden lg:flex flex-col gap-1 mt-4 px-2"
              >
                <span className="text-4xl font-black text-foreground tracking-tight">
                  {current.skills.length}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                  {current.label} Skills
                </span>
                <div className="mt-2 h-1 w-full rounded-full bg-border overflow-hidden">
                  <motion.div
                    key={activeTab}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: "var(--brand)" }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Skill cards grid */}
            <div className="relative min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4"
                >
                  {current.skills.map((skill, i) => (
                    <SkillCard key={skill.name} skill={skill} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ══ Lower: Soft Skills + Certs ══ */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Soft Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="lg:col-span-2 p-8 rounded-3xl border bg-card"
              style={{ borderColor: "var(--border)" }}
            >
              <h3 className="text-base font-bold text-foreground mb-6 flex items-center gap-2.5">
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full"
                  style={{ background: "var(--brand)" }}
                />
                Professional Soft Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {SOFT_SKILLS.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.35 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="px-4 py-2 rounded-xl border text-sm font-medium cursor-default transition-all duration-200"
                    style={{
                      background: "var(--background)",
                      borderColor: "var(--border)",
                      color: "var(--foreground)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--brand-muted)";
                      e.currentTarget.style.borderColor = "var(--brand-border)";
                      e.currentTarget.style.color =
                        "var(--brand-soft, var(--brand))";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--background)";
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.color = "var(--foreground)";
                    }}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="relative p-8 rounded-3xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, var(--brand) 0%, oklch(0.38 0.22 293) 100%)",
              }}
            >
              <div className="absolute -bottom-4 -right-4 opacity-[0.08] pointer-events-none">
                <FaAward size={110} className="text-white" />
              </div>
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/10 blur-[40px] pointer-events-none" />

              <div className="relative z-10">
                <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
                    <FaAward size={13} className="text-white" />
                  </div>
                  Certifications
                </h3>
                <ul className="space-y-4">
                  {CERTS.map((c, i) => (
                    <motion.li
                      key={i}
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 22,
                      }}
                      className="flex items-start gap-3 cursor-pointer group/item"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/40 group-hover/item:bg-white shrink-0 transition-colors" />
                      <div>
                        <p className="text-sm font-bold text-white leading-tight group-hover/item:underline underline-offset-2">
                          {c.title}
                        </p>
                        <p className="text-[10px] text-white/55 uppercase tracking-widest font-bold mt-0.5">
                          {c.issuer}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* ══ Tech Stack Strip ══ */}
          <div className="pt-8 border-t border-border">
            <div className="flex items-center gap-4 justify-center mb-10">
              <div className="flex-1 max-w-16 h-px bg-gradient-to-r from-transparent to-border" />
              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-muted-foreground/50 whitespace-nowrap">
                Core Tech Stack
              </p>
              <div className="flex-1 max-w-16 h-px bg-gradient-to-l from-transparent to-border" />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-8 md:gap-14"
            >
              {STACK.map(({ Icon, color }, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="grayscale opacity-25 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
                >
                  <Icon
                    className="text-[2rem]"
                    style={{ color: color ?? undefined }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
