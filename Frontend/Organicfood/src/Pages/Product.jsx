import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBasket, Search, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Product = ({ addToCart }) => {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [lastAdded, setLastAdded] = useState("");

  const navigate = useNavigate();
  const springGreen = "#31E981";

  const categories = ["All", "Vegetables", "Fruits", "Dairy", "Dry Fruits", "Vegetable Juice", "Fruit Juice"];

  useEffect(() => {
    fetch(`https://green-basket-ud3o.vercel.app/api/products?category=${encodeURIComponent(filter)}&search=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, [filter, searchQuery]);

  const handleAddToCart = async (product, qty = 1) => {
    try {
      const response = await fetch("https://green-basket-ud3o.vercel.app/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          _id: product._id, 
          name: product.name, 
          price: product.price, 
          img: product.img, 
          unit: product.unit, 
          quantity: qty 
        }),
      });

      if (response.ok) {
        // Trigger the parent function (fetchCart in App.jsx) to refresh the cart state
        if (addToCart) await addToCart(); 
        
        setLastAdded(product.name);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    } catch (err) {
      console.log("Error adding to cart:", err);
    }
  };

  const handleBuyNow = (product, qty) => {
    navigate("/buynowdetails", { state: { product: { ...product, quantity: qty } } });
  };

  const increaseQty = () => setQuantity((q) => Math.min(5, +(q + 0.1).toFixed(1)));
  const decreaseQty = () => setQuantity((q) => Math.max(0.1, +(q - 0.1).toFixed(1)));

  const getNutrition = (product) => {
    const seed = [...product.name].reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return {
      calories: 120 + (seed % 60),
      protein: (seed % 6 + 3).toFixed(1),
      carbs: (seed % 12 + 6).toFixed(1),
      vitamins: 60 + (seed % 35),
    };
  };

  const renderCard = (product) => (
    <motion.div key={product._id} layout className="bg-white rounded-3xl shadow hover:shadow-xl overflow-hidden">
      <div onClick={() => { setSelectedProduct(product); setQuantity(1); }} className="h-56 cursor-pointer">
        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <div className="flex justify-between items-center mt-3">
          <span className="font-black text-lg">₹{product.price}/{product.unit}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevents opening the modal
              handleAddToCart(product, 1);
            }} 
            style={{ background: springGreen }} 
            className="p-2 rounded-xl text-white hover:scale-110 transition-transform"
          >
            <ShoppingBasket size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="pt-32 pb-24 px-10 max-w-[1400px] mx-auto">
      {/* Search Bar */}
      <div className="max-w-xl mx-auto relative mb-10">
        <Search className="absolute left-3 top-3 text-gray-400" />
        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="w-full pl-10 p-3 rounded-xl border" />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)} style={{ background: filter === cat ? springGreen : "white" }} className={`px-6 py-2 rounded-full border font-medium ${filter === cat ? "text-white" : ""}`}>{cat}</button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        <AnimatePresence>{products.map(renderCard)}</AnimatePresence>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full z-[60]">
            ✅ {lastAdded} added to basket!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Modal */}
      {selectedProduct && (() => {
        const n = getNutrition(selectedProduct);
        return (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[2rem] max-w-md w-full shadow-2xl overflow-hidden">
              <div className="h-48"><img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover" /></div>
              <div className="p-6">
                <h2 className="text-3xl font-extrabold">{selectedProduct.name}</h2>
                <p className="text-green-600 font-bold mt-1">₹{selectedProduct.price}/{selectedProduct.unit}</p>
                <div className="flex justify-between items-center bg-gray-100 rounded-full px-5 py-3 mt-5">
                  <button onClick={decreaseQty}><Minus /></button>
                  <span className="font-black text-lg">{quantity}</span>
                  <button onClick={increaseQty}><Plus /></button>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-green-50 p-4 rounded-xl text-center">Calories<div className="font-black">{n.calories}</div></div>
                  <div className="bg-blue-50 p-4 rounded-xl text-center">Protein<div className="font-black">{n.protein}g</div></div>
                  <div className="bg-orange-50 p-4 rounded-xl text-center">Carbs<div className="font-black">{n.carbs}g</div></div>
                  <div className="bg-purple-50 p-4 rounded-xl text-center">Vitamins<div className="font-black">{n.vitamins}%</div></div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl flex justify-between mt-6">
                  <span>Total</span>
                  <span className="font-black text-green-600">₹{(selectedProduct.price * quantity).toFixed(2)}</span>
                </div>
                <div className="flex flex-col gap-3 mt-6">
                   <button onClick={() => handleBuyNow(selectedProduct, quantity)} className="w-full py-4 rounded-xl text-white font-black bg-gradient-to-r from-green-400 to-green-600">⚡ Buy Now</button>
                   <button onClick={() => { handleAddToCart(selectedProduct, quantity); setSelectedProduct(null); }} style={{ borderColor: springGreen, color: springGreen }} className="w-full py-4 rounded-xl font-black border-2">Add to Basket</button>
                   <button onClick={() => setSelectedProduct(null)} className="w-full mt-2 text-gray-400 text-sm">Close</button>
                </div>
              </div>
            </motion.div>
          </div>
        );
      })()}
    </div>
  );
};

export default Product;