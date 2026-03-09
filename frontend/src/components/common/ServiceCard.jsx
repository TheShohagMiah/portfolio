import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

// ─── fade-up variant ──────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  },
});

// ═══════════════════════════════════════════════════════════════
//  SERVICE CARD
// ═══════════════════════════════════════════════════════════════
const ServiceCard = ({ service, delay = 0, tall = false, accent = false }) => {
  const [hovered, setHovered] = useState(false);

  if (!service) return null;
  const Icon = service.icon;

  return (
    <motion.div
      variants={fadeUp(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`group relative rounded-3xl border overflow-hidden flex flex-col justify-between
        transition-all duration-300 cursor-default
        ${tall ? "min-h-[320px]" : "min-h-[240px]"} p-7`}
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--brand-border)";
        e.currentTarget.style.boxShadow = "0 16px 48px var(--brand-glow)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* ── Top accent line ───────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--brand), transparent)",
        }}
      />

      {/* ── Radial glow bloom ─────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 0%, var(--brand-muted), transparent)",
        }}
      />

      {/* ── Watermark icon ────────────────────────────────── */}
      <motion.div
        className="absolute -bottom-4 -right-4 pointer-events-none"
        animate={{ scale: hovered ? 1.12 : 1, opacity: hovered ? 0.18 : 0.05 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Icon size={100} className="text-foreground" />
      </motion.div>

      {/* ── Number index ──────────────────────────────────── */}
      <motion.span
        className="absolute top-6 right-6 text-[11px] font-black font-mono tabular-nums"
        animate={{
          opacity: hovered ? 0 : 0.2,
          y: hovered ? -4 : 0,
        }}
        transition={{ duration: 0.25 }}
        style={{ color: "var(--brand)" }}
      >
        {String(
          [
            "Frontend Development",
            "Backend Architecture",
            "Full Stack Solutions",
            "App Optimization",
          ].indexOf(service.title) + 1,
        ).padStart(2, "0")}
      </motion.span>

      {/* ── Stat badge — slides in on hover ───────────────── */}
      <motion.div
        className="absolute top-5 right-6 flex flex-col items-end"
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 6,
          scale: hovered ? 1 : 0.9,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          className="text-2xl font-black tabular-nums leading-none"
          style={{ color: "var(--brand)" }}
        >
          {service.stat}
        </span>
        <span className="text-[9px] font-black uppercase tracking-widest mt-0.5 text-muted-foreground/50 font-mono">
          {service.statLabel}
        </span>
      </motion.div>

      {/* ── Top row: icon + arrow ─────────────────────────── */}
      <div className="relative flex items-start justify-between">
        {/* Icon box */}
        <motion.div
          className="w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-300 shrink-0"
          animate={{
            background: hovered ? "var(--brand)" : "var(--brand-muted)",
            borderColor: hovered ? "var(--brand)" : "var(--brand-border)",
            color: hovered ? "#fff" : "var(--brand)",
            boxShadow: hovered ? "0 4px 16px var(--brand-glow)" : "none",
          }}
          transition={{ duration: 0.3 }}
        >
          <Icon size={18} />
        </motion.div>

        {/* Arrow */}
        <motion.div
          className="w-8 h-8 rounded-full flex items-center justify-center border"
          animate={{
            opacity: hovered ? 1 : 0,
            x: hovered ? 0 : -4,
            y: hovered ? 0 : 4,
            borderColor: "var(--brand-border)",
            color: "var(--brand)",
            background: "var(--brand-muted)",
          }}
          transition={{ duration: 0.25 }}
        >
          <FiArrowUpRight size={14} />
        </motion.div>
      </div>

      {/* ── Content ───────────────────────────────────────── */}
      <div className="relative mt-auto space-y-3">
        <h3
          className={`font-bold tracking-tight leading-tight transition-colors duration-200
            ${tall ? "text-xl" : "text-lg"} ${hovered ? "" : "text-foreground"}`}
          style={hovered ? { color: "var(--brand)" } : {}}
        >
          {service.title}
        </h3>

        <p className="text-sm leading-relaxed line-clamp-3 text-muted-foreground">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {service.tags?.map((tag) => (
            <motion.span
              key={tag}
              animate={
                hovered
                  ? {
                      borderColor: "var(--brand-border)",
                      background: "var(--brand-muted)",
                      color: "var(--brand)",
                    }
                  : {
                      borderColor: "var(--border)",
                      background: "var(--secondary)",
                      color: "var(--muted-foreground)",
                    }
              }
              transition={{ duration: 0.25 }}
              className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-black uppercase tracking-wide border"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
