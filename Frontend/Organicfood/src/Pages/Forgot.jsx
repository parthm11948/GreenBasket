import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowLeft, KeyRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const springGreen = "#31E981";
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [passwords, setPasswords] = useState({ new: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) setStep(2);
      else setError(data.message || "User not found");
    } catch (err) { setError("Failed to send OTP"); }
    setLoading(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      if (res.ok) setStep(3);
      else setError("Invalid OTP");
    } catch (err) { setError("Verification failed"); }
    setLoading(false);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) return setError("Passwords don't match");
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword: passwords.new }),
      });
      if (res.ok) navigate("/login");
      else setError("Reset failed");
    } catch (err) { setError("Reset failed"); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCDDBC] p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">
        <Link to="/login" className="flex items-center gap-2 text-gray-500 mb-6 hover:text-gray-800 transition-all">
          <ArrowLeft size={18} /> Back to Login
        </Link>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {step === 1 && "Forgot Password?"}
          {step === 2 && "Enter OTP"}
          {step === 3 && "Reset Password"}
        </h2>
        <p className="text-gray-500 mb-8 text-sm">
          {step === 1 && "Enter your email to receive a 6-digit verification code."}
          {step === 2 && `We sent a code to ${email}`}
          {step === 3 && "Create a strong new password."}
        </p>

        <form className="space-y-5" onSubmit={step === 1 ? handleSendOTP : step === 2 ? handleVerifyOTP : handleReset}>
          {step === 1 && (
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl outline-none focus:ring-2" style={{ "--tw-ring-color": springGreen }} />
            </div>
          )}

          {step === 2 && (
            <div className="relative">
              <KeyRound className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input type="text" placeholder="6-digit OTP" required maxLength="6" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl outline-none tracking-widest font-bold" />
            </div>
          )}

          {step === 3 && (
            <>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input type="password" placeholder="New Password" required value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl outline-none" />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input type="password" placeholder="Confirm New Password" required value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl outline-none" />
              </div>
            </>
          )}

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button type="submit" disabled={loading} style={{ backgroundColor: springGreen }} className="w-full py-4 rounded-xl text-white font-bold shadow-lg hover:brightness-95 active:scale-95 transition-all">
            {loading ? "Processing..." : step === 1 ? "Send OTP" : step === 2 ? "Verify OTP" : "Reset Password"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;