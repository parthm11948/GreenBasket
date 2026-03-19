import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, ShoppingBasket, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
  const springGreen = "#31E981";
  const softApricot = "#FCDDBC";
  const navigate = useNavigate();

  // 1. Unified state for all form fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  // Handler to update state for any input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    // 2. Validation Checks
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match! Please try again.");
      return; 
    }

    try {
      // 3. Call the Backend API (Matching your backend route)
      const response = await fetch("https://green-basket-ttmn.vercel.app/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       body: JSON.stringify({
  fullName: formData.fullName,
  email: formData.email,
  password: formData.password,
  confirmPassword: formData.confirmPassword, // ✅ ADD THIS
}),

      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration Successful");
        navigate("/login"); 
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please check if the backend is running.");
      console.error("Fetch Error:", err);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 md:p-8" 
      style={{ backgroundColor: softApricot }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 md:p-10"
      >
        <div className="text-center mb-8">
          <div 
            style={{ backgroundColor: `${springGreen}20` }} 
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <ShoppingBasket size={32} style={{ color: springGreen }} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">Create Account</h2>
          <p className="text-gray-500 mt-2 font-medium">Join the GreenBasket family</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input 
              type="text" 
              name="fullName"
              placeholder="Full Name" 
              required 
              value={formData.fullName}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 outline-none transition-all" 
              style={{ '--tw-ring-color': springGreen }} 
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input 
              type="email" 
              name="email"
              placeholder="Email Address" 
              required 
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 outline-none transition-all" 
              style={{ '--tw-ring-color': springGreen }} 
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              required 
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 outline-none transition-all" 
              style={{ '--tw-ring-color': springGreen }} 
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input 
              type="password" 
              name="confirmPassword"
              placeholder="Confirm Password" 
              required 
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 outline-none transition-all" 
              style={{ '--tw-ring-color': springGreen }} 
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 border border-red-100 text-red-500 px-4 py-2 rounded-xl text-sm flex items-center gap-2"
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit"
            style={{ backgroundColor: springGreen }} 
            className="w-full py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-2 hover:brightness-95 transition-all shadow-lg mt-6 active:scale-95 transform"
          >
            Sign Up Now <ArrowRight size={20} />
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8 font-medium">
          Already have an account?{' '}
          <Link to="/login" style={{ color: springGreen }} className="font-bold hover:underline transition-all">
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Registration;