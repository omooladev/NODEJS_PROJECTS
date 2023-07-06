const Cart = require("../models/cart");
const Product = require("../models/product");
const getAllProducts = (req, res) => {
  Product.fetchAllProducts((products) => {
    res.render("user/shop", { path: "/", pageTitle: "Shop", products });
  });
};

const addProductToCart = (req, res) => {
  const { productId } = req.params;
  Cart.addToCart(productId, () => {});
};

const getAllCartItems = (req, res) => {
  Cart.getAllItems((cart) => {
    res.status(200).json({ cart });
  });
};
module.exports = { getAllProducts, addProductToCart, getAllCartItems };
