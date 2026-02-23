import React from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiLinkedin,
  FiMessageSquare,
  FiArrowRight,
} from "react-icons/fi";

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const contactItems = [
    {
      icon: <FiMail />,
      label: "Secure Email",
      value: "hello@shohag.me",
      href: "mailto:hello@shohag.me",
    },
    {
      icon: <FiPhone />,
      label: "Direct Signal",
      value: "+357 00 000 000",
      href: "https://wa.me/yourlink",
    },
    {
      icon: <FiMapPin />,
      label: "Base of Operations",
      value: "Nicosia, Cyprus",
      href: "#",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden bg-background text-foreground transition-colors duration-500"
    >
      {/* ── Adaptive Ambient Glows ──────────────────────────────── */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-emerald-500/[0.08] dark:bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-[300px] h-[300px] bg-emerald-500/[0.05] dark:bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* ── Header ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-12 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
            <span className="text-emerald-500 font-bold uppercase tracking-[0.4em] text-[10px]">
              Collaboration Portal
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tighter leading-[1.1]">
            Let's build something <br />
            <span className="text-emerald-500 italic font-serif">
              extraordinary.
            </span>
          </h2>
          <p className="mt-8 text-muted-foreground max-w-xl text-lg leading-relaxed">
            I'm currently accepting new projects and consulting engagements. If
            you have a vision, let's turn it into a digital reality.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* ── Form Terminal ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-card border border-border p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden"
          >
            <FiMessageSquare
              className="absolute -top-10 -right-10 text-emerald-500/[0.03] dark:text-white/[0.02] rotate-12"
              size={300}
            />

            <form className="space-y-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
                    Identity
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-secondary/50 dark:bg-white/[0.02] border border-border rounded-2xl py-4 px-6 text-sm text-foreground focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all placeholder:text-muted-foreground/40"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
                    Electronic Mail
                  </label>
                  <input
                    type="email"
                    placeholder="name@provider.com"
                    className="w-full bg-secondary/50 dark:bg-white/[0.02] border border-border rounded-2xl py-4 px-6 text-sm text-foreground focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all placeholder:text-muted-foreground/40"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
                  The Brief
                </label>
                <textarea
                  rows="5"
                  placeholder="Outline your project goals, scope, and timeline..."
                  className="w-full bg-secondary/50 dark:bg-white/[0.02] border border-border rounded-2xl py-4 px-6 text-sm text-foreground focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all resize-none placeholder:text-muted-foreground/40"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="group w-full md:w-auto flex items-center justify-center gap-4 bg-emerald-600 text-white dark:text-zinc-900 dark:bg-emerald-500 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-500 dark:hover:bg-emerald-400 shadow-xl shadow-emerald-500/20 transition-all"
              >
                Dispatch Signal
                <FiSend className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.button>
            </form>
          </motion.div>

          {/* ── Channels ───────────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-12 lg:pl-10"
          >
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">
                Primary Contact
              </h3>
              <div className="space-y-4">
                {contactItems.map((item, i) => (
                  <motion.a
                    key={i}
                    variants={itemVariants}
                    href={item.href}
                    className="flex items-center gap-6 p-6 rounded-[2rem] border border-border bg-card hover:border-emerald-500/30 hover:bg-emerald-500/[0.02] dark:hover:bg-emerald-500/[0.03] transition-all group shadow-sm"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xl group-hover:scale-110 group-hover:rotate-3 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">
                        {item.label}
                      </p>
                      <p className="text-md font-bold text-foreground group-hover:text-emerald-500 transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Inverted Social Card */}
            <motion.div
              variants={itemVariants}
              className="group relative p-10 rounded-[2.5rem] bg-foreground text-background overflow-hidden shadow-2xl"
            >
              <FiLinkedin
                size={180}
                className="absolute -right-10 -bottom-10 opacity-[0.05] group-hover:rotate-12 transition-transform duration-700"
              />

              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-2.5 bg-background text-foreground rounded-xl">
                  <FiLinkedin className="text-lg" />
                </div>
                <h4 className="font-black uppercase text-[10px] tracking-[0.3em] opacity-50">
                  Network Pulse
                </h4>
              </div>

              <p className="text-xl font-serif italic font-bold leading-tight mb-8 relative z-10">
                "Connecting with visionaries and sharing insights on the future
                of digital architecture."
              </p>

              <a
                href="#"
                className="group/btn relative flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-emerald-500 text-zinc-900 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-lg"
              >
                LinkedIn Profile
                <FiArrowRight className="transition-transform group-hover/btn:translate-x-2" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
