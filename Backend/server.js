import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// 1️⃣ Load config
dotenv.config();

// 2️⃣ Route Imports (Matching your exact filenames: image_321e59.png)
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productroute.js"; 
import cartRoutes from "./routes/cartRoute.js";
import contactRoutes from "./routes/contactRoute.js";
import orderRoutes from "./routes/orderRoutes.js"; 
import deliveryRoutes from "./routes/deliveryRoutes.js";

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
    console.error("❌ CRITICAL: MONGO_URI missing in Environment Variables");
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

// 5️⃣ Health Check Route
app.get('/', (req, res) => {
    res.status(200).send('Green-Basket Backend API is running successfully! 🚀');
});

// 6️⃣ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/delivery", deliveryRoutes);

// 7️⃣ Global Error Handler
app.use((err, req, res, next) => {
  console.error("💥 SERVER ERROR:", err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 8️⃣ Local Development Support
// This allows Nodemon to keep the server running locally, 
// but Vercel will ignore it and use the export instead.
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Local Server running on http://localhost:${PORT}`);
    });
}

// 9️⃣ Export for Vercel
export default app;