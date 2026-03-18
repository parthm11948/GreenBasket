import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const springGreen = "#31E981";

  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // auto login email
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Custom Alert State
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Helper to show custom toast
  const showNotification = (msg, type) => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // ================= AUTO LOAD USER EMAIL =================
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.email) {
      setEmail(user.email);   // ✅ autofill email
      setName(user.fullName || "");
    }
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      showNotification("Please fill all fields", "error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if(response.ok) {
        showNotification("Message sent successfully ✅", "success");
        setMessage(""); // keep name & email
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error(err);
      showNotification("Message failed ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 overflow-hidden">
      
      {/* UNIQUE ANIMATED NOTIFICATION */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-10 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-8 py-4 rounded-3xl shadow-2xl border bg-white"
          >
            {toast.type === "success" ? (
              <CheckCircle style={{ color: springGreen }} size={24} />
            ) : (
              <XCircle className="text-red-500" size={24} />
            )}
            <span className="font-bold text-gray-800">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-gray-800 mb-4">
            Get in Touch
          </h1>

          <p className="text-gray-500 max-w-lg mx-auto font-medium">
            Have questions about our organic products or your delivery in Anand?
            We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* CONTACT INFO */}
          <div className="space-y-6">

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border flex items-center gap-6">
              <div style={{ backgroundColor: springGreen }} className="p-4 rounded-2xl text-white">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold">Storage House</h4>
                <p className="text-gray-500">GreenBasket Hub, Anand, Gujarat</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border flex items-center gap-6">
              <div style={{ backgroundColor: springGreen }} className="p-4 rounded-2xl text-white">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold">Call Us</h4>
                <a href="tel:+919876543210" className="text-gray-500">
                  +91 98765 43210
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border flex items-center gap-6">
              <div style={{ backgroundColor: springGreen }} className="p-4 rounded-2xl text-white">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold">Email</h4>
                <a
                  href="mailto:captainphillip7794@gmail.com"
                  className="text-green-600 font-medium"
                >
                  captainphillip7794@gmail.com
                </a>
              </div>
            </div>

          </div>

          {/* CONTACT FORM */}
          <div className="bg-white p-10 rounded-[3rem] shadow-xl">

            <form className="space-y-4">

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-green-400"
              />

              {/* AUTO EMAIL */}
              <input
                value={email}
                readOnly
                className="w-full p-4 bg-gray-100 rounded-2xl outline-none text-gray-500 cursor-not-allowed"
              />

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help?"
                rows="4"
                className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-green-400 "
              />

              <button
                onClick={handleSend}
                disabled={loading}
                style={{ backgroundColor: springGreen }}
                className="w-full py-4 rounded-2xl text-white font-black uppercase tracking-widest shadow-lg disabled:opacity-60 transition-transform active:scale-95"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;