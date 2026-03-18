import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },
    unit:{
        type: String,
        require: true
    },

    category: {
      type: String,
      required: true
    },

    img: {
      type: String
    },

    description: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
