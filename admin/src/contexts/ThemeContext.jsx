import React, { createContext, useContext, useEffect, useState } from "react";

const AdminThemeContext = createContext();

export function AdminThemeProvider({ children }) {
  const [adminTheme, setAdminTheme] = useState(() => {
    const stored = localStorage.getItem("adminTheme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (adminTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("adminTheme", adminTheme);
  }, [adminTheme]);

  const toggleadminTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <AdminThemeContext.Provider value={{ adminTheme, toggleadminTheme }}>
      {children}
    </AdminThemeContext.Provider>
  );
}

export const useadminTheme = () => useContext(AdminThemeContext);
