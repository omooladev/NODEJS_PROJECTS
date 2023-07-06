const Cart = require("../models/cart");
const Product = require("../models/product");
const getAllProducts = (req, res) => {
  Product.fetchAllProducts((products) => {
    res.render("user/shop", { path: "/", pageTitle: "Shop", products });
  });
};

const addProductToCart = (req, res) => {
  const { productId } = req.params;
  Cart.addToCart(productId, (cartContents) => {
    res.status(200).json({ cartContents });
  });
};

const getAllCartItems = (req, res) => {
  Cart.getCartContents((cartContents) => {
    res.status(200).json({ cartContents });
  });
};

const viewCartPage = (req, res) => {
  Cart.getCartContents((cartContents) => {
    res.render("user/cart.ejs", { cartContents, pageTitle: "Cart", path: "/cart", products: [] });
  });
};
module.exports = { getAllProducts, addProductToCart, getAllCartItems, viewCartPage };
