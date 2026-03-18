import Product from "../models/product.js";

// ================================
// @desc    Get all products
// @route   GET /api/products
// @query   ?category=&search=
// ================================
export const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    // ✅ Category filter (ignore All / empty)
    if (category && category !== "All") {
      query.category = category;
    }

    // ✅ Search filter (safe)
    if (search && search.trim() !== "") {
      query.name = { $regex: search.trim(), $options: "i" };
    }

    // ✅ Fetch products (latest first)
    const products = await Product.find(query).sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// ================================
// @desc    Get single product by ID
// @route   GET /api/products/:id
// ================================
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
};

// ================================
// @desc    Create new product
// @route   POST /api/products
// ================================
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      unit,
      category,
      img,
      isPopular = false,
    } = req.body;

    // ✅ Basic validation
    if (!name || !price || !unit || !category || !img) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const newProduct = new Product({
      name,
      price,
      unit,
      category,
      img,
      isPopular,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({
      message: "Error saving product",
      error: error.message,
    });
  }
};
