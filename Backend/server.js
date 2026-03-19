import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// 1️⃣ Load config first
dotenv.config();

// 2️⃣ Route Imports (MUST MATCH FILE NAMES EXACTLY)
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productroute.js";
import cartRoutes from "./routes/cartRoute.js";
import contactRoutes from "./routes/contactRoute.js";
import orderRoutes from "./routes/orderRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js"; // ✅ FIXED

const app = express();

// 3️⃣ Middlewares
app.use(express.json());

app.use(
  cors({
    origin: "https://green-basket-two.vercel.app", // Removed trailing slash for CORS stability
    credentials: true,
  })
);

// 4️⃣ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/delivery", deliveryRoutes); // ✅ FIXED

// 5️⃣ Catch-all for 404 Errors
app.use((req, res) => {
  console.log(`404 - Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: "Route not found on server" });
});

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ Error: MONGO_URI is not defined in .env file");
} else {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("✅ MongoDB Connected");
    })
    .catch((err) => {
      console.error("❌ DB Connection Error:", err.message);
    });
}

// 6️⃣ Vercel Export (This replaces app.listen for Serverless)
export default app;