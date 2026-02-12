import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// Layouts
import Layout from "./layout/client/Layout";
import AdminLayout from "./layout/admin/Layout";

// Auth Pages
import SignUp from "./assets/admin/pages/auth/SignUp";
import SignIn from "./assets/admin/pages/auth/Signin";

// Admin Dashboard Pages (Create these placeholder files or update paths)
// import Dashboard from "./assets/admin/pages/Dashboard";
// import ProjectGallery from "./assets/admin/pages/works/ProjectGallery";

const App = () => {
  return (
    <div className="selection:bg-primary selection:text-black">
      <Routes>
        {/* --- Public Auth Routes (No Layout) --- */}
        <Route path="auth">
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>

        {/* --- Client/Portfolio Routes --- */}
        <Route path="/" element={<Layout />}>
          <Route index element={<div>Client Home Content</div>} />
          {/* Add more client sub-routes here */}
        </Route>

        {/* --- Admin Panel Routes (Nested under AdminLayout) --- */}
        <Route path="admin" element={<AdminLayout />}>
          {/* Redirect /admin to /admin/dashboard */}
          <Route index element={<Navigate to="/admin/dashboard" replace />} />

          <Route path="dashboard" element={<div>Dashboard Content</div>} />

          {/* Section: Hero */}
          <Route path="hero-management" element={<div>Hero Settings</div>} />

          {/* Section: About */}
          <Route path="about" element={<div>Personal Info</div>} />
          <Route path="about/edit" element={<div>Edit Bio</div>} />

          {/* Section: Skills */}
          <Route path="skills" element={<div>Skills List</div>} />

          {/* Section: Works */}
          <Route path="works" element={<div>Project Gallery</div>} />
          <Route
            path="works/add-project"
            element={<div>Add New Project</div>}
          />

          {/* Section: Services */}
          <Route path="services" element={<div>Services Overview</div>} />
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
