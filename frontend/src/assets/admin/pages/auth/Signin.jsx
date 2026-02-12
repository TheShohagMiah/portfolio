import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiGithub,
  FiAlertCircle,
  FiChrome,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    console.log("Sign In Data:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full bg-[#050505] text-white flex items-center justify-center p-4 selection:bg-primary selection:text-black overflow-hidden "
    >
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 z-0 transition-opacity duration-500 opacity-40"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), transparent 40%)`,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[440px] relative z-10"
      >
        {/* The Glass Card */}
        <div className="bg-white/[0.02] border border-white/5 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-[0.2em] text-gray-400 mb-6"
            >
              WELCOME BACK
            </motion.div>
            <h2 className="text-4xl font-bold tracking-tighter italic font-serif">
              Sign In
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <Label>Email</Label>
              <InputWrapper icon={<FiMail />} error={errors.email}>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="name@domain.com"
                  className="input-base"
                />
              </InputWrapper>
              <ErrorMessage message={errors.email?.message} />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <Label>Password</Label>
                <a
                  href="#"
                  className="text-[10px] font-bold text-primary hover:underline uppercase tracking-wider"
                >
                  Forgot?
                </a>
              </div>
              <InputWrapper icon={<FiLock />} error={errors.password}>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </InputWrapper>
              <ErrorMessage message={errors.password?.message} />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all mt-4 hover:bg-primary transition-colors duration-500"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  Access Account <FiArrowRight />
                </>
              )}
            </motion.button>
          </form>

          {/* Social login separator */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em]">
              <span className="bg-[#0a0a0a] px-4 text-gray-600">
                Quick Connect
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SocialButton icon={<FiGithub />} label="GitHub" />
            <SocialButton icon={<FiChrome />} label="Google" />
          </div>

          <p className="mt-10 text-center text-gray-500 text-xs font-medium">
            New here?{" "}
            <Link
              to="/auth/signup"
              className="text-white font-bold hover:text-primary transition-colors underline-offset-4 underline decoration-white/10"
            >
              Create account
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Reusable Styles */}
      <style jsx global>{`
        .input-base {
          width: 100%;
          background: transparent;
          outline: none;
          font-size: 0.875rem;
          padding: 1rem 1rem 1rem 3.5rem;
          color: white;
        }
        ::placeholder {
          color: #444;
        }
      `}</style>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const Label = ({ children }) => (
  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
    {children}
  </label>
);

const InputWrapper = ({ children, icon, error }) => (
  <div
    className={`relative group border rounded-2xl transition-all duration-300 ${
      error
        ? "border-red-500/50 bg-red-500/5"
        : "border-white/5 bg-white/[0.03] focus-within:border-white/20 focus-within:bg-white/[0.06]"
    }`}
  >
    <div
      className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
        error ? "text-red-500" : "text-gray-600 group-focus-within:text-white"
      }`}
    >
      {icon}
    </div>
    {children}
  </div>
);

const SocialButton = ({ icon, label }) => (
  <button className="flex items-center justify-center gap-2 bg-white/[0.03] border border-white/5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/[0.08] hover:border-white/20 transition-all active:scale-95">
    {icon} {label}
  </button>
);

const ErrorMessage = ({ message }) => (
  <AnimatePresence>
    {message && (
      <motion.p
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1"
      >
        <FiAlertCircle className="shrink-0" /> {message}
      </motion.p>
    )}
  </AnimatePresence>
);

export default SignIn;
