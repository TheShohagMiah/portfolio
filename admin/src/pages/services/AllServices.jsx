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
  FiChevronRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";
import DeleteModal from "../../components/shared/DeleteModal";

/* ─── Icon Renderer Helper ────────────────────────────────────────── */
const IconRenderer = ({ name, className }) => {
  const IconComponent = FiIcons[name] || FiIcons.FiHelpCircle;
  return <IconComponent className={className} />;
};

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(null);
  const getAllServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/services", {
        withCredentials: true,
      });
      console.log(response);
      if (response.data.success) {
        setServices(response.data?.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);
  console.log(services);

  const handleDeleteService = async (id) => {
    setOpenDeleteModal(null);
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/services/${id}`,
        { withCredentials: true },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setServices((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const filtered = services.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <section className="py-8 min-h-screen text-foreground transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Header ────────────────────────────────────────────────── */}
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
            <div className="relative group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search catalog..."
                className="pl-11 pr-4 py-3 rounded-2xl bg-secondary border border-border text-sm text-foreground focus:outline-none focus:border-primary/50 w-64 transition-all shadow-sm"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Link
              to="/admin/services/new"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-all shadow-lg active:scale-95"
            >
              <FiPlus /> New Service
            </Link>
          </div>
        </div>

        {/* ── Data Table: The Vault ──────────────────────────────────── */}
        <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Service Module
                  </th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hidden md:table-cell">
                    Insight
                  </th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Tech Stack
                  </th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((service) => (
                  <tr
                    key={service.id}
                    className="group hover:bg-secondary/20 transition-colors"
                  >
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
                    <td className="px-8 py-6 hidden md:table-cell">
                      <p className="text-xs text-muted-foreground line-clamp-1 max-w-[280px] font-sans">
                        {service.description}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-secondary text-[10px] font-bold text-muted-foreground border border-border uppercase tracking-tighter"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
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

                        <DeleteModal
                          isOpen={!!openDeleteModal}
                          title={
                            services.find((p) => p._id === openDeleteModal)
                              ?.title
                          }
                          onClose={() => setOpenDeleteModal(null)}
                          onConfirm={() => handleDeleteService(openDeleteModal)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="py-24 text-center">
                <p className="text-muted-foreground text-xs italic font-mono tracking-widest">
                  // No matching records found in the service vault.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Delete Confirmation Overlay ────────────────────────────── */}
      {/* <AnimatePresence>
        {toDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xl p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border rounded-[3rem] p-10 max-w-sm w-full shadow-2xl"
            >
              <div className="w-16 h-16 rounded-[1.5rem] bg-destructive/10 flex items-center justify-center text-destructive mb-6">
                <FiAlertTriangle size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2 tracking-tighter">
                Confirm Erasure
              </h3>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed font-sans">
                You are removing{" "}
                <span className="text-foreground font-bold">
                  "{toDelete.title}"
                </span>
                . This will immediately affect your live site portfolio.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setToDelete(null)}
                  className="flex-1 py-4 rounded-2xl bg-secondary text-foreground font-bold text-[10px] uppercase tracking-widest hover:bg-muted transition-all border border-border"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 py-4 rounded-2xl bg-destructive text-white font-bold text-[10px] uppercase tracking-widest hover:opacity-90 transition-all shadow-lg"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence> */}
    </section>
  );
};

export default AllServices;
