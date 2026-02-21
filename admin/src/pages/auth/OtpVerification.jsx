import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiShield, FiArrowRight, FiRefreshCw } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(59);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // Timer logic
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Take only the last character entered
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Focus previous and clear it
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(data)) return; // Only allow numbers

    const pasteData = data.split("");
    setOtp(pasteData.concat(new Array(6 - pasteData.length).fill("")));

    // Focus the last filled input or the first empty one
    const nextFocus = pasteData.length < 6 ? pasteData.length : 5;
    inputRefs.current[nextFocus].focus();
  };

  const handleResend = async () => {
    try {
      // Replace with your actual resend endpoint
      await axios.post(
        "http://localhost:5000/api/auth/resend-otp",
        {},
        { withCredentials: true },
      );
      setTimer(59);
      toast.success("New code sent to your email");
    } catch (error) {
      toast.error("Failed to resend code");
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-account",
        { otp: otpCode }, // Key must be 'otp' to match req.body.otp
        { withCredentials: true },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/api/auth/login", {
            state: { email: response.data.email },
          });
        }, 1500);
      }
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      toast.error(backendMessage || "Verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-[#050505] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-8 rounded-[2.5rem] shadow-xl"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FiShield size={32} />
          </div>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
            Verify Identity
          </h2>
          <p className="text-sm text-zinc-500 mt-2">
            Enter the code sent to{" "}
            <span className="font-bold text-zinc-800 dark:text-zinc-200">
              sho***@dev.com
            </span>
          </p>
        </div>

        <div className="flex justify-between gap-2 mb-8" onPaste={handlePaste}>
          {otp.map((data, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={data}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-full h-14 text-center text-xl font-bold bg-zinc-100 dark:bg-white/5 border-2 border-transparent focus:border-blue-500 rounded-xl outline-none transition-all dark:text-white"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={otp.join("").length < 6 || loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all"
        >
          {loading ? "Verifying..." : "Verify Code"}
          {!loading && <FiArrowRight />}
        </button>

        <div className="mt-8 text-center">
          <button
            onClick={handleResend}
            disabled={timer > 0}
            className="text-sm font-bold text-blue-500 disabled:text-zinc-500 flex items-center justify-center gap-2 mx-auto"
          >
            <FiRefreshCw className={timer === 0 ? "animate-spin-slow" : ""} />
            {timer > 0 ? `Resend in ${timer}s` : "Resend OTP Now"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OtpVerification;
