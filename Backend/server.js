import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// 1️⃣ Load config
dotenv.config();

// 2️⃣ Route Imports (FIXED TO MATCH YOUR SCREENSHOT FILENAMES)
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productroute.js"; // Match: productroute.js
import cartRoutes from "./routes/cartRoute.js";
import contactRoutes from "./routes/contactRoute.js";
import orderRoutes from "./routes/orderRoutes.js";    // FIXED: Added 's' to match your file
import deliveryRoutes from "./routes/deliveryRoutes.js"; // FIXED: Added 's' to match your file

const app = express();

// 3️⃣ Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "https://green-basket-two.vercel.app",
    credentials: true,
  })
);

// 4️⃣ Database Connection (Serverless Optimized)
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  
  if (!MONGO_URI) {
    console.error("❌ CRITICAL: MONGO_URI missing in Vercel Environment Variables");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
  }
};

// Middleware to ensure DB connection on every request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// 5️⃣ Health Check Route (Backend is running)
app.get('/', (req, res) => {
    res.status(200).send('Green-Basket Backend API running... 🚀');
});

// 6️⃣ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/delivery", deliveryRoutes);

// 7️⃣ Catch-all for 404 Errors
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found on server" });
});

// 8️⃣ GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("💥 SERVER ERROR:", err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 9️⃣ Export for Vercel
export default app;