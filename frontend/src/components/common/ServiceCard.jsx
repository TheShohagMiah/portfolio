import React from "react";
import {
  FiLayout,
  FiServer,
  FiLayers,
  FiZap,
  FiArrowUpRight,
} from "react-icons/fi";
import { motion } from "framer-motion";

/* ── fade-up variant ── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  },
});
const ServiceCard = ({ service, delay, tall = false, accent = false }) => {
  const Icon = service.icon;

  return (
    <motion.div
      variants={fadeUp(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`group relative rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-default
        ${tall ? "min-h-[320px]" : "min-h-[240px]"}
        p-7
      `}
      onMouseEnter={(e) => {
        if (!accent) e.currentTarget.style.borderColor = "var(--brand-border)";
      }}
      onMouseLeave={(e) => {
        if (!accent) e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      {/* card glow bloom */}

      <div
        className="absolute inset-0  opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 0%, var(--brand-muted), transparent)",
        }}
      />

      {/* decorative watermark icon */}
      <div
        className={`absolute -bottom-4 -right-4 transition-all duration-500 group-hover:scale-110 group-hover:opacity-20
          opacity-5`}
      >
        <Icon size={100} className={"text-foreground"} />
      </div>

      {/* top row: icon + arrow */}
      <div className="relative flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-300 shrink-0"
          style={{
            background: "var(--brand-muted)",
            borderColor: "var(--brand-border)",
            color: "var(--brand)",
          }}
        >
          <Icon size={18} />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -4, y: 4 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          className={`w-8 h-8 rounded-full flex items-center justify-center border opacity-0 group-hover:opacity-100 transition-all duration-300`}
          style={{
            borderColor: "var(--brand-border)",
            color: "var(--brand)",
            background: "var(--brand-muted)",
          }}
        >
          <FiArrowUpRight size={14} />
        </motion.div>
      </div>

      {/* content */}
      <div className="relative mt-auto space-y-3">
        <h3
          className={`font-bold tracking-tight leading-tight ${tall ? "text-xl" : "text-lg"}
            text-foreground group-hover:text-[var(--brand)] transition-colors duration-200`}
        >
          {service.title}
        </h3>

        <p
          className={`text-sm leading-relaxed line-clamp-3 text-muted-foreground`}
        >
          {service.description}
        </p>

        {/* tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wide border"
              style={{
                background: "var(--secondary)",
                borderColor: "var(--border)",
                color: "var(--muted-foreground)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* stat badge */}
      <div
        className={`absolute top-5 right-14 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0`}
      >
        <div className="flex flex-col items-end">
          <span
            className={`text-2xl font-black tabular-nums leading-none`}
            style={!accent ? {} : {}}
          >
            {service.stat}
          </span>
          <span
            className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 text-muted-foreground/60`}
          >
            {service.statLabel}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
