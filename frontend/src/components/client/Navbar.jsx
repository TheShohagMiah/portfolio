import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { RiLightbulbFlashFill } from "react-icons/ri";
import { FiDownload } from "react-icons/fi";
import { ThemeToggle } from "../common/ThemeToggle";

const navLinks = [
  { name: "Home", href: "hero" },
  { name: "About", href: "about" },
  { name: "Services", href: "services" },
  { name: "Projects", href: "projects" },
  { name: "Skills", href: "skills" },
  { name: "Contact", href: "contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const offset = 120;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].href);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActive(navLinks[i].href);
          return;
        }
      }
      setActive("hero");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "py-2 bg-background/80 backdrop-blur-xl border-b border-border shadow-brand"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-9 h-9">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-xl bg-brand opacity-30 blur-[6px]"
              />
              <div className="relative w-9 h-9 rounded-xl bg-brand flex items-center justify-center shadow-brand">
                <RiLightbulbFlashFill size={18} className="text-brand-fg" />
              </div>
            </div>
            <span className="text-foreground font-bold tracking-tight text-sm hidden sm:block">
              Shohag<span className="text-brand">.</span>
            </span>
          </motion.button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 bg-secondary/40 border border-border backdrop-blur-sm rounded-2xl px-2 py-1.5">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`relative px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-xl transition-colors duration-200 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="pill"
                      className="absolute inset-0 bg-brand-muted border border-brand rounded-xl"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand hover:opacity-90 text-brand-fg text-[11px] font-bold uppercase tracking-widest transition-opacity duration-200 shadow-brand"
            >
              <FiDownload size={13} />
              Resume
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setIsOpen((v) => !v)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-secondary border border-border text-foreground"
            >
              {isOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[90] bg-foreground/20 backdrop-blur-sm md:hidden"
            />

            <motion.div
              key="drawer"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-[75vw] max-w-xs z-[100] md:hidden bg-background border-l border-border flex flex-col px-8 py-10 gap-2"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition"
              >
                <HiX size={20} />
              </button>

              <div className="mb-10 mt-2">
                <span className="text-foreground font-extrabold text-xl tracking-tight">
                  Shohag<span className="text-brand">.</span>
                </span>
              </div>

              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = active === link.href;
                  return (
                    <motion.button
                      key={link.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, ease: "easeOut" }}
                      onClick={() => scrollToSection(link.href)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 text-left ${
                        isActive
                          ? "bg-brand-muted text-brand border border-brand"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                      )}
                      {link.name}
                    </motion.button>
                  );
                })}
              </nav>

              <motion.a
                href="/resume.pdf"
                download
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-auto flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand hover:opacity-90 text-brand-fg text-xs font-bold uppercase tracking-widest transition-opacity shadow-brand"
              >
                <FiDownload size={14} />
                Download Resume
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
