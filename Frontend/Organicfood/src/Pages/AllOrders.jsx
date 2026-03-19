import React, { useEffect, useState } from "react";
import axios from "axios";
import { Package, ArrowLeft, Loader2, MapPin, User, ShoppingBag, Calendar, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      
      // ✅ FIX: Attempt to find user info under common keys ("userInfo" or "user")
      const userStored = localStorage.getItem("userInfo") || localStorage.getItem("user");
      
      if (!userStored || userStored === "undefined") {
        console.error("No user info found in localStorage");
        setError("Please log in to view your orders.");
        setLoading(false);
        return;
      }

      const userInfo = JSON.parse(userStored);
      const userId = userInfo?._id || userInfo?.id; 

      if (!userId) {
        console.error("User ID missing from parsed object:", userInfo);
        setError("Account session is invalid. Please log in again.");
        setLoading(false);
        return;
      }

      // 2. Fetch Orders and Products simultaneously
      const [ordersRes, productsRes] = await Promise.all([
        axios.get(`https://green-basket-ttmn.vercel.app/api/orders?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("https://green-basket-ttmn.vercel.app/api/products").catch(() => ({ data: [] }))
      ]);

      // ✅ FIX: Flexible response handling (handles {orders: []} or just [])
      const rawOrders = ordersRes.data.orders || (Array.isArray(ordersRes.data) ? ordersRes.data : []);
      const catalogProducts = productsRes.data.products || (Array.isArray(productsRes.data) ? productsRes.data : []);

      const updatedOrders = rawOrders.map(order => ({
        ...order,
        items: (order.items || []).map(item => {
          const matchedProduct = catalogProducts.find(
            p => p.name?.toLowerCase() === item.name?.toLowerCase()
          );
          return {
            ...item,
            img: item.img || matchedProduct?.image || matchedProduct?.img || "https://via.placeholder.com/150"
          };
        })
      }));

      setOrders(updatedOrders);
    } catch (error) {
      console.error("Critical Error in AllOrders:", error);
      setError("Failed to connect to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
        <Loader2 className="animate-spin text-emerald-500 mb-4" size={48} />
        <p className="text-slate-600 font-medium">Syncing your order history...</p>
      </div>
    );
  }

  // Handle Missing Session or Errors
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] p-4 text-center">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 max-w-sm">
          <User size={48} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">{error}</h2>
          <button 
            onClick={() => navigate("/login")} 
            className="mt-4 w-full bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-all">
              <ArrowLeft size={24} className="text-slate-700" />
            </button>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Order Management</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchOrders} className="p-2 text-slate-400 hover:text-emerald-500 transition-colors">
              <RefreshCcw size={20} />
            </button>
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-bold border border-emerald-100">
              <ShoppingBag size={16} /> {orders.length}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-10">
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm">
            <Package size={60} className="mx-auto text-slate-200 mb-6" />
            <h2 className="text-2xl font-bold text-slate-800">No orders found</h2>
            <p className="text-slate-500 mt-2 mb-8">Items you order will appear here</p>
            <button onClick={() => navigate("/")} className="bg-slate-900 hover:bg-black text-white px-10 py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid gap-8">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all group">
                
                {/* Order Meta Header */}
                <div className="px-8 py-4 bg-slate-50/80 border-b border-slate-100 flex justify-between items-center">
                   <div className="flex items-center gap-3">
                     <Calendar size={16} className="text-slate-400" />
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
                       {new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                     </span>
                   </div>
                   <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                     order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                   }`}>
                     {order.status || 'Processing'}
                   </span>
                </div>

                <div className="p-8">
                  <div className="grid lg:grid-cols-12 gap-10">
                    
                    {/* Left: Product Info */}
                    <div className="lg:col-span-7 space-y-6">
                      <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Package Contents</h3>
                      {order.items?.map((item, i) => (
                        <div key={i} className="flex gap-6 group/item">
                          <div className="relative">
                            <img 
                              src={item.img} 
                              alt={item.name} 
                              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-slate-50 shadow-sm group-hover/item:scale-105 transition-transform"
                              onError={(e) => { e.target.src = "https://via.placeholder.com/150" }}
                            />
                            <span className="absolute -top-2 -right-2 bg-emerald-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold shadow-lg border-4 border-white">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="flex flex-col justify-center">
                            <h4 className="text-xl font-bold text-slate-900 leading-tight">{item.name}</h4>
                            <p className="text-slate-400 text-xs mt-1 font-mono uppercase tracking-tighter">ID: {order._id.slice(-8)}</p>
                            <p className="mt-2 font-black text-emerald-600 text-xl tracking-tighter">₹{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right: Logistics & Pricing */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-5">
                        <div className="flex items-start gap-4">
                          <div className="p-2.5 bg-white rounded-xl shadow-sm shrink-0">
                            <User size={18} className="text-slate-500" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Receiver</p>
                            <p className="text-sm font-bold text-slate-800 leading-tight">{order.customerName || "Customer"}</p>
                            <p className="text-xs text-slate-400 truncate">{order.customerEmail}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="p-2.5 bg-white rounded-xl shadow-sm shrink-0">
                            <MapPin size={18} className="text-slate-500" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Shipping Address</p>
                            <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"{order.shippingAddress || 'No address provided'}"</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#FCDDBC] rounded-2xl p-6 text-black shadow-xl shadow-slate-400">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Amount Paid</p>
                          <span className="text-[10px] font-black bg-white/10 px-2 py-1 rounded uppercase tracking-widest">{order.paymentMethod || 'COD'}</span>
                        </div>
                        <p className="text-3xl font-black tracking-tighter">₹{order.totalAmount}</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;