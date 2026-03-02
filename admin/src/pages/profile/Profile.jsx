import React, { useState } from "react";
import {
  FiCamera,
  FiMail,
  FiShield,
  FiMapPin,
  FiSave,
  FiEdit2,
} from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";

const AdminProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto animate-in fade-in duration-500">
      {/* ── Header Section ────────────────────────────────────────── */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Account Settings
          </h1>
          <p className="text-zinc-400 text-sm font-medium">
            Manage your professional profile and security.
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-emerald-900/20"
        >
          {isEditing ? <FiSave size={18} /> : <FiEdit2 size={18} />}
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Left Column: Avatar & Role ──────────────────────────── */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-6 text-center shadow-xl">
            <div className="relative w-32 h-32 mx-auto mb-4 group">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 p-1">
                <div className="w-full h-full rounded-2xl bg-zinc-900 flex items-center justify-center overflow-hidden border-2 border-zinc-900">
                  {/* Fallback to Icon if no user image */}
                  <FiSave size={80} className="text-zinc-600" />
                </div>
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-zinc-800 border border-zinc-700 rounded-xl text-emerald-400 hover:text-white hover:bg-emerald-600 transition-colors shadow-lg">
                <FiCamera size={16} />
              </button>
            </div>

            <h2 className="text-lg font-bold text-white">Shohag Miah</h2>
            <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
              Super Admin
            </span>

            <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3 text-left">
              <div className="flex items-center gap-3 text-zinc-400 text-sm">
                <FiMail className="text-emerald-500" />
                <span>admin@shohag.com</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400 text-sm">
                <FiShield className="text-emerald-500" />
                <span>Security Level: High</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column: Form Details ─────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#18181b] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-zinc-800 bg-zinc-900/50">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <FiSave className="text-emerald-500" /> Personal Information
              </h3>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">
                  Full Name
                </label>
                <input
                  disabled={!isEditing}
                  type="text"
                  defaultValue="Shohag Miah"
                  className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none transition-all disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">
                  Email Address
                </label>
                <input
                  disabled={!isEditing}
                  type="email"
                  defaultValue="admin@shohag.com"
                  className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none transition-all disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">
                  Location
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    disabled={!isEditing}
                    type="text"
                    defaultValue="Dhaka, Bangladesh"
                    className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:border-emerald-500 outline-none transition-all disabled:opacity-50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">
                  Role
                </label>
                <input
                  disabled
                  type="text"
                  defaultValue="Super Admin Access"
                  className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-500 rounded-xl px-4 py-3 text-sm cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-[#18181b] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 space-y-4">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">
                Professional Bio
              </label>
              <textarea
                disabled={!isEditing}
                rows="4"
                className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none transition-all resize-none disabled:opacity-50"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
