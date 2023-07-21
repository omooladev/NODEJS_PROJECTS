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

userSchema.methods.addToCart = function (product) {
  if (!this.cart.items.length) {
    this.cart = { items: { productId: product, quantity: 1 }, totalAmount: product.price };
  } else {
    //----------> if items is found in the user cart
    
    //----------> check if the product id already exist in the cart
    const productIndex = this.cart.items.findIndex(
      (item) => item.productId.toString() === product._id.toString()
    );

    if (productIndex === -1) {
      //----------> means if product is not found in cart
      
      this.cart.items = [...this.cart.items, { productId: product, quantity: 1 }];
      this.cart.totalAmount = this.cart.totalAmount + product.price;
    
    } else {
      //----------> means if product is already in cart
      
      let item = this.cart.items[productIndex];
      item.quantity += 1;
      this.cart.items[productIndex] = item;
      totalAmount = this.cart.totalAmount + product.price;
      this.cart = { items: this.cart.items, totalAmount };
    }
  }
  return this.save();
};

module.exports = mongoose.model("user", userSchema);
