import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// ================= GET PRODUCTS (Category + Search) =================
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;

    let filter = {};

    // CATEGORY FILTER
    if (category && category !== "All") {
      filter.category = category;
    }

    // SEARCH FILTER (case insensitive)
    if (search && search.trim() !== "") {
      filter.name = { 
        $regex: search, 
        $options: "i"   // makes search case-insensitive
      };
    }

    const products = await Product.find(filter);

    res.status(200).json(products);
  } catch (error) {
    console.log("Fetch Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ================= POST PRODUCT =================
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.log("Save Error:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// ================= DELETE PRODUCT =================
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================= UPDATE PRODUCT =================
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
