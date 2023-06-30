const Product = require("../models/product");

const getAllProducts = (req, res) => {
  Product.fetchAllProducts((products) => {
    res.render("user/shop", { path: "/", pageTitle: "Shop", products });
  });
};
module.exports = { getAllProducts };
