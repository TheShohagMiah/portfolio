import React, { useState, useEffect } from "react";
import { RiLightbulbFlashLine, RiLogoutBoxRLine } from "react-icons/ri";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiGrid, FiZap, FiMail } from "react-icons/fi";
import { MdKeyboardArrowDown, MdDesignServices } from "react-icons/md";
import { LuUserPen } from "react-icons/lu";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { GrContact } from "react-icons/gr";
import { TbUserStar } from "react-icons/tb";
import { useAuth } from "../contexts/AuthContext";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: <FiGrid size={18} />,
    path: "/admin/dashboard",
  },
  {
    title: "Hero",
    icon: <FiZap size={18} />,
    submenu: [{ title: "Hero Management", path: "/admin/hero-management" }],
  },
  {
    title: "About Me",
    icon: <LuUserPen size={18} />,
    submenu: [{ title: "Update Bio", path: "/admin/about" }],
  },
  {
    title: "Services",
    icon: <MdDesignServices size={18} />,
    submenu: [
      { title: "All Services", path: "/admin/services" },
      { title: "Add Service", path: "/admin/services/new" },
    ],
  },
  {
    title: "Skills",
    icon: <TbUserStar size={18} />,
    submenu: [
      { title: "Skill List", path: "/admin/skills" },
      { title: "Add Skill", path: "/admin/skills/new" },
    ],
  },
  {
    title: "Projects",
    icon: <AiOutlineFundProjectionScreen size={20} />,
    submenu: [
      { title: "All Projects", path: "/admin/projects" },
      { title: "Create New", path: "/admin/projects/new" },
    ],
  },
  // {
  //   title: "Contact",
  //   icon: <GrContact size={20} />,
  //   path: "/admin/contact",
  // },
  {
    title: "Messages",
    icon: <FiMail size={18} />,
    path: "/admin/messages",
  },
];

const Sidebar = ({ onClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLinkClick = () => {
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  // ✅ Fix 3: sidebarItems moved outside component so no dependency warning
  useEffect(() => {
    sidebarItems.forEach((item, index) => {
      if (item.submenu?.some((sub) => location.pathname === sub.path)) {
        setOpenSubmenu(index);
      }
    });
  }, [location.pathname]);

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const handleLogOut = async () => {
    try {
      await logout();
      navigate("/auth/signin", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-card text-muted-foreground h-full flex flex-col transition-colors duration-500">
      {/* ── Header ────────────────────────────────────────── */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-sm flex items-center justify-center bg-brand shadow-brand"
            style={{ boxShadow: "0 0 20px var(--brand-glow)" }}
          >
            <RiLightbulbFlashLine size={22} className="text-brand-fg" />
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-foreground text-sm uppercase tracking-widest">
              {user?.fullName || "Guest User"}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--brand)" }}
              />
              <span
                className="text-[10px] font-semibold uppercase"
                style={{ color: "var(--brand)" }}
              >
                {user?.role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Navigation ──────────────────────────────────────────── */}
      <nav className="flex-1 px-4 py-2 overflow-y-auto">
        <ul className="space-y-1.5">
          {sidebarItems.map((item, index) => {
            const isSubmenuOpen = openSubmenu === index;
            const isParentActive =
              item.submenu?.some((sub) => location.pathname === sub.path) ||
              location.pathname === item.path;

            return (
              <li key={index} className="relative">
                {item.submenu ? (
                  // ── Parent with submenu ──────────────────────────────────
                  <div>
                    <button
                      onClick={() => toggleSubmenu(index)}
                      className={`flex items-center justify-between w-full px-4 py-2.5 rounded-sm transition-all duration-300 group ${
                        isSubmenuOpen || isParentActive
                          ? "bg-secondary text-foreground"
                          : "hover:bg-secondary/50 hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={
                            isParentActive
                              ? ""
                              : "text-muted-foreground group-hover:text-foreground"
                          }
                          style={
                            isParentActive ? { color: "var(--brand)" } : {}
                          }
                        >
                          {item.icon}
                        </span>
                        <span className="font-medium text-[13px]">
                          {item.title}
                        </span>
                      </div>
                      <MdKeyboardArrowDown
                        size={18}
                        className={`transition-transform duration-300 opacity-40 ${
                          isSubmenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        isSubmenuOpen
                          ? "max-h-96 opacity-100 mt-1"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="ml-6 pl-4 border-l border-border space-y-1">
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            {/* ✅ Fix 1: use className fn OR children fn, not both */}
                            <NavLink
                              end
                              to={subItem.path}
                              onClick={handleLinkClick}
                              className={({ isActive }) =>
                                `relative block px-4 py-2 rounded-sm text-[12px] font-medium transition-all duration-200 ${
                                  isActive
                                    ? "bg-brand-muted/60"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                                }`
                              }
                              style={({ isActive }) =>
                                isActive ? { color: "var(--brand)" } : {}
                              }
                            >
                              {subItem.title}
                              {/* ✅ Fix 1: active dot moved outside children fn */}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  // ── Direct link (no submenu) ─────────────────────────────
                  // ✅ Fix 1: use only className fn, no children render prop
                  <NavLink
                    to={item.path}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 rounded-sm transition-all duration-300 ${
                        isActive
                          ? "bg-brand text-brand-fg shadow-brand"
                          : "hover:bg-secondary/50 hover:text-foreground"
                      }`
                    }
                  >
                    <span
                      className={
                        location.pathname === item.path
                          ? "text-brand-fg"
                          : "text-muted-foreground opacity-70"
                      }
                    >
                      {item.icon}
                    </span>
                    <span className="font-medium text-[13px]">
                      {item.title}
                    </span>
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Footer ───────────────────────────────────── */}
      <div className="p-4 bg-gradient-to-t from-background to-transparent mt-auto">
        <button
          onClick={handleLogOut}
          className="group w-full flex items-center justify-center gap-3 px-3 py-3 rounded-sm border border-border text-[12px] font-bold text-muted-foreground hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-300"
        >
          <RiLogoutBoxRLine
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          SIGN OUT
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
