import React from "react";
import { LuMoon, LuSunMedium } from "react-icons/lu";
import { useadminTheme } from "../contexts/adminThemeContext"; // Ensure path is correct

export function ThemeToggle() {
  // Destructure using the exact names from your AdminThemeContext
  const { adminTheme, toggleadminTheme } = useadminTheme();

  return (
    <button
      onClick={toggleadminTheme}
      aria-label="Toggle admin theme"
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      {adminTheme === "dark" ? (
        <LuSunMedium size={20} className="text-yellow-400" />
      ) : (
        <LuMoon size={20} className="text-slate-700" />
      )}
    </button>
  );
}
