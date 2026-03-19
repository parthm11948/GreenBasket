import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// 1️⃣ Load config immediately
dotenv.config();

// 2️⃣ Route Imports 
// IMPORTANT: Ensure every one of these files exists in the /routes folder 
// and that they use 'export default router;' at the end.
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productroute.js"; 
import cartRoutes from "./routes/cartRoute.js";
import contactRoutes from "./routes/contactRoute.js";
import orderRoutes from "./routes/orderRoute.js"; 
import deliveryRoutes from "./routes/deliveryRoutes.js";

const app = express();

// 3️⃣ Basic Health Check (Backend is running code)
// This will show up if you visit the base URL of your backend.
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Green Basket Backend is running successfully! 🚀",
    environment: process.env.NODE_ENV || "production",
    timestamp: new Date().toISOString()
  });
});

// 4️⃣ Middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["https://green-basket-two.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

// 5️⃣ Database Connection (Optimized for Serverless)
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  
  if (!MONGO_URI) {
    console.error("❌ CRITICAL: MONGO_URI is not defined in Environment Variables.");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
  }
};

// Middleware to connect to DB before each request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// 6️⃣ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/delivery", deliveryRoutes);

// 7️⃣ 404 & Global Error Handling
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global Error Handler to catch hidden crashes
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message
  });
});

// 8️⃣ Vercel Export
export default app;