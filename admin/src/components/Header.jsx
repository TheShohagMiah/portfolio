import React, { useState } from "react";
import { RiArrowDownSLine, RiLogoutBoxLine, RiMenuLine } from "react-icons/ri";
import {
  LuMoon,
  LuSunDim,
  LuBell,
  LuSearch,
  LuUserRoundSearch,
} from "react-icons/lu";
import { PiGearSixBold } from "react-icons/pi";
import { useAdminTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Header = ({ onMenuClick }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { adminTheme, toggleAdminTheme } = useAdminTheme();
  const { user, logout } = useAuth();

  const getInitials = (fullName) => {
    if (!fullName) return "";

    return fullName
      .trim() // Remove accidental leading/trailing spaces
      .split(/\s+/) // Split by one or more spaces (handles double spaces)
      .map((word) => word[0]) // Grab the first letter of every word
      .join("") // Join them (e.g., ["J", "D"] -> "JD")
      .toUpperCase(); // Ensure they are capitalized
  };

  const fullAbbreviation = getInitials(user?.fullName);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/signin", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
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
    <header className="h-20 bg-background/20 backdrop-blur-xl border-b border-border px-6 flex items-center justify-between sticky top-0 z-30">
      {/* ── Left: Search ────────────────────────────────────────── */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-muted rounded-xl transition-all"
        >
          <RiMenuLine size={22} />
        </button>

        <div className="relative max-w-md w-full hidden sm:block group">
          <LuSearch
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
          />
          <input
            type="text"
            placeholder="Search everything..."
            className="w-full pl-10 pr-12 py-2.5 bg-muted/40 border border-border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          {/* Keyboard Hint */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-background text-[10px] font-bold text-muted-foreground">
            <span className="text-[12px]">⌘</span>K
          </div>
        </div>
      </div>

      {/* ── Right: Actions ───────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleAdminTheme}
          className="w-10 h-10 flex items-center justify-center bg-muted rounded-xl transition-all text-primary"
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
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all relative ${
              showNotifications
                ? "bg-primary/10 text-primary"
                : "text-primary bg-muted"
            }`}
          >
            <LuBell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-background" />
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-3 w-80 bg-popover border border-border rounded-2xl shadow-2xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div className="px-5 py-4 border-b border-border flex justify-between items-center bg-muted/20">
                  <h3 className="font-bold text-sm text-foreground">
                    Notifications
                  </h3>
                  <button className="text-[10px] font-bold text-primary hover:underline">
                    Mark all read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors flex gap-3"
                    >
                      <div
                        className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${notif.unread ? "bg-primary" : "bg-transparent"}`}
                      />
                      <div>
                        <p
                          className={`text-sm ${notif.unread ? "text-foreground font-medium" : "text-muted-foreground"}`}
                        >
                          {notif.text}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-1">
                          {notif.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 p-1 rounded-xl hover:bg-muted transition-all"
          >
            <div className="w-9 h-9 bg-gradient-to-tr from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center text-white text-xs font-black shadow-lg">
              {fullAbbreviation}
            </div>
            <RiArrowDownSLine
              className={`text-muted-foreground transition-transform ${showProfileMenu ? "rotate-180" : ""}`}
            />
          </button>

          {showProfileMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 mt-3 w-56 bg-popover border border-border rounded-2xl shadow-2xl z-20 p-2 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 mb-2 border-b border-border/50">
                  <p className="text-sm font-bold truncate">{user?.fullName}</p>
                  <a
                    href={`mailto:${user?.email}`}
                    className="text-[10px] text-emerald-500 font-medium underline"
                  >
                    {user?.email.toLowerCase()}
                  </a>
                </div>
                <Link
                  to={`/admin/profile/me/${user._id}`}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                >
                  <LuUserRoundSearch size={16} /> My Profile
                </Link>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
                  <PiGearSixBold size={16} /> Settings
                </button>
                <div className="my-1 border-t border-border/50" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-500/10 transition-all font-semibold"
                >
                  <RiLogoutBoxLine size={16} /> Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
