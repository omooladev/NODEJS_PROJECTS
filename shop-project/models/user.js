const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    cart: {
      items: [
        {
          productId: { type: mongoose.SchemaTypes.ObjectId, ref: "products" },
          quantity: { type: Number },
        },
      ],
      totalAmount: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);
// Day 52 of #100DaysOfCode

// Today, I learned about two methods in Mongoose, populate() and select()

// Populate loads related documents from other collections, while select() specifies which fields from the document should be returned

// #NodeJS #buildinpublic #tech #javascript

module.exports = mongoose.model("user", userSchema);
