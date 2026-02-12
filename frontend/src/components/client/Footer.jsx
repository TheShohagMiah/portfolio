import React from "react";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiArrowUp,
} from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-background border-t border-border pt-20 pb-10 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            {/* Left Side: Call to Action */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Let's build something <br />
                <span className="text-primary italic font-serif">
                  extraordinary.
                </span>
              </h2>
              <p className="text-muted-foreground max-w-sm leading-relaxed">
                Currently seeking new opportunities and interesting projects to
                collaborate on. My inbox is always open.
              </p>
              <a
                href="mailto:your.email@example.com"
                className="inline-flex items-center gap-2 text-lg font-bold hover:text-primary transition-colors group"
              >
                your.email@example.com
                <span className="h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-8" />
              </a>
            </div>

            {/* Right Side: Navigation & Socials */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/50">
                  Navigation
                </p>
                <ul className="space-y-2 text-sm font-medium">
                  <li>
                    <a
                      href="#hero"
                      className="hover:text-primary transition-colors"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="hover:text-primary transition-colors"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#skills"
                      className="hover:text-primary transition-colors"
                    >
                      Skills
                    </a>
                  </li>
                  <li>
                    <a
                      href="#projects"
                      className="hover:text-primary transition-colors"
                    >
                      Projects
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/50">
                  Socials
                </p>
                <ul className="space-y-2 text-sm font-medium">
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <FiLinkedin /> LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <FiGithub /> GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <FiTwitter /> Twitter
                    </a>
                  </li>
                </ul>
              </div>

              <div className="hidden sm:flex flex-col justify-end items-end">
                <button
                  onClick={scrollToTop}
                  className="p-4 rounded-2xl bg-secondary/50 border border-border hover:border-primary/50 transition-all group"
                  aria-label="Scroll to top"
                >
                  <FiArrowUp className="text-xl group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                Shohag Miah — Portfolio {currentYear}
              </p>
            </div>

            <p className="text-[10px] text-muted-foreground/60 uppercase tracking-tighter">
              Built with React, Tailwind CSS & Precision.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
