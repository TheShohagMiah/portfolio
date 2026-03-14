import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiLayout,
  FiServer,
  FiLayers,
  FiZap,
  FiArrowUpRight,
} from "react-icons/fi";
import ServiceCard from "../common/ServiceCard";
import axiosInstance from "../../lib/axios";

// ═══════════════════════════════════════════════════════════════
//  FALLBACK DATA
// ═══════════════════════════════════════════════════════════════
const FALLBACK_SERVICES = [
  {
    title: "Frontend Development",
    description:
      "Crafting visually stunning, high-performance user interfaces using React and Next.js. Focused on core web vitals and seamless user journeys.",
    icon: "FiLayout",
    tags: ["React", "Next.js", "Tailwind"],
    stat: "95%",
    statLabel: "Lighthouse Score",
  },
  {
    title: "Backend Architecture",
    description:
      "Designing scalable server-side logic and database schemas. Expertise in RESTful APIs, microservices, and secure authentication.",
    icon: "FiServer",
    tags: ["Node.js", "Express", "MongoDB"],
    stat: "99.9%",
    statLabel: "API Uptime",
  },
  {
    title: "Full Stack Solutions",
    description:
      "End-to-end product development from wireframing to deployment. Bridging design and robust functionality.",
    icon: "FiLayers",
    tags: ["MERN Stack", "T3 Stack"],
    stat: "40+",
    statLabel: "Projects Shipped",
  },
  {
    title: "App Optimization",
    description:
      "Refactoring legacy codebases for speed, SEO, and accessibility. Keeping your digital products modern and competitive.",
    icon: "FiZap",
    tags: ["SEO", "Performance", "UX"],
    stat: "3×",
    statLabel: "Faster Load",
  },
];

// ── ICON MAP ─────────────────────────────────────────────────
const ICON_MAP = { FiLayout, FiServer, FiLayers, FiZap };

// ── SKELETONS ─────────────────────────────────────────────────
const CardSkeleton = ({ tall }) => (
  <div
    className={`rounded-3xl border border-border bg-card animate-pulse
      ${tall ? "min-h-[320px]" : "min-h-[240px]"} p-7 flex flex-col justify-between`}
  >
    <div className="w-11 h-11 rounded-2xl bg-muted" />
    <div className="space-y-3 mt-auto">
      <div className="h-5 bg-muted rounded-full w-3/4" />
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded-full" />
        <div className="h-3 bg-muted rounded-full w-5/6" />
        <div className="h-3 bg-muted rounded-full w-4/6" />
      </div>
      <div className="flex gap-2 pt-1">
        {[44, 56, 48].map((w, i) => (
          <div
            key={i}
            className="h-6 rounded-lg bg-muted"
            style={{ width: w }}
          />
        ))}
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════════
const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await axiosInstance.get("/api/services", {
          signal: controller.signal,
        });
        if (res.data?.success && res.data.data?.length) {
          // Map icon string → component
          const mapped = res.data.data.map((s) => ({
            ...s,
            icon: ICON_MAP[s.icon] || FiZap,
          }));
          setServices(mapped);
        } else {
          setServices(
            FALLBACK_SERVICES.map((s) => ({
              ...s,
              icon: ICON_MAP[s.icon] || FiZap,
            })),
          );
        }
      } catch (err) {
        if (!axiosInstance.isCancel?.(err)) {
          setServices(
            FALLBACK_SERVICES.map((s) => ({
              ...s,
              icon: ICON_MAP[s.icon] || FiZap,
            })),
          );
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  // Ensure we always have 4 cards for the bento layout
  const cards = [...services];
  while (cards.length < 4) cards.push(null);

  return (
    <section
      id="services"
      className="py-10 md:py-20 bg-background relative overflow-hidden"
    >
      {/* ── Ambient glows ──────────────────────────────────── */}
      <div
        className="absolute top-20 -left-20 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.06] pointer-events-none"
        style={{ background: "var(--brand)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-[0.05] pointer-events-none"
        style={{ background: "var(--brand)" }}
      />

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* ══ Header ════════════════════════════════════════ */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-5">
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="block h-[2px] w-10 origin-left"
                  style={{ background: "var(--brand)" }}
                />
                <span
                  className="text-[11px] font-black uppercase tracking-[0.3em] font-mono"
                  style={{ color: "var(--brand)" }}
                >
                  What I Offer
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                Solving problems through <br className="hidden md:block" />
                <span className="text-muted-foreground italic font-serif font-normal">
                  digital innovation.
                </span>
              </h2>
            </motion.div>
          </div>

          {/* ══ Bento Grid ════════════════════════════════════ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {loading ? (
              <>
                <div className="md:col-span-2">
                  <CardSkeleton tall />
                </div>
                <div className="md:col-span-1">
                  <CardSkeleton tall={false} />
                </div>
                <div className="md:col-span-1">
                  <CardSkeleton tall={false} />
                </div>
                <div className="md:col-span-2">
                  <CardSkeleton tall />
                </div>
              </>
            ) : (
              <>
                {/* Row 1: large (2 cols) + small (1 col) */}
                <div className="md:col-span-2">
                  <ServiceCard service={cards[0]} delay={0} tall accent />
                </div>
                <div className="md:col-span-1">
                  <ServiceCard service={cards[1]} delay={0.1} tall={false} />
                </div>
                {/* Row 2: small (1 col) + large (2 cols) */}
                <div className="md:col-span-1">
                  <ServiceCard service={cards[2]} delay={0.2} tall={false} />
                </div>
                <div className="md:col-span-2">
                  <ServiceCard service={cards[3]} delay={0.3} tall accent />
                </div>
              </>
            )}
          </div>

          {/* ══ CTA Strip ═════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 relative rounded-3xl border overflow-hidden"
            style={{
              borderColor: "var(--brand-border)",
              background: "var(--brand-muted)",
            }}
          >
            {/* Top gradient line */}
            <div
              className="absolute top-0 left-0 right-0 h-[1px]"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--brand), transparent)",
              }}
            />

            {/* Decorative watermark */}
            <span
              className="absolute right-8 top-1/2 -translate-y-1/2 text-[80px] font-black opacity-[0.05] leading-none select-none pointer-events-none hidden md:block font-mono"
              style={{ color: "var(--brand)" }}
            >
              LET'S BUILD.
            </span>

            {/* Ambient glow inside strip */}
            <div
              className="absolute -left-10 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-[60px] opacity-20 pointer-events-none"
              style={{ background: "var(--brand)" }}
            />

            <div className="relative px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-1 justify-center md:justify-start">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--chart-2)" }}
                  />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 font-mono">
                    Currently Available
                  </span>
                </div>
                <h4 className="text-xl font-bold text-foreground">
                  Need a custom solution?
                </h4>
                <p className="text-muted-foreground text-sm mt-1">
                  Open for freelance work and full-time roles.
                </p>
              </div>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-black text-sm tracking-widest font-mono shrink-0 overflow-hidden transition-opacity duration-200 hover:opacity-90"
                style={{
                  background: "var(--brand)",
                  color: "var(--brand-foreground, #fff)",
                  boxShadow: "0 4px 20px var(--brand-glow)",
                }}
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full"
                  animate={{ translateX: ["-100%", "200%"] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
                <span className="relative z-10">Get a Quote</span>
                <FiArrowUpRight
                  size={15}
                  className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
