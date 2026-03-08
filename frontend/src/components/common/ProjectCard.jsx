import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiArrowUpRight,
  FiX,
  FiMaximize2,
} from "react-icons/fi";
import useBodyScrollLock from "../../hooks/useBodyScrollLock ";

/* ── variants ── */
const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 16,
    transition: { duration: 0.22 },
  },
};

/* ══ Description Modal ══ */
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

      {/* Modal Panel */}
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative z-10 w-full max-w-2xl max-h-[85vh] bg-card border border-border rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
        style={{
          boxShadow: "0 30px 80px var(--brand-glow, rgba(139,92,246,0.2))",
        }}
      >
        {/* ── Modal Header Image ── */}
        <div className="relative h-52 shrink-0 overflow-hidden bg-secondary">
          {image?.url && (
            <img
              src={image.url}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

          {/* Category pill */}
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] backdrop-blur-md border"
            style={{
              background: "var(--brand-muted)",
              borderColor: "var(--brand-border)",
              color: "var(--brand-soft, var(--brand))",
            }}
          >
            {category ?? "Project"}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-background/70 backdrop-blur-md border border-border text-muted-foreground hover:text-foreground hover:border-[var(--brand-border)] transition-all duration-200"
          >
            <FiX size={14} />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-4 left-5 right-5">
            <h3
              className="text-2xl font-bold italic font-serif text-foreground leading-tight"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
            >
              {title}
            </h3>
          </div>
        </div>

        {/* ── Modal Body ── */}
        <div className="flex flex-col gap-5 p-7 overflow-y-auto">
          {/* Rich text description */}
          <div
            className="text-muted-foreground text-sm leading-relaxed
              [&_p]:mb-3 [&_p:last-child]:mb-0
              [&_strong]:font-semibold [&_strong]:text-foreground
              [&_em]:italic
              [&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-foreground [&_h1]:mb-2
              [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mb-2
              [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mb-1
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1
              [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1
              [&_li]:text-muted-foreground
              [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono [&_code]:text-foreground
              [&_a]:underline [&_a]:underline-offset-2 [&_a]:text-[var(--brand)]"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          {/* Tech tags */}
          {technologies?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
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

          {/* Action buttons */}
          <div className="flex gap-3">
            <motion.a
              whileTap={{ scale: 0.97 }}
              href={githubRepo}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-secondary/50 hover:bg-secondary text-sm font-bold text-foreground transition-all duration-200 hover:border-[var(--brand-border)]"
            >
              <FiGithub size={14} />
              <span>View Code</span>
            </motion.a>
            <motion.a
              whileTap={{ scale: 0.97 }}
              href={liveLink}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-90"
              style={{
                background: "var(--brand)",
                color: "var(--brand-foreground, #fff)",
              }}
            >
              <FiArrowUpRight size={14} />
              <span>Live Demo</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ══ Project Card ══ */
const ProjectCard = ({ project, index }) => {
  const [showModal, setShowModal] = useState(false);
  const { image, title, description, category, liveLink, githubRepo } = project;

  return (
    <>
      <motion.div
        key={project._id}
        layout
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="group relative flex flex-col bg-card rounded-[2rem] border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-[var(--brand-border)] transition-all duration-300"
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow =
            "0 20px 60px var(--brand-glow, rgba(139,92,246,0.15))")
        }
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "")}
      >
        {/* ── Image ── */}
        <div className="relative h-56 overflow-hidden bg-secondary">
          <motion.img
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            src={image?.url}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />

          {/* category pill */}
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] backdrop-blur-md border"
            style={{
              background: "var(--brand-muted)",
              borderColor: "var(--brand-border)",
              color: "var(--brand-soft, var(--brand))",
            }}
          >
            {category ?? "Demo"}
          </div>

          {/* featured badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-400/20 border border-amber-400/30 text-amber-400 backdrop-blur-md">
              Featured
            </div>
          )}

          {/* hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center gap-4 bg-background/60 backdrop-blur-sm"
          >
            <a
              href={githubRepo}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors duration-200"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--brand)";
                e.currentTarget.style.borderColor = "var(--brand-border)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "";
                e.currentTarget.style.borderColor = "";
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <FiGithub size={16} />
            </a>
            <a
              href={liveLink}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl border text-brand-fg transition-colors duration-200"
              style={{
                background: "var(--brand)",
                borderColor: "var(--brand)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <FiExternalLink size={16} />
            </a>
          </motion.div>
        </div>

        {/* ── Content ── */}
        <div className="p-7 flex flex-col flex-grow gap-4">
          <h3
            className="text-xl font-bold italic font-serif text-foreground transition-colors duration-200"
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "")}
          >
            {title}
          </h3>

          {/* ── Clamped description + Read More ── */}
          <div className="flex flex-col gap-2 flex-grow">
            <div
              className="text-muted-foreground text-sm leading-relaxed line-clamp-2
                [&_strong]:font-semibold [&_strong]:text-foreground
                [&_em]:italic [&_p]:inline"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <button
              onClick={() => setShowModal(true)}
              className="self-start flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 hover:opacity-80 mt-0.5"
              style={{ color: "var(--brand)" }}
            >
              <FiMaximize2 size={11} />
              <span>Read More</span>
            </button>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies?.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg border text-[10px] font-mono font-bold uppercase text-muted-foreground transition-colors duration-200 hover:text-[var(--brand)] hover:border-[var(--brand-border)] hover:bg-[var(--brand-muted)] cursor-default"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--secondary)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="h-px w-full bg-border" />

          {/* Action row */}
          <div className="flex gap-3 items-center">
            <motion.a
              whileTap={{ scale: 0.97 }}
              href={githubRepo}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-secondary/50 hover:bg-secondary text-sm font-bold text-foreground transition-all duration-200 hover:border-[var(--brand-border)]"
            >
              <FiGithub size={14} />
              <span>Code</span>
            </motion.a>
            <motion.a
              target="_blank"
              rel="noreferrer"
              whileTap={{ scale: 0.97 }}
              href={liveLink}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-90"
              style={{
                background: "var(--brand)",
                color: "var(--brand-foreground, #fff)",
              }}
            >
              <FiArrowUpRight size={14} />
              <span>Live</span>
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* ── Description Modal ── */}
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
