import React from "react";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiArrowUp,
} from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";

const socialLinks = [
  { icon: FiGithub, href: "https://github.com/yourusername", label: "GitHub" },
  {
    icon: FiLinkedin,
    href: "https://linkedin.com/in/yourusername",
    label: "LinkedIn",
  },
  {
    icon: FaFacebookF,
    href: "https://facebook.com/yourusername",
    label: "Facebook",
  },
  {
    icon: FiTwitter,
    href: "https://twitter.com/yourusername",
    label: "Twitter",
  },
  { icon: FiMail, href: "mailto:your@email.com", label: "Email" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-background border-t border-border overflow-hidden">
      {/* brand glow line at top */}
      <div
        className="absolute top-0 left-0 w-full h-px opacity-50"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--brand), transparent)",
        }}
      />

      {/* ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[180px] rounded-full blur-[80px] pointer-events-none opacity-10"
        style={{ background: "var(--brand)" }}
      />

      <div className="relative max-w-4xl mx-auto px-8 py-12 flex flex-col items-center gap-10">
        {/* Brand */}
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Shohag<span className="text-brand">.</span>
          </h2>
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground/50 font-light">
            Portfolio
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="group relative w-11 h-11 flex items-center justify-center rounded-xl bg-secondary border border-border text-muted-foreground hover:text-brand hover:border-brand hover:bg-brand-muted transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              style={{ "--hover-shadow": "0 0 20px var(--brand-glow)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 20px var(--brand-glow)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <Icon size={17} />

              {/* Tooltip */}
              <span
                className="absolute -top-10 left-1/2 -translate-x-1/2 text-brand-fg text-[10px] font-semibold px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 pointer-events-none shadow-lg"
                style={{ background: "var(--brand)" }}
              >
                {label}
                <span
                  className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
                  style={{ borderTopColor: "var(--brand)" }}
                />
              </span>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div
          className="w-24 h-px opacity-40"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--brand), transparent)",
          }}
        />

        {/* Bottom row */}
        <div className="flex items-center justify-between w-full">
          <p className="text-muted-foreground/50 text-xs tracking-widest uppercase">
            © {currentYear} All rights reserved
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="group flex items-center gap-2 text-muted-foreground hover:text-brand transition-all duration-300 text-xs tracking-widest uppercase"
          >
            <span>Back to top</span>
            <span className="w-7 h-7 flex items-center justify-center rounded-full border border-border group-hover:border-brand group-hover:bg-brand-muted transition-all duration-300 group-hover:-translate-y-0.5">
              <FiArrowUp size={13} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
