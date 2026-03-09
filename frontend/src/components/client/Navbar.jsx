import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { RiLightbulbFlashFill } from "react-icons/ri";
import { FiDownload } from "react-icons/fi";
import { ThemeToggle } from "../common/ThemeToggle";

const NAV_LINKS = [
  { name: "Home", href: "hero" },
  { name: "About", href: "about" },
  { name: "Services", href: "services" },
  { name: "Projects", href: "projects" },
  { name: "Skills", href: "skills" },
  { name: "Contact", href: "contact" },
];

// ═══════════════════════════════════════════════════════════════
//  SCROLL PROGRESS BAR
// ═══════════════════════════════════════════════════════════════
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      setProgress(scrollTop / (scrollHeight - clientHeight));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-border/40">
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX: progress,
          background:
            "linear-gradient(to right, var(--brand), color-mix(in oklch, var(--brand) 60%, transparent))",
        }}
      />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
//  NAVBAR
// ═══════════════════════════════════════════════════════════════
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  // ── Scroll spy ───────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const offset = 120;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].href);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActive(NAV_LINKS[i].href);
          return;
        }
      }
      setActive("hero");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Lock body scroll when mobile menu is open ────────────────
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 80,
      behavior: "smooth",
    });
    setIsOpen(false);
  };

  // ════════════════════════════════════════���═══════════════════
  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "py-2.5 bg-background/80 backdrop-blur-2xl border-b border-border/60"
            : "py-5 bg-transparent"
        }`}
      >
        {/* Scroll progress */}
        {scrolled && <ScrollProgress />}

        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-6">
          {/* ── Logo ─────────────────────────────────────────── */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 group shrink-0"
          >
            {/* Icon */}
            <div className="relative w-9 h-9">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-xl opacity-40 blur-[8px]"
                style={{ background: "var(--brand)" }}
              />
              <div
                className="relative w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "var(--brand)",
                  boxShadow: "0 0 18px var(--brand-glow)",
                }}
              >
                <RiLightbulbFlashFill size={17} className="text-brand-fg" />
              </div>
            </div>

            {/* Wordmark */}
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-foreground font-black tracking-tight text-sm">
                Shohag<span style={{ color: "var(--brand)" }}>.</span>
              </span>
              <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 font-mono mt-0.5">
                Portfolio
              </span>
            </div>
          </motion.button>

          {/* ── Desktop Nav ──────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-0.5 bg-secondary/50 border border-border/80 backdrop-blur-sm rounded-2xl px-2 py-1.5">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`relative px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-colors duration-200 font-mono ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground/60 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: "var(--brand-muted)",
                        border: "1px solid var(--brand-border)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {/* Active dot */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="w-1 h-1 rounded-full shrink-0"
                        style={{ background: "var(--brand)" }}
                      />
                    )}
                    {link.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Right actions ────────��───────────────────────── */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <ThemeToggle />

            {/* Divider */}
            <div className="w-px h-5 bg-border" />

            {/* Resume CTA */}
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl overflow-hidden text-[10px] font-black uppercase tracking-widest font-mono transition-all duration-200"
              style={{
                background: "var(--brand)",
                color: "var(--brand-fg, #fff)",
                boxShadow: "0 0 20px var(--brand-glow)",
              }}
            >
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full"
                animate={{ translateX: ["−100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
              />
              <FiDownload size={12} />
              <span className="relative z-10">Resume</span>
            </motion.a>
          </div>

          {/* ── Mobile toggle ────────────────────────────────── */}
          <div className="md:hidden flex items-center gap-2.5">
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setIsOpen((v) => !v)}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-border bg-secondary text-foreground transition-colors hover:border-[var(--brand-border)]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                >
                  {isOpen ? <HiX size={18} /> : <HiMenuAlt3 size={18} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ══ Mobile Drawer ═════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[90] bg-background/60 backdrop-blur-md md:hidden"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed top-0 right-0 h-full w-[72vw] max-w-[300px] z-[100] md:hidden flex flex-col overflow-hidden"
              style={{
                background: "var(--card)",
                borderLeft: "1px solid var(--border)",
                boxShadow: "-20px 0 60px rgba(0,0,0,0.15)",
              }}
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--brand), transparent)",
                }}
              />

              {/* Ambient glow */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] opacity-20 pointer-events-none"
                style={{ background: "var(--brand)" }}
              />

              {/* ── Drawer header ─────────────────────────────── */}
              <div className="relative z-10 flex items-center justify-between px-7 pt-7 pb-5">
                <div>
                  <span className="text-foreground font-black text-lg tracking-tight">
                    Shohag<span style={{ color: "var(--brand)" }}>.</span>
                  </span>
                  <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-muted-foreground/30 font-mono mt-0.5">
                    Portfolio
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200 border border-transparent hover:border-border"
                >
                  <HiX size={16} />
                </button>
              </div>

              {/* Divider */}
              <div className="mx-7 h-px bg-border/60 mb-5" />

              {/* ── Nav links ─────────────────────────────────── */}
              <nav className="flex-1 flex flex-col gap-1 px-4 relative z-10 overflow-y-auto">
                {NAV_LINKS.map((link, i) => {
                  const isActive = active === link.href;
                  return (
                    <motion.button
                      key={link.name}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => scrollToSection(link.href)}
                      className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold tracking-wide transition-all duration-200 text-left overflow-hidden ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                      }`}
                      style={
                        isActive
                          ? {
                              background: "var(--brand-muted)",
                              border: "1px solid var(--brand-border)",
                            }
                          : {}
                      }
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <motion.span
                          layoutId="mobile-dot"
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: "var(--brand)" }}
                        />
                      )}
                      <span className={isActive ? "" : "pl-[18px]"}>
                        {link.name}
                      </span>
                      {/* Index number */}
                      <span className="ml-auto text-[9px] font-black font-mono text-muted-foreground/20 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </motion.button>
                  );
                })}
              </nav>

              {/* ── Drawer footer ─────────────────────────────── */}
              <div className="relative z-10 px-4 pb-8 pt-4 space-y-3">
                <div className="h-px bg-border/60 mb-4" />

                <motion.a
                  href="/resume.pdf"
                  download
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest font-mono transition-opacity duration-200 hover:opacity-90"
                  style={{
                    background: "var(--brand)",
                    color: "var(--brand-fg, #fff)",
                    boxShadow: "0 4px 20px var(--brand-glow)",
                  }}
                >
                  <FiDownload size={13} />
                  Download Resume
                </motion.a>

                {/* Version tag */}
                <p className="text-center text-[8px] font-mono uppercase tracking-[0.3em] text-muted-foreground/20">
                  Portfolio OS · v2.0
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
