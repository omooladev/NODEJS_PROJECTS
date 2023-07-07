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
          let cartItemIndex = cartItems.findIndex((cartItem) => cartItem.id === newProduct.id);
          let cartItem = cartItems[cartItemIndex];

          if (cartItem) {
            let { price, quantity } = cartItem;
            //----------> the former total amount plus the price again
            totalAmount = totalAmount + +price;
            quantity += 1;
            cartItem = { ...cartItem, quantity, price };
            //----------> configure the updated cart

            cartItems[cartItemIndex] = cartItem;
            updatedCart = {
              cartItems: [...cartItems],
              numberOfCartItems,
              totalAmount,
            };
          } else {
            numberOfCartItems += 1;
            totalAmount = totalAmount + +newProduct.price;
            updatedCart = {
              cartItems: [...cartItems, { ...newProduct, quantity: 1 }],
              numberOfCartItems,
              totalAmount,
            };
          }
        }
        fs.writeFile(pathToCart, JSON.stringify([updatedCart]), (error, fileContent) => {
          if (!error) {
            callback(updatedCart);
          }
        });
      });
    });
  }
  static decreaseCartItemQuantity(cartItemId, callback) {
    getCartContents((cartContents) => {
      let updatedCart;
      let cartItems = cartContents.cartItems;
      let totalAmount = cartContents.totalAmount;
      let numberOfCartItems = cartContents.numberOfCartItems;
      //----------> find the cart contents whose id matches the cartId
      const cartItemIndex = cartItems.findIndex(
        (cartItem) => cartItemId === cartItem.id.toString()
      );
      let cartItem = cartItems[cartItemIndex];
      if (cartItem.quantity === 1) {
        return callback();
      }
      cartItem.quantity -= 1;
      totalAmount = totalAmount - +cartItem.price;

      cartItems[cartItemIndex] = cartItem;

      updatedCart = {
        cartItems,
        numberOfCartItems,
        totalAmount,
      };
      fs.writeFile(pathToCart, JSON.stringify([updatedCart]), (error, fileContent) => {
        if (!error) {
          callback();
        }
      });
    });
  }
  static increaseCartItemQuantity(cartItemId, callback) {
    //----------> get all products
    getCartContents((cartContents) => {
      let updatedCart;
      let cartItems = cartContents.cartItems;
      let totalAmount = cartContents.totalAmount;
      let numberOfCartItems = cartContents.numberOfCartItems;
      //----------> find the cart contents whose id matches the cartId
      const cartItemIndex = cartItems.findIndex(
        (cartItem) => cartItemId === cartItem.id.toString()
      );
      let cartItem = cartItems[cartItemIndex];
      cartItem.quantity += 1;
      totalAmount = totalAmount + +cartItem.price;

      cartItems[cartItemIndex] = cartItem;

      updatedCart = {
        cartItems,
        numberOfCartItems,
        totalAmount,
      };
      fs.writeFile(pathToCart, JSON.stringify([updatedCart]), (error, fileContent) => {
        if (!error) {
          callback();
        }
      });
    });
  }
  static deleteCartItem(cartItemId, callback) {
    //----------> get all products
    getCartContents((cartContents) => {
      let updatedCart;
      let cartItems = cartContents.cartItems;
      let totalAmount = cartContents.totalAmount;
      let numberOfCartItems = cartContents.numberOfCartItems;
      //----------> find the cart contents by removing the cart whose id matches the cartId
      const filteredCartItems = cartItems.filter(
        (cartItem) => cartItemId !== cartItem.id.toString()
      );
      const cartItem = cartItems.find((cartItem) => cartItemId === cartItem.id.toString());
      cartItems = cartItems.indexOf(cartItem);
      numberOfCartItems -= 1;
      totalAmount = totalAmount - cartItem.price * cartItem.quantity;
      updatedCart = {
        cartItems: filteredCartItems,
        numberOfCartItems,
        totalAmount,
      };
      fs.writeFile(pathToCart, JSON.stringify([updatedCart]), (error, fileContent) => {
        if (!error) {
          callback();
        }
      });
    });
  }
};
