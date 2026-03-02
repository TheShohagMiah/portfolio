import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiGithub,
  FiChrome,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SocialButton from "../../components/shared/SocialButton";
import { Field } from "../../components/shared/InputField";
import { useAuth } from "../../contexts/AuthContext";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validators/auth/authValidations";

// Theme-aware input styling
export const inputCls = (hasError) =>
  `w-full px-4 py-3 rounded-xl text-sm transition-all duration-200
   bg-gray-100 border-gray-200 text-gray-900 placeholder:text-gray-400
   dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-gray-500
   focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
   ${hasError ? "border-red-500 ring-red-500/10" : "hover:border-primary/30"}`;

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showPassword, setShowPassword] = useState(false);

  // Redirect to dashboard or the page they tried to access
  const from = location.state?.from?.pathname || "/admin/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema), mode: "onBlur" });

  const onSubmit = async (data) => {
    const result = await login(data);
    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-300
                 bg-white text-gray-900 dark:bg-[#050505] dark:text-white overflow-hidden"
    >
      {/* Dynamic Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 z-0 transition-opacity duration-500 opacity-20 dark:opacity-40"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.15), transparent 40%)`,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] relative z-10"
      >
        <div className="bg-white border border-gray-200 shadow-2xl dark:bg-white/[0.02] dark:border-white/5 dark:backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[10px] font-black tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-6">
              WELCOME BACK
            </div>
            <h2 className="text-4xl font-bold tracking-tighter italic font-serif">
              Sign In
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Field label="Email" required error={errors.email?.message}>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                  })}
                  placeholder="name@company.com"
                  className={`${inputCls(!!errors.email)} pl-11`}
                />
              </div>
            </Field>

            <Field label="Password" required error={errors.password?.message}>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`${inputCls(!!errors.password)} pl-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </Field>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-gray-900 text-white dark:bg-white dark:text-black py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 mt-4 hover:bg-primary dark:hover:bg-primary transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Access Account <FiArrowRight />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em]">
              <span className="bg-white dark:bg-[#0a0a0a] px-4 text-gray-400">
                Quick Connect
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SocialButton icon={<FiChrome />} label="Google" />
            <SocialButton icon={<FiGithub />} label="GitHub" />
          </div>

          <p className="mt-10 text-center text-gray-500 text-xs font-medium">
            New here?{" "}
            <Link
              to="/auth/signup"
              className="text-gray-900 dark:text-white font-bold hover:text-primary transition-colors underline-offset-4 underline decoration-current/10"
            >
              Create account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
