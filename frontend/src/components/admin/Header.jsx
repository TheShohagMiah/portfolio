import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiBell,
  FiMail,
  FiMoon,
  FiSun,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMenu, // Added Menu Icon
} from "react-icons/fi";

// Added onOpenSidebar prop to connect with AdminLayout
const AdminHeader = ({ onOpenSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  return (
    <header className="sticky top-0 z-40 w-full h-20 bg-white/70 dark:bg-[#050505]/70 backdrop-blur-xl border-b border-zinc-200 dark:border-white/5 px-4 md:px-8 flex items-center justify-between">
      {/* 1. LEFT SIDE: Mobile Menu & Search */}
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Hamburger - Visible only on small screens */}
        <button
          onClick={onOpenSidebar}
          className="p-2 lg:hidden text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl transition-colors"
        >
          <FiMenu size={22} />
        </button>

        {/* Search Bar - Hidden on mobile, shows on md+ */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search analytics..."
              className="w-full bg-zinc-100 dark:bg-white/[0.03] border border-transparent focus:border-primary/30 outline-none rounded-2xl pl-12 pr-4 py-2.5 text-sm transition-all dark:text-white"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-zinc-300 dark:border-white/10 text-[10px] text-zinc-400 font-sans hidden lg:block uppercase">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Mobile Search Icon - Visible only on mobile */}
        <button className="p-2 md:hidden text-zinc-600 dark:text-zinc-400">
          <FiSearch size={20} />
        </button>
      </div>

      {/* 2. RIGHT SIDE: Actions & Profile */}
      <div className="flex items-center gap-2 md:gap-5">
        {/* Action Buttons */}
        <div className="flex items-center gap-1 border-r border-zinc-200 dark:border-white/10 pr-2 md:pr-5">
          <IconButton
            icon={<FiMail size={18} />}
            count={4}
            className="hidden sm:flex"
          />
          <IconButton icon={<FiBell size={18} />} count={2} isPulse />
          <IconButton
            onClick={() => setIsDark(!isDark)}
            icon={isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          />
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1 pr-2 sm:pr-3 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-white/10"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-primary to-blue-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shohag"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-[11px] font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 leading-none">
                Shohag Miah
              </p>
              <p className="text-[9px] font-bold text-primary tracking-tight">
                Super Admin
              </p>
            </div>
            <FiChevronDown
              className={`text-zinc-400 transition-transform duration-300 hidden sm:block ${isProfileOpen ? "rotate-180" : ""}`}
            />
          </motion.button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-56 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-[2rem] shadow-2xl p-2 z-50 overflow-hidden backdrop-blur-2xl"
              >
                <DropdownItem icon={<FiUser />} label="My Profile" />
                <DropdownItem icon={<FiSettings />} label="Account Settings" />
                <div className="h-px bg-zinc-200 dark:bg-white/5 my-1 mx-2" />
                <DropdownItem icon={<FiLogOut />} label="Logout" isDanger />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

const IconButton = ({ icon, count, isPulse, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`relative p-2.5 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-all group ${className}`}
  >
    {icon}
    {count && (
      <span
        className={`absolute top-2 right-2 w-4 h-4 bg-primary text-black text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-[#050505] ${isPulse ? "animate-bounce" : ""}`}
      >
        {count}
      </span>
    )}
  </button>
);

const DropdownItem = ({ icon, label, isDanger }) => (
  <button
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
      isDanger
        ? "text-red-500 hover:bg-red-500/10"
        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5"
    }`}
  >
    <span className="text-lg">{icon}</span>
    {label}
  </button>
);

export default AdminHeader;
