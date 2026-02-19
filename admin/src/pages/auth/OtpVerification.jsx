import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiShield, FiArrowRight, FiRefreshCw } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";

const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef([]);

  // Timer logic for Resend OTP
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-account",
      );
      if (response) {
        toast.success(
          response.data.message || "Your account has been activated.",
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-[#050505] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200 dark:border-white/10 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-primary/5"
      >
        {/* Icon & Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FiShield size={32} />
          </div>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
            Verify Identity
          </h2>
          <p className="text-sm text-zinc-500 mt-2 font-medium">
            We sent a 6-digit code to{" "}
            <span className="text-zinc-900 dark:text-zinc-200 font-bold">
              sho***@dev.com
            </span>
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-between gap-2 sm:gap-4 mb-8">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              name="otp"
              ref={(el) => (inputRefs.current[index] = el)}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={(e) => e.target.select()}
              className="w-full h-12 sm:h-14 text-center text-xl font-black bg-zinc-100 dark:bg-white/[0.03] border-2 border-transparent focus:border-primary/50 focus:bg-white dark:focus:bg-[#0a0a0a] rounded-xl outline-none transition-all dark:text-white"
            />
          ))}
        </div>

        {/* Actions */}
        <button
          onClick={handleSubmit}
          disabled={otp.join("").length < 6}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all group"
        >
          Verify Code
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Resend Logic */}
        <div className="mt-8 text-center">
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
            Didn't receive the code?
          </p>
          <button
            disabled={timer > 0}
            className="mt-2 flex items-center justify-center gap-2 mx-auto text-sm font-black text-primary disabled:text-zinc-600 transition-colors"
          >
            <FiRefreshCw
              className={timer > 0 ? "" : "animate-spin-slow"}
              size={14}
            />
            {timer > 0 ? `Resend in ${timer}s` : "Resend OTP Now"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OtpVerification;
