import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";

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

/* ── Project Card ── */
const ProjectCard = ({ project, index }) => (
  <motion.div
    key={project.id}
    layout
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 260, damping: 22 }}
    className="group relative flex flex-col bg-card rounded-[2rem] border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-[var(--brand-border)] transition-all duration-300"
    style={{ "--hover-shadow": "0 20px 60px var(--brand-glow)" }}
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
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
      />

      {/* gradient overlay */}
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
        {project.category}
      </div>

      {/* featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-400/20 border border-amber-400/30 text-amber-400 backdrop-blur-md">
          Featured
        </div>
      )}

      {/* hover overlay with quick-action icons */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 flex items-center justify-center gap-4 bg-background/60 backdrop-blur-sm"
      >
        <a
          href={project.github}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-card text-foreground hover:text-brand hover:border-brand transition-colors duration-200"
          style={{ "--hover-color": "var(--brand)" }}
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
          href={project.live}
          className="w-10 h-10 flex items-center justify-center rounded-xl border text-brand-fg transition-colors duration-200"
          style={{ background: "var(--brand)", borderColor: "var(--brand)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <FiExternalLink size={16} />
        </a>
      </motion.div>
    </div>

    {/* ── Content ── */}
    <div className="p-7 flex flex-col flex-grow gap-4">
      <h3
        className="text-xl font-bold italic font-serif text-foreground group-hover:transition-colors duration-200"
        style={{ "--hover-c": "var(--brand)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "")}
      >
        {project.title}
      </h3>

      <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
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

      {/* divider */}
      <div className="h-px w-full bg-border" />

      {/* Action row */}
      <div className="flex gap-3 items-center">
        <motion.a
          whileTap={{ scale: 0.97 }}
          href={project.github}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-secondary/50 hover:bg-secondary text-sm font-bold text-foreground transition-all duration-200 hover:border-[var(--brand-border)]"
        >
          <FiGithub size={14} />
          <span>Code</span>
        </motion.a>
        <motion.a
          whileTap={{ scale: 0.97 }}
          href={project.live}
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
);

export default ProjectCard;
