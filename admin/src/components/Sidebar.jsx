import React, { useState } from "react";
import {
  RiFileChart2Line,
  RiLightbulbFlashLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiZap,
  FiUser,
  FiLayers,
  FiCpu,
  FiBriefcase,
  FiMail,
} from "react-icons/fi";
import { MdKeyboardArrowDown, MdDesignServices } from "react-icons/md";
import { LuContactRound, LuUserPen } from "react-icons/lu";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { GrContact } from "react-icons/gr";
import { TbUserStar } from "react-icons/tb";
const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <FiGrid size={20} />,
      path: "/admin/dashboard",
    },
    {
      title: "Hero",
      // FiZap feels more "impactful" for a Hero section than a standard star
      icon: <FiZap size={20} />,
      submenu: [{ title: "Hero Management", path: "/admin/hero-management" }],
    },
    {
      title: "About Me",
      icon: <LuUserPen size={20} />,
      submenu: [{ title: "Update Bio", path: "/admin/about" }],
    },
    {
      title: "Services",
      // FiLayers represents the different "tiers" or offerings better than a wrench
      icon: <MdDesignServices size={20} />,
      submenu: [
        { title: "All Services", path: "/admin/services" },
        { title: "Add Service", path: "/admin/services/new" },
      ],
    },
    {
      title: "Skills",
      icon: <TbUserStar size={20} />,
      submenu: [
        { title: "Skill List", path: "/admin/skills" },
        { title: "Manage Categories", path: "/admin/skills/categories" },
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
    {
      title: "Contact",
      icon: <GrContact size={20} />,
      path: "/admin/contact",
      badge: 5,
    },
  ];

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  return (
    <div className="bg-sidebar text-sidebar-foreground h-full border-r border-sidebar-border flex flex-col">
      {/* ── Logo ──────────────────────────────────────────────────── */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-foreground text-background rounded-xl flex items-center justify-center">
            <RiLightbulbFlashLine size={24} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sidebar-foreground text-base uppercase">
              Shohag Miah
            </span>
            <span className="text-[10px] text-sidebar-accent-foreground font-medium bg-sidebar-accent rounded-full text-center px-2">
              Super Admin
            </span>
          </div>
        </div>
      </div>

      {/* ── Navigation ────────────────────────────────────────────── */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              {item.submenu ? (
                <div>
                  {/* Parent button */}
                  <button
                    onClick={() => toggleSubmenu(index)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sidebar-accent-foreground group-hover:text-sidebar-primary transition-colors">
                        {item.icon}
                      </span>
                      <span className="font-medium text-sm">{item.title}</span>
                    </div>
                    <MdKeyboardArrowDown
                      size={18}
                      className={`text-sidebar-accent-foreground transition-transform duration-200 ${
                        openSubmenu === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Submenu */}
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      openSubmenu === index ? "max-h-96 mt-1" : "max-h-0"
                    }`}
                  >
                    <ul className="ml-11 space-y-1 py-1 relative">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) =>
                              `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                isActive
                                  ? "bg-sidebar-primary/10 text-sidebar-primary"
                                  : "text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                              }`
                            }
                          >
                            {subItem.title}
                          </NavLink>
                        </li>
                      ))}
                      {/* Vertical guide line */}
                      <div className="absolute -left-4 top-0 w-[3px] h-full bg-gradient-to-b from-sidebar-primary via-sidebar-border to-transparent rounded-full" />
                    </ul>
                  </div>
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <span
                          className={
                            isActive
                              ? "text-sidebar-primary-foreground"
                              : "text-sidebar-accent-foreground group-hover:text-sidebar-primary transition-colors"
                          }
                        >
                          {item.icon}
                        </span>
                        <span className="font-medium text-sm">
                          {item.title}
                        </span>
                      </div>
                      {item.badge && (
                        <span className="bg-destructive text-white text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Sign Out ──────────────────────────────────────────────── */}
      <div className="relative z-10 p-3 border-t border-sidebar-border">
        <button
          onClick={() => console.log("Signing out...")}
          className="
            group w-full flex items-center gap-3 px-3 py-2
            rounded-xl border border-destructive/10
            text-[13px] font-medium tracking-[0.01em]
            text-destructive bg-destructive/[0.09]
            hover:bg-destructive/[0.15] hover:border-destructive/30
            hover:shadow-[0_4px_18px_rgba(239,68,68,0.10)]
            transition-all duration-200
          "
        >
          <span
            className="
              w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0
              bg-sidebar-accent border border-sidebar-border
              group-hover:bg-destructive/[0.15] group-hover:border-destructive/30
              group-hover:shadow-[0_0_12px_rgba(239,68,68,0.2)]
              transition-all duration-200
            "
          >
            <RiLogoutBoxRLine size={16} />
          </span>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
