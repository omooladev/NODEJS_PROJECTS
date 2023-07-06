const fs = require("fs");
const path = require("path");
const Product = require("./product");

const pathToCart = path.join(path.dirname(require.main.filename), "data", "cart.json");

const getCartItems = (callback) => {
  fs.readFile(pathToCart, (error, fileContent) => {
    if (error) {
      return callback([{ cartItems: [], numberOfCartItems: 0, totalAmount: 0 }]);
    }
    return callback(JSON.parse(fileContent));
  });
};
module.exports = class Cart {
  static getAllItems(callback) {
    getCartItems((cart) => {
      callback(cart);
    });
  }
  static addToCart(productId, callback) {
    Product.findById(productId, (product) => {
      getCartItems((cart) => {
        let updatedCart;
        let cartItems = cart[0].cartItems;
        let totalAmount = cart[0].totalAmount;
        let numberOfCartItems = cart[0].numberOfCartItems;
        if (cartItems.length === 0) {
          cartItems = product;
          totalAmount = +product.price;
          numberOfCartItems = 1;
          updatedCart = { cartItems: [cartItems], numberOfCartItems, totalAmount };
        }

        return console.log(cart);
        fs.writeFile(pathToCart, JSON.stringify([updatedCart]), (error, fileContent) => {
          if (!error) {
            console.log("cart added");
          }
        });
      });
    });
  }
};
