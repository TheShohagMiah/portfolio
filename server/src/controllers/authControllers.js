import { sendEmail } from "../config/mailer.js";
import User from "../models/auth/authModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegister = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new ApiError(400, "User already exists.");
  }

  // 1. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 2. Generate OTP and Expiry (15 minutes)
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpExpiryDate = Date.now() + 15 * 60 * 1000;

  // Inside userRegister or a separate mailer utility
  const otpTemplate = (name, otp) => `
  <div style="font-family: sans-serif; max-width: 400px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
    <h2 style="color: #333;">Welcome, ${fullName}!</h2>
    <p style="color: #555; text-align: center; ">Your verification code is:</p>
    <div style="background: #f0f7ff; color: #007bff; font-size: 28px; font-weight: bold; text-align: center; padding: 15px; border-radius: 8px; letter-spacing: 4px;">
      ${otp}
    </div>
    <p style="font-size: 12px; color: #999; margin-top: 20px;">
      This code expires in 15 minutes. If you didn't sign up for an account, please ignore this email.
    </p>
  </div>
`;

  try {
    await sendEmail(email, "Verify Your Account", otpTemplate(fullName, otp));
  } catch (error) {
    // If email fails, you might want to delete the user or handle the error
    console.error("Email failed to send", error);
  }

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    otp,
    otpExpiryDate,
    role,
  });
  // 3. Generate Token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  // 4. Set Cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // Matched to 7 days
  });
  res.status(200).json({ success: true, message: "OTP sent to email." });
});

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. Find user
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  // 2. Check Password
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  // 3. CHECK VERIFICATION STATUS
  // If they aren't verified, don't give them a token!
  if (!user.isVerified) {
    throw new ApiError(403, "Please verify your email before logging in.");
  }
  // 4. Generate Token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    },
  );

  // 5. Set Cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Login successfully.",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export const userLogOut = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    samsite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    message: "User logout.",
  });
});

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

  if (user.isVerified) {
    return res.status(200).json({
      success: true,
      message: "Account already verified. Please login.",
    });
  }

  // 1. Check Expiry first
  if (user.otpExpiryDate < Date.now()) {
    throw new ApiError(400, "OTP has expired. Please request a new one.");
  }

  // 2. Validate OTP (String comparison to handle leading zeros)
  // Ensure your Schema stores OTP as a String
  if (user.otp !== String(otp)) {
    // Optional: Increment failed attempts here
    throw new ApiError(400, "Invalid verification code");
  }

  // 3. Update User State
  user.isVerified = true;
  user.otp = undefined; // Using undefined removes the field in MongoDB
  user.otpExpiryDate = undefined;

  await user.save();

  // 4. Background Tasks (Email)
  // We use a separate try-catch so email failure doesn't roll back verification
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
