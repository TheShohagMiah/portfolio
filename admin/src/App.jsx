import React from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { AdminThemeProvider } from "./contexts/ThemeContext"; // Verify path
import AdminLayout from "./layout/AdminLayout";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/Signin";
import OtpVerification from "./pages/auth/OtpVerification";

const App = () => {
  return (
    <div className="selection:bg-primary selection:text-black">
      <Routes>
        {/* --- Admin & Auth Scope --- */}
        {/* We wrap both in the Provider so they share the same 'dark/light' state */}
        <Route
          element={
            <AdminThemeProvider>
              <Outlet />
            </AdminThemeProvider>
          }
        >
          {/* Auth Routes (No Sidebar) */}
          <Route path="auth">
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="verify-account" element={<OtpVerification />} />
          </Route>

          {/* Dashboard Routes (With AdminLayout Sidebar/Nav) */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<div>Dashboard Content</div>} />
            <Route path="hero-management" element={<div>Hero Settings</div>} />
            <Route path="about" element={<div>Personal Info</div>} />
            <Route path="skills" element={<div>Skills List</div>} />
            <Route path="works" element={<div>Project Gallery</div>} />
            <Route path="services" element={<div>Services Overview</div>} />
          </Route>
        </Route>

        {/* --- Client/Portfolio Routes --- */}
        {/* You can add your ClientThemeProvider here later */}
        <Route path="/" element={<div>Client Layout Component Here</div>}>
          <Route index element={<div>Portfolio Home</div>} />
        </Route>

        {/* --- 404 Route --- */}
        <Route
          path="*"
          element={
            <div className="h-screen flex items-center justify-center bg-[#050505] text-white">
              <h1 className="text-2xl font-black italic">
                404 | Lost in Space
              </h1>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
