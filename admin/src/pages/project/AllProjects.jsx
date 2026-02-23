import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiEdit2,
  FiExternalLink,
  FiGithub,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiGlobe,
  FiFilter,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    slug: "ecommerce-dashboard",
    tags: ["React", "Tailwind", "Node.js"],
    liveLink: "https://demo.com",
    githubLink: "https://github.com",
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1551288049-bbbda546697a?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    title: "Portfolio Website",
    slug: "portfolio-website",
    tags: ["Next.js", "Framer Motion"],
    liveLink: "https://portfolio.com",
    githubLink: "https://github.com",
    status: "Draft",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop",
  },
];

const AllProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProjects = MOCK_PROJECTS.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section className="py-12 min-h-screen text-foreground selection:bg-primary/30">
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Header: Vault Control ────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                Index Manager
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter">
              Project{" "}
              <span className="text-primary italic font-serif">Vault.</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-sm">
              Review, edit, or decommission items from your public technical
              archive.
            </p>
          </div>

          <Link
            to="/admin/projects/new"
            className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-primary/20 active:scale-95"
          >
            <FiPlus
              size={18}
              className="group-hover:rotate-90 transition-transform"
            />
            Add New Entry
          </Link>
        </div>

        {/* ── Search & Metrics ─────────────────────────────────── */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by title or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-card border border-border rounded-[1.25rem] py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all"
            />
          </div>

          <div className="flex gap-2">
            <button className="px-5 py-4 bg-secondary border border-border rounded-[1.25rem] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
              <FiFilter size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">
                Filter
              </span>
            </button>
            <div className="px-6 py-4 bg-secondary/50 border border-border rounded-[1.25rem] flex items-center gap-3">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Vault Size
              </span>
              <span className="text-foreground font-mono font-bold">
                {filteredProjects.length}
              </span>
            </div>
          </div>
        </div>

        {/* ── Project Table ────────────────────────────────────── */}
        <div className="bg-card border border-border rounded-[2.5rem] shadow-2xl overflow-hidden relative">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Project Identity
                  </th>
                  <th className="px-6 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Stack
                  </th>
                  <th className="px-6 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Endpoints
                  </th>
                  <th className="px-6 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Status
                  </th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, i) => (
                    <motion.tr
                      key={project.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05 }}
                      className="group hover:bg-secondary/30 transition-colors"
                    >
                      {/* Identity: Image + Name */}
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-11 rounded-xl bg-muted overflow-hidden border border-border flex-shrink-0 relative group-hover:border-primary/30 transition-colors shadow-inner">
                            <img
                              src={project.image}
                              alt=""
                              className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold tracking-tight group-hover:text-primary transition-colors">
                              {project.title}
                            </span>
                            <span className="text-[11px] text-muted-foreground font-mono opacity-50">
                              /{project.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Tech Stack Tags */}
                      <td className="px-6 py-6">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-lg bg-secondary text-[10px] font-medium text-muted-foreground border border-border group-hover:border-primary/10 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Deployment Links */}
                      <td className="px-6 py-6">
                        <div className="flex flex-col gap-2">
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors w-fit group/link"
                          >
                            <FiGlobe className="group-hover/link:rotate-12 transition-transform" />
                            Live Launch
                          </a>
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground/60 hover:text-foreground transition-colors w-fit"
                          >
                            <FiGithub />
                            Source
                          </a>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-6">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            project.status === "Published"
                              ? "bg-chart-2/10 text-chart-2 border border-chart-2/20"
                              : "bg-muted text-muted-foreground border border-border"
                          }`}
                        >
                          <div
                            className={`w-1 h-1 rounded-full ${project.status === "Published" ? "bg-chart-2 animate-pulse" : "bg-muted-foreground"}`}
                          />
                          {project.status}
                        </div>
                      </td>

                      {/* Action Suite */}
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button className="p-3 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground transition-all shadow-sm active:scale-90">
                            <FiEdit2 size={14} />
                          </button>
                          <button className="p-3 rounded-xl bg-secondary hover:bg-destructive hover:text-destructive-foreground transition-all shadow-sm active:scale-90">
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Empty State Logic */}
          {filteredProjects.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
                No matching records found in vault.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllProjects;
