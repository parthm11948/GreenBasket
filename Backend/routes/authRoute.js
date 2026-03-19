import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  updateProfile,
  changePassword,
  forgotPassword, // Added
  verifyOTP,      // Added
  resetPassword   // Added
} from "../controllers/authController.js";

const router = Router();

// Authentication
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Profile Management
router.put("/update-profile", updateProfile);

// Password Management
router.post("/change-password", changePassword);

// ✅ Forgot Password & OTP Flow
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

export default router;