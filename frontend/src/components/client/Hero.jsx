import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiDownload, FiCode } from "react-icons/fi";
import { RiLightbulbFlashFill } from "react-icons/ri";
import axiosInstance from "../../lib/axios";

// ═══════════════════════════════════════════════════════════════
//  STATIC CONFIG
// ═══════════════════════════════════════════════════════════════
const STARS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${(i * 73 + 11) % 97}%`,
  top: `${(i * 47 + 23) % 93}%`,
  dur: 2.5 + (i % 4) * 0.8,
  delay: (i * 0.41) % 5,
  size: i % 3 === 0 ? "w-2 h-2" : "w-1.5 h-1.5",
}));

// ── Framer variants ──────────────────────────────────────────
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.16, delayChildren: 0.2 },
  },
};
const item = {
  hidden: { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

// ═══════════════════════════════════════════════════════════════
//  SKELETON
// ═══════════════════════════════════════════════════════════════
const HeroSkeleton = () => (
  <div className="relative min-h-screen w-full bg-background flex items-center justify-center overflow-hidden">
    {/* Grid bg */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundSize: "40px 40px",
        backgroundImage: `
          linear-gradient(to right,  color-mix(in oklch, var(--foreground) 4%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 4%, transparent) 1px, transparent 1px)
        `,
      }}
    />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_30%,var(--background)_100%)]" />

    <div className="relative z-10 flex flex-col items-center gap-8 px-6 w-full max-w-3xl">
      {/* Badge */}
      <div className="w-52 h-7 rounded-full bg-muted animate-pulse" />
      {/* Title */}
      <div className="space-y-4 w-full flex flex-col items-center">
        <div className="w-[70%] h-16 md:h-24 rounded-2xl bg-muted animate-pulse" />
        <div className="w-[50%] h-16 md:h-24 rounded-2xl bg-muted animate-pulse" />
      </div>
      {/* Subtitle */}
      <div className="w-48 h-5 rounded-full bg-muted animate-pulse" />
      {/* Description */}
      <div className="space-y-2.5 w-full max-w-xl flex flex-col items-center">
        <div className="w-full h-4 rounded-full bg-muted animate-pulse" />
        <div className="w-5/6 h-4 rounded-full bg-muted animate-pulse" />
        <div className="w-4/6 h-4 rounded-full bg-muted animate-pulse" />
      </div>
      {/* Buttons */}
      <div className="flex gap-4">
        <div className="w-40 h-14 rounded-2xl bg-muted animate-pulse" />
        <div className="w-40 h-14 rounded-2xl bg-muted animate-pulse" />
      </div>
      {/* Tech tags */}
      <div className="flex gap-2 flex-wrap justify-center">
        {[60, 72, 64, 80].map((w, i) => (
          <div
            key={i}
            className="h-8 rounded-xl bg-muted animate-pulse"
            style={{ width: w }}
          />
        ))}
      </div>
    </div>
  </div>
);

// ═════════════════════��═════════════════════════════════════════
//  BACKGROUND LAYER
// ═══════════════════════════════════════════════════════════════
const Background = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Grid */}
    <div
      className="absolute inset-0"
      style={{
        backgroundSize: "40px 40px",
        backgroundImage: `
          linear-gradient(to right,  color-mix(in oklch, var(--foreground) 4%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 4%, transparent) 1px, transparent 1px)
        `,
      }}
    />
    {/* Radial vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_30%,var(--background)_100%)]" />

    {/* Center glow */}
    <motion.div
      animate={{ scale: [1, 1.18, 1], opacity: [0.08, 0.16, 0.08] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[130px]"
      style={{ background: "var(--brand)" }}
    />
    {/* Secondary glow */}
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.09, 0.04] }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 3,
      }}
      className="absolute left-[65%] top-[30%] w-[400px] h-[400px] rounded-full blur-[100px]"
      style={{ background: "var(--brand)" }}
    />
    {/* Top-left accent */}
    <motion.div
      animate={{ opacity: [0.03, 0.07, 0.03] }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.5,
      }}
      className="absolute -left-20 top-20 w-[350px] h-[350px] rounded-full blur-[100px]"
      style={{ background: "var(--brand)" }}
    />

    {/* Stars */}
    {STARS.map((s) => (
      <motion.div
        key={s.id}
        className={`absolute ${s.size} rounded-full`}
        style={{ left: s.left, top: s.top, background: "var(--brand)" }}
        animate={{ opacity: [0, 0.8, 0], scale: [0, 1.4, 0] }}
        transition={{
          duration: s.dur,
          repeat: Infinity,
          delay: s.delay,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// ═══════════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════════
const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await axiosInstance.get("/api/hero", {
          signal: controller.signal,
        });
        if (res.data?.success) setHeroData(res.data.data);
      } catch (err) {
        if (!axiosInstance.isCancel?.(err))
          console.error("Failed to load hero data");
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  if (loading) return <HeroSkeleton />;
  if (!heroData) return null;

  // ── Derived data ─────────────────────────────────────────────
  const words = heroData.title?.split(" ") ?? ["Hello", "World"];
  const firstWord = words[0];
  const restWords = words.slice(1).join(" ");
  const techStack = heroData.techStack?.length
    ? heroData.techStack
    : ["React", "Next.js", "Node.js", "TypeScript"];

  // ════════════════════════════════════════════════════════════
  return (
    <div
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center antialiased"
    >
      <Background />

      {/* ══ Main Content ══════════════════════════════════════ */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-28 pb-20 flex flex-col items-center text-center gap-8"
      >
        {/* ── Status badge ──────────────────────────────────── */}
        <motion.div variants={item}>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-secondary/60 border border-border backdrop-blur-md">
            {/* Ping dot */}
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground font-mono">
              {heroData.freelanceStatus ?? "Available"} for new projects
            </span>
          </div>
        </motion.div>

        {/* ── Title ─────────────────────────────────────────── */}
        <motion.div variants={item} className="space-y-4">
          <h1 className="text-6xl md:text-[88px] font-black tracking-tight text-foreground leading-[1.0]">
            {firstWord}{" "}
            <span className="relative inline-block">
              {/* Italic serif word */}
              <span className="text-muted-foreground italic font-serif font-light">
                {restWords}
              </span>
              {/* Underline SVG */}
              <motion.svg
                viewBox="0 0 240 10"
                fill="none"
                className="absolute -bottom-1 left-0 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <motion.path
                  d="M2 7 C40 2, 80 9, 120 5 S190 1, 238 6"
                  stroke="var(--brand)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.2, duration: 0.9, ease: "easeOut" }}
                />
              </motion.svg>
            </span>
          </h1>

          {/* Subtitle / role */}
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="block h-px w-8 origin-right"
              style={{ background: "var(--brand)" }}
            />
            <h2
              className="text-base md:text-lg font-black tracking-[0.3em] uppercase font-mono"
              style={{ color: "var(--brand)" }}
            >
              {heroData.subTitle}
            </h2>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="block h-px w-8 origin-left"
              style={{ background: "var(--brand)" }}
            />
          </motion.div>
        </motion.div>

        {/* ── Description ───────────────────────────────────── */}
        <motion.p
          variants={item}
          className="text-base md:text-lg text-muted-foreground/80 max-w-xl leading-relaxed"
        >
          {heroData.description}
        </motion.p>

        {/* ── Buttons ───────────────────────────────────────── */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <motion.a
            href={heroData.ctaLink}
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
            className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-sm overflow-hidden shadow-xl transition-shadow"
            style={{
              background: "var(--brand)",
              color: "var(--brand-foreground, #fff)",
              boxShadow: "0 0 30px var(--brand-glow)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 8px 40px var(--brand-glow)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 30px var(--brand-glow)")
            }
          >
            {/* Shimmer */}
            <motion.div
              variants={{ hover: { x: "200%" }, initial: { x: "-200%" } }}
              initial="initial"
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
            />
            <span className="relative z-10">{heroData.ctaText}</span>
            <motion.span
              variants={{ hover: { x: 3, y: -3 } }}
              className="relative z-10"
            >
              <FiArrowUpRight size={17} />
            </motion.span>
          </motion.a>

          {/* Download CV */}
          <motion.a
            href={heroData.downloadLink}
            target="_blank"
            rel="noreferrer"
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
            className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-sm text-foreground border border-border bg-secondary/40 backdrop-blur-xl transition-all duration-300"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--brand-border)";
              e.currentTarget.style.background = "var(--brand-muted)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "";
              e.currentTarget.style.background = "";
            }}
          >
            <motion.span
              variants={{ hover: { y: [0, -3, 0] } }}
              transition={{ repeat: Infinity, duration: 0.9 }}
            >
              <FiDownload size={16} />
            </motion.span>
            <span>{heroData.downloadText ?? "Download CV"}</span>
          </motion.a>
        </motion.div>

        {/* ── Tech stack ────────────────────────────────────── */}
        <motion.div
          variants={item}
          className="pt-6 flex flex-col items-center gap-5 w-full"
        >
          {/* Label */}
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div className="flex-1 h-px bg-border" />
            <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.4em] whitespace-nowrap font-mono">
              Tech Stack
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center items-center gap-2">
            <motion.div
              whileHover={{ rotate: 20, scale: 1.2 }}
              style={{ color: "var(--brand)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="opacity-50 cursor-default mr-1"
            >
              <FiCode size={17} />
            </motion.div>

            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.08 }}
                whileHover={{ y: -3, scale: 1.05 }}
                className="px-3 py-1.5 rounded-xl border border-border bg-secondary/50 text-[10px] font-black font-mono text-muted-foreground cursor-default transition-all duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--brand-border)";
                  e.currentTarget.style.background = "var(--brand-muted)";
                  e.currentTarget.style.color = "var(--brand)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.background = "";
                  e.currentTarget.style.color = "";
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ── Stats row ─────────────────────────────────────── */}
        {heroData.stats?.length > 0 && (
          <motion.div
            variants={item}
            className="pt-4 grid grid-cols-3 gap-6 w-full max-w-sm"
          >
            {heroData.stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-1 p-4 rounded-2xl border border-border bg-secondary/30 backdrop-blur-sm cursor-default transition-all duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--brand-border)";
                  e.currentTarget.style.background = "var(--brand-muted)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.background = "";
                }}
              >
                <span
                  className="text-2xl font-black tracking-tight"
                  style={{ color: "var(--brand)" }}
                >
                  {stat.value}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50 font-mono text-center leading-tight">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* ══ Scroll Indicator ══════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] uppercase tracking-[0.4em] text-muted-foreground/30 font-black font-mono">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 rounded-full"
          style={{
            background: "linear-gradient(to bottom, var(--brand), transparent)",
          }}
        />
      </motion.div>
    </div>
  );
};

export default Hero;
