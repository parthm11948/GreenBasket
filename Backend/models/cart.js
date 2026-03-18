import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    quantity: Number,
    unit: String,
    img: String,
    productId: String,
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
