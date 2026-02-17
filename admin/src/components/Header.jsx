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
    <header className="h-16 bg-background border-b border-border px-4 flex items-center justify-between">
      {/* ── Left ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <RiMenuLine size={20} className="text-foreground" />
        </button>

        <div className="relative max-w-md w-full">
          <LuSearch
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search..."
            className="
              w-full pl-9 pr-4 py-2
              bg-muted border border-border rounded-lg
              text-sm text-foreground placeholder:text-muted-foreground
              focus:outline-none focus:border-ring
              transition-colors
            "
          />
        </div>
      </div>

      {/* ── Right ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggleAdminTheme}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          {adminTheme === "dark" ? (
            <LuSunDim size={20} className="text-foreground" />
          ) : (
            <LuMoon size={20} className="text-foreground" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-muted rounded-lg relative transition-colors"
          >
            <LuBell size={20} className="text-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-20">
                <div className="px-4 py-3 border-b border-border">
                  <p className="font-medium text-sm text-popover-foreground">
                    Notifications
                  </p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`
                        px-4 py-3 border-b border-border last:border-0
                        hover:bg-muted cursor-pointer transition-colors
                        ${notif.unread ? "bg-muted" : ""}
                      `}
                    >
                      <p className="text-sm text-popover-foreground">
                        {notif.text}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notif.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Settings */}
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <PiGearSixBold size={20} className="text-foreground" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-border mx-1" />

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {/* Avatar */}
            <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-medium">
              SM
            </div>

            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-foreground">Shohag Miah</p>
              <p className="text-xs text-muted-foreground">Super Admin</p>
            </div>

            <RiArrowDownSLine
              size={18}
              className={`text-muted-foreground hidden md:block transition-transform ${
                showProfileMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {showProfileMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-52 bg-popover border border-border rounded-lg shadow-lg z-20">
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-medium text-popover-foreground">
                    Shohag Miah
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    admin@shohag.com
                  </p>
                </div>

                <div className="py-1">
                  <button className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted flex items-center gap-2 transition-colors">
                    <LuUserRoundSearch size={16} />
                    <span>My Profile</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted flex items-center gap-2 transition-colors">
                    <PiGearSixBold size={16} />
                    <span>Settings</span>
                  </button>
                </div>

                <div className="border-t border-border py-1">
                  <button className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-muted flex items-center gap-2 transition-colors">
                    <RiLogoutBoxLine size={16} />
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
