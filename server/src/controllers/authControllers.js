import { sendEmail } from "../config/mailer.js";
import User from "../models/auth/authModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ── Cookie config ──────
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// ── OTP Email Template ──────────────────────────────────────────
const otpTemplate = (name, otp) => `
  <div style="font-family: sans-serif; max-width: 400px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
    <h2 style="color: #333;">Welcome, ${name}!</h2>
    <p style="color: #555; text-align: center;">Your verification code is:</p>
    <div style="background: #f0f7ff; color: #007bff; font-size: 28px; font-weight: bold; text-align: center; padding: 15px; border-radius: 8px; letter-spacing: 4px;">
      ${otp}
    </div>
    <p style="font-size: 12px; color: #999; margin-top: 20px;">
      This code expires in 15 minutes. If you didn't sign up, please ignore this email.
    </p>
  </div>
`;

// ══════════════════════════════════════════════════════════════
//  REGISTER
// ══════════════════════════════════════════════════════════════
export const userRegister = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;

  // ── Duplicate check ────────────────────────────────────────
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new ApiError(400, "User already exists.");
  }

  // ── OTP generate ───────────────────────────────────────────
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpExpiryDate = Date.now() + 15 * 60 * 1000;

  // ── Create user ─────────────
  const user = await User.create({
    fullName,
    email,
    password,
    otp,
    otpExpiryDate,
    role,
  });

  // ── Send OTP email ─────────────────────────────────────────
  try {
    await sendEmail(email, "Verify Your Account", otpTemplate(fullName, otp));
  } catch (error) {
    console.error("OTP email failed to send:", error.message);
  }

  // ── JWT + Cookie ───────────────────────────────────────────
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("token", token, cookieOptions);

  res.status(201).json({
    success: true,
    message: "Registration successful. OTP sent to email.",
  });
});

// ══════════════════════════════════════════════════════════════
//  LOGIN
// ══════════════════════════════════════════════════════════════
export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  // ── Password verify ────────────────────────────────────────
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  // ── Verification check ─────────────────────────────────────
  if (!user.isVerified) {
    throw new ApiError(403, "Please verify your email before logging in.");
  }

  // ── JWT + Cookie ───────────────────────────────────────────
  const token = jwt.sign(
    { id: user._id, role: user.role }, // ✅ name সরিয়ে দিলাম (unnecessary)
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" },
  );

  res.cookie("token", token, cookieOptions);

  return res.status(200).json({
    success: true,
    message: "Login successfully.",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  });
});

// ══════════════════════════════════════════════════════════════
//  LOGOUT
// ══════════════════════════════════════════════════════════════
export const userLogOut = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
});

// ══════════════════════════════════════════════════════════════
//  VERIFY EMAIL
// ══════════════════════════════════════════════════════════════
export const verifyEmail = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { otp } = req.body;

  if (!otp) {
    throw new ApiError(400, "OTP is required");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // ── Already verified ───────────────────────────────────────
  if (user.isVerified) {
    return res.status(200).json({
      success: true,
      message: "Account already verified. Please login.",
    });
  }

  // ── Expiry check আগে ───────────────────────────────────────
  if (user.otpExpiryDate < Date.now()) {
    throw new ApiError(400, "OTP has expired. Please request a new one.");
  }

  // ── OTP match ──────────────────────────────────────────────
  if (user.otp !== String(otp)) {
    throw new ApiError(400, "Invalid verification code");
  }

  // ── Update user ────────────────────────────────────────────
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiryDate = undefined;
  await user.save();

  // ── Welcome email ──────────────────────────────────────────
  try {
    await sendEmail(
      user.email,
      "Welcome to the Platform!",
      `<h1>Verified!</h1><p>Hi ${user.fullName}, your account is now active.</p>`,
    );
  } catch (error) {
    console.error("Post-verification email failed:", error.message);
  }

  res.status(200).json({
    success: true,
    message: "Email verified successfully!",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
});

// ══════════════════════════════════════════════════════════════
//  UPDATE PASSWORD
// ══════════════════════════════════════════════════════════════
export const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Current password is incorrect");
  }

  user.password = newPassword;
  await user.save();

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });

  res.status(200).json({
    success: true,
    message: "Password updated successfully. Please login again.",
    logout: true,
  });
});

// ══════════════════════════════════════════════════════════════
//  IS AUTHENTICATED
// ══════════════════════════════════════════════════════════════
export const isAuthenticated = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    user,
  });
});
