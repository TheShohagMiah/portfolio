import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FiMail,
  FiTrash2,
  FiSend,
  FiCheckCircle,
  FiClock,
  FiPhone,
  FiUser,
  FiAlertCircle,
  FiRefreshCw,
  FiInbox,
  FiX,
  FiZap,
  FiHash,
  FiSearch,
} from "react-icons/fi";
import { RiMailSendLine, RiSpam2Line } from "react-icons/ri";
import { HiOutlineMailOpen } from "react-icons/hi";
import { TbMailFast } from "react-icons/tb";

/* ── helpers ─────────────────────────────────────────────────── */
const fmt = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
const fmtFull = (d) => new Date(d).toLocaleString();
const initials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/* ── avatar palette (cycles by index) ───────────────────────── */
const AVATAR_COLORS = [
  {
    bg: "bg-violet-500/15",
    text: "text-violet-400",
    ring: "ring-violet-500/20",
  },
  { bg: "bg-blue-500/15", text: "text-blue-400", ring: "ring-blue-500/20" },
  {
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    ring: "ring-emerald-500/20",
  },
  { bg: "bg-rose-500/15", text: "text-rose-400", ring: "ring-rose-500/20" },
  { bg: "bg-amber-500/15", text: "text-amber-400", ring: "ring-amber-500/20" },
  { bg: "bg-cyan-500/15", text: "text-cyan-400", ring: "ring-cyan-500/20" },
];
const avatarColor = (i) => AVATAR_COLORS[i % AVATAR_COLORS.length];

/* ══ Component ══════════════════════════════════════════════════ */
const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyMode, setReplyMode] = useState(false);
  const [replyStatus, setReplyStatus] = useState("idle");
  const [replyError, setReplyError] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const token = localStorage.getItem("adminToken");

  /* ── fetch ───────────────────────────────────────────────── */
  const fetchMessages = async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/contact", {
        withCredentials: true,
      });
      if (res.data.success) {
        setMessages(res.data.data);
        setError(null);
      } else setError("Failed to fetch messages.");
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

  /* ── reply ───────────────────────────────────────────────── */
  const handleReply = async () => {
    if (!replyText.trim() || replyText.trim().length < 5) {
      setReplyError("Reply must be at least 5 characters.");
      return;
    }
    setReplyStatus("loading");
    setReplyError("");
    try {
      const res = await fetch(`/api/contact/reply/${selected}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ replyMessage: replyText.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setReplyStatus("success");
        setReplyText("");
        setReplyMode(false);
        fetchMessages(true);
        setTimeout(() => setReplyStatus("idle"), 3000);
      } else {
        setReplyError(data.message || "Transmission failed.");
        setReplyStatus("error");
      }
    } catch {
      setReplyError("Server error. Try again.");
      setReplyStatus("error");
    }
  };

  /* ── delete ──────────────────────────────────────────────── */
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        if (selected === id) setSelected(null);
        setDeleteId(null);
        fetchMessages(true);
      }
    } catch {
      alert("Failed to delete.");
    }
  };

  /* ── derived ────────────────────────────────���────────────── */
  const filtered = messages
    .filter((m) =>
      filter === "pending"
        ? !m.isReplied
        : filter === "replied"
          ? m.isReplied
          : true,
    )
    .filter(
      (m) =>
        !search.trim() ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase()) ||
        m.subject.toLowerCase().includes(search.toLowerCase()),
    );

  const activeMsg = messages.find((m) => m._id === selected);
  const pendingCount = messages.filter((m) => !m.isReplied).length;
  const repliedCount = messages.filter((m) => m.isReplied).length;

  /* ══ Render ═════════════════════════════════════════════════ */
  return (
    <div className="h-screen flex flex-col text-foreground overflow-hidden bg-background">
      {/* ════════════════════════════════════════════════════════
          TOP NAV BAR
      ════════════════════════════════════════════════════════ */}
      <div className="shrink-0 px-6 py-4 border-b border-border flex items-center justify-between gap-4 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="w-9 h-9 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <TbMailFast className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight leading-none">
              Inquiry Inbox
            </h1>
            <p className="text-[10px] text-muted-foreground/50 font-bold uppercase tracking-widest mt-0.5">
              {messages.length} total · {pendingCount} pending
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Status pills */}
          <div className="hidden sm:flex items-center gap-2">
            {[
              {
                label: "All",
                count: messages.length,
                active: filter === "all",
                onClick: () => setFilter("all"),
                cls: "text-muted-foreground border-border bg-secondary/50",
              },
              {
                label: "Pending",
                count: pendingCount,
                active: filter === "pending",
                onClick: () => setFilter("pending"),
                cls: "text-yellow-500 border-yellow-500/30 bg-yellow-500/5",
              },
              {
                label: "Replied",
                count: repliedCount,
                active: filter === "replied",
                onClick: () => setFilter("replied"),
                cls: "text-chart-2 border-chart-2/30 bg-chart-2/5",
              },
            ].map((f, i) => (
              <button
                key={i}
                onClick={f.onClick}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-[0.2em] transition-all ${
                  f.active
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : f.cls
                } hover:scale-105 active:scale-95`}
              >
                {f.label}
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[8px] font-black ${
                    f.active ? "bg-white/20" : "bg-black/10 dark:bg-white/10"
                  }`}
                >
                  {f.count}
                </span>
              </button>
            ))}
          </div>

          {/* Refresh */}
          <button
            onClick={() => fetchMessages(true)}
            disabled={refreshing}
            className="w-9 h-9 rounded-2xl bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all active:scale-95 disabled:opacity-50"
          >
            <FiRefreshCw
              className={`size-3.5 ${refreshing ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          BODY — 3-COLUMN LAYOUT
      ════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex overflow-hidden">
        {/* ── COL 1: Sidebar Stats ────────────────────────────── */}
        <div className="hidden xl:flex w-56 shrink-0 flex-col border-r border-border bg-card/30 p-4 gap-3 overflow-y-auto">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 px-2 mb-1">
            Overview
          </p>

          {/* Stat cards */}
          {[
            {
              label: "Total",
              value: messages.length,
              icon: <FiInbox className="size-4" />,
              color: "text-primary",
              bg: "bg-primary/10",
              border: "border-primary/20",
            },
            {
              label: "Pending",
              value: pendingCount,
              icon: <FiClock className="size-4" />,
              color: "text-yellow-500",
              bg: "bg-yellow-500/10",
              border: "border-yellow-500/20",
            },
            {
              label: "Replied",
              value: repliedCount,
              icon: <FiCheckCircle className="size-4" />,
              color: "text-chart-2",
              bg: "bg-chart-2/10",
              border: "border-chart-2/20",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-card border border-border rounded-2xl p-4 space-y-2"
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center border ${s.bg} ${s.border} ${s.color}`}
              >
                {s.icon}
              </div>
              <p className="text-2xl font-black tracking-tighter">{s.value}</p>
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50">
                {s.label}
              </p>
            </motion.div>
          ))}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Legend */}
          <div className="space-y-2 px-2">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-2">
              Legend
            </p>
            {[
              { dot: "bg-yellow-500", label: "Awaiting reply" },
              { dot: "bg-chart-2", label: "Replied" },
            ].map((l, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${l.dot}`} />
                <p className="text-[10px] text-muted-foreground/60">
                  {l.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── COL 2: Message List ─────────────────────────────── */}
        <div className="w-full sm:w-80 lg:w-96 shrink-0 flex flex-col border-r border-border overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b border-border shrink-0">
            <div className="flex items-center gap-2 bg-secondary/50 border border-border rounded-2xl px-3 py-2 focus-within:border-primary/40 transition-colors">
              <FiSearch className="size-3.5 text-muted-foreground/50 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search transmissions..."
                className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/40 outline-none"
              />
              <AnimatePresence>
                {search && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearch("")}
                    className="text-muted-foreground/50 hover:text-muted-foreground"
                  >
                    <FiX className="size-3" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {/* Loading */}
            {loading && (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <FiRefreshCw className="animate-spin text-muted-foreground size-5" />
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40">
                  Loading...
                </p>
              </div>
            )}

            {/* Error */}
            {error && !loading && (
              <div className="m-3 flex items-center gap-2 bg-red-500/5 border border-red-500/20 rounded-2xl px-4 py-3">
                <FiAlertCircle className="text-red-500 size-4 shrink-0" />
                <p className="text-xs text-red-500">{error}</p>
              </div>
            )}

            {/* Empty */}
            {!loading && !error && filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-3 opacity-40 p-8 text-center">
                <FiInbox className="size-8 text-muted-foreground" />
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                  {search ? "No results found" : `No ${filter} messages`}
                </p>
              </div>
            )}

            {/* Rows */}
            <AnimatePresence>
              {filtered.map((msg, i) => {
                const isActive = selected === msg._id;
                const ac = avatarColor(i);
                return (
                  <motion.button
                    key={msg._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.025 }}
                    onClick={() => {
                      setSelected(msg._id);
                      setReplyMode(false);
                      setReplyText("");
                      setReplyStatus("idle");
                      setReplyError("");
                    }}
                    className={`w-full text-left p-4 border-b border-border/40 transition-all relative group ${
                      isActive
                        ? "bg-primary/5 border-l-[3px] border-l-primary"
                        : "hover:bg-secondary/40 border-l-[3px] border-l-transparent"
                    }`}
                  >
                    {/* Pending glow dot */}
                    {!msg.isReplied && (
                      <span className="absolute top-3.5 right-3.5 flex size-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-60" />
                        <span className="relative inline-flex rounded-full size-2 bg-yellow-500" />
                      </span>
                    )}

                    <div className="flex items-start gap-3 pr-4">
                      {/* Avatar */}
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black shrink-0 ring-1 ${ac.bg} ${ac.text} ${ac.ring}`}
                      >
                        {initials(msg.name)}
                      </div>

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={`font-bold text-xs truncate ${isActive ? "text-primary" : "text-foreground"}`}
                          >
                            {msg.name}
                          </p>
                          <p className="text-[8px] text-muted-foreground/40 font-bold shrink-0">
                            {fmt(msg.createdAt)}
                          </p>
                        </div>
                        <p className="text-[11px] font-semibold text-muted-foreground/70 truncate">
                          {msg.subject}
                        </p>
                        <p className="text-[10px] text-muted-foreground/45 truncate leading-relaxed">
                          {msg.message}
                        </p>

                        {/* Status pill */}
                        <div className="pt-1">
                          <span
                            className={`inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border ${
                              msg.isReplied
                                ? "text-chart-2 border-chart-2/20 bg-chart-2/5"
                                : "text-yellow-500 border-yellow-500/20 bg-yellow-500/5"
                            }`}
                          >
                            {msg.isReplied ? (
                              <>
                                <FiCheckCircle className="size-2" /> Replied
                              </>
                            ) : (
                              <>
                                <FiClock className="size-2" /> Pending
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* ── COL 3: Detail View ──────────────────────────────── */}
        <div className="flex-1 flex flex-col overflow-hidden bg-background">
          <AnimatePresence mode="wait">
            {/* ── No Selection ── */}
            {!activeMsg ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center gap-6 text-center p-8"
              >
                {/* Animated icon stack */}
                <div className="relative w-28 h-28">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-24 h-24 rounded-[2rem] bg-card border border-border flex items-center justify-center shadow-xl">
                      <HiOutlineMailOpen className="size-10 text-muted-foreground/20" />
                    </div>
                  </motion.div>
                  {/* orbiting dot */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-3 h-3 rounded-full bg-primary/40 border border-primary/30" />
                  </motion.div>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-sm text-foreground/50 tracking-tight">
                    No transmission selected
                  </p>
                  <p className="text-[10px] text-muted-foreground/30 uppercase tracking-[0.3em] font-bold">
                    Choose from the list
                  </p>
                </div>
              </motion.div>
            ) : (
              /* ── Active Message ── */
              <motion.div
                key={activeMsg._id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                {/* ── Detail Top Bar ── */}
                <div className="shrink-0 px-6 py-4 border-b border-border">
                  <div className="flex items-start justify-between gap-4">
                    {/* Sender info */}
                    <div className="flex items-center gap-3 min-w-0">
                      {(() => {
                        const idx = messages.findIndex(
                          (m) => m._id === activeMsg._id,
                        );
                        const ac = avatarColor(idx);
                        return (
                          <div
                            className={`w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-black shrink-0 ring-1 ${ac.bg} ${ac.text} ${ac.ring}`}
                          >
                            {initials(activeMsg.name)}
                          </div>
                        );
                      })()}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-bold text-sm tracking-tight truncate">
                            {activeMsg.name}
                          </p>
                          <span
                            className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-[0.15em] border ${
                              activeMsg.isReplied
                                ? "text-chart-2 border-chart-2/20 bg-chart-2/5"
                                : "text-yellow-500 border-yellow-500/20 bg-yellow-500/5"
                            }`}
                          >
                            {activeMsg.isReplied ? "✓ Replied" : "⏳ Pending"}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {activeMsg.email}
                        </p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      {!activeMsg.isReplied && !replyMode && (
                        <button
                          onClick={() => setReplyMode(true)}
                          className="flex items-center gap-1.5 px-3 py-2 bg-primary/10 border border-primary/20 text-primary rounded-xl text-[9px] font-black uppercase tracking-[0.15em] hover:bg-primary hover:text-primary-foreground transition-all active:scale-95"
                        >
                          <RiMailSendLine className="size-3" />
                          Reply
                        </button>
                      )}
                      <button
                        onClick={() => setDeleteId(activeMsg._id)}
                        className="w-8 h-8 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center justify-center text-red-500/50 hover:bg-red-500/10 hover:text-red-500 transition-all active:scale-95"
                      >
                        <FiTrash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Subject + meta row */}
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <FiHash className="size-3 text-muted-foreground/40 shrink-0" />
                      <p className="text-sm font-bold text-foreground/90 truncate">
                        {activeMsg.subject}
                      </p>
                    </div>
                    {/* Meta chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        {
                          icon: <FiUser className="size-2.5" />,
                          val: activeMsg.name,
                        },
                        {
                          icon: <FiMail className="size-2.5" />,
                          val: activeMsg.email,
                        },
                        {
                          icon: <FiPhone className="size-2.5" />,
                          val: activeMsg.phone || "No phone",
                        },
                        {
                          icon: <FiClock className="size-2.5" />,
                          val: fmt(activeMsg.createdAt),
                        },
                      ].map((c, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1 bg-secondary/50 border border-border rounded-full px-2.5 py-1 text-[9px] font-medium text-muted-foreground"
                        >
                          {c.icon}
                          {c.val}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Chat Thread ── */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                  {/* Incoming message bubble */}
                  <div className="flex items-end gap-3 max-w-[80%]">
                    {(() => {
                      const idx = messages.findIndex(
                        (m) => m._id === activeMsg._id,
                      );
                      const ac = avatarColor(idx);
                      return (
                        <div
                          className={`w-8 h-8 rounded-2xl flex items-center justify-center text-xs font-black shrink-0 ring-1 ${ac.bg} ${ac.text} ${ac.ring}`}
                        >
                          {initials(activeMsg.name)}
                        </div>
                      );
                    })()}
                    <div className="space-y-1">
                      <div className="bg-card border border-border rounded-3xl rounded-bl-lg px-5 py-4 shadow-sm">
                        <p className="text-sm text-foreground/85 leading-relaxed">
                          {activeMsg.message}
                        </p>
                      </div>
                      <p className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider ml-1">
                        {fmtFull(activeMsg.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Reply bubble */}
                  {activeMsg.isReplied && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-end gap-3 max-w-[80%] ml-auto flex-row-reverse"
                    >
                      {/* You avatar */}
                      <div className="w-8 h-8 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center text-xs font-black text-primary shrink-0">
                        ME
                      </div>
                      <div className="space-y-1">
                        <div className="bg-primary/10 border border-primary/20 rounded-3xl rounded-br-lg px-5 py-4">
                          <p className="text-sm text-foreground/85 leading-relaxed">
                            {activeMsg.reply}
                          </p>
                        </div>
                        <p className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider text-right mr-1">
                          {fmtFull(activeMsg.replyDate)}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Success toast */}
                  <AnimatePresence>
                    {replyStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center justify-center gap-2 bg-chart-2/10 border border-chart-2/20 rounded-2xl px-4 py-3 mx-auto max-w-xs"
                      >
                        <FiCheckCircle className="text-chart-2 size-4 shrink-0" />
                        <p className="text-xs font-bold text-chart-2">
                          Reply transmitted!
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ── Reply Composer ── */}
                <AnimatePresence>
                  {replyMode && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 22,
                      }}
                      className="shrink-0 border-t border-border bg-card/50 backdrop-blur-sm p-4"
                    >
                      {/* Composer header */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 rounded-lg bg-primary/10 flex items-center justify-center">
                          <RiMailSendLine className="size-3 text-primary" />
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground/50 flex-1">
                          Reply to {activeMsg.name}
                        </p>
                        <button
                          onClick={() => {
                            setReplyMode(false);
                            setReplyText("");
                            setReplyError("");
                          }}
                          className="text-muted-foreground/40 hover:text-muted-foreground transition-colors"
                        >
                          <FiX className="size-4" />
                        </button>
                      </div>

                      {/* Textarea */}
                      <div
                        className={`rounded-2xl border transition-colors p-3 ${
                          replyError
                            ? "border-red-500/40 bg-red-500/5"
                            : "border-border bg-secondary/20 focus-within:border-primary/40"
                        }`}
                      >
                        <textarea
                          rows={3}
                          autoFocus
                          placeholder="Write your reply..."
                          value={replyText}
                          onChange={(e) => {
                            setReplyText(e.target.value);
                            setReplyError("");
                          }}
                          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/30 resize-none outline-none leading-relaxed"
                        />
                        {/* char count */}
                        <div className="flex items-center justify-between mt-1">
                          <AnimatePresence>
                            {replyError && (
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-1 text-red-500 text-[10px] font-bold"
                              >
                                <FiAlertCircle className="size-3" />
                                {replyError}
                              </motion.p>
                            )}
                          </AnimatePresence>
                          <p
                            className={`text-[9px] font-bold ml-auto tabular-nums ${
                              replyText.length > 4900
                                ? "text-red-500"
                                : "text-muted-foreground/30"
                            }`}
                          >
                            {replyText.length}/5000
                          </p>
                        </div>
                      </div>

                      {/* Action row */}
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={handleReply}
                          disabled={replyStatus === "loading"}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
                        >
                          {replyStatus === "loading" ? (
                            <>
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full"
                              />
                              Transmitting...
                            </>
                          ) : (
                            <>
                              <FiSend className="size-3" /> Send
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setReplyMode(false);
                            setReplyText("");
                            setReplyError("");
                          }}
                          className="px-4 py-2.5 rounded-2xl bg-secondary/50 border border-border text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] hover:bg-secondary hover:text-foreground transition-all active:scale-95"
                        >
                          Discard
                        </button>
                        {/* Live typing indicator */}
                        {replyText.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-1.5 ml-auto"
                          >
                            <div className="flex gap-0.5">
                              {[0, 1, 2].map((i) => (
                                <motion.span
                                  key={i}
                                  animate={{ y: [0, -3, 0] }}
                                  transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                  }}
                                  className="w-1 h-1 rounded-full bg-primary/50"
                                />
                              ))}
                            </div>
                            <p className="text-[9px] text-muted-foreground/40 font-bold">
                              Composing...
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Already replied footer */}
                {activeMsg.isReplied && !replyMode && (
                  <div className="shrink-0 border-t border-border px-6 py-3 flex items-center gap-2">
                    <FiCheckCircle className="size-3.5 text-chart-2 shrink-0" />
                    <p className="text-[10px] font-bold text-chart-2/70 uppercase tracking-[0.2em]">
                      Transmission resolved · {fmt(activeMsg.replyDate)}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          DELETE CONFIRM MODAL
      ════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-md p-4"
            onClick={() => setDeleteId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 20 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-[2rem] p-8 max-w-xs w-full shadow-2xl relative overflow-hidden"
            >
              {/* BG glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-red-500/10 blur-2xl pointer-events-none" />

              <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5 relative z-10">
                <RiSpam2Line className="size-6 text-red-500" />
              </div>
              <h3 className="text-base font-bold text-center tracking-tight mb-2 relative z-10">
                Delete Transmission?
              </h3>
              <p className="text-xs text-muted-foreground text-center mb-7 leading-relaxed relative z-10">
                This message will be permanently removed. This cannot be undone.
              </p>
              <div className="flex gap-2 relative z-10">
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="flex-1 py-3 rounded-2xl bg-red-500 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-600 transition-all active:scale-95"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-3 rounded-2xl bg-secondary border border-border text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] hover:text-foreground transition-all active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminMessages;
