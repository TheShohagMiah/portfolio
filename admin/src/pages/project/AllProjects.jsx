import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiGlobe,
  FiFilter,
  FiGithub,
  FiChevronUp,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import axios from "axios";
import DeleteModal from "../../components/shared/DeleteModal";
import {
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
} from "../../../constants/projectConstants";

// ─── Constants (Model এর enum অনুযায়ী) ────────────────────────
const CATEGORIES = PROJECT_CATEGORIES;
const STATUSES = PROJECT_STATUSES;

const SORT_FIELDS = [
  { label: "Date Created", value: "createdAt" },
  { label: "Date Updated", value: "updatedAt" },
  { label: "Title", value: "title" },
  { label: "Order", value: "order" },
];

const AllProjects = () => {
  // ── Data States ─────────────────────────────────────────────
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // ── Delete Modal ─────────────────────────────────────────────
  const [openDeleteModal, setOpenDeleteModal] = useState(null);

  // ── 🔍 SEARCH State ──────────────────────────────────────────
  const [search, setSearch] = useState("");

  // ── 🔴 FILTER States ─────────────────────────────────────────
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  // ── 🟡 SORT States ───────────────────────────────────────────
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  // ── 🟢 PAGINATION States ─────────────────────────────────────
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);

  // ── Fetch Projects (Server-Side সব কিছু) ────────────────────
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      // শুধু যেগুলো value আছে সেগুলোই params এ পাঠাও
      const params = {
        page,
        limit,
        sortBy,
        order,
        ...(search && { search }),
        ...(category && { category }),
        ...(status && { status }),
        ...(technologies && { technologies }),
      };

      const { data } = await axios.get("http://localhost:5000/api/projects", {
        params,
        withCredentials: true,
      });

      if (data.success) {
        setProjects(data.data);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }, [search, category, status, technologies, sortBy, order, page, limit]);

  // search/filter বদলালে page ১ এ যাও
  useEffect(() => {
    setPage(1);
  }, [search, category, status, technologies, sortBy, order]);

  // যেকোনো state বদলালে fetch করো
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // ── Sort Toggle (Column Header Click) ───────────────────────
  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setOrder("desc");
    }
  };

  // ── Sort Icon ────────────────────────────────────────────────
  const SortIcon = ({ field }) => {
    if (sortBy !== field)
      return <FiChevronUp className="opacity-20" size={12} />;
    return order === "asc" ? (
      <FiChevronUp size={12} className="text-primary" />
    ) : (
      <FiChevronDown size={12} className="text-primary" />
    );
  };

  // ── Reset All Filters ────────────────────────────────────────
  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setStatus("");
    setTechnologies("");
    setSortBy("createdAt");
    setOrder("desc");
    setPage(1);
  };

  // ── Active Filter Count (Badge এর জন্য) ─────────────────────
  const activeFilterCount = [category, status, technologies].filter(
    Boolean,
  ).length;

  // ── Delete ───────────────────────────────────────────────────
  const handleDeleteProject = async (id) => {
    setOpenDeleteModal(null);
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/projects/${id}`,
        { withCredentials: true },
      );
      if (data.success) {
        toast.success(data.message);
        fetchProjects(); // Re-fetch করো
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Failed to delete.");
    }
  };

  // ── Status Style ─────────────────────────────────────────────
  const statusStyle = {
    published: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    draft: "bg-amber-500/10  text-amber-500  border-amber-500/20",
    pending: "bg-blue-500/10   text-blue-500   border-blue-500/20",
  };

  return (
    <section className="py-12 min-h-screen text-foreground selection:bg-primary/30">
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
            </div>
            <h1 className="text-4xl font-bold tracking-tighter">
              Project{" "}
              <span className="text-primary italic font-serif">Vault.</span>
            </h1>
          </div>
          <Link
            to="/admin/projects/new"
            className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-primary/20 active:scale-95"
          >
            <FiPlus
              size={18}
              className="group-hover:rotate-90 transition-transform"
            />
            Add New
          </Link>
        </div>

        {/* ── 🔍 Search + Filter Toggle ───────────────────────── */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search Input */}
          <div className="relative flex-1 group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-card border border-border rounded-[1.25rem] py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all"
            />
            {/* Search Clear Button */}
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <FiX size={14} />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilter((v) => !v)}
              className={`relative px-5 py-1 border rounded-[1.25rem] flex items-center gap-2 transition-colors
                ${
                  showFilter
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                }`}
            >
              <FiFilter size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">
                Filter
              </span>
              {/* Active Filter Count Badge */}
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground rounded-full text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Total Count */}
            <div className="px-6 py-1 bg-secondary/50 border border-border rounded-[1.25rem] flex items-center gap-3">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Total
              </span>
              <span className="text-foreground font-mono font-bold">
                {total}
              </span>
            </div>

            {/* Reset Button — শুধু active filter থাকলে দেখাবে */}
            {(search || activeFilterCount > 0) && (
              <button
                onClick={resetFilters}
                className="px-5 py-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-[1.25rem] text-xs font-bold uppercase tracking-widest hover:bg-destructive/20 transition-colors flex items-center gap-2"
              >
                <FiX size={14} /> Reset
              </button>
            )}
          </div>
        </div>

        {/* ── 🔴 Filter Panel ───────────────────────────���─────── */}
        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-card border border-border rounded-[1.5rem] p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground mb-2 block">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50"
                  >
                    <option value="">All Categories</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50"
                  >
                    <option value="">All Statuses</option>
                    {STATUSES.map((s) => (
                      <option key={s} value={s} className="capitalize">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Technologies Filter */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                    Technology
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. react,node,mongodb"
                    value={technologies}
                    onChange={(e) => setTechnologies(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Project Table ────────────────────────────────────── */}
        <div className="bg-card border border-border rounded-[2.5rem] shadow-2xl overflow-hidden">
          {loading ? (
            <div className="py-20 text-center">
              <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest animate-pulse">
                Loading vault...
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    {/* 🟡 Sortable Column Headers */}
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      <button
                        onClick={() => handleSort("title")}
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                      >
                        Project Identity <SortIcon field="title" />
                      </button>
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
                    <th className="px-6 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      <button
                        onClick={() => handleSort("createdAt")}
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                      >
                        Date <SortIcon field="createdAt" />
                      </button>
                    </th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border/50">
                  <AnimatePresence mode="popLayout">
                    {projects.map((project, i) => (
                      <motion.tr
                        key={project._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: i * 0.05 }}
                        className="group hover:bg-secondary/30 transition-colors"
                      >
                        {/* Identity */}
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-5">
                            <div className="w-14 h-11 rounded-xl bg-muted overflow-hidden border border-border flex-shrink-0">
                              <img
                                src={project.image?.url}
                                alt=""
                                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold tracking-tight group-hover:text-primary transition-colors">
                                {project.title}
                              </span>
                              <span className="text-[11px] text-muted-foreground font-mono opacity-50">
                                /{project?.slug}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Tech Stack */}
                        <td className="px-6 py-6">
                          <div className="flex flex-wrap gap-1.5">
                            {project?.technologies.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 rounded-lg bg-secondary text-[9px] font-medium text-muted-foreground border border-border"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Links */}
                        <td className="px-6 py-6">
                          <div className="flex flex-col gap-2">
                            <a
                              href={project?.liveLink}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors w-fit"
                            >
                              <FiGlobe /> Live
                            </a>
                            <a
                              href={project?.githubRepo}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 text-[11px] text-muted-foreground/60 hover:text-foreground transition-colors w-fit"
                            >
                              <FiGithub /> Source
                            </a>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-6">
                          <div
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${statusStyle[project.status] ?? "bg-muted text-muted-foreground border-border"}`}
                          >
                            <div
                              className={`w-1 h-1 rounded-full ${project.status === "published" ? "bg-emerald-500 animate-pulse" : "bg-current"}`}
                            />
                            {project.status}
                          </div>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-6">
                          <span className="text-[11px] text-muted-foreground font-mono">
                            {new Date(project.createdAt).toLocaleDateString(
                              "en-GB",
                            )}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <Link
                              to={`/admin/projects/edit/${project._id}`}
                              className="p-3 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground transition-all shadow-sm active:scale-90"
                            >
                              <FiEdit2 size={14} />
                            </Link>
                            <button
                              onClick={() => setOpenDeleteModal(project._id)}
                              className="p-3 rounded-xl bg-secondary hover:bg-destructive hover:text-destructive-foreground transition-all shadow-sm active:scale-90"
                            >
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
          )}

          {/* Empty State */}
          {!loading && projects.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
                No matching records found in vault.
              </p>
            </div>
          )}
        </div>

        {/* ── 🟢 PAGINATION ───────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            {/* Per Page Limit */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Per Page
              </span>
              {[6, 10, 20].map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLimit(l);
                    setPage(1);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors
                    ${
                      limit === l
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Page Buttons */}
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-3 rounded-xl bg-secondary border border-border disabled:opacity-30 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <FiChevronLeft size={14} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-xl text-xs font-bold border transition-colors
                    ${
                      page === p
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {p}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="p-3 rounded-xl bg-secondary border border-border disabled:opacity-30 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <FiChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={!!openDeleteModal}
        title={projects.find((p) => p._id === openDeleteModal)?.title}
        onClose={() => setOpenDeleteModal(null)}
        onConfirm={() => handleDeleteProject(openDeleteModal)}
      />
    </section>
  );
};

export default AllProjects;
