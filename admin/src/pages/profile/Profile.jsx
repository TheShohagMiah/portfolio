import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiUser,
  FiMail,
  FiMapPin,
  FiShield,
  FiLock,
  FiSave,
  FiEdit2,
  FiCheckCircle,
  FiAlertCircle,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { LuLoader } from "react-icons/lu";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Field } from "../../components/shared/InputField";

/* Match your AddService input styling */
export const inputCls = (hasError) =>
  `w-full bg-secondary border rounded-2xl py-3 px-4 text-sm text-foreground 
   placeholder:text-muted-foreground focus:outline-none transition-all
   ${hasError ? "border-destructive/50" : "border-border focus:border-primary/50"}`;

const AdminProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState({
    current: false,
    next: false,
    confirm: false,
  });

  // ────────────────────────────────────────────────────────────────
  // Profile form
  // ──────────────────────────────────���─────────────────────────────
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: {
      errors: profileErrors,
      isSubmitting: isProfileSubmitting,
      isDirty: isProfileDirty,
    },
  } = useForm({
    defaultValues: {
      name: user?.name || "Shohag Miah",
      email: user?.email || "admin@shohag.com",
      location: user?.location || "Dhaka, Bangladesh",
      role: user?.role || "Super Admin",
      bio: user?.bio || "",
    },
  });

  const onSubmitProfile = async (data) => {
    try {
      // update endpoint (change to your real one)
      const res = await axios.put(
        "http://localhost:5000/api/me/profile",
        data,
        {
          withCredentials: true,
        },
      );

      if (res.data?.success) {
        toast.success(res.data?.message || "Profile updated successfully");
        setIsEditing(false);
      } else {
        toast.error(res.data?.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Profile update failed");
    }
  };

  // ────────────────────────────────────────────────────────────────
  // Change password form
  // ──────────────────────────────────────────────────────���─────────
  const {
    register: registerPw,
    handleSubmit: handleSubmitPw,
    reset: resetPw,
    formState: {
      errors: pwErrors,
      isSubmitting: isPwSubmitting,
      isDirty: isPwDirty,
    },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmitPassword = async (data) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        toast.error("New password and confirm password do not match");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/auth/change-password",
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        { withCredentials: true },
      );

      if (res.data?.success) {
        toast.success(res.data?.message || "Password updated successfully");
        resetPw();
      } else {
        toast.error(res.data?.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Password update error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Password update failed");
    }
  };

  return (
    <section className="py-8 min-h-screen text-foreground">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header (same vibe as AddService) */}
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">
              Account{" "}
              <span className="text-muted-foreground italic font-serif text-3xl">
                Settings.
              </span>
            </h1>
            <p className="text-muted-foreground text-sm mt-2 font-sans">
              Manage your identity, contact info, and security protocols.
            </p>
          </div>

          <button
            onClick={() => setIsEditing((s) => !s)}
            className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-xl
              ${
                isEditing
                  ? "bg-secondary text-foreground border border-border hover:border-primary/40"
                  : "bg-primary text-primary-foreground hover:opacity-90 shadow-primary/10"
              }`}
          >
            {isEditing ? <FiSave /> : <FiEdit2 />}
            {isEditing ? "Save Mode" : "Edit Profile"}
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 items-start">
          {/* Left: Identity card */}
          <aside className="lg:sticky lg:top-8 space-y-6">
            <div className="bg-card p-10 rounded-[3rem] border border-border shadow-sm">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-3xl bg-secondary border border-border flex items-center justify-center">
                  <FiUser className="text-xl text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold truncate">
                    {user?.name || "Shohag Miah"}
                  </h2>
                  <p className="text-xs text-muted-foreground font-mono truncate">
                    {user?.email || "admin@shohag.com"}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <FiMail className="text-primary" />
                  <span className="truncate">
                    {user?.email || "admin@shohag.com"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <FiMapPin className="text-primary" />
                  <span className="truncate">
                    {user?.location || "Dhaka, Bangladesh"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <FiShield className="text-primary" />
                  <span>Role: {user?.role || "Super Admin"}</span>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-3xl bg-secondary/50 border border-border">
                <p className="text-[10px] leading-relaxed text-muted-foreground font-sans">
                  <span className="font-bold text-foreground">Note:</span> Keep
                  your email accurate for recovery alerts and system
                  notifications.
                </p>
              </div>
            </div>

            {/* Status line like AddService */}
            <div className="flex items-center gap-2 px-2">
              <div
                className={`h-1.5 w-1.5 rounded-full ${
                  isEditing && isProfileDirty
                    ? "bg-chart-3 animate-pulse"
                    : "bg-chart-2"
                }`}
              />
              <span className="text-[10px] font-mono uppercase tracking-tighter text-muted-foreground">
                {isEditing && isProfileDirty
                  ? "Unsaved Changes"
                  : "State Synced"}
              </span>
            </div>
          </aside>

          {/* Right: Forms */}
          <div className="lg:col-span-2 space-y-10">
            {/* Profile editor */}
            <form
              onSubmit={handleSubmitProfile(onSubmitProfile)}
              className="space-y-8 bg-card p-10 rounded-[3rem] border border-border shadow-sm"
            >
              <div className="flex items-center gap-4 px-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                  Identity Matrix
                </span>
                <div className="h-[1px] flex-1 bg-border" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Field
                  label="Full Name"
                  required
                  error={profileErrors.name?.message}
                >
                  <input
                    disabled={!isEditing}
                    {...registerProfile("name", {
                      required: "Name is required",
                    })}
                    className={`${inputCls(!!profileErrors.name)} ${!isEditing ? "opacity-70" : ""}`}
                    placeholder="Your name"
                  />
                </Field>

                <Field
                  label="Email Address"
                  required
                  error={profileErrors.email?.message}
                >
                  <input
                    disabled={!isEditing}
                    {...registerProfile("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    className={`${inputCls(!!profileErrors.email)} ${!isEditing ? "opacity-70" : ""}`}
                    placeholder="you@example.com"
                  />
                </Field>

                <Field label="Location" error={profileErrors.location?.message}>
                  <input
                    disabled={!isEditing}
                    {...registerProfile("location")}
                    className={`${inputCls(!!profileErrors.location)} ${!isEditing ? "opacity-70" : ""}`}
                    placeholder="City, Country"
                  />
                </Field>

                <Field label="Role">
                  <input
                    disabled
                    {...registerProfile("role")}
                    className="w-full bg-secondary/30 border border-border rounded-2xl py-3 px-4 text-sm text-muted-foreground cursor-not-allowed"
                  />
                </Field>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end px-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Professional Bio
                  </label>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {/* simple count without watch to keep it light */}
                    Max 300
                  </span>
                </div>
                <textarea
                  disabled={!isEditing}
                  rows={4}
                  {...registerProfile("bio", { maxLength: 300 })}
                  className={`${inputCls(!!profileErrors.bio)} resize-none font-sans ${
                    !isEditing ? "opacity-70" : ""
                  }`}
                  placeholder="Write a short professional bio..."
                />
                {profileErrors.bio && (
                  <p className="text-[10px] text-destructive mt-1 ml-1">
                    Bio too long (max 300)
                  </p>
                )}
              </div>

              <div className="pt-8 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${
                      isEditing && isProfileDirty
                        ? "bg-chart-3 animate-pulse"
                        : "bg-chart-2"
                    }`}
                  />
                  <span className="text-[10px] font-mono uppercase tracking-tighter text-muted-foreground">
                    {isEditing && isProfileDirty
                      ? "Unsaved Changes"
                      : "State Synced"}
                  </span>
                </div>

                <button
                  disabled={!isEditing || isProfileSubmitting}
                  className="flex items-center gap-3 px-8 py-3.5 bg-primary text-primary-foreground rounded-2xl text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProfileSubmitting ? (
                    <LuLoader className="animate-spin" />
                  ) : (
                    <FiSave />
                  )}
                  Save Profile
                </button>
              </div>
            </form>

            {/* Change password */}
            <form
              onSubmit={handleSubmitPw(onSubmitPassword)}
              className="space-y-8 bg-card p-10 rounded-[3rem] border border-border shadow-sm"
            >
              <div className="flex items-center gap-4 px-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                  Security Protocol
                </span>
                <div className="h-[1px] flex-1 bg-border" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Field
                  label="Current Password"
                  required
                  error={pwErrors.currentPassword?.message}
                >
                  <div className="relative">
                    <input
                      type={show.current ? "text" : "password"}
                      {...registerPw("currentPassword", {
                        required: "Current password is required",
                      })}
                      className={inputCls(!!pwErrors.currentPassword)}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShow((s) => ({ ...s, current: !s.current }))
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Toggle current password visibility"
                    >
                      {show.current ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </Field>

                <Field
                  label="New Password"
                  required
                  error={pwErrors.newPassword?.message}
                >
                  <div className="relative">
                    <input
                      type={show.next ? "text" : "password"}
                      {...registerPw("newPassword", {
                        required: "New password is required",
                        minLength: {
                          value: 8,
                          message: "Minimum 8 characters",
                        },
                      })}
                      className={inputCls(!!pwErrors.newPassword)}
                      placeholder="At least 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShow((s) => ({ ...s, next: !s.next }))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Toggle new password visibility"
                    >
                      {show.next ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </Field>

                <Field
                  label="Confirm Password"
                  required
                  error={pwErrors.confirmPassword?.message}
                >
                  <div className="relative">
                    <input
                      type={show.confirm ? "text" : "password"}
                      {...registerPw("confirmPassword", {
                        required: "Confirm password is required",
                        minLength: {
                          value: 8,
                          message: "Minimum 8 characters",
                        },
                      })}
                      className={inputCls(!!pwErrors.confirmPassword)}
                      placeholder="Repeat new password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShow((s) => ({ ...s, confirm: !s.confirm }))
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Toggle confirm password visibility"
                    >
                      {show.confirm ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </Field>

                <div className="rounded-[2rem] bg-secondary/30 border border-border p-6 flex items-start gap-3">
                  <FiShield className="text-primary mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest">
                      Hardening Tips
                    </p>
                    <p className="text-[10px] leading-relaxed text-muted-foreground mt-2 font-sans">
                      Use a unique password with letters, numbers, and symbols.
                      Consider logging out from all devices after update.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${
                      isPwDirty ? "bg-chart-3 animate-pulse" : "bg-chart-2"
                    }`}
                  />
                  <span className="text-[10px] font-mono uppercase tracking-tighter text-muted-foreground">
                    {isPwDirty ? "Pending Security Update" : "Security Stable"}
                  </span>
                </div>

                <button
                  disabled={isPwSubmitting}
                  className="flex items-center gap-3 px-8 py-3.5 bg-primary text-primary-foreground rounded-2xl text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPwSubmitting ? (
                    <LuLoader className="animate-spin" />
                  ) : (
                    <FiLock />
                  )}
                  Update Password
                </button>
              </div>

              {/* Lightweight inline hint (optional) */}
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground px-1">
                <FiAlertCircle />
                <span>
                  If the update fails, confirm your current password and try
                  again.
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminProfile;
