import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AdminThemeProvider } from "./contexts/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AdminThemeProvider>
  </StrictMode>,
);
