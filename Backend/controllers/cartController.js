import Cart from "../models/cart.js";

// @desc    Get all cart items from database
export const getCartItems = async (req, res) => {
  try {
    const items = await Cart.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
};

// @desc    Add item to cart or update quantity if it exists
export const addToCart = async (req, res) => {
  try {
    const { _id, name, price, quantity, unit, img } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    let existingItem = await Cart.findOne({ productId: _id });

    if (existingItem) {
      existingItem.quantity = Math.min(5, existingItem.quantity + (quantity || 1));
      await existingItem.save();
      return res.status(200).json(existingItem);
    }

    const newItem = new Cart({
      productId: _id,
      name,
      price,
      quantity: quantity || 1,
      unit,
      img
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: "Error adding to cart", error: error.message });
  }
};

// @desc    Update quantity using the Cart document's unique _id
export const updateCartQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const newQty = Math.max(1, Math.min(5, Number(quantity)));

    const updatedItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity: newQty },
      { new: true }
    );
    
    if (!updatedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: "Error updating quantity", error: error.message });
  }
};

// @desc    Remove an item using the Cart document's unique _id
export const removeItem = async (req, res) => {
  try {
    const deletedItem = await Cart.findByIdAndDelete(req.params.id);
    
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found in database" });
    }
    
    res.status(200).json({ message: "Item successfully removed" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};