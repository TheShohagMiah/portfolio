import React, { useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiShield,
  FiArrowRight,
  FiGithub,
  FiAlertCircle,
  FiChrome,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset, // 3. Destructure reset to clear the form
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    // resolver: zodResolver(registerSchema), // Highly recommended to add this!
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        data,
        { withCredentials: true },
      );

      if (response.data?.success) {
        toast.success(response.data.message || "OTP sent to your email!");

        // 4. Clear the form fields
        reset();

        // 5. Redirect to the OTP page after a slight delay
        // We pass the email in 'state' so the OTP page knows who to verify
        setTimeout(() => {
          navigate("/auth/verify-account", { state: { email: data.email } });
        }, 1500);
      }
    } catch (error) {
      console.error("Registration Error:", error.response?.data);
      const backendMessage = error.response?.data?.message;
      toast.error(backendMessage || "Registration failed");
    }
  };
  // Tracking mouse for the ambient glow effect
  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full bg-[#050505] text-white flex items-center justify-center p-4  overflow-hidden"
    >
      {/* --- Dynamic Background Effects --- */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Interactive Spotlight */}
        <div
          className="absolute inset-0 z-0 transition-opacity duration-500 opacity-50"
          style={{
            background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(var(--primary-rgb), 0.15), transparent 40%)`,
          }}
        />
        {/* Static Blobs */}
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl grid lg:grid-cols-5 gap-4 relative z-10"
      >
        {/* LEFT COLUMN: BRANDING (Bento Card) */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden relative group">
          <div className="relative z-10">
            <motion.div
              whileHover={{ rotate: 90 }}
              className="w-12 h-12 bg-primary text-black rounded-2xl flex items-center justify-center font-black text-xl mb-12 shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]"
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
              with Shohag.dev architecture.
            </p>
          </div>

          <div className="mt-12 space-y-4 relative z-10">
            <div className="flex items-center gap-3 text-[10px] font-black text-gray-500 tracking-widest uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />{" "}
              SYSTEM STATUS: OPERATIONAL
            </div>
          </div>

          {/* Decorative Shape */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </div>

        {/* RIGHT COLUMN: THE FORM (Bento Card) */}
        <div className="lg:col-span-3 bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label>Full Name</Label>
                <InputWrapper icon={<FiUser />} error={errors.fullName}>
                  <input
                    {...register("fullName")}
                    placeholder="Shohag Miah"
                    className="input-base"
                  />
                </InputWrapper>
                <ErrorMessage message={errors.fullName?.message} />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label>Email Address</Label>
                <InputWrapper icon={<FiMail />} error={errors.email}>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="shohag@example.com"
                    className="input-base"
                  />
                </InputWrapper>
                <ErrorMessage message={errors.email?.message} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Password */}
              <div className="space-y-2">
                <Label>Password</Label>
                <InputWrapper icon={<FiLock />} error={errors.password}>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="••••••••"
                    className="input-base"
                  />
                </InputWrapper>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label>Confirm</Label>
                <InputWrapper
                  icon={<FiShield />}
                  error={errors.confirmPassword}
                >
                  <input
                    {...register("confirmPassword")}
                    type="password"
                    placeholder="••••••••"
                    className="input-base"
                  />
                </InputWrapper>
              </div>
            </div>

            <ErrorMessage
              message={
                errors.password?.message || errors.confirmPassword?.message
              }
            />

            <div className="pt-4 space-y-6">
              <motion.button
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                disabled={isSubmitting}
                className="w-full bg-background hover:bg-background/90 text-black py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account <FiArrowRight size={18} />
                  </>
                )}
              </motion.button>

              <div className="relative flex items-center gap-4">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
                  Quick Connect
                </span>
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

      {/* Global CSS for Tailwind Refinement */}
      <style jsx global>{`
        :root {
          --primary-rgb: 255, 255, 255;
        } /* Set your primary RGB color here (e.g., 59, 130, 246) */
        .input-base {
          width: 100%;
          background: transparent;
          outline: none;
          font-size: 0.875rem;
          padding: 1rem 1rem 1rem 3rem;
          border-radius: 1rem;
          transition: all 0.3s ease;
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
        : "border-white/5 bg-white/[0.03] focus-within:border-primary/50 focus-within:bg-white/[0.06]"
    }`}
  >
    <div
      className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
        error ? "text-red-500" : "text-gray-600 group-focus-within:text-primary"
      }`}
    >
      {icon}
    </div>
    {children}
  </div>
);

const SocialButton = ({ icon, label }) => (
  <button className="flex items-center justify-center gap-2 bg-white/[0.03] border border-white/5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white/[0.08] hover:border-white/10 transition-all active:scale-95">
    {icon} {label}
  </button>
);

const ErrorMessage = ({ message }) => (
  <AnimatePresence>
    {message && (
      <motion.p
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1 overflow-hidden"
      >
        <FiAlertCircle /> {message}
      </motion.p>
    )}
  </AnimatePresence>
);

export default SignUp;
