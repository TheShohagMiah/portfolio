import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import ProjectCard from "../common/ProjectCard";

/* ── data ── */
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce application with user authentication, product management, and Stripe integration.",
    image: "/projects/ecommerce.jpg",
    category: "Full Stack",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "#",
    live: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Collaborative tool with real-time updates and drag-and-drop team collaboration features.",
    image: "/projects/taskmanager.jpg",
    category: "Full Stack",
    technologies: ["Next.js", "Prisma", "Socket.io", "Tailwind"],
    github: "#",
    live: "#",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "Real-time weather application with location forecasts and interactive maps using OpenWeather API.",
    image: "/projects/weather.jpg",
    category: "Frontend",
    technologies: ["React", "TypeScript", "Chart.js"],
    github: "#",
    live: "#",
  },
];

const CATEGORIES = ["All", "Full Stack", "Frontend", "Backend"];

/* ══ Main Component ══ */
const Projects = () => {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="py-20 md:py-32 bg-background relative overflow-hidden"
    >
      {/* bg accent */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/4 -right-20 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "var(--brand)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 14, repeat: Infinity, delay: 4 }}
        className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
        style={{ background: "var(--brand)" }}
      />

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* ══ Header + Filter ══ */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
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

            {/* Filter tabs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-1.5 bg-secondary/40 backdrop-blur-md p-1.5 rounded-2xl border border-border w-fit"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className="relative px-5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-colors duration-200"
                >
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      filter === cat
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </span>
                  {filter === cat && (
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
              ))}
            </motion.div>
          </div>

          {/* ══ Grid ══ */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 min-h-[400px]"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ══ View More ══ */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 flex flex-col items-center gap-5"
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
              className="group flex items-center gap-3 text-base font-bold text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <span>Explore Full Archive on GitHub</span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full border border-border group-hover:border-[var(--brand-border)] group-hover:bg-[var(--brand-muted)] transition-all duration-200">
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
