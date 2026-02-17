import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiDownload, FiCode } from "react-icons/fi";

const Hero = () => {
  const containerRef = useRef(null);

  /* ─── Animation Variants ────────────────────────────────────────── */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  /* ─── Decorative element counts ─────────────────────────────────── */
  const bubbles = Array.from({ length: 6 });
  const stars = Array.from({ length: 12 });

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center antialiased"
    >
      {/* ── Background Decorative Layer ───────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Grid Overlay — uses CSS vars so it respects light/dark automatically */}
        <div
          className="absolute inset-0"
          style={{
            backgroundSize: "50px 50px",
            backgroundImage: `
              linear-gradient(to right,  color-mix(in oklch, var(--foreground) 5%, transparent) 1px, transparent 1px),
              linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 5%, transparent) 1px, transparent 1px)
            `,
          }}
        />

        {/* Main Center Glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.07, 0.15, 0.07] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary rounded-full blur-[120px]"
        />

        {/* Floating Bubbles */}
        {bubbles.map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-primary/10 blur-xl"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -40, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Twinkling Stars */}
        {stars.map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* ── Main Content ──────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container relative z-10 mx-auto px-6 pt-20"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Status Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border backdrop-blur-md mb-4"
          >
            {/* Availability dot — accent color intentionally kept outside token system */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Available for new projects
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-5xl md:text-8xl font-black tracking-tight text-foreground leading-[1.1]">
              Shohag{" "}
              <span className="text-muted-foreground italic font-serif">
                Miah
              </span>
            </h1>
            <div className="flex items-center justify-center gap-3">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="h-px bg-primary"
              />
              <h2 className="text-lg md:text-2xl font-medium text-primary tracking-wide uppercase">
                Full Stack Developer
              </h2>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="h-px bg-primary"
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Building the future of the web with 3.5 years of experience.
            Currently architecting scalable solutions at{" "}
            <span className="text-foreground font-semibold underline decoration-primary/30 underline-offset-4">
              Philips University
            </span>
            .
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="group relative w-full sm:w-auto flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 rounded-2xl font-bold transition-all shadow-lg hover:shadow-primary/20"
            >
              View My Work
              <FiArrowUpRight className="text-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              target="_blank"
              className="relative w-full sm:w-auto flex items-center justify-center gap-2 bg-secondary/50 border border-border backdrop-blur-xl px-6 py-3 rounded-2xl font-bold transition-all hover:bg-secondary hover:border-primary/30"
            >
              <FiDownload />
              Download CV
            </motion.a>
          </motion.div>

          {/* Tech Peek */}
          <motion.div
            variants={itemVariants}
            className="pt-12 flex flex-col items-center gap-4"
          >
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">
              Tech Stack Spotlight
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-2xl text-muted-foreground/50">
              <motion.div
                whileHover={{ color: "var(--color-primary)", rotate: 15 }}
              >
                <FiCode className="cursor-help" />
              </motion.div>
              <span className="hidden sm:block h-6 w-px bg-border" />
              {["React", "Next.js", "Node.js"].map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ y: -5, color: "var(--color-foreground)" }}
                  className="text-sm font-mono cursor-default px-2"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll Indicator ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1 h-12 rounded-full bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </div>
  );
};

export default Hero;
