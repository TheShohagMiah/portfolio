import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiArrowUpRight,
  FiX,
  FiCode,
  FiMaximize2,
} from "react-icons/fi";
import useBodyScrollLock from "../../hooks/useBodyScrollLock ";

// ═══════════════════════════════════════════════════════════════
//  MOTION VARIANTS
// ═══════════════════════════════════════════════════════════════
const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 },
  }),
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.22 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, scale: 0.94, y: 16, transition: { duration: 0.22 } },
};

// ═══════════════════════════════════════════════════════════════
//  DESCRIPTION MODAL — unchanged design, polished details
// ═══════════════════════════════════════════════════════════════
const DescriptionModal = ({ project, onClose }) => {
  useBodyScrollLock(true);
  const {
    title,
    description,
    category,
    technologies,
    liveLink,
    githubRepo,
    image,
  } = project;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative z-10 w-full max-w-2xl max-h-[88vh] bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        style={{
          boxShadow: "0 32px 80px var(--brand-glow, rgba(139,92,246,0.2))",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-20" />

        {/* Image */}
        <div className="relative h-56 shrink-0 overflow-hidden bg-secondary">
          {image?.url ? (
            <img
              src={image.url}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FiCode size={40} className="text-muted-foreground/20" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

          {/* Category */}
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.25em] backdrop-blur-md border font-mono"
            style={{
              background: "var(--brand-muted)",
              borderColor: "var(--brand-border)",
              color: "var(--brand-soft, var(--brand))",
            }}
          >
            {category ?? "Project"}
          </div>

          {/* Featured */}
          {project.featured && (
            <div className="absolute top-4 right-14 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-400/20 border border-amber-400/30 text-amber-400 backdrop-blur-md">
              ★ Featured
            </div>
          )}

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl bg-background/70 backdrop-blur-md border border-border text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/10 transition-all duration-200"
          >
            <FiX size={13} />
          </button>

          {/* Title */}
          <div className="absolute bottom-4 left-5 right-5">
            <h3
              className="text-2xl font-bold italic font-serif text-foreground leading-tight"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
            >
              {title}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div
          className="flex flex-col gap-5 p-7 overflow-y-auto
            [&::-webkit-scrollbar]:w-1
            [&::-webkit-scrollbar-thumb]:bg-border
            [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          <div
            className="text-muted-foreground text-sm leading-relaxed
              [&_p]:mb-3 [&_p:last-child]:mb-0
              [&_strong]:font-semibold [&_strong]:text-foreground
              [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mb-2
              [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mb-1
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1
              [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1
              [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono
              [&_a]:underline [&_a]:underline-offset-2 [&_a]:text-[var(--brand)]"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          {technologies?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg border text-[10px] font-mono font-bold uppercase text-muted-foreground"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--secondary)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="h-px w-full bg-border" />

          <div className="flex gap-3">
            <motion.a
              whileTap={{ scale: 0.97 }}
              href={githubRepo}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-secondary/50 hover:bg-secondary text-sm font-bold text-foreground transition-all duration-200 hover:border-[var(--brand-border)]"
            >
              <FiGithub size={14} /> View Code
            </motion.a>
            <motion.a
              whileTap={{ scale: 0.97 }}
              href={liveLink}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-90"
              style={{
                background: "var(--brand)",
                color: "var(--brand-foreground,#fff)",
              }}
            >
              <FiArrowUpRight size={14} /> Live Demo
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
//  PROJECT CARD — Glassmorphism Floating Card
// ═══════════════════════════════════════════════════════════════
const ProjectCard = ({ project, index }) => {
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(false);

  const {
    image,
    title,
    description,
    category,
    liveLink,
    githubRepo,
    technologies,
    featured,
  } = project;

  return (
    <>
      <motion.article
        layout
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="group relative rounded-3xl overflow-hidden cursor-default"
        style={{ aspectRatio: "4/5" }}
      >
        {/* ══ FULL BLEED BACKGROUND IMAGE ══════════════════ */}
        <div className="absolute inset-0">
          {image?.url ? (
            <motion.img
              src={image.url}
              alt={title}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: "var(--secondary)" }}
            >
              <FiCode size={48} className="text-muted-foreground/20" />
            </div>
          )}

          {/* Base dark gradient — always visible for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

          {/* Hover: extra brand tint overlay */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background:
                "linear-gradient(to top, color-mix(in oklch, var(--brand) 40%, black) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* ══ TOP ROW: pills ════════════════════════════════ */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          {/* Category */}
          <motion.div
            animate={{ y: hovered ? -2 : 0 }}
            transition={{ duration: 0.3 }}
            className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.25em] backdrop-blur-md border font-mono"
            style={{
              background: "rgba(0,0,0,0.4)",
              borderColor: "rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            {category ?? "Project"}
          </motion.div>

          {/* Featured */}
          {featured && (
            <motion.div
              animate={{ y: hovered ? -2 : 0 }}
              transition={{ duration: 0.3, delay: 0.04 }}
              className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-md border"
              style={{
                background: "rgba(251,191,36,0.15)",
                borderColor: "rgba(251,191,36,0.35)",
                color: "#fbbf24",
              }}
            >
              ★ Featured
            </motion.div>
          )}
        </div>

        {/* ══ GLASS PANEL — slides up on hover ═════════════ */}
        <motion.div
          className="absolute left-0 right-0 bottom-0"
          animate={{ y: hovered ? 0 : 52 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Frosted glass surface */}
          <div
            className="mx-3 mb-3 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(10,10,15,0.72)",
              backdropFilter: "blur(20px) saturate(1.4)",
              WebkitBackdropFilter: "blur(20px) saturate(1.4)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                "0 -8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Inner top accent */}
            <div
              className="h-[1px] w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
              }}
            />

            <div className="p-5 space-y-3.5">
              {/* Title */}
              <h3 className="text-lg font-bold italic font-serif text-white leading-snug">
                {title}
              </h3>

              {/* Description — only visible on hover */}
              <motion.div
                animate={{
                  opacity: hovered ? 1 : 0,
                  height: hovered ? "auto" : 0,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div
                  className="text-white/55 text-xs leading-relaxed line-clamp-2
                    [&_strong]:text-white/80 [&_p]:inline"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </motion.div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {technologies?.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {technologies?.length > 4 && (
                  <span
                    className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    +{technologies.length - 4}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div
                className="h-px w-full"
                style={{ background: "rgba(255,255,255,0.07)" }}
              />

              {/* Action row */}
              <div className="flex gap-2.5 items-center">
                {/* GitHub */}
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  href={githubRepo}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest font-mono text-white/70 hover:text-white transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                >
                  <FiGithub size={12} /> Code
                </motion.a>

                {/* Live */}
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  href={liveLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest font-mono text-white transition-all duration-200 hover:opacity-90"
                  style={{
                    background: "var(--brand)",
                    border: "1px solid transparent",
                  }}
                >
                  <FiExternalLink size={12} /> Live
                </motion.a>

                {/* Expand */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(true)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-white/50 hover:text-white transition-all duration-200 flex-shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                >
                  <FiMaximize2 size={13} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.article>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <DescriptionModal
            project={project}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
