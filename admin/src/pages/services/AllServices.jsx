import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as FiIcons from "react-icons/fi";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiAlertTriangle,
  FiCheckCircle,
  FiMoreVertical,
} from "react-icons/fi";
import { Link } from "react-router-dom";

/* ─── Mock Data ───────────────────────────────────────────────────── */
const INITIAL_SERVICES = [
  {
    id: 1,
    title: "Frontend Development",
    description: "Crafting visually stunning interfaces...",
    icon: "FiLayout",
    tags: ["React", "Next.js"],
  },
  {
    id: 2,
    title: "Backend Architecture",
    description: "Designing scalable server-side logic...",
    icon: "FiServer",
    tags: ["Node.js", "Express"],
  },
  {
    id: 3,
    title: "Full Stack Solutions",
    description: "End-to-end product development...",
    icon: "FiLayers",
    tags: ["MERN Stack"],
  },
];

/* ─── Icon Renderer Helper ────────────────────────────────────────── */
const IconRenderer = ({ name, className }) => {
  const IconComponent = FiIcons[name] || FiIcons.FiHelpCircle;
  return <IconComponent className={className} />;
};

const AllServices = () => {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [search, setSearch] = useState("");
  const [toDelete, setToDelete] = useState(null);
  const [deletedTitle, setDeletedTitle] = useState(null);

  const filtered = services.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())),
  );

  const handleDeleteConfirm = () => {
    setServices((prev) => prev.filter((s) => s.id !== toDelete.id));
    setDeletedTitle(toDelete.title);
    setToDelete(null);
    setTimeout(() => setDeletedTitle(null), 3000);
  };

  return (
    <section className="py-10 bg-background min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* ── Header ────────────────────────────────────────────── */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Service{" "}
                <span className="text-muted-foreground italic serif">
                  Management
                </span>
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage and update your service offerings
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search services..."
                  className="pl-10 pr-4 py-2 rounded-xl bg-card border border-border text-sm focus:ring-2 focus:ring-primary/20 outline-none w-64 transition-all"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Link
                to="/admin/services/new"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-all shadow-sm"
              >
                <FiPlus /> New Service
              </Link>
            </div>
          </div>

          {/* ── Toast ─────────────────────────────────────────────── */}
          <AnimatePresence>
            {deletedTitle && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-3 text-sm font-medium text-primary"
              >
                <FiCheckCircle /> Service "{deletedTitle}" removed.
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Table Container ───────────────────────────────────── */}
          <div className="bg-card border border-border rounded-[2rem] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Service
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hidden md:table-cell">
                      Description
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Tech Stack
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filtered.map((service) => (
                    <tr
                      key={service.id}
                      className="group hover:bg-muted/20 transition-colors"
                    >
                      {/* Service Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary text-lg group-hover:bg-primary group-hover:text-white transition-all">
                            <IconRenderer name={service.icon} />
                          </div>
                          <span className="font-bold text-sm text-foreground">
                            {service.title}
                          </span>
                        </div>
                      </td>

                      {/* Description */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        <p className="text-xs text-muted-foreground line-clamp-1 max-w-[250px]">
                          {service.description}
                        </p>
                      </td>

                      {/* Tech Stack */}
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {service.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-[9px] font-bold bg-secondary px-2 py-0.5 rounded-md text-muted-foreground uppercase"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/services/edit/${service.id}`}
                            className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <FiEdit2 size={14} />
                          </Link>
                          <button
                            onClick={() => setToDelete(service)}
                            className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <div className="py-20 text-center text-muted-foreground text-sm">
                  No services found matching your search.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Delete Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {toDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-card border border-border rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive mb-4">
                <FiAlertTriangle size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Delete this service?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                This will permanently remove "{toDelete.title}" from your
                portfolio.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setToDelete(null)}
                  className="flex-1 py-2.5 rounded-xl border border-border font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 py-2.5 rounded-xl bg-destructive text-white font-semibold text-sm"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AllServices;
