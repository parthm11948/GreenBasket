import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// 1️⃣ Load config
dotenv.config();

// 2️⃣ Route Imports (Matching your filenames EXACTLY)
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productroute.js"; 
import cartRoutes from "./routes/cartRoute.js";
import contactRoutes from "./routes/contactRoute.js";
import orderRoutes from "./routes/orderRoutes.js"; // Plural 's'
import deliveryRoutes from "./routes/deliveryRoutes.js"; // Plural 's'

const app = express();

// 3️⃣ Middlewares
app.use(express.json());
app.use(cors({
  origin: "https://green-basket-two.vercel.app",
  credentials: true,
}));

// 4️⃣ Database Connection
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  if (!MONGO_URI) {
    console.error("❌ MONGO_URI missing in Environment Variables");
    return;
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// 5️⃣ Health Check (Visit your URL to see this)
app.get('/', (req, res) => {
    res.status(200).send('Green-Basket Backend is LIVE 🚀');
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
  res.status(500).json({ success: false, message: err.message });
});

// 8️⃣ Support for local Nodemon
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Local server on port ${PORT}`));
}

export default app;