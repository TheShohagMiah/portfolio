import React, { useState, useEffect } from "react";
import { RiLightbulbFlashLine, RiLogoutBoxRLine } from "react-icons/ri";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiGrid, FiZap } from "react-icons/fi";
import { MdKeyboardArrowDown, MdDesignServices } from "react-icons/md";
import { LuUserPen } from "react-icons/lu";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { GrContact } from "react-icons/gr";
import { TbUserStar } from "react-icons/tb";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = ({ onClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

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
    { title: "Contact", icon: <GrContact size={20} />, path: "/admin/contact" },
  ];

  // Helper function to close sidebar on mobile clicks
  const handleLinkClick = () => {
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

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
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <RiLightbulbFlashLine size={22} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-foreground text-sm uppercase tracking-widest">
              {user.fullName || "Guest User"}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span
                className={`text-[10px] font-semibold uppercase ${
                  user?.role === "admin"
                    ? "text-emerald-500/80"
                    : "text-blue-500/80"
                }`}
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
                  <div>
                    <button
                      onClick={() => toggleSubmenu(index)}
                      className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl transition-all duration-300 group ${
                        isSubmenuOpen || isParentActive
                          ? "bg-secondary text-foreground"
                          : "hover:bg-secondary/50 hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`${isParentActive ? "text-emerald-500" : "text-muted-foreground group-hover:text-foreground"}`}
                        >
                          {item.icon}
                        </span>
                        <span className="font-medium text-[13px]">
                          {item.title}
                        </span>
                      </div>
                      <MdKeyboardArrowDown
                        size={18}
                        className={`transition-transform duration-300 opacity-40 ${isSubmenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-500 ${isSubmenuOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"}`}
                    >
                      <ul className="ml-6 pl-4 border-l border-border space-y-1">
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <NavLink
                              end
                              to={subItem.path}
                              onClick={handleLinkClick}
                              className={({ isActive }) =>
                                `relative block px-4 py-2 rounded-lg text-[12px] font-medium transition-all duration-200 ${
                                  isActive
                                    ? "text-emerald-500 bg-emerald-500/10"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                                }`
                              }
                            >
                              {({ isActive }) => (
                                <>
                                  {subItem.title}
                                  {isActive && (
                                    <span className="absolute left-[-17px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                                  )}
                                </>
                              )}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                          : "hover:bg-secondary/50 hover:text-foreground"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={
                            isActive
                              ? "text-white"
                              : "text-muted-foreground opacity-70"
                          }
                        >
                          {item.icon}
                        </span>
                        <span className="font-medium text-[13px]">
                          {item.title}
                        </span>
                      </>
                    )}
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
          className="group w-full flex items-center justify-center gap-3 px-3 py-3 rounded-xl border border-border text-[12px] font-bold text-muted-foreground hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-300"
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
