import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaGitAlt } from "react-icons/fa";
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
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ═══════════════════════════════════════════════════════════════
//  FALLBACK
// ═══════════════════════════════════════════════════════════════
const FALLBACK = {
  frontend: [
    { name: "React", iconName: "FaReact", color: "#61DAFB", icon: FaReact },
    {
      name: "Next.js",
      iconName: "SiNextdotjs",
      color: "#a8b3c9",
      icon: SiNextdotjs,
    },
    {
      name: "JavaScript",
      iconName: "SiJavascript",
      color: "#F7DF1E",
      icon: SiJavascript,
    },
    {
      name: "TypeScript",
      iconName: "SiTypescript",
      color: "#3178C6",
      icon: SiTypescript,
    },
    {
      name: "Tailwind CSS",
      iconName: "SiTailwindcss",
      color: "#06B6D4",
      icon: SiTailwindcss,
    },
    { name: "Redux", iconName: "SiRedux", color: "#764ABC", icon: SiRedux },
  ],
  backend: [
    { name: "Node.js", iconName: "FaNodeJs", color: "#339933", icon: FaNodeJs },
    {
      name: "Express.js",
      iconName: "SiExpress",
      color: "#a8b3c9",
      icon: SiExpress,
    },
    {
      name: "REST APIs",
      iconName: "SiPostman",
      color: "#FF6C37",
      icon: SiPostman,
    },
    {
      name: "MongoDB",
      iconName: "SiMongodb",
      color: "#47A248",
      icon: SiMongodb,
    },
    {
      name: "Firebase",
      iconName: "SiFirebase",
      color: "#FFCA28",
      icon: SiFirebase,
    },
  ],
};

const ICON_MAP = {
  FaReact: FaReact,
  FaNodeJs: FaNodeJs,
  FaPython: FaPython,
  FaGitAlt: FaGitAlt,
  SiJavascript: SiJavascript,
  SiTypescript: SiTypescript,
  SiMongodb: SiMongodb,
  SiExpress: SiExpress,
  SiTailwindcss: SiTailwindcss,
  SiNextdotjs: SiNextdotjs,
  SiRedux: SiRedux,
  SiFirebase: SiFirebase,
  SiPostman: SiPostman,
};

const STACK = [
  { Icon: SiNextdotjs, color: "#a8b3c9" },
  { Icon: FaReact, color: "#61DAFB" },
  { Icon: SiTypescript, color: "#3178C6" },
  { Icon: FaNodeJs, color: "#339933" },
  { Icon: SiMongodb, color: "#47A248" },
  { Icon: FaPython, color: "#3776AB" },
  { Icon: SiTailwindcss, color: "#06B6D4" },
  { Icon: FaGitAlt, color: "#F05032" },
];

const CATEGORIES = [
  { id: "frontend", label: "Frontend", icon: FaReact, color: "#61DAFB" },
  { id: "backend", label: "Backend", icon: FaNodeJs, color: "#339933" },
];

// ═══════════════════════════════════════════════════════════════
//  SKELETON
// ═══════════════════════════════════════════════════════════════
const PillSkeleton = ({ i }) => (
  <div
    className="flex items-center gap-3 p-3.5 rounded-2xl border border-border bg-card animate-pulse"
    style={{ animationDelay: `${i * 0.07}s` }}
  >
    <div className="w-8 h-8 rounded-xl bg-muted flex-shrink-0" />
    <div className="h-2.5 bg-muted rounded-full flex-1" />
  </div>
);

// ═══════════════════════════════════════════════════════════════
//  SKILL PILL
// ═══════════════════════════════════════════════════════════════
const SkillPill = ({ skill, index }) => {
  const Icon = skill.icon || ICON_MAP[skill.iconName] || FaReact;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{
        delay: index * 0.055,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, scale: 1.04 }}
      className="group flex items-center gap-3 p-3.5 rounded-2xl border border-border bg-card
        cursor-default transition-all duration-200 relative overflow-hidden"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `color-mix(in oklch, ${skill.color} 50%, transparent)`;
        e.currentTarget.style.boxShadow = `0 6px 24px color-mix(in oklch, ${skill.color} 20%, transparent)`;
        e.currentTarget.style.background = `color-mix(in oklch, ${skill.color} 7%, var(--card))`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.background = "";
      }}
    >
      {/* Color wash */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 0% 50%, color-mix(in oklch, ${skill.color} 12%, transparent), transparent 70%)`,
        }}
      />
      {/* Icon box */}
      <div
        className="relative w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: `color-mix(in oklch, ${skill.color} 14%, transparent)`,
          border: `1px solid color-mix(in oklch, ${skill.color} 22%, transparent)`,
        }}
      >
        <Icon size={15} style={{ color: skill.color }} />
      </div>
      {/* Name */}
      <span className="relative text-[12px] font-bold tracking-wide text-muted-foreground group-hover:text-foreground transition-colors duration-200">
        {skill.name}
      </span>
      {/* Hover accent dot */}
      <motion.div
        className="absolute right-3.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: skill.color }}
      />
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════════
const Skills = () => {
  const [activeTab, setActiveTab] = useState("frontend");
  const [grouped, setGrouped] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/api/skills/grouped`, {
          signal: controller.signal,
        });
        if (res.data?.success) {
          const raw = res.data.data;
          const mapIcons = (list) =>
            (list || []).map((s) => ({
              ...s,
              icon: ICON_MAP[s.iconName] || FaReact,
            }));
          setGrouped({
            frontend: mapIcons(raw.frontend),
            backend: mapIcons(raw.backend),
          });
        }
      } catch (err) {
        if (!axios.isCancel(err)) setGrouped(FALLBACK);
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  const current = grouped[activeTab] || [];
  const activeCat = CATEGORIES.find((c) => c.id === activeTab);

  return (
    <section
      id="skills"
      className="py-16 md:py-28 bg-background relative overflow-hidden"
    >
      {/* ── Ambient glows ──────────────────────────────────── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[120px] opacity-[0.06] pointer-events-none"
        style={{ background: "var(--brand)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.03] pointer-events-none"
        style={{ background: "var(--brand)" }}
      />

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* ══ Header row — label + title left, tabs right ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
          >
            {/* Left — label + title */}
            <div>
              <div className="flex items-center gap-3 mb-4">
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

            {/* Right — horizontal tab switcher (replaces the description) */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl border border-border bg-card/60 backdrop-blur-sm self-start md:self-end">
              {CATEGORIES.map((cat) => {
                const TabIcon = cat.icon;
                const active = cat.id === activeTab;
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    whileTap={{ scale: 0.96 }}
                    className="relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest font-mono transition-colors duration-200 overflow-hidden"
                    style={{
                      color: active ? "#fff" : "var(--muted-foreground)",
                    }}
                  >
                    {/* Sliding pill background */}
                    {active && (
                      <motion.div
                        layoutId="tabSlider"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: "var(--brand)",
                          boxShadow:
                            "0 4px 16px var(--brand-glow, rgba(139,92,246,0.35))",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <TabIcon size={13} />
                      {cat.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* ══ Skill grid ════════════════════════════════════ */}
          <div className="relative">
            {/* Thin colored top accent tied to active category */}
            <motion.div
              key={activeTab + "-accent"}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute -top-3 left-0 h-[1.5px] w-full rounded-full origin-left pointer-events-none"
              style={{
                background: `linear-gradient(90deg, ${activeCat?.color}, transparent)`,
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-4"
              >
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <PillSkeleton key={i} i={i} />
                    ))
                  : current.map((skill, i) => (
                      <SkillPill
                        key={skill._id || skill.name}
                        skill={skill}
                        index={i}
                      />
                    ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ══ Tech Stack strip ══════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 pt-10 border-t border-border"
          >
            <div className="flex items-center gap-4 justify-center mb-10">
              <div className="flex-1 max-w-20 h-px bg-gradient-to-r from-transparent to-border" />
              <p className="text-[9px] font-black uppercase tracking-[0.45em] text-muted-foreground/35 whitespace-nowrap font-mono">
                Core Tech Stack
              </p>
              <div className="flex-1 max-w-20 h-px bg-gradient-to-l from-transparent to-border" />
            </div>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {STACK.map(({ Icon, color }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  whileHover={{ y: -8, scale: 1.2 }}
                  className="group relative cursor-default"
                >
                  {/* Glow behind icon on hover */}
                  <div
                    className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none scale-150"
                    style={{ background: color }}
                  />
                  <Icon
                    size={28}
                    className="relative grayscale opacity-25 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ color }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
