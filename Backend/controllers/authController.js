import User from "../models/user.js";
import nodemailer from "nodemailer";

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword)
      return res.status(400).json({ message: "All fields required" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already exists" });

    await User.create({
      fullName,
      email,
      password, 
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Register error" });
  }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    res.json({
      success: true,
      user: { 
        id: user._id, 
        fullName: user.fullName, 
        email: user.email,
        phone: user.phone || "",
        address: user.address || ""
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Login error" });
  }
};

// ================= LOGOUT =================
export const logoutUser = async (req, res) => {
  try {
    return res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================= UPDATE PROFILE =================
export const updateProfile = async (req, res) => {
  try {
    const { email, fullName, phone, address } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error updating profile" });
  }
};

// ================= CHANGE PASSWORD =================
export const changePassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("Change Password Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ================= 1. FORGOT PASSWORD (SEND OTP) =================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    // Gmail Configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "parthmendapara2005@gmail.com", 
        pass: "ioeu iaiq bszj zjvi" // 16-character code from Google
      }
    });

    await transporter.sendMail({
      from: '"Auth System" <YOUR_GMAIL@gmail.com>',
      to: email,
      subject: "Your Reset Password OTP",
      text: `Your OTP is ${otp}. Valid for 10 minutes.`,
    });

    res.json({ success: true, message: "OTP sent to your email" });
  } catch (err) {
    console.error("Gmail Error:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
};

// ================= 2. VERIFY OTP =================
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= 3. RESET PASSWORD =================
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: "Session expired" });

    user.password = newPassword; 
    user.otp = undefined; 
    user.otpExpires = undefined;
    await user.save();

    res.json({ success: true, message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};