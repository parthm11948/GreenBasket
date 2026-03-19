import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, ShoppingCart, Info, CheckCircle2, AlertCircle, X, Trash2 } from "lucide-react";
import axios from "axios";

const BuyNowDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { product, items, amount } = location.state || {};
  const displayItems = product ? [product] : items || [];
  const BACKEND_URL = "http://localhost:5000/api/delivery";

  const [addressData, setAddressData] = useState({ fullName: "", phone: "", address: "" });
  const [oldAddresses, setOldAddresses] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAddressId, setDeleteAddressId] = useState(null);
  
  // ⭐ UNIQUE ALERT STATE
  const [toast, setToast] = useState({ show: false, message: "", type: "error" });

  const triggerAlert = (msg, type = "error") => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ show: false, message: "", type: "error" }), 3500);
  };

  const fetchDelivery = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/fetch`);
      if (res.data.success && res.data.data) {
        const rawAddresses = Array.isArray(res.data.data) ? res.data.data : [res.data.data];
        const uniqueAddresses = Array.from(
          new Map(rawAddresses.map((item) => [`${item.fullName}-${item.completeAddress}`, item])).values()
        );
        setOldAddresses(uniqueAddresses);

        // ⭐ AUTO-FILL LOGIC: If addresses exist, fill the form with the first one automatically
        if (uniqueAddresses.length > 0) {
          const latest = uniqueAddresses[0];
          setAddressData({
            fullName: latest.fullName,
            phone: latest.phoneNumber,
            address: latest.completeAddress,
          });
        }
      }
    } catch (error) { 
      console.log("Fetch Error:", error); 
    }
  };

  useEffect(() => { fetchDelivery(); }, []);

  const handleDeleteClick = (id) => {
    setDeleteAddressId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/delete/${deleteAddressId}`);
      setShowDeleteModal(false);
      fetchDelivery();
      setAddressData({ fullName: "", phone: "", address: "" });
      triggerAlert("Address deleted successfully", "success");
    } catch (error) { 
      triggerAlert("Failed to delete address");
    }
  };

  const handleNextStep = async () => {
    if (!addressData.fullName || addressData.phone.length < 10 || !addressData.address) {
      triggerAlert("Please fill in all details correctly!");
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/save`, {
        fullName: addressData.fullName,
        phoneNumber: addressData.phone,
        completeAddress: addressData.address,
      });

      // UPDATED NAVIGATION LOGIC
      navigate("/paymentdetails", {
        state: {
          orderPayload: {
            customerName: addressData.fullName,
            phoneNumber: `+91${addressData.phone}`,
            shippingAddress: addressData.address,
            productName: displayItems.length > 1 ? "Multiple Items" : displayItems[0]?.name,
            totalAmount: finalTotal, 
            items: displayItems,
            pricingBreakdown: { 
              itemTotal: subtotal, 
              deliveryFee: deliveryCharge, 
              grandTotal: finalTotal 
            },
          },
        },
      });
    } catch (error) {
      triggerAlert("Server Error: Unable to save address");
    }
  };

  // Logic for calculations
  const subtotal = displayItems.reduce((acc, item) => (acc + (parseFloat(item.price) || 0) * (item.quantity || 1)), 0);
  const deliveryCharge = 5;
  const finalTotal = amount ? parseFloat(amount) : subtotal + deliveryCharge;

  return (
    <div className="min-h-screen bg-[#f4f7fa] flex items-center justify-center px-6 py-16 font-sans relative">
      
      {/* ⭐ UNIQUE FLOATING ALERT (TOAST) */}
      {toast.show && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border animate-in slide-in-from-top duration-500 ${
          toast.type === "success" ? "bg-white border-green-100 text-green-800" : "bg-white border-red-100 text-red-800"
        }`}>
          {toast.type === "success" ? <CheckCircle2 className="text-green-500" /> : <AlertCircle className="text-red-500" />}
          <span className="font-bold text-sm tracking-tight">{toast.message}</span>
          <button onClick={() => setToast({ ...toast, show: false })} className="ml-4 text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>
      )}

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12">
        
        {/* LEFT CARD: Order Details */}
        <div className="bg-white rounded-3xl shadow-xl p-10 h-fit border border-gray-100">
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-gray-100">
            <ShoppingCart size={24} className="text-blue-600" />
            <h2 className="text-3xl font-semibold text-gray-800">Your Order</h2>
          </div>

          {displayItems.map((item, index) => {
            const itemPrice = parseFloat(item.price) || 0;
            const itemQty = item.quantity || 1;
            
            return (
              <div key={index} className="flex gap-8 mb-10 pb-6 border-b border-gray-100">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-32 h-32 rounded-3xl object-cover shadow-sm ring-1 ring-gray-100"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">{item.name}</h3>
                  <p className="text-gray-500 mt-1 max-w-sm line-clamp-1">
                    {item.description || "Fresh and delivered daily."}
                  </p>
                  
                  <div className="flex items-center gap-6 mt-4 pt-3 border-t border-gray-100 text-gray-600">
                    <div className="text-sm">
                      <span className="font-semibold text-gray-800">₹{itemPrice.toFixed(2)}</span> /unit
                    </div>
                    <div className="w-px h-4 bg-gray-200" />
                    <div className="text-sm">
                      Qty: <span className="font-semibold text-gray-800">{itemQty}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="space-y-4 pt-4 text-gray-800 font-medium">
            <h4 className="text-sm text-gray-400 font-medium uppercase tracking-widest mb-3">Order Summary</h4>
            
            <div className="flex justify-between items-center bg-gray-50 px-5 py-3 rounded-xl">
              <span className="text-gray-600">Items Total</span>
              <span className="text-gray-900">₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center px-5 py-3">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} className="text-gray-400" />
                <span>Delivery Charges</span>
              </div>
              <span className="text-green-700 font-semibold">
                ₹{deliveryCharge.toFixed(2)}
              </span>
            </div>

            <div className="border-t-2 border-dashed border-gray-100 mt-6 pt-6 flex justify-between items-end text-3xl font-extrabold text-gray-950">
              <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Grand Total</span>
              <span>₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* RIGHT CARD: Address Form */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-50">
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-gray-100">
            <MapPin size={24} className="text-red-500" />
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">Delivery</h2>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <select
                className="w-full p-5 rounded-2xl bg-gray-50 border-none ring-2 ring-gray-100 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer text-gray-700"
                onChange={(e) => {
                  const selected = oldAddresses[e.target.value];
                  if (selected) {
                    setAddressData({ fullName: selected.fullName, phone: selected.phoneNumber, address: selected.completeAddress });
                  }
                }}
              >
                <option value="">Choose Saved Address</option>
                {oldAddresses.map((addr, index) => (
                  <option key={index} value={index}>{addr.fullName}</option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2 mt-3">
                {oldAddresses.map((addr) => (
                  <div key={addr._id} className="flex items-center gap-2 bg-blue-50/50 px-4 py-2 rounded-full border border-blue-100">
                    <span className="text-xs font-bold text-blue-700">{addr.fullName}</span>
                    <Trash2 size={14} className="text-red-400 cursor-pointer hover:text-red-600 transition" onClick={() => handleDeleteClick(addr._id)} />
                  </div>
                ))}
              </div>
            </div>

            <input
              type="text"
              placeholder="Full Name"
              value={addressData.fullName}
              onChange={(e) => setAddressData({ ...addressData, fullName: e.target.value })}
              className="w-full p-5 rounded-2xl bg-gray-50 ring-2 ring-gray-100 focus:ring-blue-500 outline-none transition-all"
            />

            <div className="flex items-center gap-3">
              <div className="p-5 rounded-2xl bg-gray-100 text-gray-500 font-bold">+91</div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={addressData.phone}
                onChange={(e) => setAddressData({ ...addressData, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                className="flex-1 p-5 rounded-2xl bg-gray-50 ring-2 ring-gray-100 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <textarea
              rows="3"
              placeholder="Complete Delivery Address"
              value={addressData.address}
              onChange={(e) => setAddressData({ ...addressData, address: e.target.value })}
              className="w-full p-5 rounded-2xl bg-gray-50 ring-2 ring-gray-100 focus:ring-blue-500 outline-none transition-all"
            />

            <button
              onClick={handleNextStep}
              className="w-full py-6 rounded-2xl text-white text-xl font-black bg-gradient-to-br from-green-400 to-green-600 shadow-xl shadow-green-100 hover:scale-[1.01] active:scale-95 transition-all"
            >
              Confirm & Pay
            </button>
          </div>
        </div>
      </div>

      {/* ⭐ UNIQUE DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl w-full max-w-sm text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={40} />
            </div>
            <h3 className="text-2xl font-black text-gray-800 mb-2">Are you sure?</h3>
            <p className="text-gray-500 mb-8 font-medium">This saved address will be permanently removed.</p>
            <div className="flex gap-4">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-4 rounded-2xl font-bold text-gray-400 bg-gray-100 hover:bg-gray-200 transition">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 py-4 rounded-2xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200 transition">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyNowDetails;