const fs = require("fs");
const path = require("path");
const Product = require("./product");

//----------> part to the cart data
const pathToCart = path.join(path.dirname(require.main.filename), "data", "cart.json");

//----------> get all the cart
const getCartContents = (callback) => {
  //----------> read cart data
  fs.readFile(pathToCart, (error, fileContent) => {
    const defaultCartContents = { cartItems: [], numberOfCartItems: 0, totalAmount: 0 };
    if (error) {
      return callback(defaultCartContents);
    }
    //----------> parse the cart contents
    let cartContents = JSON.parse(fileContent);

    //----------> if there is no cart contents
    if (cartContents.length === 0) {
      return callback(defaultCartContents);
    }
    return callback(cartContents[0]);
  });
};
module.exports = class Cart {
  //----------> get cart contents
  static getCartContents(callback) {
    getCartContents((cartContents) => {
      callback(cartContents);
    });
  }
  static addToCart(productId, callback) {
    Product.findById(productId, (newProduct) => {
      getCartContents((cartContents) => {
        let updatedCart;
        let cartItems = cartContents.cartItems;
        let totalAmount = cartContents.totalAmount;
        let numberOfCartItems = cartContents.numberOfCartItems;
        if (cartItems.length === 0) {
          cartItems = newProduct;
          totalAmount = +newProduct.price;
          numberOfCartItems = 1;
          updatedCart = {
            cartItems: [{ ...cartItems, quantity: 1 }],
            numberOfCartItems,
            totalAmount,
          };
        } else {
          let cartItemIndex = cartItems.findIndex((cartItem) => cartItem.id === productId);
          let cartItem = cartItems[cartItemIndex];
          if (cartItem) {
            let { price, quantity } = cartItem;
            //----------> the former total amount plus the price again
            totalAmount = totalAmount + +price;
            quantity += 1;
            cartItem = { ...cartItem, quantity, price };
            //----------> configure the updated cart
            console.log(cartItem);
            cartItems[cartItemIndex] = cartItem;
            updatedCart = {
              cartItems: [...cartItems],
              numberOfCartItems,
              totalAmount,
            };
          }

          // const updatedCart = cartItems.forEach((cartItem) => {
          //   const cartItemId = cartItem.id;
          //   let { price, quantity } = cartItem;

          //   if (productId === cartItemId) {
          //     //----------> increase cart quantity by 1
          //     quantity += 1;
          //     price *= quantity;
          //     //----------> return the updated item
          //     return { ...cartItem, quantity, price };
          //   }
          //   return console.log(productId);
          // });
          // return console.log(updatedCart)
        }
        fs.writeFile(pathToCart, JSON.stringify([updatedCart]), (error, fileContent) => {
          if (!error) {
            callback(updatedCart);
          }
        });
      });
    });
  }
};
