import express from "express";
import {
  saveDeliveryAddress,
  fetchDeliveryAddress,
} from "../controllers/deliveryController.js";

// Verify this path is correct based on your folder structure
import Delivery from "../models/deliveryAddress.js"; 

const router = express.Router();

router.post("/save", saveDeliveryAddress);
router.get("/fetch", fetchDeliveryAddress);

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // This will now work because 'Delivery' is imported above
    const deletedAddress = await Delivery.findByIdAndDelete(id);

    if (!deletedAddress) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    res.json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;