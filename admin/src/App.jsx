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
import AllProjects from "./pages/project/AllProjects";
import AddProject from "./pages/project/AddProject";
import Dashboard from "./pages/dashboard/Dashboard";
import ContactManagement from "./pages/contact/Contact";
import AddSkill from "./pages/skills/AddSkill";
import NotFound from "./pages/404/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Profile from "./pages/profile/Profile";
import EditProject from "./pages/project/EditProject";

const App = () => {
  return (
    <div className="bg-white dark:bg-[#050505] transition-colors duration-300">
      <Toaster />
      <Routes>
        {/* --- Public Auth Routes --- */}
        <Route
          path="auth"
          element={
            <PublicRoute>
              <Outlet />
            </PublicRoute>
          }
        >
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="verify-account" element={<OtpVerification />} />
        </Route>

        {/* --- Protected Admin Routes --- */}
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="hero-management" element={<Hero />} />
          <Route path="about" element={<UpdateBioForm />} />
          <Route path="skills/new" element={<AddSkill />} />
          <Route path="projects" element={<AllProjects />} />
          <Route path="projects/new" element={<AddProject />} />
          <Route path="services" element={<AllServices />} />
          <Route path="projects/edit/:id" element={<EditProject />} />
          <Route path="services/new" element={<AddService />} />
          <Route path="contact" element={<ContactManagement />} />
          <Route path="profile/me/:id" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
