import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiGithub } from "react-icons/fi";
import ProjectCard from "../common/ProjectCard";
import axiosInstance from "../../lib/axios";

const CATEGORIES = ["All", "Full Stack", "Frontend", "Backend"];

// ═══════════════════════════════════════════════════════════════
//  SKELETON CARD
// ═══════════════════════════════════════════════════════════════
const SkeletonCard = ({ i }) => (
  <div
    className="flex flex-col bg-card rounded-3xl border border-border overflow-hidden"
    style={{ animationDelay: `${i * 0.07}s` }}
  >
    <div className="h-52 bg-muted animate-pulse" />
    <div className="p-6 space-y-4">
      <div className="h-4 bg-muted rounded-full animate-pulse w-3/4" />
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded-full animate-pulse" />
        <div className="h-3 bg-muted rounded-full animate-pulse w-5/6" />
      </div>
      <div className="flex gap-2">
        {[40, 52, 44].map((w, j) => (
          <div
            key={j}
            className="h-6 bg-muted rounded-lg animate-pulse"
            style={{ width: w }}
          />
        ))}
      </div>
      <div className="flex gap-3 pt-1">
        <div className="flex-1 h-10 bg-muted rounded-xl animate-pulse" />
        <div className="flex-1 h-10 bg-muted rounded-xl animate-pulse" />
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
//  EMPTY STATE
// ═══════════════════════════════════════════════════════════════
const EmptyState = ({ filter }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="col-span-full flex flex-col items-center justify-center gap-4 py-24"
  >
    <div
      className="w-16 h-16 rounded-3xl border border-border flex items-center justify-center"
      style={{ background: "var(--secondary)" }}
    >
      <FiGithub size={22} className="text-muted-foreground/30" />
    </div>
    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 font-mono">
      No {filter !== "All" ? filter : ""} projects yet
    </p>
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════════
const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/api/projects", {
          signal: controller.signal,
        });
        if (res.data.success) setProjects(res.data.data);
      } catch (err) {
        if (!axiosInstance.isCancel?.(err)) console.error(err);
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  // counts per category for badges
  const countFor = (cat) =>
    cat === "All"
      ? projects.length
      : projects.filter((p) => p.category === cat).length;

  return (
    <section
      id="projects"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      {/* ── Ambient glows ──────────────────────────────────── */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.09, 0.05] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/4 -right-20 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "var(--brand)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 14, repeat: Infinity, delay: 4 }}
        className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
        style={{ background: "var(--brand)" }}
      />

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* ══ Header ════════════════════════════════════════ */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
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
                  Portfolio
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                Selected{" "}
                <span className="text-muted-foreground italic font-serif font-normal">
                  Works.
                </span>
              </h2>
              <p className="text-muted-foreground max-w-md leading-relaxed text-base">
                A curated selection of digital experiences built with clean code
                and purpose.
              </p>
            </motion.div>

            {/* ── Filter tabs ───────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-1.5 bg-secondary/40 backdrop-blur-md p-1.5 rounded-2xl border border-border w-fit"
            >
              {CATEGORIES.map((cat) => {
                const isActive = filter === cat;
                const count = countFor(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className="relative px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors duration-200 font-mono flex items-center gap-2"
                  >
                    <span
                      className={`relative z-10 transition-colors duration-200 ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat}
                    </span>
                    {/* Count badge */}
                    {!loading && count > 0 && (
                      <span
                        className={`relative z-10 text-[8px] font-black px-1.5 py-0.5 rounded-full font-mono transition-all ${
                          isActive
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground/50"
                        }`}
                      >
                        {count}
                      </span>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-xl shadow-sm"
                        style={{
                          background: "var(--brand-muted)",
                          border: "1px solid var(--brand-border)",
                        }}
                        transition={{
                          type: "spring",
                          bounce: 0.25,
                          duration: 0.55,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* ══ Grid ══════════════════════════════════════════ */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]"
          >
            {/* Skeletons */}
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} i={i} />
              ))}

            {/* Cards */}
            {!loading && (
              <AnimatePresence mode="popLayout">
                {filtered.length > 0 ? (
                  filtered.map((project, i) => (
                    <ProjectCard
                      key={project._id}
                      project={project}
                      index={i}
                    />
                  ))
                ) : (
                  <EmptyState filter={filter} />
                )}
              </AnimatePresence>
            )}
          </motion.div>

          {/* ══ Footer CTA ════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-5"
          >
            <div
              className="h-px w-20 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--brand), transparent)",
              }}
            />
            <motion.a
              whileHover={{ x: 5 }}
              href="https://github.com/shohag"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 text-base font-bold text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <span>Explore Full Archive on GitHub</span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full border border-border group-hover:bg-[var(--brand-muted)] group-hover:border-[var(--brand-border)] transition-all duration-200">
                <FiArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  style={{ color: "var(--brand)" }}
                />
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
