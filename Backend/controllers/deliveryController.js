import Delivery from "../models/deliveryAddress.js";

// ✅ SAVE ADDRESS (KEEP ALL ADDRESSES)
export const saveDeliveryAddress = async (req, res) => {
  try {
    const { fullName, phoneNumber, completeAddress } = req.body;

    if (!fullName || !phoneNumber || !completeAddress) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newAddress = await Delivery.create({
      fullName,
      phoneNumber,
      completeAddress,
    });

    res.status(201).json({
      success: true,
      data: newAddress,
    });

  } catch (error) {
    console.error("Save Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to save address",
    });
  }
};


// ✅ FETCH ALL SAVED ADDRESSES
export const fetchDeliveryAddress = async (req, res) => {
  try {

    const addresses = await Delivery.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: addresses,
    });

  } catch (error) {
    console.error("Fetch Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch address",
    });
  }
};