import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Truck, Loader2, AlertCircle, ShoppingCart, MapPin, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const springGreen = "#31E981";

  const { orderPayload } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // ⭐ NEW: State to track if payment method is selected
  const [selectedMethod, setSelectedMethod] = useState(null);

  const dbImage = orderPayload?.productImage || orderPayload?.image || orderPayload?.img;
  const grandTotal = orderPayload?.totalAmount || orderPayload?.price || 0;
  const deliveryFee = 5.00;
  const itemsTotal = grandTotal - deliveryFee;
  const productName = orderPayload?.productName || "Product";

  useEffect(() => {
    if (!orderPayload) navigate('/cart');
  }, [orderPayload, navigate]);

  const handleFinalOrder = async () => {
    // ⭐ VALIDATION: Ensure method is selected
    if (!selectedMethod) {
      setError("Please select a payment method to continue.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const rawUser = localStorage.getItem('user');
      if (!rawUser) throw new Error("User session not found. Please log in again.");

      const userData = JSON.parse(rawUser);
      const userId = userData._id || userData.id;

      const payload = {
        userId: userId,
        customerName: orderPayload?.customerName || userData.name || "Customer",
        productName: productName,
        totalAmount: grandTotal,
        paymentMethod: selectedMethod, // Dynamic based on selection
        shippingAddress: orderPayload?.shippingAddress || "junagadh",
        phoneNumber: orderPayload?.phoneNumber || "+919106079387",
        productImage: dbImage,
        status: 'Pending'
      };

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        navigate('/ordersuccess', {
          state: { orderDetails: { ...payload, orderId: result.orderId } }
        });
      } else {
        throw new Error(result.message || "Order validation failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] flex flex-col items-center justify-center p-4 font-sans text-slate-800">
      
      <AnimatePresence>
        {error && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <AlertCircle size={40} className="mx-auto text-red-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-slate-900">Payment Action Required</h3>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">{error}</p>
              <button 
                onClick={() => setError(null)} 
                className="w-full py-4 bg-[#1A1F2C] text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform"
              >
                Understood
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-md w-full relative">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-4 flex items-center gap-2 text-slate-400 font-semibold hover:text-slate-800 transition-colors ml-2"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden mb-6">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-8 text-[#2B59FF]">
              <ShoppingCart size={24} />
              <h2 className="text-2xl font-bold tracking-tight">Your Order</h2>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-black text-slate-900 leading-tight">{productName}</h3>
              <p className="text-sm text-slate-400 mt-1 mb-4">Fresh and delivered daily.</p>
              <div className="inline-flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl text-sm font-bold">
                <span className="text-slate-900">₹{itemsTotal.toFixed(2)} /unit</span>
                <span className="text-slate-200">|</span>
                <span className="text-slate-500">Qty: 1</span>
              </div>
            </div>

            <div className="h-[1px] w-full bg-slate-100 mb-8 border-dashed border-t border-slate-200"></div>

            <div className="space-y-6">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Order Summary</p>

              <div className="flex justify-between items-center bg-[#F8FAFC] p-4 rounded-2xl border border-slate-50">
                <span className="text-slate-600 font-semibold">Items Total</span>
                <span className="font-bold text-slate-900">₹{itemsTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center px-4">
                <div className="flex items-center gap-3 text-slate-400 font-medium">
                  <MapPin size={16} />
                  <span className="text-sm">Delivery Charges</span>
                </div>
                <span className="text-[#059669] font-black">₹{deliveryFee.toFixed(2)}</span>
              </div>

              <div className="h-[1px] w-full bg-slate-100 border-dashed border-t border-slate-200"></div>

              <div className="flex justify-between items-center px-2">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Grand Total</span>
                <span className="text-4xl font-black text-slate-900 tracking-tighter">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Select Payment Method</p>
          
          {/* ⭐ SELECTABLE COD CARD */}
          <button
            onClick={() => setSelectedMethod('cod')}
            className={`w-full p-5 rounded-[2rem] border transition-all flex items-center justify-between shadow-sm ${
              selectedMethod === 'cod' 
              ? 'bg-white border-slate-900 ring-2 ring-slate-900/5' 
              : 'bg-white border-slate-100 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                selectedMethod === 'cod' ? 'bg-[#31E981] text-white shadow-lg shadow-[#31E981]/20' : 'bg-slate-100 text-slate-400'
              }`}>
                <Truck size={24} />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 leading-tight">Cash on Delivery</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Pay at your doorstep</p>
              </div>
            </div>
            
            {/* Custom Radio Button UI */}
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              selectedMethod === 'cod' ? 'border-slate-900 bg-slate-900' : 'border-slate-200'
            }`}>
              {selectedMethod === 'cod' && <Check size={14} className="text-white" />}
            </div>
          </button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleFinalOrder}
            disabled={loading}
            className="w-full py-6 rounded-[2rem] text-white font-black text-xl shadow-xl flex justify-center items-center gap-3 transition-all"
            style={{ 
              backgroundColor: loading ? "#cbd5e1" : (selectedMethod ? springGreen : "#94a3b8"),
              cursor: selectedMethod ? 'pointer' : 'not-allowed'
            }}
          >
            {loading ? <Loader2 className="animate-spin" /> : "PLACE ORDER NOW"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;