import React, { useState } from "react";
import { RiLightbulbFlashLine, RiLogoutBoxRLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { FiGrid, FiZap } from "react-icons/fi";
import { MdKeyboardArrowDown, MdDesignServices } from "react-icons/md";
import { LuUserPen } from "react-icons/lu";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { GrContact } from "react-icons/gr";
import { TbUserStar } from "react-icons/tb";

const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

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
      {/* ── Logo Section ────────────────────────────────────────── */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          {/* bg-logo is the gradient from your CSS */}
          <div className="w-10 h-10 bg-logo rounded-xl flex items-center justify-center shadow-sm">
            <RiLightbulbFlashLine size={22} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sidebar-foreground text-base uppercase tracking-wider">
              Shohag Miah
            </span>
            <span className="text-[9px] font-medium text-white shadow-md bg-logo w-fit rounded-full px-2 py-0.5">
              Super Admin
            </span>
          </div>
        </div>
      </div>

      {/* ── Navigation ──────────────────────────────────────────── */}
      <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <ul className="space-y-1.5">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(index)}
                    className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sidebar-accent-foreground group-hover:text-sidebar-primary transition-colors">
                        {item.icon}
                      </span>
                      <span className="font-medium text-sm">{item.title}</span>
                    </div>
                    <MdKeyboardArrowDown
                      size={18}
                      className={`text-sidebar-accent-foreground transition-transform duration-300 ${
                        openSubmenu === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openSubmenu === index
                        ? "max-h-96 opacity-100 mt-1"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="ml-11 space-y-1 py-1 relative">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) =>
                              `block px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                                isActive
                                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                                  : "text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                              }`
                            }
                          >
                            {subItem.title}
                          </NavLink>
                        </li>
                      ))}
                      {/* Vertical Decorative Line */}
                      <div className="absolute -left-4 top-0 w-[2px] h-full bg-sidebar-border rounded-full overflow-hidden">
                        <div
                          className={`w-full h-1/2 bg-sidebar-primary transition-transform duration-500 ${openSubmenu === index ? "translate-y-0" : "-translate-y-full"}`}
                        />
                      </div>
                    </ul>
                  </div>
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? "bg-logo text-white shadow-md"
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <span className="transition-colors text-sidebar-accent-foreground group-hover:text-sidebar-primary">
                      {item.icon}
                    </span>
                    <span className="font-medium text-sm">{item.title}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-destructive text-[10px] text-destructive-foreground font-bold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Footer / Sign Out ───────────────────────────────────── */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => console.log("Signing out...")}
          className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-destructive/20 text-[13px] font-semibold text-destructive bg-destructive/5 hover:bg-destructive hover:text-white transition-all duration-300"
        >
          <RiLogoutBoxRLine
            size={18}
            className="group-hover:rotate-12 transition-transform"
          />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
