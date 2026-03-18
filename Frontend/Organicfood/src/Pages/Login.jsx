import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, LogIn, ShoppingBasket, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const springGreen = "#31E981";
  const softApricot = "#FCDDBC";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.message || "Login failed");
      }

      // Store user and token
      const user = data?.user || data?.data?.user || null;
      const token = data?.token || data?.data?.token || "";

      if (user) localStorage.setItem("user", JSON.stringify(user));
      if (token) localStorage.setItem("token", token);

      window.dispatchEvent(new Event("auth-change"));
      navigate("/home");
    } catch (err) {
      console.error("Login Error:", err);
      setError(err?.message || "Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: softApricot }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: `${springGreen}20` }}
          >
            <ShoppingBasket size={32} style={{ color: springGreen }} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 outline-none"
              style={{ "--tw-ring-color": springGreen }}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 outline-none"
              style={{ "--tw-ring-color": springGreen }}
            />
          </div>

          {/* ✅ FORGOT PASSWORD BUTTON */}
          <div className="flex justify-end px-1">
            <Link
              to="/forgot"
              className="text-sm font-semibold hover:underline transition-all"
              style={{ color: "#666" }}
            >
              Forgot Password?
            </Link>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 border border-red-100 text-red-600 px-4 py-2 rounded-xl text-sm flex items-center gap-2"
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: springGreen }}
            className="w-full py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 hover:brightness-95 transition-all shadow-lg active:scale-95 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"} <LogIn size={20} />
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          New to GreenBasket?{" "}
          <Link
            to="/registration"
            style={{ color: springGreen }}
            className="font-bold hover:underline"
          >
            Register Now
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;