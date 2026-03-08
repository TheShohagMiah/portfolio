import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiDownload, FiCode } from "react-icons/fi";
import axiosInstance from "../../lib/axios";

/* ── Stable Star Positions ────────────────────────────────────────── */
const STARS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${(i * 73 + 11) % 97}%`,
  top: `${(i * 47 + 23) % 93}%`,
  dur: 2.5 + (i % 4) * 0.8,
  delay: (i * 0.41) % 5,
  size: i % 3 === 0 ? "w-2 h-2" : "w-1.5 h-1.5",
}));
const TECH = ["React", "Next.js", "Node.js", "TypeScript"];

/* ── Variants ─────────────────────────────────────────────────────── */
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.25 },
  },
};
const item = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

const Hero = () => {
  const containerRef = useRef(null);

  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getHero = async () => {
    try {
      const res = await axiosInstance.get("/api/hero");
      if (res.data?.success) {
        setHeroData(res.data.data);
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Failed to load hero data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHero();
  }, []);

  const words = heroData?.title.split(" ");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[10px] font-bold uppercase tracking-[0.35em] text-muted-foreground"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  // ✅ heroData না থাকলে কিছু দেখাবে না
  if (!heroData) return null;

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center antialiased"
    >
      {/* ══ Background Layer ══ */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
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

      {/* ══ Main Content ══ */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-24 pb-16 flex flex-col items-center text-center gap-8"
      >
        {/* ── Status Badge ── */}
        <motion.div variants={item}>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-secondary/60 border border-border backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
              {heroData.freelanceStatus} for new projects
            </span>
          </div>
        </motion.div>

        {/* ── Title ── */}
        <motion.div variants={item} className="space-y-5">
          <h1 className="text-6xl md:text-[90px] font-black tracking-tight text-foreground leading-[1.0]">
            {words[0]}{" "}
            <span className="relative inline-block">
              <span className="text-muted-foreground italic font-serif font-light">
                {words[1]}
              </span>
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

          {/* Role */}
          <div className="flex items-center justify-center gap-4">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="block h-px w-8 origin-right"
              style={{ background: "var(--brand)" }}
            />
            <h2
              className="text-base md:text-xl font-semibold tracking-[0.25em] uppercase"
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
          </div>
        </motion.div>

        {/* ── Description ── */}
        <motion.p
          variants={item}
          className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed"
        >
          {heroData.description}
        </motion.p>

        {/* ── Buttons ── */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <motion.a
            href={heroData.ctaLink}
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
            className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold overflow-hidden shadow-xl transition-shadow"
            style={{
              background: "var(--brand)",
              color: "var(--brand-foreground, #fff)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 8px 40px var(--brand-glow, rgba(139,92,246,0.35))")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "")}
          >
            <motion.div
              variants={{ hover: { x: "200%" }, initial: { x: "-200%" } }}
              initial="initial"
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
            />
            <span className="relative z-10 text-sm">{heroData.ctaText}</span>
            <motion.span
              variants={{ hover: { x: 3, y: -3 } }}
              className="relative z-10"
            >
              <FiArrowUpRight size={18} />
            </motion.span>
          </motion.a>

          {/* Download CV */}
          <motion.a
            href={heroData.downloadLink}
            target="_blank"
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
            className="group relative w-full sm:w-auto flex items-center justify-center gap-3 bg-secondary/40 border border-border backdrop-blur-xl px-8 py-4 rounded-2xl font-bold text-sm text-foreground transition-all duration-300 hover:border-[var(--brand)] hover:bg-[var(--brand-muted)]"
          >
            <motion.span
              variants={{ hover: { y: [0, -3, 0] } }}
              transition={{ repeat: Infinity, duration: 0.9 }}
            >
              <FiDownload size={17} />
            </motion.span>
            <span>{heroData.downloadText}</span>
          </motion.a>
        </motion.div>

        {/* ── Tech Stack ── */}
        <motion.div
          variants={item}
          className="pt-8 flex flex-col items-center gap-5 w-full"
        >
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div className="flex-1 h-px bg-border" />
            <p className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-[0.35em] whitespace-nowrap">
              Tech Stack
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2">
            <motion.div
              whileHover={{ rotate: 20, scale: 1.2, color: "var(--brand)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-muted-foreground/40 cursor-help mr-1"
            >
              <FiCode size={18} />
            </motion.div>

            {/* ✅ সমস্যা ৪ ঠিক: DB থেকে tech stack আসছে */}
            {TECH?.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.08 }}
                whileHover={{ y: -3, color: "var(--brand)" }}
                className="px-3 py-1.5 rounded-xl bg-secondary/50 border border-border text-[11px] font-mono text-muted-foreground cursor-default transition-colors duration-200 hover:border-[var(--brand)] hover:bg-[var(--brand-muted)]"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ══ Scroll Indicator ══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] uppercase tracking-[0.4em] text-muted-foreground/40 font-bold">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-0.5 h-12 rounded-full"
          style={{
            background: "linear-gradient(to bottom, var(--brand), transparent)",
          }}
        />
      </motion.div>
    </div>
  );
};

export default Hero;
