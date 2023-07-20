const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      required: [true, "Please provide product name"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
    },
    imageUrl: {
      type: String,
      required: [true, "Please provide product image"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", productSchema);
