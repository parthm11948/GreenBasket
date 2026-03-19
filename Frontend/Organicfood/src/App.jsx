import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

// Layout & Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Product from "./Pages/Product";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Checkout from "./Pages/Checkout";
import GymPage from "./Pages/GymPage";
import DietsPage from "./Pages/DietsPage";
import PaymentDetails from "./Pages/PaymentDetails";
import OrderSuccess from "./Pages/OrderSuccess";
import BuyNowDetails from "./Pages/BuyNowDetails";
import Profile from "./Pages/Profile";
import Forgot from "./Pages/Forgot";
import AllOrders from "./Pages/AllOrders"; 

const API_URL = "https://green-basket-ttmn.vercel.app/api/cart";

function App() {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(API_URL);
      setCart(res.data);
    } catch (err) {
      console.error("Error fetching cart from DB:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (id, newValue) => {
    try {
      let qty = Math.max(0.1, Math.min(10, parseFloat(newValue) || 0.1));
      qty = parseFloat(qty.toFixed(1));

      try {
        // FIRST TRY
        await axios.put(`${API_URL}/update/${id}`, { quantity: qty });
      } catch (err) {
        // SECOND TRY (fallback)
        await axios.put(`${API_URL}/${id}`, { quantity: qty });
      }

      setCart((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity: qty } : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeItem = async (id) => {
    if (!id) return;
    try {
      try {
        await axios.delete(`${API_URL}/remove/${id}`);
      } catch {
        await axios.delete(`${API_URL}/${id}`);
      }

      setCart((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  return (
    <BrowserRouter>
      <Navbar
        cartCount={cart.length}
        cartItems={cart}
        removeFromCart={removeItem}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gympage" element={<GymPage />} />
        <Route path="/dietspage" element={<DietsPage />} />
        <Route path="/paymentdetails" element={<PaymentDetails />} />
        <Route path="/ordersuccess" element={<OrderSuccess />} />
        <Route path="/buynowdetails" element={<BuyNowDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/allorders" element={<AllOrders />} />

        <Route
          path="/product"
          element={<Product addToCart={fetchCart} />}
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cartItems={cart}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;