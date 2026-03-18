import React from 'react';
import { Trash2, Plus, Minus, ChevronRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cartItems = [], updateQuantity, removeItem }) => {
  const navigate = useNavigate();
  const springGreen = "#31E981";

  // Calculate totals safely with decimals
  const subtotal = Array.isArray(cartItems) ? cartItems.reduce((acc, item) => {
    const price = parseFloat(item?.price) || 0;
    const qty = parseFloat(item?.quantity) || 0;
    return acc + (price * qty);
  }, 0) : 0;

  const deliveryCharge = cartItems.length > 0 ? 5 : 0;
  const finalTotal = subtotal + deliveryCharge;

  const handleOrderNow = () => {
    if (!cartItems || cartItems.length === 0) return;
    navigate('/buynowdetails', { 
      state: { amount: finalTotal.toFixed(2), items: cartItems } 
    });
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-32 pb-20 px-4 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-gray-400 hover:text-black transition-all mb-2 font-bold uppercase text-xs tracking-widest">
              <ArrowLeft size={16} /> Back to Store
            </button>
            <h1 className="text-4xl font-black tracking-tighter uppercase flex items-center gap-3">
              Review <span style={{ color: springGreen }}>Cart</span>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item._id} className="bg-white rounded-[2.5rem] p-4 flex flex-col sm:flex-row items-center gap-6 border border-gray-100 shadow-sm">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-[2rem]" />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-black">{item.name}</h3>
                    <p className="text-[#31E981] font-bold">₹{item.price} / {item.unit}</p>
                    
                    <div className="flex items-center justify-center sm:justify-start gap-4 mt-4">
                      <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl p-1">

                        <button 
                          type="button"
                          onClick={() => {
                            const currentQty = parseFloat(item.quantity) || 0.1;
                            if (currentQty > 0.1) {
                              updateQuantity(item._id, (currentQty - 0.1).toFixed(1));
                            }
                          }}
                          className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm active:scale-90"
                        >
                          <Minus size={16} />
                        </button>
                        
                        <div className="px-4 flex items-baseline gap-1">
                          <span className="font-black text-lg text-gray-800">
                            {parseFloat(item.quantity).toFixed(1)}
                          </span>
                          <span className="text-xs font-bold text-gray-400 uppercase">
                            {item.unit}
                          </span>
                        </div>

                        <button 
                          type="button"
                          onClick={() => {
                            const currentQty = parseFloat(item.quantity) || 0;
                            if (currentQty < 5) {
                              updateQuantity(item._id, (currentQty + 0.1).toFixed(1));
                            }
                          }}
                          className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm active:scale-90"
                        >
                          <Plus size={16} />
                        </button>

                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center sm:items-end justify-between self-stretch py-2">
                    <button 
                      onClick={() => removeItem(item._id)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                    <p className="text-2xl font-black">
                      ₹{(parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-[3rem] p-16 text-center border-2 border-dashed border-gray-100">
                <ShoppingBag size={64} className="mx-auto text-gray-200 mb-4" />
                <p className="text-xl font-bold text-gray-400">Your cart is feeling light...</p>
                <button onClick={() => navigate('/product')} style={{ color: springGreen }} className="mt-4 font-black uppercase text-sm">Start Shopping</button>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-gray-50">
              <h2 className="text-2xl font-black mb-8">Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between font-bold">
                  <span className="text-gray-400">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-green-500">+ ₹{deliveryCharge.toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t-2 border-gray-50 pt-8">
                <span className="text-5xl font-black tracking-tighter" style={{ color: springGreen }}>
                  ₹{finalTotal.toFixed(2)}
                </span>
                <button 
                  disabled={cartItems.length === 0} 
                  onClick={handleOrderNow} 
                  style={{ backgroundColor: springGreen }} 
                  className="w-full mt-10 py-6 rounded-[2.5rem] text-white font-black text-xl flex items-center justify-center gap-3"
                >
                  Place Order <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;