import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { TbLayoutDashboard, TbMessage } from "react-icons/tb";
import { PiLightningBold } from "react-icons/pi";
import { LuNotebookPen } from "react-icons/lu";
import { HiOutlineRectangleStack } from "react-icons/hi2";
import { GoStarFill } from "react-icons/go";
import { MdOutlineWorkspaces } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { BsLightningChargeFill } from "react-icons/bs";
import { useAuth } from "../contexts/AuthContext";

// ── sidebar items + nav groups unchanged ──────────────────────
const sidebarItems = [
  {
    title: "Dashboard",
    icon: <TbLayoutDashboard size={16} />,
    path: "/admin/dashboard",
  },
  {
    title: "Hero",
    icon: <PiLightningBold size={16} />,
    submenu: [{ title: "Hero Management", path: "/admin/hero-management" }],
  },
  {
    title: "About Me",
    icon: <LuNotebookPen size={16} />,
    submenu: [{ title: "Update Bio", path: "/admin/about" }],
  },
  {
    title: "Services",
    icon: <HiOutlineRectangleStack size={16} />,
    submenu: [
      { title: "All Services", path: "/admin/services" },
      { title: "Add Service", path: "/admin/services/new" },
    ],
  },
  {
    title: "Skills",
    icon: <GoStarFill size={14} />,
    submenu: [
      { title: "Skill List", path: "/admin/skills" },
      { title: "Add Skill", path: "/admin/skills/new" },
    ],
  },
  {
    title: "Projects",
    icon: <MdOutlineWorkspaces size={17} />,
    submenu: [
      { title: "All Projects", path: "/admin/projects" },
      { title: "Create New", path: "/admin/projects/new" },
    ],
  },
  { title: "Messages", icon: <TbMessage size={16} />, path: "/admin/messages" },
];

const NAV_GROUPS = [
  { label: "Overview", items: [0] },
  { label: "Content", items: [1, 2, 3, 4, 5] },
  { label: "Inbox", items: [6] },
];

// ═══════════════════════════════════════════════════════════════
//  USER CARD SKELETON
// ═══════════════════════════════════════════════════════════════
const UserCardSkeleton = () => (
  <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-secondary/60 border border-border">
    <div className="w-9 h-9 rounded-xl bg-muted animate-pulse flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3 bg-muted rounded animate-pulse w-24" />
      <div className="h-2 bg-muted rounded animate-pulse w-14" />
    </div>
    <div className="w-2 h-2 rounded-full bg-muted animate-pulse flex-shrink-0" />
  </div>
);

// ═══════════════════════════════════════════════════════════════
//  SIDEBAR
// ═══════════════════════════════════════════════════════════════
const Sidebar = ({ onClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ authChecked tells us the initial check is done
  const { logout, user, authChecked } = useAuth();

  useEffect(() => {
    sidebarItems.forEach((item, index) => {
      if (item.submenu?.some((s) => location.pathname === s.path))
        setOpenSubmenu(index);
    });
  }, [location.pathname]);

  const handleLinkClick = () => {
    if (window.innerWidth < 1024 && onClose) onClose();
  };

  const handleLogOut = async () => {
    try {
      await logout();
      navigate("/auth/signin", { replace: true });
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  // ✅ Only compute after user is available
  const initials =
    user?.fullName
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AU";

  return (
    <div className="relative h-full flex flex-col bg-card text-muted-foreground overflow-hidden select-none">
      {/* ── Ambient top glow ──────────────────────────── */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-40 opacity-25 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, var(--brand-glow), transparent 70%)",
        }}
      />

      {/* ── Top border accent ─────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--brand), transparent)",
        }}
      />

      {/* ════════════════════════════════════════════════
          HEADER
      ════════════════════════════════════════════════ */}
      <div className="relative z-10 px-5 pt-7 pb-5">
        {/* ✅ User card — show skeleton until authChecked */}
        {!authChecked ? (
          <UserCardSkeleton />
        ) : (
          <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-secondary/60 border border-border">
            {/* Avatar */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-black text-brand-fg flex-shrink-0"
              style={{
                background: "var(--brand)",
                boxShadow: "0 2px 12px var(--brand-glow)",
              }}
            >
              {initials}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-foreground truncate leading-none">
                {/* ✅ user is guaranteed to be populated here */}
                {user?.fullName ?? "Unknown"}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--brand)" }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.2em] font-mono"
                  style={{ color: "var(--brand-soft)" }}
                >
                  {user?.role ?? "admin"}
                </span>
              </div>
            </div>

            {/* Online dot */}
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: "var(--chart-2)",
                boxShadow: "0 0 6px var(--chart-2)",
              }}
            />
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════════════
          NAVIGATION — unchanged
      ════════════════════════════════════════════════ */}
      <nav
        className="flex-1 overflow-y-auto px-4 pb-4 relative z-10
        [&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-border
        [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-5">
            <div className="flex items-center gap-2 px-2 mb-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 font-mono">
                {group.label}
              </span>
              <div className="flex-1 h-[1px] bg-border/50" />
            </div>

            <ul className="space-y-1">
              {group.items.map((itemIndex) => {
                const item = sidebarItems[itemIndex];
                const isSubmenuOpen = openSubmenu === itemIndex;
                const isParentActive =
                  item.submenu?.some((s) => location.pathname === s.path) ||
                  location.pathname === item.path;

                return (
                  <li key={itemIndex}>
                    {item.submenu ? (
                      <div>
                        <button
                          onClick={() =>
                            setOpenSubmenu(isSubmenuOpen ? null : itemIndex)
                          }
                          className={`group w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                            isParentActive || isSubmenuOpen
                              ? "bg-secondary text-foreground"
                              : "hover:bg-secondary/50 hover:text-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                                isParentActive
                                  ? "bg-brand-muted"
                                  : "bg-muted group-hover:bg-secondary"
                              }`}
                              style={
                                isParentActive ? { color: "var(--brand)" } : {}
                              }
                            >
                              <span
                                className={
                                  !isParentActive ? "text-muted-foreground" : ""
                                }
                              >
                                {item.icon}
                              </span>
                            </div>
                            <span className="text-[12px] font-semibold">
                              {item.title}
                            </span>
                          </div>
                          <motion.div
                            animate={{ rotate: isSubmenuOpen ? 180 : 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <FiChevronDown
                              size={14}
                              className="text-muted-foreground/40"
                            />
                          </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                          {isSubmenuOpen && (
                            <motion.ul
                              key="sub"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.25,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="overflow-hidden mt-1 ml-4 pl-3 border-l border-border space-y-0.5"
                            >
                              {item.submenu.map((sub, si) => (
                                <li key={si}>
                                  <NavLink
                                    end
                                    to={sub.path}
                                    onClick={handleLinkClick}
                                    className={({ isActive }) =>
                                      `group relative flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-medium transition-all duration-200 ${
                                        isActive
                                          ? "bg-brand-muted text-foreground"
                                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                                      }`
                                    }
                                  >
                                    {({ isActive }) => (
                                      <>
                                        <span
                                          className={`w-1 h-1 rounded-full flex-shrink-0 transition-all duration-200 ${
                                            isActive ? "scale-100" : "scale-0"
                                          }`}
                                          style={{ background: "var(--brand)" }}
                                        />
                                        <span
                                          style={
                                            isActive
                                              ? { color: "var(--brand)" }
                                              : {}
                                          }
                                        >
                                          {sub.title}
                                        </span>
                                        {isActive && (
                                          <motion.span
                                            layoutId={`sub-pill-${itemIndex}`}
                                            className="ml-auto w-1 h-4 rounded-full"
                                            style={{
                                              background: "var(--brand)",
                                            }}
                                            transition={{
                                              type: "spring",
                                              stiffness: 380,
                                              damping: 30,
                                            }}
                                          />
                                        )}
                                      </>
                                    )}
                                  </NavLink>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <NavLink
                        to={item.path}
                        onClick={handleLinkClick}
                        className={({ isActive }) =>
                          `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 overflow-hidden ${
                            isActive
                              ? "text-brand-fg"
                              : "hover:bg-secondary/50 hover:text-foreground"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {isActive && (
                              <motion.div
                                layoutId="active-nav-pill"
                                className="absolute inset-0 rounded-xl bg-brand"
                                style={{
                                  boxShadow: "0 4px 20px var(--brand-glow)",
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness: 380,
                                  damping: 30,
                                }}
                              />
                            )}
                            <div
                              className={`relative z-10 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                                isActive
                                  ? "bg-brand-fg/10"
                                  : "bg-muted group-hover:bg-secondary"
                              }`}
                            >
                              <span
                                className={
                                  isActive
                                    ? "text-brand-fg"
                                    : "text-muted-foreground"
                                }
                              >
                                {item.icon}
                              </span>
                            </div>
                            <span className="relative z-10 text-[12px] font-semibold">
                              {item.title}
                            </span>
                            {isActive && (
                              <span className="relative z-10 ml-auto w-1 h-4 rounded-full bg-brand-fg/40" />
                            )}
                          </>
                        )}
                      </NavLink>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════ */}
      <div className="relative z-10 p-4 border-t border-border bg-card">
        <p className="text-center text-[8px] font-mono uppercase tracking-[0.3em] text-muted-foreground/30 mb-3">
          Portfolio OS · v2.0
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogOut}
          className="group w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl
            border border-border text-[11px] font-bold uppercase tracking-widest
            text-muted-foreground hover:text-destructive hover:bg-destructive/10
            hover:border-destructive/20 transition-all duration-300 font-mono"
        >
          <RiLogoutBoxRLine
            size={15}
            className="group-hover:-translate-x-0.5 transition-transform duration-200"
          />
          Sign Out
        </motion.button>
      </div>
    </div>
  );
};

export default Sidebar;
