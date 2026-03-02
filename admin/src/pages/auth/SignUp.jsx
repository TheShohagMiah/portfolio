import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight,
  FiGithub,
  FiAlertCircle,
  FiChrome,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Field } from "../../components/shared/InputField";
import SocialButton from "../../components/shared/SocialButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../validators/auth/authValidations";

export const inputCls = (hasError) =>
  `w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-white
   placeholder:text-gray-500
   focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
   transition-all duration-200
   ${hasError ? "border-red-500 ring-red-500/10" : "border-white/10 hover:border-white/30"}`;

// ✅ Reusable password input with show/hide toggle
const PasswordInput = ({ hasError, ...props }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={show ? "text" : "password"}
        className={`${inputCls(hasError)} pr-11`}
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
        tabIndex={-1} // don't interrupt tab flow
      >
        {show ? <FiEyeOff size={16} /> : <FiEye size={16} />}
      </button>
    </div>
  );
};

const SignUp = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema), mode: "onBlur" });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        data,
        { withCredentials: true },
      );

      if (response.data?.success) {
        toast.success(response.data.message || "OTP sent to your email!");
        reset();
        setTimeout(() => {
          navigate("/auth/verify-account", { state: { email: data.email } });
        }, 1500);
      }
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      toast.error(backendMessage || "Registration failed");
    }
  };

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full bg-[#050505] text-white flex items-center justify-center p-4 overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 z-0 transition-opacity duration-500 opacity-50"
          style={{
            background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.15), transparent 40%)`,
          }}
        />
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl grid lg:grid-cols-5 gap-4 relative z-10"
      >
        {/* LEFT: Branding */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden relative group">
          <div className="relative z-10">
            <motion.div
              whileHover={{ rotate: 90 }}
              className="w-12 h-12 bg-primary text-black rounded-2xl flex items-center justify-center font-black text-xl mb-12 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              S.
            </motion.div>
            <h1 className="text-5xl font-bold tracking-tighter leading-[1.1]">
              Design <br />
              <span className="text-primary italic font-serif">
                the future
              </span>{" "}
              <br />
              with us.
            </h1>
            <p className="mt-6 text-gray-400 text-sm leading-relaxed max-w-[280px]">
              Join 10k+ developers building high-performance web applications
              with Shohag.dev.
            </p>
          </div>
          <div className="mt-12 flex items-center gap-3 text-[10px] font-black text-gray-500 tracking-widest uppercase relative z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            SYSTEM STATUS: OPERATIONAL
          </div>
        </div>

        {/* RIGHT: Form */}
        <div className="lg:col-span-3 bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Field
                label="Full Name"
                required
                error={errors.fullName?.message}
              >
                <input
                  {...register("fullName")}
                  placeholder="Shohag Miah"
                  className={inputCls(!!errors.fullName)}
                />
              </Field>

              <Field label="Email" required error={errors.email?.message}>
                <input
                  {...register("email")}
                  placeholder="hello@shohag.dev"
                  className={inputCls(!!errors.email)}
                />
              </Field>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Field label="Password" required error={errors.password?.message}>
                {/* ✅ PasswordInput handles show/hide internally */}
                <PasswordInput
                  {...register("password")}
                  hasError={!!errors.password}
                  placeholder="••••••"
                />
              </Field>

              <Field
                label="Confirm Password"
                required
                error={errors.confirmPassword?.message}
              >
                <PasswordInput
                  {...register("confirmPassword")}
                  hasError={!!errors.confirmPassword}
                  placeholder="••••••"
                />
              </Field>
            </div>

            <div className="pt-4 space-y-6">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                disabled={isSubmitting}
                className="w-full bg-primary text-black py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account <FiArrowRight size={18} />
                  </>
                )}
              </motion.button>

              <div className="relative flex items-center gap-4 text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
                <div className="h-px flex-1 bg-white/5" />
                Quick Connect
                <div className="h-px flex-1 bg-white/5" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <SocialButton icon={<FiGithub />} label="GitHub" />
                <SocialButton icon={<FiChrome />} label="Google" />
              </div>
            </div>
          </form>

          <p className="mt-10 text-center text-gray-500 text-xs">
            Already have an account?{" "}
            <Link
              to="/auth/signin"
              className="text-white font-bold hover:text-primary transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
