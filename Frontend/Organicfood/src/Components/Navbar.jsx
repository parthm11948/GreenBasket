import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBasket,
  Menu,
  X,
  User,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Dumbbell,
  Flame,
  Check,
  Settings,
  LogOut
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ cartCount = 0, cartItems = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [planQuery, setPlanQuery] = useState("");

  // --- AUTH STATE ---
  const [user, setUser] = useState(null);

  const userRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const springGreen = "#31E981";
  const softApricot = "#FCDDBC";

  const roadmapOptions = [
    {
      id: "gym",
      title: "Muscle Gain",
      desc: "High Protein & Energy",
      icon: <Dumbbell size={20} />,
      color: "#31E981",
    },
    {
      id: "diets",
      title: "Lean Shred",
      desc: "Weight & Fat Control",
      icon: <Flame size={20} />,
      color: "#FF5500",
    },
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Product", href: "/product" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const setAuthUserFromStorage = () => {
    try {
      const saved = localStorage.getItem("user");
      if (!saved) return setUser(null);
      const parsed = JSON.parse(saved);
      if (!parsed || typeof parsed !== "object") return setUser(null);
      setUser(parsed);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setAuthUserFromStorage();
  }, []);

  useEffect(() => {
    const onAuthChange = () => setAuthUserFromStorage();
    const onStorage = (e) => {
      if (e.key === "user" || e.key === "token") setAuthUserFromStorage();
    };

    window.addEventListener("auth-change", onAuthChange);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("auth-change", onAuthChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    const onDocMouseDown = (e) => {
      if (!userOpen) return;
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [userOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setUserOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const handlePlannerSubmit = (e) => {
    e.preventDefault();
    if (!planQuery) return;
    if (planQuery === "gym") navigate(`/gympage`);
    else if (planQuery === "diets") navigate(`/dietspage?query=diabetes`);
    setPlannerOpen(false);
    setPlanQuery("");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setUserOpen(false);
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  const getNameInitial = () => {
    const name = user?.fullName || user?.name || "";
    if (!name) return "";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div
      className={`fixed w-full z-50 flex justify-center transition-all duration-500 ${
        scrolled ? "pt-2" : "pt-0"
      }`}
    >
      <nav
        className={`transition-all duration-500 ease-in-out ${
          scrolled
            ? "w-[95%] sm:w-[92%] lg:w-[88%] rounded-[2.5rem] shadow-2xl border border-white/30"
            : "w-full rounded-none shadow-none"
        }`}
        style={{ backgroundColor: softApricot }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-gray-800">
          <div
            className={`flex justify-between items-center transition-all duration-500 ${
              scrolled ? "h-16" : "h-20 md:h-24"
            }`}
          >
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 sm:gap-3 group">
              <motion.div
                whileHover={{ rotate: 15 }}
                style={{ backgroundColor: springGreen }}
                className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl text-white"
              >
                <ShoppingBasket size={20} />
              </motion.div>
              <span className="text-lg sm:text-2xl font-black tracking-tighter">
                Green<span style={{ color: springGreen }}>Basket</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 bg-white/20 p-1.5 rounded-2xl border border-white/30">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`relative px-5 py-2 font-bold transition-all text-sm uppercase tracking-widest z-10 ${
                      isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-xl shadow-sm z-[-1]"
                        style={{ backgroundColor: "white" }}
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* Body Architect Button */}
              <div className="relative pl-4">
                <button
                  onClick={() => setPlannerOpen(!plannerOpen)}
                  className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest px-5 py-2.5 rounded-2xl bg-white/50 border border-white hover:bg-white transition-all shadow-sm"
                >
                  <Sparkles size={16} style={{ color: springGreen }} />
                  Body Architect
                </button>

                <AnimatePresence>
                  {plannerOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 mt-4 w-80 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 p-7 z-[60]"
                    >
                      <div className="text-center mb-6">
                        <span className="text-[10px] font-black uppercase text-green-500 tracking-[0.2em]">
                          Personalization Engine
                        </span>
                        <h4 className="text-xl font-black text-gray-800">Select Your Goal</h4>
                      </div>

                      <div className="space-y-3 mb-6">
                        {roadmapOptions.map((opt) => (
                          <motion.div
                            key={opt.id}
                            whileHover={{ x: 5 }}
                            onClick={() => setPlanQuery(opt.id)}
                            className={`p-4 rounded-3xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                              planQuery === opt.id
                                ? "bg-green-50 border-green-400 shadow-sm"
                                : "bg-gray-50 border-transparent hover:border-gray-200"
                            }`}
                          >
                            <div
                              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                              style={{
                                backgroundColor: planQuery === opt.id ? springGreen : "#cbd5e1",
                              }}
                            >
                              {opt.icon}
                            </div>
                            <div className="flex-1">
                              <p className="font-black text-xs uppercase tracking-tight text-gray-800">
                                {opt.title}
                              </p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase">
                                {opt.desc}
                              </p>
                            </div>
                            {planQuery === opt.id && (
                              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                                <Check size={14} />
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>

                      <button
                        onClick={handlePlannerSubmit}
                        disabled={!planQuery}
                        className="w-full py-4 rounded-3xl text-white font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-30 shadow-xl shadow-green-100"
                        style={{ backgroundColor: springGreen }}
                      >
                        Launch Advisor <ArrowRight size={16} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop Right actions */}
            <div className="hidden md:flex items-center gap-4">
              <div className="relative" ref={userRef}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setUserOpen((p) => !p);
                  }}
                  className="p-3 bg-white/50 hover:bg-white rounded-2xl transition-all flex items-center gap-1 group"
                >
                  {user ? (
                    <div
                      style={{ backgroundColor: springGreen }}
                      className="w-9 h-9 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-sm uppercase"
                    >
                      {getNameInitial()}
                    </div>
                  ) : (
                    <User size={20} className="text-gray-700" />
                  )}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${userOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {userOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-80 bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden z-[80]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {user ? (
                        <>
                          <div className="px-7 py-6 border-b border-gray-50 bg-gradient-to-b from-green-50/60 to-white">
                            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-green-500">
                              Logged In As
                            </p>
                            <p className="text-xl font-black text-gray-900 truncate mt-1">
                              {user.fullName || user.name || "Member"}
                            </p>
                            <p className="text-sm font-bold text-gray-500 truncate">
                              {user.email}
                            </p>
                          </div>
                          <Link
                            to="/profile"
                            onClick={() => setUserOpen(false)}
                            className="w-full text-left px-7 py-4 hover:bg-gray-50 transition flex items-center gap-4 border-b border-gray-50"
                          >
                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                              <Settings size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-black text-gray-900 uppercase tracking-tight">Account Details</p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase">View & Edit Profile</p>
                            </div>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-7 py-5 hover:bg-red-50 transition flex items-center gap-4 group/logout"
                          >
                            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500 group-hover/logout:bg-red-500 group-hover/logout:text-white transition-colors">
                              <LogOut size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-black text-gray-900 uppercase tracking-tight">Sign Out</p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase">End current session</p>
                            </div>
                          </button>
                        </>
                      ) : (
                        <div className="p-4 space-y-2">
                          <Link
                            to="/login"
                            onClick={() => setUserOpen(false)}
                            className="block text-center px-7 py-4 text-sm font-black text-white bg-green-500 rounded-2xl hover:bg-green-600 transition uppercase tracking-widest"
                          >
                            Login
                          </Link>
                          <Link
                            to="/registration"
                            onClick={() => setUserOpen(false)}
                            className="block text-center px-7 py-4 text-sm font-black text-gray-900 hover:bg-gray-100 rounded-2xl transition uppercase tracking-widest"
                          >
                            Registration
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                style={{ backgroundColor: springGreen }}
                className="text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-green-200/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                Cart <span className="bg-white text-green-500 px-2 rounded-lg">{cartCount}</span>
              </button>
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center gap-2 sm:gap-3">
              {/* Mobile Cart Short-access */}
              <button
                onClick={() => navigate("/checkout")}
                className="p-2.5 bg-white/50 rounded-xl text-gray-800 relative"
              >
                <ShoppingBasket size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setPlannerOpen(!plannerOpen)}
                className="p-2.5 bg-white/50 rounded-xl"
              >
                <Sparkles size={22} style={{ color: "green" }} />
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 bg-gray-900 text-white rounded-xl"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-inner"
            >
              <div className="flex flex-col p-6 space-y-5">
                {/* User Section for Mobile */}
                <div className="pb-4 border-b border-gray-50">
                  {user ? (
                    <div className="flex items-center gap-4">
                       <div
                        style={{ backgroundColor: springGreen }}
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg uppercase shadow-md"
                      >
                        {getNameInitial()}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-black text-gray-900 truncate">
                          {user.fullName || user.name || "Member"}
                        </p>
                        <button onClick={handleLogout} className="text-xs font-bold text-red-500 uppercase tracking-tighter">Sign Out</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                       <Link to="/login" onClick={() => setIsOpen(false)} className="flex-1 py-3 bg-green-500 text-white text-xs font-black uppercase rounded-xl text-center">Login</Link>
                       <Link to="/registration" onClick={() => setIsOpen(false)} className="flex-1 py-3 bg-gray-100 text-gray-900 text-xs font-black uppercase rounded-xl text-center">Registration</Link>
                    </div>
                  )}
                </div>

                {/* Nav Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-black text-gray-700 uppercase tracking-[0.15em] text-sm py-2"
                  >
                    {link.name}
                  </Link>
                ))}
                
                {user && (
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="font-black text-green-500 uppercase tracking-[0.15em] text-sm py-2"
                  >
                    My Account
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;