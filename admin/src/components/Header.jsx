import React, { useState } from "react";
import { RiLogoutBoxLine, RiArrowDownSLine, RiMenuLine } from "react-icons/ri";
import {
  LuMoon,
  LuSunDim,
  LuBell,
  LuSearch,
  LuUserRoundSearch,
} from "react-icons/lu";
import { PiGearSixBold } from "react-icons/pi";
import { useAdminTheme } from "../contexts/ThemeContext";

const Header = ({ onMenuClick }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { adminTheme, toggleAdminTheme } = useAdminTheme();

  const notifications = [
    { id: 1, text: "New message from client", time: "5 min ago", unread: true },
    {
      id: 2,
      text: "Project deadline tomorrow",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      text: "Server backup completed",
      time: "3 hours ago",
      unread: false,
    },
  ];

  return (
    <header className="h-16 bg-background border-b border-border px-6 flex items-center justify-between sticky top-0 z-30">
      {/* ── Left: Search & Mobile Menu ────────────────────────────── */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2.5 hover:bg-muted rounded-xl transition-all active:scale-95"
          aria-label="Toggle Menu"
        >
          <RiMenuLine size={22} className="text-foreground" />
        </button>

        <div className="relative max-w-md w-full hidden sm:block">
          <LuSearch
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Quick search..."
            className="
              w-full pl-10 pr-4 py-2
              bg-muted/50 border border-border rounded-xl
              text-sm text-foreground placeholder:text-muted-foreground
              focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring focus:bg-background
              transition-all duration-200
            "
          />
        </div>
      </div>

      {/* ── Right: Actions ───────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggleAdminTheme}
          className="p-2.5 hover:bg-muted rounded-xl transition-all text-muted-foreground hover:text-foreground active:scale-90"
          title="Toggle Theme"
        >
          {adminTheme === "dark" ? (
            <LuSunDim size={20} />
          ) : (
            <LuMoon size={20} />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className={`p-2.5 rounded-xl transition-all active:scale-90 relative ${
              showNotifications
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <LuBell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-destructive rounded-full border-2 border-background animate-pulse" />
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-3 w-80 bg-popover border border-border rounded-2xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                <div className="px-5 py-4 border-b border-border bg-muted/30 flex justify-between items-center">
                  <span className="font-bold text-sm">Notifications</span>
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                    2 New
                  </span>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-5 py-4 border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer transition-colors relative ${notif.unread ? "bg-primary/5" : ""}`}
                    >
                      {notif.unread && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                      )}
                      <p
                        className={`text-sm ${notif.unread ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                      >
                        {notif.text}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1.5 flex items-center gap-1">
                        • {notif.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-border/60 mx-1 hidden sm:block" />

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className={`flex items-center gap-3 p-1.5 pl-2 rounded-xl transition-all ${
              showProfileMenu ? "bg-muted shadow-inner" : "hover:bg-muted"
            }`}
          >
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-foreground leading-tight">
                Shohag Miah
              </p>
              <p className="text-[11px] text-muted-foreground font-medium">
                Super Admin
              </p>
            </div>
            <div className="w-9 h-9 bg-logo rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-md ring-2 ring-background">
              SM
            </div>
          </button>

          {showProfileMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 mt-3 w-60 bg-popover border border-border rounded-2xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                <div className="p-4 bg-muted/30 border-b border-border">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    Account
                  </p>
                </div>
                <div className="p-2">
                  <button className="w-full px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-muted flex items-center gap-3 transition-colors">
                    <LuUserRoundSearch size={18} className="text-primary" />
                    <span className="font-medium">My Profile</span>
                  </button>
                  <button className="w-full px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-muted flex items-center gap-3 transition-colors">
                    <PiGearSixBold size={18} className="text-primary" />
                    <span className="font-medium">Settings</span>
                  </button>
                </div>
                <div className="p-2 border-t border-border bg-muted/10">
                  <button className="w-full px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 flex items-center gap-3 transition-colors font-semibold">
                    <RiLogoutBoxLine size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
