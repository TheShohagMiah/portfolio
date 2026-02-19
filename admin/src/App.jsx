import React from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/Signin";
import OtpVerification from "./pages/auth/OtpVerification";
import UpdateBioForm from "./pages/about/About";
import AddService from "./pages/services/AddService";
import AllServices from "./pages/services/AllServices";
import Hero from "./pages/Hero/Hero";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="">
      <Toaster />
      <Routes>
        <Route element={<Outlet />}>
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
            <Route path="hero-management" element={<Hero />} />
            <Route path="about" element={<UpdateBioForm />} />
            <Route path="skills" element={<div>Skills List</div>} />
            <Route path="works" element={<div>Project Gallery</div>} />
            <Route path="services" element={<AllServices />} />

            <Route path="services/new" element={<AddService />} />
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
