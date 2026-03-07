import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiTrash2,
  FiSend,
  FiChevronDown,
  FiChevronUp,
  FiCheckCircle,
  FiClock,
  FiPhone,
  FiUser,
  FiMessageSquare,
  FiAlertCircle,
  FiRefreshCw,
  FiInbox,
  FiFilter,
} from "react-icons/fi";
import axios from "axios";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyText, setReplyText] = useState({});
  const [replyStatus, setReplyStatus] = useState({});
  const [activeReply, setActiveReply] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [filter, setFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  const token = localStorage.getItem("adminToken");

  // ── Fetch Messages ──────────────────────────────────────────────────────────
  const fetchMessages = async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/contact", {
        withCredentials: true,
      });
      if (res.data.success) {
        setMessages(res.data.data);
        setError(null);
      } else {
        setError(data.message || "Failed to fetch messages.");
      }
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ── Send Reply ──────────────────────────────────────────────────────────────
  const handleReply = async (id) => {
    const text = replyText[id]?.trim();
    if (!text || text.length < 5) {
      setReplyStatus((prev) => ({
        ...prev,
        [id]: { type: "error", msg: "Reply must be at least 5 characters." },
      }));
      return;
    }

    setReplyStatus((prev) => ({
      ...prev,
      [id]: { type: "loading", msg: "Transmitting..." },
    }));

    try {
      const res = await fetch(`/api/contact/reply/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ replyMessage: text }),
      });
      const data = await res.json();

      if (res.ok) {
        setReplyStatus((prev) => ({
          ...prev,
          [id]: { type: "success", msg: "Reply transmitted successfully." },
        }));
        setActiveReply(null);
        setReplyText((prev) => ({ ...prev, [id]: "" }));
        fetchMessages(true);
      } else {
        setReplyStatus((prev) => ({
          ...prev,
          [id]: { type: "error", msg: data.message || "Transmission failed." },
        }));
      }
    } catch {
      setReplyStatus((prev) => ({
        ...prev,
        [id]: { type: "error", msg: "Server error. Try again." },
      }));
    }
  };

  // ── Delete Message ──────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this message?")) return;
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchMessages(true);
    } catch {
      alert("Failed to delete. Try again.");
    }
  };

  // ── Filter ──────────────────────────────────────────────────────────────────
  const filteredMessages = messages.filter((msg) => {
    if (filter === "pending") return !msg.isReplied;
    if (filter === "replied") return msg.isReplied;
    return true;
  });

  const totalCount = messages.length;
  const pendingCount = messages.filter((m) => !m.isReplied).length;
  const repliedCount = messages.filter((m) => m.isReplied).length;

  const stats = [
    {
      label: "Total Inquiries",
      value: totalCount,
      icon: <FiInbox />,
      trend: "neutral",
    },
    {
      label: "Awaiting Reply",
      value: pendingCount,
      icon: <FiClock />,
      trend: pendingCount > 0 ? "warn" : "up",
    },
    {
      label: "Replied",
      value: repliedCount,
      icon: <FiCheckCircle />,
      trend: "up",
    },
  ];

  const filters = ["all", "pending", "replied"];

  // ── Render ────────────────────────────────────────────��─────────────────────
  return (
    <div className="min-h-screen text-foreground p-4 md:p-8 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Inquiry{" "}
              <span className="text-muted-foreground italic font-serif">
                Inbox.
              </span>
            </h1>
            <p className="text-muted-foreground text-sm font-sans">
              Manage and respond to{" "}
              <span className="text-primary/80">incoming transmissions.</span>
            </p>
          </div>

          <button
            onClick={() => fetchMessages(true)}
            disabled={refreshing}
            className="flex items-center gap-2 bg-secondary/50 border border-border px-4 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground hover:bg-secondary transition-all active:scale-95"
          >
            <FiRefreshCw
              className={`size-3 ${refreshing ? "animate-spin" : ""}`}
            />
            {refreshing ? "Syncing..." : "Refresh"}
          </button>
        </header>

        {/* ── Stats Grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
              className="group bg-card p-6 rounded-[2rem] border border-border hover:border-primary/30 transition-all shadow-xl hover:shadow-primary/5 relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-3 bg-secondary rounded-2xl text-primary border border-border group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <span
                  className={`text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tighter border ${
                    stat.trend === "up"
                      ? "text-chart-2 border-chart-2/20 bg-chart-2/5"
                      : stat.trend === "warn"
                        ? "text-yellow-500 border-yellow-500/20 bg-yellow-500/5"
                        : "text-muted-foreground border-border bg-secondary"
                  }`}
                >
                  {stat.trend === "up"
                    ? "✓ Resolved"
                    : stat.trend === "warn"
                      ? "! Pending"
                      : "All Messages"}
                </span>
              </div>
              <h3 className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em]">
                {stat.label}
              </h3>
              <p className="text-3xl font-bold tracking-tighter mt-1">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Filter Tabs ────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mb-8">
          <FiFilter className="text-muted-foreground size-3" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">
            Filter
          </span>
          <div className="flex gap-2 ml-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] border transition-all ${
                  filter === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary/50 text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
                }`}
              >
                {f}
                {f === "pending" && pendingCount > 0 && (
                  <span className="ml-1.5 bg-yellow-500/20 text-yellow-500 px-1.5 py-0.5 rounded-full text-[8px]">
                    {pendingCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Loading ─────────────────────────────────────────────────────── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <FiRefreshCw className="animate-spin text-muted-foreground size-6" />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">
              Loading transmissions...
            </p>
          </div>
        )}

        {/* ── Error ──────────────────────────────────────────────────────── */}
        {error && (
          <div className="flex items-center gap-3 bg-red-500/5 border border-red-500/20 rounded-2xl px-5 py-4 mb-6">
            <FiAlertCircle className="text-red-500 shrink-0" />
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {/* ── Empty State ────────────────────────────────────────────────── */}
        {!loading && !error && filteredMessages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 gap-4"
          >
            <div className="p-6 bg-secondary rounded-full border border-border">
              <FiInbox className="size-8 text-muted-foreground" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">
              No {filter} transmissions found
            </p>
          </motion.div>
        )}

        {/* ── Message Cards ──────────────────────────────────────────────── */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredMessages.map((msg, i) => {
              const isExpanded = expandedCard === msg._id;
              const isReplying = activeReply === msg._id;

              return (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{
                    delay: i * 0.04,
                    type: "spring",
                    stiffness: 120,
                  }}
                  className={`group bg-card rounded-[2rem] border transition-all shadow-xl overflow-hidden ${
                    msg.isReplied
                      ? "border-chart-2/20 hover:border-chart-2/40"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  {/* ── Card Header (Always Visible) ── */}
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => setExpandedCard(isExpanded ? null : msg._id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Left — Icon + Info */}
                      <div className="flex items-start gap-4">
                        <div
                          className={`mt-1 p-3 rounded-2xl border shrink-0 ${
                            msg.isReplied
                              ? "bg-chart-2/5 border-chart-2/20 text-chart-2"
                              : "bg-secondary border-border text-primary"
                          }`}
                        >
                          <FiMail className="size-4" />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-bold text-sm tracking-tight">
                              {msg.name}
                            </p>
                            <span
                              className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-[0.15em] border ${
                                msg.isReplied
                                  ? "text-chart-2 border-chart-2/20 bg-chart-2/5"
                                  : "text-yellow-500 border-yellow-500/20 bg-yellow-500/5"
                              }`}
                            >
                              {msg.isReplied ? "✓ Replied" : "⏳ Pending"}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {msg.email}
                          </p>
                          <p className="text-[11px] font-semibold text-muted-foreground/70 mt-1">
                            Re:{" "}
                            <span className="text-foreground/80">
                              {msg.subject}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Right — Time + Expand */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
                          {new Date(msg.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <div className="text-muted-foreground group-hover:text-primary transition-colors">
                          {isExpanded ? (
                            <FiChevronUp className="size-4" />
                          ) : (
                            <FiChevronDown className="size-4" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Message Preview (collapsed) */}
                    {!isExpanded && (
                      <p className="text-xs text-muted-foreground mt-4 ml-[52px] line-clamp-1 opacity-60">
                        {msg.message}
                      </p>
                    )}
                  </div>

                  {/* ── Expanded Body ── */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 space-y-4 border-t border-border pt-4">
                          {/* ── Meta Info ── */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {[
                              {
                                icon: <FiUser />,
                                label: "Name",
                                value: msg.name,
                              },
                              {
                                icon: <FiMail />,
                                label: "Email",
                                value: msg.email,
                              },
                              {
                                icon: <FiPhone />,
                                label: "Phone",
                                value: msg.phone || "N/A",
                              },
                              {
                                icon: <FiClock />,
                                label: "Received",
                                value: new Date(msg.createdAt).toLocaleString(),
                              },
                            ].map((item, idx) => (
                              <div
                                key={idx}
                                className="bg-secondary/50 rounded-2xl p-3 border border-border"
                              >
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span className="text-muted-foreground size-3">
                                    {item.icon}
                                  </span>
                                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                                    {item.label}
                                  </p>
                                </div>
                                <p className="text-xs font-medium truncate">
                                  {item.value}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* ── Original Message ── */}
                          <div className="bg-secondary/30 rounded-2xl p-4 border border-border">
                            <div className="flex items-center gap-2 mb-3">
                              <FiMessageSquare className="size-3 text-muted-foreground" />
                              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                                Message
                              </p>
                            </div>
                            <p className="text-sm text-foreground/80 leading-relaxed">
                              {msg.message}
                            </p>
                          </div>

                          {/* ── Your Reply (if replied) ── */}
                          {msg.isReplied && (
                            <motion.div
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-chart-2/5 rounded-2xl p-4 border border-chart-2/20"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <FiCheckCircle className="size-3 text-chart-2" />
                                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-chart-2/70">
                                  Your Reply
                                </p>
                                <span className="ml-auto text-[9px] text-muted-foreground/50 uppercase tracking-widest">
                                  {new Date(msg.replyDate).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-sm text-foreground/80 leading-relaxed">
                                {msg.reply}
                              </p>
                            </motion.div>
                          )}

                          {/* ── Reply Form ── */}
                          {!msg.isReplied && (
                            <div>
                              {!isReplying ? (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveReply(msg._id);
                                  }}
                                  className="flex items-center gap-2 px-5 py-3 bg-primary/10 text-primary border border-primary/20 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all active:scale-95"
                                >
                                  <FiSend className="size-3" />
                                  Compose Reply
                                </button>
                              ) : (
                                <motion.div
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="space-y-3"
                                >
                                  <div className="bg-secondary/30 rounded-2xl p-4 border border-border focus-within:border-primary/50 transition-colors">
                                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">
                                      Compose Transmission
                                    </p>
                                    <textarea
                                      rows={4}
                                      autoFocus
                                      placeholder="Type your reply here..."
                                      value={replyText[msg._id] || ""}
                                      onChange={(e) =>
                                        setReplyText((prev) => ({
                                          ...prev,
                                          [msg._id]: e.target.value,
                                        }))
                                      }
                                      className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 resize-none outline-none leading-relaxed"
                                    />
                                  </div>

                                  {/* Status Message */}
                                  {replyStatus[msg._id] && (
                                    <motion.p
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                                        replyStatus[msg._id].type === "success"
                                          ? "text-chart-2"
                                          : replyStatus[msg._id].type ===
                                              "error"
                                            ? "text-red-500"
                                            : "text-muted-foreground"
                                      }`}
                                    >
                                      {replyStatus[msg._id].msg}
                                    </motion.p>
                                  )}

                                  <div className="flex gap-3">
                                    <button
                                      onClick={() => handleReply(msg._id)}
                                      disabled={
                                        replyStatus[msg._id]?.type === "loading"
                                      }
                                      className="flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
                                    >
                                      <FiSend className="size-3" />
                                      {replyStatus[msg._id]?.type === "loading"
                                        ? "Transmitting..."
                                        : "Transmit"}
                                    </button>
                                    <button
                                      onClick={() => {
                                        setActiveReply(null);
                                        setReplyStatus((prev) => ({
                                          ...prev,
                                          [msg._id]: null,
                                        }));
                                      }}
                                      className="px-5 py-3 bg-secondary/50 text-muted-foreground border border-border rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-secondary hover:text-foreground transition-all active:scale-95"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          )}

                          {/* ── Delete ── */}
                          <div className="flex justify-end pt-2 border-t border-border">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(msg._id);
                              }}
                              className="flex items-center gap-2 px-4 py-2 text-red-500/70 border border-red-500/10 bg-red-500/5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-red-500/10 hover:text-red-500 transition-all active:scale-95"
                            >
                              <FiTrash2 className="size-3" />
                              Delete Message
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
