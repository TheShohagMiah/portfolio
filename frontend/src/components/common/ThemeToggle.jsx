import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { LuMoon, LuSunMedium } from "react-icons/lu";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "dark" ? (
        <LuSunMedium className="cursor-pointer" />
      ) : (
        <LuMoon className="cursor-pointer" />
      )}
    </button>
  );
}
