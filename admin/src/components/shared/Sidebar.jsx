import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid,
  FiUser,
  FiCode,
  FiBriefcase,
  FiLayers,
  FiHome,
  FiLogOut,
  FiChevronRight,
  FiPlus,
  FiList,
} from "react-icons/fi";
import { RiShieldCheckLine } from "react-icons/ri";

const Sidebar = () => {
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const currentParent = menuItems.find((item) =>
      item.submenu?.some((sub) => pathname.startsWith(sub.path)),
    );
    if (currentParent) setOpenMenu(currentParent.name);
  }, [pathname]);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FiGrid /> },
    {
      name: "Hero Section",
      icon: <FiHome />,
      submenu: [
        {
          name: "Manage Content",
          path: "/admin/hero-management",
          icon: <FiList />,
        },
      ],
    },
    {
      name: "About Me",
      icon: <FiUser />,
      submenu: [
        { name: "Personal Info", path: "/admin/about", icon: <FiList /> },
        { name: "Update Bio", path: "/admin/about/edit", icon: <FiPlus /> },
      ],
    },
    {
      name: "Skills",
      icon: <FiCode />,
      submenu: [
        { name: "All Skills", path: "/admin/skills", icon: <FiList /> },
        {
          name: "Add New Skill",
          path: "/admin/skills/add-project",
          icon: <FiPlus />,
        },
      ],
    },
    {
      name: "Works",
      icon: <FiBriefcase />,
      submenu: [
        { name: "Project Gallery", path: "/admin/works", icon: <FiList /> },
        {
          name: "Add Project",
          path: "/admin/works/add-project",
          icon: <FiPlus />,
        },
      ],
    },
    {
      name: "Services",
      icon: <FiLayers />,
      submenu: [
        { name: "Service List", path: "/admin/services", icon: <FiList /> },
        { name: "Add Service", path: "/admin/services/add", icon: <FiPlus /> },
      ],
    },
  ];

  return (
    // Removed 'sticky', 'w-72', and extra borders because AdminLayout handles the container
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Brand Section */}
      <div className="px-8 py-10 shrink-0">
        <Link to="/admin/dashboard" className="flex items-center gap-4 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-primary/20"
          >
            <RiShieldCheckLine size={24} />
          </motion.div>
          <div className="flex flex-col truncate">
            <span className="text-sm font-black tracking-tighter text-zinc-900 dark:text-zinc-100 uppercase italic font-serif truncate">
              Shohag.dev
            </span>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] leading-none">
              Admin Suite
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Area */}
      <nav className="flex-1 px-4 overflow-y-auto custom-scrollbar pb-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 },
            },
          }}
          className="space-y-1"
        >
          {menuItems.map((item, idx) => (
            <MenuItem
              key={idx}
              item={item}
              pathname={pathname}
              isOpen={openMenu === item.name}
              setOpenMenu={setOpenMenu}
            />
          ))}
        </motion.div>
      </nav>

      {/* Footer Section */}
      <div className="p-6 mt-auto border-t border-zinc-100 dark:border-white/5 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm shrink-0">
        <motion.button
          whileHover={{ x: 4 }}
          className="flex items-center gap-3 w-full px-4 py-3 text-xs font-black uppercase tracking-widest text-red-500 bg-red-500/5 hover:bg-red-500/10 rounded-2xl transition-all border border-red-500/10 group"
        >
          <FiLogOut
            size={16}
            className="group-hover:rotate-12 transition-transform"
          />
          Sign Out
        </motion.button>
      </div>
    </div>
  );
};

const MenuItem = ({ item, pathname, isOpen, setOpenMenu }) => {
  const hasSubmenu = !!item.submenu;
  const isParentActive = item.submenu?.some((sub) =>
    pathname.startsWith(sub.path),
  );

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div variants={itemVariants} className="mb-1">
      {hasSubmenu ? (
        <>
          <motion.button
            onClick={() => setOpenMenu(isOpen ? null : item.name)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm transition-all relative overflow-hidden group ${
              isOpen || isParentActive
                ? "bg-zinc-100 dark:bg-white/[0.04] text-zinc-900 dark:text-zinc-100"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/[0.02]"
            }`}
          >
            <div className="flex items-center gap-3 relative z-10">
              <span
                className={`transition-colors ${isOpen || isParentActive ? "text-primary" : "text-zinc-400"}`}
              >
                {React.cloneElement(item.icon, { size: 18 })}
              </span>
              <span className="font-bold tracking-tight">{item.name}</span>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              className="text-zinc-400"
            >
              <FiChevronRight size={14} />
            </motion.div>
          </motion.button>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <ul className="mt-1 ml-6 pl-4 border-l border-zinc-200 dark:border-white/5 space-y-1 py-1">
                  {item.submenu.map((sub, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ x: -5, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.03 }}
                    >
                      <NavLink
                        to={sub.path}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all ${
                            isActive
                              ? "text-primary bg-primary/10"
                              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:translate-x-1"
                          }`
                        }
                      >
                        {React.cloneElement(sub.icon, { size: 14 })}
                        {sub.name}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold tracking-tight transition-all relative group ${
              isActive
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/[0.04]"
            }`
          }
        >
          <span
            className={({ isActive }) =>
              `${isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-600"}`
            }
          >
            {React.cloneElement(item.icon, { size: 18 })}
          </span>
          {item.name}
        </NavLink>
      )}
    </motion.div>
  );
};

export default Sidebar;
