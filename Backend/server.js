import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// 1️⃣ Load config
dotenv.config();

// 2️⃣ Route Imports - FIXED TO MATCH YOUR FILENAMES EXACTLY
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productroute.js"; // Match: productroute.js (lowercase)
import cartRoutes from "./routes/cartRoute.js";
import contactRoutes from "./routes/contactRoute.js";
import orderRoutes from "./routes/orderRoutes.js";    // Double check if this file has an 's' or not!
import deliveryRoutes from "./routes/deliveryRoutes.js";

const app = express();

// 3️⃣ Database Connection (Serverless Optimized)
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("❌ MONGO_URI is missing in Vercel Environment Variables");
    return;
  }

  try {
    await mongoose.connect(uri);
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

// DB Connection Middleware
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

// Root route for Vercel health check
app.get("/", (req, res) => {
  res.send("Green Basket Server is Live");
});

// 6️⃣ Catch-all for 404 Errors
app.use((req, res) => {
  res.status(404).json({ message: "Route not found on server" });
});

// 7️⃣ Export for Vercel
export default app;