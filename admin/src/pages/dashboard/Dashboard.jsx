import React from "react";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiLayers,
  FiMail,
  FiGlobe,
  FiArrowUpRight,
  FiZap,
  FiCheckCircle,
  FiShield,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Stats with dynamic color mapping
  const stats = [
    {
      label: "Portfolio Visits",
      value: "1,284",
      growth: "+12%",
      icon: <FiActivity />,
      trend: "up",
    },
    {
      label: "Active Projects",
      value: "14",
      growth: "Stable",
      icon: <FiLayers />,
      trend: "neutral",
    },
    {
      label: "Inquiries",
      value: "8",
      growth: "+3 new",
      icon: <FiMail />,
      trend: "up",
    },
    {
      label: "Vault Health",
      value: "98%",
      growth: "Optimal",
      icon: <FiZap />,
      trend: "up",
    },
  ];

  return (
    <div className="min-h-screen text-foreground p-4 md:p-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* ── Header: System Status ─────────────────────────────── */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Vault{" "}
              <span className="text-muted-foreground italic font-serif">
                Overview.
              </span>
            </h1>
            <p className="text-muted-foreground text-sm font-sans">
              Welcome back, Commander.{" "}
              <span className="text-primary/80">All systems operational.</span>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-secondary/50 border border-border px-4 py-2 rounded-2xl shadow-inner">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-chart-2 rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--chart-2),0.6)]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-chart-2">
                Production Live
              </span>
            </div>
            <div className="h-4 w-[1px] bg-border" />
            <div className="flex items-center gap-2">
              <FiShield className="text-primary size-3" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Encrypted
              </span>
            </div>
          </div>
        </header>

        {/* ── Stats Grid: Real-time Data ─────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                      : "text-muted-foreground border-border bg-secondary"
                  }`}
                >
                  {stat.growth}
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Quick Actions: Navigation ────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 mb-4 ml-2">
              Command Interface
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Edit Hero",
                  desc: "Hero headlines & CTA hooks",
                  link: "/admin/hero",
                  icon: <FiZap />,
                },
                {
                  title: "Update Bio",
                  desc: "Sync professional identity",
                  link: "/admin/bio",
                  icon: <FiGlobe />,
                },
                {
                  title: "Manage Projects",
                  desc: "Curate your digital works",
                  link: "/admin/projects",
                  icon: <FiLayers />,
                },
                {
                  title: "Inquiry Inbox",
                  desc: "Review client messages",
                  link: "/admin/messages",
                  icon: <FiMail />,
                },
              ].map((item, i) => (
                <Link to={item.link} key={i}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="group bg-card p-6 rounded-[2.5rem] border border-border flex justify-between items-center transition-all hover:bg-secondary/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-muted-foreground group-hover:text-primary transition-colors text-xl">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground text-xs mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <FiArrowUpRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Recent Activity: System Logs ────────────────────────── */}
          <div className="space-y-6">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 mb-4 ml-2">
              System Logs
            </h2>
            <div className="bg-card rounded-[2.5rem] border border-border p-8 h-full relative overflow-hidden">
              <div className="space-y-8 relative z-10">
                {[
                  {
                    event: "Hero Config Updated",
                    time: "2 mins ago",
                    icon: <FiCheckCircle className="text-chart-2" />,
                  },
                  {
                    event: "New Project: 'Neural-Net'",
                    time: "4 hours ago",
                    icon: <FiLayers className="text-primary" />,
                  },
                  {
                    event: "Bio Identity Synced",
                    time: "Yesterday",
                    icon: <FiGlobe className="text-chart-1" />,
                  },
                ].map((log, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="mt-1 bg-secondary p-2 rounded-lg border border-border group-hover:border-primary/50 transition-colors">
                      {log.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {log.event}
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-2 opacity-60">
                        {log.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground border border-border rounded-2xl hover:bg-secondary hover:text-foreground transition-all active:scale-[0.98]">
                Access Full Audit Trail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
