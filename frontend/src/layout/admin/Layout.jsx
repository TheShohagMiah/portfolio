import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FiX } from "react-icons/fi"; // Added icon for the close button
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/Header";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  // Close sidebar on route change (Mobile UX)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Prevent background scrolling when sidebar is open (Mobile UX)
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-[#050505] flex overflow-hidden">
      {/* --- MOBILE SIDEBAR OVERLAY --- */}
      {/* Increased z-index to ensure it covers everything but the sidebar */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-md z-[60] transition-all duration-300 lg:hidden ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* --- SIDEBAR --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-[70] w-72 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-white/5 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />

        {/* Mobile Close Button - Integrated with icon */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-5 right-[-50px] p-2 bg-primary text-white rounded-xl lg:hidden shadow-lg"
        >
          <FiX size={20} />
        </button>
      </aside>

      {/* --- MAIN CONTENT SECTION --- */}
      <div className="flex flex-col flex-1 w-full lg:pl-72 min-w-0 transition-all duration-300">
        {/* Pass the toggle function to the header */}
        <AdminHeader onOpenSidebar={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-x-hidden">
          {/* Container with max-width for ultra-wide monitors */}
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
