import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// 1️⃣ Load config
dotenv.config();

// 2️⃣ Route Imports
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productroute.js";
import cartRoutes from "./routes/cartRoute.js";
import contactRoutes from "./routes/contactRoute.js";
import orderRoutes from "./routes/orderRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";

const app = express();

// 3️⃣ Database Connection Logic (Serverless optimized)
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return; // Already connected
  
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
  }
};

// 4️⃣ Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "https://green-basket-two.vercel.app", 
    credentials: true,
  })
);

// Middleware to ensure DB is connected before handling any request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// 5️⃣ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/delivery", deliveryRoutes);

// 6️⃣ Catch-all for 404 Errors
app.use((req, res) => {
  res.status(404).json({ message: "Route not found on server" });
});

// 7️⃣ Export for Vercel
export default app;