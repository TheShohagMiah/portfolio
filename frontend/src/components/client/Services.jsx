import React from "react";
import { motion } from "framer-motion";
import {
  FiLayout,
  FiServer,
  FiLayers,
  FiZap,
  FiArrowUpRight,
} from "react-icons/fi";

/* ── data ── */
const services = [
  {
    title: "Frontend Development",
    description:
      "Crafting visually stunning, high-performance user interfaces using React and Next.js. Focused on core web vitals and seamless user journeys.",
    icon: FiLayout,
    tags: ["React", "Next.js", "Tailwind"],
    stat: "95%",
    statLabel: "Lighthouse Score",
    size: "large", // spans 2 cols
  },
  {
    title: "Backend Architecture",
    description:
      "Designing scalable server-side logic and database schemas. Expertise in RESTful APIs, microservices, and secure authentication.",
    icon: FiServer,
    tags: ["Node.js", "Express", "MongoDB"],
    stat: "99.9%",
    statLabel: "API Uptime",
    size: "small",
  },
  {
    title: "Full Stack Solutions",
    description:
      "End-to-end product development from wireframing to deployment. Bridging design and robust functionality.",
    icon: FiLayers,
    tags: ["MERN Stack", "T3 Stack"],
    stat: "40+",
    statLabel: "Projects Shipped",
    size: "small",
  },
  {
    title: "App Optimization",
    description:
      "Refactoring legacy codebases for speed, SEO, and accessibility. Keeping your digital products modern.",
    icon: FiZap,
    tags: ["SEO", "Performance", "UX"],
    stat: "3×",
    statLabel: "Faster Load",
    size: "large", // spans 2 cols
  },
];

/* ── fade-up variant ── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  },
});

/* ── Bento Card ── */
const Card = ({ service, delay, tall = false, accent = false }) => {
  const Icon = service.icon;

  return (
    <motion.div
      variants={fadeUp(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`group relative rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-default
        ${tall ? "min-h-[320px]" : "min-h-[240px]"}
        ${accent ? "p-8" : "p-7"}
      `}
      style={
        accent
          ? {
              background:
                "linear-gradient(135deg, var(--brand) 0%, oklch(0.38 0.22 293) 100%)",
              borderColor: "var(--brand)",
            }
          : {
              background: "var(--card)",
              borderColor: "var(--border)",
            }
      }
      onMouseEnter={(e) => {
        if (!accent) e.currentTarget.style.borderColor = "var(--brand-border)";
      }}
      onMouseLeave={(e) => {
        if (!accent) e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      {/* card glow bloom */}
      {!accent && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 0%, var(--brand-muted), transparent)",
          }}
        />
      )}

      {/* decorative watermark icon */}
      <div
        className={`absolute -bottom-4 -right-4 transition-all duration-500 group-hover:scale-110 group-hover:opacity-20
          ${accent ? "opacity-10" : "opacity-5"}`}
      >
        <Icon
          size={100}
          className={accent ? "text-white" : "text-foreground"}
        />
      </div>

      {/* top row: icon + arrow */}
      <div className="relative flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-300 shrink-0"
          style={
            accent
              ? {
                  background: "rgba(255,255,255,0.15)",
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "#fff",
                }
              : {
                  background: "var(--brand-muted)",
                  borderColor: "var(--brand-border)",
                  color: "var(--brand)",
                }
          }
        >
          <Icon size={18} />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -4, y: 4 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          className={`w-8 h-8 rounded-full flex items-center justify-center border opacity-0 group-hover:opacity-100 transition-all duration-300`}
          style={
            accent
              ? { borderColor: "rgba(255,255,255,0.3)", color: "#fff" }
              : {
                  borderColor: "var(--brand-border)",
                  color: "var(--brand)",
                  background: "var(--brand-muted)",
                }
          }
        >
          <FiArrowUpRight size={14} />
        </motion.div>
      </div>

      {/* content */}
      <div className="relative mt-auto space-y-3">
        <h3
          className={`font-bold tracking-tight leading-tight ${tall ? "text-xl" : "text-lg"}
            ${accent ? "text-white" : "text-foreground group-hover:text-[var(--brand)]"}
            transition-colors duration-200`}
        >
          {service.title}
        </h3>

        <p
          className={`text-sm leading-relaxed line-clamp-3 ${accent ? "text-white/70" : "text-muted-foreground"}`}
        >
          {service.description}
        </p>

        {/* tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wide border"
              style={
                accent
                  ? {
                      background: "rgba(255,255,255,0.1)",
                      borderColor: "rgba(255,255,255,0.2)",
                      color: "rgba(255,255,255,0.8)",
                    }
                  : {
                      background: "var(--secondary)",
                      borderColor: "var(--border)",
                      color: "var(--muted-foreground)",
                    }
              }
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* stat badge */}
      <div
        className={`absolute top-5 right-14 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0`}
      >
        <div className="flex flex-col items-end">
          <span
            className={`text-2xl font-black tabular-nums leading-none ${accent ? "text-white" : ""}`}
            style={!accent ? { color: "var(--brand)" } : {}}
          >
            {service.stat}
          </span>
          <span
            className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 ${accent ? "text-white/50" : "text-muted-foreground/60"}`}
          >
            {service.statLabel}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

/* ══ Main Component ══ */
const Services = () => (
  <section
    id="services"
    className="py-24 bg-background relative overflow-hidden"
  >
    {/* ambient glows */}
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
        {/* ══ Header ══ */}
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
                className="text-[11px] font-bold uppercase tracking-[0.3em]"
                style={{ color: "var(--brand)" }}
              >
                What I Offer
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Solving problems through <br />
              <span className="text-muted-foreground italic font-serif font-normal">
                digital innovation.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground max-w-xs text-sm leading-relaxed md:text-right"
          >
            Tailored development services designed to help businesses scale in
            the modern web ecosystem.
          </motion.p>
        </div>

        {/* ══ Bento Grid ══ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Row 1: large left (2 cols) + small right (1 col) */}
          <div className="md:col-span-2">
            <Card service={services[0]} delay={0} tall accent />
          </div>
          <div className="md:col-span-1">
            <Card service={services[1]} delay={0.1} tall={false} />
          </div>

          {/* Row 2: small left (1 col) + large right (2 cols) */}
          <div className="md:col-span-1">
            <Card service={services[2]} delay={0.2} tall={false} />
          </div>
          <div className="md:col-span-2">
            <Card service={services[3]} delay={0.3} tall />
          </div>
        </div>

        {/* ══ CTA Strip ══ */}
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
          {/* animated gradient line top */}
          <div
            className="absolute top-0 left-0 w-full h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--brand), transparent)",
            }}
          />

          {/* big decorative text */}
          <span
            className="absolute right-8 top-1/2 -translate-y-1/2 text-[80px] font-black opacity-[0.05] leading-none select-none pointer-events-none hidden md:block"
            style={{ color: "var(--brand)" }}
          >
            LET'S BUILD.
          </span>

          <div className="relative px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-xl font-bold text-foreground">
                Need a custom solution?
              </h4>
              <p className="text-muted-foreground text-sm mt-1">
                Currently available for freelance work and full-time roles.
              </p>
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm tracking-wide shrink-0 shadow-brand hover:opacity-90 transition-opacity duration-200"
              style={{
                background: "var(--brand)",
                color: "var(--brand-foreground, #fff)",
              }}
            >
              Get a Quote
              <FiArrowUpRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Services;
