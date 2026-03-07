import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as FiIcons from "react-icons/fi";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiChevronDown,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import DeleteModal from "../../components/shared/DeleteModal";

/* ─── Icon Renderer ───────────────────────────────────────────────── */
const IconRenderer = ({ name, className }) => {
  const IconComponent = FiIcons[name] || FiIcons.FiHelpCircle;
  return <IconComponent className={className} />;
};

const SORT_FIELDS = ["title", "createdAt", "updatedAt"];

const AllServices = () => {
  // ── Data States ──────────────────────────────────────────────────
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // ── Delete Modal ─────────────────────────────────────────────────
  const [openDeleteModal, setOpenDeleteModal] = useState(null);

  // ── 🔍 Search ────────────────────────────────────────────────────
  const [search, setSearch] = useState("");

  // ── 🟡 Sort ──────────────────────────────────────────────────────
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  // ── 🟢 Pagination ────────────────────────────────────────────────
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);

  // ── Fetch ────────────────────────────────────────────────────────
  const getAllServices = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit,
        sortBy,
        order,
        ...(search && { search }),
      };

      const response = await axios.get("http://localhost:5000/api/services", {
        params,
        withCredentials: true,
      });

      if (response.data.success) {
        setServices(response.data.data);
        setTotal(response.data.total);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Failed to load services.");
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortBy, order, search]);

  useEffect(() => {
    setPage(1);
  }, [search, sortBy, order, limit]);

  useEffect(() => {
    getAllServices();
  }, [getAllServices]);

  // ── Sort Toggle ──────────────────────────────────────────────────
  const handleSort = (field) => {
    if (!SORT_FIELDS.includes(field)) return;
    if (sortBy === field) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setOrder("desc");
    }
  };

  // ── Sort Icon ────────────────────────────────────────────────────
  const SortIcon = ({ field }) => {
    if (sortBy !== field)
      return <FiChevronUp className="opacity-20" size={12} />;
    return order === "asc" ? (
      <FiChevronUp size={12} className="text-primary" />
    ) : (
      <FiChevronDown size={12} className="text-primary" />
    );
  };

  // ── Delete ───────────────────────────────────────────────────────
  const handleDeleteService = async (id) => {
    setOpenDeleteModal(null);
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/services/${id}`,
        { withCredentials: true },
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getAllServices();
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Failed to delete.");
    }
  };

  return (
    <section className="py-8 min-h-screen text-foreground transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">
              Service{" "}
              <span className="text-muted-foreground italic font-serif">
                Inventory.
              </span>
            </h1>
            <p className="text-muted-foreground text-sm mt-2 font-sans">
              Browse and maintain your professional service offerings.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* 🔍 Search */}
            <div className="relative flex-1 group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-card border border-border rounded-[1.25rem] py-4 pl-12 pr-10 text-sm focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <FiX size={14} />
                </button>
              )}
            </div>

            <Link
              to="/admin/services/new"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-all shadow-lg active:scale-95 whitespace-nowrap"
            >
              <FiPlus /> New Service
            </Link>
          </div>
        </div>

        {/* ── Table ───────────────────────────────────────────────── */}
        <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-xl">
          {loading ? (
            <div className="py-20 text-center">
              <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest animate-pulse">
                Loading services...
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    {/* 🟡 Sortable Headers */}
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      <button
                        onClick={() => handleSort("title")}
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                      >
                        Service Module <SortIcon field="title" />
                      </button>
                    </th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hidden md:table-cell">
                      Insight
                    </th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      Tech Stack
                    </th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      <button
                        onClick={() => handleSort("createdAt")}
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                      >
                        Date <SortIcon field="createdAt" />
                      </button>
                    </th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  <AnimatePresence mode="popLayout">
                    {services.map((service, i) => (
                      <motion.tr
                        key={service._id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ delay: i * 0.04 }}
                        className="group hover:bg-secondary/20 transition-colors"
                      >
                        {/* Service Module */}
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/5 transition-all">
                              <IconRenderer
                                name={service.icon}
                                className="text-xl"
                              />
                            </div>
                            <span className="font-bold text-sm group-hover:italic transition-all">
                              {service.title}
                            </span>
                          </div>
                        </td>

                        {/* Insight */}
                        <td className="px-8 py-6 hidden md:table-cell">
                          <p className="text-xs text-muted-foreground line-clamp-1 max-w-[280px] font-sans">
                            {service.description}
                          </p>
                        </td>

                        {/* Tags */}
                        <td className="px-8 py-6">
                          <div className="flex flex-wrap gap-2">
                            {service.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 rounded-lg bg-secondary text-[9px] font-medium text-muted-foreground border border-border uppercase tracking-tighter"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Date */}
                        <td className="px-8 py-6">
                          <span className="text-[11px] text-muted-foreground font-mono">
                            {new Date(service.createdAt).toLocaleDateString(
                              "en-GB",
                            )}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-8 py-6">
                          <div className="flex items-center justify-end gap-3">
                            <Link
                              to={`/admin/services/edit/${service._id}`}
                              className="p-2.5 rounded-xl bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-all shadow-sm"
                            >
                              <FiEdit2 size={14} />
                            </Link>
                            <button
                              onClick={() => setOpenDeleteModal(service._id)}
                              className="p-2.5 rounded-xl bg-secondary border border-border text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-all shadow-sm"
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

              {/* Empty State */}
              {!loading && services.length === 0 && (
                <div className="py-24 text-center">
                  <p className="text-muted-foreground text-xs italic font-mono tracking-widest">
                    // No matching records found in the service vault.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── 🟢 Pagination ────────────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            {/* Per Page */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Per Page
              </span>
              {[5, 10, 20].map((l) => (
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
        title={services.find((s) => s._id === openDeleteModal)?.title}
        onClose={() => setOpenDeleteModal(null)}
        onConfirm={() => handleDeleteService(openDeleteModal)}
      />
    </section>
  );
};

export default AllServices;
