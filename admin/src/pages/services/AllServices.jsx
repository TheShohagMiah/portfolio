import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiLayout,
  FiServer,
  FiLayers,
  FiZap,
  FiCode,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiArrowUpRight,
  FiSearch,
  FiAlertTriangle,
  FiCheckCircle,
} from "react-icons/fi";
import { Link } from "react-router-dom";

/* ─── Icon Map ────────────────────────────────────────────────────── */
const ICONS = {
  FiLayout: <FiLayout />,
  FiServer: <FiServer />,
  FiLayers: <FiLayers />,
  FiZap: <FiZap />,
  FiCode: <FiCode />,
};

/* ─── Mock Data ───────────────────────────────────────────────────── */
const INITIAL_SERVICES = [
  {
    id: 1,
    title: "Frontend Development",
    description:
      "Crafting visually stunning, high-performance user interfaces using React and Next.js.",
    icon: "FiLayout",
    tags: ["React", "Next.js", "Tailwind"],
  },
  {
    id: 2,
    title: "Backend Architecture",
    description:
      "Designing scalable server-side logic and database schemas. RESTful APIs and secure auth flows.",
    icon: "FiServer",
    tags: ["Node.js", "Express", "MongoDB"],
  },
  {
    id: 3,
    title: "Full Stack Solutions",
    description:
      "End-to-end product development from wireframing to final deployment.",
    icon: "FiLayers",
    tags: ["MERN Stack", "T3 Stack"],
  },
  {
    id: 4,
    title: "App Optimization",
    description:
      "Refactoring legacy codebases for speed, SEO, and accessibility.",
    icon: "FiZap",
    tags: ["SEO", "Performance", "UX"],
  },
];

/* ─── Animation Variants ──────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { scale: 0.95, opacity: 0, transition: { duration: 0.25 } },
};

/* ─── Delete Confirm Modal ────────────────────────────────────────── */
const DeleteModal = ({ service, onConfirm, onCancel }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
    onClick={onCancel}
  >
    <motion.div
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.92, opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md bg-card border border-border rounded-[2rem] p-8 space-y-6 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
          <FiAlertTriangle size={22} className="text-destructive" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">Delete Service</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              "{service.title}"
            </span>
            ? This action cannot be undone.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted border border-border transition-all duration-200"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-destructive text-white hover:opacity-90 transition-all duration-200 shadow-md"
        >
          Delete
        </button>
      </div>
    </motion.div>
  </motion.div>
);

/* ─── Service Card ────────────────────────────────────────────────── */
const ServiceCard = ({ service, onDelete }) => (
  <motion.div
    layout
    variants={cardVariants}
    exit="exit"
    whileHover={{ y: -6 }}
    className="group relative p-8 rounded-[2.5rem] bg-card border border-border hover:border-primary/20 transition-colors duration-500 hover:shadow-2xl hover:shadow-primary/5"
  >
    {/* Icon */}
    <div className="mb-6 w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-3xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
      {ICONS[service.icon] ?? <FiLayout />}
    </div>

    {/* Content */}
    <div className="space-y-3 pr-10">
      <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
        {service.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
        {service.description}
      </p>
    </div>

    {/* Tags */}
    <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-border/50">
      {service.tags.map((tag, i) => (
        <span
          key={i}
          className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-secondary/50 px-3 py-1 rounded-lg"
        >
          {tag}
        </span>
      ))}
    </div>

    {/* Action Buttons */}
    <div className="absolute top-8 right-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
      <Link
        to={`/admin/services/edit/${service.id}`}
        className="w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
      >
        <FiEdit2 size={15} />
      </Link>
      <button
        onClick={() => onDelete(service)}
        className="w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/5 transition-all duration-200"
      >
        <FiTrash2 size={15} />
      </button>
    </div>

    {/* Decorative Arrow */}
    <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-30 transition-all duration-500 hidden md:block">
      <FiArrowUpRight size={20} className="text-primary" />
    </div>
  </motion.div>
);

/* ─── AllServices ─────────────────────────────────────────────────── */
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
    setTimeout(() => setDeletedTitle(null), 3500);
  };

  return (
    <section className="py-10 bg-background min-h-screen overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* ── Page Header ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[2px] w-12 bg-primary" />
                <span className="text-primary font-bold uppercase tracking-widest text-xs">
                  Admin Panel
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                All{" "}
                <span className="text-muted-foreground italic font-serif">
                  Services.
                </span>
              </h1>
              <p className="mt-3 text-muted-foreground">
                {services.length} service{services.length !== 1 ? "s" : ""}{" "}
                total
              </p>
            </div>

            {/* Top-right: Search + Add */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="relative">
                <FiSearch
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Search services…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2.5 rounded-2xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 w-56"
                />
              </div>
              <Link
                to="/admin/services/new"
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all duration-200 shadow-md"
              >
                <FiPlus size={16} />
                Add Service
              </Link>
            </div>
          </motion.div>

          {/* ── Toast: Deleted ───────────────────────────────────── */}
          <AnimatePresence>
            {deletedTitle && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-8 flex items-center gap-3 px-5 py-4 rounded-2xl bg-card border border-border text-sm font-medium"
              >
                <FiCheckCircle
                  className="text-primary flex-shrink-0"
                  size={18}
                />
                <span className="text-foreground">
                  <span className="font-semibold">"{deletedTitle}"</span> was
                  deleted successfully.
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Grid ─────────────────────────────────────────────── */}
          {filtered.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onDelete={setToDelete}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-3xl text-muted-foreground mb-6">
                <FiSearch />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                No services found
              </h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                {search
                  ? `No results for "${search}". Try a different search term.`
                  : "You haven't added any services yet."}
              </p>
              {!search && (
                <Link
                  to="/admin/services/new"
                  className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all duration-200 shadow-md"
                >
                  <FiPlus size={16} />
                  Add your first service
                </Link>
              )}
            </motion.div>
          )}

          {/* ── Summary CTA ──────────────────────────────────────── */}
          {services.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-20 p-8 md:p-12 rounded-[3rem] bg-secondary/30 border border-border flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl pointer-events-none" />
              <div className="text-center md:text-left relative z-10">
                <h4 className="text-2xl font-bold mb-2">
                  {services.length} service{services.length !== 1 ? "s" : ""}{" "}
                  live on your portfolio
                </h4>
                <p className="text-muted-foreground">
                  Visitors can see these on your public services section.
                </p>
              </div>
              <Link
                to="/admin/services/new"
                className="flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-2xl font-bold shadow-lg hover:opacity-90 transition-all z-10"
              >
                <FiPlus size={18} />
                Add Another
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Delete Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {toDelete && (
          <DeleteModal
            service={toDelete}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setToDelete(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default AllServices;
