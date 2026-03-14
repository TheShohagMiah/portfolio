import React from "react";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiArrowUp,
  FiHeart,
} from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";

// ─── Config — শুধু এখানে পরিবর্তন করো ──────────────────────────────────────
const PORTFOLIO_NAME = "Shohag Miah";
const PORTFOLIO_TITLE = "Full Stack Developer";

const socialLinks = [
  {
    icon: FiGithub,
    href: "https://github.com/TheShohagMiah",
    label: "GitHub",
    color: "#6e5494",
  },
  {
    icon: FiLinkedin,
    href: "https://linkedin.com/in/theshohagmiah",
    label: "LinkedIn",
    color: "#0077b5",
  },
  {
    icon: FaFacebookF,
    href: "https://facebook.com/theshohagmiah",
    label: "Facebook",
    color: "#1877f2",
  },
  {
    icon: FiTwitter,
    href: "https://twitter.com/theshohagmiah",
    label: "Twitter",
    color: "#1da1f2",
  },
  {
    icon: FiMail,
    href: "mailto:shohag@example.com",
    label: "Email",
    color: "#ea4335",
  },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
// ────────────────────────────────────────────────────────────────────────────

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-background border-t border-border overflow-hidden">
      {/* ── Top glowing divider line ── */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--brand, #7c3aed), transparent)",
          opacity: 0.6,
        }}
      />

      {/* ── Ambient bottom glow ── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full blur-[100px] pointer-events-none"
        style={{
          background: "var(--brand, #7c3aed)",
          opacity: 0.07,
        }}
      />

      {/* ══════════════════ MAIN CONTENT ══════════════════ */}
      <div className="relative max-w-6xl mx-auto px-6 py-14">
        {/* ── Row 2: Copyright · Social Icons · Back to Top ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-muted-foreground/50 text-xs tracking-widest uppercase order-2 sm:order-1">
            © {currentYear}{" "}
            <span
              className="font-semibold"
              style={{ color: "var(--brand, #7c3aed)", opacity: 0.8 }}
            >
              {PORTFOLIO_NAME}
            </span>{" "}
            — All rights reserved
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5 order-1 sm:order-2">
            {socialLinks.map(({ icon: Icon, href, label, color }) => (
              <SocialIcon
                key={label}
                Icon={Icon}
                href={href}
                label={label}
                hoverColor={color}
              />
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="group flex items-center gap-2 text-muted-foreground transition-all duration-300 text-xs tracking-widest uppercase order-3"
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--brand, #7c3aed)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.color = "")}
          >
            <span>Back to top</span>
            <span
              className="w-7 h-7 flex items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:-translate-y-1"
              style={{}}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--brand, #7c3aed)";
                e.currentTarget.style.background =
                  "var(--brand-muted, #ede9fe)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.background = "";
              }}
            >
              <FiArrowUp size={13} />
            </span>
          </button>
        </div>

        {/* ── Row 3: Made with love ── */}
        <p className="mt-8 text-center text-muted-foreground/70 text-[12px] flex items-center justify-center gap-1.5">
          Made with{" "}
          <FiHeart
            size={11}
            style={{ color: "var(--brand, #7c3aed)" }}
            className="animate-pulse"
          />{" "}
          by{" "}
          <span
            style={{ color: "var(--brand, #7c3aed)" }}
            className="font-extrabold "
          >
            Shohag Miah
          </span>
        </p>
      </div>
    </footer>
  );
};

// ══════════════════════════════════════════════
//  SocialIcon — আলাদা component (clean & reusable)
// ══════════════════════════════════════════════
const SocialIcon = ({ Icon, href, label, hoverColor }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered ? `0 0 18px ${hoverColor}55` : "none",
        borderColor: hovered ? hoverColor : undefined,
        color: hovered ? hoverColor : undefined,
        transform: hovered ? "translateY(-3px) scale(1.1)" : "none",
        background: hovered ? `${hoverColor}15` : undefined,
        transition: "all 0.25s ease",
      }}
      className="relative group w-10 h-10 flex items-center justify-center rounded-xl bg-secondary border border-border text-muted-foreground"
    >
      <Icon size={16} />

      {/* Tooltip */}
      <span
        className="absolute -top-9 left-1/2 -translate-x-1/2 text-[10px] font-semibold px-2.5 py-1 rounded-md whitespace-nowrap pointer-events-none shadow-lg transition-all duration-200"
        style={{
          background: hoverColor,
          color: "#fff",
          opacity: hovered ? 1 : 0,
          transform: hovered
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(6px)",
        }}
      >
        {label}
        {/* triangle */}
        <span
          className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
          style={{ borderTopColor: hoverColor }}
        />
      </span>
    </a>
  );
};

export default Footer;
