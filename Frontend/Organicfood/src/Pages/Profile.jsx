import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Mail, LogOut, ShieldCheck, CheckCircle2, AlertCircle, 
  Edit3, Save, X, Smartphone, Map, Key, Package
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", phone: "", address: "" });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passData, setPassData] = useState({ newPassword: "", confirmPassword: "" });
  const [status, setStatus] = useState({ type: "", message: "" });

  const navigate = useNavigate();
  const springGreen = "#31E981";

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setEditData({
        name: parsedUser.fullName || "",
        phone: parsedUser.phone || "",
        address: parsedUser.address || ""
      });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Helper to get first letter
  const getFirstLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  // ================= UPDATE PROFILE =================
  const handleSaveProfile = async () => {
    // Validation: Check for exactly 10 digits
    if (editData.phone.length !== 10) {
      setStatus({ type: "error", message: "Phone number must be exactly 10 digits!" });
      setTimeout(() => setStatus({ type: "", message: "" }), 3000);
      return; // Stop execution
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "https://green-basket-ud3o.vercel.app/api/auth/update-profile",
        {
          email: user.email,
          fullName: editData.name,
          phone: editData.phone,
          address: editData.address
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setIsEditing(false);
        setStatus({ type: "success", message: "Profile updated successfully!" });
        setTimeout(() => setStatus({ type: "", message: "" }), 3000);
      }
    } catch (err) {
      setStatus({ type: "error", message: "Update failed. Check connection." });
    }
  };

  // ================= CHANGE PASSWORD =================
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passData.newPassword !== passData.confirmPassword) {
      return setStatus({ type: "error", message: "Passwords do not match!" });
    }

    try {
      const response = await axios.post(
        "https://green-basket-ud3o.vercel.app/api/auth/change-password",
        {
          email: user.email, 
          newPassword: passData.newPassword,
          confirmPassword: passData.confirmPassword,
        }
      );

      if (response.data.success) {
        setStatus({ type: "success", message: "Password updated!" });
        setIsChangingPassword(false);
        setPassData({ newPassword: "", confirmPassword: "" });
        setTimeout(() => setStatus({ type: "", message: "" }), 3000);
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Failed to update password",
      });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F0F2F5] pt-28 pb-12 px-4 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* LEFT SIDEBAR CARD */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-1/3 space-y-6"
        >
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: springGreen }}></div>
            
            <div className="relative inline-block mb-4">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-lg text-white text-3xl font-black tracking-tighter"
                style={{ 
                  background: `linear-gradient(135deg, ${springGreen}, #1DB954)`,
                  textShadow: "0px 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                {getFirstLetter(user.fullName)}
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800">{user.fullName}</h2>
            <p className="text-gray-400 text-sm mb-6">{user.email}</p>
            
            {/* MY ORDERS BUTTON */}
            <button 
              onClick={() => navigate("/allorders")}
              className="w-full flex items-center justify-center gap-2 py-3 mb-3 bg-green-400 text-white rounded-2xl font-bold hover:bg-green-600 transition-all active:scale-95 shadow-lg shadow-gray-200"
            >
              <Package size={18} /> My Orders
            </button>

            {/* LOGOUT BUTTON */}
            <button 
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-red-400 text-red-800 rounded-2xl font-bold hover:bg-rose-300 transition-colors"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ShieldCheck size={18} style={{ color: springGreen }} /> Account Security
            </h3>
            <p className="text-xs text-gray-400 mb-4">Keep your account safe by updating your password regularly.</p>
            <button 
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              className="w-full py-3 rounded-2xl text-sm font-bold transition-all"
              style={{ backgroundColor: `${springGreen}15`, color: springGreen }}
            >
              {isChangingPassword ? "Cancel Change" : "Update Password"}
            </button>
          </div>
        </motion.div>

        {/* RIGHT MAIN CARD */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-200/50"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-black text-gray-800 tracking-tight">Profile Settings</h1>
              <p className="text-gray-400 text-sm">Update your personal identity and contact info</p>
            </div>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#FCDDBC] text-black rounded-xl font-bold hover:shadow-lg transition-all active:scale-95"
              >
                <Edit3 size={16} /> Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setIsEditing(false)} className="p-2.5 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200">
                  <X size={20} />
                </button>
                <button 
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 px-5 py-2.5 text-white rounded-xl font-bold hover:shadow-lg transition-all active:scale-95"
                  style={{ backgroundColor: springGreen }}
                >
                  <Save size={16} /> Save
                </button>
              </div>
            )}
          </div>

          {/* Alerts */}
          <AnimatePresence>
            {status.message && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mb-8 p-4 rounded-2xl flex items-center gap-3 font-bold ${
                  status.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                }`}
              >
                {status.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                {status.message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Fields */}
          {!isChangingPassword ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Full Name</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 font-bold">{getFirstLetter(editData.name)}</div>
                  <input
                    disabled={!isEditing}
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 transition-all outline-none ${
                      isEditing ? "border-gray-100 focus:border-[#31E981]" : "border-transparent bg-gray-50 text-gray-500"
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input disabled value={user.email} className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-transparent bg-gray-50 text-gray-400" />
                </div>
              </div>

              {/* PHONE FIELD WITH VALIDATION */}
              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-400 uppercase ml-1">Phone Number</label>
                 <div className="flex items-center gap-3">
                   <div className="p-3.5 rounded-2xl bg-gray-100 text-gray-500 font-bold border-2 border-transparent">+91</div>
                   <input
                     type="tel"
                     disabled={!isEditing}
                     placeholder="Phone Number"
                     value={editData.phone}
                     onChange={(e) => setEditData({ ...editData, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                     className={`flex-1 px-4 py-3.5 rounded-2xl border-2 transition-all outline-none ${
                        isEditing ? "border-gray-100 focus:border-[#31E981]" : "border-transparent bg-gray-50 text-gray-500"
                      }`}
                   />
                 </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Delivery Address</label>
                <div className="relative">
                  <Map className="absolute left-4 top-4 text-gray-300" size={18} />
                  <textarea
                    disabled={!isEditing}
                    rows="3"
                    value={editData.address}
                    onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                    placeholder="Enter your full home address"
                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 transition-all outline-none resize-none ${
                      isEditing ? "border-gray-100 focus:border-[#31E981]" : "border-transparent bg-gray-50 text-gray-500"
                    }`}
                  />
                </div>
              </div>
            </div>
          ) : (
            <motion.form 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handlePasswordChange} 
              className="space-y-6 bg-gray-50 p-6 rounded-3xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <Key size={20} style={{ color: springGreen }} />
                </div>
                <h3 className="font-bold text-gray-800">Change Your Password</h3>
              </div>
              
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="New Password"
                  value={passData.newPassword}
                  onChange={(e) => setPassData({ ...passData, newPassword: e.target.value })}
                  className="w-full p-4 rounded-2xl border-2 border-white focus:border-[#31E981] outline-none shadow-sm transition-all"
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={passData.confirmPassword}
                  onChange={(e) => setPassData({ ...passData, confirmPassword: e.target.value })}
                  className="w-full p-4 rounded-2xl border-2 border-white focus:border-[#31E981] outline-none shadow-sm transition-all"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-[0.98]"
                style={{ backgroundColor: springGreen }}
              >
                Secure My Account
              </button>
            </motion.form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;