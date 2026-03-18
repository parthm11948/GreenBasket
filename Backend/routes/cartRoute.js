import express from "express";
import Cart from "../models/cart.js";

const router = express.Router();

// ADD TO CART
router.post("/add", async (req, res) => {
  try {
    // We check if item already exists in DB to prevent duplicates
    const existing = await Cart.findOne({ _id: req.body._id });
    if (existing) {
      existing.quantity = Math.min(5, (existing.quantity || 1) + 1);
      await existing.save();
      return res.status(200).json(existing);
    }

    const cartItem = new Cart(req.body);
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding item", error });
  }
});

// GET CART ITEMS
router.get("/", async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
});

// UPDATE QUANTITY  ✅ (THIS WAS MISSING)
router.put("/update/:id", async (req, res) => {
  try {
    const { quantity } = req.body;

    const updated = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
});

// REMOVE SINGLE ITEM - Matches App.jsx call
router.delete("/remove/:id", async (req, res) => {
  try {
    const deleted = await Cart.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
});

// CLEAR CART (Useful for Order Success page)
router.delete("/clear", async (req, res) => {
  try {
    await Cart.deleteMany({});
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Clear failed" });
  }
});

export default router;