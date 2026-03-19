import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// Route Imports - Triple check these filenames!
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productroute.js"; 
import cartRoutes from "./routes/cartRoute.js";
import contactRoutes from "./routes/contactRoute.js";
import orderRoutes from "./routes/orderRoute.js"; // Removed 's' to match common naming
import deliveryRoutes from "./routes/deliveryRoutes.js";

const app = express();

app.use(express.json());
app.use(cors({
  origin: "https://green-basket-two.vercel.app",
  credentials: true,
}));

// Database Connection with explicit error handling
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("Missing MONGO_URI");

  await mongoose.connect(uri);
};

// Middleware to prevent timeout
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("Database Error:", err.message);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/delivery", deliveryRoutes);

app.get("/", (req, res) => res.send("API Active"));

export default app;